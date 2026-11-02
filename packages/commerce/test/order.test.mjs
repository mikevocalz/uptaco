import test from 'node:test';
import assert from 'node:assert/strict';
import { externalOrderKey, pickupActor, allowedTransition, transitionOrder, canDispatchCourier, canAwardRewards, assertAmounts, prepareDispatch } from '../src/index.ts';

const base = {
  id:'ut-1', origin:'uptaco-web', locationId:'harlem', externalOrderId:'square-77',
  fulfillment:'courier-delivery', dispatchAuthority:'merchant', orderStatus:'accepted',
  paymentStatus:'captured', currency:'USD', subtotalCents:1500, taxCents:100,
  feesCents:300, staffTipCents:0, courierTipCents:0, totalCents:1900
};

test('external identity is scoped to originating provider and location', () => {
  assert.notEqual(externalOrderKey('uber-eats','harlem','21'), externalOrderKey('doordash-marketplace','harlem','21'));
  assert.notEqual(externalOrderKey('uber-eats','harlem','21'), externalOrderKey('uber-eats','midtown','21'));
  assert.throws(()=>externalOrderKey('uber-eats','','21'));
});

test('pickup actor is the customer, not a courier, for all pickup types', () => {
  assert.equal(pickupActor('customer-pickup'),'customer');
  assert.equal(pickupActor('curbside-pickup'),'customer');
  assert.equal(pickupActor('courier-delivery'),'courier');
  assert.equal(pickupActor('merchant-delivery'),'employee');
});

test('marketplace delivery never causes duplicate website dispatch', () => {
  assert.equal(canDispatchCourier({...base,origin:'uber-eats',dispatchAuthority:'marketplace'}),false);
  assert.equal(canDispatchCourier({...base,origin:'doordash-marketplace',dispatchAuthority:'merchant'}),false);
  assert.equal(canDispatchCourier({...base,fulfillment:'customer-pickup'}),false);
  assert.equal(canDispatchCourier(base),true);
});

test('order status rejects regressions',()=>{
  assert.equal(allowedTransition('preparing','ready-for-handoff'),true);
  assert.equal(allowedTransition('completed','preparing'),false);
  assert.throws(()=>transitionOrder({...base,orderStatus:'completed'}, 'preparing'));
});

test('dispatch requires usable quote, no current dispatcher, and verified state',()=>{
  const quote={provider:'uber-direct',providerQuoteId:'q-1',expiresAt:'2026-11-02T19:00:00.000Z',feeCents:500,currency:'USD'};
  const args={attempt:1,nowMs:Date.parse('2026-11-02T18:45:00.000Z'),pickupReadyAt:'2026-11-02T18:55:00.000Z',deliveryAddressToken:'vault:1',activeDispatchCount:0};
  assert.equal(prepareDispatch(base,quote,args).provider,'uber-direct');
  assert.throws(()=>prepareDispatch(base,quote,{...args,activeDispatchCount:1}));
  assert.throws(()=>prepareDispatch(base,quote,{...args,nowMs:Date.parse('2026-11-02T18:59:30.000Z')}));
});

test('no automatic loyalty on marketplace without verified consent',()=>{
  assert.equal(canAwardRewards({...base,orderStatus:'completed'},true),true);
  assert.equal(canAwardRewards({...base,orderStatus:'completed',origin:'grubhub'},true),false);
  assert.equal(canAwardRewards({...base,orderStatus:'completed'},false),false);
});

test('server monetary fields must reconcile',()=>{
  assert.doesNotThrow(()=>assertAmounts(base));
  assert.throws(()=>assertAmounts({...base,totalCents:1800}));
});
