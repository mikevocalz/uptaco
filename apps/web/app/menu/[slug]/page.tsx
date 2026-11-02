import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MENU_HIGHLIGHTS } from '@acme/app/data/menu';
import { MenuItemScreen } from '@acme/app/screens/MenuItemScreen';

export function generateStaticParams(){
  return MENU_HIGHLIGHTS.map(item=>({slug:item.slug}));
}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const item=MENU_HIGHLIGHTS.find(p=>p.slug===slug);
  return item ? {title:item.name,description:item.description} : {title:'Menu item not found'};
}
export default async function ProductDetails({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  if(!MENU_HIGHLIGHTS.some(p=>p.slug===slug)) notFound();
  return <MenuItemScreen slug={slug}/>;
}
