import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import MainScreen from './src/screens/MainScreen';
import LandingScreen from './src/screens/LandingScreen';

export default function App() {
  console.log("✅ App.tsx is loaded");
  const [initialResume, setInitialResume] = useState<string | null>(null);
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'main'>('landing');

  useEffect(() => {
    // Handle browser back/forward navigation
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state || { screen: 'landing' };
      console.log('🔄 Browser navigation:', state);
      setCurrentScreen(state.screen);
      if (state.screen === 'landing') {
        setInitialResume(null);
      }
    };

    // Handle hash change (for direct URL navigation)
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#main' && currentScreen !== 'main') {
        // Don't change if we're already on main screen
        // This prevents losing resume data on refresh
      } else if (!hash && currentScreen !== 'landing') {
        setCurrentScreen('landing');
        setInitialResume(null);
      }
    };

    // Listen for browser back/forward events
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);

    // Set initial state based on URL
    const hash = window.location.hash;
    const initialScreen = hash === '#main' ? 'main' : 'landing';
    
    if (window.history.state === null) {
      window.history.replaceState({ screen: initialScreen }, '', window.location.href);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [currentScreen]);

  const handleNavigateToMain = (text: string) => {
    console.log('🚀 Navigating to MainScreen');
    setInitialResume(text);
    setCurrentScreen('main');
    // Push new state to browser history
    window.history.pushState({ screen: 'main', resumeText: text }, '', window.location.pathname + '#main');
  };

  const handleNavigateToLanding = () => {
    console.log('🏠 Navigating to LandingScreen');
    setInitialResume(null);
    setCurrentScreen('landing');
    // Push new state to browser history
    window.history.pushState({ screen: 'landing' }, '', window.location.pathname);
  };

  return (
    <PaperProvider>
      <View style={{ flex: 1 }}>
        {currentScreen === 'landing' || initialResume == null ? (
          <LandingScreen onDone={handleNavigateToMain} />
        ) : (
          <MainScreen 
            initialResume={initialResume} 
            onBack={handleNavigateToLanding}
          />
        )}
      </View>
    </PaperProvider>
  );
}
