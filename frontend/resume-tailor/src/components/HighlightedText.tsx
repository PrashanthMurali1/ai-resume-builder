import React from "react";
import { Text, TextStyle } from "react-native";

/**
 * Simple cross-platform (RN + web) highlighter.
 * - Case-insensitive
 * - Escapes regex chars
 * - Highlights non-overlapping matches of ANY of the searchWords
 */
export default function HighlightedText({
  text,
  searchWords,
  highlightStyle = { backgroundColor: "yellow" },
  textStyle,
}: {
  text: string;
  searchWords: string[];
  highlightStyle?: TextStyle;
  textStyle?: TextStyle;
}) {
  if (!text || !searchWords?.length) {
    return <Text style={textStyle}>{text}</Text>;
  }

  // Build a single regex for all words, escaped, case-insensitive
  const escaped = searchWords
    .filter(Boolean)
    .map(w => w.trim())
    .filter(w => w.length > 0)
    .map(escapeRegex);
  if (escaped.length === 0) return <Text style={textStyle}>{text}</Text>;

  const regex = new RegExp(`(${escaped.join("|")})`, "gi");

  const parts: Array<{ text: string; match: boolean; key: string }> = [];
  let lastIndex = 0;
  let m: RegExpExecArray | null;

  while ((m = regex.exec(text)) !== null) {
    const start = m.index;
    const end = start + m[0].length;
    if (start > lastIndex) {
      parts.push({ text: text.slice(lastIndex, start), match: false, key: `n-${lastIndex}-${start}` });
    }
    parts.push({ text: text.slice(start, end), match: true, key: `h-${start}-${end}` });
    lastIndex = end;

    // Prevent infinite loops for zero-width matches (shouldn't happen here)
    if (m.index === regex.lastIndex) regex.lastIndex++;
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), match: false, key: `n-${lastIndex}-end` });
  }

  return (
    <Text style={textStyle}>
      {parts.map(p =>
        p.match ? (
          <Text key={p.key} style={highlightStyle}>{p.text}</Text>
        ) : (
          <Text key={p.key}>{p.text}</Text>
        )
      )}
    </Text>
  );
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
