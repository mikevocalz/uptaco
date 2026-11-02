import { notFound } from 'next/navigation';
import { AccountScreen, ACCOUNT_AREAS } from '@acme/app/screens/AccountScreen';
export async function generateStaticParams(){return ACCOUNT_AREAS.filter(area=>area!=='overview').map(area=>({area}));}
export default async function AccountAreaPage({params}:{params:Promise<{area:string}>}){
  const {area}=await params;
  if(!ACCOUNT_AREAS.includes(area as (typeof ACCOUNT_AREAS)[number])||area==='overview')notFound();
  return <AccountScreen area={area as (typeof ACCOUNT_AREAS)[number]}/>;
}
