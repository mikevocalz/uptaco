import type { Access, CollectionConfig, Field } from 'payload';
import { premiumCollections } from './premium-collections';

/**
 * Payload CMS v4 BETA draft schema. Review against exact installed beta typings before
 * deploying. Auth, payment, provider webhooks, ledger mutation paths and PG migrations
 * are intentionally *not* operational on this branch.
 * Admin/public access is denied by default unless explicitly granted.
 */
const ROLES = ['owner', 'manager', 'kitchen', 'cashier', 'support', 'marketing', 'customer'] as const;
type Role = typeof ROLES[number];
const identityRole = (user: unknown): Role | undefined => {
  if (!user || typeof user !== 'object' || !('role' in user)) return undefined;
  const role = (user as {role?:unknown}).role;
  return typeof role === 'string' && ROLES.includes(role as Role) ? role as Role : undefined;
};
const anyStaff = (user: unknown) => identityRole(user) !== undefined && identityRole(user) !== 'customer';
const can = (...roles: Role[]): Access => ({req}) => {
  const role=identityRole(req.user);
  return !!role && roles.includes(role);
};
const staff: Access=({req})=>anyStaff(req.user);
const manager=can('owner','manager');
const finance=can('owner','manager');
const content=can('owner','manager','marketing');
const kitchen=can('owner','manager','kitchen','cashier');
const denied: Access=()=>false;
const publicRead: Access=()=>true;
const publishedRead: Access=({req}) => anyStaff(req.user) ? true : { published: { equals: true } };
const opts=(...values:string[])=>values.map(v=>({label:v.replaceAll('-',' '),value:v}));
const rel=(name:string,relationTo:string,required=false):Field=>({name,type:'relationship',relationTo:relationTo as never,required});
const s=(name:string,required=false,more:Record<string,unknown>={}):Field=>({name,type:'text',required,...more} as Field);
const money=(name:string,required=true):Field=>({name,type:'number',required,min:0,admin:{description:'Integer US cents. Never floating-point USD.'}});
const date=(name:string,required=false):Field=>({name,type:'date',required});
const noDelete=()=>{throw new Error('Immutable commerce history: delete is not allowed')};
const noUpdate=({operation}:{operation:string})=>{if(operation !== 'create') throw new Error('Append-only event record');};

