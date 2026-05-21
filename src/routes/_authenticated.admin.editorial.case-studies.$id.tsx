import { createFileRoute } from "@tanstack/react-router";
import { ContentEditor } from "@/components/cms/ContentEditor";

export const Route = createFileRoute("/_authenticated/admin/editorial/case-studies/$id")({
  component: () => {
    const { id } = Route.useParams();
    return <ContentEditor kind="case_study" id={id} />;
  },
});
