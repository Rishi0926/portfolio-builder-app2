"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ExperiencedFormProps {
  onSubmit: (formData: FormData) => void
}

export default function ExperiencedForm({ onSubmit }: ExperiencedFormProps) {
  return (
    <form action={onSubmit} className="space-y-8">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your professional contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="John Doe" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="john@example.com" required />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" placeholder="+1 (555) 123-4567" required />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" placeholder="San Francisco, CA" required />
            </div>
          </div>
          <div>
            <Label htmlFor="title">Professional Title</Label>
            <Input id="title" name="title" placeholder="Senior Full Stack Developer" required />
          </div>
        </CardContent>
      </Card>

      {/* Professional Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
          <CardDescription>A compelling overview of your professional background</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              name="summary"
              placeholder="Experienced software developer with 5+ years in web development, specializing in React, Node.js, and cloud technologies..."
              rows={4}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Skills & Expertise */}
      <Card>
        <CardHeader>
          <CardTitle>Skills & Expertise</CardTitle>
          <CardDescription>Your technical and professional skills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="skills">Technical Skills (comma-separated)</Label>
            <Input
              id="skills"
              name="skills"
              placeholder="JavaScript, React, Node.js, Python, AWS, Docker, MongoDB"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="languages">Languages (comma-separated)</Label>
              <Input id="languages" name="languages" placeholder="English (Native), Spanish (Fluent)" />
            </div>
            <div>
              <Label htmlFor="certifications">Certifications (comma-separated)</Label>
              <Input
                id="certifications"
                name="certifications"
                placeholder="AWS Solutions Architect, React Developer Certification"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Experience */}
      <Card>
        <CardHeader>
          <CardTitle>Work Experience</CardTitle>
          <CardDescription>Your professional work history</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Current/Most Recent Position</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="company1">Company</Label>
                <Input id="company1" name="company1" placeholder="Tech Solutions Inc." required />
              </div>
              <div>
                <Label htmlFor="position1">Position</Label>
                <Input id="position1" name="position1" placeholder="Senior Full Stack Developer" required />
              </div>
              <div>
                <Label htmlFor="duration1">Duration</Label>
                <Input id="duration1" name="duration1" placeholder="2021 - Present" required />
              </div>
            </div>
            <div>
              <Label htmlFor="description1">Job Description</Label>
              <Textarea
                id="description1"
                name="description1"
                placeholder="Led development of microservices architecture, improved system performance by 40%..."
                rows={2}
                required
              />
            </div>
            <div>
              <Label htmlFor="responsibilities1">Key Responsibilities (comma-separated)</Label>
              <Input
                id="responsibilities1"
                name="responsibilities1"
                placeholder="Architected scalable web applications, Mentored junior developers, Implemented CI/CD pipelines"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Previous Position</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="company2">Company</Label>
                <Input id="company2" name="company2" placeholder="StartupXYZ" />
              </div>
              <div>
                <Label htmlFor="position2">Position</Label>
                <Input id="position2" name="position2" placeholder="Frontend Developer" />
              </div>
              <div>
                <Label htmlFor="duration2">Duration</Label>
                <Input id="duration2" name="duration2" placeholder="2019 - 2021" />
              </div>
            </div>
            <div>
              <Label htmlFor="description2">Job Description</Label>
              <Textarea
                id="description2"
                name="description2"
                placeholder="Built responsive web applications using React and TypeScript..."
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="responsibilities2">Key Responsibilities (comma-separated)</Label>
              <Input
                id="responsibilities2"
                name="responsibilities2"
                placeholder="Developed responsive web applications, Collaborated with UX/UI designers, Integrated APIs"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Featured Projects</CardTitle>
          <CardDescription>Showcase your best professional and personal projects</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Project 1</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="projectName1">Project Name</Label>
                <Input id="projectName1" name="projectName1" placeholder="E-commerce Platform" />
              </div>
              <div>
                <Label htmlFor="projectLink1">Live Demo Link</Label>
                <Input id="projectLink1" name="projectLink1" placeholder="https://demo.com" />
              </div>
            </div>
            <div>
              <Label htmlFor="projectDescription1">Description</Label>
              <Textarea
                id="projectDescription1"
                name="projectDescription1"
                placeholder="Full-stack e-commerce solution with payment integration and admin dashboard..."
                rows={2}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="technologies1">Technologies (comma-separated)</Label>
                <Input id="technologies1" name="technologies1" placeholder="React, Node.js, MongoDB, Stripe" />
              </div>
              <div>
                <Label htmlFor="github1">GitHub Link</Label>
                <Input id="github1" name="github1" placeholder="https://github.com/johndoe/project" />
              </div>
            </div>
            <div>
              <Label htmlFor="features1">Key Features (comma-separated)</Label>
              <Input
                id="features1"
                name="features1"
                placeholder="User authentication, Payment processing, Inventory management, Admin dashboard"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Project 2</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="projectName2">Project Name</Label>
                <Input id="projectName2" name="projectName2" placeholder="Task Management App" />
              </div>
              <div>
                <Label htmlFor="projectLink2">Live Demo Link</Label>
                <Input id="projectLink2" name="projectLink2" placeholder="https://taskapp.com" />
              </div>
            </div>
            <div>
              <Label htmlFor="projectDescription2">Description</Label>
              <Textarea
                id="projectDescription2"
                name="projectDescription2"
                placeholder="Collaborative task management tool with real-time updates..."
                rows={2}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="technologies2">Technologies (comma-separated)</Label>
                <Input id="technologies2" name="technologies2" placeholder="Vue.js, Firebase, Socket.io" />
              </div>
              <div>
                <Label htmlFor="github2">GitHub Link</Label>
                <Input id="github2" name="github2" placeholder="https://github.com/johndoe/taskapp" />
              </div>
            </div>
            <div>
              <Label htmlFor="features2">Key Features (comma-separated)</Label>
              <Input
                id="features2"
                name="features2"
                placeholder="Real-time collaboration, Drag & drop, File attachments, Mobile responsive"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
          <CardDescription>Your educational background</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="institution">Institution</Label>
              <Input id="institution" name="institution" placeholder="University of Technology" />
            </div>
            <div>
              <Label htmlFor="degree">Degree</Label>
              <Input id="degree" name="degree" placeholder="Bachelor of Computer Science" />
            </div>
            <div>
              <Label htmlFor="year">Graduation Year</Label>
              <Input id="year" name="year" placeholder="2019" />
            </div>
            <div>
              <Label htmlFor="gpa">GPA/Grade</Label>
              <Input id="gpa" name="gpa" placeholder="3.8/4.0" />
            </div>
          </div>
          <div>
            <Label htmlFor="coursework">Relevant Coursework (comma-separated)</Label>
            <Input
              id="coursework"
              name="coursework"
              placeholder="Data Structures, Algorithms, Database Systems, Software Engineering"
            />
          </div>
        </CardContent>
      </Card>

      {/* Achievements & Additional Info */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements & Additional Information</CardTitle>
          <CardDescription>Awards, publications, speaking engagements, etc.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="achievements">Professional Achievements (comma-separated)</Label>
            <Input
              id="achievements"
              name="achievements"
              placeholder="Led team of 8 developers, Improved system performance by 40%, Published 3 technical articles"
            />
          </div>
          <div>
            <Label htmlFor="hobbies">Hobbies & Interests (comma-separated)</Label>
            <Input
              id="hobbies"
              name="hobbies"
              placeholder="Open Source Contributing, Photography, Rock Climbing, Chess"
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Links</CardTitle>
          <CardDescription>Your online professional presence</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input id="linkedin" name="linkedin" placeholder="https://linkedin.com/in/johndoe" />
            </div>
            <div>
              <Label htmlFor="github">GitHub Profile</Label>
              <Input id="github" name="github" placeholder="https://github.com/johndoe" />
            </div>
            <div>
              <Label htmlFor="portfolio">Personal Portfolio</Label>
              <Input id="portfolio" name="portfolio" placeholder="https://johndoe.dev" />
            </div>
            <div>
              <Label htmlFor="twitter">Twitter/X Profile</Label>
              <Input id="twitter" name="twitter" placeholder="https://twitter.com/johndoe" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" size="lg">
        Create My Portfolio
      </Button>
    </form>
  )
}
