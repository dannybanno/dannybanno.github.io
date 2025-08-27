import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from "react-router-dom";

interface BlogCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

const BlogCard = ({ id, title, description, category, date, readTime, tags, featured }: BlogCardProps) => {
  return (
    <Link to={`/post/${id}`}>
      <Card className={`minimal-card bg-card border-border transition hover:border-red-500 ${featured ? 'border-red-500' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs font-mono uppercase">
              {category}
            </Badge>
            <span className="text-xs text-muted-foreground font-mono">
              {date}
            </span>
          </div>
          <CardTitle className="font-mono text-lg text-foreground leading-tight">
            {title}
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="text-xs text-muted-foreground font-mono">
                {tag}
              </span>
            ))}
            <span className="text-xs text-muted-foreground font-mono">
              • {readTime}
            </span>
          </div>
          <span className="text-red-500 font-semibold mt-3 block">
            Read More →
          </span>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
