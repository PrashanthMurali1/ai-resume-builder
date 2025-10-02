import React from "react";
import { View, Text } from "react-native";

export default function Pane({ title, children }: React.PropsWithChildren<{title: string}>) {
  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>{title}</Text>
      <View style={{ flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8 }}>
        {children}
      </View>
    </View>
  );
}
