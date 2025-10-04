TAILOR_PROMPT = """You are an expert resume writer.
Rewrite the RESUME to better match the JOB DESCRIPTION, optimizing for ATS keywords, while keeping it strictly truthful and concise. 
Return only the new resume text, no explanations.

RESUME:
{resume}

JOB DESCRIPTION:
{jd}
"""

KEYWORDS_PROMPT = """Extract 20–30 key skills/phrases from the JOB DESCRIPTION that ATS would likely scan for.
Return ONLY a JSON array of strings, e.g. ["Java","Spring Boot","Microservices"].

JOB DESCRIPTION:
{jd}
"""

COMPANY_PROMPT = """From the JOB DESCRIPTION below, identify the hiring company name in a few words.
Return ONLY the company name as plain text.

JOB DESCRIPTION:
{jd}
"""

ATS_ANALYSIS_PROMPT = """You are an ATS (Applicant Tracking System) analyzer.

Compare the RESUME content against the JOB DESCRIPTION requirements.

Identify each individual requirement, skill, qualification, or responsibility mentioned in the JOB DESCRIPTION that is NOT satisfied or missing from the RESUME content.

Return ONLY a JSON array of strings, where each string is a specific requirement/point from the job description that the resume does not adequately address.

Focus on:
- Required technical skills not mentioned in resume
- Specific qualifications or certifications missing
- Key responsibilities or experiences not demonstrated
- Important keywords or phrases absent from resume

RESUME:
{resume}

JOB DESCRIPTION:
{jd}
"""

RESUME_PARSING_PROMPT = """You are an expert resume parser. Extract and categorize the following information from the RESUME text into structured sections.

Return ONLY a valid JSON object with these exact keys, each containing a STRING value:

{{
  "profile": "string containing contact info only",
  "summary": "string containing professional summary",
  "education": "string containing education details", 
  "skills": "string containing skills list",
  "work_experience": "string containing work history",
  "projects": "string containing projects"
}}

CRITICAL RULES:
- ALL values must be plain TEXT STRINGS, never arrays, objects, or nested structures
- Profile: ONLY contact details (name, phone, email, location, LinkedIn URL)
- Summary: Professional summary paragraph describing experience and skills
- Education: Educational background as continuous text with line breaks
- Skills: All skills as continuous text (e.g., "Python, JavaScript, React, AWS, Docker")
- Work Experience: Job history as continuous text with line breaks between jobs
- Projects: Project descriptions as continuous text with line breaks between projects
- Use \\n for line breaks within strings
- If any section is missing, use empty string ""
- DO NOT create arrays, objects, or JSON within JSON
- Preserve original text and formatting where possible

Example output format:
{{
  "profile": "John Doe\\nEmail: john@email.com\\nPhone: (555) 123-4567\\nLocation: San Francisco, CA",
  "summary": "Experienced software engineer with 5 years in web development...",
  "education": "Bachelor of Science in Computer Science\\nUniversity of California, Berkeley\\n2019",
  "skills": "Python, JavaScript, React, Node.js, AWS, Docker, PostgreSQL",
  "work_experience": "Software Engineer at Tech Corp (2019-2024)\\n- Built web applications\\n- Led development team",
  "projects": "E-commerce Platform\\n- Full-stack development\\n- React and Node.js"
}}

RESUME:
{resume}
"""
