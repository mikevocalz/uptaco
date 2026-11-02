'use client';
import { Image } from 'expo-image';
import type { ImageStyle } from 'react-native';
export type BrandImageProps = {src:string;alt:string;className?:string;priority?:boolean;sizes?:string;width?:number;height?:number;style?:ImageStyle};
export function BrandImage({src,alt,width=320,height=320,style}:BrandImageProps) {
  return <Image source={{uri:src}} accessibilityLabel={alt} style={[{width,height},style]} contentFit="cover" />;
}
