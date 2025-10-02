import React from 'react';
import { View } from 'react-native';
import MainScreen from './src/screens/MainScreen';

export default function App() {
  console.log("✅ App.tsx is loaded");
  return (
    <View style={{ flex: 1 }}>
      <MainScreen />
    </View>
  );
}
