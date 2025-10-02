import axios from "axios";

const BASE = "http://127.0.0.1:8000";

// Accept either a browser File object (multipart upload -> /parse)
// or a local filesystem path string (fallback -> /parse-local)
export async function parseFile(fileOrPath: File | string, name?: string) {
  // Browser File upload path
  if (typeof File !== "undefined" && fileOrPath instanceof File) {
    const form = new FormData();
    form.append("file", fileOrPath, fileOrPath.name || name || "upload" );
    const { data } = await axios.post(`${BASE}/parse`, form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data.text as string;
  }

  // Fallback: treat as local path (desktop / native environment)
  const fileUri = fileOrPath as string;
  const path = fileUri.startsWith("file://") ? fileUri : `file://${fileUri}`;
  const { data } = await axios.post(`${BASE}/parse-local`, { path });
  return data.text as string;
}

export async function atsCheck(resume_text: string, jd_text: string) {
  const { data } = await axios.post(`${BASE}/ats-check`, { resume_text, jd_text });
  return data.missing_requirements as string[];
}

export async function tailor(resume_text: string, jd_text: string) {
  const { data } = await axios.post(`${BASE}/tailor`, { resume_text, jd_text });
  return data.tailored as string;
}

export async function keywords(resume_text: string, jd_text: string) {
  const { data } = await axios.post(`${BASE}/keywords`, { resume_text, jd_text });
  return data as { keywords: string[]; missing: string[] };
}

export async function inferCompany(jd_text: string) {
  const form = new FormData();
  form.append("jd_text", jd_text);
  const { data } = await axios.post(`${BASE}/infer-company`, form);
  return (data.company as string) || "draft";
}

export async function exportFile(text: string, label: string, fmt: "docx"|"pdf") {
  const { data } = await axios.post(`${BASE}/export`,
    { text, label, fmt },
    { responseType: "blob" as any }
  );
  return data; // caller will persist to disk via RNFS
}
