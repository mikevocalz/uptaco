import test from 'node:test';
import assert from 'node:assert/strict';
import {
  NOT_CONNECTED, chooseShell, consumerTabs, selectedTabId,
  customerAccountLinks, staffDestinations, PARTNER_DESTINATIONS
} from './contracts.ts';

const guest = {audience:'guest',capabilities:NOT_CONNECTED};
const customer = {audience:'customer',capabilities:{...NOT_CONNECTED,accountsEnabled:true,rewardsEnabled:true,giftsEnabled:true}};
test('web never gets a right rail even on foldable browser',()=>{
  for (const family of ['phone','foldable','tablet','headset','unknown'])
    assert.equal(chooseShell('web',family),'web-header');
});
test('native rail is selected by verified hardware family, not width',()=>{
  for(const family of ['foldable','tablet','headset'])
    assert.equal(chooseShell('native',family),'native-right-rail');
  assert.equal(chooseShell('native','phone'),'native-phone-tabs');
  assert.equal(chooseShell('native','unknown'),'native-pending-capability');
});
test('five stable guest tabs and accessible ordering from every state',()=>{
  const tabs=consumerTabs(guest);
  assert.deepEqual(tabs.map(t=>t.label),['Home','Menu','Order','Locations','More']);
  assert.equal(tabs[2].href,'/order');
  assert.equal(tabs.filter(t=>t.primary).length,1);
});
test('a signed-in customer changes only fifth slot',()=>{
  const old=consumerTabs(guest);
  const mine=consumerTabs(customer);
  assert.deepEqual(mine.slice(0,4),old.slice(0,4));
  assert.equal(mine[4].label,'You');
  assert.equal(mine[4].href,'/account');
});
test('selected tab follows deep checkout / ordering and content routes',()=>{
  assert.equal(selectedTabId('/menu/taco',guest),'menu');
  assert.equal(selectedTabId('/order/abc',guest),'order');
  assert.equal(selectedTabId('/checkout',guest),'order');
  assert.equal(selectedTabId('/locations/harlem',guest),'locations');
  assert.equal(selectedTabId('/catering',guest),'more');
  assert.equal(selectedTabId('/account/orders',customer),'you');
});
test('customer account is hidden when login or loyalty is unavailable',()=>{
  assert.equal(customerAccountLinks(guest).length,0);
  const links=customerAccountLinks(customer).map(x=>x.id);
  assert.ok(links.includes('orders')&&links.includes('rewards')&&links.includes('gifts'));
  assert.ok(!customerAccountLinks({...customer,capabilities:{...customer.capabilities,rewardsEnabled:false}}).some(x=>x.id==='rewards'));
});
test('restaurant staff sees only role-scoped console destinations',()=>{
  const kitchen=staffDestinations('kitchen').map(s=>s.id);
  assert.ok(kitchen.includes('orders')&&kitchen.includes('kitchen'));
  assert.ok(!kitchen.includes('payments')&&!kitchen.includes('team')&&!kitchen.includes('customers'));
  const marketing=staffDestinations('marketing').map(s=>s.id);
  assert.ok(marketing.includes('content')&&!marketing.includes('payments')&&!marketing.includes('orders'));
  assert.ok(staffDestinations('owner').some(s=>s.id==='audit'));
});
test('wholesale has its own surface, never consumer checkout',()=>{
  assert.deepEqual(PARTNER_DESTINATIONS.map(x=>x.id).slice(0,3),['overview','catalog','orders']);
  assert.ok(!PARTNER_DESTINATIONS.some(x=>x.href.startsWith('/checkout')));
});
