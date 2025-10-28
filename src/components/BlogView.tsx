import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { BlogCard } from "./BlogCard"
import { ArrowLeft, MagnifyingGlass, Clock, User, CalendarBlank, ShareNetwork, Moon, Sun } from "@phosphor-icons/react"
import { toast } from "sonner"
import { useTheme } from "@/hooks/use-theme"
import logo from "@/assets/images/logo.jpeg"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  date: string
  readTime: string
  image?: string
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable Microservices with Kubernetes",
    excerpt: "Learn how to design and deploy microservices architecture using Kubernetes for enterprise-scale applications.",
    content: `Microservices architecture has become the de facto standard for building scalable, maintainable applications. In this comprehensive guide, we'll explore how to leverage Kubernetes to orchestrate microservices at scale.

## Why Microservices?

Microservices offer several key advantages:
- **Independent Deployment**: Each service can be deployed independently
- **Technology Diversity**: Use the right tool for each job
- **Scalability**: Scale services individually based on demand
- **Resilience**: Isolated failures don't bring down the entire system

## Kubernetes Fundamentals

Kubernetes provides the orchestration layer needed to manage microservices effectively. Key concepts include:

### Pods and Deployments
Pods are the smallest deployable units in Kubernetes. A Deployment manages a set of identical pods, ensuring the desired number of replicas are always running.

### Services and Ingress
Services provide stable networking endpoints for pods, while Ingress manages external access to services.

### ConfigMaps and Secrets
Externalize configuration and sensitive data from your application code.

## Best Practices

1. **Design for Failure**: Implement circuit breakers and retry logic
2. **Implement Health Checks**: Use liveness and readiness probes
3. **Monitor Everything**: Use tools like Prometheus and Grafana
4. **Automate Deployments**: Implement CI/CD pipelines
5. **Secure by Default**: Use network policies and RBAC

## Real-World Implementation

At Dhinoix IT Solutions, we've helped numerous clients migrate monolithic applications to microservices. One recent project reduced deployment time from hours to minutes while improving system reliability by 300%.

The key is starting small - identify bounded contexts in your application and extract them one at a time. Don't try to rebuild everything at once.

## Conclusion

Kubernetes and microservices are powerful tools, but they add complexity. Make sure the benefits outweigh the operational overhead for your specific use case.`,
    category: "Cloud Architecture",
    author: "Alex Thompson",
    date: "Mar 15, 2024",
    readTime: "8 min read",
    image: "gradient"
  },
  {
    id: "2",
    title: "The Future of AI in Enterprise Software Development",
    excerpt: "Exploring how artificial intelligence is transforming the software development lifecycle and what it means for businesses.",
    content: `Artificial Intelligence is revolutionizing how we build software. From code generation to automated testing, AI is becoming an indispensable tool in the developer's toolkit.

## AI-Powered Development Tools

Modern AI tools are changing the development workflow:
- **Code Completion**: Tools like GitHub Copilot suggest entire functions
- **Bug Detection**: AI can identify potential bugs before they reach production
- **Code Review**: Automated analysis of code quality and security
- **Documentation**: Auto-generated documentation from code

## Impact on Software Quality

AI doesn't replace developers - it amplifies their capabilities. By handling routine tasks, developers can focus on solving complex business problems and architectural decisions.

### Testing and Quality Assurance

AI-powered testing tools can:
- Generate test cases automatically
- Identify edge cases humans might miss
- Predict which code changes are most likely to introduce bugs
- Optimize test suite execution

## Business Implications

For enterprises, AI in software development means:
1. **Faster Time to Market**: Reduced development cycles
2. **Higher Quality**: Fewer bugs and security vulnerabilities
3. **Lower Costs**: More efficient use of developer time
4. **Competitive Advantage**: Ability to iterate and innovate faster

## Challenges and Considerations

While AI is powerful, it's not without challenges:
- **Data Privacy**: Ensuring code and data remain secure
- **Quality Control**: AI-generated code still needs human review
- **Technical Debt**: Risk of accumulating poorly understood code
- **Skill Development**: Developers still need to understand fundamentals

## Looking Ahead

The future of AI in software development is bright. We're moving toward a world where developers work alongside AI assistants that understand context, business requirements, and best practices.

At Dhinoix IT Solutions, we're already integrating AI tools into our development process, resulting in 40% faster delivery times while maintaining our high quality standards.`,
    category: "AI & Machine Learning",
    author: "Jordan Kim",
    date: "Mar 12, 2024",
    readTime: "10 min read",
    image: "gradient"
  },
  {
    id: "3",
    title: "Security Best Practices for Modern Web Applications",
    excerpt: "A comprehensive guide to securing your web applications against common vulnerabilities and emerging threats.",
    content: `Security is not an afterthought - it should be built into every layer of your application from day one. This guide covers essential security practices for modern web applications.

## The OWASP Top 10

Understanding the most common vulnerabilities is the first step:
1. Broken Access Control
2. Cryptographic Failures
3. Injection
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable Components
7. Authentication Failures
8. Software and Data Integrity Failures
9. Security Logging and Monitoring Failures
10. Server-Side Request Forgery

## Defense in Depth

Security should be layered:
- **Network Level**: Firewalls, VPNs, and network segmentation
- **Application Level**: Input validation, output encoding, authentication
- **Data Level**: Encryption at rest and in transit
- **Physical Level**: Secure data centers and access controls

## Authentication and Authorization

Implement robust authentication:
- Use OAuth 2.0 or OpenID Connect for authentication
- Implement Multi-Factor Authentication (MFA)
- Use secure password hashing (bcrypt, Argon2)
- Implement proper session management
- Follow the principle of least privilege for authorization

## API Security

Secure your APIs:
- Use HTTPS everywhere
- Implement rate limiting
- Validate and sanitize all inputs
- Use API keys and tokens securely
- Implement proper CORS policies

## Monitoring and Incident Response

Be prepared for security incidents:
- Implement comprehensive logging
- Set up alerting for suspicious activities
- Have an incident response plan
- Conduct regular security audits
- Keep all dependencies updated

## Case Study: Enterprise Security Transformation

We recently helped a financial services client implement a comprehensive security overhaul:
- Reduced security vulnerabilities by 95%
- Achieved SOC 2 Type II compliance
- Implemented zero-trust architecture
- Deployed automated security scanning in CI/CD

## Conclusion

Security is an ongoing process, not a one-time effort. Stay informed about emerging threats and continuously improve your security posture.`,
    category: "Security",
    author: "Sam Rivera",
    date: "Mar 8, 2024",
    readTime: "12 min read",
    image: "gradient"
  },
  {
    id: "4",
    title: "React Server Components: A Game Changer for Web Performance",
    excerpt: "Deep dive into React Server Components and how they're revolutionizing frontend development and user experience.",
    content: `React Server Components represent a paradigm shift in how we build React applications. They enable server-side rendering with zero client-side JavaScript, dramatically improving performance.

## What Are Server Components?

Server Components are React components that run exclusively on the server. Unlike traditional SSR, they:
- Don't ship JavaScript to the client
- Can directly access backend resources
- Automatically code-split
- Reduce bundle size significantly

## Performance Benefits

The performance improvements are substantial:
- **Faster Initial Load**: Less JavaScript to download and parse
- **Improved Time to Interactive**: Page becomes interactive faster
- **Better SEO**: Content is rendered server-side
- **Reduced Bandwidth**: Smaller payloads

## When to Use Server Components

Server Components are ideal for:
- Content-heavy pages
- Data fetching from databases
- Pages with minimal interactivity
- SEO-critical content

## Client Components Still Matter

Client Components remain essential for:
- Interactive UI elements
- Event handlers
- Browser APIs
- State management

## Best Practices

1. **Start with Server Components by Default**: Only use Client Components when needed
2. **Compose Thoughtfully**: Server Components can render Client Components
3. **Optimize Data Fetching**: Fetch close to where data is used
4. **Use Streaming**: Stream content as it becomes available

## Real-World Results

We migrated a content platform to Server Components:
- 60% reduction in bundle size
- 40% faster Time to Interactive
- 50% improvement in Lighthouse scores

## The Future of React

Server Components are just the beginning. React is evolving toward a world where the server-client boundary is seamless and automatic.

## Getting Started

Start experimenting with Server Components in Next.js 13+ or other compatible frameworks. The learning curve is worth the performance gains.`,
    category: "Frontend Development",
    author: "Alex Thompson",
    date: "Mar 5, 2024",
    readTime: "9 min read",
    image: "gradient"
  },
  {
    id: "5",
    title: "Database Optimization Strategies for High-Traffic Applications",
    excerpt: "Learn how to optimize database performance to handle millions of requests efficiently.",
    content: `Database performance can make or break high-traffic applications. This guide covers proven strategies to optimize your database for scale.

## Indexing Strategies

Proper indexing is crucial:
- **Understand Query Patterns**: Index columns used in WHERE, JOIN, and ORDER BY
- **Composite Indexes**: Optimize multi-column queries
- **Avoid Over-Indexing**: Each index has a write cost
- **Monitor Index Usage**: Remove unused indexes

## Query Optimization

Write efficient queries:
- Use EXPLAIN to analyze query plans
- Avoid SELECT * - specify needed columns
- Minimize subqueries and nested joins
- Use pagination for large result sets
- Implement query caching

## Caching Layers

Reduce database load:
- **Application-Level Cache**: Redis or Memcached
- **Query Result Cache**: Cache frequently accessed data
- **CDN**: For static and edge-cacheable content
- **Database Query Cache**: Built-in database caching

## Connection Pooling

Manage database connections efficiently:
- Use connection pools to reuse connections
- Right-size pool based on workload
- Implement connection timeouts
- Monitor connection usage

## Sharding and Partitioning

Scale horizontally:
- **Horizontal Partitioning**: Split tables by rows
- **Vertical Partitioning**: Split tables by columns
- **Sharding**: Distribute data across multiple databases
- **Consider Trade-offs**: Complexity vs performance

## Replication

Distribute read load:
- Primary-Replica setup for read scaling
- Read replicas for analytics
- Geographic distribution for global apps
- Handle replication lag appropriately

## Case Study: E-commerce Platform

We optimized a high-traffic e-commerce database:
- Reduced query time from 2s to 50ms
- Handled 10x traffic increase
- Improved checkout conversion by 25%
- Reduced infrastructure costs by 40%

## Monitoring and Maintenance

Continuous optimization:
- Monitor slow queries
- Regular VACUUM and ANALYZE
- Track database metrics
- Plan for growth

## Conclusion

Database optimization is an ongoing process. Start with the basics, measure everything, and optimize based on actual usage patterns.`,
    category: "Backend Development",
    author: "Jordan Kim",
    date: "Mar 1, 2024",
    readTime: "11 min read",
    image: "gradient"
  },
  {
    id: "6",
    title: "DevOps Culture: Breaking Down Silos for Faster Delivery",
    excerpt: "Transform your organization with DevOps practices that improve collaboration and accelerate software delivery.",
    content: `DevOps is more than tools - it's a cultural transformation that brings development and operations together to deliver software faster and more reliably.

## The DevOps Mindset

Core principles:
- **Collaboration**: Break down silos between teams
- **Automation**: Automate repetitive tasks
- **Continuous Improvement**: Always iterate and optimize
- **Shared Responsibility**: Everyone owns quality and reliability

## CI/CD Pipelines

Automate your delivery:
- Automated testing on every commit
- Continuous integration of code changes
- Automated deployment to environments
- Rollback capabilities
- Blue-green deployments

## Infrastructure as Code

Manage infrastructure programmatically:
- Version control for infrastructure
- Reproducible environments
- Disaster recovery simplification
- Tools: Terraform, CloudFormation, Ansible

## Monitoring and Observability

Know what's happening:
- **Metrics**: Track system health
- **Logs**: Centralized logging
- **Traces**: Distributed tracing
- **Alerts**: Proactive issue detection

## Incident Management

Handle issues effectively:
- Blameless post-mortems
- Clear escalation paths
- Runbooks for common issues
- Continuous learning from incidents

## Cultural Transformation

Change starts with people:
- Encourage experimentation
- Celebrate learning from failures
- Share knowledge across teams
- Break down organizational barriers

## Real-World Impact

A client's DevOps transformation:
- Deployment frequency: Monthly → Multiple times daily
- Change failure rate: 25% → 5%
- Mean time to recovery: 4 hours → 15 minutes
- Lead time: 3 weeks → 2 days

## Getting Started

Start small:
1. Automate your build process
2. Implement automated testing
3. Set up continuous integration
4. Gradually add deployment automation
5. Foster collaboration culture

## Conclusion

DevOps is a journey, not a destination. Start with small wins and build momentum for larger cultural changes.`,
    category: "DevOps",
    author: "Sam Rivera",
    date: "Feb 26, 2024",
    readTime: "10 min read",
    image: "gradient"
  }
]