/** No consumer signup may assign a staff role. Better Auth adapter replaces local auth in a later reviewed PR. */
export const Users:CollectionConfig={
  slug:'users',auth:true,
  admin:{useAsTitle:'email',group:'People'},
  access:{create:can('owner'),read:staff,update:manager,delete:denied},
  fields:[
    {name:'email',type:'email',required:true,unique:true},
    s('name'),s('phone'),
    {name:'role',type:'select',required:true,defaultValue:'customer',options:opts(...ROLES),
      access:{create:({req})=>identityRole(req.user)==='owner',update:({req})=>identityRole(req.user)==='owner'}},
    {name:'marketingConsent',type:'checkbox',defaultValue:false},
    date('marketingConsentAt'),date('privacyDeletedAt'),
  ]
};
export const Locations:CollectionConfig={
  slug:'locations',admin:{useAsTitle:'name',group:'Restaurant'},
  access:{read:publicRead,create:manager,update:manager,delete:denied},
  fields:[
    s('name',true),{name:'slug',type:'text',required:true,unique:true},
    s('streetAddress',true),s('city',true),s('state',true),s('postalCode',true),
    s('timezone',true),s('publicPhone'),s('squareLocationId',false,{unique:true}),
    s('uberStoreId'),s('doordashStoreId'),s('grubhubStoreId'),
    {name:'pickupEnabled',type:'checkbox',defaultValue:false},
    {name:'deliveryEnabled',type:'checkbox',defaultValue:false},
    {name:'locationHours',type:'json',admin:{description:'Merchant-approved structured operating hours; not a guess'}},
    {name:'fulfillmentSettings',type:'json',admin:{description:'Per-store pickup capacity, handoff window and courier permission'}}
  ]
};
export const Media:CollectionConfig={
  slug:'media',admin:{useAsTitle:'alt',group:'Website'},upload:{mimeTypes:['image/jpeg','image/png','image/webp','image/avif','image/svg+xml']},
  access:{read:publicRead,create:content,update:content,delete:manager},
  fields:[s('alt',true),s('rightsHolder'),s('photographer'),{name:'approvedForWeb',type:'checkbox',defaultValue:false}]
};
export const Products:CollectionConfig={
  slug:'products',admin:{useAsTitle:'name',group:'Menu'},versions:{drafts:true},
  access:{read:publishedRead,create:manager,update:manager,delete:denied},
  fields:[
    s('name',true),{name:'slug',type:'text',required:true,unique:true},s('description'),
    {name:'image',type:'upload',relationTo:'media'},rel('category','menu-categories'),
    {name:'published',type:'checkbox',defaultValue:false},
    {name:'allergens',type:'select',hasMany:true,options:opts('milk','egg','fish','shellfish','tree-nuts','peanuts','wheat','soy','sesame')},
    {name:'dietaryClaimsApproved',type:'checkbox',defaultValue:false},
    {name:'modifierGroups',type:'relationship',relationTo:'modifier-groups',hasMany:true},
    s('squareCatalogObjectId'),s('squareVariationId'),s('externalMenuMapping'),
  ]
};
export const MenuCategories:CollectionConfig={
  slug:'menu-categories',admin:{useAsTitle:'name',group:'Menu'},
  access:{read:publicRead,create:manager,update:manager,delete:denied},
  fields:[s('name',true),{name:'slug',type:'text',required:true,unique:true},{name:'sortOrder',type:'number',defaultValue:0},s('description')]
};
export const ModifierGroups:CollectionConfig={
  slug:'modifier-groups',admin:{useAsTitle:'name',group:'Menu'},
  access:{read:staff,create:manager,update:manager,delete:denied},
  fields:[s('name',true),{name:'requiredMin',type:'number',defaultValue:0,min:0},{name:'requiredMax',type:'number',required:true,min:1},
    {name:'choices',type:'array',required:true,fields:[s('label',true),s('externalVariationId'),money('priceDeltaCents',false),{name:'available',type:'checkbox',defaultValue:true}]}]
};
export const LocationMenuItems:CollectionConfig={
  slug:'location-menu-items',admin:{useAsTitle:'displayName',group:'Menu'},
  access:{read:staff,create:manager,update:manager,delete:denied},
  fields:[s('displayName',true),rel('location','locations',true),rel('product','products',true),money('priceCents'),
    {name:'availability',type:'select',defaultValue:'inactive',options:opts('active','inactive','sold-out')},
    date('availabilityCheckedAt'),s('squareVariationId'),s('externalProviderId')]
};
export const CustomerProfiles:CollectionConfig={
  slug:'customer-profiles',admin:{useAsTitle:'displayName',group:'People'},
  access:{read:can('owner','manager','support'),create:denied,update:denied,delete:denied},
  fields:[s('displayName'),rel('user','users'),s('externalCustomerId'),{name:'dataProcessingConsent',type:'checkbox',defaultValue:false},
    date('consentAt'),date('retentionUntil')]
};
export const Orders:CollectionConfig={
  slug:'orders',admin:{useAsTitle:'orderNumber',group:'Orders'},
  access:{read:staff,create:denied,update:denied,delete:denied},
  fields:[
    s('orderNumber',true,{unique:true}),rel('location','locations',true),rel('customer','customer-profiles'),
    {name:'origin',type:'select',required:true,options:opts('uptaco-web','square-online','uber-eats','doordash-marketplace','grubhub','catering')},
    s('providerOrderId'),s('providerLocationId'),
    s('externalOrderKey',true,{unique:true,index:true}),
    s('squareMirrorOrderId'),s('marketplaceOrderId'),
    {name:'fulfillmentType',type:'select',required:true,options:opts('customer-pickup','curbside-pickup','courier-delivery','merchant-delivery')},
    {name:'dispatchAuthority',type:'select',required:true,options:opts('merchant','marketplace','none')},
    {name:'orderStatus',type:'select',required:true,options:opts('draft','awaiting-payment','placed','accepted','preparing','ready-for-handoff','completed','cancelled','refunded')},
    {name:'paymentStatus',type:'select',required:true,options:opts('unpaid','authorized','captured','partially-refunded','refunded','failed')},
    {name:'lineItems',type:'array',required:true,fields:[s('productName',true),s('catalogProductId'),{name:'quantity',type:'number',required:true,min:1},
      money('unitPriceCents'),{name:'selectedModifiers',type:'json'},money('lineTotalCents')]},
    money('subtotalCents'),money('taxCents'),money('feesCents'),money('staffTipCents'),money('courierTipCents'),money('totalCents'),
    date('placedAt'),date('scheduledPickupAt'),s('pickupCode'),{name:'specialInstructions',type:'textarea',maxLength:1500},
    date('retentionUntil'),
  ]
};
export const Payments:CollectionConfig={
  slug:'payments',admin:{useAsTitle:'providerReference',group:'Orders',hidden:true},
  access:{read:finance,create:denied,update:denied,delete:denied},
  fields:[rel('order','orders',true),s('provider',true),s('providerReference',true,{unique:true}),money('authorizedCents',false),
    money('capturedCents',false),money('refundedCents',false),s('currency',true),date('capturedAt'),date('refundedAt')]
};
export const Fulfillments:CollectionConfig={
  slug:'fulfillments',admin:{useAsTitle:'externalFulfillmentId',group:'Orders'},
  access:{read:staff,create:denied,update:denied,delete:denied},
  fields:[rel('order','orders',true),s('externalFulfillmentId'),
    {name:'pickupActor',type:'select',required:true,options:opts('customer','courier','employee')},
    {name:'status',type:'select',required:true,options:opts('not-started','preparing','ready','handed-off','complete','cancelled')},
    date('readyAt'),date('handedOffAt'),date('completedAt'),s('handoffStaffId'),s('pickupVerificationCode')]
};
export const CourierDispatches:CollectionConfig={
  slug:'courier-dispatches',admin:{useAsTitle:'dispatchReference',group:'Orders'},
  access:{read:staff,create:denied,update:denied,delete:denied},
  fields:[rel('order','orders',true),s('dispatchReference',true,{unique:true}),
    s('idempotencyKey',true,{unique:true}),s('externalDispatchId'),s('providerQuoteId'),
    {name:'provider',type:'select',required:true,options:opts('uber-direct','doordash-drive','cartwheel','nash','own-fleet')},
    {name:'status',type:'select',required:true,options:opts('not-requested','quoting','requested','assigned','courier-arriving','picked-up','delivered','cancelled','failed','returned')},
    money('feeCents',false),date('quoteExpiresAt'),date('assignedAt'),date('pickedUpAt'),date('deliveredAt'),
    s('trackingUrl'),s('dropoffAddressVaultReference'),s('failureCode'),s('pickupProofReference'),date('retentionUntil')]
};
export const ProviderConnections:CollectionConfig={
  slug:'provider-connections',admin:{useAsTitle:'name',group:'Integrations'},
  access:{read:manager,create:manager,update:manager,delete:denied},
  fields:[s('name',true),rel('location','locations',true),{name:'provider',type:'select',required:true,options:opts('square','uber-eats','uber-direct','doordash-marketplace','doordash-drive','grubhub','deliverect','otter','checkmate','chowly','cartwheel','nash','ezcater')},
    {name:'enabled',type:'checkbox',defaultValue:false},s('externalMerchantId'),s('externalLocationId'),
    {name:'capabilities',type:'json',admin:{description:'Approved scopes; NEVER put access tokens, API keys or secrets here'}},
    date('lastVerifiedAt')]
};
export const LoyaltyAccounts:CollectionConfig={
  slug:'loyalty-accounts',admin:{useAsTitle:'programCode',group:'Rewards'},
  access:{read:can('owner','manager','support'),create:denied,update:denied,delete:denied},
  fields:[rel('customer','customer-profiles',true),s('programCode',true),{name:'pointsBalance',type:'number',required:true,defaultValue:0},
    {name:'pointsLifetime',type:'number',required:true,defaultValue:0},date('lastReconciledAt')]
};
export const LoyaltyLedger:CollectionConfig={
  slug:'loyalty-ledger',admin:{useAsTitle:'sourceKey',group:'Rewards',hidden:true},
  access:{read:finance,create:denied,update:denied,delete:denied},
  hooks:{beforeChange:[noUpdate as never],beforeDelete:[noDelete]},
  fields:[rel('account','loyalty-accounts',true),rel('order','orders'),s('sourceKey',true,{unique:true}),
    {name:'kind',type:'select',required:true,options:opts('earn','redeem','reversal','adjustment','expire')},
    {name:'deltaPoints',type:'number',required:true},s('reasonCode',true),date('effectiveAt',true),date('expiresAt')]
};
export const Rewards:CollectionConfig={
  slug:'rewards',admin:{useAsTitle:'title',group:'Rewards'},
  access:{read:publishedRead,create:manager,update:manager,delete:denied},
  fields:[s('title',true),s('description'),{name:'pointsCost',type:'number',required:true,min:1},
    {name:'published',type:'checkbox',defaultValue:false},date('startsAt'),date('endsAt')]
};
export const SitePages:CollectionConfig={
  slug:'site-pages',admin:{useAsTitle:'title',group:'Website'},versions:{drafts:true},
  access:{read:publishedRead,create:content,update:content,delete:manager},
  fields:[s('title',true),{name:'slug',type:'text',required:true,unique:true},
    s('seoTitle'),s('seoDescription'),{name:'heroMedia',type:'upload',relationTo:'media'},
    {name:'pageBlocks',type:'blocks',blocks:[{slug:'rich-text-section',fields:[s('heading'),{name:'content',type:'richText'}]},
      {slug:'product-feature',fields:[s('heading'),{name:'products',type:'relationship',relationTo:'products',hasMany:true}]},
      {slug:'location-feature',fields:[rel('location','locations',true)]}]},
    {name:'published',type:'checkbox',defaultValue:false}]
};
export const SiteSettings:CollectionConfig={
  slug:'site-settings',admin:{useAsTitle:'settingKey',group:'Website'},
  access:{read:content,create:manager,update:manager,delete:denied},
  fields:[s('settingKey',true,{unique:true}),{name:'value',type:'json'},s('lastApprovedBy')]
};
export const WebhookEvents:CollectionConfig={
  slug:'webhook-events',admin:{useAsTitle:'providerEventKey',group:'Integrations',hidden:true},
  access:{read:can('owner','manager'),create:denied,update:denied,delete:denied},
  hooks:{beforeChange:[noUpdate as never],beforeDelete:[noDelete]},
  fields:[s('providerEventKey',true,{unique:true}),s('provider',true),s('eventType',true),
    s('rawBodyDigest',true),{name:'signatureVerified',type:'checkbox',defaultValue:false},
    {name:'status',type:'select',options:opts('received','processed','duplicate','failed')},
    date('receivedAt',true),date('processedAt'),s('outboxReference'),s('errorCode')]
};
export const AuditEvents:CollectionConfig={
  slug:'audit-events',admin:{useAsTitle:'action',group:'Security',hidden:true},
  access:{read:can('owner'),create:denied,update:denied,delete:denied},
  hooks:{beforeChange:[noUpdate as never],beforeDelete:[noDelete]},
  fields:[s('action',true),s('actorRole'),s('actorReference'),s('targetType',true),s('targetId',true),s('reasonCode'),date('at',true),s('requestId')]
};

export const uptacoCollections: CollectionConfig[] = [
  Users, Locations, Media, MenuCategories, ModifierGroups, Products, LocationMenuItems,
  CustomerProfiles, Orders, Payments, Fulfillments, CourierDispatches,
  ProviderConnections, LoyaltyAccounts, LoyaltyLedger, Rewards, SitePages,
  SiteSettings, WebhookEvents, AuditEvents,
  ...premiumCollections
];
