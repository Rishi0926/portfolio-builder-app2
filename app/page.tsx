"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Upload,
  FileText,
  Palette,
  Download,
  Eye,
  Shuffle,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Edit,
  Plus,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"
import PortfolioPreview from "@/components/portfolio-preview"
import { toast } from "@/hooks/use-toast"
import { ThemeToggle } from "@/components/theme-toggle"
import FresherForm from "@/components/fresher-form"
import ExperiencedForm from "@/components/experienced-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface UserData {
  name: string
  email: string
  phone: string
  title: string
  location: string
  summary: string
  skills: string[]
  languages: string[]
  certifications: string[]
  achievements: string[]
  hobbies: string[]
  socialLinks: {
    linkedin?: string
    github?: string
    portfolio?: string
    twitter?: string
  }
  experience: Array<{
    company: string
    position: string
    duration: string
    description: string
    responsibilities: string[]
  }>
  education: Array<{
    institution: string
    degree: string
    year: string
    gpa?: string
    coursework?: string[]
  }>
  projects: Array<{
    name: string
    description: string
    technologies: string[]
    link?: string
    github?: string
    features: string[]
  }>
  isFresher: boolean
  fresherDetails?: {
    internships: Array<{
      company: string
      role: string
      duration: string
      description: string
    }>
    academicProjects: Array<{
      name: string
      description: string
      technologies: string[]
      duration: string
    }>
    extracurriculars: string[]
    coursework: string[]
  }
}

const templates = [
  { id: "modern", name: "Modern Minimalist", color: "bg-blue-500", description: "Clean and professional design" },
  { id: "creative", name: "Creative Bold", color: "bg-purple-500", description: "Vibrant and artistic layout" },
  { id: "professional", name: "Professional Clean", color: "bg-green-500", description: "Corporate and sleek" },
  { id: "artistic", name: "Artistic Flair", color: "bg-orange-500", description: "Unique and expressive" },
  { id: "tech", name: "Tech Focused", color: "bg-indigo-500", description: "Developer-friendly design" },
]

