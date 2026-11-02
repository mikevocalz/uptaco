'use client';
import { useEffect } from 'react';
import Animated from 'react-native-reanimated';
import { Span } from '@expo/html-elements';
import { useMotion, useMotionStyle } from 'kinetrell/native';
import { bagButtonPulse } from './bag-definitions';
import type { BagVisualEvent, MotionRect } from './bag-types';
export type {BagVisualEvent,MotionRect} from './bag-types';
export {bagButtonPulse} from './bag-definitions';

/** Native has no DOM geometry. The same semantic state feedback is rendered
 * through Kinetrell's Reanimated adapter; native layout measuring is a
 * separate device-validated enhancement, not a fake JS viewport flyout.
 */
export function captureBagMotionOrigin(_id:string):MotionRect|undefined{return undefined;}
export function BagMotionLayer({event}:{event:BagVisualEvent|null}){
  const pulse=useMotion(bagButtonPulse,{autoplay:false,reducedMotion:'system'});
  const animatedStyle=useMotionStyle(pulse,'badge');
  useEffect(()=>{if(event)pulse.restart();},[event?.sequence]);
  if(!event)return null;
  return <Animated.View accessibilityElementsHidden pointerEvents="none"
    style={[{position:'absolute',bottom:110,alignSelf:'center',zIndex:100,padding:12,
      borderRadius:12,backgroundColor:'#EC5B27'},animatedStyle]}>
    <Span style={{fontWeight:'800',color:'#17121B'}}>
      {event.kind==='remove'?'Removed from bag':event.kind==='undo'?'Restored to bag':'Added to bag'}
    </Span>
  </Animated.View>;
}
