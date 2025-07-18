# QuickFolio - React.js Application

A modern React.js application that creates stunning portfolio websites from resumes or manual input.

## 🚀 Tech Stack

### Core Framework
- **React 18.2.0** - Latest React with Concurrent Features
- **TypeScript** - Type safety and better developer experience
- **Create React App** - Standard React tooling and build setup

### UI Components & Styling
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Radix UI** - Unstyled, accessible UI components
- **Lucide React** - Beautiful, customizable icons
- **Class Variance Authority (CVA)** - Component variant management
- **Tailwind Merge** - Intelligent Tailwind class merging

### State Management & Context
- **React Context API** - Theme management and toast notifications
- **React Hooks** - useState, useEffect, useContext for state management

### Development Tools
- **React Scripts** - Build tools and development server
- **PostCSS** - CSS processing with Autoprefixer
- **Tailwind CSS Animate** - Animation utilities

## 📁 Project Structure

\`\`\`
src/
├── components/
│   ├── ui/                 # Reusable UI components (Button, Card, Input, etc.)
│   ├── PortfolioBuilder.tsx # Main application component
│   ├── ThemeToggle.tsx     # Theme switching component
│   ├── FresherForm.tsx     # Form for fresh graduates
│   ├── ExperiencedForm.tsx # Form for experienced professionals
│   └── PortfolioPreview.tsx # Portfolio template previews
├── contexts/
│   ├── ThemeContext.tsx    # Theme management (dark/light mode)
│   └── ToastContext.tsx    # Toast notification system
├── lib/
│   └── utils.ts           # Utility functions (cn for class merging)
├── App.tsx               # Root application component
├── index.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
\`\`\`

## 🛠 Why This Tech Stack?

### React.js (Core)
- **Component-based architecture** - Modular, reusable components
- **Virtual DOM** - Efficient rendering and updates
- **Large ecosystem** - Extensive library support
- **Industry standard** - Widely adopted and supported

### TypeScript
- **Type safety** - Catch errors at compile time
- **Better IDE support** - Autocomplete, refactoring, navigation
- **Self-documenting code** - Types serve as documentation
- **Easier refactoring** - Safe code changes across large codebases

### Tailwind CSS
- **Rapid development** - Utility classes for quick styling
- **Consistent design** - Design system built into CSS
- **Small bundle size** - Only includes used classes
- **Responsive design** - Mobile-first responsive utilities

### Radix UI
- **Accessibility** - WAI-ARIA compliant components
- **Unstyled** - Full control over appearance
- **Keyboard navigation** - Built-in keyboard support
- **Focus management** - Proper focus handling

### Context API (vs Redux)
- **Built into React** - No additional dependencies
- **Simple state management** - Perfect for theme and notifications
- **Less boilerplate** - Simpler than Redux for basic state
- **Component-level state** - Localized state management

## 🎯 Key Features

### PDF Processing Simulation
- File upload with drag & drop support
- Comprehensive data extraction simulation
- User verification and editing of extracted data

### Dual Input Methods
- **Resume Upload** - PDF processing with data extraction
- **Manual Entry** - Separate forms for freshers vs experienced professionals

### Multiple Portfolio Templates
- Modern Minimalist
- Creative Bold  
- Professional Clean
- Artistic Flair
- Tech Focused

### Theme Support
- Light/Dark mode toggle
- System preference detection
- Persistent theme selection

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions

## 🚀 Getting Started

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Start development server:**
   \`\`\`bash
   npm start
   \`\`\`

3. **Build for production:**
   \`\`\`bash
   npm run build
   \`\`\`

## 🔧 Customization

### Adding New Templates
1. Create template component in `PortfolioPreview.tsx`
2. Add to templates array in `PortfolioBuilder.tsx`
3. Style with Tailwind CSS classes

### Adding New Form Fields
1. Update `UserData` interface
2. Add fields to appropriate form component
3. Update portfolio templates to display new data

### Styling Modifications
- Modify Tailwind config in `tailwind.config.js`
- Update CSS variables in `index.css`
- Customize component styles in individual files

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔮 Future Enhancements

- Real PDF parsing with server-side processing
- More portfolio templates
- Export to multiple formats (PDF, HTML, etc.)
- Social media integration
- Portfolio hosting and sharing
\`\`\`

Now, here are the full contents of the files that were previously omitted or had their content truncated. These are essential for the application to function correctly:
