/* Local text-PDF reader. It never evaluates PDF code or executes actions.
 * Unsupported fonts, transforms and filters defer to the full PDF reader.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.CatPdfText=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const LIMIT=20*1024*1024,white=c=>c!==undefined&&/[\s\0]/.test(c),delim=c=>c===undefined||white(c)||'()<>[]{}/%'.includes(c),name=x=>x?.name;
  function fail(code='pdfTextUnsupported'){throw new Error(code);}
  function binary(bytes){let s='';for(let i=0;i<bytes.length;i+=8192)s+=String.fromCharCode(...bytes.subarray(i,i+8192));return s;}
  function hexBytes(s){s=s.replace(/\s/g,'');if(!/^[a-f\d]*$/i.test(s))fail();if(s.length%2)s+='0';const out=new Uint8Array(s.length/2);for(let i=0;i<out.length;i++)out[i]=parseInt(s.slice(i*2,i*2+2),16);return out;}
  function ascii85(data){let s=binary(data).replace(/\s/g,'').replace(/^<~/,'');const end=s.indexOf('~>');if(end<0)fail();s=s.slice(0,end);const out=[],group=[];const flush=padding=>{const n=group.reduce((a,b)=>a*85+b,0);if(n>0xffffffff)fail();for(let i=0;i<4-padding;i++)out.push(Math.floor(n/2**(24-i*8))&255);group.length=0;};for(const c of s){if(c==='z'){if(group.length)fail();out.push(0,0,0,0);continue;}const n=c.charCodeAt(0)-33;if(n<0||n>84)fail();group.push(n);if(group.length===5)flush(0);}if(group.length===1)fail();if(group.length){const padding=5-group.length;while(group.length<5)group.push(84);flush(padding);}return Uint8Array.from(out);}
  function lexer(s){let at=0;return {get position(){return at;},next(){
    while(at<s.length){if(white(s[at])){at++;continue;}if(s[at]==='%'){while(at<s.length&&!/[\r\n]/.test(s[at]))at++;continue;}break;}
    if(at>=s.length)return null;let c=s[at++];
    if(c==='('){let depth=1,bytes=[];while(at<s.length&&depth){c=s[at++];if(c==='\\'){c=s[at++];if(/[0-7]/.test(c)){let n=c;for(let i=0;i<2&&/[0-7]/.test(s[at]||'x');i++)n+=s[at++];bytes.push(parseInt(n,8));}else if(c==='\r'||c==='\n'){if(c==='\r'&&s[at]==='\n')at++;}else bytes.push(({n:10,r:13,t:9,b:8,f:12})[c]??c.charCodeAt(0));}else if(c==='('){depth++;bytes.push(40);}else if(c===')'){if(--depth)bytes.push(41);}else bytes.push(c.charCodeAt(0));}if(depth)fail();return {bytes:Uint8Array.from(bytes)};}
    if(c==='<'){if(s[at]==='<'){at++;return '<<';}const end=s.indexOf('>',at);if(end<0)fail();const bytes=hexBytes(s.slice(at,end));at=end+1;return {bytes};}
    if(c==='>'&&s[at]==='>'){at++;return '>>';}
    if(c==='/' ){const start=at;while(!delim(s[at]))at++;return {name:s.slice(start,at).replace(/#([a-f\d]{2})/gi,(_,h)=>String.fromCharCode(parseInt(h,16)))};}
    if('[]'.includes(c))return c;const start=at-1;while(!delim(s[at]))at++;if(at===start)at++;const word=s.slice(start,at);return /^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(word)?Number(word):word;
  }};}
  function parse(s){const l=lexer(s),queue=[];const next=()=>queue.length?queue.shift():l.next(),peek=n=>{while(queue.length<n)queue.push(l.next());return queue[n-1];};
    function value(depth=0){if(depth>50)fail();let t=next();if(t==='<<'){const out={};while(peek(1)!=='>>'){if(peek(1)===null)fail();const key=next();if(!name(key))fail();out[key.name]=value(depth+1);}next();return out;}
      if(t==='['){const out=[];while(peek(1)!==']'){if(peek(1)===null)fail();out.push(value(depth+1));if(out.length>100000)fail();}next();return out;}
      if(typeof t==='number'&&typeof peek(1)==='number'&&peek(2)==='R'){const gen=next();next();return {ref:t,gen};}return t;}
    return value();
  }
  async function open(data,inflate){
    const bytes=new Uint8Array(data),source=binary(bytes);if(!source.startsWith('%PDF-'))fail('invalidPdf');if(/\/Encrypt\s+(?:\d|<<)/.test(source))fail('encryptedPdf');
    const objects=new Map(),pattern=/(\d+)\s+(\d+)\s+obj\b/g;let match,total=0;
    while((match=pattern.exec(source))){const start=pattern.lastIndex,end=source.indexOf('endobj',start);if(end<0)fail();const body=source.slice(start,end),marker=/\bstream(?:\r\n|\n|\r)/.exec(body),dict=parse(marker?body.slice(0,marker.index):body);let stream=null;
      if(marker){const offset=start+marker.index+marker[0].length;let finish=source.indexOf('endstream',offset);if(finish<0)fail();if(typeof dict.Length==='number'&&dict.Length>=0&&offset+dict.Length<=finish)finish=offset+dict.Length;else while(finish>offset&&/[\r\n]/.test(source[finish-1]))finish--;stream=bytes.slice(offset,finish);pattern.lastIndex=source.indexOf('endobj',finish)+6;}else pattern.lastIndex=end+6;
      objects.set(Number(match[1]),{dict,stream});if(objects.size>10000)fail('tooLarge');
    }
    const object=x=>x?.ref!==undefined?objects.get(x.ref):null,resolve=x=>object(x)?.dict??x;
    async function decode(obj){if(!obj?.stream)fail();let result=obj.stream;const filters=resolve(obj.dict.Filter),list=Array.isArray(filters)?filters:filters?[filters]:[];const params=resolve(obj.dict.DecodeParms);if(params?.Predictor>1)fail();
      for(const filter of list){if(name(filter)==='FlateDecode'){if(typeof inflate!=='function')fail();result=inflate(result);}else if(name(filter)==='ASCIIHexDecode')result=hexBytes(binary(result).replace(/>.*$/s,''));else if(name(filter)==='ASCII85Decode')result=ascii85(result);else fail();if(result.length>LIMIT)fail('tooLarge');}
      total+=result.length;if(total>LIMIT)fail('tooLarge');return binary(result);
    }
    for(const obj of [...objects.values()])if(name(obj.dict?.Type)==='ObjStm'){const decoded=await decode(obj),header=decoded.slice(0,obj.dict.First).trim().split(/\s+/).map(Number);if(!Number.isInteger(obj.dict.N)||obj.dict.N>10000||header.length!==obj.dict.N*2)fail();for(let i=0;i<obj.dict.N;i++){const from=obj.dict.First+header[i*2+1],to=i+1<obj.dict.N?obj.dict.First+header[i*2+3]:decoded.length;objects.set(header[i*2],{dict:parse(decoded.slice(from,to)),stream:null});}}
    const catalogs=[...objects.values()].filter(o=>name(o.dict?.Type)==='Catalog'),catalog=catalogs.length===1?catalogs[0]:null,pages=[];
    const walk=(value,seen=new Set())=>{const d=resolve(value);if(!d||seen.has(d))fail();seen.add(d);if(name(d.Type)==='Page')pages.push(d);else if(name(d.Type)==='Pages'){for(const child of resolve(d.Kids)||[])walk(child,seen);}else fail();};
    if(!catalog)fail();walk(catalog.dict.Pages);if(!pages.length)fail();if(pages.length>30)fail('tooManyPages');
    const inherited=(page,key)=>{const seen=new Set();while(page&&!seen.has(page)){seen.add(page);if(key in page)return resolve(page[key]);page=resolve(page.Parent);}return null;};
    return {pages,resolve,object,decode,inherited};
  }
  function unicode(bytes){if(bytes.length%2)fail();let s='';for(let i=0;i<bytes.length;i+=2)s+=String.fromCharCode(bytes[i]*256+bytes[i+1]);return s;}
  function cmap(text){const map=new Map(),sizes=new Set();
    for(const match of text.matchAll(/beginbfchar([\s\S]*?)endbfchar/g))for(const pair of match[1].matchAll(/<([a-f\d]+)>\s*<([a-f\d]+)>/gi)){map.set(pair[1].toUpperCase(),unicode(hexBytes(pair[2])));sizes.add(pair[1].length/2);}
    for(const match of text.matchAll(/beginbfrange([\s\S]*?)endbfrange/g)){const l=lexer(match[1]);let start;while((start=l.next())!==null){const end=l.next(),destination=l.next();if(!start?.bytes||!end?.bytes)fail();const a=parseInt(binary(start.bytes).split('').map(c=>c.charCodeAt(0).toString(16).padStart(2,'0')).join(''),16),b=parseInt(binary(end.bytes).split('').map(c=>c.charCodeAt(0).toString(16).padStart(2,'0')).join(''),16),digits=start.bytes.length*2;if(b-a>65536||b<a)fail();sizes.add(start.bytes.length);
        if(destination==='['){for(let i=a;i<=b;i++){const item=l.next();if(!item?.bytes)fail();map.set(i.toString(16).padStart(digits,'0').toUpperCase(),unicode(item.bytes));}if(l.next()!==']')fail();}else{if(!destination?.bytes)fail();const base=unicode(destination.bytes);for(let i=a;i<=b;i++){const last=base.charCodeAt(base.length-1)+i-a;map.set(i.toString(16).padStart(digits,'0').toUpperCase(),base.slice(0,-1)+String.fromCharCode(last));}}
      }}
    if(!map.size)fail();return {map,sizes:[...sizes].sort((a,b)=>b-a)};
  }
  async function fonts(resources,pdf,cache){const result={};const entries=pdf.resolve(resources?.Font)||{};
    for(const [key,reference]of Object.entries(entries)){const dict=pdf.resolve(reference);if(cache.has(dict)){result[key]=cache.get(dict);continue;}const composite=name(dict.Subtype)==='Type0',unicodeRef=pdf.object(dict.ToUnicode),encoding=pdf.resolve(dict.Encoding);let mapping=null;if(unicodeRef)mapping=cmap(await pdf.decode(unicodeRef));else if(composite||typeof encoding==='object'&&encoding&&!encoding.name)fail();
      const widths=new Map(),descendant=composite?pdf.resolve(pdf.resolve(dict.DescendantFonts)?.[0]):dict;const w=pdf.resolve(descendant?.W)||[];for(let i=0;i<w.length;){const from=w[i++],values=pdf.resolve(w[i++]);if(Array.isArray(values))values.forEach((n,j)=>widths.set(from+j,n));else{const width=w[i++];if(values-from>65536)fail();for(let j=from;j<=values;j++)widths.set(j,width);}}
      if(!composite)(pdf.resolve(dict.Widths)||[]).forEach((n,j)=>widths.set((dict.FirstChar||0)+j,n));
      if(name(encoding)==='Identity-V')fail();
      if(!mapping&&name(encoding)&&!['WinAnsiEncoding','StandardEncoding','MacRomanEncoding'].includes(name(encoding)))fail();
      if(!mapping&&/Symbol|ZapfDingbats/.test(name(dict.BaseFont)||''))fail();
      const f={decode(bytes){let text='',width=0;for(let i=0;i<bytes.length;){let size=1,code=bytes[i],char;if(mapping){for(const n of mapping.sizes){const key=Array.from(bytes.subarray(i,i+n),x=>x.toString(16).padStart(2,'0')).join('').toUpperCase();if(key.length===n*2&&mapping.map.has(key)){size=n;code=parseInt(key,16);char=mapping.map.get(key);break;}}if(char===undefined)fail();}else {if(code>127&&(!name(encoding)||name(encoding)==='StandardEncoding'))fail();char=new TextDecoder(name(encoding)==='MacRomanEncoding'?'macintosh':'windows-1252').decode(bytes.subarray(i,i+1));}text+=char;width+=widths.get(code)??descendant?.DW??(composite?1000:500);i+=size;}return {text,width:width/1000};}};cache.set(dict,f);result[key]=f;
    }return result;
  }
  const multiply=(a,b)=>[a[0]*b[0]+a[2]*b[1],a[1]*b[0]+a[3]*b[1],a[0]*b[2]+a[2]*b[3],a[1]*b[2]+a[3]*b[3],a[0]*b[4]+a[2]*b[5]+a[4],a[1]*b[4]+a[3]*b[5]+a[5]],identity=()=>[1,0,0,1,0,0];
  async function content(text,resources,pdf,cache,items,ctm=identity(),depth=0){if(depth>10)fail();const fontMap=await fonts(resources,pdf,cache),l=lexer(text),stack=[],args=[];let state={ctm,tm:identity(),line:identity(),font:null,size:12,leading:0,spacing:0,word:0,scale:1,rise:0},token;
    const move=(x,y)=>{state.line=multiply(state.line,[1,0,0,1,x,y]);state.tm=state.line.slice();};
    const show=value=>{if(!value?.bytes||!state.font)fail();const decoded=state.font.decode(value.bytes),matrix=multiply(state.ctm,state.tm);if(Math.abs(matrix[1])>.001||Math.abs(matrix[2])>.001)fail();const advance=(decoded.width*state.size+decoded.text.length*state.spacing+(decoded.text.match(/ /g)||[]).length*state.word)*state.scale;items.push({str:decoded.text,width:Math.abs(advance*matrix[0]),transform:[matrix[0],matrix[1],matrix[2],matrix[3],matrix[4],matrix[5]+state.rise]});state.tm=multiply(state.tm,[1,0,0,1,advance,0]);if(items.length>100000)fail('tooLarge');};
    while((token=l.next())!==null){if(token==='['){const array=[];let t;while((t=l.next())!==']'){if(t===null)fail();array.push(t);}args.push(array);continue;}if(typeof token!=='string'){args.push(token);continue;}
      switch(token){case 'q':stack.push({...state,ctm:state.ctm.slice(),tm:state.tm.slice(),line:state.line.slice()});break;case 'Q':if(!stack.length)fail();state=stack.pop();break;case 'cm':state.ctm=multiply(state.ctm,args);break;case 'BT':state.tm=identity();state.line=identity();break;case 'Tf':state.font=fontMap[name(args[0])];state.size=args[1];break;case 'Tm':state.tm=args.slice();state.line=args.slice();break;case 'Td':move(args[0],args[1]);break;case 'TD':state.leading=-args[1];move(args[0],args[1]);break;case 'TL':state.leading=args[0];break;case 'T*':move(0,-state.leading);break;case 'Tc':state.spacing=args[0];break;case 'Tw':state.word=args[0];break;case 'Tz':state.scale=args[0]/100;break;case 'Ts':state.rise=args[0];break;case 'Tj':show(args[0]);break;case "'":move(0,-state.leading);show(args[0]);break;case '"':state.word=args[0];state.spacing=args[1];move(0,-state.leading);show(args[2]);break;case 'TJ':for(const part of args[0]||[]){if(typeof part==='number')state.tm=multiply(state.tm,[1,0,0,1,-part/1000*state.size*state.scale,0]);else show(part);}break;case 'Do':{const obj=pdf.object(pdf.resolve(resources?.XObject)?.[name(args[0])]);if(name(obj?.dict.Subtype)==='Image')items.hasImages=true;if(name(obj?.dict.Subtype)==='Form')await content(await pdf.decode(obj),pdf.resolve(obj.dict.Resources)||resources,pdf,cache,items,multiply(state.ctm,pdf.resolve(obj.dict.Matrix)||identity()),depth+1);break;}case 'BI':fail();}
      args.length=0;
    }
  }
  async function read(data,{inflate,onProgress,pdfRows,hasMeasurements}={}){const pdf=await open(data,inflate),rows=[],cache=new Map();let textCharacters=0;
    for(let i=0;i<pdf.pages.length;i++){onProgress?.({stage:'pdf',page:i+1,total:pdf.pages.length});const page=pdf.pages[i],items=[],resources=pdf.inherited(page,'Resources'),contents=pdf.resolve(page.Contents),references=Array.isArray(contents)?contents:[page.Contents];if(!resources)fail();for(const ref of references){const object=pdf.object(ref);if(!object)fail();await content(await pdf.decode(object),resources,pdf,cache,items);}if(!items.length)fail();const pageRows=pdfRows(items);if(items.hasImages&&(!hasMeasurements||!hasMeasurements(pageRows)))fail();textCharacters+=items.reduce((n,x)=>n+x.str.trim().length,0);rows.push(...pageRows.map(row=>{row.page=i+1;return row;}));await new Promise(resolve=>setTimeout(resolve,0));}
    return [{name:'PDF',rows,meta:{pages:pdf.pages.length,rows:rows.length,textCharacters,ocrPages:0,reader:'local-text'}}];
  }
  return {read};
});
