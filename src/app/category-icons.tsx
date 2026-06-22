import type { ComponentType, SVGProps } from "react";
import {
  Dumbbell,
  Flower2,
  Activity,
  Swords,
  Zap,
  Bath,
  Hand,
  Bone,
  Sparkles,
} from "lucide-react";

type IconProps = SVGProps<SVGSVGElement>;

/* ────────────────────────────────────────────────────────────────
 * CATEGORY ICONS  —  REPLACE THESE WITH YOUR OWN SVGs
 *
 * The array order MUST match `categories.items` in src/app/i18n.tsx:
 *   0 Gyms / Gimnasios        5 Recovery
 *   1 Yoga                    6 Massage / Masajes
 *   2 Pilates                 7 Physiotherapy / Fisioterapia
 *   3 Boxing / Boxeo          8 Wellness
 *   4 Functional / Funcional
 *
 * Each entry is a component that receives sizing/color props (className,
 * strokeWidth, etc.) from the grid in App.tsx. The lucide icons below are
 * TEMPORARY placeholders.
 *
 * To use your own SVG, replace a line like:
 *     (props) => <Dumbbell {...props} />,        // 0 · Gyms
 * with your inline SVG, KEEPING {...props} on the root <svg>:
 *     (props) => (
 *       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
 *         <path d="…your path…" />
 *       </svg>
 *     ),                                          // 0 · Gyms
 *
 * Notes for clean rendering inside the grid:
 *   • Keep {...props} on the root <svg> (it carries className + strokeWidth).
 *   • Use stroke="currentColor" / fill="currentColor" so it inherits color.
 *   • Don't hard-code width/height — the grid sets size via className.
 * ──────────────────────────────────────────────────────────────── */
export const CATEGORY_ICONS: ComponentType<IconProps>[] = [
  (props) => <Dumbbell {...props} />,   // 0 · Gyms / Gimnasios
  (props) => <Flower2 {...props} />,    // 1 · Yoga
  (props) => <Activity {...props} />,   // 2 · Pilates
  (props) => <Swords {...props} />,     // 3 · Boxing / Boxeo
  (props) => <Zap {...props} />,        // 4 · Functional / Funcional
  (props) => <Bath {...props} />,       // 5 · Recovery
  (props) => <Hand {...props} />,       // 6 · Massage / Masajes
  (props) => <Bone {...props} />,       // 7 · Physiotherapy / Fisioterapia
  (props) => <Sparkles {...props} />,   // 8 · Wellness
];
