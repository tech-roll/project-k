import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User } from "@phosphor-icons/react"

interface BlogCardProps {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  image?: string
  onClick: () => void
}

export function BlogCard({ 
  title, 
  excerpt, 
  category, 
  author, 
  date, 
  readTime,
  image,
  onClick 
}: BlogCardProps) {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
      onClick={onClick}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 group-hover:opacity-80 transition-opacity" />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur">
              {category}
            </Badge>
          </div>
        </div>
      )}
      <CardHeader>
        {!image && (
          <Badge variant="secondary" className="w-fit mb-2">
            {category}
          </Badge>
        )}
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-base line-clamp-2">
          {excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{readTime}</span>
          </div>
          <span className="ml-auto">{date}</span>
        </div>
      </CardContent>
    </Card>
  )
}
