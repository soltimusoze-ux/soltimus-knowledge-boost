import { createFileRoute, Outlet } from "@tanstack/react-router";
import { CmsSidebarNav } from "@/components/cms/EditorShell";

export const Route = createFileRoute("/_authenticated/admin/editorial")({
  component: EditorialLayout,
});

function EditorialLayout() {
  return (
    <div className="space-y-6">
      <CmsSidebarNav />
      <Outlet />
    </div>
  );
}
