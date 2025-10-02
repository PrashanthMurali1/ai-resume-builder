import React, { useState } from 'react';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import MainScreen from './src/screens/MainScreen';
import LandingScreen from './src/screens/LandingScreen';

export default function App() {
  console.log("✅ App.tsx is loaded");
  const [initialResume, setInitialResume] = useState<string | null>(null);

  return (
    <PaperProvider>
      <View style={{ flex: 1 }}>
        {initialResume == null ? (
          <LandingScreen onDone={(text) => setInitialResume(text)} />
        ) : (
          <MainScreen initialResume={initialResume} />
        )}
      </View>
    </PaperProvider>
  );
}
