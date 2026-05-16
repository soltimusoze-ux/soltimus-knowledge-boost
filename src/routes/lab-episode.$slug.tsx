import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Phone,
  BookOpen,
  FileText,
} from "lucide-react";
import { findLabVideo } from "@/lib/lab-videos";
import { seriesBySlug } from "@/lib/video-series";
import { KnowledgeNav } from "@/components/knowledge/KnowledgeNav";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/lab-episode/$slug")({
  head: ({ params }) => {
    const v = findLabVideo(params.slug);
    return {
      meta: [
        {
          title: v
            ? `${v.title} — Soltimus Lab · Engineering TV`
            : "Soltimus Lab",
        },
        {
          name: "description",
          content:
            v?.description ??
            "Soltimus Lab — inżynierska platforma wideo o pompach ciepła i OZE.",
        },
        {
          property: "og:title",
          content: v ? `${v.title} — Soltimus Lab` : "Soltimus Lab",
        },
        {
          property: "og:description",
          content: v?.description ?? "",
        },
      ],
    };
  },
  component: LabEpisodePage,
});

function LabEpisodePage() {
  const { slug } = Route.useParams();
  const video = findLabVideo(slug);
  const series = video ? seriesBySlug(video.series) : null;

  if (!video || !series) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white">
        <KnowledgeNav trail={[{ label: "Soltimus Lab", to: "/lab" }]} />
        <div className="mx-auto max-w-4xl px-5 py-32 text-center">
          <h1 className="text-2xl font-semibold">
            Materiał nie został znaleziony
          </h1>
          <Link
            to="/lab"
            className="mt-6 inline-block text-sm text-[#F5B800] hover:underline"
          >
            Wróć do Soltimus Lab
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[#0A0A0A] text-white">
      <KnowledgeNav
        trail={[
          { label: "Knowledge Hub", to: "/wiedza" },
          { label: "Soltimus Lab", to: "/lab" },
          { label: video.shortTitle || video.title },
        ]}
      />

      {/* Coming soon banner */}
      {video.status === "coming-soon" && (
        <div className="border-b border-[#F5B800]/20 bg-[#F5B800]/10">
          <div className="mx-auto flex max-w-4xl items-center justify-center gap-2 px-5 py-3 md:px-8">
            <Clock className="h-3.5 w-3.5 text-[#F5B800]" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#F5B800]">
              Materiał w produkcji · Premiera wkrótce
            </span>
          </div>
        </div>
      )}

      {/* Cinematic hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0E1115] to-[#0A0A0A]" />
          {/* Hydraulic schematic accent lines */}
          <div className="absolute left-0 top-1/4 h-px w-1/3 bg-gradient-to-r from-transparent via-[#0089CF]/20 to-transparent" />
          <div className="absolute right-0 top-1/2 h-px w-1/4 bg-gradient-to-l from-transparent via-[#F5B800]/15 to-transparent" />
          <div className="absolute bottom-1/3 left-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-[#0089CF]/10 to-transparent" />
          {/* Subtle Daikin blue glow */}
          <div className="absolute -left-32 top-1/3 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(0,137,207,0.1),transparent_70%)]" />
          {/* Warm Soltimus glow */}
          <div className="absolute -right-20 top-1/4 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(245,184,0,0.08),transparent_70%)]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Series badge */}
            <div
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em]"
              style={{ color: series.accent }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: series.accent }}
              />
              {series.kicker} · {series.name}
            </div>

            <h1 className="mt-6 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-tight">
              {video.title}
            </h1>

            <p className="mt-6 text-base leading-relaxed text-white/60 md:text-lg">
              {video.description}
            </p>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {video.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] uppercase tracking-wider text-white/55"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Short title / angle */}
            {video.shortTitle && (
              <div className="mt-10 border-l-2 border-[#F5B800]/40 bg-gradient-to-r from-[#F5B800]/5 to-transparent py-4 pl-6">
                <p className="text-sm font-medium italic text-white/80 md:text-base">
                  {video.shortTitle}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content body */}
      <div className="mx-auto max-w-4xl px-5 pb-32 md:px-8">
        {/* Duration / meta strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-2 flex flex-wrap items-center gap-6 border-b border-white/8 pb-8 text-[11px] uppercase tracking-[0.22em] text-white/40"
        >
          {video.duration && (
            <span className="inline-flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              {video.duration}
            </span>
          )}
          <span>{series.name}</span>
          <span>
            {new Date(video.publishedAt).toLocaleDateString("pl-PL")}
          </span>
        </motion.div>

        {/* FAQ */}
        {video.faqs && video.faqs.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                Najczęstsze pytania
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </div>
            <Accordion type="single" collapsible className="mt-8 space-y-3">
              {video.faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-xl border border-white/8 bg-white/[0.02] px-5 data-[state=open]:border-[#0089CF]/30"
                >
                  <AccordionTrigger className="py-4 text-left text-sm font-medium text-white/90 hover:no-underline md:text-base">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-white/65">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.section>
        )}

        {/* Related articles */}
        {video.relatedArticles && video.relatedArticles.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                Powiązane artykuły
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {video.relatedArticles.map((a, i) => (
                <Link
                  key={i}
                  to={a.href}
                  className="group flex items-start gap-4 rounded-xl border border-white/8 bg-white/[0.02] p-5 transition-all hover:border-[#F5B800]/30 hover:bg-white/[0.04]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5B800]/10 text-[#F5B800]">
                    <BookOpen className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white/90 group-hover:text-white">
                      {a.label}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-white/40">
                      Strefa Wiedzy
                    </p>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-white/25 transition-all group-hover:translate-x-1 group-hover:text-white/70" />
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* Case study */}
        {video.caseStudies && video.caseStudies.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                Case study
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </div>
            {video.caseStudies.map((cs, i) => (
              <div
                key={i}
                className="mt-8 overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-[#0E1115] to-[#0A0A0A] p-6 md:p-8"
              >
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#0089CF]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0089CF]" />
                  Realizacja · Case Study
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight md:text-2xl">
                  {cs.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  Szczegółowa analiza przed/po modernizacji instalacji grzewczej.
                  Dane z pierwszego sezonu grzewczego po wdrożeniu.
                </p>
                <Link
                  to={cs.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#0089CF] transition-colors hover:text-[#F5B800]"
                >
                  <FileText className="h-4 w-4" />
                  Zobacz pełny raport
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </motion.section>
        )}

        {/* CTA */}
        {video.cta && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                Następny krok
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#111318] to-[#0A0A0A] p-8 md:p-10">
              <div className="max-w-2xl">
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                  {video.cta.text}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55 md:text-base">
                  {video.ctaDescription ??
                    "Skontaktuj się z zespołem inżynierskim Soltimus i omów swój projekt."}
                </p>
                <Link
                  to={video.cta.href}
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all hover:bg-[#F5B800]"
                >
                  <Phone className="h-4 w-4" />
                  {video.cta.text}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.section>
        )}

        {/* Back to Lab */}
        <div className="mt-16 text-center">
          <Link
            to="/lab"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/40 transition-colors hover:text-white"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-180" />
            Wróć do Soltimus Lab
          </Link>
        </div>
      </div>
    </article>
  );
}
