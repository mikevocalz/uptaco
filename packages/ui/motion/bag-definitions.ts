import { defineMotion } from 'kinetrell';
import type { MotionRect, BagVisualEvent } from './bag-types';

const DURATIONS = Object.freeze({
  feedback:160,arc:220,land:190,remove:270
});
export { DURATIONS as BAG_MOTION_DURATIONS };
/** One authored motion vocabulary; platforms choose a native execution path. */
export const bagButtonPulse=defineMotion({
  id:'uptaco-bag-counter-pulse',
  initial:{badge:{scale:1,opacity:1}},
  tracks:[
    {target:'badge',from:{scale:0.88,opacity:1},to:{scale:1.13,opacity:1},atMs:0,durationMs:130,ease:'power2.out'},
    {target:'badge',to:{scale:1,opacity:1},atMs:130,durationMs:160,ease:'power2.out'}
  ]
});

function center(rect:MotionRect) {return {x:rect.x+rect.width/2,y:rect.y+rect.height/2};}
export function bagFlightDefinition(event:BagVisualEvent, from:MotionRect, to:MotionRect){
  const a=center(from),b=center(to),dx=b.x-a.x,dy=b.y-a.y;
  const removing=event.kind==='remove'||event.kind==='decrease';
  const id=`uptaco-bag-${event.kind}-${event.sequence}`;
  if(removing){
    return defineMotion({
      id, initial:{token:{x:0,y:0,opacity:1,scale:1,rotation:0}},
      tracks:[
        {target:'token',to:{x:dx*0.3,y:-21,scale:1.1,rotation:-12,opacity:1},durationMs:110,ease:'power2.out'},
        {target:'token',to:{x:dx,y:Math.max(45,dy),scale:0.3,rotation:24,opacity:0},atMs:110,durationMs:160,ease:'power2.in'}
      ]
    });
  }
  const halfwayY=Math.min(-54,dy*0.42-50);
  return defineMotion({
    id, initial:{token:{x:0,y:0,opacity:1,scale:1,rotation:-4}},
    tracks:[
      {target:'token',to:{x:dx*0.52,y:halfwayY,scale:0.9,rotation:10,opacity:1},durationMs:DURATIONS.arc,ease:'power2.out'},
      {target:'token',to:{x:dx,y:dy,scale:0.22,rotation:24,opacity:0},atMs:DURATIONS.arc,durationMs:DURATIONS.land,ease:'power2.in'}
    ]
  });
}
