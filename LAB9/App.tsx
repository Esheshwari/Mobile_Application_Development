/**
 * HYPED - The Exclusive Drop App
 * Entry Point: App.js
 *
 * Clean entry point containing only the Navigation Container.
 * All screen logic lives in /src/screens.
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
