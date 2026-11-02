import { compileMotion, defineMotion } from 'kinetrell';

/** The shared motion language for web GSAP and native Reanimated adapters.
 * Content renders in its resting state without JS; entry animations must use
 * Kinetrell's dynamic from states, not invisible SSR markup.
 */
export const MOTION_TOKENS = Object.freeze({
  press: 110,
  modifier: 160,
  category: 230,
  itemDetail: 310,
  addToBag: 440,
  confirmation: 560
});

export const addToBagMotion = defineMotion({
  id: 'uptaco-add-to-bag',
  initial: {
    item: { opacity: 1, x: 0, y: 0, scale: 1 },
    counter: { scale: 1, opacity: 1 }
  },
  tracks: [
    {target:'item',to:{x: 32, y: -35, scale: 0.76, opacity: 0.3},durationMs: 300,ease:'power2.inOut'},
    {target:'item',to:{x: 54, y: -48, scale: 0.3, opacity: 0},atMs: 300,durationMs: 140,ease:'power2.in'},
    {target:'counter',from:{scale: 0.9, opacity:1},to:{scale:1,opacity:1},atMs:275,durationMs:165,ease:'power2.out'}
  ]
});
export const selectorMotion = defineMotion({
  id:'uptaco-selector',
  initial:{selector:{x:0, opacity:1}},
  tracks:[{target:'selector',to:{x:18,opacity:1},durationMs:230,ease:'power2.out'}]
});
export const sheetMotion = defineMotion({
  id:'uptaco-detail-panel',
  initial:{sheet:{opacity:1,y:0,scale:1}},
  tracks:[{target:'sheet',from:{opacity:0,y:24,scale:0.985},to:{opacity:1,y:0,scale:1},durationMs:310,ease:'cubic.out'}]
});

export const motionDefinitions = {
  addToBag: compileMotion(addToBagMotion),
  selector: compileMotion(selectorMotion),
  detailPanel: compileMotion(sheetMotion)
} as const;

/** Motion never represents payment authority. No order is confirmed until
 * the server verifies it, regardless of animated success.
 */
