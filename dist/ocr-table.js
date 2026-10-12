(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.CatOCRTable=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const median=a=>{a=[...a].sort((x,y)=>x-y);return a[Math.floor(a.length/2)]||20;};
  const clean=s=>String(s||'').normalize('NFKC').replace(/\s/g,'').toLowerCase();
  const name=s=>/^(?:分析方法|测量项目|測量項目|测量名称|測量名稱|项目|項目|measurement|group\/measurement|groupmeasurement|measurementname|parameter|item|name)$/.test(clean(s));
  const actual=s=>/^(?:测量值|測量值|实测值|實測值|患者值|患者数值|患者數值|actual|actualvalue|measured|measuredvalue|patient|patientvalue|value|result)$/.test(clean(s));
  const reference=s=>/^(?:参考值|參考值|正常值|标准值|標準值|平均值|reference|referencevalue|normal|mean|norm|sd)$/.test(clean(s));
  const words=data=>(data.blocks||[]).flatMap(b=>(b.paragraphs||[]).flatMap(p=>(p.lines||[]).flatMap(l=>l.words||[]))).filter(w=>w.text?.trim()&&w.bbox);
  const bounds=a=>({x0:Math.min(...a.map(w=>w.bbox.x0)),y0:Math.min(...a.map(w=>w.bbox.y0)),x1:Math.max(...a.map(w=>w.bbox.x1)),y1:Math.max(...a.map(w=>w.bbox.y1))});
  function lines(data){
    const all=words(data),height=median(all.map(w=>w.bbox.y1-w.bbox.y0)),rows=[];
    for(const w of all.sort((a,b)=>(a.bbox.y0+a.bbox.y1)-(b.bbox.y0+b.bbox.y1))){const y=(w.bbox.y0+w.bbox.y1)/2;let r=rows.find(r=>Math.abs(r.y-y)<height*.6);if(!r){r={y,words:[]};rows.push(r);}r.words.push(w);r.y=median(r.words.map(w=>(w.bbox.y0+w.bbox.y1)/2));}
    for(const r of rows){r.bbox=bounds(r.words);r.cells=[];for(const w of r.words.sort((a,b)=>a.bbox.x0-b.bbox.x0)){let cell=r.cells.at(-1);if(!cell||w.bbox.x0-cell.bbox.x1>height*1.2){cell={words:[],bbox:w.bbox};r.cells.push(cell);}cell.words.push(w);cell.bbox=bounds(cell.words);cell.text=cell.words.map(w=>w.text).join(' ');}}
    return rows.sort((a,b)=>a.y-b.y);
  }
  function headerCells(row){
    return row.cells.flatMap(cell=>{
      if(name(cell.text)||actual(cell.text)||reference(cell.text)||/^devnorm$/.test(clean(cell.text)))return [cell];
      if(!cell.words.some(w=>name(w.text)||actual(w.text)||reference(w.text)))return [cell];
      const groups=[];for(let i=0;i<cell.words.length;i++){const w=cell.words[i];let group=[w];
        // Adjacent headings remain distinct even if the OCR engine merges them into one cell.
        if(clean(w.text)==='std'&&clean(cell.words[i+1]?.text)==='dev')group.push(cell.words[++i]);
        groups.push({words:group,bbox:bounds(group),text:group.length===2?'sd':w.text});
      }return groups;
    });
  }
  function headerIn(rows){for(const row of rows){const cells=headerCells(row);if(cells.some(c=>name(c.text))&&cells.some(c=>actual(c.text)||reference(c.text)))return {...row,cells};}return null;}
  function lane(header,width){const cs=header.cells,ai=cs.findIndex(c=>actual(c.text)),a=cs[ai],next=cs[ai+1],prev=cs[ai-1];
    const right=next?(a.bbox.x1+next.bbox.x0)/2:Math.min(width,a.bbox.x1+Math.max(40,(a.bbox.y1-a.bbox.y0)*3));
    // The label column may extend much farther than its short header. Use the space around the value heading.
    const left=prev&&name(prev.text)&&next?Math.max(prev.bbox.x1,a.bbox.x0-Math.max(16,(next.bbox.x0-a.bbox.x1)/2)):prev?(prev.bbox.x1+a.bbox.x0)/2:0;
    return {ai,left,right};
  }
  function translated(data,x,y){for(const w of words(data)){w.bbox={x0:w.bbox.x0+x,x1:w.bbox.x1+x,y0:w.bbox.y0+y,y1:w.bbox.y1+y};}return data;}
  function table(rows,header,numbers=[],cropRow){
    if(!header||header.cells.filter(c=>actual(c.text)).length!==1)return rows.map(r=>r.cells.map(c=>c.text));
    const cells=header.cells,ai=cells.findIndex(c=>actual(c.text)),cuts=cells.slice(1).map((c,i)=>(cells[i].bbox.x1+c.bbox.x0)/2),out=[...rows.filter(r=>r.y<header.y).map(r=>r.cells.map(c=>c.text)),cells.map(c=>name(c.text)?'measurement':actual(c.text)?'measured value':reference(c.text)?'reference':c.text)],height=median(rows.map(r=>r.bbox.y1-r.bbox.y0));
    const measured=lane(header,Infinity);if(ai>0)cuts[ai-1]=measured.left;if(ai<cuts.length)cuts[ai]=measured.right;
    for(const r of rows.filter(r=>r.y>header.y+height)){
      const parts=cells.map(()=>[]);for(const w of r.words){const x=(w.bbox.x0+w.bbox.x1)/2,index=cuts.findIndex(c=>x<c);parts[index<0?cells.length-1:index].push(w);}
      const row=parts.map(p=>p.sort((a,b)=>a.bbox.x0-b.bbox.x0).map(w=>w.text).join(' '));
      const nr=numbers.filter(n=>Math.abs(n.y-r.y)<height*.7);if(nr.length===1){const original=row[ai].replace(/\s*[*＊]+\s*$/,'').trim(),reread=nr[0].words.map(w=>w.text).join('').replace(/[*＊]+$/,'');const a=original.match(/^([+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+))\s*(?:°|mm|%)?$/),b=reread.match(/^([+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+))\s*(?:°|mm|%)?$/);if(a&&b&&Number(a[1].replace(',','.'))!==Number(b[1].replace(',','.'))){row.ocrNumericConflict=true;row[ai]=original+' / '+reread;}else row[ai]=reread;}
      // Significance asterisks are annotations, never part of a measured number.
      row[ai]=row[ai].replace(/\s*[*＊]+\s*$/,'').trim();
      if(cropRow&&row[0]&&row[ai])row.sourceCrop=cropRow(r.bbox,cuts[ai]||Infinity);
      out.push(row);
    }
    return out;
  }
  async function recognize(worker,input,options={}){
    await worker.setParameters({preserve_interword_spaces:'1',user_defined_dpi:'300',tessedit_pageseg_mode:'11',tessedit_char_whitelist:''});
    const first=(await worker.recognize(input,{}, {blocks:true})).data;let rs=lines(first),header=headerIn(rs);
    if(header&&!header.cells.some(c=>actual(c.text))&&options.headerImage){
      await worker.reinitialize('chi_sim',1);await worker.setParameters({tessedit_pageseg_mode:'7'});
      for(const c of header.cells.filter(c=>!name(c.text)&&!reference(c.text))){const data=(await worker.recognize(options.headerImage(c.bbox))).data;let text=data.text.trim();
        // Limited Chinese glyph confusion in a header. Each resulting value still requires human review.
        if(/^测[重荐]值$/.test(clean(text)))text='测量值';if(actual(text))c.text=text;
      }
    }
    let nr=[];if(header&&header.cells.filter(c=>actual(c.text)).length===1){
      const measured=lane(header,options.width),left=measured.left,right=measured.right,top=Math.ceil(header.bbox.y1+8),height=Math.floor(options.height-top);
      if(options.tableImage&&height>0){
        const labelLeft=Math.max(0,Math.floor(header.cells.find(c=>name(c.text)).bbox.x0-8)),rectangle={left:labelLeft,top,width:Math.floor(right-labelLeft),height};
        await worker.reinitialize(['eng','chi_sim'],1);await worker.setParameters({tessedit_pageseg_mode:'6',tessedit_char_whitelist:''});
        const data=translated((await worker.recognize(options.tableImage(rectangle),{}, {blocks:true})).data,labelLeft,top);
        rs=[...rs.filter(r=>r.y<header.y),...lines(data)];
      }
      await worker.reinitialize('eng',1);await worker.setParameters({tessedit_pageseg_mode:'6',tessedit_char_whitelist:'0123456789.+-*°%m'});
      const rectangle={left:Math.floor(left),top,width:Math.floor(right-left),height};
      if(rectangle.width>0&&rectangle.height>0){const data=options.tableImage?translated((await worker.recognize(options.tableImage(rectangle),{}, {blocks:true})).data,rectangle.left,top):(await worker.recognize(input,{rectangle},{blocks:true})).data;nr=lines(data);}
    }
    return {text:first.text,rows:table(rs,header,nr,options.cropRow),tableDetected:!!header&&header.cells.filter(c=>actual(c.text)).length===1};
  }
  return {lines,headerIn,table,lane,recognize};
});
