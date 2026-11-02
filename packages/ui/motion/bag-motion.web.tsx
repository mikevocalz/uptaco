'use client';
import { useEffect, useRef } from 'react';
import { compileMotion } from 'kinetrell';
import { bagFlightDefinition, bagRowExitMotion } from './bag-definitions';
import type { BagVisualEvent, MotionRect } from './bag-types';
export type {BagVisualEvent,MotionRect} from './bag-types';
export {bagButtonPulse} from './bag-definitions';

/** Stage a non-interactive visual copy before the actual row is removed.
 * No keyboard or screen reader shadow exists: the clone is inert + aria-hidden.
 */
export function captureBagRemoval(id:string):MotionRect|undefined{
  const origin=captureBagMotionOrigin(id);
  if(!origin||typeof document==='undefined')return origin;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return origin;
  const source=document.getElementById(id);
  if(!source)return origin;
  const ghost=source.cloneNode(true) as HTMLElement;
  ghost.removeAttribute('id');
  ghost.querySelectorAll('[id]').forEach(node=>node.removeAttribute('id'));
  ghost.setAttribute('inert','');
  ghost.setAttribute('aria-hidden','true');
  ghost.classList.add('uptaco-bag-row-ghost');
  Object.assign(ghost.style,{
    left:`${origin.x}px`,top:`${origin.y}px`,
    width:`${origin.width}px`,height:`${origin.height}px`
  });
  document.body.appendChild(ghost);
  import('kinetrell/web/gsap').then(({createGsapTimeline})=>{
    if(!ghost.isConnected)return;
    const plan=compileMotion(bagRowExitMotion);
    const timeline=createGsapTimeline(plan,{row:ghost},{paused:true});
    timeline.eventCallback('onComplete',()=>{timeline.kill();ghost.remove();});
    timeline.play();
  }).catch(()=>ghost.remove());
  // The row ghost expires even if a tab was backgrounded mid-animation.
  const onVisibility=()=>{if(document.hidden){ghost.remove();document.removeEventListener('visibilitychange',onVisibility);}};
  document.addEventListener('visibilitychange',onVisibility,{once:true});
  return origin;
}


/** DOM measurement and visual clones are confined to this web-only UI adapter.
 * Feature screens never create DOM nodes or run direct GSAP timelines.
 */
export function captureBagMotionOrigin(id:string):MotionRect|undefined{
  if(typeof document==='undefined') return undefined;
  const node=document.getElementById(id);
  if(!node)return undefined;
  const rect=node.getBoundingClientRect();
  if(rect.width<1||rect.height<1)return undefined;
  return {x:rect.left,y:rect.top,width:rect.width,height:rect.height};
}
function bagTarget():MotionRect|undefined{
  const candidates=document.querySelectorAll<HTMLElement>('[data-uptaco-bag-target]');
  for(const element of candidates){
    const rect=element.getBoundingClientRect();
    const style=getComputedStyle(element);
    if(rect.width>0&&rect.height>0&&style.display!=='none'&&style.visibility!=='hidden')
      return {x:rect.left,y:rect.top,width:rect.width,height:rect.height};
  }
  return undefined;
}
function fallbackOrigin():MotionRect{
  return {x:window.innerWidth*0.5-20,y:window.innerHeight*0.53-20,width:40,height:40};
}

export function BagMotionLayer({event}:{event:BagVisualEvent|null}){
  const active=useRef<Set<()=>void>>(new Set());
  useEffect(()=>{
    if(!event||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const from=event.origin??fallbackOrigin();
    const removing=event.kind==='remove'||event.kind==='decrease';
    const target=bagTarget()??(removing
      ?{...from,x:from.x+30,y:from.y+100}
      :{x:window.innerWidth-70,y:70,width:40,height:40});
    const token=document.createElement('span');
    token.className='uptaco-bag-flight-token'+(removing?' uptaco-bag-flight-token--remove':'');
    token.textContent=removing?'−':event.kind==='increase'?'+':'U';
    token.setAttribute('aria-hidden','true');
    token.style.left=`${from.x+from.width/2-22}px`;
    token.style.top=`${from.y+from.height/2-22}px`;
    token.style.pointerEvents='none';
    document.body.appendChild(token);
    let disposed=false;
    let kill=()=>{token.remove();active.current.delete(kill);};
    active.current.add(kill);
    import('kinetrell/web/gsap').then(({createGsapTimeline})=>{
      if(disposed||!token.isConnected){kill();return;}
      const plan=compileMotion(bagFlightDefinition(event,from,target));
      const timeline=createGsapTimeline(plan,{token},{paused:true});
      const previousKill=kill;
      kill=()=>{timeline.kill();token.remove();active.current.delete(kill);active.current.delete(previousKill);};
      active.current.delete(previousKill);active.current.add(kill);
      timeline.eventCallback('onComplete',kill);
      timeline.play();
    }).catch(()=>kill());
    // Do not cancel a previous token on subsequent events; rapid taps overlap
    // with independent Kinetrell tracks. Unmount cleanup below handles all.
    return ()=>{disposed=true;};
  },[event?.sequence]);
  useEffect(()=>()=>{
    for(const remove of active.current)remove();
    active.current.clear();
  },[]);
  return null;
}
