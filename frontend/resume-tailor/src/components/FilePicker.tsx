import React from "react";
import { Button, View, Text } from "react-native";

// onPick now receives the actual File object (web) OR could later receive a path (native)
export default function FilePicker({ onPick }:{ onPick:(file:File| string,name:string)=>void }) {
  return (
    <View style={{ marginBottom: 8 }}>
      <Button title="Import DOCX/PDF…" onPress={() => {
        // Web file picker - create input element
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.docx,.pdf';
        input.onchange = (e: any) => {
          const file: File | undefined = e.target.files?.[0];
          if (file) {
            onPick(file, file.name);
          }
        };
        input.click();
      }} />
      <Text style={{ color:"#666", marginTop: 6 }}>Or paste text manually below.</Text>
    </View>
  );
}
