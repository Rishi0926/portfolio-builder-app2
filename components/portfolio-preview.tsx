"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Mail,
  Phone,
  ExternalLink,
  Calendar,
  Building,
  MapPin,
  User,
  Github,
  Linkedin,
  Twitter,
  Globe,
} from "lucide-react"

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

interface PortfolioPreviewProps {
  userData: UserData
  template: string
}

const ModernTemplate = ({ userData }: { userData: UserData }) => (
  <div className="bg-white dark:bg-gray-900 min-h-screen">
    {/* Header */}
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">{userData.name}</h1>
        <p className="text-xl mb-6">{userData.title}</p>
        <div className="flex justify-center space-x-6 text-sm">
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

    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">About Me</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{userData.summary}</p>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Experience</h2>
            <div className="space-y-6">
              {userData.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{exp.position}</h3>
                  <div className="flex items-center text-blue-600 mb-2">
                    <Building className="h-4 w-4 mr-2" />
                    <span className="font-medium">{exp.company}</span>
                    <Calendar className="h-4 w-4 ml-4 mr-2" />
                    <span>{exp.duration}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Projects</h2>
            <div className="grid gap-6">
              {userData.projects.map((project, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{project.name}</CardTitle>
                      {project.link && <ExternalLink className="h-5 w-5 text-blue-600" />}
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Skills */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {userData.skills.map((skill, index) => (
                <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {skill}
                </Badge>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Education</h2>
            <div className="space-y-4">
              {userData.education.map((edu, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 dark:text-white">{edu.degree}</h3>
                  <p className="text-blue-600 font-medium">{edu.institution}</p>
                  <p className="text-gray-600 dark:text-gray-300">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
)

const CreativeTemplate = ({ userData }: { userData: UserData }) => (
  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900 min-h-screen">
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-4xl font-bold text-white">
            {userData.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          {userData.name}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">{userData.title}</p>
        <div className="flex justify-center space-x-6">
          <span className="flex items-center text-purple-600">
            <Mail className="h-4 w-4 mr-2" />
            {userData.email}
          </span>
          <span className="flex items-center text-purple-600">
            <Phone className="h-4 w-4 mr-2" />
            {userData.phone}
          </span>
        </div>
      </div>

      {/* Content in Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-purple-600">About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">{userData.summary}</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-purple-600">Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userData.skills.map((skill, index) => (
                <Badge key={index} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm md:col-span-2">
          <CardHeader>
            <CardTitle className="text-purple-600">Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {userData.experience.map((exp, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-purple-300">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold">{exp.position}</h3>
                  <p className="text-purple-600 font-medium">
                    {exp.company} • {exp.duration}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm md:col-span-2">
          <CardHeader>
            <CardTitle className="text-purple-600">Featured Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {userData.projects.map((project, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg"
                >
                  <h3 className="font-semibold text-lg mb-2">{project.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
)

const ProfessionalTemplate = ({ userData }: { userData: UserData }) => (
  <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl">
      {/* Header */}
      <div className="bg-gray-800 dark:bg-gray-700 text-white p-8">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold">
              {userData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
            <p className="text-xl text-gray-300 mb-3">{userData.title}</p>
            <div className="flex space-x-4 text-sm">
              <span className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                {userData.email}
              </span>
              <span className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                {userData.phone}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3 border-b-2 border-green-500 pb-1">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{userData.summary}</p>
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3 border-b-2 border-green-500 pb-1">
            CORE COMPETENCIES
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {userData.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded text-center text-sm font-medium"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3 border-b-2 border-green-500 pb-1">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-6">
            {userData.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{exp.position}</h3>
                    <p className="text-green-600 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">{exp.duration}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3 border-b-2 border-green-500 pb-1">
            KEY PROJECTS
          </h2>
          <div className="space-y-4">
            {userData.projects.map((project, index) => (
              <div key={index} className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-800 dark:text-white">{project.name}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3 border-b-2 border-green-500 pb-1">
            EDUCATION
          </h2>
          {userData.education.map((edu, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">{edu.degree}</h3>
                <p className="text-gray-600 dark:text-gray-400">{edu.institution}</p>
              </div>
              <span className="text-gray-600 dark:text-gray-400 font-medium">{edu.year}</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  </div>
)

const ArtisticTemplate = ({ userData }: { userData: UserData }) => (
  <div className="bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-red-900/20 min-h-screen">
    <div className="container mx-auto px-6 py-12">
      {/* Artistic Header */}
      <div className="text-center mb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-10 rounded-3xl transform rotate-3"></div>
        <div className="relative bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-2xl transform -rotate-1">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            {userData.name}
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-6">{userData.title}</p>
          <div className="flex justify-center space-x-8 text-orange-600">
            <span className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              {userData.email}
            </span>
            <span className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              {userData.phone}
            </span>
          </div>
        </div>
      </div>

      {/* Artistic Layout */}
      <div className="space-y-12">
        {/* About Section */}
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-r from-orange-200 to-red-200 rounded-2xl transform rotate-2"></div>
          <Card className="relative bg-white dark:bg-gray-800 transform -rotate-1">
            <CardHeader>
              <CardTitle className="text-3xl text-orange-600">My Story</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{userData.summary}</p>
            </CardContent>
          </Card>
        </div>

        {/* Skills in Creative Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <div className="absolute -top-2 -right-2 w-full h-full bg-gradient-to-r from-yellow-200 to-orange-200 rounded-2xl transform rotate-1"></div>
            <Card className="relative bg-white dark:bg-gray-800 transform -rotate-1">
              <CardHeader>
                <CardTitle className="text-2xl text-orange-600">Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {userData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 p-3 rounded-lg text-center font-medium transform hover:scale-105 transition-transform"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative">
            <div className="absolute -top-2 -left-2 w-full h-full bg-gradient-to-r from-red-200 to-pink-200 rounded-2xl transform -rotate-1"></div>
            <Card className="relative bg-white dark:bg-gray-800 transform rotate-1">
              <CardHeader>
                <CardTitle className="text-2xl text-orange-600">Education</CardTitle>
              </CardHeader>
              <CardContent>
                {userData.education.map((edu, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <h3 className="font-bold text-lg">{edu.degree}</h3>
                    <p className="text-orange-600 font-medium">{edu.institution}</p>
                    <p className="text-gray-600 dark:text-gray-400">{edu.year}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-r from-pink-200 to-orange-200 rounded-2xl transform -rotate-2"></div>
          <Card className="relative bg-white dark:bg-gray-800 transform rotate-1">
            <CardHeader>
              <CardTitle className="text-3xl text-orange-600">Professional Journey</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {userData.experience.map((exp, index) => (
                  <div key={index} className="relative pl-8">
                    <div className="absolute left-0 top-2 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                    <div className="absolute left-2 top-6 w-0.5 h-full bg-gradient-to-b from-orange-300 to-red-300"></div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{exp.position}</h3>
                    <p className="text-orange-600 font-semibold text-lg">{exp.company}</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{exp.duration}</p>
                    <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Gallery */}
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-r from-yellow-200 to-red-200 rounded-2xl transform rotate-1"></div>
          <Card className="relative bg-white dark:bg-gray-800 transform -rotate-1">
            <CardHeader>
              <CardTitle className="text-3xl text-orange-600">Creative Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {userData.projects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-xl transform hover:scale-105 transition-transform"
                  >
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{project.name}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
)

const TechTemplate = ({ userData }: { userData: UserData }) => (
  <div className="bg-gray-900 text-green-400 min-h-screen font-mono">
    <div className="container mx-auto px-6 py-12">
      {/* Terminal Header */}
      <div className="bg-black rounded-t-lg p-4 border border-green-500">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-green-400">portfolio@terminal:~$</span>
        </div>

        <div className="space-y-2 text-sm">
          <div>
            <span className="text-blue-400">$</span> whoami
          </div>
          <div className="text-green-300">{userData.name}</div>
          <div>
            <span className="text-blue-400">$</span> cat profile.txt
          </div>
          <div className="text-green-300">{userData.title}</div>
          <div>
            <span className="text-blue-400">$</span> echo $CONTACT
          </div>
          <div className="text-green-300">
            {userData.email} | {userData.phone}
          </div>
        </div>
      </div>

      <div className="bg-black border-x border-b border-green-500 rounded-b-lg p-6">
        {/* About Section */}
        <div className="mb-8">
          <div className="text-blue-400 mb-2">// About Me</div>
          <div className="bg-gray-800 p-4 rounded border-l-4 border-green-500">
            <pre className="text-green-300 whitespace-pre-wrap text-sm">{userData.summary}</pre>
          </div>
        </div>

        {/* Skills Array */}
        <div className="mb-8">
          <div className="text-blue-400 mb-2">const skills = [</div>
          <div className="ml-4 space-y-1">
            {userData.skills.map((skill, index) => (
              <div key={index} className="text-green-300">
                "{skill}"{index < userData.skills.length - 1 ? "," : ""}
              </div>
            ))}
          </div>
          <div className="text-blue-400">];</div>
        </div>

        {/* Experience Object */}
        <div className="mb-8">
          <div className="text-blue-400 mb-2">const experience = {`{`}</div>
          <div className="ml-4 space-y-4">
            {userData.experience.map((exp, index) => (
              <div key={index} className="space-y-1">
                <div className="text-yellow-400">
                  "{exp.company}": {`{`}
                </div>
                <div className="ml-4 space-y-1">
                  <div className="text-green-300">position: "{exp.position}",</div>
                  <div className="text-green-300">duration: "{exp.duration}",</div>
                  <div className="text-green-300">description: "{exp.description}"</div>
                </div>
                <div className="text-yellow-400">
                  {`}`}
                  {index < userData.experience.length - 1 ? "," : ""}
                </div>
              </div>
            ))}
          </div>
          <div className="text-blue-400">{`}`};</div>
        </div>

        {/* Projects Array */}
        <div className="mb-8">
          <div className="text-blue-400 mb-2">const projects = [</div>
          <div className="ml-4 space-y-4">
            {userData.projects.map((project, index) => (
              <div key={index} className="space-y-1">
                <div className="text-yellow-400">{`{`}</div>
                <div className="ml-4 space-y-1">
                  <div className="text-green-300">name: "{project.name}",</div>
                  <div className="text-green-300">description: "{project.description}",</div>
                  <div className="text-green-300">
                    technologies: [{project.technologies.map((tech) => `"${tech}"`).join(", ")}]{project.link && <>,</>}
                  </div>
                  {project.link && <div className="text-green-300">link: "{project.link}"</div>}
                </div>
                <div className="text-yellow-400">
                  {`}`}
                  {index < userData.projects.length - 1 ? "," : ""}
                </div>
              </div>
            ))}
          </div>
          <div className="text-blue-400">];</div>
        </div>

        {/* Education */}
        <div className="mb-8">
          <div className="text-blue-400 mb-2">const education = [</div>
          <div className="ml-4 space-y-2">
            {userData.education.map((edu, index) => (
              <div key={index} className="space-y-1">
                <div className="text-yellow-400">{`{`}</div>
                <div className="ml-4 space-y-1">
                  <div className="text-green-300">degree: "{edu.degree}",</div>
                  <div className="text-green-300">institution: "{edu.institution}",</div>
                  <div className="text-green-300">year: "{edu.year}"</div>
                </div>
                <div className="text-yellow-400">
                  {`}`}
                  {index < userData.education.length - 1 ? "," : ""}
                </div>
              </div>
            ))}
          </div>
          <div className="text-blue-400">];</div>
        </div>

        {/* Terminal Prompt */}
        <div className="mt-8 flex items-center">
          <span className="text-blue-400">$</span>
          <span className="ml-2 text-green-400 animate-pulse">_</span>
        </div>
      </div>
    </div>
  </div>
)

const MinimalTemplate = ({ userData }: { userData: UserData }) => (
  <div className="bg-white dark:bg-gray-900 min-h-screen">
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{userData.name}</h1>
        <p className="text-gray-600 dark:text-gray-300">{userData.title}</p>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* About */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">About</h2>
          <p className="text-gray-600 dark:text-gray-300">{userData.summary}</p>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {userData.skills.map((skill, index) => (
              <Badge key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Experience</h2>
          <div className="space-y-4">
            {userData.experience.map((exp, index) => (
              <div key={index}>
                <h3 className="font-semibold">{exp.position}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {exp.company} - {exp.duration}
                </p>
                <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Projects</h2>
          <div className="space-y-4">
            {userData.projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Education</h2>
          <div className="space-y-4">
            {userData.education.map((edu, index) => (
              <div key={index}>
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {edu.institution} ({edu.year})
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
)

const ResumeTemplate = ({ userData }: { userData: UserData }) => (
  <div className="bg-gray-100 dark:bg-gray-800 min-h-screen">
    <div className="container mx-auto py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
            {/* Profile */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 mx-auto mb-2">
                <User className="w-full h-full p-2 text-gray-700 dark:text-gray-300" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{userData.name}</h1>
              <p className="text-gray-600 dark:text-gray-300">{userData.title}</p>
            </div>

            {/* Contact Information */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Contact</h2>
              <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1">
                <Mail className="w-4 h-4 mr-2" />
                {userData.email}
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1">
                <Phone className="w-4 h-4 mr-2" />
                {userData.phone}
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                {userData.location}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {userData.skills.map((skill, index) => (
                  <Badge key={index} className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Languages */}
            {userData.languages && userData.languages.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Languages</h2>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  {userData.languages.map((language, index) => (
                    <li key={index}>{language}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Hobbies */}
            {userData.hobbies && userData.hobbies.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Hobbies</h2>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  {userData.hobbies.map((hobby, index) => (
                    <li key={index}>{hobby}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Summary */}
          <section className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Summary</h2>
            <p className="text-gray-700 dark:text-gray-300">{userData.summary}</p>
          </section>

          {/* Experience */}
          <section className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Experience</h2>
            <div className="space-y-4">
              {userData.experience.map((exp, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{exp.position}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {exp.company} ({exp.duration})
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 ml-4">
                      {exp.responsibilities.map((responsibility, i) => (
                        <li key={i}>{responsibility}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Projects</h2>
            <div className="space-y-4">
              {userData.projects.map((project, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{project.name}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {project.features && project.features.length > 0 && (
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 ml-4">
                      {project.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Education</h2>
            <div className="space-y-4">
              {userData.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{edu.degree}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {edu.institution} ({edu.year})
                  </p>
                  {edu.gpa && <p className="text-gray-600 dark:text-gray-300">GPA: {edu.gpa}</p>}
                  {edu.coursework && edu.coursework.length > 0 && (
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 ml-4">
                      {edu.coursework.map((course, i) => (
                        <li key={i}>{course}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          {userData.certifications && userData.certifications.length > 0 && (
            <section className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Certifications</h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 ml-4">
                {userData.certifications.map((certification, index) => (
                  <li key={index}>{certification}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Achievements */}
          {userData.achievements && userData.achievements.length > 0 && (
            <section className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Achievements</h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 ml-4">
                {userData.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  </div>
)

const CardTemplate = ({ userData }: { userData: UserData }) => (
  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 shadow-lg">
          <div className="flex items-center justify-center w-full h-full bg-blue-500 text-white text-4xl font-bold">
            {userData.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{userData.name}</h1>
        <p className="text-gray-600 dark:text-gray-300">{userData.title}</p>
        <div className="flex justify-center space-x-4 mt-4">
          {userData.socialLinks?.linkedin && (
            <a
              href={userData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {userData.socialLinks?.github && (
            <a
              href={userData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {userData.socialLinks?.twitter && (
            <a
              href={userData.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600"
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}
          {userData.socialLinks?.portfolio && (
            <a
              href={userData.socialLinks.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-700"
            >
              <Globe className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* About Card */}
        <Card className="bg-white dark:bg-gray-700 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">{userData.summary}</p>
          </CardContent>
        </Card>

        {/* Skills Card */}
        <Card className="bg-white dark:bg-gray-700 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userData.skills.map((skill, index) => (
                <Badge key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Experience Card */}
        <Card className="bg-white dark:bg-gray-700 shadow-md md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.experience.map((exp, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{exp.position}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {exp.company} ({exp.duration})
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Projects Card */}
        <Card className="bg-white dark:bg-gray-700 shadow-md md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userData.projects.map((project, index) => (
                <div key={index} className="p-4 border rounded-md border-gray-200 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{project.name}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Education Card */}
        <Card className="bg-white dark:bg-gray-700 shadow-md md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">Education</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{edu.degree}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {edu.institution} ({edu.year})
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
)

const templates = {
  modern: ModernTemplate,
  creative: CreativeTemplate,
  professional: ProfessionalTemplate,
  artistic: ArtisticTemplate,
  tech: TechTemplate,
}

export default function PortfolioPreview({ userData, template }: PortfolioPreviewProps) {
  const TemplateComponent = templates[template as keyof typeof templates] || ModernTemplate

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <TemplateComponent userData={userData} />
    </div>
  )
}
