import type { NextConfig } from 'next';

/**
 * Uptaco's public website is separate from the protected Payload admin.
 * No provider credentials or private CMS access belong in browser bundles.
 */
const config: NextConfig = {
  reactCompiler: true,
  transpilePackages: [
    '@acme/ui', '@acme/app', '@uptaco/experience', '@uptaco/commerce',
    '@expo/html-elements', '@expo/ui', 'expo-image', 'expo-modules-core',
    'react-native', 'react-native-css', 'solito', 'kinetrell'
  ],
  turbopack: {
    resolveAlias: { 'react-native': 'react-native-web' },
    resolveExtensions: ['.web.tsx','.web.ts','.web.js','.tsx','.ts','.jsx','.js','.mjs','.json']
  },
  images: {
    remotePatterns: [
      {protocol:'https',hostname:'static.wixstatic.com',pathname:'/media/**'}
    ]
  }
};
export default config;
