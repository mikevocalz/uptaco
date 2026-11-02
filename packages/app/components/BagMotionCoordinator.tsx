'use client';
import { useEffect } from 'react';
import { Text } from '@acme/ui/html';
import { BagMotionLayer } from '@acme/ui/bag-motion';
import { useUptacoBag } from '../store/bag.store';

/** One root-level shared event stream. Visual feedback is optional; cart updates
 * and status announcements happen immediately regardless of animation.
 */
export function BagMotionCoordinator(){
  const event=useUptacoBag(s=>s.motionEvent);
  const announcement=useUptacoBag(s=>s.announcement);
  useEffect(()=>{
    // Retain the preview bag across full-page navigation and reloads on web.
    // No side effects occur during SSR and no financial information is saved.
    void useUptacoBag.persist.rehydrate();
  },[]);
  return <>
    <BagMotionLayer event={event}/>
    <Text role="status" aria-live="polite" aria-atomic="true"
      className="uptaco-live-announcer">{announcement}</Text>
  </>;
}
