import {notFound} from 'next/navigation';
import {DesignStudyScreen,UPTACO_STUDY_DIRECTIONS,type StudyDirection} from '@acme/app/screens/DesignStudyScreen';
export const metadata={title:'Uptaco Design Study',robots:{index:false,follow:false}};
export function generateStaticParams(){return UPTACO_STUDY_DIRECTIONS.map(direction=>({direction}));}
/** Internal visual-comparison route only; remove before shipping production. */
export default async function DesignStudy({params}:{params:Promise<{direction:string}>}){
  const {direction}=await params;
  if(!UPTACO_STUDY_DIRECTIONS.includes(direction as StudyDirection))notFound();
  return <DesignStudyScreen direction={direction as StudyDirection}/>;
}