const categories = ["All", "Cloud Architecture", "AI & Machine Learning", "Security", "Frontend Development", "Backend Development", "DevOps"]

interface BlogViewProps {
  onBack: () => void
}

export function BlogView({ onBack }: BlogViewProps) {
  const { theme, toggleTheme } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleShare = () => {
    toast.success("Link copied to clipboard!")
  }

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 border-b border-border/40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <img src={logo} alt="Dhinoix Logo" className="h-10 w-10" />
                <Button variant="ghost" onClick={() => setSelectedPost(null)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </div>
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
                <Button variant="outline" onClick={() => onBack()}>
                  Home
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">{selectedPost.category}</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              {selectedPost.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{selectedPost.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarBlank className="w-5 h-5" />
                <span>{selectedPost.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{selectedPost.readTime}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <ShareNetwork className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {selectedPost.image && (
            <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30" />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            {selectedPost.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-semibold text-foreground mt-8 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                )
              } else if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-semibold text-foreground mt-6 mb-3">
                    {paragraph.replace('### ', '')}
                  </h3>
                )
              } else if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').filter(line => line.startsWith('- '))
                return (
                  <ul key={index} className="list-disc pl-6 space-y-2 my-4">
                    {items.map((item, i) => (
                      <li key={i} className="text-muted-foreground">
                        {item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').split('<strong>').map((part, j) => {
                          if (j % 2 === 1) return <strong key={j} className="text-foreground font-semibold">{part}</strong>
                          return part
                        })}
                      </li>
                    ))}
                  </ul>
                )
              } else if (/^\d+\./.test(paragraph)) {
                const items = paragraph.split('\n').filter(line => /^\d+\./.test(line))
                return (
                  <ol key={index} className="list-decimal pl-6 space-y-2 my-4">
                    {items.map((item, i) => (
                      <li key={i} className="text-muted-foreground">
                        {item.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').split('<strong>').map((part, j) => {
                          if (j % 2 === 1) return <strong key={j} className="text-foreground font-semibold">{part}</strong>
                          return part
                        })}
                      </li>
                    ))}
                  </ol>
                )
              } else {
                return (
                  <p key={index} className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {paragraph}
                  </p>
                )
              }
            })}
          </div>

          <Separator className="my-12" />

          <Card className="bg-secondary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold text-primary">
                    {selectedPost.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{selectedPost.author}</h3>
                  <p className="text-sm text-muted-foreground">Senior Software Engineer at Dhinoix IT Solutions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </article>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 border-b border-border/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Dhinoix Logo" className="h-10 w-10" />
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <h1 className="text-xl font-bold text-primary">Dhinoix Blog</h1>
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

      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/10 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Technical Insights & Best Practices
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert articles on software development, cloud architecture, security, and emerging technologies
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            <div className="relative flex-1">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  {...post}
                  onClick={() => setSelectedPost(post)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-8">
            Get the latest insights delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email" type="email" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
