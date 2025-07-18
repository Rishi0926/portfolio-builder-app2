export interface UserData {
  name: string
  email: string
  phone?: string
  linkedin?: string
  github?: string
  tagline?: string
  bio?: string
  experience?: Array<{
    title: string
    company: string
    duration: string
    description: string
  }>
  education?: Array<{
    degree: string
    institution: string
    year: string
  }>
  skills?: string[]
  projects?: Array<{
    title: string
    description: string
    link?: string
  }>
  resumeDetails?: {
    type: "fresher" | "experienced"
  }
}

export type TemplateType =
  | "modern-minimalist"
  | "creative-bold"
  | "professional-clean"
  | "artistic-flair"
  | "tech-focused"

export const TEMPLATE_OPTIONS: Array<{ value: TemplateType; label: string }> = [
  { value: "modern-minimalist", label: "Modern Minimalist" },
  { value: "creative-bold", label: "Creative Bold" },
  { value: "professional-clean", label: "Professional Clean" },
  { value: "artistic-flair", label: "Artistic Flair" },
  { value: "tech-focused", label: "Tech Focused" },
]
