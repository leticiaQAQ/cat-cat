(function(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CatModel = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function() {
  'use strict';
  const version = 'catcat-score-1.0';
  const groups = [
    {id:'case', title:'病例與計畫', en:'CASE PROFILE', fields:[
      {id:'caseId',label:'病例識別',type:'text',hint:'',maxLength:40},
      {id:'age',label:'年齡',unit:'歲',min:6,max:100,step:0.1,optional:true,hint:'選填背景紀錄，不參與 CAT-CAT 計分'}
    ]},
    {id:'dental',title:'模型分析',en:'DENTAL MODEL',fields:[
      {id:'overjet',label:'前牙覆蓋 Overjet',unit:'mm',min:-10,max:20,step:.1,hint:'反覆蓋輸入負值；反覆蓋每 mm 加 2 分'},
      {id:'overbite',label:'前牙覆咬 Overbite',unit:'mm',min:-10,max:15,step:.1,hint:'開咬輸入負值；按涉及牙齒累計'},
      {id:'openTeeth',label:'前牙開咬涉及牙數',unit:'顆',min:1,max:12,step:1,when:'anteriorOpen'},
      {id:'crowding',label:'最大單顎擁擠量',unit:'mm',min:0,max:20,step:.1},
      {id:'molar',label:'磨牙關係計畫',type:'select',options:[['maintain','維持原關係'],['distal','向遠中移動'],['mesial','向近中移動']],hint:'依治療計畫評分，不直接用 Angle 分類'},
      {id:'molarMm',label:'磨牙計畫移動量',unit:'mm',min:0,max:15,step:.1,when:'molarMoves',hint:'病例量級，不自動按顆數倍乘'},
      {id:'spacing',label:'最大單一間隙',unit:'mm',min:0,max:15,step:.1},
      {id:'closeSpace',label:'間隙是否正畸關閉',type:'select',options:[['yes','需要關閉'],['no','不正畸關閉']]},
      {id:'posteriorOpen',label:'後牙開咬總量',unit:'牙·mm',min:0,max:80,step:.1,hint:'各牙開咬 mm 相加，例如 2 顆 × 1 mm = 2'},
      {id:'posteriorCross',label:'後牙反咬',unit:'顆',min:0,max:16,step:1},
      {id:'scissor',label:'後牙鎖咬',unit:'顆',min:0,max:16,step:1},
      {id:'anomaly',label:'牙形態異常',unit:'顆',min:0,max:32,step:1},
      {id:'midline',label:'中線偏差',unit:'mm',min:0,max:10,step:.1},
      {id:'premolarRotation',label:'前磨牙旋轉總角度',unit:'°',min:0,max:720,step:1,hint:'累加需矯正牙齒的絕對旋轉量'},
      {id:'lateralRotation',label:'側切牙旋轉總角度',unit:'°',min:0,max:360,step:1,hint:'以每 10° 加 2 分，原型採連續比例'}
    ]},
    {id:'radio',title:'影像檢查',en:'RADIOGRAPHIC',fields:[
      {id:'anb',label:'ANB',unit:'°',min:-15,max:20,step:.1},
      {id:'u1sn',label:'U1–SN',unit:'°',min:50,max:160,step:.1},
      {id:'correctU1',label:'上切牙傾斜是否矯正',type:'select',options:[['yes','需要矯正'],['no','不矯正（該項 0 分）']]},
      {id:'snmp',label:'SN–MP',unit:'°',min:0,max:80,step:.1},
      {id:'impaction',label:'阻生牙',type:'check',score:10},
      {id:'supernumerary',label:'多生牙',type:'check',score:2},
      {id:'missing',label:'缺失牙',type:'check',score:2},
      {id:'transposition',label:'牙易位',type:'check',score:6},
      {id:'rootResorption',label:'牙根吸收',type:'select',options:[['none','無'],['under','C:R < 1（10 分）'],['over','C:R ≥ 1（20 分）']],hint:'C:R 為原表冠根比；照表錄入，不推論嚴重度'},
      {id:'surgery',label:'需要正顎手術',type:'check',score:10}
    ]},
    {id:'clinical',title:'臨床檢查',en:'CLINICAL',fields:[
      {id:'eline',label:'唇相對 E-line',unit:'mm',min:-15,max:15,step:.1,hint:'位於線前為正，線後為負'},
      {id:'correctEline',label:'軟組織突度是否矯正',type:'select',options:[['yes','需要矯正'],['no','不矯正（該項 0 分）']]},
      {id:'gummy',label:'露齦量',unit:'mm',min:0,max:15,step:.1},
      {id:'correctGummy',label:'露齦是否矯正',type:'select',options:[['yes','需要矯正'],['no','不矯正（該項 0 分）']]},
      {id:'chin',label:'頦偏斜（需手術）',type:'check',score:5},
      {id:'cant',label:'咬合平面傾斜',type:'check',score:10},
      {id:'periodontitis',label:'牙周炎',type:'check',score:10},
      {id:'tmd',label:'顳顎關節疾病',type:'check',score:10},
      {id:'caries',label:'廣泛齲齒',type:'check',score:10}
    ]}
  ];
  const fields = groups.flatMap(g=>g.fields.map(f=>({...f,group:g.id})));
  const defaults = {
    caseId:'DEMO-02',age:26,
    overjet:6,overbite:5,openTeeth:4,crowding:6,molar:'distal',molarMm:3,
    spacing:0,closeSpace:'yes',posteriorOpen:0,posteriorCross:0,scissor:0,anomaly:0,
    midline:1,premolarRotation:30,lateralRotation:0,anb:5,u1sn:120,correctU1:'yes',snmp:35,
    impaction:false,supernumerary:false,missing:false,transposition:false,rootResorption:'none',surgery:false,
    eline:3,correctEline:'yes',gummy:1,correctGummy:'yes',chin:false,cant:false,periodontitis:false,tmd:false,caries:false
  };
  const presets = {
    mild:{...defaults,caseId:'DEMO-01',age:24,overjet:2,overbite:2,crowding:2,molar:'maintain',molarMm:0,premolarRotation:0,anb:2,u1sn:105,eline:0},
    moderate:{...defaults},
    complex:{...defaults,caseId:'DEMO-03',age:30,overjet:8,overbite:6,crowding:8,molar:'mesial',molarMm:4,premolarRotation:40,anb:7,u1sn:125,snmp:45,eline:5}
  };
  const active = (f,s)=>!f.when || (f.when==='anteriorOpen' ? Number(s.overbite)<0 : s.molar!=='maintain');
  function validate(s) {
    const errors={};
    for(const f of fields) {
      if(!active(f,s)) continue;
      const v=s[f.id];
      if(f.optional&&(v===''||v===null||v===undefined))continue;
      if(f.type==='text') {if(typeof v!=='string'||v.trim().length<1||v.length>f.maxLength) errors[f.id]='請輸入 1–40 字的病例識別資料';}
      else if(f.type==='select') {if(!f.options.some(o=>o[0]===v))errors[f.id]='請選擇有效選項';}
      else if(f.type==='check') {if(typeof v!=='boolean')errors[f.id]='請選擇有或無';}
      else {
        if(v===''||v===null||v===undefined||!Number.isFinite(Number(v))) errors[f.id]='請輸入數值';
        else if(Number(v)<f.min||Number(v)>f.max) errors[f.id]=`範圍 ${f.min}–${f.max} ${f.unit}`;
        else if(f.step===1&&!Number.isInteger(Number(v)))errors[f.id]='請輸入整數';
      }
    }
    return errors;
  }
  const r = n=>Math.round((n+Number.EPSILON)*100)/100;
  function evaluate(s) {
    const errors=validate(s);
    if(Object.keys(errors).length)return {valid:false,errors};
    const n=id=>Number(s[id]);
    const entries=[];
    const add=(id,label,group,score)=>entries.push({id,label,group,score:r(score)});
    const oj=n('overjet'),ob=n('overbite'),c=n('crowding'),a=n('anb'),u=n('u1sn'),m=n('snmp'),e=n('eline');
    add('overjet','前牙覆蓋','dental',oj<0?-oj*2:oj<1?2:oj<=3?0:oj<=5?4:oj<=7?6:oj<=9?8:10);
    add('overbite','前牙覆咬／開咬','dental',ob<0?-ob*n('openTeeth')*3:ob<1?3:ob<=3?0:ob<=5?6:ob<=7?9:15);
    add('crowding','最大單顎擁擠','dental',c<=3?0:c<=5?2:c<=7?3:4);
    const mm=n('molarMm');
    add('molar','磨牙關係計畫','dental',s.molar==='maintain'||mm===0?0:s.molar==='distal'?(mm<2?0:mm<=5?3:7):(mm<2?3:mm<=5?7:12));
    add('posteriorOpen','後牙開咬','dental',n('posteriorOpen')*2);
    add('posteriorCross','後牙反咬','dental',n('posteriorCross')*4);
    add('scissor','後牙鎖咬','dental',n('scissor')*6);
    add('spacing','最大單一間隙','dental',s.closeSpace==='yes'?Math.max(0,n('spacing')-2)*2:0);
    add('anomaly','牙形態異常','dental',n('anomaly')*5);
    add('midline','中線偏差','dental',Math.max(0,n('midline')-2)*2);
    add('premolarRotation','前磨牙旋轉','dental',n('premolarRotation')*.2);
    add('lateralRotation','側切牙旋轉','dental',n('lateralRotation')*.2);
    add('anb','ANB','radio',a< -4?8:a< -2?6:a<0?2:a<=4?0:a<=6?2:a<=8?6:8);
    add('u1sn','U1–SN','radio',s.correctU1==='no'?0:u<80?6:u<90?4:u<100?2:u<=110?0:u<=120?6:u<=130?10:12);
    add('snmp','SN–MP','radio',m<10?6:m<20?4:m<30?2:m<=40?0:m<=50?2:m<=60?6:8);
    for(const id of ['impaction','supernumerary','missing','transposition','surgery']) {
      const f=fields.find(f=>f.id===id);add(id,f.label,'radio',s[id]?f.score:0);
    }
    add('rootResorption','牙根吸收','radio',s.rootResorption==='none'?0:s.rootResorption==='under'?10:20);
    add('eline','E-line','clinical',s.correctEline==='no'?0:e< -4?6:e< -2?4:e<=2?0:e<=4?6:10);
    add('gummy','露齦','clinical',s.correctGummy==='no'?0:n('gummy')<2?0:n('gummy')<=4?4:8);
    for(const id of ['chin','cant','periodontitis','tmd','caries']) {
      const f=fields.find(f=>f.id===id);add(id,f.label,'clinical',s[id]?f.score:0);
    }
    const domains = Object.fromEntries(['dental','radio','clinical'].map(g=>[g,r(entries.filter(e=>e.group===g).reduce((sum,e)=>sum+e.score,0))]));
    const baseline=r(entries.reduce((sum,e)=>sum+e.score,0));
    const factors=entries.filter(e=>e.score>0).map(e=>({...e,origin:'CAT-CAT'})).sort((a,b)=>b.score-a.score);
    return {valid:true,baseline,domains,entries,factors};
  }
  function diff(before,after) {
    const a=evaluate(before),b=evaluate(after);
    if(!a.valid||!b.valid)return null;
    return {baseline:r(b.baseline-a.baseline),fields:fields.filter(f=>active(f,before)||active(f,after)).filter(f=>String(before[f.id])!==String(after[f.id])).map(f=>({id:f.id,label:f.label,before:before[f.id],after:after[f.id],unit:f.unit||'',type:f.type,options:f.options}))};
  }
  const blank=()=>Object.fromEntries(fields.map(f=>[f.id,f.id==='caseId'?'CASE-'+Date.now().toString(36).toUpperCase():f.type==='check'?null:'']));
  const sanitize=s=>Object.fromEntries(fields.map(f=>[f.id,s?.[f.id]??(f.type==='check'?null:'')]));
  return {version,groups,fields,defaults,presets,active,validate,evaluate,diff,blank,sanitize,round:r};
});
