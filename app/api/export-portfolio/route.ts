import { type NextRequest, NextResponse } from "next/server"
import JSZip from "jszip"

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
}

const generateHTML = (userData: UserData, template: string) => {
  const templateStyles = {
    modern: `
      body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); }
      .header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 4rem 0; text-align: center; }
      .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
      .name { font-size: 3rem; font-weight: bold; margin-bottom: 1rem; }
      .title { font-size: 1.25rem; margin-bottom: 1.5rem; }
      .contact { display: flex; justify-content: center; gap: 2rem; font-size: 0.875rem; }
      .content { padding: 3rem 0; }
      .grid { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; }
      .section { margin-bottom: 2rem; }
      .section-title { font-size: 1.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem; }
      .experience-item { border-left: 4px solid #3b82f6; padding-left: 1.5rem; margin-bottom: 1.5rem; }
      .skill-tag { display: inline-block; background: #dbeafe; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 9999px; margin: 0.25rem; font-size: 0.875rem; }
      .project-card { background: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 1rem; }
    `,
    creative: `
      body { font-family: 'Poppins', sans-serif; margin: 0; padding: 0; background: linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 100%); }
      .header { text-align: center; padding: 3rem 0; }
      .avatar { width: 8rem; height: 8rem; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); border-radius: 50%; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; font-weight: bold; }
      .name { font-size: 2.5rem; font-weight: bold; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem; }
      .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
      .card { background: rgba(255,255,255,0.8); backdrop-filter: blur(10px); padding: 2rem; border-radius: 1rem; margin-bottom: 2rem; }
      .section-title { color: #8b5cf6; font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; }
      .skill-tag { background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: white; padding: 0.5rem 1rem; border-radius: 9999px; margin: 0.25rem; display: inline-block; }
    `,
    professional: `
      body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; background: #f9fafb; }
      .header { background: #1f2937; color: white; padding: 2rem 0; }
      .header-content { display: flex; align-items: center; gap: 2rem; }
      .avatar { width: 6rem; height: 6rem; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; }
      .container { max-width: 1000px; margin: 0 auto; padding: 0 2rem; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
      .name { font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem; }
      .section-title { font-size: 1.25rem; font-weight: bold; color: #1f2937; border-bottom: 2px solid #10b981; padding-bottom: 0.25rem; margin-bottom: 1rem; }
      .content { padding: 2rem; }
      .skill-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; }
      .skill-item { background: #f3f4f6; padding: 0.75rem; border-radius: 0.25rem; text-align: center; font-weight: 500; }
    `,
    artistic: `
      body { font-family: 'Georgia', serif; margin: 0; padding: 0; background: linear-gradient(135deg, #fef3c7 0%, #fecaca 50%, #fed7aa 100%); }
      .container { max-width: 1200px; margin: 0 auto; padding: 3rem 2rem; }
      .header { text-align: center; margin-bottom: 4rem; position: relative; }
      .header::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); opacity: 0.1; border-radius: 1.5rem; transform: rotate(3deg); }
      .header-content { position: relative; background: white; padding: 3rem; border-radius: 1.5rem; box-shadow: 0 20px 25px rgba(0,0,0,0.1); transform: rotate(-1deg); }
      .name { font-size: 3rem; font-weight: bold; background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1rem; }
      .card { position: relative; background: white; padding: 2rem; border-radius: 1rem; margin-bottom: 3rem; box-shadow: 0 10px 15px rgba(0,0,0,0.1); }
      .card::before { content: ''; position: absolute; inset: -0.5rem; background: linear-gradient(135deg, #fbbf24 0%, #f87171 100%); border-radius: 1rem; z-index: -1; transform: rotate(1deg); }
      .section-title { color: #f59e0b; font-size: 2rem; margin-bottom: 1.5rem; }
    `,
    tech: `
      body { font-family: 'Courier New', monospace; margin: 0; padding: 0; background: #0f172a; color: #10b981; }
      .terminal { background: #000; border: 1px solid #10b981; border-radius: 0.5rem; margin: 2rem; }
      .terminal-header { background: #1f2937; padding: 1rem; border-radius: 0.5rem 0.5rem 0 0; display: flex; align-items: center; gap: 0.5rem; }
      .terminal-dot { width: 0.75rem; height: 0.75rem; border-radius: 50%; }
      .dot-red { background: #ef4444; }
      .dot-yellow { background: #eab308; }
      .dot-green { background: #10b981; }
      .terminal-content { padding: 2rem; }
      .prompt { color: #3b82f6; }
      .output { color: #10b981; margin-bottom: 1rem; }
      .comment { color: #3b82f6; }
      .string { color: #10b981; }
      .keyword { color: #eab308; }
      .container { max-width: 1200px; margin: 0 auto; }
    `,
  }

  const templateHTML = {
    modern: `
      <div class="header">
        <div class="container">
          <h1 class="name">${userData.name}</h1>
          <p class="title">${userData.title}</p>
          <div class="contact">
            <span>📧 ${userData.email}</span>
            <span>📱 ${userData.phone}</span>
            ${userData.location ? `<span>📍 ${userData.location}</span>` : ""}
          </div>
        </div>
      </div>
      <div class="container content">
        <div class="grid">
          <div>
            <div class="section">
              <h2 class="section-title">About Me</h2>
              <p>${userData.summary}</p>
            </div>
            <div class="section">
              <h2 class="section-title">Experience</h2>
              ${userData.experience
                .map(
                  (exp) => `
                <div class="experience-item">
                  <h3>${exp.position}</h3>
                  <p><strong>${exp.company}</strong> • ${exp.duration}</p>
                  <p>${exp.description}</p>
                </div>
              `,
                )
                .join("")}
            </div>
            <div class="section">
              <h2 class="section-title">Projects</h2>
              ${userData.projects
                .map(
                  (project) => `
                <div class="project-card">
                  <h3>${project.name}</h3>
                  <p>${project.description}</p>
                  <div>
                    ${project.technologies.map((tech) => `<span class="skill-tag">${tech}</span>`).join("")}
                  </div>
                  ${project.link ? `<p><a href="${project.link}" target="_blank">View Project</a></p>` : ""}
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
          <div>
            <div class="section">
              <h2 class="section-title">Skills</h2>
              <div>
                ${userData.skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
              </div>
            </div>
            <div class="section">
              <h2 class="section-title">Education</h2>
              ${userData.education
                .map(
                  (edu) => `
                <div style="margin-bottom: 1rem;">
                  <h3>${edu.degree}</h3>
                  <p><strong>${edu.institution}</strong></p>
                  <p>${edu.year}</p>
                </div>
              `,
                )
                .join("")}
            </div>
            ${
              userData.socialLinks && Object.keys(userData.socialLinks).length > 0
                ? `
              <div class="section">
                <h2 class="section-title">Connect</h2>
                ${userData.socialLinks.linkedin ? `<p><a href="${userData.socialLinks.linkedin}" target="_blank">LinkedIn</a></p>` : ""}
                ${userData.socialLinks.github ? `<p><a href="${userData.socialLinks.github}" target="_blank">GitHub</a></p>` : ""}
                ${userData.socialLinks.portfolio ? `<p><a href="${userData.socialLinks.portfolio}" target="_blank">Portfolio</a></p>` : ""}
                ${userData.socialLinks.twitter ? `<p><a href="${userData.socialLinks.twitter}" target="_blank">Twitter</a></p>` : ""}
              </div>
            `
                : ""
            }
          </div>
        </div>
      </div>
    `,
    creative: `
      <div class="container">
        <div class="header">
          <div class="avatar">${userData.name
            .split(" ")
            .map((n) => n[0])
            .join("")}</div>
          <h1 class="name">${userData.name}</h1>
          <p>${userData.title}</p>
          <p>${userData.email} • ${userData.phone}</p>
        </div>
        <div class="card">
          <h2 class="section-title">About Me</h2>
          <p>${userData.summary}</p>
        </div>
        <div class="card">
          <h2 class="section-title">Skills</h2>
          <div>
            ${userData.skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
          </div>
        </div>
        <div class="card">
          <h2 class="section-title">Experience</h2>
          ${userData.experience
            .map(
              (exp) => `
            <div style="margin-bottom: 2rem;">
              <h3>${exp.position}</h3>
              <p style="color: #8b5cf6; font-weight: bold;">${exp.company} • ${exp.duration}</p>
              <p>${exp.description}</p>
            </div>
          `,
            )
            .join("")}
        </div>
        <div class="card">
          <h2 class="section-title">Projects</h2>
          ${userData.projects
            .map(
              (project) => `
            <div style="margin-bottom: 2rem; padding: 1.5rem; background: linear-gradient(135deg, #f3e8ff 0%, #fdf2f8 100%); border-radius: 0.5rem;">
              <h3>${project.name}</h3>
              <p>${project.description}</p>
              <div>
                ${project.technologies.map((tech) => `<span style="background: rgba(139,92,246,0.2); color: #8b5cf6; padding: 0.25rem 0.5rem; border-radius: 0.25rem; margin: 0.25rem; display: inline-block; font-size: 0.75rem;">${tech}</span>`).join("")}
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    `,
    professional: `
      <div class="header">
        <div class="container">
          <div class="header-content">
            <div class="avatar">${userData.name
              .split(" ")
              .map((n) => n[0])
              .join("")}</div>
            <div>
              <h1 class="name">${userData.name}</h1>
              <p style="font-size: 1.25rem; color: #d1d5db; margin-bottom: 0.75rem;">${userData.title}</p>
              <div style="display: flex; gap: 1rem; font-size: 0.875rem;">
                <span>${userData.email}</span>
                <span>${userData.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container content">
        <div class="section">
          <h2 class="section-title">PROFESSIONAL SUMMARY</h2>
          <p>${userData.summary}</p>
        </div>
        <div class="section">
          <h2 class="section-title">CORE COMPETENCIES</h2>
          <div class="skill-grid">
            ${userData.skills.map((skill) => `<div class="skill-item">${skill}</div>`).join("")}
          </div>
        </div>
        <div class="section">
          <h2 class="section-title">PROFESSIONAL EXPERIENCE</h2>
          ${userData.experience
            .map(
              (exp) => `
            <div style="margin-bottom: 2rem;">
              <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                <div>
                  <h3 style="font-size: 1.125rem; font-weight: 600; color: #1f2937;">${exp.position}</h3>
                  <p style="color: #10b981; font-weight: 500;">${exp.company}</p>
                </div>
                <span style="color: #6b7280; font-weight: 500;">${exp.duration}</span>
              </div>
              <p style="color: #374151;">${exp.description}</p>
            </div>
          `,
            )
            .join("")}
        </div>
        <div class="section">
          <h2 class="section-title">KEY PROJECTS</h2>
          ${userData.projects
            .map(
              (project) => `
            <div style="border-left: 4px solid #10b981; padding-left: 1rem; margin-bottom: 1rem;">
              <h3 style="font-weight: 600; color: #1f2937;">${project.name}</h3>
              <p style="color: #374151; margin-bottom: 0.5rem;">${project.description}</p>
              <div>
                ${project.technologies.map((tech) => `<span style="background: #d1fae5; color: #065f46; padding: 0.125rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; margin-right: 0.25rem;">${tech}</span>`).join("")}
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
        <div class="section">
          <h2 class="section-title">EDUCATION</h2>
          ${userData.education
            .map(
              (edu) => `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <div>
                <h3 style="font-weight: 600; color: #1f2937;">${edu.degree}</h3>
                <p style="color: #6b7280;">${edu.institution}</p>
              </div>
              <span style="color: #6b7280; font-weight: 500;">${edu.year}</span>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    `,
    artistic: `
      <div class="container">
        <div class="header">
          <div class="header-content">
            <h1 class="name">${userData.name}</h1>
            <p style="font-size: 1.5rem; color: #6b7280; margin-bottom: 1.5rem;">${userData.title}</p>
            <div style="display: flex; justify-content: center; gap: 2rem; color: #f59e0b;">
              <span>${userData.email}</span>
              <span>${userData.phone}</span>
            </div>
          </div>
        </div>
        <div class="card">
          <h2 class="section-title">My Story</h2>
          <p style="font-size: 1.125rem; line-height: 1.75;">${userData.summary}</p>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          <div class="card">
            <h2 class="section-title">Skills & Expertise</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              ${userData.skills
                .map(
                  (skill) => `
                <div style="background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%); padding: 0.75rem; border-radius: 0.5rem; text-align: center; font-weight: 500; transform: hover:scale-105; transition: transform 0.2s;">${skill}</div>
              `,
                )
                .join("")}
            </div>
          </div>
          <div class="card">
            <h2 class="section-title">Education</h2>
            ${userData.education
              .map(
                (edu) => `
              <div style="margin-bottom: 1rem;">
                <h3 style="font-weight: bold; font-size: 1.125rem;">${edu.degree}</h3>
                <p style="color: #f59e0b; font-weight: 500;">${edu.institution}</p>
                <p style="color: #6b7280;">${edu.year}</p>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
        <div class="card">
          <h2 class="section-title">Professional Journey</h2>
          <div style="space-y: 2rem;">
            ${userData.experience
              .map(
                (exp) => `
              <div style="position: relative; padding-left: 2rem; margin-bottom: 2rem;">
                <div style="position: absolute; left: 0; top: 0.5rem; width: 1rem; height: 1rem; background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); border-radius: 50%;"></div>
                <h3 style="font-size: 1.25rem; font-weight: bold; color: #1f2937;">${exp.position}</h3>
                <p style="color: #f59e0b; font-weight: 600; font-size: 1.125rem;">${exp.company}</p>
                <p style="color: #6b7280; margin-bottom: 0.5rem;">${exp.duration}</p>
                <p style="color: #374151;">${exp.description}</p>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
        <div class="card">
          <h2 class="section-title">Creative Projects</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
            ${userData.projects
              .map(
                (project) => `
              <div style="background: linear-gradient(135deg, #fef7ed 0%, #fecaca 100%); padding: 1.5rem; border-radius: 0.75rem; transform: hover:scale-105; transition: transform 0.2s;">
                <h3 style="font-size: 1.25rem; font-weight: bold; color: #1f2937; margin-bottom: 0.75rem;">${project.name}</h3>
                <p style="color: #374151; margin-bottom: 1rem;">${project.description}</p>
                <div>
                  ${project.technologies.map((tech) => `<span style="background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); color: white; padding: 0.25rem 0.75rem; border-radius: 9999px; margin: 0.125rem; display: inline-block; font-size: 0.875rem;">${tech}</span>`).join("")}
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </div>
    `,
    tech: `
      <div class="container">
        <div class="terminal">
          <div class="terminal-header">
            <div class="terminal-dot dot-red"></div>
            <div class="terminal-dot dot-yellow"></div>
            <div class="terminal-dot dot-green"></div>
            <span style="margin-left: 1rem; color: #10b981;">portfolio@terminal:~$</span>
          </div>
          <div class="terminal-content">
            <div style="margin-bottom: 1rem;">
              <div><span class="prompt">$</span> whoami</div>
              <div class="output">${userData.name}</div>
              <div><span class="prompt">$</span> cat profile.txt</div>
              <div class="output">${userData.title}</div>
              <div><span class="prompt">$</span> echo $CONTACT</div>
              <div class="output">${userData.email} | ${userData.phone}</div>
            </div>
            
            <div style="margin-bottom: 2rem;">
              <div class="comment">// About Me</div>
              <div style="background: #1f2937; padding: 1rem; border-radius: 0.25rem; border-left: 4px solid #10b981;">
                <pre style="color: #10b981; white-space: pre-wrap; font-size: 0.875rem; margin: 0;">${userData.summary}</pre>
              </div>
            </div>

            <div style="margin-bottom: 2rem;">
              <div class="comment">const skills = [</div>
              <div style="margin-left: 1rem;">
                ${userData.skills
                  .map(
                    (skill, index) => `
                  <div class="string">"${skill}"${index < userData.skills.length - 1 ? "," : ""}</div>
                `,
                  )
                  .join("")}
              </div>
              <div class="comment">];</div>
            </div>

            <div style="margin-bottom: 2rem;">
              <div class="comment">const experience = {</div>
              <div style="margin-left: 1rem;">
                ${userData.experience
                  .map(
                    (exp, index) => `
                  <div style="margin-bottom: 1rem;">
                    <div class="keyword">"${exp.company}": {</div>
                    <div style="margin-left: 1rem;">
                      <div class="string">position: "${exp.position}",</div>
                      <div class="string">duration: "${exp.duration}",</div>
                      <div class="string">description: "${exp.description}"</div>
                    </div>
                    <div class="keyword">}${index < userData.experience.length - 1 ? "," : ""}</div>
                  </div>
                `,
                  )
                  .join("")}
              </div>
              <div class="comment">};</div>
            </div>

            <div style="margin-bottom: 2rem;">
              <div class="comment">const projects = [</div>
              <div style="margin-left: 1rem;">
                ${userData.projects
                  .map(
                    (project, index) => `
                  <div style="margin-bottom: 1rem;">
                    <div class="keyword">{</div>
                    <div style="margin-left: 1rem;">
                      <div class="string">name: "${project.name}",</div>
                      <div class="string">description: "${project.description}",</div>
                      <div class="string">technologies: [${project.technologies.map((tech) => `"${tech}"`).join(", ")}]${project.link ? "," : ""}</div>
                      ${project.link ? `<div class="string">link: "${project.link}"</div>` : ""}
                    </div>
                    <div class="keyword">}${index < userData.projects.length - 1 ? "," : ""}</div>
                  </div>
                `,
                  )
                  .join("")}
              </div>
              <div class="comment">];</div>
            </div>

            <div style="margin-bottom: 2rem;">
              <div class="comment">const education = [</div>
              <div style="margin-left: 1rem;">
                ${userData.education
                  .map(
                    (edu, index) => `
                  <div style="margin-bottom: 0.5rem;">
                    <div class="keyword">{</div>
                    <div style="margin-left: 1rem;">
                      <div class="string">degree: "${edu.degree}",</div>
                      <div class="string">institution: "${edu.institution}",</div>
                      <div class="string">year: "${edu.year}"</div>
                    </div>
                    <div class="keyword">}${index < userData.education.length - 1 ? "," : ""}</div>
                  </div>
                `,
                  )
                  .join("")}
              </div>
              <div class="comment">];</div>
            </div>

            <div style="margin-top: 2rem; display: flex; align-items: center;">
              <span class="prompt">$</span>
              <span style="margin-left: 0.5rem; color: #10b981; animation: blink 1s infinite;">_</span>
            </div>
          </div>
        </div>
      </div>
      <style>
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      </style>
    `,
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${userData.name} - Portfolio</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        ${templateStyles[template as keyof typeof templateStyles] || templateStyles.modern}
        * { box-sizing: border-box; }
        a { color: inherit; text-decoration: underline; }
        a:hover { opacity: 0.8; }
      </style>
    </head>
    <body>
      ${templateHTML[template as keyof typeof templateHTML] || templateHTML.modern}
    </body>
    </html>
  `
}

const generateCSS = (template: string) => {
  const styles = {
    modern: `
      :root {
        --primary-color: #3b82f6;
        --secondary-color: #8b5cf6;
        --text-color: #1f2937;
        --bg-color: #f8fafc;
      }
      
      body {
        font-family: 'Inter', sans-serif;
        line-height: 1.6;
        color: var(--text-color);
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      }
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
      }
      
      .header {
        background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
        color: white;
        padding: 4rem 0;
        text-align: center;
      }
      
      .responsive {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
      }
      
      @media (max-width: 768px) {
        .responsive {
          grid-template-columns: 1fr;
        }
        
        .container {
          padding: 0 1rem;
        }
        
        .header {
          padding: 2rem 0;
        }
      }
    `,
    creative: `
      body {
        font-family: 'Poppins', sans-serif;
        background: linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 100%);
        margin: 0;
        padding: 0;
      }
      
      .creative-card {
        background: rgba(255,255,255,0.8);
        backdrop-filter: blur(10px);
        border-radius: 1rem;
        padding: 2rem;
        margin-bottom: 2rem;
        box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      }
      
      @media (max-width: 768px) {
        .creative-card {
          padding: 1rem;
          margin-bottom: 1rem;
        }
      }
    `,
    professional: `
      body {
        font-family: 'Arial', sans-serif;
        background: #f9fafb;
        margin: 0;
        padding: 0;
      }
      
      .professional-layout {
        max-width: 1000px;
        margin: 0 auto;
        background: white;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }
      
      @media (max-width: 768px) {
        .professional-layout {
          margin: 1rem;
        }
      }
    `,
    artistic: `
      body {
        font-family: 'Georgia', serif;
        background: linear-gradient(135deg, #fef3c7 0%, #fecaca 50%, #fed7aa 100%);
        margin: 0;
        padding: 0;
      }
      
      .artistic-element {
        position: relative;
        transform: rotate(-1deg);
        transition: transform 0.3s ease;
      }
      
      .artistic-element:hover {
        transform: rotate(0deg) scale(1.02);
      }
      
      @media (max-width: 768px) {
        .artistic-element {
          transform: none;
        }
      }
    `,
    tech: `
      body {
        font-family: 'Courier New', monospace;
        background: #0f172a;
        color: #10b981;
        margin: 0;
        padding: 0;
      }
      
      .terminal {
        background: #000;
        border: 1px solid #10b981;
        border-radius: 0.5rem;
        margin: 2rem;
      }
      
      @media (max-width: 768px) {
        .terminal {
          margin: 1rem;
        }
      }
    `,
  }

  return styles[template as keyof typeof styles] || styles.modern
}

const generateJS = () => {
  return `
    // Portfolio Interactive Features
    document.addEventListener('DOMContentLoaded', function() {
      // Smooth scrolling for anchor links
      const links = document.querySelectorAll('a[href^="#"]');
      links.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
      
      // Add loading animation
      const elements = document.querySelectorAll('.section, .card, .project-card');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      });
      
      elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
      });
      
      // Contact form handling (if exists)
      const contactForm = document.querySelector('#contact-form');
      if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          alert('Thank you for your message! I will get back to you soon.');
        });
      }
      
      // Theme toggle (if exists)
      const themeToggle = document.querySelector('#theme-toggle');
      if (themeToggle) {
        themeToggle.addEventListener('click', function() {
          document.body.classList.toggle('dark-theme');
          localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
          document.body.classList.add('dark-theme');
        }
      }
    });
  `
}

export async function POST(request: NextRequest) {
  try {
    const { userData, template } = await request.json()

    if (!userData || !template) {
      return NextResponse.json({ error: "Missing required data" }, { status: 400 })
    }

    const zip = new JSZip()

    // Generate HTML file
    const htmlContent = generateHTML(userData, template)
    zip.file("index.html", htmlContent)

    // Generate CSS file
    const cssContent = generateCSS(template)
    zip.file("styles.css", cssContent)

    // Generate JavaScript file
    const jsContent = generateJS()
    zip.file("script.js", jsContent)

    // Generate README file
    const readmeContent = `# ${userData.name} - Portfolio Website

This is a professional portfolio website generated using AI Portfolio Builder.

## Features
- Responsive design that works on all devices
- Modern ${template} template design
- SEO optimized
- Fast loading performance
- Interactive elements

## How to Use
1. Open \`index.html\` in your web browser to view the portfolio
2. Upload the files to any web hosting service (Netlify, Vercel, GitHub Pages, etc.)
3. Customize the content by editing the HTML file

## Hosting Options
- **Netlify**: Drag and drop the folder to netlify.com/drop
- **Vercel**: Connect your GitHub repository to vercel.com
- **GitHub Pages**: Upload to a GitHub repository and enable Pages
- **Traditional Hosting**: Upload files via FTP to your hosting provider

## Customization
- Edit \`index.html\` to update content
- Modify \`styles.css\` to change colors and styling
- Update \`script.js\` to add more interactive features

## Contact
${userData.email}
${userData.phone || ""}

Generated with ❤️ by AI Portfolio Builder
`
    zip.file("README.md", readmeContent)

    // Generate package.json for modern development
    const packageJson = {
      name: `${userData.name.toLowerCase().replace(/\s+/g, "-")}-portfolio`,
      version: "1.0.0",
      description: `Professional portfolio website for ${userData.name}`,
      main: "index.html",
      scripts: {
        start: "python -m http.server 8000",
        serve: "npx serve .",
        deploy: 'echo "Add your deployment commands here"',
      },
      keywords: ["portfolio", "website", "resume", template],
      author: userData.name,
      license: "MIT",
    }
    zip.file("package.json", JSON.stringify(packageJson, null, 2))

    // Generate deployment instructions
    const deployInstructions = `# Deployment Instructions

## Quick Deploy Options

### 1. Netlify (Recommended)
1. Go to https://netlify.com/drop
2. Drag and drop this entire folder
3. Your site will be live instantly!

### 2. Vercel
1. Install Vercel CLI: \`npm i -g vercel\`
2. Run \`vercel\` in this directory
3. Follow the prompts

### 3. GitHub Pages
1. Create a new repository on GitHub
2. Upload these files
3. Go to Settings > Pages
4. Select source branch
5. Your site will be available at username.github.io/repository-name

### 4. Traditional Hosting
1. Upload all files to your hosting provider via FTP
2. Make sure index.html is in the root directory

## Local Development
1. Open terminal in this directory
2. Run: \`python -m http.server 8000\` (Python)
   Or: \`npx serve .\` (Node.js)
3. Open http://localhost:8000

## Custom Domain
After deploying, you can add a custom domain through your hosting provider's settings.
`
    zip.file("DEPLOY.md", deployInstructions)

    // Generate the zip file
    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" })

    return new NextResponse(zipBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${userData.name.replace(/\s+/g, "_")}_portfolio.zip"`,
      },
    })
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json({ error: "Failed to export portfolio" }, { status: 500 })
  }
}
