import React, { useState } from "react";
import { View, Alert } from "react-native";
import { Text } from "react-native-paper";
import Pane from "../components/Pane";
import FilePicker from "../components/FilePicker";
import * as API from "../api";

interface LandingScreenProps {
  onDone: (resumeText: string) => void;
}

export default function LandingScreen({ onDone }: LandingScreenProps) {
  const [busy, setBusy] = useState(false);

  const importFile = async (fileOrPath: File | string, name: string) => {
    setBusy(true);
    try {
      const text = await API.parseFile(fileOrPath, name);
      onDone(text);
    } catch (e: any) {
      Alert.alert("Import failed", e?.message ?? String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#000000',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 12 
    }}>
      <Pane title="Upload your resume (PDF/DOCX)">
        <Text variant="bodyMedium" style={{ marginBottom: 12, color: '#FFFFFF', textAlign: 'center' }}>
          Select your existing resume file to get started. After upload, you'll be taken to the tailoring screen.
        </Text>
        <FilePicker onPick={importFile} busy={busy} />
      </Pane>
    </View>
  );
}
