import { Check, Minus } from "lucide-react";
import type { ServiceComparison } from "@/content/services/types";

export function ComparisonSection({ comparison }: { comparison?: ServiceComparison }) {
  if (!comparison?.rows?.length) return null;
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Porównanie
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Standard branżowy vs standard Soltimus.
        </h2>
        {comparison.intro && (
          <p className="mt-4 max-w-2xl text-base text-black/60">
            {comparison.intro}
          </p>
        )}

        <div className="mt-10 overflow-hidden rounded-2xl border border-black/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAFAF7] text-[10px] uppercase tracking-[0.2em] text-black/50">
              <tr>
                <th className="px-5 py-4 font-medium">Element</th>
                <th className="px-5 py-4 font-medium">Standard branżowy</th>
                <th className="px-5 py-4 font-medium text-black">Standard Soltimus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {comparison.rows.map((r) => (
                <tr key={r.metric} className="align-top">
                  <td className="px-5 py-5 font-medium text-black">
                    {r.metric}
                  </td>
                  <td className="px-5 py-5 text-black/60">
                    <div className="flex items-start gap-2">
                      <Minus className="mt-1 h-4 w-4 flex-shrink-0 text-black/30" />
                      <span>{r.typical}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-black">
                    <div className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[#F5B800]" />
                      <span>{r.ours}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
