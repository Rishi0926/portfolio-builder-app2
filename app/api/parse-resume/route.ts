import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { createGroq } from "@ai-sdk/groq"

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || "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",
})

// Enhanced PDF extraction with better error handling
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  let extractedText = ""
  let errors: string[] = []

  console.log("🔍 Starting PDF text extraction...")

  // Method 1: pdf-parse with better configuration
  try {
    console.log("📋 Attempting pdf-parse extraction...")
    const pdfParse = await import("pdf-parse")
    
    const options = {
      normalizeWhitespace: false,
      disableCombineTextItems: false,
      max: 0, // Parse all pages
    }
    
    const data = await pdfParse.default(buffer, options)
    
    console.log("📋 pdf-parse raw data:", {
      textLength: data.text?.length || 0,
      hasText: !!data.text,
      numPages: data.numpages || 0,
      textPreview: data.text?.substring(0, 300) || "No text"
    })
    
    if (data.text && data.text.trim().length > 20) {
      extractedText = data.text.trim()
      console.log("✅ pdf-parse successful!")
      return cleanExtractedText(extractedText)
    }
    errors.push("pdf-parse: insufficient text extracted")
  } catch (error) {
    errors.push(`pdf-parse: ${error}`)
    console.error("❌ pdf-parse failed:", error)
  }

  // Method 2: pdf2json with improved parsing
  try {
    console.log("📋 Attempting pdf2json extraction...")
    const PDFParser = (await import("pdf2json")).default
    const parser = new PDFParser(null, true)
    
    const parsed = await new Promise<string>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error("PDF parsing timeout"))
      }, 30000) // Increased timeout

      parser.on("pdfParser_dataError", (error) => {
        clearTimeout(timeoutId)
        reject(error)
      })

      parser.on("pdfParser_dataReady", (pdfData) => {
        clearTimeout(timeoutId)
        try {
          const pages = pdfData?.Pages || pdfData?.formImage?.Pages
          if (!pages || !Array.isArray(pages)) {
            reject(new Error("No readable pages found"))
            return
          }

          const rawText = pages
            .map((page, pageIndex) => {
              console.log(`📋 Processing page ${pageIndex + 1}...`)
              if (!page.Texts || !Array.isArray(page.Texts)) return ""
              
              return page.Texts
                .sort((a, b) => {
                  // Sort by Y position (top to bottom), then X position (left to right)
                  if (Math.abs(a.y - b.y) > 0.5) return a.y - b.y
                  return a.x - b.x
                })
                .map(textItem => {
                  if (!textItem.R || !Array.isArray(textItem.R)) return ""
                  return textItem.R
                    .map(r => {
                      try {
                        return decodeURIComponent(r.T || "")
                      } catch {
                        return r.T || ""
                      }
                    })
                    .join("")
                })
                .filter(text => text.trim().length > 0)
                .join(" ")
            })
            .filter(pageText => pageText.trim().length > 0)
            .join("\n\n")

          console.log("📋 pdf2json extracted text:", {
            length: rawText.length,
            preview: rawText.substring(0, 500)
          })

          resolve(rawText)
        } catch (parseError) {
          reject(parseError)
        }
      })

      parser.parseBuffer(buffer)
    })

    if (parsed && parsed.trim().length > 20) {
      extractedText = parsed.trim()
      console.log("✅ pdf2json successful!")
      return cleanExtractedText(extractedText)
    }
    errors.push("pdf2json: insufficient text extracted")
  } catch (error) {
    errors.push(`pdf2json: ${error}`)
    console.error("❌ pdf2json failed:", error)
  }

  // Method 3: Raw buffer extraction with better patterns
  try {
    console.log("📋 Attempting advanced buffer extraction...")
    const bufferText = buffer.toString('binary')
    
    // Multiple extraction patterns
    const patterns = [
      // Standard text objects
      /BT\s*(.*?)\s*ET/gs,
      // Text showing operators
      /\((.*?)\)\s*Tj/g,
      /\[(.*?)\]\s*TJ/g,
      // Direct text in parentheses
      /\(([^)]{3,})\)/g,
    ]
    
    let combinedText = ""
    patterns.forEach((pattern, index) => {
      const matches = bufferText.match(pattern)
      if (matches) {
        console.log(`📋 Pattern ${index + 1} found ${matches.length} matches`)
        const patternText = matches
          .map(match => match.replace(/^[^(]*\(/, '').replace(/\)[^)]*$/, ''))
          .join(' ')
        combinedText += patternText + ' '
      }
    })
    
    // Clean the extracted text
    combinedText = combinedText
      .replace(/\\[0-9]{3}/g, '') // Remove octal characters
      .replace(/\\[rnt]/g, ' ') // Replace escaped characters
      .replace(/[^\x20-\x7E]/g, ' ') // Keep only printable ASCII
      .replace(/\s+/g, ' ')
      .trim()
    
    console.log("📋 Buffer extraction results:", {
      length: combinedText.length,
      preview: combinedText.substring(0, 300)
    })
    
    if (combinedText.length > 50) {
      extractedText = combinedText
      console.log("✅ Buffer extraction successful!")
      return cleanExtractedText(extractedText)
    }
    errors.push("buffer extraction: insufficient text found")
  } catch (error) {
    errors.push(`buffer extraction: ${error}`)
    console.error("❌ Buffer extraction failed:", error)
  }

  console.error("❌ All PDF extraction methods failed:", errors)
  throw new Error(`Could not extract text from PDF. This might be a scanned PDF, image-based, or password-protected. Try using an OCR tool first.`)
}

