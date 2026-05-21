import { createFileRoute } from "@tanstack/react-router";
import { ContentEditor } from "@/components/cms/ContentEditor";

export const Route = createFileRoute("/_authenticated/admin/editorial/articles/$id")({
  component: () => {
    const { id } = Route.useParams();
    return <ContentEditor kind="article" id={id} />;
  },
});
