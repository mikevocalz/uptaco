/** Preview bag domain: product names are editorial, prices are deliberately
 * absent until Square Catalog + Orders are live and quoted server-side.
 * No function in this module creates a real order or authorizes a charge.
 */
export type BagLocation = 'harlem' | 'midtown';
export const MAX_BAG_QUANTITY = 20;
export type BagProduct = Readonly<{
  productId: string;
  name: string;
  category: string;
  optionKey?: string;
}>;
export type BagLine = Readonly<{
  key: string;
  productId: string;
  name: string;
  category: string;
  optionKey: string;
  quantity: number;
}>;

export function bagLineKey(product: BagProduct): string {
  const id=product.productId.trim();
  const option=(product.optionKey??'base').trim();
  if (!id || !option || !product.name.trim()) throw new Error('Bag item has invalid identity');
  return JSON.stringify([id,option]);
}
export function bagCount(lines:readonly BagLine[]):number {
  return lines.reduce((total,line)=>total+line.quantity,0);
}
export function insertBagLine(lines:readonly BagLine[], product:BagProduct, quantity=1): BagLine[] {
  if(!Number.isInteger(quantity)||quantity<1||quantity>MAX_BAG_QUANTITY)
    throw new RangeError('Bag quantity must be an integer between 1 and 20');
  const key=bagLineKey(product);
  const existing=lines.find(line=>line.key===key);
  if(existing) {
    const next=Math.min(MAX_BAG_QUANTITY,existing.quantity+quantity);
    return lines.map(line=>line.key===key?{...line,quantity:next}:line);
  }
  return [...lines,{
    key,productId:product.productId,name:product.name,category:product.category,
    optionKey:product.optionKey??'base',quantity
  }];
}
export function findBagLine(lines:readonly BagLine[],key:string):BagLine|undefined {
  return lines.find(line=>line.key===key);
}
export function changeBagQuantity(lines:readonly BagLine[],key:string,delta:-1|1):BagLine[] {
  const original=findBagLine(lines,key);
  if(!original) return [...lines];
  if(delta===-1 && original.quantity===1) return lines.filter(line=>line.key!==key);
  const next=Math.min(MAX_BAG_QUANTITY,Math.max(1,original.quantity+delta));
  return lines.map(line=>line.key===key?{...line,quantity:next}:line);
}
export function removeBagLine(lines:readonly BagLine[],key:string):BagLine[] {
  return lines.filter(line=>line.key!==key);
}
/** For a product without approved live price and modifiers, the bag is a draft.
 * A UI may display it; checkout must remain disabled.
 */
export function bagMayCheckout(input:{
  merchantApproved:boolean;
  catalogVerified:boolean;
  pricesRequoted:boolean;
  paymentConfigured:boolean;
  allItemsAvailable:boolean;
}):boolean {
  return Object.values(input).every(value=>value===true);
}
