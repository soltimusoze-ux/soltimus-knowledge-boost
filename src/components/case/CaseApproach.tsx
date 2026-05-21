export function CaseApproach({ paragraphs }: { paragraphs: string[] }) {
  if (!paragraphs?.length) return null;
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Podejście inżynierskie
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Jak myśleliśmy o tym projekcie.
        </h2>
        <div className="editorial mt-10 space-y-6">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
