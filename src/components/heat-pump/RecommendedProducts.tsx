import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  DAIKIN_CATALOG,
  type DaikinProduct,
} from "@/lib/heat-pump-calc";

const STORAGE_KEY = "soltimus.recommendedProductId";

export function saveRecommendedProduct(productId: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, productId);
    window.dispatchEvent(new CustomEvent("soltimus:recommendation-updated"));
  } catch {
    /* ignore */
  }
}

function loadRecommendedProduct(): DaikinProduct | null {
  if (typeof window === "undefined") return null;
  try {
    const id = window.localStorage.getItem(STORAGE_KEY);
    if (!id) return null;
    return DAIKIN_CATALOG.find((p) => p.id === id) ?? null;
  } catch {
    return null;
  }
}

/**
 * Sticky strip rendered globally on Daikin/heat-pump pages.
 * Only shows when the visitor has used the calculator (localStorage flag set).
 */
export function RecommendedProductsStrip() {
  const [product, setProduct] = useState<DaikinProduct | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setProduct(loadRecommendedProduct());
    const handler = () => setProduct(loadRecommendedProduct());
    window.addEventListener("soltimus:recommendation-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("soltimus:recommendation-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  if (!product || dismissed) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 backdrop-blur-xl shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.15)]">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-8">
        <div className="hidden h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100 sm:block">
          <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
        </div>
        <div className="flex flex-1 items-center gap-3 min-w-0">
          <Sparkles className="h-4 w-4 flex-shrink-0 text-[#F5B800]" />
          <div className="min-w-0">
            <div className="truncate text-xs text-black/60">Twój dobór z kalkulatora</div>
            <div className="truncate text-sm font-semibold text-black">{product.name}</div>
          </div>
          <div className="hidden text-right text-sm md:block">
            <div className="text-xs text-black/60">od</div>
            <div className="font-semibold text-black">
              {product.priceMin.toLocaleString("pl-PL")} zł
            </div>
          </div>
        </div>
        <Link
          to="/kalkulator-pompy-ciepla"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#F5B800] px-4 py-2 text-xs font-semibold text-black hover:scale-[1.03] transition-transform"
        >
          Szczegóły <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <button
          type="button"
          aria-label="Ukryj"
          onClick={() => setDismissed(true)}
          className="text-black/40 hover:text-black text-xl leading-none px-1"
        >
          ×
        </button>
      </div>
    </div>
  );
}
