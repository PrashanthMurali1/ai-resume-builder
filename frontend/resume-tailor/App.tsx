import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import MainScreen from './src/screens/MainScreen';
import LandingScreen from './src/screens/LandingScreen';
import ResumeDisplayScreen from './src/screens/ResumeDisplayScreen';

export default function App() {
  console.log("✅ App.tsx is loaded");
  const [resumeText, setResumeText] = useState<string | null>(null);
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'display' | 'main'>('landing');

  useEffect(() => {
    // Handle browser back/forward navigation
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state || { screen: 'landing' };
      console.log('🔄 Browser navigation:', state);
      setCurrentScreen(state.screen);
      if (state.screen === 'landing') {
        setResumeText(null);
      }
    };

    // Handle hash change (for direct URL navigation)
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#display' && currentScreen !== 'display') {
        // Handle display screen
      } else if (hash === '#main' && currentScreen !== 'main') {
        // Handle main screen
      } else if (!hash && currentScreen !== 'landing') {
        setCurrentScreen('landing');
        setResumeText(null);
      }
    };

    // Listen for browser back/forward events
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);

    // Set initial state based on URL
    const hash = window.location.hash;
    const initialScreen = hash === '#main' ? 'main' : hash === '#display' ? 'display' : 'landing';
    
    if (window.history.state === null) {
      window.history.replaceState({ screen: initialScreen }, '', window.location.href);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [currentScreen]);

  const handleNavigateToDisplay = (text: string) => {
    console.log('📄 Navigating to ResumeDisplayScreen');
    setResumeText(text);
    setCurrentScreen('display');
    // Push new state to browser history
    window.history.pushState({ screen: 'display', resumeText: text }, '', window.location.pathname + '#display');
  };

  const handleNavigateToMain = (text: string) => {
    console.log('🚀 Navigating to MainScreen');
    setResumeText(text);
    setCurrentScreen('main');
    // Push new state to browser history
    window.history.pushState({ screen: 'main', resumeText: text }, '', window.location.pathname + '#main');
  };

  const handleNavigateToLanding = () => {
    console.log('🏠 Navigating to LandingScreen');
    setResumeText(null);
    setCurrentScreen('landing');
    // Push new state to browser history
    window.history.pushState({ screen: 'landing' }, '', window.location.pathname);
  };

  return (
    <PaperProvider>
      <View style={{ flex: 1 }}>
        {currentScreen === 'landing' || resumeText == null ? (
          <LandingScreen onDone={handleNavigateToDisplay} />
        ) : currentScreen === 'display' ? (
          <ResumeDisplayScreen 
            resumeText={resumeText}
            onProceed={handleNavigateToMain}
            onBack={handleNavigateToLanding}
          />
        ) : (
          <MainScreen 
            initialResume={resumeText} 
            onBack={handleNavigateToLanding}
          />
        )}
      </View>
    </PaperProvider>
  );
}
