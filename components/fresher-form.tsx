"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FresherFormProps {
  onSubmit: (formData: FormData) => void
}

export default function FresherForm({ onSubmit }: FresherFormProps) {
  return (
    <form action={onSubmit} className="space-y-8">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Let's start with your basic details</CardDescription>
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
              <Input id="location" name="location" placeholder="New York, NY" required />
            </div>
          </div>
          <div>
            <Label htmlFor="title">Desired Position/Field</Label>
            <Input id="title" name="title" placeholder="Frontend Developer / Software Engineer" required />
          </div>
        </CardContent>
      </Card>

      {/* Career Objective */}
      <Card>
        <CardHeader>
          <CardTitle>Career Objective</CardTitle>
          <CardDescription>What are your career goals and aspirations?</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="summary">Career Objective</Label>
            <Textarea
              id="summary"
              name="summary"
              placeholder="Ambitious computer science graduate seeking an entry-level position as a software developer to utilize my programming skills and contribute to innovative projects..."
              rows={4}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
          <CardDescription>Your academic background</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="institution">University/College</Label>
              <Input id="institution" name="institution" placeholder="University of Technology" required />
            </div>
            <div>
              <Label htmlFor="degree">Degree</Label>
              <Input id="degree" name="degree" placeholder="Bachelor of Computer Science" required />
            </div>
            <div>
              <Label htmlFor="year">Graduation Year</Label>
              <Input id="year" name="year" placeholder="2024" required />
            </div>
            <div>
              <Label htmlFor="gpa">GPA/Percentage</Label>
              <Input id="gpa" name="gpa" placeholder="3.8/4.0 or 85%" />
            </div>
          </div>
          <div>
            <Label htmlFor="coursework">Relevant Coursework (comma-separated)</Label>
            <Input
              id="coursework"
              name="coursework"
              placeholder="Data Structures, Algorithms, Database Systems, Web Development, Machine Learning"
            />
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Skills & Technologies</CardTitle>
          <CardDescription>Technical and soft skills you possess</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="skills">Technical Skills (comma-separated)</Label>
            <Input id="skills" name="skills" placeholder="JavaScript, Python, React, HTML/CSS, Git, MySQL" required />
          </div>
          <div>
            <Label htmlFor="languages">Languages (comma-separated)</Label>
            <Input id="languages" name="languages" placeholder="English (Fluent), Spanish (Intermediate)" />
          </div>
        </CardContent>
      </Card>

      {/* Academic Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Projects</CardTitle>
          <CardDescription>Projects you've worked on during your studies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Project 1</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="project1Name">Project Name</Label>
                <Input id="project1Name" name="project1Name" placeholder="Student Management System" />
              </div>
              <div>
                <Label htmlFor="project1Duration">Duration</Label>
                <Input id="project1Duration" name="project1Duration" placeholder="3 months" />
              </div>
            </div>
            <div>
              <Label htmlFor="project1Description">Description</Label>
              <Textarea
                id="project1Description"
                name="project1Description"
                placeholder="Developed a web-based student management system with features for student registration, grade tracking, and report generation..."
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="project1Technologies">Technologies Used (comma-separated)</Label>
              <Input id="project1Technologies" name="project1Technologies" placeholder="React, Node.js, MongoDB" />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Project 2</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="project2Name">Project Name</Label>
                <Input id="project2Name" name="project2Name" placeholder="E-commerce Mobile App" />
              </div>
              <div>
                <Label htmlFor="project2Duration">Duration</Label>
                <Input id="project2Duration" name="project2Duration" placeholder="4 months" />
              </div>
            </div>
            <div>
              <Label htmlFor="project2Description">Description</Label>
              <Textarea
                id="project2Description"
                name="project2Description"
                placeholder="Created a mobile e-commerce application with user authentication, product catalog, shopping cart functionality..."
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="project2Technologies">Technologies Used (comma-separated)</Label>
              <Input id="project2Technologies" name="project2Technologies" placeholder="Flutter, Firebase, Dart" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Internships */}
      <Card>
        <CardHeader>
          <CardTitle>Internships & Training</CardTitle>
          <CardDescription>Any internships or training programs you've completed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="internshipCompany">Company/Organization</Label>
              <Input id="internshipCompany" name="internshipCompany" placeholder="TechCorp Solutions" />
            </div>
            <div>
              <Label htmlFor="internshipRole">Role</Label>
              <Input id="internshipRole" name="internshipRole" placeholder="Software Development Intern" />
            </div>
            <div>
              <Label htmlFor="internshipDuration">Duration</Label>
              <Input id="internshipDuration" name="internshipDuration" placeholder="3 months (Summer 2023)" />
            </div>
          </div>
          <div>
            <Label htmlFor="internshipDescription">Description</Label>
            <Textarea
              id="internshipDescription"
              name="internshipDescription"
              placeholder="Worked on frontend development using React, collaborated with senior developers, participated in code reviews..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Certifications & Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Certifications & Achievements</CardTitle>
          <CardDescription>Any certifications, awards, or notable achievements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="certifications">Certifications (comma-separated)</Label>
            <Input
              id="certifications"
              name="certifications"
              placeholder="AWS Cloud Practitioner, Google Analytics Certified, freeCodeCamp Responsive Web Design"
            />
          </div>
          <div>
            <Label htmlFor="achievements">Achievements & Awards (comma-separated)</Label>
            <Input
              id="achievements"
              name="achievements"
              placeholder="Dean's List, Hackathon Winner 2023, Best Final Year Project Award"
            />
          </div>
        </CardContent>
      </Card>

      {/* Extracurricular Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Extracurricular Activities</CardTitle>
          <CardDescription>Activities outside of academics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="extracurriculars">Activities & Leadership Roles (comma-separated)</Label>
            <Input
              id="extracurriculars"
              name="extracurriculars"
              placeholder="Computer Science Club President, Debate Team Member, Volunteer at Local NGO"
            />
          </div>
          <div>
            <Label htmlFor="hobbies">Hobbies & Interests (comma-separated)</Label>
            <Input
              id="hobbies"
              name="hobbies"
              placeholder="Programming, Photography, Playing Guitar, Reading Tech Blogs"
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle>Online Presence</CardTitle>
          <CardDescription>Your professional social media and portfolio links</CardDescription>
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
              <Label htmlFor="twitter">Twitter/X (Optional)</Label>
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
