import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/oferta")({
  component: OfertaLayout,
});

function OfertaLayout() {
  return <Outlet />;
}
