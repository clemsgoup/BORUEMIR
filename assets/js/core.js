/* Reine Daten- und Datumsfunktionen, auch unter Node testbar. */
(function(root){
'use strict';
const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const parse=s=>new Date(`${s}T12:00:00`);
const today=()=>iso(new Date());
function range(kind,value,end=''){
 if(!value||kind==='none')return {start:'',end:''};
 if(kind==='date')return {start:value,end:end||value};
 if(kind==='month'){const [y,m]=value.split('-').map(Number);return {start:`${value}-01`,end:iso(new Date(y,m,0,12))};}
 if(kind==='week'){const [y,w]=value.split('-W').map(Number),d=new Date(y,0,4,12);d.setDate(d.getDate()-((d.getDay()+6)%7)+(w-1)*7);const start=iso(d);d.setDate(d.getDate()+6);return {start,end:iso(d)};}
 return {start:'',end:''};
}
function shift(date,rule){
 if(!date)return '';
 const d=parse(date);
 if(rule==='monthly'){const day=d.getDate();d.setDate(1);d.setMonth(d.getMonth()+1);const last=new Date(d.getFullYear(),d.getMonth()+1,0,12).getDate();d.setDate(Math.min(day,last));}
 else d.setDate(d.getDate()+(rule==='weekly'?7:1));
 return iso(d);
}
function nextTask(task,id){
 const n=JSON.parse(JSON.stringify(task));n.id=id;n.done=false;n.completedAt='';n.subtasks=n.subtasks.map(s=>({...s,done:false}));
 const r=range(n.workKind,n.workValue,n.workEnd),deadline=range(n.dueKind,n.dueValue).end;
 n.workKind=r.start?'date':'none';n.workValue=shift(r.start,n.repeat);n.workEnd=shift(r.end,n.repeat);
 n.dueKind='date';n.dueValue=shift(deadline||today(),n.repeat);return n;
}
function sortTasks(tasks,projects){const map=new Map(projects.map(p=>[p.id,p]));return [...tasks].sort((a,b)=>(map.get(b.projectId)?.priority||0)-(map.get(a.projectId)?.priority||0)||b.priority-a.priority||(range(a.dueKind,a.dueValue).end||'9999').localeCompare(range(b.dueKind,b.dueValue).end||'9999')||a.title.localeCompare(b.title,'de'));}
function validDate(s){return /^\d{4}-\d{2}-\d{2}$/.test(s)&&!isNaN(parse(s))&&iso(parse(s))===s;}
function validValue(kind,v){if(kind==='none')return v==='';if(kind==='date')return validDate(v);if(kind==='month')return /^\d{4}-(0[1-9]|1[0-2])$/.test(v);if(kind==='week'){if(!/^\d{4}-W(0[1-9]|[1-4]\d|5[0-3])$/.test(v))return false;const start=parse(range(kind,v).start);start.setDate(start.getDate()+3);return start.getFullYear()===Number(v.slice(0,4));}return false;}
function validSchedule(x){return validValue(x.workKind,x.workValue)&&validValue(x.dueKind,x.dueValue)&&typeof x.workEnd==='string'&&(x.workEnd===''||validDate(x.workEnd))&&(x.workKind!=='date'||!x.workEnd||x.workEnd>=x.workValue);}
function validate(data){
 if(!data||data.version!==1||!Array.isArray(data.projects)||!Array.isArray(data.tasks))return false;
 const ids=new Set(), str=x=>typeof x==='string',priority=x=>[0,1,2].includes(x);
 for(const p of data.projects){if(!p||!str(p.id)||!p.id||ids.has(p.id)||!str(p.name)||!p.name.trim()||!str(p.number)||!str(p.contact)||!str(p.notes)||typeof p.pinned!=='boolean'||!priority(p.priority)||!validSchedule(p))return false;ids.add(p.id);}
 const tids=new Set();
 for(const t of data.tasks){if(!t||!str(t.id)||!t.id||tids.has(t.id)||!ids.has(t.projectId)||!str(t.title)||!t.title.trim()||!str(t.notes)||!priority(t.priority)||typeof t.done!=='boolean'||!['once','daily','weekly','monthly','ongoing'].includes(t.repeat)||!validSchedule(t)||!Array.isArray(t.subtasks)||!t.subtasks.every(s=>s&&str(s.text)&&typeof s.done==='boolean')||!str(t.completedAt)||typeof t.nextCreated!=='boolean')return false;tids.add(t.id);}
 return true;
}
const api={iso,parse,today,range,shift,nextTask,sortTasks,validate,validValue};root.BCore=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
