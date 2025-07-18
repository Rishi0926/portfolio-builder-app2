"use client"

import type React from "react"
import type { UserData, TemplateType } from "../types"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Download, Share } from "lucide-react"
import { useToast } from "../contexts/ToastContext"

interface PortfolioPreviewProps {
  userData: UserData | null
  selectedTemplate: TemplateType
  onExport: (template: TemplateType, data: UserData) => void
  onShare: (template: TemplateType, data: UserData) => void
}

// Dummy data for templates if actual data is not available
const DUMMY_USER_DATA: UserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 123 456 7890",
  linkedin: "linkedin.com/in/johndoe",
  github: "github.com/johndoe",
  tagline: "Full Stack Developer | Building awesome web experiences",
  bio: "Passionate full stack developer with experience in creating robust and scalable web applications. Eager to learn new technologies and contribute to impactful projects.",
  experience: [
    {
      title: "Software Engineer",
      company: "Acme Corp",
      duration: "Jan 2022 - Present",
      description: "Developed and maintained web applications using React and Node.js.",
    },
    {
      title: "Junior Developer",
      company: "Innovate Solutions",
      duration: "Jun 2020 - Dec 2021",
      description: "Assisted in front-end development and bug fixing for client projects.",
    },
  ],
  education: [
    { degree: "M.Sc. Computer Science", institution: "Tech University", year: "2023" },
    { degree: "B.Sc. Computer Science", institution: "State University", year: "2020" },
  ],
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB", "SQL", "Tailwind CSS", "Git"],
  projects: [
    {
      title: "E-commerce Platform",
      description:
        "Built a full-stack e-commerce application with user authentication, product catalog, and payment integration.",
      link: "https://example.com/ecommerce",
    },
    {
      title: "Task Management App",
      description:
        "Developed a responsive task management tool with drag-and-drop functionality and real-time updates.",
      link: "https://example.com/taskapp",
    },
  ],
}