// Improved text cleaning
function cleanExtractedText(text: string): string {
  if (!text || typeof text !== 'string') return ""
  
  const cleaned = text
    // Fix common PDF encoding issues
    .replace(/\u00A0/g, ' ') // Replace non-breaking spaces
    .replace(/\u2022/g, '•') // Replace bullet points
    .replace(/\u2013/g, '-') // Replace en dash
    .replace(/\u2014/g, '--') // Replace em dash
    .replace(/\u201C|\u201D/g, '"') // Replace smart quotes
    .replace(/\u2018|\u2019/g, "'") // Replace smart apostrophes
    
    // Remove control characters but keep line breaks
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ' ')
    
    // Normalize line breaks and spaces
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[ \t]+/g, ' ') // Multiple spaces/tabs to single space
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Multiple line breaks to double
    
    // Remove isolated single characters (PDF artifacts)
    .replace(/\s[a-zA-Z]\s/g, ' ')
    .replace(/^\s*[a-zA-Z]\s+/gm, '') // Single chars at line start
    
    // Clean up formatting
    .replace(/\s*\n\s*/g, '\n')
    .replace(/\s+/g, ' ')
    .trim()
    
  console.log("🧹 Text cleaning results:", {
    originalLength: text.length,
    cleanedLength: cleaned.length,
    hasContent: cleaned.length > 100
  })
  
  return cleaned
}

