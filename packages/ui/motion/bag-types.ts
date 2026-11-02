/** Serialized geometry avoids DOM dependencies in app features. */
export type MotionRect=Readonly<{x:number;y:number;width:number;height:number}>;
export type BagVisualEvent=Readonly<{
  sequence:number;
  kind:'add'|'increase'|'decrease'|'remove'|'undo';
  label:string;
  origin?:MotionRect;
}>;
