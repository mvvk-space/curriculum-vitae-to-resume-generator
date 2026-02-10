
import fs from 'node:fs';
import path from 'node:path';
import masterCVEn from '../data/master-cv.json';
import masterCVTh from '../data/master-cv-th.json';

const ESC = '\x1b';
const RED = `${ESC}[31m`;
const GREEN = `${ESC}[32m`;
const YELLOW = `${ESC}[33m`;
const RESET = `${ESC}[0m`;

let hasError = false;

function checkArrayLength(section: string, arrEn: any[], arrTh: any[]) {
    if (!arrEn || !arrTh) return;

    if (arrEn.length !== arrTh.length) {
        console.error(`${RED}[ERROR] ${section} Mismatch!${RESET}`);
        console.error(`  English: ${arrEn.length} items`);
        console.error(`  Thai:    ${arrTh.length} items`);
        console.error(`${YELLOW}  -> You must add a corresponding entry to master-cv-th.json (even if empty) to keep translations aligned.${RESET}\n`);
        hasError = true;
    } else {
        console.log(`${GREEN}[OK]${RESET} ${section}: Synced (${arrEn.length} items)`);
    }
}

console.log(`${YELLOW}Checking CV Synchronization...${RESET}`);

checkArrayLength('Experience', masterCVEn.experience, masterCVTh.experience);
checkArrayLength('Education', masterCVEn.education, masterCVTh.education);
checkArrayLength('Skills', masterCVEn.skills, masterCVTh.skills);
checkArrayLength('Achievements', masterCVEn.achievements, masterCVTh.achievements);

if (hasError) {
    console.error(`${RED}CV Synchronization Check Failed.${RESET}`);
    process.exit(1);
} else {
    console.log(`${GREEN}CVs are synchronized.${RESET}\n`);
}
