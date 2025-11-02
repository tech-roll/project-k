import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, 
  ChartLine, 
  GitBranch,
  Rocket,
  CloudArrowUp,
  ShieldCheck,
  Package,
  Terminal,
  GitlabLogo,
  CheckCircle,
  Moon,
  Sun
} from "@phosphor-icons/react"
import { useTheme } from "@/hooks/use-theme"
import logo from "@/assets/images/logo.jpeg"

interface ServicesViewProps {
  onBack: () => void
}

export function ServicesView({ onBack }: ServicesViewProps) {
  const { theme, toggleTheme } = useTheme()
  const devopsServices = [
    {
      icon: Terminal,
      title: "Custom Software Development",
      description: "End-to-end software development services tailored to your business needs.",
      features: [
        "Full-stack web applications",
        "Mobile app development (iOS & Android)",
        "Progressive Web Apps (PWA)",
        "API design and development",
        "Legacy system modernization",
        "Microservices architecture"
      ]
    },
    {
      icon: CloudArrowUp,
      title: "Cloud Infrastructure & Migration",
      description: "Build and migrate to scalable, resilient cloud infrastructure.",
      features: [
        "AWS, Azure, and GCP solutions",
        "Cloud-native architecture design",
        "Infrastructure as Code (IaC)",
        "Multi-cloud and hybrid strategies",
        "Cost optimization and monitoring",
        "Disaster recovery planning"
      ]
    },
    {
      icon: Rocket,
      title: "CI/CD Pipeline Development",
      description: "Automated deployment pipelines for faster, more reliable releases.",
      features: [
        "Continuous Integration setup",
        "Continuous Deployment automation",
        "Automated testing frameworks",
        "Build optimization",
        "Release management",
        "Deployment strategies (Blue-Green, Canary)"
      ]
    },
    {
      icon: Package,
      title: "Container Orchestration",
      description: "Containerize and orchestrate applications at scale.",
      features: [
        "Docker containerization",
        "Kubernetes cluster setup",
        "Helm chart development",
        "Service mesh implementation",
        "Auto-scaling configuration",
        "Container security"
      ]
    },
    {
      icon: ShieldCheck,
      title: "DevSecOps & Security",
      description: "Integrate security throughout the development lifecycle.",
      features: [
        "Security scanning automation",
        "Vulnerability assessment",
        "Compliance monitoring",
        "Secrets management",
        "Access control and identity management",
        "Security best practices implementation"
      ]
    },
    {
      icon: ChartLine,
      title: "Monitoring & Observability",
      description: "Comprehensive visibility into system performance and health.",
      features: [
        "Application Performance Monitoring (APM)",
        "Log aggregation and analysis",
        "Metrics collection and visualization",
        "Distributed tracing",
        "Alerting and incident response",
        "Custom dashboards"
      ]
    }
  ]

  const scmTools = [
    {
      name: "GitHub",
      icon: GitBranch,
      description: "Industry-leading platform for version control and collaboration",
      capabilities: [
        "Git repository hosting",
        "Pull request workflows",
        "GitHub Actions CI/CD",
        "Code review tools",
        "Issue tracking",
        "Project management"
      ]
    },
    {
      name: "GitLab",
      icon: GitlabLogo,
      description: "Complete DevOps platform with built-in CI/CD",
      capabilities: [
        "Git repository management",
        "GitLab CI/CD pipelines",
        "Container registry",
        "Security scanning",
        "Issue boards",
        "Wiki documentation"
      ]
    },
    {
      name: "Bitbucket",
      icon: GitBranch,
      description: "Git solution for professional teams by Atlassian",
      capabilities: [
        "Git and Mercurial support",
        "Bitbucket Pipelines",
        "Jira integration",
        "Code insights",
        "Branch permissions",
        "Deployment tracking"
      ]
    },
    {
      name: "Azure DevOps",
      icon: GitBranch,
      description: "Microsoft's comprehensive DevOps solution",
      capabilities: [
        "Azure Repos (Git)",
        "Azure Pipelines",
        "Azure Boards",
        "Azure Test Plans",
        "Azure Artifacts",
        "Integration with Microsoft ecosystem"
      ]
    }
  ]

  const cicdTools = [
    {
      name: "Jenkins",
      category: "CI/CD Automation",
      description: "Open-source automation server with extensive plugin ecosystem",
      useCases: ["Build automation", "Testing pipelines", "Deployment orchestration"]
    },
    {
      name: "GitHub Actions",
      category: "CI/CD Automation",
      description: "Native CI/CD solution integrated with GitHub repositories",
      useCases: ["Workflow automation", "Container builds", "Multi-platform testing"]
    },
    {
      name: "GitLab CI/CD",
      category: "CI/CD Automation",
      description: "Built-in CI/CD with GitLab's complete DevOps platform",
      useCases: ["Auto DevOps", "Pipeline as code", "Security testing"]
    },
    {
      name: "CircleCI",
      category: "CI/CD Automation",
      description: "Cloud-native CI/CD platform for modern software teams",
      useCases: ["Fast builds", "Parallel testing", "Docker layer caching"]
    },
    {
      name: "Travis CI",
      category: "CI/CD Automation",
      description: "Continuous integration service for open source and private projects",
      useCases: ["GitHub integration", "Multi-language support", "Build matrix"]
    },
    {
      name: "Azure Pipelines",
      category: "CI/CD Automation",
      description: "Cloud-based CI/CD service from Microsoft",
      useCases: ["Cross-platform builds", "Multi-stage pipelines", "Release management"]
    }
  ]

  const containerTools = [
    {
      name: "Docker",
      category: "Containerization",
      description: "Platform for building, shipping, and running containerized applications",
      useCases: ["Application packaging", "Microservices", "Development environments"]
    },
    {
      name: "Kubernetes",
      category: "Orchestration",
      description: "Industry-standard container orchestration platform",
      useCases: ["Container scheduling", "Auto-scaling", "Service discovery"]
    },
    {
      name: "Helm",
      category: "Package Management",
      description: "Package manager for Kubernetes applications",
      useCases: ["Chart management", "Release versioning", "Configuration management"]
    },
    {
      name: "Docker Compose",
      category: "Multi-Container",
      description: "Tool for defining and running multi-container applications",
      useCases: ["Local development", "Service orchestration", "Testing environments"]
    }
  ]

  const infrastructureTools = [
    {
      name: "Terraform",
      category: "Infrastructure as Code",
      description: "Multi-cloud infrastructure provisioning and management",
      useCases: ["Cloud infrastructure", "Resource provisioning", "State management"]
    },
    {
      name: "Ansible",
      category: "Configuration Management",
      description: "Automation platform for configuration and orchestration",
      useCases: ["Server configuration", "Application deployment", "Task automation"]
    },
    {
      name: "CloudFormation",
      category: "Infrastructure as Code",
      description: "AWS-native infrastructure provisioning service",
      useCases: ["AWS resources", "Stack management", "Template-based deployment"]
    },
    {
      name: "Pulumi",
      category: "Infrastructure as Code",
      description: "Modern infrastructure as code using familiar programming languages",
      useCases: ["Multi-cloud deployment", "Programmatic infrastructure", "Cloud automation"]
    }
  ]

  const monitoringTools = [
    {
      name: "Prometheus",
      category: "Metrics & Monitoring",
      description: "Open-source monitoring and alerting toolkit",
      useCases: ["Time-series data", "Alerting rules", "Service monitoring"]
    },
    {
      name: "Grafana",
      category: "Visualization",
      description: "Analytics and interactive visualization platform",
      useCases: ["Dashboard creation", "Data visualization", "Alert management"]
    },
    {
      name: "ELK Stack",
      category: "Log Management",
      description: "Elasticsearch, Logstash, and Kibana for log analysis",
      useCases: ["Log aggregation", "Search and analysis", "Visualization"]
    },
    {
      name: "Datadog",
      category: "Full-Stack Monitoring",
      description: "Cloud-scale monitoring and analytics platform",
      useCases: ["APM", "Infrastructure monitoring", "Log management"]
    },
    {
      name: "New Relic",
      category: "APM",
      description: "Application performance monitoring and observability",
      useCases: ["Performance tracking", "Error monitoring", "User analytics"]
    },
    {
      name: "Splunk",
      category: "Log Analytics",
      description: "Platform for searching, monitoring, and analyzing machine data",
      useCases: ["Security monitoring", "Operational intelligence", "Compliance"]
    }
  ]

  const atlassianTools = [
    {
      name: "Jira",
      icon: Package,
      description: "Project management and issue tracking for agile teams",
      capabilities: [
        "Agile boards (Scrum/Kanban)",
        "Sprint planning",
        "Backlog management",
        "Custom workflows",
        "Reporting and analytics",
        "Integration ecosystem"
      ]
    },
    {
      name: "Confluence",
      icon: Package,
      description: "Team collaboration and documentation workspace",
      capabilities: [
        "Knowledge base creation",
        "Team documentation",
        "Meeting notes",
        "Project requirements",
        "Templates and macros",
        "Real-time collaboration"
      ]
    },
    {
      name: "Bitbucket",
      icon: GitBranch,
      description: "Git repository management integrated with Jira",
      capabilities: [
        "Code repository hosting",
        "Pull request workflows",
        "Bitbucket Pipelines CI/CD",
        "Smart commits",
        "Branch permissions",
        "Code review tools"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 border-b border-border/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4 whitespace-nowrap">
              <img src={logo} alt="Dhinoix Logo" className="h-10 w-10 flex-shrink-0" />
              <Button variant="ghost" onClick={onBack} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </div>
            <h1 className="text-xl font-bold text-primary whitespace-nowrap flex-shrink-0">Services</h1>
            <div className="flex items-center gap-2">
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
            </div>
          </div>
        </div>
      </nav>

      <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/10 py-16 sm:py-24 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4" variant="secondary">
              DevOps Solutions
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
              Digital DevOps Solutions
            </h1>
            <p className="text-xl text-muted-foreground">
              Accelerate your software delivery with modern DevOps practices, automation, and cloud-native technologies. 
              We help organizations build robust, scalable, and secure development pipelines.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our DevOps Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive DevOps solutions to streamline your development lifecycle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {devopsServices.map((service, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" weight="duotone" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
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

      <section className="py-16 sm:py-24 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Source Control Management (SCM) Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We work with all major version control platforms to manage your codebase effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {scmTools.map((tool, index) => (
              <Card key={index} className="border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <tool.icon className="w-6 h-6 text-primary" weight="duotone" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{tool.name}</CardTitle>
                        <CardDescription className="text-sm mt-1">{tool.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {tool.capabilities.map((capability, capIndex) => (
                      <div key={capIndex} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span>{capability}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              CI/CD Tools & Platforms
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Automate your build, test, and deployment processes with industry-leading tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cicdTools.map((tool, index) => (
              <Card key={index} className="border-border">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">{tool.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription className="text-sm">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {tool.useCases.map((useCase, ucIndex) => (
                      <div key={ucIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-3 h-3 text-accent flex-shrink-0 mt-1" />
                        <span>{useCase}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Atlassian Suite Integration
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Seamless integration with Atlassian tools for enhanced team collaboration and productivity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {atlassianTools.map((tool, index) => (
              <Card key={index} className="border-border">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <tool.icon className="w-6 h-6 text-primary" weight="duotone" />
                  </div>
                  <CardTitle className="text-xl">{tool.name}</CardTitle>
                  <CardDescription className="text-base">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tool.capabilities.map((capability, capIndex) => (
                      <li key={capIndex} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Container & Orchestration Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Modern containerization and orchestration platforms for scalable applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {containerTools.map((tool, index) => (
              <Card key={index} className="border-border">
                <CardHeader>
                  <Badge variant="outline" className="text-xs mb-2 w-fit">{tool.category}</Badge>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription className="text-sm">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {tool.useCases.map((useCase, ucIndex) => (
                      <div key={ucIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-3 h-3 text-accent flex-shrink-0 mt-1" />
                        <span>{useCase}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Infrastructure as Code (IaC) Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Automate infrastructure provisioning and configuration management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {infrastructureTools.map((tool, index) => (
              <Card key={index} className="border-border">
                <CardHeader>
                  <Badge variant="outline" className="text-xs mb-2 w-fit">{tool.category}</Badge>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription className="text-sm">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {tool.useCases.map((useCase, ucIndex) => (
                      <div key={ucIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-3 h-3 text-accent flex-shrink-0 mt-1" />
                        <span>{useCase}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Monitoring & Observability Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Gain complete visibility into your applications and infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monitoringTools.map((tool, index) => (
              <Card key={index} className="border-border">
                <CardHeader>
                  <Badge variant="outline" className="text-xs mb-2 w-fit">{tool.category}</Badge>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription className="text-sm">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {tool.useCases.map((useCase, ucIndex) => (
                      <div key={ucIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-3 h-3 text-accent flex-shrink-0 mt-1" />
                        <span>{useCase}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your DevOps?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's discuss how we can help modernize your development and deployment processes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={onBack}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={onBack}>
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-background/80">© 2024 Dhinoix IT Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