export default function PortfolioBuilder() {
  const [activeTab, setActiveTab] = useState("upload")
  const [userData, setUserData] = useState<UserData | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [showPreview, setShowPreview] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isExtracting, setIsExtracting] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isFresher, setIsFresher] = useState(false)
  const [showPDFExtractedData, setShowPDFExtractedData] = useState(false)
  const [extractedPDFData, setExtractedPDFData] = useState<UserData | null>(null)
  const [pdfFileName, setPDFFileName] = useState("")
  const [extractionError, setExtractionError] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [additionalProjects, setAdditionalProjects] = useState<
    Array<{
      name: string
      description: string
      technologies: string[]
      link?: string
      github?: string
    }>
  >([])

  useEffect(() => {
    setMounted(true)
  }, [])

  const processPDFFile = async (file: File) => {
    setIsExtracting(true)
    setExtractionError(null)
    setPDFFileName(file.name)

    try {
      const formData = new FormData()
      formData.append("file", file)

      console.log("Uploading file:", file.name, "Size:", file.size)

      const response = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      })

      const responseData = await response.json()
      console.log("Response from API:", responseData)

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to parse resume")
      }

      // Validate that we got meaningful data
      if (!responseData || typeof responseData !== "object") {
        throw new Error("Invalid response from server")
      }

      // Check if we got at least some basic information
      const hasBasicInfo =
        responseData.name ||
        responseData.email ||
        responseData.skills?.length > 0 ||
        responseData.experience?.length > 0 ||
        responseData.education?.length > 0

      if (!hasBasicInfo) {
        console.warn("Limited data extracted from PDF")
        toast({
          title: "Limited Data Extracted",
          description: "Some information was extracted, but you may need to add more details manually.",
          variant: "destructive",
        })
      }

      setExtractedPDFData(responseData)
      setIsExtracting(false)
      setShowPDFExtractedData(true)
      setActiveTab("extracted")

      toast({
        title: "🎉 PDF Successfully Processed!",
        description: `AI extracted data from ${file.name}. Review and edit the information below.`,
      })
    } catch (error: any) {
      setIsExtracting(false)
      setExtractionError(error.message)
      console.error("PDF processing error:", error)

      toast({
        title: "PDF Processing Failed",
        description: error.message || "Could not process the PDF file. Please try manual entry instead.",
        variant: "destructive",
      })
    }
  }
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: "File Too Large",
            description: "Please upload a PDF file smaller than 10MB.",
            variant: "destructive",
          })
          return
        }

        toast({
          title: "Processing PDF with AI",
          description: `Analyzing ${file.name} using Groq AI (Llama-3.1-8b-instant)...`,
        })

        processPDFFile(file)
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF file only.",
          variant: "destructive",
        })
      }
      event.target.value = ""
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.add("border-blue-400", "bg-blue-50/50")
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.remove("border-blue-400", "bg-blue-50/50")
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.remove("border-blue-400", "bg-blue-50/50")

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: "File Too Large",
            description: "Please upload a PDF file smaller than 10MB.",
            variant: "destructive",
          })
          return
        }

        toast({
          title: "Processing PDF with AI",
          description: `Analyzing ${file.name} using Groq AI (Llama-3.1-8b-instant)...`,
        })

        processPDFFile(file)
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF file only.",
          variant: "destructive",
        })
      }
    }
  }

  const updateExtractedData = (field: string, value: any) => {
    if (extractedPDFData) {
      setExtractedPDFData({ ...extractedPDFData, [field]: value })
    }
  }

  const addMoreProject = () => {
    setAdditionalProjects([
      ...additionalProjects,
      {
        name: "",
        description: "",
        technologies: [],
        link: "",
        github: "",
      },
    ])
  }

  const removeProject = (index: number) => {
    const updated = additionalProjects.filter((_, i) => i !== index)
    setAdditionalProjects(updated)
  }

  const updateAdditionalProject = (index: number, field: string, value: any) => {
    const updated = [...additionalProjects]
    updated[index] = { ...updated[index], [field]: value }
    setAdditionalProjects(updated)
  }

  const handleUseExtractedData = () => {
    if (extractedPDFData) {
      const combinedProjects = [...extractedPDFData.projects, ...additionalProjects.filter((p) => p.name.trim())]
      const updatedData = {
        ...extractedPDFData,
        projects: combinedProjects,
      }
      setUserData(updatedData)
      const randomTemplate = templates[Math.floor(Math.random() * templates.length)]
      setSelectedTemplate(randomTemplate.id)
      setActiveTab("templates")

      toast({
        title: "Data Applied Successfully!",
        description: `${randomTemplate.name} template applied with ${combinedProjects.length} projects. You can now preview your portfolio.`,
      })
    }
  }

  const handleFresherSubmit = (formData: FormData) => {
    const data: UserData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      title: formData.get("title") as string,
      location: formData.get("location") as string,
      summary: formData.get("summary") as string,
      skills: (formData.get("skills") as string)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      languages: (formData.get("languages") as string)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      certifications: (formData.get("certifications") as string)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      achievements: (formData.get("achievements") as string)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      hobbies: (formData.get("hobbies") as string)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      socialLinks: {
        linkedin: formData.get("linkedin") as string,
        github: formData.get("github") as string,
        portfolio: formData.get("portfolio") as string,
        twitter: formData.get("twitter") as string,
      },
      experience: [],
      education: [
        {
          institution: formData.get("institution") as string,
          degree: formData.get("degree") as string,
          year: formData.get("year") as string,
          gpa: formData.get("gpa") as string,
          coursework: (formData.get("coursework") as string)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
      ],
      projects: [
        {
          name: formData.get("project1Name") as string,
          description: formData.get("project1Description") as string,
          technologies: (formData.get("project1Technologies") as string)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          features: [],
        },
        {
          name: formData.get("project2Name") as string,
          description: formData.get("project2Description") as string,
          technologies: (formData.get("project2Technologies") as string)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          features: [],
        },
      ].filter((p) => p.name),
      isFresher: true,
      fresherDetails: {
        internships: [
          {
            company: formData.get("internshipCompany") as string,
            role: formData.get("internshipRole") as string,
            duration: formData.get("internshipDuration") as string,
            description: formData.get("internshipDescription") as string,
          },
        ].filter((i) => i.company),
        academicProjects: [
          {
            name: formData.get("project1Name") as string,
            description: formData.get("project1Description") as string,
            technologies: (formData.get("project1Technologies") as string)
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
            duration: formData.get("project1Duration") as string,
          },
          {
            name: formData.get("project2Name") as string,
            description: formData.get("project2Description") as string,
            technologies: (formData.get("project2Technologies") as string)
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
            duration: formData.get("project2Duration") as string,
          },
        ].filter((p) => p.name),
        extracurriculars: (formData.get("extracurriculars") as string)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        coursework: (formData.get("coursework") as string)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      },
    }

    setUserData(data)
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)]
    setSelectedTemplate(randomTemplate.id)
    setActiveTab("templates")

    toast({
      title: "Fresher Portfolio Created!",
      description: `${randomTemplate.name} template applied. Perfect for showcasing your potential!`,
    })
  }

  const handleExperiencedSubmit = (formData: FormData) => {
    const data: UserData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      title: formData.get("title") as string,
      location: formData.get("location") as string,
      summary: formData.get("summary") as string,
      skills: (formData.get("skills") as string)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      languages: (formData.get("languages") as string)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      certifications: (formData.get("certifications") as string)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      achievements: (formData.get("achievements") as string)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      hobbies: (formData.get("hobbies") as string)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      socialLinks: {
        linkedin: formData.get("linkedin") as string,
        github: formData.get("github") as string,
        portfolio: formData.get("portfolio") as string,
        twitter: formData.get("twitter") as string,
      },
      experience: [
        {
          company: formData.get("company1") as string,
          position: formData.get("position1") as string,
          duration: formData.get("duration1") as string,
          description: formData.get("description1") as string,
          responsibilities: (formData.get("responsibilities1") as string)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
        {
          company: formData.get("company2") as string,
          position: formData.get("position2") as string,
          duration: formData.get("duration2") as string,
          description: formData.get("description2") as string,
          responsibilities: (formData.get("responsibilities2") as string)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
      ].filter((exp) => exp.company),
      education: [
        {
          institution: formData.get("institution") as string,
          degree: formData.get("degree") as string,
          year: formData.get("year") as string,
          gpa: formData.get("gpa") as string,
          coursework: (formData.get("coursework") as string)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
      ],
      projects: [
        {
          name: formData.get("projectName1") as string,
          description: formData.get("projectDescription1") as string,
          technologies: (formData.get("projectTechnologies1") as string)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          link: formData.get("projectLink1") as string,
          github: formData.get("projectGithub1") as string,
          features: (formData.get("projectFeatures1") as string)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
        {
          name: formData.get("projectName2") as string,
          description: formData.get("projectDescription2") as string,
          technologies: (formData.get("projectTechnologies2") as string)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          link: formData.get("projectLink2") as string,
          github: formData.get("projectGithub2") as string,
          features: (formData.get("projectFeatures2") as string)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
      ].filter((proj) => proj.name),
      isFresher: false,
    }

    setUserData(data)
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)]
    setSelectedTemplate(randomTemplate.id)
    setActiveTab("templates")

    toast({
      title: "Professional Portfolio Created!",
      description: `${randomTemplate.name} template applied. Your experience shines through!`,
    })
  }

  const randomizeTemplate = () => {
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)]
    setSelectedTemplate(randomTemplate.id)
    toast({
      title: "Template Changed!",
      description: `Applied ${randomTemplate.name} template.`,
    })
  }

  const generatePortfolio = () => {
    if (userData && selectedTemplate) {
      setShowPreview(true)
      setActiveTab("preview")
      toast({
        title: "Portfolio Generated!",
        description: "Your personalized portfolio is ready to view.",
      })
    }
  }

  const exportPortfolio = async () => {
    if (!userData || !selectedTemplate) {
      toast({
        title: "Missing Data",
        description: "Please complete your portfolio before exporting.",
        variant: "destructive",
      })
      return
    }

    setIsExporting(true)
    try {
      const response = await fetch("/api/export-portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userData,
          template: selectedTemplate,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to export portfolio")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${userData.name.replace(/\s+/g, "_")}_portfolio.zip`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Portfolio Exported!",
        description: "Your portfolio has been downloaded as a ZIP file.",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export portfolio. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Portfolio Builder
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              Create professional portfolios with AI-powered resume parsing
            </p>
          </div>
          <ThemeToggle />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Resume
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Manual Entry
            </TabsTrigger>
            <TabsTrigger value="extracted" disabled={!showPDFExtractedData} className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Review Data
            </TabsTrigger>
            <TabsTrigger value="templates" disabled={!userData} className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="preview" disabled={!showPreview} className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview & Export
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Resume</CardTitle>
                <CardDescription>
                  Upload a PDF version of your resume and let our AI extract the information automatically.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center transition-colors hover:border-slate-400 dark:hover:border-slate-500"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {isExtracting ? (
                    <div className="space-y-4">
                      <Loader2 className="w-12 h-12 animate-spin mx-auto text-blue-500" />
                      <div>
                        <p className="text-lg font-semibold">Processing {pdfFileName}</p>
                        <p className="text-slate-600 dark:text-slate-300">
                          AI is extracting information from your resume...
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-12 h-12 mx-auto text-slate-400" />
                      <div>
                        <p className="text-lg font-semibold">Drag & drop your resume here</p>
                        <p className="text-slate-600 dark:text-slate-300">or click to browse files</p>
                      </div>
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="w-full max-w-sm mx-auto"
                      />
                      <p className="text-sm text-slate-500">Supports PDF files up to 10MB</p>
                    </div>
                  )}
                </div>

                {extractionError && (
                  <Alert className="mt-4 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <AlertDescription className="text-red-700 dark:text-red-300">{extractionError}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manual" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manual Data Entry</CardTitle>
                <CardDescription>Enter your information manually or edit AI-extracted data.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="fresher"
                      checked={isFresher}
                      onChange={(e) => setIsFresher(e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-600"
                    />
                    <Label htmlFor="fresher">I am a fresher/recent graduate</Label>
                  </div>

                  {isFresher ? (
                    <FresherForm onSubmit={handleFresherSubmit} />
                  ) : (
                    <ExperiencedForm onSubmit={handleExperiencedSubmit} />
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="extracted" className="space-y-6">
            {extractedPDFData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Extracted Data from {pdfFileName}
                  </CardTitle>
                  <CardDescription>Review and edit the information extracted from your resume.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={extractedPDFData.name}
                        onChange={(e) => updateExtractedData("name", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={extractedPDFData.email}
                        onChange={(e) => updateExtractedData("email", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={extractedPDFData.phone}
                        onChange={(e) => updateExtractedData("phone", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="title">Professional Title</Label>
                      <Input
                        id="title"
                        value={extractedPDFData.title}
                        onChange={(e) => updateExtractedData("title", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                      id="summary"
                      value={extractedPDFData.summary}
                      onChange={(e) => updateExtractedData("summary", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label>Skills</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {extractedPDFData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Experience</Label>
                    <div className="space-y-4 mt-2">
                      {extractedPDFData.experience.map((exp, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h4 className="font-semibold">
                            {exp.position} at {exp.company}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-300">{exp.duration}</p>
                          <p className="mt-2">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Education</Label>
                    <div className="space-y-4 mt-2">
                      {extractedPDFData.education.map((edu, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h4 className="font-semibold">{edu.degree}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            {edu.institution} • {edu.year}
                          </p>
                          {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Projects</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addMoreProject}
                        className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Project
                      </Button>
                    </div>
                    <div className="space-y-4 mt-2">
                      {extractedPDFData.projects.map((project, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <Label htmlFor={`project-name-${index}`}>Project Name</Label>
                              <Input
                                id={`project-name-${index}`}
                                value={project.name}
                                onChange={(e) => {
                                  const updated = [...extractedPDFData.projects]
                                  updated[index] = { ...updated[index], name: e.target.value }
                                  updateExtractedData("projects", updated)
                                }}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`project-link-${index}`}>Live Demo Link</Label>
                              <Input
                                id={`project-link-${index}`}
                                value={project.link || ""}
                                onChange={(e) => {
                                  const updated = [...extractedPDFData.projects]
                                  updated[index] = { ...updated[index], link: e.target.value }
                                  updateExtractedData("projects", updated)
                                }}
                                placeholder="https://demo.com"
                              />
                            </div>
                          </div>
                          <div className="mb-3">
                            <Label htmlFor={`project-description-${index}`}>Description</Label>
                            <Textarea
                              id={`project-description-${index}`}
                              value={project.description}
                              onChange={(e) => {
                                const updated = [...extractedPDFData.projects]
                                updated[index] = { ...updated[index], description: e.target.value }
                                updateExtractedData("projects", updated)
                              }}
                              className="min-h-[80px]"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`project-technologies-${index}`}>Technologies (comma-separated)</Label>
                              <Input
                                id={`project-technologies-${index}`}
                                value={project.technologies.join(", ")}
                                onChange={(e) => {
                                  const updated = [...extractedPDFData.projects]
                                  updated[index] = {
                                    ...updated[index],
                                    technologies: e.target.value
                                      .split(",")
                                      .map((t) => t.trim())
                                      .filter(Boolean),
                                  }
                                  updateExtractedData("projects", updated)
                                }}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`project-github-${index}`}>GitHub Link</Label>
                              <Input
                                id={`project-github-${index}`}
                                value={project.github || ""}
                                onChange={(e) => {
                                  const updated = [...extractedPDFData.projects]
                                  updated[index] = { ...updated[index], github: e.target.value }
                                  updateExtractedData("projects", updated)
                                }}
                                placeholder="https://github.com/username/project"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      {additionalProjects.map((project, index) => (
                        <div
                          key={`additional-${index}`}
                          className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950/20"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-blue-800 dark:text-blue-200">
                              Additional Project {index + 1}
                            </h4>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeProject(index)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <Label>Project Name</Label>
                              <Input
                                value={project.name}
                                onChange={(e) => updateAdditionalProject(index, "name", e.target.value)}
                                placeholder="Project name"
                              />
                            </div>
                            <div>
                              <Label>Live Demo Link</Label>
                              <Input
                                value={project.link || ""}
                                onChange={(e) => updateAdditionalProject(index, "link", e.target.value)}
                                placeholder="https://demo.com"
                              />
                            </div>
                          </div>
                          <div className="mb-3">
                            <Label>Description</Label>
                            <Textarea
                              value={project.description}
                              onChange={(e) => updateAdditionalProject(index, "description", e.target.value)}
                              placeholder="Describe your project..."
                              className="min-h-[80px]"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Technologies (comma-separated)</Label>
                              <Input
                                value={project.technologies.join(", ")}
                                onChange={(e) =>
                                  updateAdditionalProject(
                                    index,
                                    "technologies",
                                    e.target.value
                                      .split(",")
                                      .map((t) => t.trim())
                                      .filter(Boolean),
                                  )
                                }
                                placeholder="React, Node.js, MongoDB"
                              />
                            </div>
                            <div>
                              <Label>GitHub Link</Label>
                              <Input
                                value={project.github || ""}
                                onChange={(e) => updateAdditionalProject(index, "github", e.target.value)}
                                placeholder="https://github.com/username/project"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Social Media & Professional Links</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <Label htmlFor="linkedin">LinkedIn Profile</Label>
                        <Input
                          id="linkedin"
                          value={extractedPDFData.socialLinks?.linkedin || ""}
                          onChange={(e) =>
                            updateExtractedData("socialLinks", {
                              ...extractedPDFData.socialLinks,
                              linkedin: e.target.value,
                            })
                          }
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>
                      <div>
                        <Label htmlFor="github">GitHub Profile</Label>
                        <Input
                          id="github"
                          value={extractedPDFData.socialLinks?.github || ""}
                          onChange={(e) =>
                            updateExtractedData("socialLinks", {
                              ...extractedPDFData.socialLinks,
                              github: e.target.value,
                            })
                          }
                          placeholder="https://github.com/username"
                        />
                      </div>
                      <div>
                        <Label htmlFor="portfolio">Personal Portfolio</Label>
                        <Input
                          id="portfolio"
                          value={extractedPDFData.socialLinks?.portfolio || ""}
                          onChange={(e) =>
                            updateExtractedData("socialLinks", {
                              ...extractedPDFData.socialLinks,
                              portfolio: e.target.value,
                            })
                          }
                          placeholder="https://yourname.dev"
                        />
                      </div>
                      <div>
                        <Label htmlFor="twitter">Twitter/X Profile</Label>
                        <Input
                          id="twitter"
                          value={extractedPDFData.socialLinks?.twitter || ""}
                          onChange={(e) =>
                            updateExtractedData("socialLinks", {
                              ...extractedPDFData.socialLinks,
                              twitter: e.target.value,
                            })
                          }
                          placeholder="https://twitter.com/username"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button variant="outline" onClick={() => setActiveTab("manual")}>
                      Edit Manually
                    </Button>
                    <Button onClick={handleUseExtractedData}>Use This Data</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Choose Your Template
                  <Button variant="outline" onClick={randomizeTemplate}>
                    <Shuffle className="w-4 h-4 mr-2" />
                    Randomize
                  </Button>
                </CardTitle>
                <CardDescription>Select a template design for your portfolio website.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <Card
                      key={template.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                        selectedTemplate === template.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-lg ${template.color} flex items-center justify-center`}>
                            <Palette className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{template.name}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300">{template.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {selectedTemplate && (
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                          {templates.find((t) => t.id === selectedTemplate)?.name} Selected
                        </h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          Ready to generate your portfolio with this template.
                        </p>
                      </div>
                      <Button onClick={generatePortfolio} className="bg-blue-600 hover:bg-blue-700">
                        Generate Portfolio
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Portfolio Preview
                  <div className="space-x-2">
                    <Button variant="outline" onClick={() => setActiveTab("templates")}>
                      Change Template
                    </Button>
                    <Button
                      onClick={exportPortfolio}
                      disabled={isExporting}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isExporting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Exporting...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Export Portfolio
                        </>
                      )}
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>Preview your portfolio and export it as a complete website.</CardDescription>
              </CardHeader>
              <CardContent>
                {userData && selectedTemplate ? (
                  <div className="space-y-6">
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                        Portfolio for: <span className="font-semibold">{userData.name}</span>
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Template:{" "}
                        <span className="font-semibold">{templates.find((t) => t.id === selectedTemplate)?.name}</span>
                      </p>
                    </div>

                    <div className="border-2 border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                      <div className="bg-slate-50 dark:bg-slate-900 p-3 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div className="ml-4 text-sm text-slate-600 dark:text-slate-300">
                            {userData.name.replace(/\s+/g, "").toLowerCase()}.portfolio.com
                          </div>
                        </div>
                      </div>

                      <div className="h-[600px] overflow-y-auto">
                        <PortfolioPreview userData={userData} template={selectedTemplate} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <span className="font-semibold">Responsive Design</span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Works on all devices</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <span className="font-semibold">SEO Optimized</span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Search engine friendly</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <span className="font-semibold">Fast Loading</span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Optimized performance</p>
                        </CardContent>
                      </Card>
                    </div>

                    <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
                      <AlertCircle className="h-4 w-4 text-blue-500" />
                      <AlertDescription className="text-blue-700 dark:text-blue-300">
                        <strong>Export includes:</strong> Complete HTML website, CSS styling, JavaScript functionality,
                        and all assets. Ready to deploy on any hosting platform.
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-300">
                      Please complete the previous steps to preview your portfolio.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
