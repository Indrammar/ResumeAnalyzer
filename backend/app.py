from flask import Flask, request, jsonify
from flask_cors import CORS
import docx2txt
import pdfplumber
from skills_data import job_roles, general_skills, skill_resources
import os

# Create Flask app
app = Flask(__name__)

# Enable CORS for your frontend only
# Replace the URL below with your actual frontend Render URL
CORS(app, origins=["https://resume-analyzer-frontend.onrender.com"])

@app.route('/analyze', methods=['POST'])
def analyze_resume():
    if 'resume' not in request.files:
        return jsonify({"error": "No resume file uploaded"}), 400

    file = request.files['resume']
    jd = request.form.get('jd', "").lower()

    # Parse resume text
    resume_text = ""
    if file.filename.endswith('.pdf'):
        with pdfplumber.open(file) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    resume_text += text + " "
    elif file.filename.endswith('.docx'):
        resume_text = docx2txt.process(file)
    else:
        return jsonify({"error": "Unsupported file format"}), 400

    resume_text = resume_text.lower().strip()

    if not resume_text:
        return jsonify({"error": "Could not extract text from resume (maybe scanned PDF)."}), 400

    # Determine job role from JD
    matched_role = None
    for role in job_roles.keys():
        if role in jd:
            matched_role = role
            break

    # Required skills
    required_skills = job_roles.get(matched_role, [])
    if not required_skills:
        required_skills = [s for cat in general_skills.values() for s in cat]

    # Match vs Missing skills
    matched = [skill for skill in required_skills if skill in resume_text or skill in jd]
    missing = [skill for skill in required_skills if skill not in matched]

    score = round((len(matched) / len(required_skills)) * 100, 2) if required_skills else 0

    # Recommendations
    recommendations = {skill: skill_resources.get(skill, "No resource available") for skill in missing}

    return jsonify({
        "job_role": matched_role if matched_role else "General",
        "matched_skills": matched,
        "missing_skills": missing,
        "score": score,
        "recommendations": recommendations
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
