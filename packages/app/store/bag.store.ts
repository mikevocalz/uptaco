'use client';
import { create } from 'zustand';
import {
  insertBagLine,removeBagLine,changeBagQuantity,findBagLine,
  bagCount,MAX_BAG_QUANTITY,type BagLine,type BagProduct,type BagLocation
} from '@uptaco/commerce/bag';
import type { BagVisualEvent, MotionRect } from '@acme/ui/bag-motion';

type Removed = Readonly<{location:BagLocation;line:BagLine}>;
interface BagState {
  bags:Record<BagLocation,readonly BagLine[]>;
  lastRemoved:Removed|null;
  motionEvent:BagVisualEvent|null;
  motionSequence:number;
  announcement:string;
  add:(location:BagLocation,product:BagProduct,origin?:MotionRect)=>void;
  increase:(location:BagLocation,key:string,origin?:MotionRect)=>void;
  decrease:(location:BagLocation,key:string,origin?:MotionRect)=>void;
  remove:(location:BagLocation,key:string,origin?:MotionRect)=>void;
  undoRemoval:(origin?:MotionRect)=>void;
}
const bags:BagState['bags']={harlem:[],midtown:[]};
export const useUptacoBag=create<BagState>((set)=>({
  bags,lastRemoved:null,motionEvent:null,motionSequence:0,announcement:'',
  add:(location,product,origin)=>set(state=>{
    const before=state.bags[location];
    const existing=findBagLine(before,JSON.stringify([product.productId.trim(),(product.optionKey??'base').trim()]));
    if(existing?.quantity===MAX_BAG_QUANTITY) return {...state,announcement:'Maximum quantity of 20 reached.'};
    const next=insertBagLine(before,product);
    const sequence=state.motionSequence+1;
    return {...state,bags:{...state.bags,[location]:next},motionSequence:sequence,
      motionEvent:{sequence,kind:'add',origin,label:product.name},
      announcement:`${product.name} added to your ${location} bag. ${bagCount(next)} items.`};
  }),
  increase:(location,key,origin)=>set(state=>{
    const lines=state.bags[location];
    const original=findBagLine(lines,key);
    if(!original) return state;
    if(original.quantity===MAX_BAG_QUANTITY) return {...state,announcement:'Maximum quantity of 20 reached.'};
    const next=changeBagQuantity(lines,key,1);
    const sequence=state.motionSequence+1;
    return {...state,bags:{...state.bags,[location]:next},motionSequence:sequence,
      motionEvent:{sequence,kind:'increase',origin,label:original.name},
      announcement:`${original.name} quantity ${original.quantity+1}.`};
  }),
  decrease:(location,key,origin)=>set(state=>{
    const lines=state.bags[location];
    const original=findBagLine(lines,key);
    if(!original) return state;
    const next=changeBagQuantity(lines,key,-1);
    const lastRemoved=original.quantity===1?{location,line:original}:state.lastRemoved;
    const sequence=state.motionSequence+1;
    return {...state,bags:{...state.bags,[location]:next},lastRemoved,motionSequence:sequence,
      motionEvent:{sequence,kind:original.quantity===1?'remove':'decrease',origin,label:original.name},
      announcement:original.quantity===1
        ? `${original.name} removed. Undo is available.`
        : `${original.name} quantity ${original.quantity-1}.`};
  }),
  remove:(location,key,origin)=>set(state=>{
    const original=findBagLine(state.bags[location],key);
    if(!original)return state;
    const next=removeBagLine(state.bags[location],key);
    const sequence=state.motionSequence+1;
    return {...state,bags:{...state.bags,[location]:next},lastRemoved:{location,line:original},
      motionSequence:sequence,motionEvent:{sequence,kind:'remove',origin,label:original.name},
      announcement:`${original.name} removed. You can undo this.`};
  }),
  undoRemoval:(origin)=>set(state=>{
    if(!state.lastRemoved)return state;
    const {location,line}=state.lastRemoved;
    const next=insertBagLine(state.bags[location],line,line.quantity);
    const sequence=state.motionSequence+1;
    return {...state,bags:{...state.bags,[location]:next},lastRemoved:null,
      motionSequence:sequence,motionEvent:{sequence,kind:'undo',origin,label:line.name},
      announcement:`${line.name} restored to your ${location} bag.`};
  })
}));
