'use client';
import { useEffect, useId, type PropsWithChildren } from 'react';
import { Page } from '../html';
import { compileMotion, type MotionDefinition } from 'kinetrell';

/** Motion-only web adapter. Use the semantic UI Page; look up its stable React
 * id inside this UI adapter because the semantic css() HOC doesn't promise a
 * forwarded DOM ref. Critical SSR content must start fully visible.
 */
export function KinetrellSurface({
  definition, children, className
}: PropsWithChildren<{definition: MotionDefinition;className?:string}>) {
  const domId = useId();
  useEffect(() => {
    const node = document.getElementById(domId);
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let disposed=false;
    let cleanup=()=>{};
    import('kinetrell/web/gsap').then(({createGsapTimeline}) => {
      if(disposed) return;
      const compiled=compileMotion(definition);
      const target=Object.keys(compiled.initial)[0];
      if(!target || compiled.tracks.length===0) return;
      const timeline=createGsapTimeline(compiled,{[target]:node});
      timeline.play();
      cleanup=()=>timeline.kill();
    }).catch(()=>{/* Optional motion can never block the site. */});
    return ()=>{disposed=true;cleanup();};
  },[definition,domId]);
  return <Page id={domId} className={className}>{children}</Page>;
}
