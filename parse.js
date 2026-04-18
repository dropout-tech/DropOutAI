const fs = require('fs');
const data = JSON.parse(fs.readFileSync('history2.json', 'utf8'));
data.reverse().forEach(m => {
  console.log(`[${m.timestamp}] ${m.author.username}: ${m.content}`);
});