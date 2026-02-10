import type { MasterCV, CVHighlight } from '../types/cv';

/**
 * Merges English CV (source of truth for structure/dates/tags) with Thai CV (source of truth for text).
 * The Thai CV is expected to have the same array order as the English CV.
 */
export function mergeCV(english: MasterCV, thai: Partial<MasterCV>): MasterCV {
    // Deep clone English CV to avoid mutating source
    const merged = JSON.parse(JSON.stringify(english)) as MasterCV;

    // 1. Basics
    if (thai.basics) {
        merged.basics.name = thai.basics.name || merged.basics.name;
        // merged.basics.label = thai.basics.label || merged.basics.label; // Property 'label' does not exist on type 'CVBasics'
        merged.basics.summary = thai.basics.summary || merged.basics.summary;
        merged.basics.location = thai.basics.location || merged.basics.location;
        // Keep English email, phone, url, profiles unless overridden
    }

    // 2. Experience
    if (thai.experience) {
        merged.experience = merged.experience.map((engJob, i) => {
            const thaiJob = thai.experience?.[i];
            if (!thaiJob) return engJob; // No translation available, keep English

            // Merge fields
            const newJob = { ...engJob };
            if (thaiJob.company) newJob.company = thaiJob.company;
            if (thaiJob.role) newJob.role = thaiJob.role;
            // if (thaiJob.location) newJob.location = thaiJob.location; // Property 'location' does not exist on type 'CVJob'
            // Keep English dates and tags

            // Merge Highlights
            if (thaiJob.highlights) {
                newJob.highlights = engJob.highlights.map((engH, j) => {
                    const thaiH = thaiJob.highlights?.[j];
                    if (!thaiH) return engH;

                    return {
                        ...engH,
                        text: thaiH.text || engH.text,
                        // Tags strictly from English
                    };
                });
            }
            return newJob;
        });
    }

    // 3. Education
    if (thai.education) {
        merged.education = merged.education.map((engEdu, i) => {
            const thaiEdu = thai.education?.[i];
            if (!thaiEdu) return engEdu;

            const newEdu = { ...engEdu };
            if (thaiEdu.institution) newEdu.institution = thaiEdu.institution;
            if (thaiEdu.area) newEdu.area = thaiEdu.area;
            // if (thaiEdu.studyType) newEdu.studyType = thaiEdu.studyType; // Property 'studyType' does not exist on type 'CVEducation'
            // Keep English dates and tags

            // Merge Highlights
            if (thaiEdu.highlights) {
                newEdu.highlights = engEdu.highlights?.map((engH, j) => {
                    const thaiH = thaiEdu.highlights?.[j];
                    if (!thaiH) return engH;

                    return {
                        ...engH,
                        text: thaiH.text || engH.text,
                        // Tags strictly from English
                    };
                });
            }

            return newEdu;
        });
    }

    // 4. Skills
    if (thai.skills) {
        merged.skills = merged.skills.map((engSkill, i) => {
            const thaiSkill = thai.skills?.[i];
            if (!thaiSkill) return engSkill;

            const newSkill = { ...engSkill };
            if (thaiSkill.name) newSkill.name = thaiSkill.name;
            // Keep English tags
            return newSkill;
        });
    }

    // 5. Achievements
    if (thai.achievements) {
        merged.achievements = merged.achievements.map((engAch, i) => {
            const thaiAch = thai.achievements?.[i];
            if (!thaiAch) return engAch;

            const newAch = { ...engAch };
            if (thaiAch.text) newAch.text = thaiAch.text;
            // Keep English tags
            return newAch;
        });
    }

    // projects - rarely used but good to have matching logic if needed
    if (thai.projects) {
        merged.projects = merged.projects.map((engProj, i) => {
            const thaiProj = thai.projects?.[i];
            if (!thaiProj) return engProj;
            const newProj = { ...engProj };
            if (thaiProj.name) newProj.name = thaiProj.name;
            if (thaiProj.description) newProj.description = thaiProj.description;
            // Keep English tags
            return newProj;
        })
    }

    return merged;
}
