import test from 'node:test';
import assert from 'node:assert/strict';
import {
  selectCheckout, trustedExternalUrl, groupOrderingEligible, rewardsEligible, giftsEligible,
  OFFICIAL_DESTINATIONS
} from '../src/capabilities.ts';
import { UPTACO_ROUTES, findRoute } from '../src/routes.ts';

const verified = Object.freeze({
  location:'harlem',merchantApproved:true,squarePickup:true,squareDelivery:true,
  squareApiCheckout:true,squareGroupOrdering:true,squareLoyalty:true,squareGiftCards:true,
  verifiedAt:'2026-11-02T18:00:00Z'
});

test('unverified merchant safely uses only official pickup ordering', () => {
  const route=selectCheckout('harlem','pickup',null);
  assert.equal(route.kind,'external');
  assert.equal(route.href,OFFICIAL_DESTINATIONS.harlem.pickup);
  assert.equal(route.explanation.includes('provider'),true);
});

test('cross-store entitlement must never make another location live',()=>{
  assert.throws(()=>selectCheckout('midtown','pickup',verified));
});

test('native checkout only if merchant approval AND feature permit',()=>{
  assert.equal(selectCheckout('harlem','pickup',verified).kind,'native');
  assert.equal(selectCheckout('harlem','pickup',{...verified,merchantApproved:false}).kind,'external');
  assert.equal(selectCheckout('harlem','delivery',{...verified,squareDelivery:false}).kind,'external');
});

test('gift cards, groups, loyalty fail closed',()=>{
  assert.equal(groupOrderingEligible(null),false);
  assert.equal(rewardsEligible({...verified,merchantApproved:false}),false);
  assert.equal(giftsEligible(verified),true);
});

test('external URLs do not permit unauthorized hosts or open redirects',()=>{
  assert.throws(()=>trustedExternalUrl('https://uptaco.square.site.evil.org/'));
  assert.throws(()=>trustedExternalUrl('http://uptaco.square.site/'));
  assert.throws(()=>trustedExternalUrl('https://x:y@uptaco.square.site/'));
  assert.equal(trustedExternalUrl(OFFICIAL_DESTINATIONS.catering),OFFICIAL_DESTINATIONS.catering);
});

test('route inventory is unique and covers core non-order revenue streams',()=>{
  assert.equal(UPTACO_ROUTES.length,new Set(UPTACO_ROUTES.map(x=>x.path)).size);
  assert.equal(findRoute('/cafe-partners')?.stateOwner,'odeko');
  assert.equal(findRoute('/catering')?.stateOwner,'honeycart');
  assert.equal(findRoute('/menu')?.stateOwner,'square');
  assert.equal(findRoute('/gifts')?.stateOwner,'square');
});
