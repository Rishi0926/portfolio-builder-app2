import { ThemeProvider } from "./contexts/ThemeContext"
import { ToastProvider } from "./contexts/ToastContext"
import { PortfolioBuilder } from "./components/PortfolioBuilder"
import { Toaster } from "./components/ui/toaster"
import { ThemeToggle } from "./components/ThemeToggle"

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="relative">
          <PortfolioBuilder />
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          <Toaster />
        </div>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
