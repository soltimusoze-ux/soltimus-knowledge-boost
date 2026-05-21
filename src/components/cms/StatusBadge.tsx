import { Badge } from "@/components/ui/badge";
import { STATUS_LABEL, type ContentStatus } from "@/lib/cms";

const styles: Record<ContentStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  scheduled: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  published: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  archived: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
};

export function StatusBadge({ status }: { status: ContentStatus }) {
  return (
    <Badge variant="outline" className={`border-transparent text-[11px] ${styles[status]}`}>
      {STATUS_LABEL[status]}
    </Badge>
  );
}
