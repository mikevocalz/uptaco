import type { Access, CollectionConfig, Field } from 'payload';

/**
 * Premium experience collections. Not included in a deployed CMS until
 * reviewed Payload v4 schema/typecheck, migration, service-layer authorization
 * and merchant provider grants are complete.
 */
const roles = ['owner','manager','kitchen','cashier','support','marketing','customer'] as const;
type Role = typeof roles[number];
const role = (user:unknown): Role | undefined => {
  if(!user || typeof user!=='object' || !('role' in user)) return;
  const value = (user as {role?:unknown}).role;
  return typeof value==='string' && roles.includes(value as Role) ? value as Role : undefined;
};
const can=(...grants: Role[]):Access=>({req})=>grants.includes(role(req.user) as Role);
const denied:Access=()=>false;
const editors=can('owner','manager','marketing');
const operators=can('owner','manager');
const support=can('owner','manager','support');
const t=(name:string,required=false):Field=>({name,type:'text',required});
const d=(name:string,required=false):Field=>({name,type:'date',required});
const relation=(name:string,to:string,required=false):Field=>({name,type:'relationship',relationTo:to as never,required});
const choices=(...values:string[])=>values.map(value=>({label:value.replaceAll('-',' '),value}));
const sel=(name:string, values:string[], required=true):Field=>({name,type:'select',required,options:choices(...values)});
const cannotMutate=():never=>{throw new Error('Append-only/externally-owned record cannot be mutated')};
const guardAppend=({operation}:{operation:string})=>{if(operation!=='create') cannotMutate();};
const publicCampaign:Access=({req})=>role(req.user)&&role(req.user)!=='customer' ? true : {published:{equals:true}};

export const FavoriteConfigurations:CollectionConfig={
  slug:'favorite-configurations',
  admin:{group:'Customers',useAsTitle:'label'},
  access:{read:support,create:denied,update:denied,delete:denied},
  fields:[
    relation('customer','customer-profiles',true),t('label',true),
    relation('location','locations',true),t('externalCatalogVariantId',true),
    {name:'modifierSelection',type:'json',required:true},
    d('lastValidatedAt'),d('lastOrderedAt'),
    {name:'disabled',type:'checkbox',defaultValue:false}
  ]
};

export const GroupOrderSessions:CollectionConfig={
  slug:'group-order-sessions',
  admin:{group:'Orders',useAsTitle:'sessionReference'},
  access:{read:support,create:denied,update:denied,delete:denied},
  fields:[
    t('sessionReference',true),relation('location','locations',true),relation('host','customer-profiles'),
    t('externalSquareGroupId'),t('inviteTokenDigest',true),
    sel('status',['draft','inviting','locked','submitted','cancelled','expired']),
    d('expiresAt',true),d('submittedAt'),
    {name:'participantCount',type:'number',min:0},
    {name:'sourceOfTruth',type:'select',options:choices('square'),defaultValue:'square'}
  ]
};

export const GiftCardReferences:CollectionConfig={
  slug:'gift-card-references',
  admin:{group:'Gifts',useAsTitle:'giftReference'},
  access:{read:support,create:denied,update:denied,delete:denied},
  fields:[
    t('giftReference',true),t('externalSquareGiftCardId',true),
    sel('status',['pending','active','depleted','disabled']),
    relation('purchaser','customer-profiles'),t('recipientEmailDigest'),
    d('scheduledDeliveryAt'),d('deliveredAt'),d('createdAt'),
    {name:'currency',type:'select',options:choices('USD'),defaultValue:'USD'}
    // Never persist full GAN, PIN, CVC or payment source in Payload.
  ]
};

export const GiftCardEvents:CollectionConfig={
  slug:'gift-card-events',
  admin:{group:'Gifts',useAsTitle:'providerEventKey',hidden:true},
  access:{read:operators,create:denied,update:denied,delete:denied},
  hooks:{beforeChange:[guardAppend as never],beforeDelete:[cannotMutate]},
  fields:[
    t('providerEventKey',true),relation('giftCard','gift-card-references',true),
    sel('kind',['created','activated','redeemed','refunded','reversed','expired']),
    {name:'deltaCents',type:'number'},d('occurredAt',true),
    t('providerReference',true)
  ]
};

