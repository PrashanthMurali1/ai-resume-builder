import React, { useState } from "react";
import {View, Text, Alert, Button} from "react-native";
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
    <View style={{ flex: 1, padding: 12 }}>
      <Pane title="Upload your resume (PDF/DOCX)">
        <Text style={{ marginBottom: 12 }}>
          Select your existing resume file to get started. After upload, you'll be taken to the tailoring screen.
        </Text>
        <FilePicker onPick={importFile} />
        <View style={{ marginTop: 12 }}>
          <Button title={busy ? "Processing…" : "Choose File"} onPress={() => { /* The FilePicker renders its own button */ }} disabled={busy} />
        </View>
      </Pane>
    </View>
  );
}
