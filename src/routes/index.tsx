import { createFileRoute } from "@tanstack/react-router";
import { PremiumHome } from "./premium";
import { buildMeta } from "@/config/seo";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () =>
    buildMeta({
      title: `${SITE.name} — ${SITE.tagline}`,
      description: SITE.description,
      path: "/",
      suffix: false,
    }),
  component: PremiumHome,
});
