import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ATSResultScreenProps {
  missingRequirements: string[];
  onBack: () => void;
  onProceed: () => void;
}

const WINDOW = Dimensions.get('window');
const BOX_HEIGHT = Math.min(Math.max(Math.round(WINDOW.height * 0.75), 600), 800);
const BOX_WIDTH = Math.min(Math.max(Math.round(WINDOW.width * 0.75), 700), 1000);

export default function ATSResultScreen({ missingRequirements, onBack, onProceed }: ATSResultScreenProps) {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#000000',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16
    }}>
      <View style={{
        width: BOX_WIDTH,
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(33, 150, 243, 0.3)',
        padding: 16,
        paddingTop: 60,
        position: 'relative',
        height: BOX_HEIGHT
      }}>
        {/* Back Button */}
        <View style={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
          <Button
            mode="contained"
            onPress={onBack}
            style={{ backgroundColor: '#2196F3', borderRadius: 20, minWidth: 80 }}
            contentStyle={{ paddingVertical: 6, paddingHorizontal: 12 }}
            compact
            icon={({ size, color }) => <MaterialCommunityIcons name="arrow-left" size={size} color={color} />}
          >
            Back
          </Button>
        </View>

        {/* Proceed Button */}
        <View style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
          <Button
            mode="contained"
            onPress={onProceed}
            style={{ backgroundColor: '#2196F3', borderRadius: 20, minWidth: 90 }}
            contentStyle={{ paddingVertical: 6, paddingHorizontal: 12 }}
            compact
            icon={({ size, color }) => <MaterialCommunityIcons name="arrow-right" size={size} color={color} />}
          >
            Proceed
          </Button>
        </View>

        <Text style={{ 
          color: '#FFFFFF', 
          textAlign: 'center', 
          fontSize: 18, 
          fontWeight: '600', 
          marginBottom: 16 
        }}>
          ATS Analysis Results
        </Text>

        <Text style={{ 
          color: '#CCCCCC', 
          textAlign: 'center', 
          fontSize: 14, 
          marginBottom: 20 
        }}>
          {missingRequirements.length === 0 
            ? "Great! Your resume matches all job requirements." 
            : `Found ${missingRequirements.length} requirements that could be better addressed:`
          }
        </Text>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 16 }}>
          {missingRequirements.length === 0 ? (
            <View style={{
              backgroundColor: 'rgba(76, 175, 80, 0.2)',
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: 'rgba(76, 175, 80, 0.4)',
              alignItems: 'center'
            }}>
              <MaterialCommunityIcons name="check-circle" size={48} color="#4CAF50" />
              <Text style={{ 
                color: '#4CAF50', 
                fontSize: 16, 
                fontWeight: '600',
                marginTop: 8,
                textAlign: 'center'
              }}>
                All Requirements Met
              </Text>
              <Text style={{ 
                color: '#CCCCCC', 
                fontSize: 14,
                marginTop: 4,
                textAlign: 'center'
              }}>
                Your resume addresses all key job requirements
              </Text>
            </View>
          ) : (
            missingRequirements.map((requirement, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: 'rgba(255, 152, 0, 0.3)',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: 'rgba(255, 152, 0, 0.5)'
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <MaterialCommunityIcons 
                    name="alert-circle" 
                    size={20} 
                    color="#FF9800" 
                    style={{ marginRight: 8, marginTop: 2 }} 
                  />
                  <Text style={{
                    color: '#FFFFFF',
                    fontSize: 14,
                    lineHeight: 20,
                    flex: 1
                  }}>
                    {requirement}
                  </Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
}