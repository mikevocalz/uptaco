'use client';
import { House, UtensilsCrossed, ShoppingBag, MapPin, Ellipsis, UserRound } from 'lucide-react';
export type ShellIconName = 'house' | 'utensils' | 'bag' | 'map-pin' | 'more' | 'user';
const icons = {
  house:House, utensils:UtensilsCrossed, bag:ShoppingBag, 'map-pin':MapPin, more:Ellipsis, user:UserRound
} as const;
export function ShellIcon({name,size=22}:{name:ShellIconName;size?:number}){
  const Component=icons[name];
  return <Component size={size} strokeWidth={2.1} aria-hidden="true" focusable="false"/>;
}
