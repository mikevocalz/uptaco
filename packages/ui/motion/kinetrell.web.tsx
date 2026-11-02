'use client';
import { useEffect, useRef, type PropsWithChildren } from 'react';
import { Page } from '../html';
import { compileMotion, type MotionDefinition } from 'kinetrell';

/**
 * Client web runner for a shared Kinetrell motion definition.
 * Uses GSAP behind the UI package; never author raw HTML in product screens.
 * Reduced-motion and JS-off states use the authored final appearance.
 */
export function KinetrellSurface({
  definition, children, className
}: PropsWithChildren<{definition: MotionDefinition;className?:string}>) {
  const host = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const node = host.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let disposed = false;
    let cleanup = () => {};
    import('kinetrell/web/gsap').then(({createGsapTimeline}) => {
      if (disposed) return;
      const compiled = compileMotion(definition);
      if (compiled.tracks.length === 0) return;
      const targetName = Object.keys(compiled.initial)[0];
      if (!targetName) return;
      const timeline = createGsapTimeline(compiled, {[targetName]:node});
      timeline.play();
      cleanup = () => timeline.kill();
    }).catch(() => { /* Nonessential motion must never break ordering. */ });
    return () => { disposed=true; cleanup(); };
  },[definition]);
  return <Page className={className} ref={host as never}>{children}</Page>;
}
