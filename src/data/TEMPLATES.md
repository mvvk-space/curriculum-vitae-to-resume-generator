# 📋 Resume Data Templates

Copy and paste these snippets directly into your `master-cv.json` file. 

⚠️ **IMPORTANT**: Remember to add a comma (`,`) between items if you are adding more than one!

Adding Thai translation will require manual input. However, fields like "tags, company, start and end date" will be shared between the Thai and English versions and be handled automatically by the build.

---

### 💼 Work Experience
Paste this inside the `"experience": [` list:

```json
{
    "company": "Company Name",
    "role": "Your Job Title",
    "startDate": "Month YYYY",
    "endDate": "Month YYYY or Present",
    "highlights": [
        { "text": "Describe a key responsibility or achievement here.", "tags": ["technical", "management"] },
        { "text": "Describe another point here.", "tags": ["creative"] }
    ]
}
```

---

### 🎓 Education
Paste this inside the `"education": [` list:

```json
{
    "institution": "University or School Name",
    "area": "Degree or Study Area (e.g. B.S. in Computer Science (2020-2024))",
    "tags": ["education"]
}
```

---

### 🛠️ Skill
Paste this inside the `"skills": [` list:

```json
{
    "name": "Skill Name (e.g. JavaScript, Public Speaking)",
    "tags": ["technical", "business"]
}
```

---

### 🏆 Achievement
Paste this inside the `"achievements": [` list:

```json
{
    "text": "Describe your award or accomplishment here.",
    "tags": ["international", "education"]
}
```
