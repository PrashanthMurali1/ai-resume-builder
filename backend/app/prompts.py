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

Return ONLY a JSON object with these exact keys:
- "profile": Contact information only (name, phone number, email, location, LinkedIn URL, website, etc.) - NO professional summary here
- "summary": Professional summary, objective, or career summary paragraph - the descriptive text about the person's experience and skills
- "education": All educational qualifications, degrees, certifications, courses as formatted text
- "skills": Technical skills, programming languages, tools, frameworks, soft skills as formatted text
- "work_experience": All work experience, internships, job positions with descriptions as formatted text
- "projects": Personal projects, academic projects, side projects with descriptions as formatted text

Guidelines:
- Profile section should ONLY contain contact details (name, phone, email, address, LinkedIn, etc.)
- Summary section should contain the professional summary/objective paragraph describing experience and expertise
- ALL sections must return plain text strings, NOT arrays or objects
- Preserve the original text formatting with line breaks and bullet points where appropriate
- If a section is not present or empty, return an empty string
- Maintain the original formatting and details
- Do not add any information not present in the original resume
- Preserve dates, company names, and specific details
- Format multi-line sections with proper line breaks (\n)

RESUME:
{resume}
"""
