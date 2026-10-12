(function(){
  'use strict';
  const M=window.CatModel;
  const I=window.CatI18n,t=I.t,Import=window.CatImport;
  const KEY='catcat-demo-v1',Cases=window.CatCases,book=Cases.create(localStorage);
  let currentCaseId=null,caseName='',caseMessage=null;
  const $=id=>document.getElementById(id);
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const copy=s=>JSON.parse(JSON.stringify(s));
  const fmt=n=>Number(n).toLocaleString(I.locale,{maximumFractionDigits:2});
  const signed=n=>(n>0?'+':'')+fmt(n);
  let state=copy(M.presets.moderate),reference=null,referenceAt=null,currentTab='assessment',allFactors=false,toastTimer;
  let canStore=true,caseKind='example',provenance=[],undo=null,importData=null,importSheets=[],importGeneration=0,importMessage=null,importProgress=null,importMeta=null,selectedReportFile=null,readingReport=false;
  I.capture(document);I.apply();$('language').value=I.lang;
  try{const saved=JSON.parse(localStorage.getItem(KEY));if(saved&&[M.version,'demo-rules-1.0'].includes(saved.version)){if(saved.state)state=M.sanitize(saved.state);if(saved.reference&&M.evaluate(M.sanitize(saved.reference)).valid){reference=M.sanitize(saved.reference);referenceAt=saved.referenceAt;}currentCaseId=saved.currentCaseId||null;caseName=saved.caseName||'';caseKind=saved.caseKind||'example';provenance=Array.isArray(saved.provenance)?saved.provenance:[];}}catch{canStore=false;}
  function save(){try{localStorage.setItem(KEY,JSON.stringify({version:M.version,state,reference,referenceAt,caseKind,provenance,currentCaseId,caseName}));}catch{canStore=false;}}
  function toast(msg){$('toast').textContent=msg;$('toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').hidden=true,3200);}
  function fieldHtml(f){
    const name=escape(t(f.label));
    let input;
    if(f.type==='check')input=`<select id="${f.id}" data-field="${f.id}" aria-describedby="hint-${f.id} error-${f.id}"><option value="">${escape(t('待確認'))}</option><option value="true">${escape(t('有'))} (+${f.score})</option><option value="false">${escape(t('無'))}</option></select>`;
    else if(f.type==='select')input=`<select id="${f.id}" data-field="${f.id}" aria-describedby="hint-${f.id} error-${f.id}"><option value="">${escape(t('待確認'))}</option>${f.options.map(o=>`<option value="${o[0]}">${escape(t(o[1]))}</option>`).join('')}</select>`;
    else if(f.type==='text')input=`<input type="text" id="${f.id}" data-field="${f.id}" maxlength="${f.maxLength}" autocomplete="off" aria-describedby="hint-${f.id} error-${f.id}">`;
    else input=`<input type="number" id="${f.id}" data-field="${f.id}" min="${f.min}" max="${f.max}" step="${f.step}" inputmode="${f.step===1?'numeric':'decimal'}" aria-describedby="hint-${f.id} error-${f.id}"><span class="unit">${escape(t(f.unit))}</span>`;
    return `<div class="field" id="field-${f.id}"><label for="${f.id}">${name}</label><div class="field-input">${input}</div><p class="hint" id="hint-${f.id}">${escape(t(f.hint||''))}</p><div class="field-error" id="error-${f.id}" hidden></div></div>`;
  }
  function initFields(){
    const openGroups=[...document.querySelectorAll('.cat-group')].map(g=>g.open);
    $('caseFields').innerHTML=M.groups[0].fields.map(fieldHtml).join('');
    $('catGroups').innerHTML=M.groups.slice(1).map((g,i)=>`<details class="cat-group" ${openGroups.length?openGroups[i]?'open':'':i===0?'open':''}><summary><span class="group-letter">${['A','B','C'][i]}</span><span class="group-name">${escape(t(g.title))}<small>${g.en}</small></span><span class="group-total" id="group-${g.id}"></span><span class="chevron">⌄</span></summary><div class="fields-grid">${g.fields.map(fieldHtml).join('')}</div></details>`).join('');
  }
  initFields();
  function sync(){for(const f of M.fields){const el=$(f.id);el.value=f.type==='check'?(state[f.id]===null?'':String(state[f.id])):state[f.id];}}
  function updateField(el){
    const id=el.dataset.field;
    if(!id)return;
    const f=M.fields.find(f=>f.id===id);
    state[id]=f.type==='check'?(el.value===''?null:el.value==='true'):el.value;
    $('preset').value='';
    provenance=provenance.filter(p=>p.field!==id);render();save();
    $('draftStatus').textContent=t(canStore?'本機草稿已更新':'目前瀏覽器無法保留草稿');
  }
  for(const id of ['profileForm','catForm']){
    $(id).addEventListener('input',e=>updateField(e.target));
    $(id).addEventListener('change',e=>updateField(e.target));
    $(id).addEventListener('submit',e=>e.preventDefault());
  }
  function render(){
    const result=M.evaluate(state);renderCases();
    $('caseBadge').textContent=t(caseKind==='example'?'合成示例':'患者病例');
    $('totalCaseKind').textContent=t(caseKind==='example'?'合成示例':'患者病例');$('scoreRuleVersion').textContent=M.version;
    const required=M.fields.filter(f=>f.group!=='case'&&M.active(f,state));
    const pending=required.filter(f=>result.errors?.[f.id]);
    $('completionText').textContent=t('CAT-CAT 完整度 {done} / {total}',{done:required.length-pending.length,total:required.length});
    $('completionHelp').textContent=t(pending.length?'尚有 {count} 項待補齊或確認，總分顯示 —。':'必填項目已齊全，可核對總分與逐項分數。',{count:pending.length});
    $('pendingFields').innerHTML=pending.slice(0,6).map(f=>`<button class="pending-chip" data-focus="${f.id}">${escape(t(f.label))}</button>`).join('')+(pending.length>6?`<span class="tiny-note">${escape(t('另有 {count} 項',{count:pending.length-6}))}</span>`:'');
    $('undoImportBtn').hidden=!undo;
    for(const f of M.fields){
      const err=result.errors?.[f.id],el=$(f.id),container=$('field-'+f.id);
      container.hidden=!M.active(f,state);container.classList.toggle('error',!!err);
      el.setAttribute('aria-invalid',err?'true':'false');
      $('error-'+f.id).textContent=I.error(err,f);$('error-'+f.id).hidden=!err;
    }
    $('invalidNotice').hidden=result.valid;$('resultContent').hidden=!result.valid;
    $('baseline').textContent=result.valid?fmt(result.baseline):'—';$('baselineDetails').hidden=!result.valid;
    $('baselineStatus').textContent=t(result.valid?'文獻項目加總 · 無固定滿分':'待補齊必填項目後計算總分');
    for(const id of ['exportBtn','snapshotBtn','compareSnapshotBtn','emptySnapshotBtn'])$(id).disabled=!result.valid;
    for(const g of M.groups.slice(1))$('group-'+g.id).textContent=result.valid?fmt(result.domains[g.id])+' '+t('分'):t('待確認');
    if(!result.valid){$('invalidNotice').textContent=t('請修正 {count} 項輸入後查看結果。',{count:Object.keys(result.errors).length});renderCompare();return;}

    $('domainBars').innerHTML=M.groups.slice(1).map(g=>`<div class="domain-row"><span>${escape(t(g.title))}</span><div class="domain-bar"><div style="width:${result.baseline?result.domains[g.id]/result.baseline*100:0}%"></div></div><span>${fmt(result.domains[g.id])}</span></div>`).join('');
    $('scoreBreakdown').innerHTML=result.entries.map(e=>`<div class="breakdown-row"><span>${escape(t(e.label))}</span><strong>${fmt(e.score)} ${t('分')}</strong></div>`).join('');
    const breakdownOpen=!$('scoreBreakdown').hidden;
    $('breakdownToggle').innerHTML=escape(t(breakdownOpen?'收合逐項評分':'查看逐項評分'))+` <span>${breakdownOpen?'−':'＋'}</span>`;
    const shown=allFactors?result.factors:result.factors.slice(0,5);
    const max=result.factors[0]?.score||1;
    $('factors').innerHTML=shown.length?shown.map((f,i)=>`<div class="factor-row" style="display:grid;grid-template-columns:36px minmax(0,1fr) auto;gap:12px;align-items:start;background:#faf7fd;border:1px solid #d9c9e5;border-radius:10px;padding:14px;margin:0 0 12px"><span class="factor-rank" style="display:block;background:#e9dcf5;color:#513466;border-radius:6px;padding:5px 0;text-align:center;font:700 16px/1.5 ui-monospace,monospace">${String(i+1).padStart(2,'0')}</span><div style="min-width:0"><div class="factor-label" style="display:flex;align-items:center;justify-content:flex-start;flex-wrap:wrap;gap:6px;color:#432857;font-size:18px;line-height:1.5;overflow-wrap:anywhere">${escape(t(f.label))}<span class="factor-origin" style="display:inline-block;background:#fff;border:1px solid #d9c9e5;border-radius:4px;padding:1px 6px;color:#655174;font-size:15px;white-space:nowrap">${escape(t(f.origin))}</span></div><div class="factor-bar" style="height:6px;background:#e5d7f0;border-radius:4px;margin-top:10px;overflow:hidden"><div style="width:${f.score/max*100}%;height:100%;background:#69409a"></div></div></div><strong class="factor-value" style="color:#69409a;font:700 22px/1.5 ui-monospace,monospace;white-space:nowrap;text-align:right">+${fmt(f.score)}</strong></div>`).join(''):`<p class="tiny-note">${escape(t('目前所有 CAT-CAT 項目均為 0 分。'))}</p>`;
    $('factorsToggle').hidden=result.factors.length<=5;
    $('factorsToggle').innerHTML=escape(t(allFactors?'收合影響因素':'展開全部影響因素'))+` <span>${allFactors?'−':'＋'}</span>`;
    $('factorsToggle').setAttribute('aria-expanded',String(allFactors));
    $('factorNote').textContent=t('逐項分數加總 = {total} 分。',{total:fmt(result.baseline)});
    renderCompare();
  }
  function displayValue(f,v){
    if(f.type==='check')return t(v?'有':'無');
    if(f.type==='select')return t(f.options?.find(o=>o[0]===v)?.[1]||String(v));
    return String(v)+(f.unit?' '+t(f.unit):'');
  }
  function renderCompare(){
    $('compareEmpty').hidden=!!reference;$('compareContent').hidden=!reference;
    if(!reference)return;
    const a=M.evaluate(reference),b=M.evaluate(state),d=M.diff(reference,state);
    $('referenceId').textContent=reference.caseId;$('currentId').textContent=state.caseId;
    $('referenceBaseline').textContent=fmt(a.baseline);
    $('referenceSaved').textContent=t('固定參考 · ')+(referenceAt?new Date(referenceAt).toLocaleString(I.locale,{hour12:false}):t('已儲存'));
    $('currentBaseline').textContent=b.valid?fmt(b.baseline):'—';
    $('baselineDelta').textContent=d?signed(d.baseline):'—';
    $('baselineDelta').classList.toggle('increase',!!d&&d.baseline>0);
    $('deltaCaption').textContent=!d?t('目前輸入尚未完整，請修正後再比較。'):d.baseline===0?t('CAT-CAT 總分相同，請查看輸入與逐項分數差異。'):t('目前病例 CAT-CAT 總分{direction} {amount} 分；分數差異不代表治療效果。',{direction:t(d.baseline>0?'增加':'降低'),amount:fmt(Math.abs(d.baseline))});
    const max=b.valid?Math.max(1,a.baseline,b.baseline):1;
    $('comparisonChart').innerHTML=b.valid?`<div class="compare-bar-row"><span>${t('參考病例')}</span><div class="track"><div style="width:${a.baseline/max*100}%"></div></div><strong>${fmt(a.baseline)}</strong></div><div class="compare-bar-row current"><span>${t('目前病例')}</span><div class="track"><div style="width:${b.baseline/max*100}%"></div></div><strong>${fmt(b.baseline)}</strong></div><div class="chart-caption">${t('CAT-CAT 總分 · 同一刻度 0–{max} 分',{max:fmt(max)})}</div>`:'';
    $('changeCount').textContent=d?t('{count} 項變動',{count:d.fields.length}):t('輸入待修正');
    $('changesBody').innerHTML=!d?`<tr><td colspan="3" class="no-changes">${t('請先修正目前輸入。')}</td></tr>`:d.fields.length?d.fields.map(f=>`<tr><td>${escape(t(f.label))}</td><td>${escape(displayValue(f,f.before))}</td><td>${escape(displayValue(f,f.after))}</td></tr>`).join(''):`<tr><td colspan="3" class="no-changes">${t('尚無輸入變動，前往病例評估調整條件。')}</td></tr>`;
  }
  function switchTab(tab){
    if(!['assessment','compare','method'].includes(tab))return;
    currentTab=tab;
    for(const id of ['assessment','compare','method'])$(id).hidden=id!==tab;
    document.querySelectorAll('.nav-button').forEach(b=>{const active=b.dataset.tab===tab;b.classList.toggle('active',active);if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
    $('breadcrumb').textContent=t({assessment:'病例評估',compare:'情境比較',method:'計算方法'}[tab]);
    try{history.replaceState(null,'','#'+tab);}catch{}
    renderCompare();
    window.scrollTo({top:0,behavior:'auto'});
  }
  document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>switchTab(b.dataset.tab)));
  document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();switchTab('assessment');});
  function loadPreset(id){if(!M.presets[id])return;clearImport();state=copy(M.presets[id]);caseKind='example';provenance=[];undo=null;currentCaseId=null;caseName=state.caseId;syncCaseName();$('preset').value=id;$('scoreBreakdown').hidden=true;$('domainBars').hidden=true;$('breakdownToggle').setAttribute('aria-expanded','false');sync();render();save();$('draftStatus').textContent=t('已載入合成示例病例');toast(t('已載入合成示例病例'));}
  $('preset').addEventListener('change',()=>loadPreset($('preset').value));
  $('resetBtn').addEventListener('click',()=>{state=copy(M.defaults);caseKind='example';provenance=[];undo=null;currentCaseId=null;caseName=state.caseId;syncCaseName();$('preset').value='moderate';sync();render();save();$('draftStatus').textContent=t('已重設為示例 02');toast(t('目前輸入已重設；參考病例仍保留。'));});
  function takeSnapshot(){if(!M.evaluate(state).valid){toast(t('請先修正輸入。'));return;}reference=copy(state);referenceAt=new Date().toISOString();save();renderCompare();switchTab('compare');toast(t(canStore?'已將目前病例固定為本機參考。':'已固定參考；此瀏覽器無法持久儲存。'));}
  for(const id of ['snapshotBtn','compareSnapshotBtn','emptySnapshotBtn'])$(id).addEventListener('click',takeSnapshot);
  $('restoreBtn').addEventListener('click',()=>{if(!reference)return;state=copy(reference);currentCaseId=null;caseName=state.caseId;syncCaseName();caseKind='patient';provenance=[];undo=null;$('preset').value='';sync();render();save();switchTab('assessment');toast(t('已恢復參考病例的輸入值。'));});
  $('clearReferenceBtn').addEventListener('click',()=>{reference=null;referenceAt=null;save();renderCompare();toast(t('參考病例已清除。'));});
  $('breakdownToggle').addEventListener('click',()=>{const open=$('scoreBreakdown').hidden;$('scoreBreakdown').hidden=!open;$('domainBars').hidden=!open;$('breakdownToggle').setAttribute('aria-expanded',String(open));render();});
  $('factorsToggle').addEventListener('click',()=>{allFactors=!allFactors;render();});
  function localizeResult(result){return {...result,entries:result.entries.map(e=>({...e,label:t(e.label)})),factors:result.factors.map(f=>({...f,label:t(f.label),origin:t(f.origin)}))};}
  function report(){const result=M.evaluate(state);if(!result.valid)return null;const difference=reference?M.diff(reference,state):null;if(difference)difference.fields=difference.fields.map(f=>({...f,label:t(f.label),unit:t(f.unit),options:f.options?.map(o=>[o[0],t(o[1])])}));return {calculator:'CAT-CAT',interfaceVersion:'1.10',savedCaseId:currentCaseId,caseName,language:I.lang,caseKind,inputLabels:Object.fromEntries(M.fields.map(f=>[f.id,t(f.label)])),version:M.version,createdAt:new Date().toISOString(),notes:'Published item scoring adaptation. Synthetic examples are explicitly marked. Unassessed fields are not treated as zero. Verify all case inputs.',baselineSource:'Long et al. BMC Oral Health 2020;20:312. doi:10.1186/s12903-020-01300-6, Table 1',input:copy(state),results:localizeResult(result),importedMeasurements:copy(provenance),reference:reference?{input:copy(reference),savedAt:referenceAt,results:localizeResult(M.evaluate(reference)),difference}:null,formula:'CAT-CAT = dental + radiographic + clinical item scores',boundaryPolicy:'At overlapping source interval endpoints, choose the lower score. Continuous proportional scoring for spacing and rotation.'};}
  $('exportBtn').addEventListener('click',()=>{const data=report();if(!data)return;const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='CAT-CAT_'+state.caseId.replace(/[^a-zA-Z0-9_-]/g,'_')+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);toast(t('已匯出病例輸入、逐項評分、資料來源與比較結果。'));});
  $('language').addEventListener('change',()=>{const value=$('preset').value;I.set($('language').value);initFields();sync();$('preset').value=value;render();renderImport();$('breadcrumb').textContent=t({assessment:'病例評估',compare:'情境比較',method:'計算方法'}[currentTab]);$('draftStatus').textContent=t(canStore?'本機草稿自動保留':'草稿僅限目前開啟期間');toast(t('語言已切換，病例輸入與參考值已保留。'));});
  const importErrors={tooLarge:'檔案或資料表過大，請縮減至單一患者的測量資料。',unsupported:'此格式尚不支援，請使用 PDF、DOCX、XLSX、CSV、TSV、TXT、JSON、HTML 或 Markdown。',multipleCases:'資料包含多位患者或多個時間點，請先保留要匯入的一位患者與一個時間點。',ambiguousColumns:'患者數值欄不明確，請以「測量項目、測量值、單位」整理資料。',noPatientColumn:'資料只有正常值或未明確標示患者值，請新增「測量值」欄。',scannedPdf:'PDF 未找到可讀文字，請改用測量表或可選取文字的 PDF。',tooManyPages:'PDF 超過 30 頁，請只保留頭影測量資料頁。',badData:'無法讀取資料，請核對檔案內容或改用 CSV 範本。',readerUnavailable:'讀取元件未載入，請重新整理後再試。',ocrUnavailable:'影像文字辨識無法啟動，請改用文字報告或手動填入。',tooManyOcrPages:'掃描 PDF 最多辨識 10 頁，請保留測量資料頁。',imageTooLarge:'影像超過 2,000 萬像素，請先裁切測量資料區。',noOcrText:'未找到可讀文字，請使用清晰的測量報告截圖。',pdfReaderUnavailable:'報告讀取元件未能載入，請重新整理後重試，或貼上報告文字。',encryptedPdf:'PDF 需要密碼，請先另存為無密碼的報告再匯入。',invalidPdf:'PDF 格式損壞或無效，請重新匯出測量報告。',fileReadFailed:'檔案未能讀取，請重新選擇檔案。'};
  const reasons={matched:'名稱與數值已對應',confirmEline:'請確認唇參考與正負方向，再勾選',differentReference:'參考平面或唇位置不同，請手動核對',notNumeric:'缺少有效數值',unitMismatch:'單位不符，不填入',outOfRange:'超出欄位範圍，不填入',ambiguousColumns:'數值欄不明確，不填入',conflict:'同一項目數值衝突，請選擇確認一個值',confirmLip:'請確認採用上唇或下唇及正負方向',unmapped:'尚未對應，可手動選擇欄位',manualMapping:'手動對應，請勾選確認',confirmed:'已由使用者確認',ocrReview:'影像文字辨識值，請逐項核對後勾選',ocrLabelReview:'名稱可能為 U1–SN，請對照原圖確認',ocrNumericConflict:'兩次數值讀取不一致，請核對原圖並手動輸入'};
  function importStatus(message,error=false,params={}){const key=Object.entries(I.dictionary).find(([,values])=>Object.values(values).includes(message))?.[0]||message;importMessage=message?{key,error,params}:null;refreshImportStatus();}
  function refreshImportStatus(){$('importStatus').hidden=!importMessage;$('importStatus').textContent=importMessage?t(importMessage.key,Object.fromEntries(Object.entries(importMessage.params||{}).map(([k,v])=>[k,typeof v==='string'&&I.dictionary[v]?t(v):v]))):'';$('importStatus').classList.toggle('import-error',!!importMessage?.error);}
  function clearImport(){importGeneration++;selectedReportFile=null;readingReport=false;$('readReportBtn').disabled=true;importData=null;importSheets=[];importMeta=null;importProgress=null;renderImportProgress();$('importRows').replaceChildren();$('importPreview').hidden=true;$('cephFile').value='';$('cephText').value='';importStatus('');}
  function renderImport(){
    refreshImportStatus();renderImportProgress();
    if(!importData){$('importPreview').hidden=true;return;}
    $('importPreview').hidden=false;
    const selected=importData.candidates.filter(c=>c.valid&&c.selected).length;
    $('previewSummary').textContent=t('已對應 {count} 項，已勾選 {selected} 項；另有 {other} 個數值可手動對應。',{count:importData.candidates.filter(c=>c.field).length,selected,other:importData.candidates.filter(c=>!c.field).length});
    $('extractionSummary').textContent=importMeta?.pages?t('已讀取 {pages} 頁、{rows} 行資料；請核對實測值，勿採用正常值。',{pages:importMeta.pages,rows:importMeta.rows}):t('請核對來源數值與單位；缺失項目留空。');
    const visible=importData.candidates.map((c,i)=>({c,i})).filter(({c})=>$('showUnmapped').checked||c.field||c.review);
    $('importRows').innerHTML=visible.length?visible.map(({c,i})=>{const f=M.fields.find(f=>f.id===c.field),origins=c.origins||[],pages=[...new Set(origins.map(o=>o.page).filter(Boolean))],origin=pages.length?t('頁碼 {pages}',{pages:pages.join(', ')}):t('來源行 {line}',{line:origins[0]?.line||'—'});return `<tr><td><input type="checkbox" data-import="${i}" ${c.canConfirm?'':'disabled'} ${c.selected?'checked':''} aria-label="${escape(t('填入 {label}',{label:t(f?.label||c.label)}))}"></td><td>${escape(c.label)}${c.excerpt?`<span class="source-excerpt">${escape(c.excerpt)}</span>`:''}${c.sourceCrop?.startsWith('data:image/png;base64,')?`<img class="ocr-source" src="${escape(c.sourceCrop)}" alt="${escape(t('來源測量截圖'))}">`:''}<small class="import-origin">${escape(origin)}${origins.length>1?' · '+escape(t('{count} 次出現',{count:origins.length})):''}${origins[0]?.section?' · '+escape(origins[0].section):''}</small></td><td>${escape(c.value!==null?fmt(c.value):c.raw)} ${escape(c.unit)}</td><td><select data-map="${i}" aria-label="${escape(t('選擇 {label} 的對應欄位',{label:c.label}))}"><option value="">${escape(t('不填入'))}</option>${M.fields.filter(f=>!f.type).map(f=>`<option value="${f.id}" ${c.field===f.id?'selected':''}>${escape(t(f.label))} (${escape(t(f.unit))})</option>`).join('')}</select><span class="import-reason ${c.selected?'':'blocked'}">${escape(t(reasons[c.reason]||reasons.unmapped))}</span></td></tr>`;}).join(''):`<tr><td colspan="4">${escape(t('沒有找到可對應項目；可顯示其他數值並手動對應，或直接補填。'))}</td></tr>`;
    $('applyImportBtn').disabled=selected===0;
    $('sheetControl').hidden=importSheets.length<2;
    $('importModeHelp').textContent=t($('importMode').value==='new'?'建立新病例會清除目前輸入中的示例值；參考病例仍保留。':'只替換勾選項目，其餘輸入與參考病例保留。請確認目前病例是同一位患者。');
  }
  function setSheets(sheets){$('importMode').value='new';importSheets=sheets;$('importSheet').innerHTML=sheets.map((s,i)=>`<option value="${i}">${escape(s.name)}</option>`).join('');selectSheet(0);}
  function selectSheet(index){try{importMeta=importSheets[index].meta||null;importData=Import.analyze(importSheets[index].rows);importProgress={stage:'review'};importStatus('');renderImport();if(!importData.candidates.some(c=>c.field)){importStatus('報告已讀取，但尚未找到自動對應項目。可顯示其他數值並手動對應，或貼上測量文字。');}}catch(e){importData={candidates:[],ignored:0};renderImport();importStatus(t(importErrors[e.message]||importErrors.badData),true);}}
  function parseImportText(text){importGeneration++;try{setSheets([{name:t('貼上文字'),rows:Import.textRows(text)}]);return importData;}catch(e){importData=null;renderImport();importStatus(t(importErrors[e.message]||importErrors.badData),true);return null;}}
  function applyImport(){
    const selected=importData?.candidates.filter(c=>c.valid&&c.selected)||[];if(!selected.length)return;
    undo={state:copy(state),caseKind,provenance:copy(provenance),currentCaseId,caseName};
    if($('importMode').value==='new'){state=M.blank();caseKind='patient';provenance=[];currentCaseId=null;caseName=state.caseId;syncCaseName();}
    for(const c of selected){state[c.field]=c.value;provenance=provenance.filter(p=>p.field!==c.field);provenance.push({field:c.field,sourceMeasurement:c.label,value:c.value,unit:M.fields.find(f=>f.id===c.field).unit,origins:copy(c.origins||[]),confirmation:c.reason,importedAt:new Date().toISOString()});}
    $('preset').value='';clearImport();sync();render();save();switchTab('assessment');
    const message=t('已填入 {count} 項；請手動補齊其餘資料。',{count:selected.length});importStatus('已填入 {count} 項；請手動補齊其餘資料。',false,{count:selected.length});$('draftStatus').textContent=t('已匯入測量資料');toast(message);
    document.querySelectorAll('.cat-group').forEach(g=>{if(selected.some(c=>g.querySelector('#'+c.field)))g.open=true;});
  }
  function renderImportProgress(){
    $('importSteps').hidden=!importProgress;const stages=['file','pdf','match','review'],position=stages.indexOf(importProgress?.stage);
    for(const li of document.querySelectorAll('[data-import-step]')){const i=stages.indexOf(li.dataset.importStep);li.classList.toggle('done',i<position);li.classList.toggle('active',i===position);if(i===position)li.setAttribute('aria-current','step');else li.removeAttribute('aria-current');}
  }
  function readProgress(progress){
    importProgress=progress;renderImportProgress();
    if(progress.ocr)importStatus('正在本機辨識影像文字，第 {page} 頁…',false,{page:progress.page});
    else if(progress.phase==='text'&&!progress.page)importStatus('正在讀取 PDF 內的測量文字…');
    else if(progress.page)importStatus('正在讀取報告，第 {page}／{total} 頁…',false,{page:progress.page,total:progress.total});
    else importStatus(progress.stage==='match'?'正在對應測量名稱與實測值…':progress.stage==='pdf'?'正在載入報告讀取元件…':'正在本機讀取資料…');
  }
  async function uploadReport(file){
    if(!file)return null;selectedReportFile=file;readingReport=true;$('readReportBtn').disabled=true;const generation=++importGeneration;importData=null;importMeta=null;renderImport();readProgress({stage:'file'});
    try{
      const sheets=await Import.readFile(file,progress=>{if(generation===importGeneration)readProgress(progress);});
      if(generation!==importGeneration)return null;if(!sheets.length)throw new Error('badData');readProgress({stage:'match'});setSheets(sheets);if(importData?.candidates.some(c=>c.field)){$('previewSummary').setAttribute('tabindex','-1');$('previewSummary').focus({preventScroll:true});$('previewSummary').scrollIntoView?.({block:'nearest',behavior:'smooth'});}return importData;
    }catch(error){
      if(generation!==importGeneration)return null;importData=null;renderImport();
      const stage=error.stage==='reader'?'載入讀取元件':error.stage==='file'?'讀取檔案':'解析報告';
      const known=importErrors[error.message],message=known||'讀取失敗，請重新整理後再上傳，或複製報告文字至下方辨識。';
      importStatus('在「{stage}」步驟未完成：{message}',true,{stage,message});return null;
    }finally{if(generation===importGeneration){readingReport=false;$('cephFile').value='';$('readReportBtn').disabled=!selectedReportFile;}}
  }
  $('cephFile').addEventListener('change',()=>uploadReport($('cephFile').files?.[0]));
  $('readReportBtn').addEventListener('click',()=>{if(!readingReport&&selectedReportFile)uploadReport(selectedReportFile);});
  $('parseTextBtn').addEventListener('click',()=>parseImportText($('cephText').value));
  $('sampleImportBtn').addEventListener('click',()=>{const sample='Measurement,Value,Unit,Normal\nANB,5,deg,2\nU1-SN,120,deg,105\nSN-MP,35,deg,32\nOverjet,6,mm,2\nOverbite,5,mm,2';$('cephText').value=sample;parseImportText(sample);});
  $('importSheet').addEventListener('change',()=>selectSheet(Number($('importSheet').value)));
  $('importRows').addEventListener('change',e=>{if(e.target.dataset.import!==undefined){Import.selectCandidate(importData.candidates,Number(e.target.dataset.import),e.target.checked);renderImport();}else if(e.target.dataset.map!==undefined){const i=Number(e.target.dataset.map);importData.candidates[i]=Import.remap(importData.candidates[i],e.target.value);renderImport();}});
  $('showUnmapped').addEventListener('change',renderImport);
  $('importMode').addEventListener('change',renderImport);
  $('applyImportBtn').addEventListener('click',applyImport);$('cancelImportBtn').addEventListener('click',clearImport);
  $('undoImportBtn').addEventListener('click',()=>{if(!undo)return;state=copy(undo.state);caseKind=undo.caseKind;provenance=copy(undo.provenance);currentCaseId=undo.currentCaseId;caseName=undo.caseName;syncCaseName();undo=null;sync();render();save();toast(t('已撤銷最近一次填入，恢復先前輸入。'));});
  $('newCaseBtn').addEventListener('click',()=>{clearImport();state=M.blank();caseKind='patient';provenance=[];currentCaseId=null;caseName=state.caseId;syncCaseName();undo=null;$('preset').value='';sync();render();save();$('draftStatus').textContent=t('已建立空白患者病例');toast(t('請填入患者資料；未知項目留空，不當作 0。'));});
  $('pendingFields').addEventListener('click',e=>{const id=e.target.closest('[data-focus]')?.dataset.focus;if(!id)return;const el=$(id),details=el.closest('details');if(details)details.open=true;el.focus();el.scrollIntoView?.({block:'center',behavior:'smooth'});});
  $('templateBtn').addEventListener('click',()=>{const csv='\uFEFFMeasurement,Value,Unit\r\nANB,,deg\r\nU1-SN,,deg\r\nSN-MP,,deg\r\nOverjet,,mm\r\nOverbite,,mm\r\nE-line,,mm\r\n';const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='CAT-CAT_cephalometric_template.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);toast(t('已下載空白範本；請填入患者實測值，勿填正常值。'));});
  function syncCaseName(){caseStatus('');$('caseName').value=caseName||state.caseId||'';}
  function caseSnapshot(){return {name:caseName||state.caseId,state:M.sanitize(state),caseKind,provenance:copy(provenance)};}
  function renderCases(){
    if(caseMessage){$('caseStatus').textContent=t(caseMessage.key,caseMessage.params);}
    const cases=book.all(),selection=$('savedCaseSelect').value,record=book.get(currentCaseId),dirty=record&&JSON.stringify({name:record.name,state:record.state,caseKind:record.caseKind,provenance:record.provenance})!==JSON.stringify(caseSnapshot());
    $('caseSaveStatus').textContent=t(record?dirty?'有未保存更改':'已保存病例':'尚未保存病例');
    $('savedCaseSelect').innerHTML=cases.length?cases.map(c=>{const r=M.evaluate(c.state),summary=r.valid?fmt(r.baseline)+' '+t('分'):t('待補齊');return `<option value="${escape(c.id)}">${escape(c.name)} · ${escape(summary)} · ${escape(new Date(c.updatedAt).toLocaleDateString(I.locale))}</option>`;}).join(''):`<option value="">${escape(t('尚無已保存病例'))}</option>`;
    if(cases.some(c=>c.id===selection))$('savedCaseSelect').value=selection;else if(record)$('savedCaseSelect').value=record.id;
    $('openCaseBtn').disabled=!cases.length;$('backupCasesBtn').disabled=false;
  }
  function caseStatus(key,error=false,params={}){caseMessage=key?{key,params}:null;$('caseStatus').hidden=!key;$('caseStatus').textContent=t(key,params);$('caseStatus').classList.toggle('import-error',error);}
  function saveCase(asNew=false){
    try{const record=book.save(caseSnapshot(),asNew?null:currentCaseId);currentCaseId=record.id;caseName=record.name;syncCaseName();save();renderCases();$('savedCaseSelect').value=record.id;caseStatus('已保存「{name}」，可從已保存病例重新開啟。',false,{name:record.name});toast(t('病例已保存（此瀏覽器）。'));return record;}catch{caseStatus('此瀏覽器無法保存病例，請先匯出備份。',true);return null;}
  }
  $('caseName').addEventListener('input',()=>{caseName=$('caseName').value;save();renderCases();});
  $('saveCaseBtn').addEventListener('click',()=>saveCase());$('saveCopyBtn').addEventListener('click',()=>saveCase(true));
  $('openCaseBtn').addEventListener('click',()=>{const record=book.get($('savedCaseSelect').value);if(!record)return;clearImport();state=M.sanitize(record.state);caseKind=record.caseKind;provenance=copy(record.provenance);currentCaseId=record.id;caseName=record.name;undo=null;$('preset').value='';syncCaseName();sync();render();save();caseStatus('已開啟「{name}」。',false,{name:record.name});});
  function downloadJson(value,filename){const blob=new Blob([JSON.stringify(value,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);}
  $('backupCasesBtn').addEventListener('click',()=>downloadJson({format:'CAT-CAT-case-backup',version:1,exportedAt:new Date().toISOString(),cases:(()=>{const all=book.all(),current=book.get(currentCaseId);if(!current||JSON.stringify(current.state)!==JSON.stringify(M.sanitize(state))||current.name!==caseName)all.push({...caseSnapshot(),id:'current-draft'});return all;})()},'CAT-CAT_cases_backup.json'));
  $('restoreCasesFile').addEventListener('change',async()=>{const file=$('restoreCasesFile').files?.[0];if(!file)return;try{if(file.size>10*1024*1024)throw new Error();const value=JSON.parse(await file.text());if(value.format!=='CAT-CAT-case-backup'||value.version!==1||!Array.isArray(value.cases)||value.cases.length>500||!value.cases.every(c=>c.name&&c.state&&typeof c.state==='object'&&!Array.isArray(c.state)))throw new Error();for(const c of value.cases)book.save({name:c.name,state:c.state,caseKind:c.caseKind,provenance:c.provenance});renderCases();caseStatus('已還原 {count} 個病例；以新增副本保留目前病例。',false,{count:value.cases.length});}catch{caseStatus('無法還原備份，請使用本計算機匯出的病例備份 JSON。',true);}finally{$('restoreCasesFile').value='';}});
  caseName=caseName||state.caseId;syncCaseName();
  sync();render();switchTab(location.hash.slice(1)||'assessment');
  $('draftStatus').textContent=t(canStore?'本機草稿自動保留':'草稿僅限目前開啟期間');
  window.CatApp={getState:()=>copy(state),getReference:()=>reference?copy(reference):null,getResult:()=>M.evaluate(state),getReport:report,getTab:()=>currentTab,getLanguage:()=>I.lang,parseImport:parseImportText,getImport:()=>importData?copy(importData):null,applyImport:applyImport,getCases:()=>book.all(),getCurrentCaseId:()=>currentCaseId,previewSheets:s=>setSheets(s),uploadReport};
})();
