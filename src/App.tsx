import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Code, Gear, ChartLine, Envelope, Phone, MapPin, ArrowRight, CheckCircle, Article, YoutubeLogo, LinkedinLogo, FacebookLogo, InstagramLogo, TwitterLogo, Moon, Sun, Terminal, CloudArrowUp, Rocket } from "@phosphor-icons/react"
import { useState } from "react"
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Show loading toast
    const loadingToast = toast.loading("Sending your message...")
    
    try {
      // EmailJS configuration from config file
      const { serviceId, templateId, publicKey } = emailConfig
      
      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        message: formData.message,
        to_email: 'sales@dhionix.com',
        reply_to: formData.email,
      }
      
      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      
      // Success
      toast.dismiss(loadingToast)
      toast.success("Thank you for your inquiry! We'll get back to you within 24 hours.")
      setFormData({ name: '', email: '', company: '', message: '' })
      
    } catch (error) {
      console.error('Failed to send email:', error)
      toast.dismiss(loadingToast)
      
      // Fallback: Open email client with pre-filled information
      const emailSubject = `New Project Inquiry from ${formData.name}`
      const emailBody = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0ACompany: ${formData.company}%0D%0A%0D%0AProject Details:%0D%0A${formData.message}`
      const mailtoLink = `mailto:sales@dhionix.com?subject=${emailSubject}&body=${emailBody}`
      
      window.open(mailtoLink, '_blank')
      toast.success("Opening your email client to send the message.")
      setFormData({ name: '', email: '', company: '', message: '' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const services = [
    {
      icon: Terminal,
      title: "Custom Software Development",
      description: "Tailored applications built with cutting-edge technologies to solve your unique business challenges.",
      features: ["Web Applications", "Mobile Apps", "Enterprise Solutions", "API Development"]
    },
    {
      icon: CloudArrowUp,
      title: "Cloud & DevOps Solutions", 
      description: "Scalable cloud infrastructure and automated deployment pipelines for reliable, efficient operations.",
      features: ["AWS/Azure Migration", "CI/CD Pipelines", "Container Orchestration", "Monitoring & Security"]
    },
    {
      icon: Rocket,
      title: "Digital Transformation",
      description: "Strategic technology consulting to modernize your business processes and drive growth.",
      features: ["Process Automation", "Data Analytics", "System Integration", "Technology Strategy"]
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
            <div className="flex-shrink-0 flex items-center gap-3 whitespace-nowrap">
              <img src={logo} alt="logo" className="h-10 w-10 flex-shrink-0" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent flex-shrink-0">Dhionix</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button onClick={() => setShowServices(true)} className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105">Services</button>
                <a href="#about" className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105">About</a>
                <button onClick={() => setShowBlog(true)} className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105">Blog</button>
                <a href="#contact-us" className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105">Contact Us</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
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
              <Button asChild className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                <a href="#contact-us">Get Started</a>
              </Button>
            </div>
          </div>
        </div>
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
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
                <CheckCircle className="w-4 h-4 text-accent" weight="fill" />
                <span>50+ Projects Delivered</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
                <CheckCircle className="w-4 h-4 text-accent" weight="fill" />
                <span>99% Client Satisfaction</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
                <CheckCircle className="w-4 h-4 text-accent" weight="fill" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From concept to deployment, we provide end-to-end software development services 
              tailored to your business needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="border-border/40 hover:border-primary/40 backdrop-blur-sm bg-card/80 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <service.icon className="w-6 h-6 text-primary" weight="duotone" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" weight="fill" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
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
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur shadow-lg">
                    Cloud Architecture
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  Building Scalable Microservices with Kubernetes
                </CardTitle>
                <CardDescription className="text-base line-clamp-2">
                  Learn how to design and deploy microservices architecture using Kubernetes for enterprise-scale applications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Alex Thompson</span>
                  <span>8 min read</span>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group border-border/40 backdrop-blur-sm bg-card/80">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-secondary/30 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur shadow-lg">
                    AI & Machine Learning
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  The Future of AI in Enterprise Software Development
                </CardTitle>
                <CardDescription className="text-base line-clamp-2">
                  Exploring how artificial intelligence is transforming the software development lifecycle.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Jordan Kim</span>
                  <span>10 min read</span>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group border-border/40 backdrop-blur-sm bg-card/80">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 to-primary/30 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur shadow-lg">
                    Security
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  Security Best Practices for Modern Web Applications
                </CardTitle>
                <CardDescription className="text-base line-clamp-2">
                  A comprehensive guide to securing your web applications against common vulnerabilities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Sam Rivera</span>
                  <span>12 min read</span>
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
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <Card className="backdrop-blur-sm bg-card/80 border-border/40 hover:border-primary/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary/10">
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
                        tech-roll/project-k#1, 11th cross, 8th road,<br />
                        Govinayakanahalli 2nd stage,<br />
                        Kumaraswamy Layout, Bangalore-560078
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
                </div>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-sm bg-card/80 border-border/40 hover:border-accent/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-accent/10">
              <CardHeader>
                <CardTitle className="text-2xl">New Project Enquiries</CardTitle>
                <CardDescription>Get in touch for your next project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Envelope className="w-5 h-5 text-accent" weight="duotone" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <p className="text-muted-foreground">sales@dhionix.com</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Phone className="w-5 h-5 text-accent" weight="duotone" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Mobile</h3>
                      <p className="text-muted-foreground">+91 9741366703</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-16">
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
      <footer className="bg-gradient-to-br from-foreground via-foreground to-foreground/95 text-background py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4 whitespace-nowrap">
                <img src={logo} alt="logo" className="h-8 w-8 flex-shrink-0" />
                <h3 className="text-xl font-bold text-background flex-shrink-0">Dhionix IT Solutions</h3>
              </div>
              <p className="text-background/80 mb-4">
                Building exceptional software solutions that drive business growth and innovation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-background/80">
                <li className="hover:text-background transition-colors cursor-pointer">Custom Development</li>
                <li className="hover:text-background transition-colors cursor-pointer">Cloud Solutions</li>
                <li className="hover:text-background transition-colors cursor-pointer">Digital Transformation</li>
                <li className="hover:text-background transition-colors cursor-pointer">Consulting</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-background/80">
                <li className="hover:text-background transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-background transition-colors cursor-pointer">Careers</li>
                <li className="hover:text-background transition-colors cursor-pointer">Contact Us</li>
                <li><button onClick={() => setShowBlog(true)} className="hover:text-background transition-colors">Blog</button></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-background/20" />
          <div className="text-center text-background/60">
            <p>&copy; 2024 Dhionix IT Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App