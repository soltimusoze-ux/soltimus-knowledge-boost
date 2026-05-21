import { getAuthor } from "@/content/authors";
import type { Article } from "@/content/articles";

export function ArticleAuthorBox({ article }: { article: Article }) {
  const author = getAuthor(article.authorId);
  return (
    <aside className="not-prose mt-16 flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-6 md:flex-row md:items-start md:gap-6 md:p-8">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold uppercase text-white">
        {author.avatar ? (
          <img
            src={author.avatar}
            alt={author.name}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          author.name
            .split(" ")
            .map((p) => p[0])
            .join("")
            .slice(0, 2)
        )}
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.28em] text-black/50">
          {author.role}
        </div>
        <div className="mt-1 text-lg font-semibold tracking-tight">
          {author.name}
        </div>
        {author.credentials && (
          <div className="mt-1 text-xs uppercase tracking-wider text-[#0089CF]">
            {author.credentials}
          </div>
        )}
        <p className="mt-3 text-sm leading-relaxed text-black/65">
          {author.bio}
        </p>
      </div>
    </aside>
  );
}