export const CateringInquiries:CollectionConfig={
  slug:'catering-inquiries',
  admin:{group:'Catering',useAsTitle:'requestReference'},
  access:{read:support,create:denied,update:denied,delete:denied},
  fields:[
    t('requestReference',true),relation('location','locations'),
    t('contactName',true),{name:'contactEmail',type:'email',required:true},
    t('companyName'),t('contactPhone'),d('requestedFor',true),
    {name:'guestCount',type:'number',required:true,min:1},
    {name:'dietaryNotes',type:'textarea'}, {name:'additionalNotes',type:'textarea'},
    {name:'itemRequests',type:'array',fields:[
      t('externalHoneyCartId'),t('displayName',true),
      {name:'quantity',type:'number',min:1,required:true},
      {name:'providerLeadHours',type:'number',min:0},
    ]},
    sel('status',['new','reviewing','quoted','accepted','declined','expired']),
    t('honeyCartOrderReference'),d('repliedAt'),d('retentionUntil')
  ]
};

export const WholesalePartners:CollectionConfig={
  slug:'wholesale-partners',
  admin:{group:'Wholesale',useAsTitle:'businessName'},
  access:{read:support,create:operators,update:operators,delete:denied},
  fields:[
    t('businessName',true),t('primaryContactName'),{name:'primaryContactEmail',type:'email',required:true},
    t('odekoAccountId'),t('accountReference'),
    sel('status',['applicant','reviewing','approved','suspended','closed']),
    {name:'locationCount',type:'number',min:0},
    {name:'approvedPaymentTerms',type:'json'},
    d('approvedAt'),d('lastFulfillmentAt'),d('retentionUntil')
  ]
};

export const WholesaleOrderReferences:CollectionConfig={
  slug:'wholesale-order-references',
  admin:{group:'Wholesale',useAsTitle:'externalOrderReference'},
  access:{read:support,create:denied,update:denied,delete:denied},
  fields:[
    relation('partner','wholesale-partners',true),t('externalOrderReference',true),
    sel('source',['odeko','manual-approved']),
    sel('status',['requested','accepted','preparing','in-transit','delivered','cancelled']),
    d('requestedFor'),d('deliveredAt'),t('providerReconciliationKey')
  ]
};

export const MarketingCampaigns:CollectionConfig={
  slug:'marketing-campaigns',
  admin:{group:'Website',useAsTitle:'title'},
  versions:{drafts:true},
  access:{read:publicCampaign,create:editors,update:editors,delete:operators},
  fields:[
    t('title',true),t('slug',true),t('description'),
    {name:'published',type:'checkbox',defaultValue:false},
    d('startsAt'),d('endsAt'),
    relation('heroMedia','media'),relation('featuredProduct','products'),
    {name:'locationEligibility',type:'relationship',relationTo:'locations',hasMany:true},
    {name:'promotionTerms',type:'textarea'},
    t('externalSquarePromotionId'),
    {name:'displayPriority',type:'number',defaultValue:0}
  ]
};

export const NotificationPreferences:CollectionConfig={
  slug:'notification-preferences',
  admin:{group:'Customers',useAsTitle:'preferenceReference',hidden:true},
  access:{read:support,create:denied,update:denied,delete:denied},
  fields:[
    t('preferenceReference',true),relation('customer','customer-profiles',true),
    {name:'emailMarketingOptIn',type:'checkbox',defaultValue:false},
    {name:'smsMarketingOptIn',type:'checkbox',defaultValue:false},
    {name:'serviceUpdatesEnabled',type:'checkbox',defaultValue:true},
    d('emailConsentAt'),d('smsConsentAt'),t('consentSource'),d('lastUnsubscribedAt')
  ]
};

export const NotificationOutbox:CollectionConfig={
  slug:'notification-outbox',
  admin:{group:'Integrations',useAsTitle:'idempotencyReference',hidden:true},
  access:{read:operators,create:denied,update:denied,delete:denied},
  fields:[
    t('idempotencyReference',true),
    sel('channel',['email','sms','push']),
    sel('intent',['receipt','pickup-update','courier-update','gift','catering','marketing']),
    sel('status',['queued','delivered','bounced','failed','suppressed']),
    t('providerMessageId'),t('recipientVaultReference'),
    d('scheduledAt',true),d('sentAt'),d('retentionUntil'),
    {name:'attemptCount',type:'number',defaultValue:0,min:0}
  ]
};

export const premiumCollections:CollectionConfig[]=[
  FavoriteConfigurations,GroupOrderSessions,GiftCardReferences,GiftCardEvents,
  CateringInquiries,WholesalePartners,WholesaleOrderReferences,
  MarketingCampaigns,NotificationPreferences,NotificationOutbox
];
