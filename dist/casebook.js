(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./model.js'));else root.CatCases=factory(root.CatModel);})(typeof globalThis!=='undefined'?globalThis:this,function(M){
  'use strict';
  const KEY='catcat-cases-v1',copy=x=>JSON.parse(JSON.stringify(x));
  function create(storage){
    let records=[];try{const data=JSON.parse(storage.getItem(KEY));if(data?.version===1&&Array.isArray(data.cases))records=data.cases.filter(c=>c.id&&c.name&&c.state).map(c=>({...c,state:M.sanitize(c.state)}));}catch{}
    return {
      all:()=>copy(records).sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt)),
      get:id=>{const found=records.find(c=>c.id===id);return found?copy(found):null;},
      save(snapshot,id){
        const name=String(snapshot.name||snapshot.state.caseId||'CASE').trim().slice(0,80);if(!name)throw new Error('caseName');
        const at=new Date().toISOString(),previous=records.find(c=>c.id===id),record={id:previous?.id||'case-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8),name,createdAt:previous?.createdAt||at,updatedAt:at,state:M.sanitize(snapshot.state),caseKind:snapshot.caseKind||'patient',provenance:copy(snapshot.provenance||[])};
        const next=[record,...records.filter(c=>c.id!==record.id)];storage.setItem(KEY,JSON.stringify({version:1,cases:next}));records=next;return copy(record);
      }
    };
  }
  return {create};
});
