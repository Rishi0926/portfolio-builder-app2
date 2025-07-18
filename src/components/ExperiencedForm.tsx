"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import type { UserData } from "../types"

interface ExperiencedFormProps {
  onDataSubmit: (data: UserData) => void
  initialData?: UserData
}

export const ExperiencedForm: React.FC<ExperiencedFormProps> = ({ onDataSubmit, initialData }) => {
  const [formData, setFormData] = useState<UserData>(
    initialData || {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      tagline: "Senior Software Engineer",
      bio: "Experienced software engineer with a proven track record of delivering high-quality solutions.",
      experience: [
        {
          title: "Software Engineer",
          company: "Tech Solutions Inc.",
          duration: "Jan 2020 - Present",
          description: "Developed and maintained web applications.",
        },
      ],
      education: [{ degree: "Bachelor of Science in Computer Science", institution: "Major University", year: "2019" }],
      skills: ["React", "Node.js", "TypeScript", "AWS", "Databases"],
      projects: [
        {
          title: "E-commerce Platform",
          description: "Led the development of a scalable e-commerce platform.",
          link: "https://example.com/ecommerce",
        },
      ],
      resumeDetails: { type: "experienced" },
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const newExperience = [...(formData.experience || [])]
    newExperience[index] = { ...newExperience[index], [field]: value }
    setFormData((prev) => ({ ...prev, experience: newExperience }))
  }

  const handleEducationChange = (index: number, field: string, value: string) => {
    const newEducation = [...(formData.education || [])]
    newEducation[index] = { ...newEducation[index], [field]: value }
    setFormData((prev) => ({ ...prev, education: newEducation }))
  }

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, skills: e.target.value.split(",").map((s) => s.trim()) }))
  }

  const handleProjectChange = (index: number, field: string, value: string) => {
    const newProjects = [...(formData.projects || [])]
    newProjects[index] = { ...newProjects[index], [field]: value }
    setFormData((prev) => ({ ...prev, projects: newProjects }))
  }

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...(prev.experience || []), { title: "", company: "", duration: "", description: "" }],
    }))
  }

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...(prev.education || []), { degree: "", institution: "", year: "" }],
    }))
  }

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), { title: "", description: "", link: "" }],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onDataSubmit(formData)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Experienced Professional Portfolio Details</CardTitle>
        <CardDescription>
          Enter your professional experience and project details to build your portfolio.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
              <Input id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="github">GitHub Profile (Optional)</Label>
              <Input id="github" name="github" value={formData.github} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" name="tagline" value={formData.tagline} onChange={handleChange} />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">About Me</Label>
            <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} className="min-h-[100px]" />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Experience</h3>
            {(formData.experience || []).map((exp, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md">
                <div>
                  <Label htmlFor={`exp-title-${index}`}>Job Title</Label>
                  <Input
                    id={`exp-title-${index}`}
                    value={exp.title}
                    onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`exp-company-${index}`}>Company</Label>
                  <Input
                    id={`exp-company-${index}`}
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor={`exp-duration-${index}`}>Duration</Label>
                  <Input
                    id={`exp-duration-${index}`}
                    value={exp.duration}
                    onChange={(e) => handleExperienceChange(index, "duration", e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor={`exp-description-${index}`}>Description</Label>
                  <Textarea
                    id={`exp-description-${index}`}
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addExperience}>
              Add Experience
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Education</h3>
            {(formData.education || []).map((edu, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 rounded-md">
                <div>
                  <Label htmlFor={`edu-degree-${index}`}>Degree</Label>
                  <Input
                    id={`edu-degree-${index}`}
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`edu-institution-${index}`}>Institution</Label>
                  <Input
                    id={`edu-institution-${index}`}
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`edu-year-${index}`}>Graduation Year</Label>
                  <Input
                    id={`edu-year-${index}`}
                    value={edu.year}
                    onChange={(e) => handleEducationChange(index, "year", e.target.value)}
                  />
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addEducation}>
              Add Education
            </Button>
          </div>

          <div>
            <Label htmlFor="skills">Skills (comma-separated)</Label>
            <Input id="skills" name="skills" value={(formData.skills || []).join(", ")} onChange={handleSkillsChange} />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Projects</h3>
            {(formData.projects || []).map((project, index) => (
              <div key={index} className="grid grid-cols-1 gap-4 border p-4 rounded-md">
                <div>
                  <Label htmlFor={`project-title-${index}`}>Project Title</Label>
                  <Input
                    id={`project-title-${index}`}
                    value={project.title}
                    onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`project-description-${index}`}>Description</Label>
                  <Textarea
                    id={`project-description-${index}`}
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
                <div>
                  <Label htmlFor={`project-link-${index}`}>Project Link (Optional)</Label>
                  <Input
                    id={`project-link-${index}`}
                    value={project.link}
                    onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                  />
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addProject}>
              Add Project
            </Button>
          </div>

          <Button type="submit" className="w-full">
            Generate Portfolio
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
