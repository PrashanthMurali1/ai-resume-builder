import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import MainScreen from './src/screens/MainScreen';
import LandingScreen from './src/screens/LandingScreen';
import ResumeProcessingScreen, { StructuredResumeData } from './src/screens/ResumeProcessingScreen';
import JobDescriptionScreen from './src/screens/JobDescriptionScreen';
import ATSResultScreen from './src/screens/ATSResultScreen';

export default function App() {
  console.log("✅ App.tsx is loaded");
  const [resumeText, setResumeText] = useState<string | null>(null);
  const [structuredResumeData, setStructuredResumeData] = useState<StructuredResumeData | null>(null);
  const [jobDescription, setJobDescription] = useState<string | null>(null);
  const [atsResults, setAtsResults] = useState<string[]>([]);
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'processing' | 'job' | 'ats' | 'main'>('landing');

  useEffect(() => {
    // Handle browser back/forward navigation
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state || { screen: 'landing' };
      console.log('🔄 Browser navigation:', state);
      setCurrentScreen(state.screen);
      if (state.screen === 'landing') {
        setResumeText(null);
        setStructuredResumeData(null);
        setJobDescription(null);
        setAtsResults([]);
      } else if (state.resumeText) {
        setResumeText(state.resumeText);
      }
      if (state.structuredResumeData) {
        setStructuredResumeData(state.structuredResumeData);
      }
      if (state.jobDescription) {
        setJobDescription(state.jobDescription);
      }
      if (state.atsResults) {
        setAtsResults(state.atsResults);
      }
    };

    // Handle hash change (for direct URL navigation)
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#processing' && currentScreen !== 'processing') {
        // Handle processing screen
      } else if (hash === '#job' && currentScreen !== 'job') {
        // Handle job screen
      } else if (hash === '#ats' && currentScreen !== 'ats') {
        // Handle ATS results screen
      } else if (hash === '#main' && currentScreen !== 'main') {
        // Handle main screen
      } else if (!hash && currentScreen !== 'landing') {
        setCurrentScreen('landing');
        setResumeText(null);
        setJobDescription(null);
      }
    };

    // Listen for browser back/forward events
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);

    // Set initial state based on URL
    const hash = window.location.hash;
    const initialScreen = hash === '#main' ? 'main' : hash === '#ats' ? 'ats' : hash === '#job' ? 'job' : hash === '#processing' ? 'processing' : 'landing';
    if (window.history.state === null) {
      window.history.replaceState({ screen: initialScreen }, '', window.location.href);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [currentScreen]);

  const handleNavigateToProcessing = (text: string) => {
    console.log('⚙️ Navigating to ResumeProcessingScreen');
    setResumeText(text);
    setCurrentScreen('processing');
    window.history.pushState({ screen: 'processing', resumeText: text }, '', window.location.pathname + '#processing');
  };

  const handleNavigateToJob = (structuredData: StructuredResumeData) => {
    console.log('🧾 Navigating to JobDescriptionScreen');
    setStructuredResumeData(structuredData);
    setCurrentScreen('job');
    window.history.pushState({ screen: 'job', resumeText, structuredResumeData: structuredData }, '', window.location.pathname + '#job');
  };

  const handleNavigateToATS = (resume: string, jd: string, results: string[]) => {
    console.log('🔍 Navigating to ATSResultScreen');
    setResumeText(resume);
    setJobDescription(jd);
    setAtsResults(results);
    setCurrentScreen('ats');
    window.history.pushState({ screen: 'ats', resumeText: resume, jobDescription: jd, atsResults: results }, '', window.location.pathname + '#ats');
  };

  const handleNavigateToMain = (resume: string, jd: string) => {
    console.log('🚀 Navigating to MainScreen');
    setResumeText(resume);
    setJobDescription(jd);
    setCurrentScreen('main');
    window.history.pushState({ screen: 'main', resumeText: resume, jobDescription: jd }, '', window.location.pathname + '#main');
  };

  const handleNavigateToLanding = () => {
    console.log('🏠 Navigating to LandingScreen');
    setResumeText(null);
    setStructuredResumeData(null);
    setJobDescription(null);
    setAtsResults([]);
    setCurrentScreen('landing');
    // Push new state to browser history
    window.history.pushState({ screen: 'landing' }, '', window.location.pathname);
  };

  return (
    <PaperProvider>
      <View style={{ flex: 1 }}>
        {currentScreen === 'landing' || resumeText == null ? (
          <LandingScreen onDone={handleNavigateToProcessing} />
        ) : currentScreen === 'processing' ? (
          <ResumeProcessingScreen 
            resumeText={resumeText}
            onBack={handleNavigateToLanding}
            onProceed={handleNavigateToJob}
          />
        ) : currentScreen === 'job' ? (
          <JobDescriptionScreen 
            resumeText={resumeText}
            onBack={() => {
              setCurrentScreen('processing');
              window.history.pushState({ screen: 'processing', resumeText }, '', window.location.pathname + '#processing');
            }}
            onProceed={handleNavigateToATS}
            initialJD={jobDescription ?? ''}
          />
        ) : currentScreen === 'ats' ? (
          <ATSResultScreen 
            missingRequirements={atsResults}
            onBack={() => {
              setCurrentScreen('job');
              window.history.pushState({ screen: 'job', resumeText, jobDescription }, '', window.location.pathname + '#job');
            }}
            onProceed={() => handleNavigateToMain(resumeText, jobDescription)}
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
