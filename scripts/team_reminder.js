const fs = require('fs');
const path = require('path');

// Configuration
const MATRIX_PATH = 'TEAM_ASSISTANCE_MATRIX.md';
const QUEUE_PATH = 'tasks/QUEUE.md';

async function main() {
    console.log('--- dodo Team Reminder Triggered ---');
    
    if (!fs.existsSync(MATRIX_PATH)) {
        console.error('Matrix file missing.');
        return;
    }

    const matrix = fs.readFileSync(MATRIX_PATH, 'utf8');
    const today = new Date().toISOString().split('T')[0];
    
    // Log task in QUEUE
    if (fs.existsSync(QUEUE_PATH)) {
        let queue = fs.readFileSync(QUEUE_PATH, 'utf8');
        const taskLine = `- [ ] (AUTO) [TASK-REMIND] 執行團隊協助三問提醒 (${today})`;
        if (!queue.includes(taskLine)) {
            queue = queue.replace('## 任務佇列', `## 任務佇列\n${taskLine}`);
            fs.writeFileSync(QUEUE_PATH, queue);
            console.log('Added reminder task to QUEUE.md');
        }
    }

    console.log('Reminder logic initialized. Dodo will now scan for recent interactions and deliver the three-point check for Yijin, David, Penguin, and DreamOne.');
}

main();
