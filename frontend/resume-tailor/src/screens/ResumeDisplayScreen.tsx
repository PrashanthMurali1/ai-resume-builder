import React, { useState } from "react";
import { Dimensions, View, ScrollView } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ResumeDisplayScreenProps {
  resumeText: string;
  onProceed: (editedResumeText: string) => void;
  onBack?: () => void;
}

// Derive stable dimensions (height & width) based on viewport; clamp to maintain consistency
const WINDOW = Dimensions.get('window');
const RESUME_BOX_HEIGHT = Math.min(Math.max(Math.round(WINDOW.height * 0.7), 560), 760); // clamp 560-760
const RESUME_BOX_WIDTH  = Math.min(Math.max(Math.round(WINDOW.width  * 0.65), 560), 900); // clamp 560-900

export default function ResumeDisplayScreen({ resumeText, onProceed, onBack }: ResumeDisplayScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentResumeText, setCurrentResumeText] = useState(resumeText);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleProceed = () => {
    onProceed(currentResumeText);
  };

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#000000',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16 
    }}>
      {/* Centered container with adaptive width */}
      <View style={{
        width: RESUME_BOX_WIDTH,
        alignItems: 'center'
      }}>
        {/* Resume Content Display with positioned buttons */}
        <View style={{ 
          backgroundColor: 'rgba(33, 150, 243, 0.1)', // Transparent dark blue
          borderRadius: 16,
          borderWidth: 1,
          borderColor: 'rgba(33, 150, 243, 0.3)',
          padding: 16,
          paddingTop: 60, // Space for buttons
          position: 'relative',
          height: RESUME_BOX_HEIGHT,
          width: '100%',
          display: 'flex'
        }}>
          {/* Edit button - Top Left Corner of Box */}
          <View style={{
            position: 'absolute',
            top: 12,
            left: 12,
            zIndex: 1
          }}>
            <Button 
              mode="contained"
              onPress={handleEdit}
              disabled={isEditing}
              style={{ 
                backgroundColor: '#2196F3',
                borderRadius: 20,
                minWidth: 80
              }}
              contentStyle={{ paddingVertical: 6, paddingHorizontal: 12 }}
              icon={({size, color}) => (
                <MaterialCommunityIcons name="pencil" size={size} color={color} />
              )}
              compact
            >
              {isEditing ? "Editing" : "Edit"}
            </Button>
          </View>

          {/* Proceed button - Top Right Corner of Box */}
          <View style={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 1
          }}>
            <Button 
              mode="contained"
              onPress={handleProceed}
              style={{ 
                backgroundColor: '#2196F3',
                borderRadius: 20,
                minWidth: 80
              }}
              contentStyle={{ paddingVertical: 6, paddingHorizontal: 12 }}
              icon={({size, color}) => (
                <MaterialCommunityIcons name="arrow-right" size={size} color={color} />
              )}
              compact
            >
              Proceed
            </Button>
          </View>

          <Text variant="titleMedium" style={{ 
            color: '#FFFFFF', 
            marginBottom: 16, 
            textAlign: 'center',
            fontWeight: '600'
          }}>
            Your Resume Content
          </Text>

          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
            {isEditing ? (
              <TextInput
                mode="outlined"
                multiline
                value={currentResumeText}
                onChangeText={setCurrentResumeText}
                style={{ 
                  flex: 1,
                  backgroundColor: 'transparent',
                  textAlignVertical: 'top'
                }}
                outlineColor="rgba(33, 150, 243, 0.5)"
                activeOutlineColor="#2196F3"
                textColor="#FFFFFF"
                placeholderTextColor="#CCCCCC"
                contentStyle={{
                  color: '#FFFFFF'
                }}
              />
            ) : (
              <View style={{
                backgroundColor: 'rgba(33, 150, 243, 0.05)',
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: 'rgba(33, 150, 243, 0.2)',
                flex: 1
              }}>
                <Text style={{ 
                  color: '#FFFFFF',
                  fontSize: 14,
                  lineHeight: 20,
                  textAlign: 'left'
                }}>
                  {currentResumeText || "No resume content available"}
                </Text>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Back button (optional) - Below the box */}
        {onBack && (
          <Button 
            mode="outlined"
            onPress={onBack}
            style={{ 
              borderColor: '#2196F3',
              borderRadius: 20,
              marginTop: 16
            }}
            textColor="#2196F3"
            contentStyle={{ paddingVertical: 4 }}
            icon={({size, color}) => (
              <MaterialCommunityIcons name="arrow-left" size={size} color={color} />
            )}
          >
            Back to Upload
          </Button>
        )}
      </View>
    </View>
  );
}