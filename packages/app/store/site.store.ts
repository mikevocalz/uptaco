'use client';
import { create } from 'zustand';

export type UptacoLocation = 'harlem' | 'midtown';
export type Fulfillment = 'pickup' | 'delivery';
export type MenuCategory = 'all' | 'tacos' | 'burritos' | 'drinks' | 'lunch';

interface SiteState {
  location: UptacoLocation;
  fulfillment: Fulfillment;
  category: MenuCategory;
  setLocation: (location: UptacoLocation) => void;
  setFulfillment: (fulfillment: Fulfillment) => void;
  setCategory: (category: MenuCategory) => void;
}

export const useUptacoSite = create<SiteState>((set) => ({
  location: 'harlem',
  fulfillment: 'pickup',
  category: 'all',
  setLocation: (location) => set({location}),
  setFulfillment: (fulfillment) => set({fulfillment}),
  setCategory: (category) => set({category}),
}));
