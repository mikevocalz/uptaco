import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MAX_BAG_QUANTITY,bagLineKey,insertBagLine,changeBagQuantity,removeBagLine,
  bagCount,findBagLine,bagMayCheckout
} from '../src/bag.ts';
const classic={productId:'classic-breakfast-taco',name:'Classic Breakfast Taco',category:'tacos'};
const bev={productId:'horchata-latte',name:'Horchata Latte',category:'drinks'};
test('bag items have deterministic modifier-specific identity',()=>{
  assert.equal(bagLineKey(classic),bagLineKey({...classic}));
  assert.notEqual(bagLineKey(classic),bagLineKey({...classic,optionKey:'no-cheese'}));
});
test('add then increment, decrement and remove a product',()=>{
  const a=insertBagLine([],classic);
  assert.equal(a[0].quantity,1);
  const b=insertBagLine(a,classic);
  assert.equal(b[0].quantity,2);
  const c=changeBagQuantity(b,a[0].key,-1);
  assert.equal(c[0].quantity,1);
  const d=changeBagQuantity(c,a[0].key,-1);
  assert.deepEqual(d,[]);
  assert.equal(bagCount(b),2);
});
test('removing and restoring retains exact variants and quantities',()=>{
  const a=insertBagLine(insertBagLine([],classic,2),bev,3);
  const original=findBagLine(a,bagLineKey(classic));
  const b=removeBagLine(a,original.key);
  const restored=insertBagLine(b,original,original.quantity);
  assert.equal(findBagLine(restored,original.key).quantity,2);
  assert.equal(bagCount(restored),5);
});
test('protect quantity boundaries and preserve other lines',()=>{
  const full=insertBagLine([],classic,MAX_BAG_QUANTITY);
  assert.equal(insertBagLine(full,classic)[0].quantity,MAX_BAG_QUANTITY);
  assert.deepEqual(changeBagQuantity(full,'missing',1),full);
  assert.throws(()=>insertBagLine([],classic,0));
  assert.throws(()=>insertBagLine([],classic,999));
  assert.throws(()=>insertBagLine([],{...classic,name:' '}));
});
test('checkout is fail-closed until every merchant capability is confirmed',()=>{
  const ready={merchantApproved:true,catalogVerified:true,pricesRequoted:true,paymentConfigured:true,allItemsAvailable:true};
  assert.equal(bagMayCheckout(ready),true);
  for(const field of Object.keys(ready)){
    assert.equal(bagMayCheckout({...ready,[field]:false}),false,field);
  }
});
