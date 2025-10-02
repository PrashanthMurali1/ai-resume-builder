import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface JobDescriptionScreenProps {
  onBack: () => void;
  onProceed: (jobDescription: string) => void;
  initialJD?: string;
}

const WINDOW = Dimensions.get('window');
const BOX_HEIGHT = Math.min(Math.max(Math.round(WINDOW.height * 0.65), 480), 700);
const BOX_WIDTH = Math.min(Math.max(Math.round(WINDOW.width * 0.65), 560), 900);

export default function JobDescriptionScreen({ onBack, onProceed, initialJD = '' }: JobDescriptionScreenProps) {
  const [jd, setJD] = useState(initialJD);

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
            onPress={() => onProceed(jd)}
            disabled={!jd.trim()}
            style={{ backgroundColor: '#2196F3', borderRadius: 20, minWidth: 90 }}
            contentStyle={{ paddingVertical: 6, paddingHorizontal: 12 }}
            compact
            icon={({ size, color }) => <MaterialCommunityIcons name="arrow-right" size={size} color={color} />}
          >
            Proceed
          </Button>
        </View>

        <Text style={{ color: '#FFFFFF', textAlign: 'center', fontSize: 18, fontWeight: '600', marginBottom: 12 }}>
          Enter Job Description
        </Text>

        <TextInput
          mode="outlined"
          multiline
          value={jd}
          onChangeText={setJD}
          placeholder="Enter Job Description..."
          style={{ flex: 1, backgroundColor: 'transparent', textAlignVertical: 'top' }}
          outlineColor="rgba(33, 150, 243, 0.5)"
          activeOutlineColor="#2196F3"
          textColor="#FFFFFF"
          placeholderTextColor="#AAAAAA"
          contentStyle={{ color: '#FFFFFF' }}
        />
      </View>
    </View>
  );
}
