"use client"

import type React from "react"
import { useState, useCallback, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { type UserData, type TemplateType, TEMPLATE_OPTIONS } from "../types"
import { FresherForm } from "./FresherForm"
import { ExperiencedForm } from "./ExperiencedForm"
import { PortfolioPreview } from "./PortfolioPreview"
import { ShuffleIcon, UploadIcon } from "lucide-react"
import { useToast } from "../contexts/ToastContext"
import { useTheme } from "../contexts/ThemeContext"

export const PortfolioBuilder: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(TEMPLATE_OPTIONS[0].value)
  const [currentTab, setCurrentTab] = useState<"upload" | "manual" | "preview">("upload")
  const [resumeType, setResumeType] = useState<"fresher" | "experienced">("fresher")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { showToast } = useToast()
  const { theme } = useTheme()

  const handleManualDataSubmit = useCallback(
    (data: UserData) => {
      setUserData(data)
      setCurrentTab("preview")
      showToast("Success", "Portfolio data saved! Generating preview...")
    },
    [showToast],
  )

  const handleFileUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        if (file.type !== "application/pdf") {
          showToast("Error", "Please upload a PDF file.")
          return
        }

        showToast("Processing", "Parsing your resume. This may take a moment...")

        const simulatedParsedData: UserData = {
          name: "Simulated User",
          email: "simulated@example.com",
          phone: "+1 987 654 3210",
          linkedin: "linkedin.com/in/simulateduser",
          github: "github.com/simulateduser",
          tagline: "Software Engineer | Enthusiast in AI & Web Development",
          bio: "Highly motivated individual with a passion for building innovative solutions.",
          experience: [
            {
              title: "Software Developer Intern",
              company: "Innovative Tech",
              duration: "Summer 2023",
              description: "Assisted in developing and testing new features for a cloud-based platform.",
            },
          ],
          education: [{ degree: "B.S. Computer Science", institution: "City University", year: "2024" }],
          skills: ["Python", "Java", "SQL", "Git", "Data Analysis"],
          projects: [
            {
              title: "Smart Home System",
              description: "Developed an IoT system for home automation using Raspberry Pi.",
              link: "github.com/simulateduser/smarthome",
            },
          ],
          resumeDetails: { type: Math.random() > 0.5 ? "fresher" : "experienced" },
        }

        const reader = new FileReader()
        reader.onload = (e) => {
          const textContent = e.target?.result as string
          if (textContent.includes("Senior") || textContent.includes("Lead Engineer")) {
            simulatedParsedData.resumeDetails!.type = "experienced"
            simulatedParsedData.tagline = "Lead Software Architect"
            simulatedParsedData.experience = [
              {
                title: "Senior Software Architect",
                company: "Global Innovations",
                duration: "Jan 2018 - Present",
                description: "Designed and implemented scalable architectures for enterprise applications.",
              },
              ...(simulatedParsedData.experience || []),
            ]
          }
          setUserData(simulatedParsedData)
          setResumeType(simulatedParsedData.resumeDetails?.type || "fresher")
          setCurrentTab("manual")
          showToast("Success", "Resume parsed! Please verify and adjust details.")
        }
        reader.readAsText(file)
      }
    },
    [showToast],
  )

  const handleExport = useCallback((template: TemplateType, data: UserData) => {
    console.log(`Exporting ${template} portfolio for`, data)
  }, [])

  const handleShare = useCallback(
    (template: TemplateType, data: UserData) => {
      const portfolioUrl = `https://quickfolio.com/share/${template}/${btoa(JSON.stringify(data))}`
      navigator.clipboard.writeText(portfolioUrl)
      console.log(`Shareable URL: ${portfolioUrl}`)
      showToast("Success", "Shareable link copied to clipboard!")
    },
    [showToast],
  )

  const handleShuffleTemplate = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * TEMPLATE_OPTIONS.length)
    setSelectedTemplate(TEMPLATE_OPTIONS[randomIndex].value)
    showToast("Success", "Template shuffled!")
  }, [showToast])

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">QuickFolio Builder</CardTitle>
          <CardDescription>Generate your professional portfolio in minutes.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload" className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Upload Resume
              </TabsTrigger>
              <TabsTrigger value="manual" className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Manual Entry
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                disabled={!userData}
              >
                Preview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="upload" className="pt-4">
              <div
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 space-y-4 cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
                onClick={handleFileUploadClick}
              >
                <UploadIcon className="h-10 w-10 text-gray-500 dark:text-gray-400" />
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Drag & drop your PDF resume here, or click to upload
                </p>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf" className="hidden" />
                <Button type="button">Select PDF Resume</Button>
              </div>
            </TabsContent>
            <TabsContent value="manual" className="pt-4">
              {resumeType === "fresher" ? (
                <FresherForm onDataSubmit={handleManualDataSubmit} initialData={userData || undefined} />
              ) : (
                <ExperiencedForm onDataSubmit={handleManualDataSubmit} initialData={userData || undefined} />
              )}
            </TabsContent>
            <TabsContent value="preview" className="pt-4 space-y-4">
              {userData ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Choose Your Template</h3>
                    <Button
                      onClick={handleShuffleTemplate}
                      variant="outline"
                      className="flex items-center gap-2 bg-transparent"
                    >
                      <ShuffleIcon className="h-4 w-4" /> Shuffle Template
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {TEMPLATE_OPTIONS.slice(0, 5).map((template) => (
                      <Card
                        key={template.value}
                        className={`cursor-pointer hover:shadow-lg transition-shadow duration-200 ${selectedTemplate === template.value ? "border-primary ring-2 ring-primary" : "border-transparent"}`}
                        onClick={() => setSelectedTemplate(template.value)}
                      >
                        <CardContent className="p-4 flex flex-col items-center justify-center">
                          <img
                            src="/placeholder.svg"
                            alt={`Template ${template.label} thumbnail`}
                            width={200}
                            height={150}
                            className="object-cover rounded-md mb-2"
                          />
                          <h4 className="font-semibold text-center">{template.label}</h4>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-8">
                    <PortfolioPreview
                      userData={userData}
                      selectedTemplate={selectedTemplate}
                      onExport={handleExport}
                      onShare={handleShare}
                    />
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Please upload your resume or manually enter your details to preview your portfolio.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
