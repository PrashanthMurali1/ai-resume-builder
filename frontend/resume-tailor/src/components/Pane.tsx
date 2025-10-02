import React from "react";
import { View } from "react-native";
import { Text, Card } from "react-native-paper";

export default function Pane({ title, children }: React.PropsWithChildren<{title: string}>) {
  return (
    <View style={{ padding: 12, alignItems: 'center' }}>
      <Text variant="titleMedium" style={{ fontWeight: "600", marginBottom: 12, color: '#FFFFFF', textAlign: 'center' }}>
        {title}
      </Text>
      <Card style={{ 
        borderRadius: 16, 
        backgroundColor: '#1A1A1A', 
        minWidth: 300, 
        maxWidth: 400 
      }}>
        <Card.Content style={{ padding: 16, alignItems: 'center' }}>
          {children}
        </Card.Content>
      </Card>
    </View>
  );
}
