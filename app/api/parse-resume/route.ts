import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { createGroq } from "@ai-sdk/groq"

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || "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",
})

// Multiple PDF extraction approaches
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  let extractedText = ""
  let errors: string[] = []

  console.log("🔍 Starting PDF text extraction...")

  // Method 1: pdf-parse (most reliable)
  try {
    console.log("📋 Attempting pdf-parse extraction...")
    const pdfParse = await import("pdf-parse")
    const data = await pdfParse.default(buffer)
    
    console.log("📋 pdf-parse raw data:", {
      textLength: data.text?.length || 0,
      hasText: !!data.text,
      textPreview: data.text?.substring(0, 200) || "No text"
    })
    
    if (data.text && data.text.trim().length > 50) {
      extractedText = data.text.trim()
      console.log("✅ pdf-parse successful!")
      console.log("📝 Extracted text length:", extractedText.length)
      console.log("📝 Text preview:", extractedText.substring(0, 500))
      return cleanExtractedText(extractedText)
    }
    errors.push("pdf-parse: insufficient text extracted")
  } catch (error) {
    errors.push(`pdf-parse: ${error}`)
    console.error("❌ pdf-parse failed:", error)
  }

  // Method 2: pdf2json fallback
  try {
    console.log("📋 Attempting pdf2json extraction...")
    const PDFParser = (await import("pdf2json")).default
    const parser = new PDFParser(null, true) // Enable raw text mode
    
    const parsed = await new Promise<string>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error("PDF parsing timeout"))
      }, 15000) // 15 second timeout

      parser.on("pdfParser_dataError", (error) => {
        clearTimeout(timeoutId)
        reject(error)
      })

      parser.on("pdfParser_dataReady", (pdfData) => {
        clearTimeout(timeoutId)
        try {
          console.log("📋 pdf2json raw data structure:", {
            hasPages: !!(pdfData?.Pages || pdfData?.formImage?.Pages),
            pagesCount: (pdfData?.Pages || pdfData?.formImage?.Pages)?.length || 0
          })
          
          const pages = pdfData?.Pages || pdfData?.formImage?.Pages
          if (!pages || !Array.isArray(pages) || pages.length === 0) {
            reject(new Error("No readable pages found in PDF"))
            return
          }

          const rawText = pages
            .map(page => {
              if (!page.Texts || !Array.isArray(page.Texts)) return ""
              return page.Texts
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
                    .join(" ")
                })
                .join(" ")
            })
            .join("\n")

          console.log("📋 pdf2json extracted text:", {
            length: rawText.length,
            preview: rawText.substring(0, 200)
          })

          resolve(rawText)
        } catch (parseError) {
          reject(parseError)
        }
      })

      // Parse the buffer directly
      parser.parseBuffer(buffer)
    })

    if (parsed && parsed.trim().length > 50) {
      extractedText = parsed.trim()
      console.log("✅ pdf2json successful!")
      console.log("📝 Extracted text length:", extractedText.length)
      console.log("📝 Text preview:", extractedText.substring(0, 500))
      return cleanExtractedText(extractedText)
    }
    errors.push("pdf2json: insufficient text extracted")
  } catch (error) {
    errors.push(`pdf2json: ${error}`)
    console.error("❌ pdf2json failed:", error)
  }

  // Method 3: Simple buffer text extraction (last resort)
  try {
    console.log("📋 Attempting buffer text extraction...")
    const bufferText = buffer.toString('utf8')
    const textMatch = bufferText.match(/\/Length\s+(\d+).*?stream\s*(.*?)\s*endstream/gs)
    
    console.log("📋 Buffer extraction results:", {
      hasMatches: !!textMatch,
      matchCount: textMatch?.length || 0
    })
    
    if (textMatch) {
      let combinedText = textMatch
        .map(match => match.replace(/^.*?stream\s*/, '').replace(/\s*endstream.*$/, ''))
        .join(' ')
      
      // Clean up the extracted text
      combinedText = combinedText
        .replace(/[^\x20-\x7E\s]/g, ' ') // Remove non-printable characters
        .replace(/\s+/g, ' ')
        .trim()
      
      console.log("📋 Buffer cleaned text:", {
        length: combinedText.length,
        preview: combinedText.substring(0, 200)
      })
      
      if (combinedText.length > 50) {
        extractedText = combinedText
        console.log("✅ Buffer extraction successful!")
        return cleanExtractedText(extractedText)
      }
    }
    errors.push("buffer extraction: insufficient text found")
  } catch (error) {
    errors.push(`buffer extraction: ${error}`)
    console.error("❌ Buffer extraction failed:", error)
  }

  // Method 4: Binary pattern matching for common PDF text
  try {
    console.log("📋 Attempting binary pattern extraction...")
    const binaryText = buffer.toString('binary')
    const patterns = [
      /BT\s*([^E]*?)\s*ET/g,  // Text objects
      /Tj\s*([^T]*?)\s*TJ/g,  // Text showing
      /\((.*?)\)/g,           // Parentheses enclosed text
    ]
    
    let patternText = ""
    patterns.forEach((pattern, index) => {
      const matches = binaryText.match(pattern)
      console.log(`📋 Pattern ${index + 1} matches:`, matches?.length || 0)
      if (matches) {
        patternText += matches.join(' ')
      }
    })
    
    console.log("📋 Pattern extraction results:", {
      length: patternText.length,
      preview: patternText.substring(0, 200)
    })
    
    if (patternText.length > 50) {
      extractedText = patternText
        .replace(/[^\x20-\x7E\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
      console.log("✅ Pattern extraction successful!")
      return cleanExtractedText(extractedText)
    }
    errors.push("pattern extraction: insufficient text found")
  } catch (error) {
    errors.push(`pattern extraction: ${error}`)
    console.error("❌ Pattern extraction failed:", error)
  }

  // If all methods fail, provide detailed error information
  console.error("❌ All PDF extraction methods failed:", errors)
  throw new Error(`Could not extract text from PDF. Attempted methods: ${errors.join('; ')}. The PDF might be scanned, password-protected, or use unsupported encoding.`)
}

// Enhanced text cleaning function
function cleanExtractedText(text: string): string {
  if (!text || typeof text !== 'string') return ""
  
  const cleaned = text
    // Remove control characters and special Unicode
    .replace(/[\x00-\x1F\x7F-\x9F]/g, ' ')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    // Remove most special characters but keep important ones
    .replace(/[^\w\s@.,()\/\-:;'"]/g, ' ')
    // Clean up multiple spaces
    .replace(/\s+/g, ' ')
    // Remove standalone single characters (usually artifacts)
    .replace(/\s[a-zA-Z]\s/g, ' ')
    // Remove empty parentheses and brackets
    .replace(/\(\s*\)/g, ' ')
    .replace(/\[\s*\]/g, ' ')
    // Final cleanup
    .trim()
    .replace(/\s+/g, ' ')
    
  console.log("🧹 Text cleaning results:", {
    originalLength: text.length,
    cleanedLength: cleaned.length,
    cleanedPreview: cleaned.substring(0, 300)
  })
  
  return cleaned
}

// Enhanced AI prompt with better structure
function createEnhancedPrompt(extractedText: string): string {
  // Preprocess text to focus on resume content
  const preprocessedText = extractedText
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s@.,()\/\-:;'"]/g, ' ')
    .trim()
    .substring(0, 8000) // Limit to prevent token overflow
  
  console.log("🤖 Creating AI prompt with text:", {
    originalLength: extractedText.length,
    preprocessedLength: preprocessedText.length,
    preview: preprocessedText.substring(0, 500)
  })
  
  return `You are an expert resume parser AI. Extract structured information from this resume text and return ONLY a valid JSON object with ALL available information.

RESUME TEXT:
${preprocessedText}

CRITICAL INSTRUCTIONS:
1. Extract ALL information present in the resume text
2. Be thorough - don't miss any details
3. For missing information, use meaningful defaults
4. Return ONLY the JSON object, no explanations
5. Ensure valid JSON formatting with proper quotes and commas
6. Extract complete experience descriptions and responsibilities
7. Include all projects with full details
8. Capture all education information including coursework
9. Find all contact information and social links
10. Extract all skills, certifications, and achievements

REQUIRED JSON STRUCTURE (extract ALL available data):
{
  "name": "Full name from resume",
  "email": "Email address found",
  "phone": "Phone number found",
  "title": "Professional title or role",
  "location": "Location/address found",
  "summary": "Professional summary or objective",
  "skills": ["ALL technical and soft skills found"],
  "languages": ["All languages mentioned"],
  "certifications": ["All certifications found"],
  "achievements": ["All achievements and awards found"],
  "hobbies": ["All hobbies and interests found"],
  "socialLinks": {
    "linkedin": "LinkedIn URL if found",
    "github": "GitHub URL if found",
    "portfolio": "Portfolio URL if found",
    "twitter": "Twitter URL if found"
  },
  "experience": [
    {
      "company": "Company name",
      "position": "Job title",
      "duration": "Employment period",
      "description": "FULL job description",
      "responsibilities": ["ALL responsibilities listed"]
    }
  ],
  "education": [
    {
      "institution": "Institution name",
      "degree": "Full degree name",
      "year": "Year or duration",
      "gpa": "GPA if mentioned",
      "coursework": ["ALL relevant courses mentioned"]
    }
  ],
  "projects": [
    {
      "name": "Project name",
      "description": "FULL project description",
      "technologies": ["ALL technologies used"],
      "link": "Project URL if found",
      "github": "GitHub URL if found",
      "features": ["ALL features mentioned"]
    }
  ],
  "isFresher": false,
  "fresherDetails": {
    "internships": ["All internships"],
    "academicProjects": ["All academic projects"],
    "extracurriculars": ["All extracurricular activities"],
    "coursework": ["All coursework mentioned"]
  }
}

IMPORTANT: Be thorough and extract ALL information. Don't abbreviate or summarize. Return the complete JSON object with all available details.`
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

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be less than 10MB" }, { status: 400 })
    }

    console.log(`📄 Processing PDF: ${file.name} (${(file.size / 1024).toFixed(2)}KB)`)

    // Convert PDF to text
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    let extractedText = ""
    
    try {
      extractedText = await extractTextFromPDF(buffer)
      console.log(`✅ Text extraction successful!`)
      console.log(`📝 FULL EXTRACTED TEXT (${extractedText.length} chars):`)
      console.log("=" * 50)
      console.log(extractedText)
      console.log("=" * 50)
      
      // Basic validation
      if (extractedText.length < 50) {
        throw new Error("Extracted text is too short to be meaningful")
      }
      
      // Check if text contains actual readable content
      const readableChars = extractedText.replace(/\s/g, '').length
      const alphaChars = (extractedText.match(/[a-zA-Z]/g) || []).length
      
      console.log("📊 Text quality analysis:", {
        totalLength: extractedText.length,
        readableChars,
        alphaChars,
        alphaRatio: (alphaChars / readableChars).toFixed(2)
      })
      
      if (alphaChars < readableChars * 0.3) {
        throw new Error("Extracted text appears to be corrupted or contains mostly non-readable characters")
      }
      
    } catch (pdfError) {
      console.error("❌ PDF parsing error:", pdfError)
      return NextResponse.json({ 
        error: `Failed to extract text from PDF: ${pdfError.message}. Please try a different PDF or use manual entry.` 
      }, { status: 400 })
    }

    // Generate AI prompt
    const prompt = createEnhancedPrompt(extractedText)
    console.log("🤖 Sending to Groq AI...")
    console.log("🤖 AI Prompt length:", prompt.length)

    try {
      // Use the newer model instead of the deprecated one
      const { text } = await generateText({
        model: groq("llama-3.1-8b-instant"), // Updated model
        prompt: prompt,
        maxTokens: 4000,
        temperature: 0.1,
        maxRetries: 3,
        abortSignal: AbortSignal.timeout(45000), // 45 second timeout
      })

      console.log("🤖 AI Response received!")
      console.log("🤖 RAW AI RESPONSE:")
      console.log("=" * 50)
      console.log(text)
      console.log("=" * 50)

      // Enhanced JSON extraction and cleaning
      let cleanedText = text.trim()

      // Remove markdown formatting
      cleanedText = cleanedText.replace(/```json\s*/g, "").replace(/```\s*$/g, "")
      cleanedText = cleanedText.replace(/```/g, "")

      // Find JSON boundaries
      const jsonStart = cleanedText.indexOf("{")
      const jsonEnd = cleanedText.lastIndexOf("}") + 1

      if (jsonStart === -1 || jsonEnd <= jsonStart) {
        throw new Error("No valid JSON found in AI response")
      }

      cleanedText = cleanedText.substring(jsonStart, jsonEnd)

      console.log("🧹 Cleaned JSON text:")
      console.log("=" * 50)
      console.log(cleanedText)
      console.log("=" * 50)

      // Fix common JSON issues
      cleanedText = cleanedText
        .replace(/,\s*}/g, '}')
        .replace(/,\s*]/g, ']')
        .replace(/([{,]\s*)(\w+):/g, '$1"$2":')
        .replace(/:\s*'([^']*)'/g, ': "$1"')

      try {
        const extractedData = JSON.parse(cleanedText)
        console.log("✅ JSON parsed successfully!")
        console.log("📊 EXTRACTED DATA STRUCTURE:")
        console.log("=" * 50)
        console.log(JSON.stringify(extractedData, null, 2))
        console.log("=" * 50)
        
        // Validate and clean the extracted data
        const userData = validateAndCleanUserData(extractedData)
        
        console.log("📊 FINAL USER DATA:")
        console.log("=" * 50)
        console.log(JSON.stringify(userData, null, 2))
        console.log("=" * 50)
        
        console.log("✅ Final user data processed successfully!")
        return NextResponse.json(userData)
        
      } catch (parseError) {
        console.error("❌ JSON parsing failed:", parseError)
        console.error("❌ Raw AI response:", text.substring(0, 500))
        console.error("❌ Cleaned text:", cleanedText.substring(0, 500))

        // Create fallback data
        const fallbackData = createFallbackData(extractedText)
        console.log("⚠️ Using fallback data extraction")
        console.log("📊 FALLBACK DATA:")
        console.log("=" * 50)
        console.log(JSON.stringify(fallbackData, null, 2))
        console.log("=" * 50)
        return NextResponse.json(fallbackData)
      }
    } catch (aiError) {
      console.error("❌ AI processing error:", aiError)
      
      // Create fallback data
      const fallbackData = createFallbackData(extractedText)
      console.log("⚠️ Using fallback data due to AI error")
      console.log("📊 FALLBACK DATA:")
      console.log("=" * 50)
      console.log(JSON.stringify(fallbackData, null, 2))
      console.log("=" * 50)
      return NextResponse.json(fallbackData)
    }

  } catch (error) {
    console.error("❌ Unexpected error:", error)
    return NextResponse.json({ 
      error: `An unexpected error occurred: ${error.message}` 
    }, { status: 500 })
  }
}

// Enhanced validation and cleaning with more thorough extraction
function validateAndCleanUserData(data: any): any {
  console.log("🔍 Validating and cleaning user data...")
  
  const cleaned = {
    name: data.name && data.name !== "Unknown User" ? data.name : "Unknown User",
    email: data.email && data.email !== "user@example.com" ? data.email : "user@example.com",
    phone: data.phone && data.phone !== "+1 (555) 000-0000" ? data.phone : "+1 (555) 000-0000",
    title: data.title || "Professional",
    location: data.location || "Location Not Specified",
    summary: data.summary || "Dedicated professional with strong technical skills and experience.",
    skills: Array.isArray(data.skills) ? data.skills.filter(Boolean) : [],
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
    experience: Array.isArray(data.experience)
      ? data.experience.map((exp: any) => ({
          company: exp.company || "",
          position: exp.position || "",
          duration: exp.duration || "",
          description: exp.description || "",
          responsibilities: Array.isArray(exp.responsibilities) ? exp.responsibilities.filter(Boolean) : [],
        })).filter((exp: any) => exp.company || exp.position)
      : [],
    education: Array.isArray(data.education)
      ? data.education.map((edu: any) => ({
          institution: edu.institution || "",
          degree: edu.degree || "",
          year: edu.year || "",
          gpa: edu.gpa || "",
          coursework: Array.isArray(edu.coursework) ? edu.coursework.filter(Boolean) : [],
        })).filter((edu: any) => edu.institution || edu.degree)
      : [],
    projects: Array.isArray(data.projects)
      ? data.projects.map((proj: any) => ({
          name: proj.name || "",
          description: proj.description || "",
          technologies: Array.isArray(proj.technologies) ? proj.technologies.filter(Boolean) : [],
          link: proj.link || "",
          github: proj.github || "",
          features: Array.isArray(proj.features) ? proj.features.filter(Boolean) : [],
        })).filter((proj: any) => proj.name || proj.description)
      : [],
    isFresher: Boolean(data.isFresher),
    fresherDetails: {
      internships: Array.isArray(data.fresherDetails?.internships) ? data.fresherDetails.internships.filter(Boolean) : [],
      academicProjects: Array.isArray(data.fresherDetails?.academicProjects) ? data.fresherDetails.academicProjects.filter(Boolean) : [],
      extracurriculars: Array.isArray(data.fresherDetails?.extracurriculars) ? data.fresherDetails.extracurriculars.filter(Boolean) : [],
      coursework: Array.isArray(data.fresherDetails?.coursework) ? data.fresherDetails.coursework.filter(Boolean) : [],
    },
  }
  
  console.log("🔍 Validation results:", {
    hasName: cleaned.name !== "Unknown User",
    hasEmail: cleaned.email !== "user@example.com",
    hasPhone: cleaned.phone !== "+1 (555) 000-0000",
    skillsCount: cleaned.skills.length,
    experienceCount: cleaned.experience.length,
    educationCount: cleaned.education.length,
    projectsCount: cleaned.projects.length
  })
  
  return cleaned
}

// Create fallback data using manual extraction
function createFallbackData(extractedText: string): any {
  console.log("🔄 Creating fallback data from extracted text")
  
  // Extract basic information using regex
  const emailMatch = extractedText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g)
  const phoneMatch = extractedText.match(/[\+]?[1-9]?[\d\s\-\(\)\.]{7,15}/g)
  
  // Extract name (look for capitalized words at the beginning)
  const nameMatch = extractedText.match(/^[A-Z][a-zA-Z]+\s+[A-Z][a-zA-Z]+/m) || 
                   extractedText.match(/[A-Z][a-zA-Z]+\s+[A-Z][a-zA-Z]+/g)
  
  // Extract skills (common tech keywords)
  const skillKeywords = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'HTML', 'CSS', 'SQL', 'Git', 'AWS',
    'Docker', 'MongoDB', 'TypeScript', 'Angular', 'Vue.js', 'PHP', 'C++', 'C#', 'Swift',
    'Kotlin', 'Flutter', 'Django', 'Spring', 'Express', 'PostgreSQL', 'MySQL', 'Redis',
    'Kubernetes', 'Jenkins', 'GraphQL', 'REST API', 'Microservices', 'DevOps', 'Linux',
    'Windows', 'macOS', 'Agile', 'Scrum', 'JIRA', 'Confluence', 'Slack', 'Teams'
  ]
  
  const foundSkills = skillKeywords.filter(skill => 
    extractedText.toLowerCase().includes(skill.toLowerCase())
  )
  
  // Extract education info
  const educationKeywords = ['University', 'College', 'Institute', 'School', 'Bachelor', 'Master', 'PhD', 'Degree']
  const hasEducation = educationKeywords.some(keyword => 
    extractedText.toLowerCase().includes(keyword.toLowerCase())
  )
  
  // Extract experience indicators
  const experienceKeywords = ['Experience', 'Work', 'Employment', 'Position', 'Role', 'Company']
  const hasExperience = experienceKeywords.some(keyword => 
    extractedText.toLowerCase().includes(keyword.toLowerCase())
  )
  
  return {
    name: nameMatch ? (Array.isArray(nameMatch) ? nameMatch[0] : nameMatch) : "Unknown User",
    email: emailMatch ? emailMatch[0] : "user@example.com",
    phone: phoneMatch ? phoneMatch[0].replace(/\s+/g, ' ').trim() : "+1 (555) 000-0000",
    title: "Professional",
    location: "Location Not Specified",
    summary: "Dedicated professional with strong technical skills and experience.",
    skills: foundSkills.length > 0 ? foundSkills : ['JavaScript', 'HTML', 'CSS'],
    languages: ["English"],
    certifications: [],
    achievements: [],
    hobbies: [],
    socialLinks: {
      linkedin: "",
      github: "",
      portfolio: "",
      twitter: "",
    },
    experience: hasExperience ? [{
      company: "Company Name",
      position: "Position",
      duration: "Duration",
      description: "Description extracted from resume",
      responsibilities: ["Responsibilities extracted from resume"]
    }] : [],
    education: hasEducation ? [{
      institution: "Institution Name",
      degree: "Degree",
      year: "Year",
      gpa: "",
      coursework: []
    }] : [],
    projects: [],
    isFresher: !hasExperience,
    fresherDetails: {
      internships: [],
      academicProjects: [],
      extracurriculars: [],
      coursework: [],
    },
  }
}