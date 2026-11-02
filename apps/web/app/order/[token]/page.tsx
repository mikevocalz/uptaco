import { OrderStatusScreen } from '@acme/app/screens/OrderStatusScreen';
export const metadata={title:'Your Uptaco Order',robots:{index:false,follow:false}};
/** Verify token server-side before ever rendering a real order.
 * No provider API is connected yet; fail closed with zero personal data.
 */
export default function OrderTrackingPage(){return <OrderStatusScreen order={null}/>;}
