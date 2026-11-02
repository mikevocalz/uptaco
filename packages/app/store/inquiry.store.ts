'use client';
import { create } from 'zustand';

export type UptacoInquiryKind='catering'|'partner'|'contact';
export type InquiryDraft=Readonly<{
  name:string;email:string;company:string;phone:string;
  date:string;time:string;headcount:string;location:string;
  service:string;notes:string;numberOfLocations:string;city:string;
}>;
const EMPTY:InquiryDraft={
  name:'',email:'',company:'',phone:'',date:'',time:'',headcount:'',location:'harlem',
  service:'pickup',notes:'',numberOfLocations:'',city:''
};
type State={
  drafts:Record<UptacoInquiryKind,InquiryDraft>;
  setField:(kind:UptacoInquiryKind,key:keyof InquiryDraft,value:string)=>void;
};
export const useInquiry=create<State>(set=>({
  drafts:{catering:{...EMPTY},partner:{...EMPTY},contact:{...EMPTY}},
  setField:(kind,key,value)=>set(state=>({
    drafts:{
      ...state.drafts,
      [kind]:{...state.drafts[kind],[key]:value}
    }
  }))
}));
