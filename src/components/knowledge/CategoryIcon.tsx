import {
  Thermometer,
  Sun,
  Battery,
  Banknote,
  Wrench,
  HelpCircle,
  GitCompare,
  Building2,
  FlaskConical,
} from "lucide-react";
import type { KnowledgeCategory } from "@/lib/knowledge-categories";

const MAP = {
  thermometer: Thermometer,
  sun: Sun,
  battery: Battery,
  banknote: Banknote,
  wrench: Wrench,
  help: HelpCircle,
  compare: GitCompare,
  building: Building2,
  flask: FlaskConical,
} as const;

export function CategoryIcon({
  iconKey,
  className,
}: {
  iconKey: KnowledgeCategory["iconKey"];
  className?: string;
}) {
  const Icon = MAP[iconKey];
  return <Icon className={className} />;
}
