import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

// onPick now receives the actual File object (web) OR could later receive a path (native)
export default function FilePicker({ onPick, busy }:{ onPick:(file:File| string,name:string)=>void, busy?: boolean }) {
  return (
    <View style={{ marginBottom: 8 }}>
      <Button 
        mode="contained" 
        onPress={() => {
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
        }}
        loading={busy}
        disabled={busy}
        style={{ 
          borderRadius: 20, 
          marginBottom: 8, 
          backgroundColor: '#2196F3',
          alignSelf: 'center',
          minWidth: 200,
          maxWidth: 250
        }}
        contentStyle={{ 
          paddingVertical: 6, 
          paddingHorizontal: 12 
        }}
      >
        {busy ? "Processing…" : "Choose File (PDF/DOCX)"}
      </Button>
      <Text variant="bodySmall" style={{ color:"#CCCCCC", marginTop: 6, textAlign: 'center' }}>
        Or paste text manually below.
      </Text>
    </View>
  );
}
