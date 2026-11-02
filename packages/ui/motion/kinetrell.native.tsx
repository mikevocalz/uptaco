'use client';
import React, { type PropsWithChildren } from 'react';
import Animated from 'react-native-reanimated';
import { useMotion, useMotionStyle } from 'kinetrell/native';
import type { MotionDefinition } from 'kinetrell';
export function KinetrellSurface({definition,children}:PropsWithChildren<{definition:MotionDefinition;className?:string}>) {
  const motion=useMotion(definition,{autoplay:true,reducedMotion:'system'});
  const target=Object.keys(definition.initial)[0] ?? '';
  const animatedStyle=useMotionStyle(motion,target);
  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