// More focused AI prompt with chunking support
function createEnhancedPrompt(extractedText: string): string {
  // Chunk text if it's too long
  const maxTextLength = 6000 // Conservative limit for better processing
  const processedText = extractedText.length > maxTextLength 
    ? extractedText.substring(0, maxTextLength) + "..."
    : extractedText
  
  console.log("🤖 Creating AI prompt:", {
    originalLength: extractedText.length,
    processedLength: processedText.length,
    wasTruncated: extractedText.length > maxTextLength
  })
  
  return `Parse this resume and extract structured information. Return ONLY valid JSON.

RESUME TEXT:
${processedText}

Extract information and return JSON with this structure:
{
  "name": "Full name",
  "email": "email@domain.com", 
  "phone": "phone number",
  "title": "job title or role",
  "location": "city, state/country",
  "summary": "professional summary",
  "skills": ["skill1", "skill2"],
  "experience": [
    {
      "company": "Company Name",
      "position": "Job Title", 
      "duration": "Start - End dates",
      "description": "What they did in this role",
      "responsibilities": ["task1", "task2"]
    }
  ],
  "education": [
    {
      "institution": "School Name",
      "degree": "Degree Name",
      "year": "Year or duration", 
      "gpa": "GPA if mentioned"
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "What the project does",
      "technologies": ["tech1", "tech2"],
      "link": "project URL if any"
    }
  ],
  "certifications": ["cert1", "cert2"],
  "languages": ["language1", "language2"],
  "socialLinks": {
    "linkedin": "LinkedIn URL",
    "github": "GitHub URL", 
    "portfolio": "Portfolio URL"
  }
}

Rules:
- Extract ALL information present
- Use empty strings/arrays for missing data
- Ensure valid JSON format
- No explanations, just JSON`
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json({ error: "File must be a PDF" }, { status: 400 })
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be less than 10MB" }, { status: 400 })
    }

    console.log(`📄 Processing PDF: ${file.name} (${(file.size / 1024).toFixed(2)}KB)`)

    // Extract text from PDF
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    let extractedText = ""
    
    try {
      extractedText = await extractTextFromPDF(buffer)
      console.log(`✅ Text extraction successful! Length: ${extractedText.length}`)
      console.log(`📝 First 500 chars: ${extractedText.substring(0, 500)}`)
      
      if (extractedText.length < 50) {
        throw new Error("Extracted text is too short - PDF might be image-based or corrupted")
      }
      
    } catch (pdfError) {
      console.error("❌ PDF parsing error:", pdfError)
      return NextResponse.json({ 
        error: `Failed to extract text from PDF: ${pdfError.message}. Try converting to a text-based PDF first.` 
      }, { status: 400 })
    }

    // Process with AI
    const prompt = createEnhancedPrompt(extractedText)
    console.log("🤖 Sending to Groq AI...")

    try {
      const { text } = await generateText({
        model: groq("llama-3.1-70b-versatile"), // Better model for structured output
        prompt: prompt,
        maxTokens: 2048,
        temperature: 0,
        maxRetries: 2,
        abortSignal: AbortSignal.timeout(30000),
      })

      console.log("🤖 AI Response received!")
      console.log("🤖 Raw response length:", text.length)

      // Parse AI response
      const parsedData = parseAIResponse(text)
      const userData = validateAndEnhanceData(parsedData, extractedText)
      
      console.log("✅ Final processing complete!")
      return NextResponse.json(userData)
      
    } catch (aiError) {
      console.error("❌ AI processing error:", aiError)
      
      // Try fallback parsing
      const fallbackData = createSmartFallback(extractedText)
      console.log("⚠️ Using fallback parsing")
      return NextResponse.json(fallbackData)
    }

  } catch (error) {
    console.error("❌ Unexpected error:", error)
    return NextResponse.json({ 
      error: `Processing failed: ${error.message}` 
    }, { status: 500 })
  }
}

