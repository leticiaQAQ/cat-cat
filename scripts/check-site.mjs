import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const dir=path.resolve('dist'),html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
assert.ok(html.includes('id="totalCard"'));
assert.ok(!/\\u[0-9a-fA-F]{4}/.test(html),'HTML must not contain literal Unicode escape sequences');
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
 const url=match[1];if(/^(?:https?:|data:|mailto:)/.test(url))continue;
 assert.ok(!url.startsWith('/'),'Use project-relative asset paths: '+url);
 assert.ok(fs.existsSync(path.join(dir,url.split('?')[0])),'Missing asset: '+url);
}
for(const file of ['model.js','app.js','importer.js','casebook.js','ocr.js','ocr-table.js','vendor/ocr/worker.min.js','vendor/ocr/eng.traineddata.gz','vendor/ocr/chi_sim.traineddata.gz','vendor/pdfjs/pdf.min.js','vendor/pdfjs/pdf.worker.min.js'])assert.ok(fs.existsSync(path.join(dir,file)),file);
const extraAsset='i18n-ja-ar.js';
assert.ok(html.indexOf(extraAsset)>0 && html.indexOf(extraAsset)<html.indexOf('i18n.js'), 'Load added languages before the base dictionary');
for(const lang of ['ja','ar'])assert.ok(html.includes(`value="${lang}"`), `Missing ${lang} language option`);
const context={window:{},localStorage:{getItem:()=>null}};
for(const file of [extraAsset,'i18n.js'])vm.runInNewContext(fs.readFileSync(path.join(dir,file),'utf8'),context,{filename:file});
for(const [key,row] of Object.entries(context.window.CatI18n.dictionary)){
  const expected=[...row.en.matchAll(/\{\w+\}/g)].map(match=>match[0]).sort();
  for(const lang of ['ja','ar']){
    assert.ok(row[lang], `Missing ${lang} translation for ${key}`);
    assert.deepEqual([...row[lang].matchAll(/\{\w+\}/g)].map(match=>match[0]).sort(),expected, `Placeholder mismatch for ${lang}: ${key}`);
  }
}
console.log('Static entry points and project-relative assets verified.');
