import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Code, Gear, ChartLine, Envelope, Phone, MapPin, ArrowRight, CheckCircle, Article, YoutubeLogo, LinkedinLogo, FacebookLogo, InstagramLogo, TwitterLogo, Moon, Sun, Terminal, CloudArrowUp, Rocket, Cloud, GitBranch, Database, Shield, GithubLogo, HardDrives, ArrowsCounterClockwise, Users, Lock, List, X, Sparkle, Lightbulb, ListChecks } from "@phosphor-icons/react"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import emailjs from '@emailjs/browser'
import { emailConfig } from "@/config/email"
import { BlogView } from "@/components/BlogView"
import { ServicesView } from "@/components/ServicesView"
import { ParticleBackground } from "@/components/ParticleBackground"
import { useTheme } from "@/hooks/use-theme"
import logo from '@/assets/images/logo.jpeg'

function App() {
  const { theme, toggleTheme } = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [showBlog, setShowBlog] = useState(false)
  const [showServices, setShowServices] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close mobile menu on window resize and ESC key
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsMobileMenuOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileMenuOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Show loading toast
    const loadingToast = toast.loading("Sending your message...")
    
    try {
      // EmailJS configuration from config file
      const { serviceId, templateId, publicKey, recipientEmail } = emailConfig
      
      // Check if EmailJS is properly configured
      if (publicKey === 'YOUR_EMAILJS_PUBLIC_KEY_HERE' || 
          serviceId.includes('dhionix') || 
          templateId.includes('dhionix')) {
        throw new Error('EmailJS not configured. Please set up EmailJS credentials in /src/config/email.ts')
      }
      
      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Not specified',
        message: formData.message,
        to_email: recipientEmail,
        reply_to: formData.email,
        // Additional metadata
        timestamp: new Date().toLocaleString(),
        source: 'Dhionix Website Contact Form'
      }
      
      console.log('Attempting to send email with EmailJS...', {
        serviceId,
        templateId,
        recipientEmail,
        customerEmail: formData.email
      })
      
      // Send email using EmailJS
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)
      
      console.log('Email sent successfully:', response)
      
      // Success
      toast.dismiss(loadingToast)
      toast.success("Thank you for your inquiry! We'll get back to you within 24 hours.")
      setFormData({ name: '', email: '', company: '', message: '' })
      
    } catch (error) {
      console.error('Failed to send email via EmailJS:', error)
      toast.dismiss(loadingToast)
      
      // Enhanced fallback: Try multiple methods
      try {
        // Method 1: mailto link with better formatting
        const emailSubject = encodeURIComponent(`New Project Inquiry from ${formData.name}`)
        const emailBody = encodeURIComponent(
          `Hello Dhionix Team,\n\n` +
          `You have received a new project inquiry through your website.\n\n` +
          `Customer Details:\n` +
          `Name: ${formData.name}\n` +
          `Email: ${formData.email}\n` +
          `Company: ${formData.company || 'Not specified'}\n\n` +
          `Project Details:\n${formData.message}\n\n` +
          `---\n` +
          `Sent from: Dhionix Website Contact Form\n` +
          `Timestamp: ${new Date().toLocaleString()}\n` +
          `Please reply directly to ${formData.email}`
        )
        
        const mailtoLink = `mailto:sales@dhionix.com?subject=${emailSubject}&body=${emailBody}`
        
        // Try to open email client
        const emailWindow = window.open(mailtoLink, '_blank')
        
        if (emailWindow) {
          toast.success("Opening your email client to send the message. Please send the email to complete your inquiry.")
        } else {
          // If popup blocked, show manual email instructions
          toast.error(
            "Email setup needed. Please contact us directly at sales@dhionix.com",
            { duration: 8000 }
          )
        }
        
        // Clear form anyway since user has the email content
        setFormData({ name: '', email: '', company: '', message: '' })
        
      } catch (fallbackError) {
        console.error('Fallback email method also failed:', fallbackError)
        
        // Final fallback: Show manual contact instructions
        toast.error(
          `Please email us directly at sales@dhionix.com with your inquiry. ` +
          `We apologize for the technical issue.`,
          { duration: 10000 }
        )
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const [selectedService, setSelectedService] = useState<any>(null)

  const services = [
    {
      icon: Cloud,
      title: "GitHub Cloud Services",
      shortDescription: "Empower your development teams with GitHub's cloud-native collaboration platform.",
      description: "Leverage GitHub's cloud-native platform for seamless team collaboration, automatic security updates, and enterprise-grade compliance. Perfect for distributed teams and cloud-native organizations.",
      features: ["Remote Team Collaboration", "Automatic Security Updates", "Scalable Infrastructure", "Advanced Security & Compliance", "GitHub Copilot Integration", "99.9% Uptime SLA"],
      benefits: "Enhanced productivity for distributed teams with built-in security scanning, automated workflows, and unlimited scalability.",
      scenarios: "Remote development teams, open-source projects, cloud-native organizations scaling rapidly",
      techStack: ["GitHub Actions", "GitHub Packages", "GitHub Copilot", "GitHub Advanced Security", "Code Scanning"],
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: HardDrives,
      title: "GitHub Enterprise Server",
      shortDescription: "Deploy GitHub on-premises with complete control over your data and compliance.",
      description: "Deploy GitHub on your own infrastructure with complete data residency control, custom compliance requirements, and seamless integration with your internal IT systems. Ideal for organizations with strict regulatory requirements.",
      features: ["Data Residency Control", "Custom Compliance Standards", "Internal IT Integration", "Advanced Access Controls", "Air-Gapped Deployment", "High Availability Setup"],
      benefits: "Meet strict regulatory requirements while maintaining GitHub's powerful collaboration features with full control over your data.",
      scenarios: "Financial institutions, healthcare organizations, government agencies with strict data governance and compliance needs",
      techStack: ["GitHub Enterprise Server", "LDAP/SAML Integration", "Custom Workflows", "Backup & Disaster Recovery"],
      color: "from-slate-500 to-gray-600"
    },
    {
      icon: ArrowsCounterClockwise,
      title: "Migration & CI/CD Implementation",
      shortDescription: "Seamlessly migrate your codebase and automate your development workflows.",
      description: "Comprehensive migration support for transitioning from legacy systems to modern platforms with zero downtime. We handle source code, issues, wikis, and complete workflow automation setup.",
      features: ["Complete Migration Support", "CI/CD Pipeline Planning", "GitHub Actions Implementation", "Post-Migration Validation", "Workflow Optimization", "Team Training"],
      benefits: "Zero-downtime migrations with preserved history, optimized workflow automation, and comprehensive documentation.",
      scenarios: "Legacy system modernization, multi-platform consolidation, workflow standardization, DevOps transformation",
      techStack: ["GitHub Actions", "Jenkins", "GitLab CI", "Azure Pipelines", "Docker/Kubernetes", "Terraform"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Cloud,
      title: "Azure Cloud Solutions",
      shortDescription: "Build and scale enterprise applications on Microsoft's trusted cloud platform.",
      description: "Harness Microsoft Azure's powerful cloud platform to build, deploy, and scale applications with enterprise-grade security, reliability, and global reach. Perfect for mission-critical workloads.",
      features: ["Scalable Infrastructure", "Azure App Services", "Database Solutions (SQL/Cosmos)", "Identity & Access Management", "Azure Kubernetes Service", "AI & Machine Learning"],
      benefits: "Reduced operational costs with automatic scaling, comprehensive monitoring, and pay-as-you-go pricing model.",
      scenarios: "Enterprise applications, data-intensive workloads, global application deployment, AI/ML solutions",
      techStack: ["Azure App Service", "Azure SQL", "Azure Functions", "Azure DevOps", "Azure AD", "Azure Monitor"],
      color: "from-sky-500 to-blue-600"
    },
    {
      icon: GitBranch,
      title: "Azure DevOps Services",
      shortDescription: "Accelerate delivery with end-to-end DevOps tools for agile development.",
      description: "Streamline your entire development lifecycle with Azure DevOps comprehensive suite of tools for planning, development, testing, and deployment with full traceability and automation.",
      features: ["CI/CD Pipelines", "Azure Repos (Git)", "Azure Boards (Project Tracking)", "Automated Testing", "Artifact Management", "Release Management"],
      benefits: "Faster delivery cycles with integrated toolchain, comprehensive project visibility, and seamless collaboration across teams.",
      scenarios: "Agile development teams, complex multi-service applications, regulated development environments, enterprise DevOps",
      techStack: ["Azure Pipelines", "Azure Repos", "Azure Boards", "Azure Test Plans", "Azure Artifacts"],
      color: "from-blue-600 to-indigo-600"
    },
    {
      icon: ListChecks,
      title: "Atlassian Jira Services",
      shortDescription: "Optimize project management and issue tracking with Jira's powerful platform.",
      description: "Implement and optimize Atlassian Jira for agile project management, issue tracking, and team collaboration. From setup to advanced workflows, we help teams work smarter.",
      features: ["Jira Software Setup", "Custom Workflow Design", "Agile Board Configuration", "Jira Service Management", "Integration & Automation", "Reporting & Dashboards"],
      benefits: "Improved team productivity with customized workflows, automated processes, and real-time visibility into project progress.",
      scenarios: "Agile development teams, IT service management, project portfolio management, cross-functional team collaboration",
      techStack: ["Jira Software", "Jira Service Management", "Confluence", "Bitbucket", "Jira Automation", "Apps & Integrations"],
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: CloudArrowUp,
      title: "Cloud Migration & Modernization", 
      shortDescription: "Transform legacy infrastructure into modern, cloud-native architectures.",
      description: "Seamlessly migrate your existing infrastructure to the cloud and modernize legacy applications for optimal performance, scalability, and cost-efficiency with minimal disruption.",
      features: ["AWS/Azure/GCP Migration", "Container Orchestration", "Monitoring & Security", "Performance Optimization", "Database Migration", "Legacy App Modernization"],
      benefits: "Improved scalability, reduced maintenance overhead, enhanced security, and significant cost savings with modern cloud architecture.",
      scenarios: "Legacy application modernization, data center consolidation, microservices transformation, hybrid cloud strategy",
      techStack: ["Kubernetes", "Docker", "Terraform", "AWS/Azure/GCP", "Service Mesh", "Cloud Native Tools"],
      color: "from-orange-500 to-red-500"
    }
  ]





  if (showBlog) {
    return <BlogView onBack={() => setShowBlog(false)} />
  }

  if (showServices) {
    return <ServicesView onBack={() => setShowServices(false)} />
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent pointer-events-none" />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 border-b border-border/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo + Company Name */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center flex-shrink-0">
                <img src={logo} alt="Dhionix Logo" className="h-full w-full rounded-lg object-cover shadow-lg" />
              </div>
              <h1 className="text-xl font-bold text-primary select-none leading-none">Dhionix</h1>
            </div>
            
            {/* Right side - All menu options */}
            <div className="flex items-center gap-4 lg:gap-6">
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
                <button onClick={() => setShowServices(true)} className="text-foreground/80 hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md px-2 py-1 transition-all duration-300 hover:scale-105 font-medium">Services</button>
                <a href="#about" className="text-foreground/80 hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md px-2 py-1 transition-all duration-300 hover:scale-105 font-medium">About</a>
                <button onClick={() => setShowBlog(true)} className="text-foreground/80 hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md px-2 py-1 transition-all duration-300 hover:scale-105 font-medium">Blog</button>
                <a href="#contact-us" className="text-foreground/80 hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md px-2 py-1 transition-all duration-300 hover:scale-105 font-medium">Contact Us</a>
              </div>
              
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full w-10 h-10 hover:bg-primary/10 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" weight="duotone" />
                ) : (
                  <Sun className="w-5 h-5" weight="duotone" />
                )}
              </Button>
              
              {/* Get Started Button */}
              <Button asChild className="hidden sm:flex shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                <a href="#get-started">Get Started</a>
              </Button>
              
              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden rounded-full w-10 h-10 hover:bg-primary/10 transition-all duration-300"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" weight="bold" />
                ) : (
                  <List className="w-5 h-5" weight="bold" />
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-4 space-y-3">
              <button 
                onClick={() => {
                  setShowServices(true)
                  setIsMobileMenuOpen(false)
                }} 
                className="block w-full text-left px-3 py-2 text-foreground/80 hover:text-primary hover:bg-primary/5 focus:text-primary focus:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-all duration-300 font-medium"
              >
                Services
              </button>
              <a 
                href="#about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-3 py-2 text-foreground/80 hover:text-primary hover:bg-primary/5 focus:text-primary focus:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-all duration-300 font-medium"
              >
                About
              </a>
              <button 
                onClick={() => {
                  setShowBlog(true)
                  setIsMobileMenuOpen(false)
                }} 
                className="block w-full text-left px-3 py-2 text-foreground/80 hover:text-primary hover:bg-primary/5 focus:text-primary focus:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-all duration-300 font-medium"
              >
                Blog
              </button>
              <a 
                href="#contact-us" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-3 py-2 text-foreground/80 hover:text-primary hover:bg-primary/5 focus:text-primary focus:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-all duration-300 font-medium"
              >
                Contact Us
              </a>
              <div className="pt-2 border-t border-border/20">
                <Button asChild className="w-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                  <a href="#get-started" onClick={() => setIsMobileMenuOpen(false)}>Get Started</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden mt-16">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground mb-6 animate-fade-in">
              Build Software That
              <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient">
                Transforms Business
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              We craft exceptional software solutions that drive growth, streamline operations, 
              and give your business a competitive edge in the digital landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105">
                <a href="#contact-us">Start Your Project <ArrowRight className="ml-2 w-4 h-4" /></a>
              </Button>
              <Button size="lg" variant="outline" onClick={() => setShowServices(true)} className="backdrop-blur-sm bg-background/50 hover:bg-background/80 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105">
                View Services
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-accent/5 to-secondary/5 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full">
                What We Offer
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive technology solutions designed to accelerate your digital transformation journey. 
              Click any service to explore detailed capabilities and benefits.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                onClick={() => setSelectedService(service)}
                className="border-border/40 hover:border-primary/50 backdrop-blur-sm bg-card/90 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3 group relative overflow-hidden cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="relative z-10 pb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <service.icon className="w-8 h-8 text-white" weight="duotone" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300 mb-3">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {service.shortDescription}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10 space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-foreground/80 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" weight="fill" />
                      Key Capabilities
                    </h4>
                    <ul className="space-y-2">
                      {service.features.slice(0, 4).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full mt-4 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" weight="bold" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-6">
              Need a custom solution? We're here to help.
            </p>
            <Button size="lg" asChild className="shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300">
              <a href="#get-started">
                <Envelope className="w-5 h-5 mr-2" weight="duotone" />
                Get a Free Consultation
              </a>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl" onClick={() => setSelectedService(null)}>
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 z-10 rounded-full hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="w-5 h-5" weight="bold" />
            </Button>
            
            <CardHeader className="pb-6">
              <div className={`w-20 h-20 bg-gradient-to-br ${selectedService.color} rounded-2xl flex items-center justify-center mb-6 shadow-2xl`}>
                <selectedService.icon className="w-10 h-10 text-white" weight="duotone" />
              </div>
              <CardTitle className="text-3xl mb-3">{selectedService.title}</CardTitle>
              <CardDescription className="text-lg leading-relaxed">
                {selectedService.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-primary" weight="fill" />
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {selectedService.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 text-base">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Rocket className="w-6 h-6 text-accent" weight="duotone" />
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.techStack.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Sparkle className="w-6 h-6 text-secondary" weight="duotone" />
                  Business Benefits
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed bg-secondary/5 p-6 rounded-xl border border-secondary/20">
                  {selectedService.benefits}
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-accent" weight="duotone" />
                  Ideal Use Cases
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed bg-accent/5 p-6 rounded-xl border border-accent/20">
                  {selectedService.scenarios}
                </p>
              </div>
              
              <div className="flex gap-4 pt-6">
                <Button size="lg" asChild className="flex-1 shadow-lg">
                  <a href="#contact-us">
                    <Envelope className="w-5 h-5 mr-2" weight="duotone" />
                    Start a Project
                  </a>
                </Button>
                <Button size="lg" variant="outline" onClick={() => setSelectedService(null)} className="flex-1">
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {/* About Section */}
      <section id="about" className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/15 via-primary/5 to-accent/10" />
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              About Dhionix IT Solutions
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Founded by seasoned software engineers, Dhionix IT Solutions brings together 
              deep technical expertise and business acumen to deliver software that makes a difference.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              We believe in building long-term partnerships with our clients, providing 
              ongoing support and innovation to help your business thrive in the digital age.
            </p>
            <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-card/60 backdrop-blur-sm p-6 rounded-2xl border border-border/40 hover:border-primary/40 transition-all duration-300 hover:scale-105 shadow-lg">
                <h3 className="font-semibold text-foreground mb-2 text-lg">Our Mission</h3>
                <p className="text-muted-foreground">Empowering businesses through innovative software solutions</p>
              </div>
              <div className="bg-card/60 backdrop-blur-sm p-6 rounded-2xl border border-border/40 hover:border-accent/40 transition-all duration-300 hover:scale-105 shadow-lg">
                <h3 className="font-semibold text-foreground mb-2 text-lg">Our Values</h3>
                <p className="text-muted-foreground">Quality, transparency, and continuous innovation</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Latest Blog Posts Preview */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-primary/5 to-secondary/10" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-xl text-muted-foreground">
              Expert insights on software development and technology trends
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group border-border/40 backdrop-blur-sm bg-card/80">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur shadow-lg">
                    GitHub Actions
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  Mastering CI/CD with GitHub Actions
                </CardTitle>
                <CardDescription className="text-base line-clamp-2">
                  Learn how to automate your entire software development workflow with GitHub Actions, from build to deployment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Dhionix Team</span>
                  <span>10 min read</span>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group border-border/40 backdrop-blur-sm bg-card/80">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-orange-500/30 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur shadow-lg">
                    GitHub Advanced Security
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  Securing Your Code with GitHub Advanced Security
                </CardTitle>
                <CardDescription className="text-base line-clamp-2">
                  Protect your codebase with automated vulnerability scanning, secret detection, and code analysis using GHAS.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Dhionix Team</span>
                  <span>12 min read</span>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group border-border/40 backdrop-blur-sm bg-card/80">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-teal-500/30 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur shadow-lg">
                    GitHub Copilot
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  Boost Productivity with GitHub Copilot
                </CardTitle>
                <CardDescription className="text-base line-clamp-2">
                  Discover how AI-powered code suggestions can accelerate development and improve code quality in your projects.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Dhionix Team</span>
                  <span>8 min read</span>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group border-border/40 backdrop-blur-sm bg-card/80">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-blue-500/30 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur shadow-lg">
                    GitHub Pages
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  Deploy Static Sites with GitHub Pages
                </CardTitle>
                <CardDescription className="text-base line-clamp-2">
                  Host your documentation, portfolio, or project site for free with GitHub Pages and custom domain support.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Dhionix Team</span>
                  <span>7 min read</span>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group border-border/40 backdrop-blur-sm bg-card/80">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur shadow-lg">
                    DevSecOps
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  Implementing DevSecOps Best Practices
                </CardTitle>
                <CardDescription className="text-base line-clamp-2">
                  Integrate security into every phase of your DevOps pipeline for faster, more secure software delivery.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Dhionix Team</span>
                  <span>15 min read</span>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group border-border/40 backdrop-blur-sm bg-card/80">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur shadow-lg">
                    GitHub Enterprise
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  GitHub Enterprise: Cloud vs Server
                </CardTitle>
                <CardDescription className="text-base line-clamp-2">
                  Compare GitHub Enterprise Cloud and Server to choose the right solution for your organization's needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Dhionix Team</span>
                  <span>11 min read</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" onClick={() => setShowBlog(true)} className="backdrop-blur-sm bg-background/60 hover:bg-background/90 border-primary/30 hover:border-primary/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Article className="w-5 h-5 mr-2" weight="duotone" />
              View All Articles
            </Button>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact-us" className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-center mb-16">
            <Card className="max-w-2xl w-full backdrop-blur-sm bg-card/80 border-border/40 hover:border-primary/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary/10">
              <CardHeader>
                <CardTitle className="text-2xl">Dhionix IT Solutions</CardTitle>
                <CardDescription>Complete Contact Information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <MapPin className="w-5 h-5 text-primary" weight="duotone" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        #1, 11th cross, 8th road,<br />
                        Govinayakanahalli 2nd stage,<br />
                        Kumaraswamy Layout, Bangalore-560078, India.
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Phone className="w-5 h-5 text-primary" weight="duotone" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                      <p className="text-muted-foreground">+91 9741366703</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Envelope className="w-5 h-5 text-primary" weight="duotone" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <p className="text-muted-foreground">sales@dhionix.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div id="get-started" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss your project and see how we can help bring your vision to life.
            </p>
          </div>
          
          <Card className="max-w-3xl mx-auto mb-16 backdrop-blur-sm bg-card/80 border-border/40 shadow-2xl">
            <CardHeader>
              <CardTitle>Tell Us About Your Project</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours.
                {emailConfig.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY_HERE' && (
                  <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md text-sm text-amber-800 dark:text-amber-200">
                    ⚠️ <strong>Admin Notice:</strong> EmailJS not configured. Emails will use fallback method. 
                    <a href="/EMAILJS_SETUP_GUIDE.md" className="underline ml-1">Setup Guide</a>
                  </div>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="bg-background/50 border-border/40 focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="bg-background/50 border-border/40 focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Your company name"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="bg-background/50 border-border/40 focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Project Details</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project requirements..."
                    className="min-h-32 bg-background/50 border-border/40 focus:border-primary/50 transition-colors"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-6">Follow Us</h3>
            <div className="flex items-center justify-center gap-6">
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 hover:from-primary hover:to-accent hover:text-primary-foreground rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
              >
                <YoutubeLogo className="w-6 h-6" weight="fill" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 hover:from-primary hover:to-accent hover:text-primary-foreground rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
              >
                <LinkedinLogo className="w-6 h-6" weight="fill" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 hover:from-primary hover:to-accent hover:text-primary-foreground rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
              >
                <FacebookLogo className="w-6 h-6" weight="fill" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 hover:from-primary hover:to-accent hover:text-primary-foreground rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
              >
                <InstagramLogo className="w-6 h-6" weight="fill" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 hover:from-primary hover:to-accent hover:text-primary-foreground rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
              >
                <TwitterLogo className="w-6 h-6" weight="fill" />
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gradient-to-br from-foreground via-foreground to-foreground/95 text-background py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--primary-rgb),0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(var(--accent-rgb),0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
            {/* Company Info - Spans 5 columns */}
            <div className="md:col-span-12 lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 flex items-center justify-center flex-shrink-0">
                  <img src={logo} alt="Dhionix Logo" className="h-full w-full rounded-lg object-cover shadow-lg" />
                </div>
                <h3 className="text-2xl font-bold text-background select-none leading-none">Dhionix IT Solutions</h3>
              </div>
              <p className="text-background/80 mb-6 text-lg leading-relaxed max-w-md">
                Building exceptional software solutions that drive business growth and innovation.
              </p>
              
              {/* Contact Information */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 bg-background/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-background/20 transition-colors">
                    <MapPin className="w-4 h-4 text-background/90" weight="duotone" />
                  </div>
                  <div>
                    <p className="text-background/90 leading-relaxed">
                      #1, 11th cross, 8th road,<br />
                      Govinayakanahalli 2nd stage,<br />
                      Kumaraswamy Layout,<br />
                      Bangalore-560078, India.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-background/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-background/20 transition-colors">
                    <Phone className="w-4 h-4 text-background/90" weight="duotone" />
                  </div>
                  <div>
                    <a href="tel:+919741366703" className="text-background/90 hover:text-background transition-colors">
                      +91 9741366703
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-background/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-background/20 transition-colors">
                    <Envelope className="w-4 h-4 text-background/90" weight="duotone" />
                  </div>
                  <div>
                    <a href="mailto:sales@dhionix.com" className="text-background/90 hover:text-background transition-colors">
                      sales@dhionix.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Links - Spans 7 columns, divided into 2 sections */}
            <div className="md:col-span-12 lg:col-span-7 grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-6 text-background text-lg">Services</h4>
                <ul className="space-y-3 text-background/80">
                  <li className="hover:text-background transition-colors cursor-pointer hover:translate-x-1 transition-transform duration-200">Custom Development</li>
                  <li className="hover:text-background transition-colors cursor-pointer hover:translate-x-1 transition-transform duration-200">Cloud Solutions</li>
                  <li className="hover:text-background transition-colors cursor-pointer hover:translate-x-1 transition-transform duration-200">GitHub Enterprise</li>
                  <li className="hover:text-background transition-colors cursor-pointer hover:translate-x-1 transition-transform duration-200">Azure DevOps</li>
                  <li className="hover:text-background transition-colors cursor-pointer hover:translate-x-1 transition-transform duration-200">Digital Transformation</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-6 text-background text-lg">Company</h4>
                <ul className="space-y-3 text-background/80">
                  <li className="hover:text-background transition-colors cursor-pointer hover:translate-x-1 transition-transform duration-200">About Us</li>
                  <li className="hover:text-background transition-colors cursor-pointer hover:translate-x-1 transition-transform duration-200">Careers</li>
                  <li className="hover:text-background transition-colors cursor-pointer hover:translate-x-1 transition-transform duration-200">Contact Us</li>
                  <li>
                    <button 
                      onClick={() => setShowBlog(true)} 
                      className="hover:text-background transition-colors hover:translate-x-1 transition-transform duration-200 inline-block"
                    >
                      Blog
                    </button>
                  </li>
                  <li className="hover:text-background transition-colors cursor-pointer hover:translate-x-1 transition-transform duration-200">Privacy Policy</li>
                </ul>
              </div>
            </div>
          </div>
          
          <Separator className="my-10 bg-background/20" />
          
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-background/60 text-sm">
              <p>&copy; 2024 Dhionix IT Solutions. All rights reserved.</p>
            </div>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-background/10 hover:bg-background/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <LinkedinLogo className="w-5 h-5 text-background/80" weight="fill" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-background/10 hover:bg-background/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <TwitterLogo className="w-5 h-5 text-background/80" weight="fill" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-background/10 hover:bg-background/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <FacebookLogo className="w-5 h-5 text-background/80" weight="fill" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-background/10 hover:bg-background/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <YoutubeLogo className="w-5 h-5 text-background/80" weight="fill" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-background/10 hover:bg-background/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <InstagramLogo className="w-5 h-5 text-background/80" weight="fill" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App
