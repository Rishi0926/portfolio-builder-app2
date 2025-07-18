"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, ExternalLink, MapPin, Award, User, Github, Linkedin, Twitter, Globe, Zap } from "lucide-react"

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

// Template 6: Elegant Classic
export const ElegantTemplate = ({ userData }: { userData: UserData }) => (
  <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-2xl">
      {/* Elegant Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-600 text-white p-12">
        <div className="text-center">
          <h1 className="text-5xl font-serif mb-4">{userData.name}</h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-4"></div>
          <p className="text-2xl text-gray-200 mb-6">{userData.title}</p>
          <div className="flex justify-center items-center space-x-8 text-sm">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              {userData.location}
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              {userData.email}
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              {userData.phone}
            </div>
          </div>
        </div>
      </div>

      <div className="p-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Professional Summary */}
            <section>
              <h2 className="text-3xl font-serif border-b-2 border-yellow-400 pb-2 mb-6">Professional Summary</h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{userData.summary}</p>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-3xl font-serif border-b-2 border-yellow-400 pb-2 mb-6">Professional Experience</h2>
              <div className="space-y-8">
                {userData.experience.map((exp, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{exp.position}</h3>
                        <p className="text-yellow-600 font-semibold text-lg">{exp.company}</p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{exp.description}</p>
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx}>{resp}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-3xl font-serif border-b-2 border-yellow-400 pb-2 mb-6">Featured Projects</h2>
              <div className="grid gap-8">
                {userData.projects.map((project, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">{project.name}</h3>
                      <div className="flex space-x-2">
                        {project.link && <ExternalLink className="h-5 w-5 text-yellow-600" />}
                        {project.github && <Github className="h-5 w-5 text-yellow-600" />}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="border-yellow-400 text-yellow-700">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    {project.features && project.features.length > 0 && (
                      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                        {project.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Skills */}
            <section>
              <h2 className="text-2xl font-serif border-b-2 border-yellow-400 pb-2 mb-4">Skills</h2>
              <div className="space-y-2">
                {userData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-center font-medium"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-2xl font-serif border-b-2 border-yellow-400 pb-2 mb-4">Education</h2>
              <div className="space-y-4">
                {userData.education.map((edu, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-800 dark:text-white">{edu.degree}</h3>
                    <p className="text-yellow-600 font-medium">{edu.institution}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-600 dark:text-gray-300">{edu.year}</span>
                      {edu.gpa && (
                        <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">{edu.gpa}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications */}
            {userData.certifications && userData.certifications.length > 0 && (
              <section>
                <h2 className="text-2xl font-serif border-b-2 border-yellow-400 pb-2 mb-4">Certifications</h2>
                <div className="space-y-2">
                  {userData.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                      <Award className="h-4 w-4 text-yellow-600 mr-2" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {userData.languages && userData.languages.length > 0 && (
              <section>
                <h2 className="text-2xl font-serif border-b-2 border-yellow-400 pb-2 mb-4">Languages</h2>
                <div className="space-y-2">
                  {userData.languages.map((lang, index) => (
                    <div key={index} className="text-gray-700 dark:text-gray-300">
                      {lang}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Social Links */}
            <section>
              <h2 className="text-2xl font-serif border-b-2 border-yellow-400 pb-2 mb-4">Connect</h2>
              <div className="space-y-3">
                {userData.socialLinks.linkedin && (
                  <div className="flex items-center">
                    <Linkedin className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-sm">LinkedIn</span>
                  </div>
                )}
                {userData.socialLinks.github && (
                  <div className="flex items-center">
                    <Github className="h-5 w-5 text-gray-800 dark:text-white mr-3" />
                    <span className="text-sm">GitHub</span>
                  </div>
                )}
                {userData.socialLinks.portfolio && (
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-sm">Portfolio</span>
                  </div>
                )}
                {userData.socialLinks.twitter && (
                  <div className="flex items-center">
                    <Twitter className="h-5 w-5 text-blue-400 mr-3" />
                    <span className="text-sm">Twitter</span>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// Template 7: Vibrant Energy
export const VibrantTemplate = ({ userData }: { userData: UserData }) => (
  <div className="bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 min-h-screen">
    <div className="container mx-auto px-6 py-12">
      {/* Vibrant Header with Animation */}
      <div className="text-center mb-16">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl">
            <div className="w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce">
              <span className="text-4xl font-bold text-white">
                {userData.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              {userData.name}
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-300 mb-6">{userData.title}</p>
            <div className="flex justify-center items-center space-x-8 text-sm">
              <div className="flex items-center bg-pink-100 dark:bg-pink-900/30 px-4 py-2 rounded-full">
                <MapPin className="h-4 w-4 mr-2 text-pink-600" />
                {userData.location}
              </div>
              <div className="flex items-center bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-full">
                <Mail className="h-4 w-4 mr-2 text-purple-600" />
                {userData.email}
              </div>
              <div className="flex items-center bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-full">
                <Phone className="h-4 w-4 mr-2 text-indigo-600" />
                {userData.phone}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* About Me Card */}
        <Card className="lg:col-span-2 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/10 dark:to-purple-900/10 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-pink-600">
              <User className="h-6 w-6 mr-2" />
              About Me
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{userData.summary}</p>
          </CardContent>
        </Card>

        {/* Skills Showcase */}
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-purple-600">
              <Zap className="h-6 w-6 mr-2" />
              Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {userData.skills.map((skill, index) => (
                <Badge key={index} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-105 transition-transform">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Experience Timeline */}
        <Card className="lg:col-span-3 bg-gradient-to-r from-indigo-50 to-pink-50 dark:from-indigo-900/10 dark:to-pink-900/10 border-0 shadow-xl\