// Better AI response parsing
function parseAIResponse(text: string): any {
  let cleanedText = text.trim()
  
  // Remove markdown formatting
  cleanedText = cleanedText.replace(/```json\s*/gi, "").replace(/```\s*$/g, "")
  cleanedText = cleanedText.replace(/```/g, "")
  
  // Find JSON boundaries
  const jsonStart = cleanedText.indexOf("{")
  const jsonEnd = cleanedText.lastIndexOf("}") + 1
  
  if (jsonStart === -1 || jsonEnd <= jsonStart) {
    console.error("No JSON found in response")
    throw new Error("Invalid AI response format")
  }
  
  cleanedText = cleanedText.substring(jsonStart, jsonEnd)
  
  // Fix common JSON issues
  cleanedText = cleanedText
    .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
    .replace(/([{,]\s*)(\w+):/g, '$1"$2":') // Quote unquoted keys
    .replace(/:\s*'([^']*)'/g, ': "$1"') // Single to double quotes
  
  try {
    return JSON.parse(cleanedText)
  } catch (e) {
    console.error("JSON parse error:", e)
    console.error("Cleaned text:", cleanedText.substring(0, 500))
    throw new Error("Failed to parse AI response")
  }
}

// Enhanced data validation and completion
function validateAndEnhanceData(data: any, originalText: string): any {
  const enhanced = {
    name: data.name || extractName(originalText) || "Unknown User",
    email: data.email || extractEmail(originalText) || "user@example.com", 
    phone: data.phone || extractPhone(originalText) || "+1 (555) 000-0000",
    title: data.title || "Professional",
    location: data.location || "Location Not Specified",
    summary: data.summary || "Dedicated professional with relevant experience and skills.",
    skills: Array.isArray(data.skills) ? data.skills.filter(Boolean) : extractSkills(originalText),
    languages: Array.isArray(data.languages) ? data.languages.filter(Boolean) : ["English"],
    certifications: Array.isArray(data.certifications) ? data.certifications.filter(Boolean) : [],
    achievements: Array.isArray(data.achievements) ? data.achievements.filter(Boolean) : [],
    hobbies: Array.isArray(data.hobbies) ? data.hobbies.filter(Boolean) : [],
    socialLinks: {
      linkedin: data.socialLinks?.linkedin || "",
      github: data.socialLinks?.github || "",
      portfolio: data.socialLinks?.portfolio || "",
      twitter: data.socialLinks?.twitter || "",
    },
    experience: Array.isArray(data.experience) ? data.experience.filter((exp: any) => exp.company || exp.position) : [],
    education: Array.isArray(data.education) ? data.education.filter((edu: any) => edu.institution || edu.degree) : [],
    projects: Array.isArray(data.projects) ? data.projects.filter((proj: any) => proj.name || proj.description) : [],
    isFresher: !data.experience || data.experience.length === 0,
    fresherDetails: {
      internships: data.fresherDetails?.internships || [],
      academicProjects: data.fresherDetails?.academicProjects || [],
      extracurriculars: data.fresherDetails?.extracurriculars || [],
      coursework: data.fresherDetails?.coursework || [],
    },
  }
  
  return enhanced
}

// Regex-based extraction helpers
function extractName(text: string): string | null {
  const patterns = [
    /^([A-Z][a-z]+ [A-Z][a-z]+)/m,
    /([A-Z][a-z]+ [A-Z][a-z]+)(?=\s*\n|\s*[|\-]|\s*Contact)/i,
  ]
  
  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) return match[1].trim()
  }
  return null
}

function extractEmail(text: string): string | null {
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)
  return match ? match[0] : null
}

function extractPhone(text: string): string | null {
  const match = text.match(/[\+]?[1-9]?[\d\s\-\(\)\.]{7,15}/)
  return match ? match[0].trim() : null
}

function extractSkills(text: string): string[] {
  const skillKeywords = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'React', 'Node.js', 'HTML', 'CSS', 
    'SQL', 'Git', 'AWS', 'Docker', 'MongoDB', 'Angular', 'Vue.js', 'PHP', 'C++', 'C#'
  ]
  
  return skillKeywords.filter(skill => 
    new RegExp(`\\b${skill}\\b`, 'i').test(text)
  )
}

// Smart fallback when AI fails
function createSmartFallback(extractedText: string): any {
  return {
    name: extractName(extractedText) || "Unknown User",
    email: extractEmail(extractedText) || "user@example.com",
    phone: extractPhone(extractedText) || "+1 (555) 000-0000",
    title: "Professional",
    location: "Location Not Specified", 
    summary: "Professional with relevant experience and technical skills.",
    skills: extractSkills(extractedText),
    languages: ["English"],
    certifications: [],
    achievements: [],
    hobbies: [],
    socialLinks: { linkedin: "", github: "", portfolio: "", twitter: "" },
    experience: [],
    education: [],
    projects: [],
    isFresher: true,
    fresherDetails: {
      internships: [],
      academicProjects: [], 
      extracurriculars: [],
      coursework: [],
    },
  }
}
