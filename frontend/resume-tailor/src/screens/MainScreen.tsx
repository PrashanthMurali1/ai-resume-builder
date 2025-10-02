import React, { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import Pane from "../components/Pane";
import HighlightedText from "../components/HighlightedText";
import * as API from "../api";
import { slugify } from "../utils/slugify";

type MainScreenProps = {
  initialResume?: string;
  onBack?: () => void;
};

export default function MainScreen({ initialResume = "", onBack }: MainScreenProps) {
  const [jd, setJD] = useState("");
  const [resume, setResume] = useState(initialResume);
  const [tailored, setTailored] = useState("");
  const [missing, setMissing] = useState<string[]>([]);
  const [company, setCompany] = useState("draft");
  const [busy, setBusy] = useState(false);

  const runTailor = async () => {
    setBusy(true);
    try {
      const t = await API.tailor(resume, jd);
      setTailored(t);
      const { missing } = await API.keywords(resume, jd);
      setMissing(missing);
      const c = await API.inferCompany(jd);
      setCompany(c);
    } catch (e:any) {
      Alert.alert("Tailor failed", e?.message ?? String(e));
    } finally {
      setBusy(false);
    }
  };

  const accept = () => setResume(tailored);

  const saveDoc = async (fmt:"docx"|"pdf") => {
    try {
      const fileBlob = await API.exportFile(resume, slugify(company), fmt);
      // Web file download
      const url = URL.createObjectURL(fileBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume_${slugify(company)}.${fmt}`;
      a.click();
      URL.revokeObjectURL(url);
      Alert.alert("Saved", `File downloaded as resume_${slugify(company)}.${fmt}`);
    } catch (e:any) {
      Alert.alert("Save failed", e?.message ?? String(e));
    }
  };

  return (
    <View style={{ flex: 1, flexDirection: "row", gap: 8, padding: 12 }}>
      <Pane title="Original Resume">
        <ScrollView>
          {onBack && (
            <Button 
              mode="outlined" 
              onPress={onBack}
              style={{ borderRadius: 20, marginBottom: 12, alignSelf: 'flex-start' }}
              contentStyle={{ paddingVertical: 4 }}
              icon="arrow-left"
            >
              Back to Upload
            </Button>
          )}
          <TextInput
            mode="outlined"
            multiline
            value={resume}
            onChangeText={setResume}
            placeholder="Paste your resume text here..."
            style={{ minHeight: 240, marginBottom: 12 }}
          />
          <Text variant="titleSmall" style={{ marginTop: 8, fontWeight: "600", marginBottom: 8 }}>Missing Keywords (from JD):</Text>
          <HighlightedText text={resume} searchWords={missing} />
        </ScrollView>
        <View style={{ flexDirection:"row", gap:8, marginTop: 12 }}>
          <Button 
            mode="contained" 
            onPress={runTailor} 
            disabled={busy || !jd || !resume}
            loading={busy}
            style={{ borderRadius: 20, flex: 1 }}
            contentStyle={{ paddingVertical: 4 }}
          >
            {busy ? "Working…" : "Tailor w/ Ollama"}
          </Button>
          <Button 
            mode="outlined" 
            onPress={accept} 
            disabled={!tailored}
            style={{ borderRadius: 20, flex: 1 }}
            contentStyle={{ paddingVertical: 4 }}
          >
            Accept Changes
          </Button>
        </View>
        <View style={{ flexDirection:"row", gap:8, marginTop: 8 }}>
          <Button 
            mode="contained-tonal" 
            onPress={()=>saveDoc("docx")}
            style={{ borderRadius: 20, flex: 1 }}
            contentStyle={{ paddingVertical: 4 }}
          >
            Export DOCX
          </Button>
          <Button 
            mode="contained-tonal" 
            onPress={()=>saveDoc("pdf")}
            style={{ borderRadius: 20, flex: 1 }}
            contentStyle={{ paddingVertical: 4 }}
          >
            Export PDF
          </Button>
        </View>
      </Pane>

      <Pane title="AI-Suggested Rewrite">
        <ScrollView>
          <TextInput
            mode="outlined"
            multiline
            value={tailored}
            onChangeText={setTailored}
            placeholder="AI output will appear here…"
            style={{ minHeight: 520 }}
          />
        </ScrollView>
      </Pane>

      <Pane title="Job Description">
        <ScrollView>
          <TextInput
            mode="outlined"
            multiline
            value={jd}
            onChangeText={setJD}
            placeholder="Paste job description here…"
            style={{ minHeight: 520, marginBottom: 8 }}
          />
          <Text variant="bodySmall" style={{ marginTop: 6, color:"#666" }}>Detected company: {company || "—"}</Text>
        </ScrollView>
      </Pane>
    </View>
  );
}
