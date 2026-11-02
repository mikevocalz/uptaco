/**
 * Moyo Learn's five-band window policy adapted to Uptaco.
 * The web shell NEVER switches to a right-side navigation rail.
 * Pane visibility is content-only; hardware family governs native nav.
 */
export type SizeClass = 'compact' | 'medium' | 'expanded' | 'large' | 'extraLarge';
export const CLASS_MIN = {
  compact: 0,
  medium: 600,
  expanded: 840,
  large: 1200,
  extraLarge: 1600
} as const;
export function sizeClassForWidth(width: number): SizeClass {
  if (!Number.isFinite(width) || width < 0) return 'compact';
  if (width >= CLASS_MIN.extraLarge) return 'extraLarge';
  if (width >= CLASS_MIN.large) return 'large';
  if (width >= CLASS_MIN.expanded) return 'expanded';
  if (width >= CLASS_MIN.medium) return 'medium';
  return 'compact';
}
export type PaneIntent = 'browse' | 'customize' | 'checkout';
export function orderPanePolicy(width: number): { master: boolean; detail: boolean; inspector: boolean } {
  const s = sizeClassForWidth(width);
  switch (s) {
    case 'compact': return {master:false, detail:true, inspector:false};
    case 'medium': return {master:true, detail:true, inspector:false};
    case 'expanded': return {master:true, detail:true, inspector:false};
    case 'large':
    case 'extraLarge':return {master:true,detail:true,inspector:true};
  }
}
