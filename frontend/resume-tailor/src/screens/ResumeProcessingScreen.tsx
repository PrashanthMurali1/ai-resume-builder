import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as API from '../api';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ResumeProcessingScreenProps {
  resumeText: string;
  onBack: () => void;
  onProceed: (structuredData: StructuredResumeData) => void;
}

export interface StructuredResumeData {
  profile: string;
  summary: string;
  education: string;
  skills: string;
  work_experience: string;
  projects: string;
}

export default function ResumeProcessingScreen({ 
  resumeText, 
  onBack, 
  onProceed 
}: ResumeProcessingScreenProps) {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<keyof StructuredResumeData>('profile');
  const [structuredData, setStructuredData] = useState<StructuredResumeData>({
    profile: '',
    summary: '',
    education: '',
    skills: '',
    work_experience: '',
    projects: ''
  });

  useEffect(() => {
    processResume();
  }, []);

  const processResume = async () => {
    setLoading(true);
    try {
      const result = await API.parseStructuredResume(resumeText);
      setStructuredData(result);
    } catch (error: any) {
      Alert.alert('Processing Error', error.message || 'Failed to process resume');
      console.error('Resume processing error:', error);
      // Set default empty structure on error
      setStructuredData({
        profile: '',
        summary: '',
        education: '',
        skills: '',
        work_experience: '',
        projects: ''
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: keyof StructuredResumeData, value: string) => {
    setStructuredData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProceed = () => {
    onProceed(structuredData);
  };

  const boxWidth = Math.min(screenWidth * 0.9, 800);

  if (loading) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={{ 
          color: '#FFFFFF', 
          marginTop: 16, 
          fontSize: 16,
          textAlign: 'center'
        }}>
          Processing your resume...
        </Text>
        <Text style={{ 
          color: '#CCCCCC', 
          marginTop: 8, 
          fontSize: 14,
          textAlign: 'center'
        }}>
          Extracting and categorizing resume sections
        </Text>
      </View>
    );
  }

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#000000',
      paddingHorizontal: 16,
      paddingTop: 40
    }}>
      <View style={{ 
        width: boxWidth,
        height: screenHeight * 0.85,
        alignSelf: 'center',
        backgroundColor: '#1A1A1A',
        borderRadius: 16,
        padding: 16
      }}>
        <View style={{ marginBottom: 24 }}>
          <Button
            mode="text"
            onPress={onBack}
            textColor="#2196F3"
            style={{ alignSelf: 'flex-start', marginBottom: 12 }}
          >
            <MaterialCommunityIcons name="arrow-left" size={18} color="#2196F3" />
            Back
          </Button>
          <Text style={{ 
            color: '#FFFFFF', 
            fontSize: 20, 
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 20
          }}>
            Review Resume Sections
          </Text>
        </View>

        {/* Tab Navigation */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={{ maxHeight: 60, marginBottom: 16 }}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {Object.entries({
            profile: 'Contact',
            summary: 'Summary',
            education: 'Education',
            skills: 'Skills',
            work_experience: 'Experience',
            projects: 'Projects'
          }).map(([key, label]) => (
            <TouchableOpacity
              key={key}
              onPress={() => setActiveTab(key as keyof StructuredResumeData)}
              style={{
                backgroundColor: activeTab === key ? '#2196F3' : '#333333',
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 25,
                marginRight: 12,
                minWidth: 80,
                alignItems: 'center'
              }}
            >
              <Text style={{
                color: activeTab === key ? '#FFFFFF' : '#CCCCCC',
                fontSize: 14,
                fontWeight: activeTab === key ? '600' : '400'
              }}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tab Content */}
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <Text style={{
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 12,
            textAlign: 'center'
          }}>
            {activeTab === 'profile' && 'Contact Information'}
            {activeTab === 'summary' && 'Professional Summary'}
            {activeTab === 'education' && 'Education'}
            {activeTab === 'skills' && 'Skills'}
            {activeTab === 'work_experience' && 'Work Experience'}
            {activeTab === 'projects' && 'Projects'}
          </Text>
          
          <TextInput
            mode="outlined"
            multiline
            numberOfLines={activeTab === 'work_experience' ? 8 : 6}
            value={structuredData[activeTab]}
            onChangeText={(value) => handleFieldChange(activeTab, value)}
            theme={{
              colors: {
                primary: '#2196F3',
                outline: '#444444',
                onSurface: '#FFFFFF',
                surface: '#1A1A1A'
              }
            }}
            textColor="#FFFFFF"
            placeholder={
              activeTab === 'profile' ? 'Name, phone, email, location, LinkedIn URL...' :
              activeTab === 'summary' ? 'Professional summary, career objective, key expertise...' :
              activeTab === 'education' ? 'Educational qualifications, degrees, certifications...' :
              activeTab === 'skills' ? 'Technical skills, programming languages, tools...' :
              activeTab === 'work_experience' ? 'Work experience, internships, job positions...' :
              'Personal projects, academic projects, side projects...'
            }
            placeholderTextColor="#888888"
            style={{ flex: 1, textAlignVertical: 'top' }}
          />

          {/* Proceed Button */}
          <Button
            mode="contained"
            onPress={handleProceed}
            style={{
              backgroundColor: '#2196F3',
              borderRadius: 25,
              paddingVertical: 4,
              marginTop: 16,
              marginBottom: 16
            }}
            labelStyle={{
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: '600'
            }}
          >
            Continue to Job Description
          </Button>
        </View>
      </View>
    </View>
  );
}