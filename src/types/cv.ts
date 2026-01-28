export interface CVHighlight {
    text: string;
    tags: string[];
}

export interface CVJob {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    highlights: CVHighlight[];
}

export interface CVProject {
    name: string;
    description: string;
    tags: string[];
}

export interface CVEducation {
    institution: string;
    area: string;
    highlights?: CVHighlight[];
    tags: string[];
}

export interface CVSkill {
    name: string;
    tags: string[];
}

export interface CVAchievement {
    text: string;
    tags: string[];
}

export interface CVBasics {
    name: string;
    email: string;
    location: string;
    summary?: string;
    image?: string;
    linkedin?: string;
}

export interface MasterCV {
    basics: CVBasics;
    education: CVEducation[];
    experience: CVJob[];
    projects: CVProject[];
    skills: CVSkill[];
    achievements: CVAchievement[];
}
