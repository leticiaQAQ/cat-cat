(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./model.js'));else root.CatImport=factory(root.CatModel);})(typeof globalThis!=='undefined'?globalThis:this,function(M){
  'use strict';
  const aliases={
    anb:['ANB','ANB angle','ANB角','ANB角度','∠ANB'],u1sn:['U1-SN','U1/SN','U1 to SN','UI-SN','1-SN','上切牙-SN','上切牙与SN平面角','上切牙與SN平面角'],
    snmp:['SN-MP','SN/MP','MP-SN','SN to MP','SN-MP angle','下颌平面角(SN-MP)','下顎平面角(SN-MP)'],
    overjet:['Overjet','OJ','前牙覆盖','覆盖','前牙覆蓋','水平覆咬','水平覆蓋'],overbite:['Overbite','OB','前牙覆合','覆合','覆牙合','覆（牙合）','前牙覆（牙合）','前牙覆咬','垂直覆咬'],
    eline:['E-line','E line','E线','E線','唇相对E线','唇相對E-line','Lip to E-line','Lip position relative to E-line'],crowding:['Crowding','Max crowding','最大单颌拥挤量','最大單顎擁擠量'],midline:['Midline deviation','中线偏差','中線偏差'],gummy:['Gingival display','露龈量','露齦量'],age:['Age','年龄','年齡']
  };
  const normalize=s=>String(s??'').normalize('NFKC').toLowerCase().replace(/[−–—]/g,'-').replace(/(?:\((?:mm|deg|degree[s]?|°|%|岁|歲|years?)\))$/g,'').replace(/[\s\-_/∠()（）:：.]/g,'');
  const lookup=new Map();
  for(const f of M.fields.filter(f=>!f.type)){for(const name of [f.id,f.label,...Object.values(globalThis.CatI18n?.dictionary?.[f.label]||{}),...(aliases[f.id]||[])])lookup.set(normalize(name),f.id);}
  const ambiguity=s=>/fma|sn.?go.?gn|upper.?lip|lower.?lip|ul.?e.?line|ll.?e.?line|上唇|下唇|上下唇/i.test(String(s));
  function numeric(raw,unit=''){
    if(typeof raw==='number')return {number:raw,unit:String(unit).trim()};
    const text=String(raw??'').normalize('NFKC').trim().replace(/[−–]/g,'-');
    const m=text.match(/^([+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+))\s*([^\d]*)$/);
    return m?{number:Number(m[1].replace(',','.')),unit:String(unit||m[2]).trim(),inlineUnit:m[2].trim()}:null;
  }
  function unitInLabel(label){const m=String(label).match(/[（(]\s*(mm|°|deg(?:rees)?|%)\s*[)）]\s*$/i);return m?.[1]||'';}
  function validUnit(unit,f){const u=normalize(unit);if(!u)return true;if(f.unit==='°')return ['°','deg','degree','degrees','度'].includes(u);if(f.unit==='mm')return ['mm','毫米','公釐','公厘'].includes(u);if(f.unit==='牙·mm')return ['牙·mm','牙mm','toothmm','tooth·mm','teethmm'].includes(u);if(f.unit==='歲')return ['岁','歲','years','year','yr','y'].includes(u);return ['颗','顆','牙','teeth','tooth','count'].includes(u);}
  const nameHeaders=['分析方法','Group/Measurement','measurement','measure','parameter','item','variable','name','项目','項目','名称','名稱','测量项目','測量項目','测量名称','測量名稱','measurement name','parameter name','measure name','指标','指標'];
  const valueHeaders=['value','actual','measured','patient','patientvalue','actual value','measured value','patient value','result','测量值','測量值','实测值','實測值','患者值','患者数值','患者數值','数值','數值','测量结果','測量結果'];
  const normHeaders=['参考值','參考值','reference','reference value','mean','normal','norm','average','sd','standarddeviation','正常值','标准值','標準值','平均值','标准差','標準差'];
  const inHeaders=(s,set)=>set.map(normalize).includes(normalize(s));
  function delimited(text,delimiter){
    const rows=[];let row=[],cell='',quote=false;
    for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quote&&text[i+1]==='"'){cell+='"';i++;}else quote=!quote;}else if(!quote&&c===delimiter){row.push(cell.trim());cell='';}else if(!quote&&(c==='\n'||c==='\r')){if(c==='\r'&&text[i+1]==='\n')i++;row.push(cell.trim());if(row.some(Boolean))rows.push(row);row=[];cell='';}else cell+=c;}
    if(quote)throw new Error('badData');row.push(cell.trim());if(row.some(Boolean))rows.push(row);return rows;
  }
  function textRows(text){
    const cleaned=String(text).replace(/^\uFEFF/,'').trim();if(cleaned.length>200000)throw new Error('tooLarge');if(!cleaned)return [];
    if(/^[\[{]/.test(cleaned))return jsonRows(JSON.parse(cleaned));
    const lines=cleaned.split(/\r?\n/).filter(x=>x.trim()),first=lines[0]||'';
    const delimiter=first.includes('\t')?'\t':first.includes(';')?';':first.includes(',')?',':null;
    if(delimiter){const rows=delimited(cleaned,delimiter);if(rows.some(r=>r.some(c=>inHeaders(c,nameHeaders)))||rows.every(r=>r.length>=2&&(lookup.has(normalize(r[0]))||ambiguity(r[0])||numeric(r[1])))||rows[0].filter(c=>lookup.has(normalize(c))).length>=2)return rows;}
    return lines.map(line=>{const cells=line.trim().split(/\t|\s{2,}/);if(cells.length>1)return cells;return [line.trim()];});
  }

  function jsonRows(data){
    if(Array.isArray(data)){
      if(data.length&&Array.isArray(data[0]))return data;
      if(data.every(x=>x&&typeof x==='object'&&(x.name||x.measurement||x.item||x.label)))return [['measurement','value','unit'],...data.map(x=>[x.name||x.measurement||x.item||x.label,x.value??x.actual??x.measured,x.unit||''])];
      if(data.length===1)return jsonRows(data[0]);throw new Error('multipleCases');
    }
    if(!data||typeof data!=='object')throw new Error('badData');
    if(data.measurements)return jsonRows(data.measurements);
    return [['measurement','value','unit'],...Object.entries(data).filter(([,v])=>typeof v==='number'||typeof v==='string'||v&&typeof v==='object'&&'value' in v).map(([k,v])=>[k,typeof v==='object'?v.value:v,typeof v==='object'?v.unit||'':''])];
  }
  const numericFields=M.fields.filter(f=>!f.type);
  const lipKind=label=>/^(?:ul[\s-]*(?:ep|e[\s-]*(?:line|plane))|upper\s*lip.*e[\s-]*(?:line|plane))|上唇.*E[線线]|UL-EP/i.test(label)?'upper':/^(?:ll[\s-]*(?:ep|e[\s-]*(?:line|plane))|lower\s*lip.*e[\s-]*(?:line|plane))|下唇.*E[線线]|LL-EP/i.test(label)?'lower':null;
  function matchLabel(label){
    const clean=String(label).trim(),n=normalize(clean);
    const id=lookup.get(n)||lookup.get(normalize(clean.replace(/[（(].*?[)）]/g,'')));
    if(id)return {id};
    const lip=lipKind(clean);if(lip)return {id:'eline',lip};
    if(ambiguity(clean))return {id:null,blocked:true};
    return {id:null};
  }
  function checkCandidate(c){
    const f=numericFields.find(f=>f.id===c.field),n=numeric(c.raw,c.unit);
    c.value=n?.number??null;c.unit=n?.unit||c.unit||f?.unit||'';
    let reason=c.problem||'';
    if(!reason&&!n)reason='notNumeric';
    if(!reason&&f&&(!validUnit(c.unit,f)||n.inlineUnit&&!validUnit(n.inlineUnit,f)))reason='unitMismatch';
    if(!reason&&f&&(!Number.isFinite(c.value)||c.value<f.min||c.value>f.max||(f.step===1&&!Number.isInteger(c.value))))reason='outOfRange';
    c.canConfirm=!!f&&!reason;c.valid=c.canConfirm&&!c.review;c.selected=c.valid&&c.field!=='eline';
    c.reason=reason||c.review||(c.field==='eline'?'confirmEline':c.field?'matched':'unmapped');
    return c;
  }
  function finish(candidates,ignored=0,headerFound=false){
    const unique=[],byKey=new Map();
    for(const c of candidates){
      const key=[c.field||normalize(c.label),c.lip||'',c.value,c.reason].join('|');
      if(byKey.has(key)){byKey.get(key).origins.push(...c.origins);continue;}
      byKey.set(key,c);unique.push(c);
    }
    for(const c of unique){
      if(c.origins.some(o=>o.ocr)){c.valid=false;c.selected=false;if(c.canConfirm)c.reason=c.review==='ocrLabelReview'?'ocrLabelReview':'ocrReview';}
      if(!c.field||c.lip||c.problem)continue;
      const same=unique.filter(x=>x.field===c.field&&!x.lip&&!x.problem);
      if(same.some(x=>x.value!==c.value||!x.canConfirm)){for(const x of same){x.valid=false;x.selected=false;x.reason='conflict';}}
    }
    return {candidates:unique,ignored,headerFound};
  }
  // Alias patterns accept report prose and spacing around clinical abbreviations.
  const names=[...lookup.entries()].map(([name,id])=>({name,id}));
  for(const name of ['UL-EP','LL-EP','Upper lip to E-line','Lower lip to E-line','Upper lip to E-Plane','Lower lip to E-Plane','上唇相對E線','上唇位于E线','下唇位于E线','上唇位於E線','下唇位於E線'])names.push({name:normalize(name),id:'eline',lip:lipKind(name)});
  const patternFor=name=>[...name].map(c=>c.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('[\\s\\-_/]*');
  const patterns=names.sort((a,b)=>b.name.length-a.name.length).map(a=>({...a,re:new RegExp('(?<![a-z0-9])'+patternFor(a.name)+'(?![a-z])','gi')}));
  function scanLine(line,origin){
    const text=String(line).normalize('NFKC').replace(/[−–—]/g,'-'),matches=[];
    for(const a of patterns){a.re.lastIndex=0;let m;while((m=a.re.exec(text))){if(matches.some(x=>m.index>=x.index&&m.index<x.end))continue;matches.push({...a,index:m.index,end:m.index+m[0].length,label:m[0]});}}
    matches.sort((a,b)=>a.index-b.index);const out=[];
    for(let i=0;i<matches.length;i++){
      const a=matches[i],tail=text.slice(a.end,matches[i+1]?.index??text.length);
      const before=text.slice(Math.max(0,a.index-40),a.index).split(/[;；,，。]/).pop();if(/(?:正常值?|标准值?|標準值?|参考值?|參考值?|norm(?:al)?|mean|SD)\s*$/i.test(before))continue;
      if(/^(?:\s*\([^)]*\))?\s*(?:正常|标准|標準|参考|參考|norm|mean|SD)/i.test(tail))continue;
      const v=tail.match(/^\s*(?:\([^)]*\))?\s*(?:[:=：]|为|為|是|测得|測得|measured(?:\s+at)?|is|was|value|数值|數值|角度|angle|位于|位於|[前后後])?\s*([+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+))\s*(°|deg(?:rees)?|度|mm|毫米|公[釐厘]|%|years?|[歲岁])?/i);
      if(!v)continue;
      // Reject ranges and mean±SD expressions rather than reading only the first number.
      if(/^\s*(?:±|\+\/-|-(?=\d))/.test(tail.slice(v[0].length)))continue;
      let value=Number(v[1].replace(',','.')),unit=v[2]||'';
      if(a.id==='age'){const months=tail.slice(v[0].length).match(/^\s*(\d+)\s*(?:月|months?)/i);if(months)value+=Number(months[1])/12;}
      if(a.lip&&/E[線线]\s*[后後]/i.test(a.label+tail))value=-Math.abs(value);
      out.push(checkCandidate({excerpt:a.label+' '+v[0].trim(),label:a.label,field:a.id,lip:a.lip||null,raw:String(value)+(unit||''),unit,review:a.lip?'confirmLip':null,origins:[origin]}));
    }
    return out;
  }
  function analyze(rows){
    if(rows.length>2000)throw new Error('tooLarge');
    rows=rows.filter(row=>Array.isArray(row)&&row.some(x=>String(x??'').trim()));
    const candidates=[];let ignored=0,headerFound=false,header=null,blocked=false,section='';
    for(let index=0;index<rows.length;index++){
      const row=rows[index],joined=row.join('  '),origin={page:row.page||null,line:index+1,section,ocr:!!row.ocr};
      const nc=row.findIndex(x=>inHeaders(x,nameHeaders));
      if(nc>=0){
        const actual=row.map((x,j)=>inHeaders(x,valueHeaders)?j:-1).filter(j=>j>=0);
        if(actual.length>1)throw new Error('ambiguousColumns');
        if(!actual.length&&row.some(x=>inHeaders(x,normHeaders)))throw new Error('noPatientColumn');
        header={name:nc,value:actual[0]??-1,unit:row.findIndex(x=>['unit','units','单位','單位'].includes(normalize(x)))};headerFound=true;blocked=false;continue;
      }
      if(/(?:标准值范围|標準值範圍|难度系数|難度係數|difficulty\s*(?:factor|coefficient))/i.test(joined)){blocked=true;header=null;continue;}
      if(blocked){ignored++;continue;}
      if(!header&&row.length>1)candidates.push(...scanLine(joined,origin).filter(c=>c.field==='age'));
      const wide=row.map(x=>matchLabel(x).id);
      if(wide.filter(Boolean).length>=2&&!row.some(cell=>/[:：=]/.test(String(cell)))&&row.every((x,j)=>!String(x??'').trim()||wide[j])){
        const data=rows.slice(index+1).filter(r=>r.some((x,j)=>wide[j]&&numeric(x)));
        if(data.length!==1)throw new Error('multipleCases');
        return analyze([['measurement','value'],...row.map((label,j)=>[label,data[0][j]]).filter(([,v])=>v!==undefined)]);
      }
      const label=String(row[header?.name??0]??'').trim().slice(0,120),match=matchLabel(label);
      if(row.ocr&&!match.id&&/^u[li]\s*[-–—]\s*sn(?:\s*\([^)]*\))?$/i.test(label)){match.id='u1sn';match.ocrAlias=true;}
      if(row.length===1){const prose=scanLine(joined,origin);if(prose.length)candidates.push(...prose);else {const pair=joined.match(/^(.{1,80}?)\s*[:：=]\s*([+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)\s*(?:°|mm|deg(?:rees)?|%)?)$/i);if(pair&&!/姓名|编号|日期|patient|name|date|ID|phone/i.test(pair[1]))candidates.push(checkCandidate({label:pair[1],field:null,raw:pair[2],unit:'',origins:[origin]}));else ignored++;if(/分析法|analysis|分析$/.test(joined)){section=joined.slice(0,60);header=null;}}continue;}
      // Narrative metadata or several measurements in one row are scanned independently.
      if(row.some(cell=>/[:：=]/.test(String(cell)))){
        const prose=row.flatMap(cell=>scanLine(cell,origin));if(prose.length){candidates.push(...prose);continue;}
      }
      let raw,unit=unitInLabel(label),problem=row.ocrNumericConflict?'ocrNumericConflict':'';
      if(header&&header.value>=0){raw=row[header.value];if(header.unit>=0)unit=String(row[header.unit]??'');}
      else {const rest=row.slice(1);if(rest.length===1)raw=rest[0];else if(rest.length===2&&numeric(rest[0])&&/^(?:°|mm|deg(?:rees)?|%|度|毫米|teeth|tooth|years?)$/i.test(String(rest[1]).trim())){raw=rest[0];unit=String(rest[1]);}else {raw=rest.join(' | ');problem='ambiguousColumns';}}
      if(!match.id&&!match.blocked&&!numeric(raw,unit)){ignored++;continue;}
      // Unknown numeric measurements remain available for user mapping; personal metadata is excluded.
      if(!match.id&&!match.blocked&&/姓名|名字|编号|編號|日期|病历号|病歷號|patient|name|date|ID|phone|电话|電話/i.test(label)){ignored++;continue;}
      candidates.push(checkCandidate({sourceCrop:row.sourceCrop||null,excerpt:(row.ocr?label+' | '+String(raw??''):row.map(c=>String(c??'')).join(' | ')).slice(0,220),label,field:match.id,lip:match.lip||null,raw:String(raw??'').slice(0,80),unit,problem,review:match.ocrAlias?'ocrLabelReview':match.blocked?'differentReference':match.lip?'confirmLip':null,origins:[origin]}));
    }
    return finish(candidates,ignored,headerFound);
  }
  const parseText=text=>analyze(textRows(text));
  function ocrRows(result,page){return (typeof result==='string'?textRows(result):result.rows||textRows(result.text)).map(row=>{row.page=page;row.ocr=true;return row;});}
  function remap(candidate,field){
    const c={...candidate,field:field||null,problem:null,review:null,selected:false};checkCandidate(c);c.selected=false;c.reason=c.canConfirm?'manualMapping':c.reason;return c;
  }
  function selectCandidate(candidates,index,selected){
    const c=candidates[index];if(!c||!c.canConfirm)return;
    c.valid=true;c.selected=selected;if(selected){if(c.reason!=='matched')c.reason='confirmed';for(let j=0;j<candidates.length;j++)if(j!==index&&candidates[j].field===c.field)candidates[j].selected=false;}
  }
  async function readXlsx(data){
    if(!globalThis.JSZip)throw new Error('readerUnavailable');
    const zip=await globalThis.JSZip.loadAsync(new Uint8Array(data));if(Object.keys(zip.files).length>1500)throw new Error('tooLarge');
    const xml=async path=>{const file=zip.file(path);if(!file)throw new Error('badData');if(file._data?.uncompressedSize>4e6)throw new Error('tooLarge');const text=await file.async('string');if(text.length>4e6)throw new Error('tooLarge');const doc=new DOMParser().parseFromString(text,'application/xml');if(doc.querySelector('parsererror'))throw new Error('badData');return doc;};
    const descendants=(doc,name)=>[...doc.getElementsByTagName('*')].filter(el=>el.localName===name);
    const shared=zip.file('xl/sharedStrings.xml')?descendants(await xml('xl/sharedStrings.xml'),'si').map(si=>descendants(si,'t').map(t=>t.textContent).join('')):[];
    const wb=await xml('xl/workbook.xml'),rels=await xml('xl/_rels/workbook.xml.rels');
    const targets=Object.fromEntries(descendants(rels,'Relationship').map(r=>[r.getAttribute('Id'),r.getAttribute('Target')]));
    const sheets=[];
    for(const sheet of descendants(wb,'sheet')){if(sheet.getAttribute('state')==='hidden'||sheet.getAttribute('state')==='veryHidden')continue;let target=targets[sheet.getAttribute('r:id')||sheet.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships','id')];if(!target)continue;target=target.startsWith('/')?target.slice(1):'xl/'+target.replace(/^\.\//,'');if(target.includes('..'))throw new Error('badData');const doc=await xml(target),rows=[];
      for(const row of descendants(doc,'row')){const cells=[];for(const cell of descendants(row,'c')){const col=(cell.getAttribute('r')||'A').match(/^[A-Z]+/)?.[0]||'A';let index=0;for(const c of col)index=index*26+c.charCodeAt(0)-64;if(index>150)throw new Error('tooLarge');const v=descendants(cell,'v')[0]?.textContent;const type=cell.getAttribute('t');cells[index-1]=type==='s'?shared[Number(v)]??'':type==='inlineStr'?descendants(cell,'t').map(t=>t.textContent).join(''):v??'';}rows.push(cells);if(rows.length>2000)throw new Error('tooLarge');}
      sheets.push({name:sheet.getAttribute('name')||'Sheet',rows});if(sheets.length>30)throw new Error('tooLarge');
    }return sheets;
  }
  function pdfRows(items){
    const lines=[];for(const item of items){if(!('str' in item)||!item.str.trim())continue;const y=item.transform?.[5]??0;let line=lines.find(l=>Math.abs(l.y-y)<2);if(!line){line={y,items:[]};lines.push(line);}line.items.push(item);}
    return lines.sort((a,b)=>b.y-a.y).map(line=>{const cells=[];let lastEnd=null;for(const item of line.items.sort((a,b)=>(a.transform?.[4]??0)-(b.transform?.[4]??0))){const x=item.transform?.[4]??0;const gap=lastEnd===null?Infinity:x-lastEnd;if(gap>8||!cells.length)cells.push(item.str);else cells[cells.length-1]+=(gap>1?' ':'')+item.str;lastEnd=x+(item.width||0);}if(cells.length===1)return textRows(cells[0])[0]||cells;return cells;});
  }
  let pdfLibraryPromise;
  async function loadPdfLibrary(){
    if(!globalThis.window?.document){const lib=await import('./vendor/pdfjs/pdf.min.mjs');lib.GlobalWorkerOptions.workerSrc=new URL('./vendor/pdfjs/pdf.worker.min.mjs',document.baseURI).href;return lib;}
    if(!pdfLibraryPromise)pdfLibraryPromise=(async()=>{
      // Classic local scripts avoid module-worker/CSP failures in private hosted pages.
      // PDF.js uses its bundled main-thread worker handler when pdfjsWorker is present.
      const load=(file,globalName)=>globalThis[globalName]?Promise.resolve():new Promise((resolve,reject)=>{
        const script=document.createElement('script'),timer=setTimeout(()=>{script.remove();reject(new Error('pdfReaderUnavailable'));},20000);
        script.src=new URL('./vendor/pdfjs/'+file+'?v=1.10',document.baseURI).href;script.onload=()=>{clearTimeout(timer);globalThis[globalName]?resolve():reject(new Error('pdfReaderUnavailable'));};script.onerror=()=>{clearTimeout(timer);script.remove();reject(new Error('pdfReaderUnavailable'));};document.head.appendChild(script);
      });
      await load('pdf.worker.min.js','pdfjsWorker');await load('pdf.min.js','pdfjsLib');return globalThis.pdfjsLib;
    })().catch(error=>{pdfLibraryPromise=null;throw error;});
    return pdfLibraryPromise;
  }
  function extractionError(error,stage){
    if(error.stage)return error;
    if(error.name==='PasswordException')error=new Error('encryptedPdf');
    else if(error.name==='InvalidPDFException')error=new Error('invalidPdf');
    else if(error.name==='MissingPDFException')error=new Error('badData');
    error.stage=stage;return error;
  }
  async function readPdf(data,onProgress){
    // Text reports have a small, independent reader before PDF.js initialization.
    // Unsupported PDF structures fall through to the full renderer/OCR path.
    if(globalThis.CatPdfText&&globalThis.pako){
      try{
        onProgress?.({stage:'pdf',phase:'text'});
        const inflate=bytes=>{let count=0;const chunks=[],reader=new pako.Inflate();reader.onData=chunk=>{count+=chunk.length;if(count>20*1024*1024)throw new Error('tooLarge');chunks.push(chunk);};reader.push(bytes,true);if(reader.err)throw new Error('pdfTextUnsupported');const out=new Uint8Array(count);let offset=0;for(const chunk of chunks){out.set(chunk,offset);offset+=chunk.length;}return out;};
        const sheets=await CatPdfText.read(data,{inflate,onProgress,pdfRows,hasMeasurements:rows=>analyze(rows).candidates.some(c=>c.field&&c.field!=='age')});
        if(analyze(sheets[0].rows).candidates.some(c=>c.field)){onProgress?.({stage:'match',total:sheets[0].meta.pages});return sheets;}
      }catch(error){if(['tooLarge','tooManyPages','encryptedPdf'].includes(error.message))throw extractionError(error,'pdf');}
    }
    let lib;onProgress?.({stage:'pdf',phase:'reader'});
    try{lib=await loadPdfLibrary();}catch(error){throw extractionError(error,'reader');}
    const task=lib.getDocument({data:new Uint8Array(data),cMapUrl:new URL('./vendor/pdfjs/cmaps/',document.baseURI).href,cMapPacked:true,isEvalSupported:false,useSystemFonts:true,useWorkerFetch:false,useWasm:false,disableFontFace:true});
    let doc;try{
      doc=await task.promise;if(doc.numPages>30)throw new Error('tooManyPages');const rows=[];let ocrPages=0,textCharacters=0;
      for(let i=1;i<=doc.numPages;i++){
        onProgress?.({stage:'pdf',page:i,total:doc.numPages,phase:'text'});
        const page=await doc.getPage(i),content=await page.getTextContent(),pageRows=pdfRows(content.items),chars=content.items.reduce((n,x)=>n+(x.str||'').trim().length,0);textCharacters+=chars;
        let useOcr=chars<20;
        if(!useOcr&&globalThis.CatOCR){
          // Mixed PDFs can contain selectable headers while measurements are scanned.
          const known=pageRows.some(row=>row.some(cell=>scanLine(cell,{}).length)||matchLabel(row[0]).id);
          if(!known){const ops=await page.getOperatorList();useOcr=ops.fnArray.some(op=>[lib.OPS.paintImageXObject,lib.OPS.paintInlineImageXObject,lib.OPS.paintImageXObjectRepeat].includes(op));}
        }
        if(useOcr&&globalThis.CatOCR){
          if(++ocrPages>10)throw new Error('tooManyOcrPages');const size=page.getViewport({scale:1}),viewport=page.getViewport({scale:Math.min(2.5,2600/Math.max(size.width,size.height))}),canvas=document.createElement('canvas');canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);const context=canvas.getContext('2d');if(!context)throw new Error('ocrUnavailable');
          onProgress?.({stage:'pdf',page:i,total:doc.numPages,ocr:true});await page.render({canvasContext:context,viewport}).promise;
          const text=await CatOCR.readCanvas(canvas,progress=>onProgress?.({stage:'pdf',page:i,total:doc.numPages,progress,ocr:true}));const recognized=ocrRows(text,i);rows.push(...pageRows.map(row=>{row.page=i;return row;}),...recognized);canvas.width=canvas.height=0;
        }else rows.push(...pageRows.map(row=>{row.page=i;return row;}));
        // Yield between pages so progress and cancellation controls can paint.
        await new Promise(resolve=>setTimeout(resolve,0));
      }
      if(!rows.length)throw new Error('scannedPdf');onProgress?.({stage:'match',total:doc.numPages});
      return [{name:'PDF',rows,meta:{pages:doc.numPages,rows:rows.length,textCharacters,ocrPages}}];
    }catch(error){throw extractionError(error,'pdf');}finally{if(doc)await doc.destroy();else await task.destroy();}
  }
  async function readDocx(data){
    if(!globalThis.JSZip)throw new Error('readerUnavailable');
    const zip=await JSZip.loadAsync(new Uint8Array(data)),file=zip.file('word/document.xml');if(!file)throw new Error('badData');if(file._data?.uncompressedSize>4e6)throw new Error('tooLarge');
    const xml=await file.async('string');if(xml.length>4e6)throw new Error('tooLarge');const doc=new DOMParser().parseFromString(xml,'application/xml');if(doc.querySelector('parsererror'))throw new Error('badData');
    const all=(el,name)=>[...el.getElementsByTagName('*')].filter(x=>x.localName===name),text=el=>all(el,'t').map(t=>t.textContent).join('');const rows=[];
    for(const p of all(doc,'p')){let parent=p.parentElement,inTable=false;while(parent){if(parent.localName==='tc'){inTable=true;break;}parent=parent.parentElement;}if(!inTable&&text(p).trim())rows.push(...textRows(text(p)));}
    for(const row of all(doc,'tr'))rows.push(all(row,'tc').map(text));
    return [{name:'DOCX',rows}];
  }
  async function readFile(file,onProgress){
    if(!file||file.size>10*1024*1024)throw new Error('tooLarge');const ext=file.name.split('.').pop().toLowerCase();if(!['xlsx','csv','tsv','txt','json','pdf','docx','html','htm','md','png','jpg','jpeg','webp','bmp'].includes(ext))throw new Error('unsupported');
    onProgress?.({stage:'file'});let data;try{data=typeof file.arrayBuffer==='function'?await file.arrayBuffer():await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('fileReadFailed'));reader.readAsArrayBuffer(file);});}catch(error){throw extractionError(error,'file');}if(ext==='xlsx')return readXlsx(data);if(ext==='pdf')return readPdf(data,onProgress);if(['png','jpg','jpeg','webp','bmp'].includes(ext)){if(!globalThis.CatOCR)throw new Error('ocrUnavailable');const text=await CatOCR.readImage(data,progress=>onProgress?.({page:1,progress,ocr:true}));const rows=ocrRows(text,1);if(!rows.length)throw new Error('noOcrText');return [{name:'OCR',rows}];}if(ext==='docx')return readDocx(data);
    let text=new TextDecoder('utf-8').decode(data);if(text.includes('\uFFFD'))text=new TextDecoder('gb18030').decode(data);
    if(['html','htm'].includes(ext)){const doc=new DOMParser().parseFromString(text,'text/html');doc.querySelectorAll('script,style').forEach(e=>e.remove());text=[...doc.querySelectorAll('tr,p,li,h1,h2,h3')].map(el=>el.tagName==='TR'?[...el.children].map(c=>c.textContent).join('\t'):el.textContent).join('\n')||doc.body.textContent;}
    return [{name:ext.toUpperCase(),rows:ext==='json'?jsonRows(JSON.parse(text.replace(/^\uFEFF/,''))):ext==='tsv'?delimited(text,'\t'):textRows(text)}];
  }
  return {aliases,normalize,numeric,analyze,parseText,textRows,jsonRows,readFile,readXlsx,readPdf,pdfRows,readDocx,remap,selectCandidate,loadPdfLibrary};
});
