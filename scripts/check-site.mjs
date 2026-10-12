import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const dir=path.resolve('dist'),html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
assert.ok(html.includes('id="totalCard"'));
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
 const url=match[1];if(/^(?:https?:|data:)/.test(url))continue;
 assert.ok(!url.startsWith('/'),'Use project-relative asset paths: '+url);
 assert.ok(fs.existsSync(path.join(dir,url.split('?')[0])),'Missing asset: '+url);
}
for(const file of ['model.js','app.js','importer.js','casebook.js','ocr.js','ocr-table.js','vendor/ocr/worker.min.js','vendor/ocr/eng.traineddata.gz','vendor/ocr/chi_sim.traineddata.gz','vendor/pdfjs/pdf.min.js','vendor/pdfjs/pdf.worker.min.js'])assert.ok(fs.existsSync(path.join(dir,file)),file);
console.log('Static entry points and project-relative assets verified.');
