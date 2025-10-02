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
