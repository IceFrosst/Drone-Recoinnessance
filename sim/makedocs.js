// Regenerate docs/RESULTS.md from every results/*.md, newest experiments last, with the ledger total.
const fs = require('fs'), path = require('path');
const R = path.join(__dirname, '..', 'results'), D = path.join(__dirname, '..', 'docs');
const order = ['e00-baseline','e01-merged-baseline','e02-frontend','e03-countermeasures','e04-nulling-limit','e05-headline','e06-modern-battlefield','e07-validation','e08-altitude','e09-plan'];
const have = fs.readdirSync(R).filter(f => f.endsWith('.md')).map(f => f.replace('.md',''));
const names = order.filter(n => have.includes(n)).concat(have.filter(n => !order.includes(n)));
let ledger = { total: 0 }; try { ledger = JSON.parse(fs.readFileSync(path.join(R,'ledger.json'))); } catch(e){}
let md = `# Experiment results\n\nAuto-generated from \`results/*.md\` by \`sim/makedocs.js\`. Total campaigns run across all experiments: **${ledger.total.toLocaleString('en-US')}** (ledger: \`results/ledger.json\`). Every table is paired — all variants fly the same maps and altitudes. All numbers are modelled, not field data.\n`;
// Navigable index: pull each experiment's title (first non-empty "### ..." line) so a reader can jump around.
const titleOf = n => { const t = fs.readFileSync(path.join(R, n + '.md'),'utf8').split('\n').find(l => l.startsWith('### ')); return t ? t.replace(/^###\s*/,'') : n; };
md += `\n## Index\n\n` + names.map(n => `- **${n}** — ${titleOf(n)}`).join('\n') + '\n';
for (const n of names) md += `\n${fs.readFileSync(path.join(R, n + '.md'),'utf8')}\n\n---\n`;
fs.writeFileSync(path.join(D,'RESULTS.md'), md);
console.log('RESULTS.md:', names.length, 'experiments,', ledger.total, 'campaigns');
