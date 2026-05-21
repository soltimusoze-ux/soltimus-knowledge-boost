import { Calendar, Clock, User } from "lucide-react";
import type { Article } from "@/content/articles";
import { getAuthor } from "@/content/authors";

/**
 * Compact metadata strip — used on standalone routes (lab, related),
 * not the hero. Pure semantic <time> + author for AI/SEO surfaces.
 */
export function ArticleMeta({ article }: { article: Article }) {
  const author = getAuthor(article.authorId);
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-black/60">
      <span className="inline-flex items-center gap-1.5">
        <User className="h-3.5 w-3.5" />
        {author.name}
      </span>
      <time
        dateTime={article.publishedAt}
        className="inline-flex items-center gap-1.5"
      >
        <Calendar className="h-3.5 w-3.5" />
        {new Date(article.publishedAt).toLocaleDateString("pl-PL")}
      </time>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" />
        {article.readingTime} min
      </span>
    </div>
  );
}
