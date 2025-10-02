import React, { useState } from "react";
import { View, TextInput, Button, Text, ScrollView, Alert } from "react-native";
import Pane from "../components/Pane";
import FilePicker from "../components/FilePicker";
import HighlightedText from "../components/HighlightedText";
import * as API from "../api";
import { slugify } from "../utils/slugify";

export default function MainScreen() {
  const [jd, setJD] = useState("");
  const [resume, setResume] = useState("");
  const [tailored, setTailored] = useState("");
  const [missing, setMissing] = useState<string[]>([]);
  const [company, setCompany] = useState("draft");
  const [busy, setBusy] = useState(false);

  const importFile = async (fileOrPath: File | string, name:string) => {
    setBusy(true);
    try {
      const text = await API.parseFile(fileOrPath, name);
      setResume(text);
    } catch (e:any) {
      Alert.alert("Import failed", e?.message ?? String(e));
    } finally {
      setBusy(false);
    }
  };

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
          <FilePicker onPick={importFile} />
          <TextInput
            multiline
            value={resume}
            onChangeText={setResume}
            placeholder="Paste your resume text here..."
            style={{ minHeight: 240 }}
          />
          <Text style={{ marginTop: 8, fontWeight: "600" }}>Missing Keywords (from JD):</Text>
          <HighlightedText text={resume} searchWords={missing} />
        </ScrollView>
        <View style={{ flexDirection:"row", gap:8, marginTop: 8 }}>
          <Button title={busy ? "Working…" : "Tailor w/ Ollama"} onPress={runTailor} disabled={busy || !jd || !resume} />
          <Button title="Accept Changes" onPress={accept} disabled={!tailored} />
        </View>
        <View style={{ flexDirection:"row", gap:8, marginTop: 8 }}>
          <Button title="Export DOCX" onPress={()=>saveDoc("docx")} />
          <Button title="Export PDF"  onPress={()=>saveDoc("pdf")} />
        </View>
      </Pane>

      <Pane title="AI-Suggested Rewrite">
        <ScrollView>
          <TextInput
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
            multiline
            value={jd}
            onChangeText={setJD}
            placeholder="Paste job description here…"
            style={{ minHeight: 520 }}
          />
          <Text style={{ marginTop: 6, color:"#666" }}>Detected company: {company || "—"}</Text>
        </ScrollView>
      </Pane>
    </View>
  );
}
