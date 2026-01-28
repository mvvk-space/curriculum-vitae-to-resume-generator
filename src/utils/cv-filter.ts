import type { MasterCV, CVHighlight } from '../types/cv';

/**
 * Robustly parse date strings (even messy ones) into a sortable number.
 */
function parseDateValue(dateStr: string): number {
    if (!dateStr) return 0;
    const s = dateStr.toLowerCase();

    // "Present" or "Today" is always the newest
    if (s.includes('present') || s.includes('today')) return new Date().getTime();

    // Try to extract a 4-digit year
    const yearMatch = s.match(/\d{4}/);
    if (!yearMatch) return 0;
    const year = parseInt(yearMatch[0]);

    // Month mapping for strings like "May 2024" or "2019-06-11"
    const months: Record<string, number> = {
        jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
        jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
    };

    let month = 0;
    for (const [m, val] of Object.entries(months)) {
        if (s.includes(m)) {
            month = val;
            break;
        }
    }

    // Try to extract a day if in YYYY-MM-DD format
    const dayMatch = s.match(/\d{4}-\d{2}-(\d{2})/);
    const day = dayMatch ? parseInt(dayMatch[1]) : 1;

    return new Date(year, month, day).getTime();
}

export function filterCV(cv: MasterCV, targetTags: string[]): MasterCV {
    const filtered = JSON.parse(JSON.stringify(cv)) as MasterCV;

    // 1. Filter Experience Highlights and Sort (Newest First)
    filtered.experience = filtered.experience.map(job => {
        job.highlights = job.highlights.filter((h: CVHighlight) =>
            h.tags.some((tag: string) => targetTags.includes(tag))
        );
        return job;
    }).filter(job => job.highlights.length > 0)
        .sort((a, b) => {
            // Sort by endDate first if available, otherwise startDate
            const dateA = parseDateValue(a.endDate || a.startDate);
            const dateB = parseDateValue(b.endDate || b.startDate);
            return dateB - dateA;
        });

    // 2. Filter Projects
    filtered.projects = (filtered.projects || []).filter(proj =>
        proj.tags.some(tag => targetTags.includes(tag))
    );

    // 3. Keep All Education and Sort (Newest First)
    filtered.education = (filtered.education || []).sort((a, b) => parseDateValue(b.area) - parseDateValue(a.area));

    // 4. Filter Skills
    filtered.skills = (filtered.skills || []).filter(skill =>
        skill.tags.some(tag => targetTags.includes(tag))
    );

    // 5. Keep All Achievements
    filtered.achievements = (filtered.achievements || []);

    return filtered;

    return filtered;
}
