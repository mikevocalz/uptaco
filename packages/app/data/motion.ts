import { defineMotion } from 'kinetrell';
/** This Kinetrell vocabulary drives both web/native target scenes. */
export const heroEntry = defineMotion({
  id: 'uptaco-hero-entry',
  initial: {headline:{opacity:1,y:0}},
  tracks:[{target:'headline',from:{opacity:0.88,y:16},to:{opacity:1,y:0},durationMs:440,ease:'power2.out'}]
});