const TemplateModernMinimalist: React.FC<{ data: UserData }> = ({ data }) => (
  <div className="p-8 space-y-6 bg-background text-foreground shadow-lg rounded-lg max-w-full overflow-auto">
    <header className="text-center space-y-2">
      <h1 className="text-4xl font-bold">{data.name}</h1>
      <p className="text-xl text-muted-foreground">{data.tagline}</p>
    </header>
    <section className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold border-b-2 pb-2">About Me</h2>
        <p className="text-muted-foreground">{data.bio}</p>
        <h3 className="text-xl font-semibold">Contact</h3>
        <p className="text-muted-foreground">Email: {data.email}</p>
        {data.phone && <p className="text-muted-foreground">Phone: {data.phone}</p>}
        {data.linkedin && (
          <p className="text-muted-foreground">
            LinkedIn:{" "}
            <a href={`https://${data.linkedin}`} target="_blank" rel="noopener noreferrer" className="underline">
              {data.linkedin}
            </a>
          </p>
        )}
        {data.github && (
          <p className="text-muted-foreground">
            GitHub:{" "}
            <a href={`https://${data.github}`} target="_blank" rel="noopener noreferrer" className="underline">
              {data.github}
            </a>
          </p>
        )}
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold border-b-2 pb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills?.map((skill, i) => (
            <span key={i} className="px-3 py-1 bg-muted rounded-full text-sm font-medium">
              {skill}
            </span>
          ))}
        </div>
        <h2 className="text-2xl font-semibold border-b-2 pb-2">Education</h2>
        {data.education?.map((edu, i) => (
          <div key={i} className="space-y-1">
            <h3 className="font-semibold">{edu.degree}</h3>
            <p className="text-sm text-muted-foreground">
              {edu.institution}, {edu.year}
            </p>
          </div>
        ))}
      </div>
    </section>
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold border-b-2 pb-2">Experience</h2>
      {data.experience?.map((exp, i) => (
        <div key={i} className="space-y-1">
          <h3 className="font-semibold">
            {exp.title} at {exp.company}
          </h3>
          <p className="text-sm text-muted-foreground">{exp.duration}</p>
          <p className="text-muted-foreground">{exp.description}</p>
        </div>
      ))}
    </section>
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold border-b-2 pb-2">Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {data.projects?.map((project, i) => (
          <Card key={i} className="p-4">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="text-muted-foreground text-sm mt-1">{project.description}</p>
            {project.link && (
              <a
                href={`https://${project.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm mt-2 block"
              >
                View Project
              </a>
            )}
          </Card>
        ))}
      </div>
    </section>
  </div>
)

const TemplateCreativeBold: React.FC<{ data: UserData }> = ({ data }) => (
  <div className="p-10 space-y-8 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-lg shadow-xl max-w-full overflow-auto">
    <header className="text-center space-y-4">
      <h1 className="text-5xl font-extrabold tracking-tight">{data.name}</h1>
      <p className="text-2xl font-light opacity-90">{data.tagline}</p>
    </header>
    <section className="grid md:grid-cols-3 gap-8">
      <div className="col-span-1 space-y-6">
        <h2 className="text-3xl font-bold border-b-2 border-white pb-3">About</h2>
        <p className="text-lg leading-relaxed opacity-90">{data.bio}</p>
        <h3 className="text-2xl font-bold mt-6">Contact</h3>
        <p className="text-lg opacity-90">Email: {data.email}</p>
        {data.phone && <p className="text-lg opacity-90">Phone: {data.phone}</p>}
        {data.linkedin && (
          <p className="text-lg opacity-90">
            LinkedIn:{" "}
            <a href={`https://${data.linkedin}`} target="_blank" rel="noopener noreferrer" className="underline">
              {data.linkedin}
            </a>
          </p>
        )}
        {data.github && (
          <p className="text-lg opacity-90">
            GitHub:{" "}
            <a href={`https://${data.github}`} target="_blank" rel="noopener noreferrer" className="underline">
              {data.github}
            </a>
          </p>
        )}
      </div>
      <div className="col-span-2 space-y-6">
        <h2 className="text-3xl font-bold border-b-2 border-white pb-3">Experience</h2>
        {data.experience?.map((exp, i) => (
          <div key={i} className="mb-4">
            <h3 className="text-xl font-semibold">
              {exp.title} at {exp.company}
            </h3>
            <p className="text-base font-light opacity-80">{exp.duration}</p>
            <p className="mt-2 text-base opacity-90">{exp.description}</p>
          </div>
        ))}
        <h2 className="text-3xl font-bold border-b-2 border-white pb-3 mt-8">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {data.skills?.map((skill, i) => (
            <span key={i} className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-white text-base font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
    <section className="space-y-6">
      <h2 className="text-3xl font-bold border-b-2 border-white pb-3">Projects</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {data.projects?.map((project, i) => (
          <Card key={i} className="p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p className="text-base mt-2 opacity-90">{project.description}</p>
            {project.link && (
              <a
                href={`https://${project.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline text-base mt-4 block"
              >
                View Project
              </a>
            )}
          </Card>
        ))}
      </div>
    </section>
  </div>
)

const TemplateProfessionalClean: React.FC<{ data: UserData }> = ({ data }) => (
  <div className="p-8 space-y-8 bg-gray-50 text-gray-800 font-sans leading-relaxed shadow-lg rounded-lg max-w-full overflow-auto">
    <header className="flex items-center space-x-6 pb-6 border-b border-gray-200">
      <div className="flex-grow">
        <h1 className="text-4xl font-bold text-gray-900">{data.name}</h1>
        <p className="text-xl text-gray-600">{data.tagline}</p>
      </div>
      <div className="text-right">
        <p className="text-md">{data.email}</p>
        {data.phone && <p className="text-md">{data.phone}</p>}
        {data.linkedin && (
          <p className="text-md">
            <a
              href={`https://${data.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {data.linkedin.replace("linkedin.com/in/", "")}
            </a>
          </p>
        )}
        {data.github && (
          <p className="text-md">
            <a
              href={`https://${data.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {data.github.replace("github.com/", "")}
            </a>
          </p>
        )}
      </div>
    </header>
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">Summary</h2>
      <p className="text-lg text-gray-700">{data.bio}</p>
    </section>
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">Experience</h2>
      <div className="space-y-6">
        {data.experience?.map((exp, i) => (
          <div key={i}>
            <h3 className="text-xl font-semibold text-gray-800">
              {exp.title} - {exp.company}
            </h3>
            <p className="text-md text-gray-600">{exp.duration}</p>
            <p className="text-gray-700 mt-2">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">Education</h2>
      <div className="space-y-4">
        {data.education?.map((edu, i) => (
          <div key={i}>
            <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
            <p className="text-md text-gray-600">
              {edu.institution}, {edu.year}
            </p>
          </div>
        ))}
      </div>
    </section>
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">Skills</h2>
      <div className="flex flex-wrap gap-3">
        {data.skills?.map((skill, i) => (
          <span key={i} className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1.5 rounded-full">
            {skill}
          </span>
        ))}
      </div>
    </section>
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {data.projects?.map((project, i) => (
          <Card key={i} className="p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
            <p className="text-gray-700 mt-2 text-sm">{project.description}</p>
            {project.link && (
              <a
                href={`https://${project.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm mt-3 inline-block"
              >
                View Project
              </a>
            )}
          </Card>
        ))}
      </div>
    </section>
  </div>
)

const TemplateArtisticFlair: React.FC<{ data: UserData }> = ({ data }) => (
  <div className="p-10 space-y-10 bg-gradient-to-br from-pink-100 via-white to-purple-100 text-gray-900 font-serif leading-relaxed shadow-lg rounded-lg max-w-full overflow-auto">
    <header className="text-center space-y-4">
      <h1 className="text-5xl font-bold text-purple-800 tracking-wider">{data.name}</h1>
      <p className="text-2xl text-pink-700 italic">{data.tagline}</p>
      <div className="flex justify-center space-x-6 text-lg">
        <a href={`mailto:${data.email}`} className="hover:underline">
          {data.email}
        </a>
        {data.linkedin && (
          <a href={`https://${data.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
            LinkedIn
          </a>
        )}
        {data.github && (
          <a href={`https://${data.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
            GitHub
          </a>
        )}
      </div>
    </header>

    <section className="grid md:grid-cols-2 gap-10">
      <div>
        <h2 className="text-3xl font-bold text-purple-700 mb-5 relative after:absolute after:bottom-0 after:left-0 after:w-1/3 after:h-1 after:bg-pink-500">
          About Me
        </h2>
        <p className="text-lg text-gray-800">{data.bio}</p>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-purple-700 mb-5 relative after:absolute after:bottom-0 after:left-0 after:w-1/3 after:h-1 after:bg-pink-500">
          Skills
        </h2>
        <ul className="list-disc list-inside text-lg text-gray-800 space-y-1">
          {data.skills?.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </div>
    </section>

    <section>
      <h2 className="text-3xl font-bold text-purple-700 mb-7 relative after:absolute after:bottom-0 after:left-0 after:w-1/3 after:h-1 after:bg-pink-500">
        Experience
      </h2>
      <div className="space-y-8">
        {data.experience?.map((exp, i) => (
          <div key={i} className="border-l-4 border-pink-500 pl-4">
            <h3 className="text-xl font-bold text-gray-900">
              {exp.title} <span className="text-purple-600">@ {exp.company}</span>
            </h3>
            <p className="text-md text-gray-600 italic">{exp.duration}</p>
            <p className="text-gray-800 mt-2">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-3xl font-bold text-purple-700 mb-7 relative after:absolute after:bottom-0 after:left-0 after:w-1/3 after:h-1 after:bg-pink-500">
        Education
      </h2>
      <div className="space-y-6">
        {data.education?.map((edu, i) => (
          <div key={i}>
            <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
            <p className="text-md text-gray-600">
              {edu.institution}, {edu.year}
            </p>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-3xl font-bold text-purple-700 mb-7 relative after:absolute after:bottom-0 after:left-0 after:w-1/3 after:h-1 after:bg-pink-500">
        Projects
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.projects?.map((project, i) => (
          <Card
            key={i}
            className="p-6 bg-white shadow-lg border border-pink-200 rounded-lg transform hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-xl font-bold text-purple-800">{project.title}</h3>
            <p className="text-gray-700 mt-3 text-base">{project.description}</p>
            {project.link && (
              <a
                href={`https://${project.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:underline mt-4 inline-block font-semibold"
              >
                Explore
              </a>
            )}
          </Card>
        ))}
      </div>
    </section>
  </div>
)

const TemplateTechFocused: React.FC<{ data: UserData }> = ({ data }) => (
  <div className="p-8 space-y-8 bg-gray-900 text-gray-100 font-mono shadow-lg rounded-lg max-w-full overflow-auto">
    <header className="text-center space-y-3">
      <h1 className="text-4xl font-bold text-teal-400">{data.name}</h1>
      <p className="text-xl text-gray-400">
        {"<"} {data.tagline} {">"}
      </p>
      <div className="flex justify-center space-x-4 text-sm text-gray-300">
        <a href={`mailto:${data.email}`} className="hover:text-teal-400">
          {data.email}
        </a>
        {data.phone && <span>| {data.phone}</span>}
        {data.linkedin && (
          <a
            href={`https://${data.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-400"
          >
            [LinkedIn]
          </a>
        )}
        {data.github && (
          <a href={`https://${data.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
            [GitHub]
          </a>
        )}
      </div>
    </header>

    <section>
      <h2 className="text-2xl font-bold text-teal-400 mb-4">{"// About"}</h2>
      <p className="text-gray-300 leading-relaxed">{data.bio}</p>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-teal-400 mb-4">{"// Skills"}</h2>
      <div className="flex flex-wrap gap-2">
        {data.skills?.map((skill, i) => (
          <span key={i} className="bg-gray-700 text-teal-300 text-sm px-3 py-1 rounded-md">
            {skill}
          </span>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-teal-400 mb-4">{"// Experience"}</h2>
      <div className="space-y-6">
        {data.experience?.map((exp, i) => (
          <div key={i}>
            <h3 className="text-xl font-bold text-gray-100">
              {exp.title} <span className="text-gray-400">@{exp.company}</span>
            </h3>
            <p className="text-sm text-gray-500">{exp.duration}</p>
            <p className="text-gray-300 mt-2">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-teal-400 mb-4">{"// Education"}</h2>
      <div className="space-y-4">
        {data.education?.map((edu, i) => (
          <div key={i}>
            <h3 className="text-xl font-bold text-gray-100">{edu.degree}</h3>
            <p className="text-sm text-gray-400">
              {edu.institution}, {edu.year}
            </p>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-teal-400 mb-4">{"// Projects"}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {data.projects?.map((project, i) => (
          <Card key={i} className="p-5 bg-gray-800 border border-gray-700 shadow-md">
            <h3 className="text-xl font-bold text-gray-100">{project.title}</h3>
            <p className="text-gray-300 mt-2 text-sm">{project.description}</p>
            {project.link && (
              <a
                href={`https://${project.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:underline text-sm mt-3 inline-block"
              >
                View Project {"->"}
              </a>
            )}
          </Card>
        ))}
      </div>
    </section>
  </div>
)

export const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({
  userData,
  selectedTemplate,
  onExport,
  onShare,
}) => {
  const { showToast } = useToast()
  const dataToRender = userData || DUMMY_USER_DATA

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "modern-minimalist":
        return <TemplateModernMinimalist data={dataToRender} />
      case "creative-bold":
        return <TemplateCreativeBold data={dataToRender} />
      case "professional-clean":
        return <TemplateProfessionalClean data={dataToRender} />
      case "artistic-flair":
        return <TemplateArtisticFlair data={dataToRender} />
      case "tech-focused":
        return <TemplateTechFocused data={dataToRender} />
      default:
        return <TemplateModernMinimalist data={dataToRender} />
    }
  }

  const handleExportClick = () => {
    onExport(selectedTemplate, dataToRender)
    showToast("Success", "Portfolio exported successfully!")
  }

  const handleShareClick = () => {
    onShare(selectedTemplate, dataToRender)
    showToast("Success", "Portfolio link copied to clipboard!")
  }

  return (
    <Card className="w-full h-full flex flex-col">
      <CardContent className="flex-grow p-0 flex items-center justify-center relative">
        <div className="w-full h-[600px] overflow-y-auto bg-gray-100 dark:bg-gray-800 rounded-lg p-4 custom-scrollbar">
          {renderTemplate()}
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button onClick={handleExportClick} size="icon" className="shadow-lg">
            <Download className="h-5 w-5" />
          </Button>
          <Button onClick={handleShareClick} size="icon" className="shadow-lg">
            <Share className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
