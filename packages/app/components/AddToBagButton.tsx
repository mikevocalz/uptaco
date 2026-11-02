'use client';
import { Button, Text } from '@acme/ui/html';
import { captureBagMotionOrigin } from '@acme/ui/bag-motion';
import { useUptacoSite } from '../store/site.store';
import { useUptacoBag } from '../store/bag.store';

/** A functioning Uptaco draft-bag action, not a payment/order submission.
 * The location and item identity survive route and pane changes.
 */
export function AddToBagButton({
  productId,name,category,variant='card'
}:{
  productId:string;name:string;category:string;variant?:'card'|'detail'
}){
  const location=useUptacoSite(s=>s.location);
  const add=useUptacoBag(s=>s.add);
  const id=`uptaco-add-${productId}`;
  return <Button id={id} className={variant==='detail'?'add-to-bag add-to-bag--detail':'add-to-bag'}
    accessibilityLabel={`Add ${name} to your ${location} bag`}
    onPress={()=>add(location,{productId,name,category},captureBagMotionOrigin(id))}>
    <Text aria-hidden={true} className="add-to-bag-symbol">+</Text>
    <Text>Add to bag</Text>
  </Button>;
}
