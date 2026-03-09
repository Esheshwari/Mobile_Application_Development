/**
 * /src/navigation/AppNavigator.tsx
 * Stack Navigator configuration and Route definitions.
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product } from '../data/mockData';
import FeedScreen from '../screens/FeedScreen';
import ProductDetail from '../screens/ProductDetail';

// ── Route param types — single source of truth ──────────────────────────────
export type RootStackParamList = {
  Feed: undefined;
  ProductDetail: { product: Product };
};

export type FeedNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Feed'>;
export type DetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

export const ROUTES = {
  FEED:           'Feed',
  PRODUCT_DETAIL: 'ProductDetail',
} as const;

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.FEED}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
        contentStyle: { backgroundColor: '#0A0A0A' },
      }}
    >
      <Stack.Screen name={ROUTES.FEED} component={FeedScreen} />
      <Stack.Screen
        name={ROUTES.PRODUCT_DETAIL}
        component={ProductDetail}
        options={{ animation: 'slide_from_bottom', gestureDirection: 'vertical' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
