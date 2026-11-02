import test from 'node:test';
import assert from 'node:assert/strict';
import {
  selectCheckout, firstPartyPath, internalOrderHref,
  groupOrderingEligible, rewardsEligible, giftsEligible
} from '../src/capabilities.ts';
import { UPTACO_ROUTES, findRoute } from '../src/routes.ts';

const verified = Object.freeze({
  location:'harlem',merchantApproved:true,squarePickup:true,squareDelivery:true,
  squareApiCheckout:true,squareGroupOrdering:true,squareLoyalty:true,squareGiftCards:true,
  verifiedAt:'2026-11-02T18:00:00Z'
});

test('unverified merchant stays on Uptaco menu, not an external checkout', () => {
  const route=selectCheckout('harlem','pickup',null);
  assert.equal(route.kind,'internal');
  assert.equal(route.href,'/menu?location=harlem&fulfillment=pickup');
  assert.equal(route.checkoutEnabled,false);
});
test('cross-store entitlement must never make another location live',()=>{
  assert.throws(()=>selectCheckout('midtown','pickup',verified));
});
test('merchant approvals govern checkout, not where the site navigates',()=>{
  const ready=selectCheckout('harlem','pickup',verified);
  assert.equal(ready.kind,'internal');
  assert.equal(ready.checkoutEnabled,true);
  assert.equal(selectCheckout('harlem','pickup',{...verified,merchantApproved:false}).checkoutEnabled,false);
  assert.equal(selectCheckout('harlem','delivery',{...verified,squareDelivery:false}).checkoutEnabled,false);
  assert.equal(ready.href,internalOrderHref('harlem','pickup'));
});
test('all first-party hrefs are relative and block external destinations',()=>{
  for(const bad of ['https://squareup.com','//uptaco.square.site/','http://example.com','/\\evil.com','/foo%2fbar','/line\nfeed']){
    assert.throws(()=>firstPartyPath(bad),bad);
  }
  assert.equal(firstPartyPath('/checkout?location=midtown'),'/checkout?location=midtown');
});
test('gift cards, groups and loyalty fail closed',()=>{
  assert.equal(groupOrderingEligible(null),false);
  assert.equal(rewardsEligible({...verified,merchantApproved:false}),false);
  assert.equal(giftsEligible(verified),true);
});
test('route inventory is unique with first-party destinations',()=>{
  assert.equal(UPTACO_ROUTES.length,new Set(UPTACO_ROUTES.map(x=>x.path)).size);
  for(const route of UPTACO_ROUTES) assert.ok(route.path.startsWith('/'));
  assert.equal(findRoute('/menu')?.stateOwner,'square'); // server data owner, not redirect
  assert.equal(findRoute('/cafe-partners')?.stateOwner,'odeko'); // future server adapter
});
