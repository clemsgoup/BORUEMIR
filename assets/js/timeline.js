/* Kalendergeometrie arbeitet in UTC-Tagen: keine Verzerrung durch Sommerzeit. */
(function(root){
 const day=s=>Date.parse(s+'T00:00:00Z')/86400000;
 function segment(start,end,from,to){
  if(!start||!end||end<from||start>to)return null;
  const total=day(to)-day(from)+1,a=Math.max(day(start),day(from)),b=Math.min(day(end),day(to));
  return {left:100*(a-day(from))/total,width:100*(b-a+1)/total};
 }
 root.BTimeline={day,segment};if(typeof module!=='undefined')module.exports=root.BTimeline;
})(typeof window!=='undefined'?window:globalThis);
let timelineAnchor=new Date(),timelineMonths=3;
function timelineMove(direction){timelineAnchor=new Date(timelineAnchor.getFullYear(),timelineAnchor.getMonth()+direction*timelineMonths,1,12);}
function timelineReset(){timelineAnchor=new Date();}
function renderTimeline(){
 const first=new Date(timelineAnchor.getFullYear(),timelineAnchor.getMonth(),1,12),last=new Date(first.getFullYear(),first.getMonth()+timelineMonths,0,12),from=C.iso(first),to=C.iso(last),G=window.BTimeline;
 const total=G.day(to)-G.day(from)+1;
 const monthName=d=>d.toLocaleDateString('de-DE',{month:'long',year:'numeric'});
 $('timeline-caption').textContent=monthName(first)+(timelineMonths>1?' – '+monthName(last):'');
 if(!data.projects.length){$('timeline').innerHTML='<div class="empty"><h3>Noch keine Projekte</h3><p>Lege ein Projekt an und trage einen Zeitraum ein.</p><button data-action="new-project" class="primary">+ Projekt</button></div>';return;}
 let ticks='';for(let i=0;i<timelineMonths;i++){const a=new Date(first.getFullYear(),first.getMonth()+i,1,12),b=new Date(a.getFullYear(),a.getMonth()+1,0,12),pos=G.segment(C.iso(a),C.iso(b),from,to);ticks+=`<span class="timeline-month" style="left:${pos.left}%;width:${pos.width}%">${esc(monthName(a))}</span>`;}
 let days='';const step=timelineMonths===1?1:timelineMonths===3?7:0;
 if(step)for(let i=0;i<total;i+=step){const d=new Date(first);d.setDate(d.getDate()+i);days+=`<span class="timeline-tick" style="left:${100*i/total}%">${d.getDate()}.${d.getMonth()+1}.</span>`;}
 const today=C.today(),todayPos=today>=from&&today<=to?(G.day(today)-G.day(from)+.5)/total*100:null;
 function bar(start,end,kind,label){const g=G.segment(start,end,from,to);return g?`<span class="timeline-bar ${kind}" style="left:${g.left}%;width:${g.width}%" title="${esc(label)}"><span class="sr-only">${esc(label)}</span></span>`:'';}
 function row(p,t=null,sub=null){
  const x=t||p,inherited=Boolean(sub),work=C.range(x.workKind,x.workValue,x.workEnd),due=C.range(x.dueKind,x.dueValue).end;
  const projectLabel=p.projectStart?`Projektzeitraum: ${dateLabel(p.projectStart)} – ${dateLabel(p.projectEnd)}`:'';
  let track=bar(p.projectStart,p.projectEnd,'project-background',projectLabel);
  track+=bar(work.start,work.end,inherited?'inherited':'work-bar',`${inherited?'Von Aufgabe übernommen · ':''}Bearbeitung: ${dateLabel(work.start)} – ${dateLabel(work.end)}`);
  if(due&&due>=from&&due<=to){const position=(G.day(due)-G.day(from)+.5)/total*100;track+=`<span class="deadline-marker ${inherited?'inherited-marker':''}" style="left:${position}%" title="${inherited?'Von Aufgabe übernommen · ':''}Deadline: ${dateLabel(due)}">◆</span>`;}
  if(todayPos!==null)track+=`<span class="today-marker" style="left:${todayPos}%" title="Heute"></span>`;
  const dates=[work.start,work.end,due,...(!t?[p.projectStart,p.projectEnd]:[])].filter(Boolean);
  const status=!dates.length?'Ohne eigene Zeitangabe':!dates.some(d=>d>=from&&d<=to)&&!G.segment(work.start,work.end,from,to)&&!( !t&&G.segment(p.projectStart,p.projectEnd,from,to))?'Außerhalb der Ansicht':'';
  if(status)track+=`<span class="timeline-status">${status}</span>`;
  const done=sub?sub.done:t?.done,label=sub?sub.text:t?t.title:p.name;
  const details=[!t?projectLabel:'',work.start?`${inherited?'Übernommen: ':''}${dateLabel(work.start)} – ${dateLabel(work.end)}`:'',due?`Deadline ${dateLabel(due)}`:''].filter(Boolean).join(' · ');
  return `<div class="timeline-row ${t?'task-row':'project-row'} ${sub?'subtask-row':''} ${done?'is-done':''}"><div class="timeline-label"><button data-action="${t?'edit-task':'edit-project'}" data-id="${esc(x.id)}">${done?'✓ ':sub?'↳ ':''}${esc(label)}</button><small>${esc(sub?'Unteraufgabe · Zeitraum der Aufgabe':t?'Aufgabe':p.number||'Projekt')}</small>${details?`<small class="timeline-date-text">${esc(details)}</small>`:''}</div><div class="timeline-track">${track}</div></div>`;
 }
 let rows='';for(const p of [...data.projects].sort((a,b)=>b.priority-a.priority||a.name.localeCompare(b.name,'de'))){rows+=row(p);for(const t of C.sortTasks(data.tasks.filter(t=>t.projectId===p.id),data.projects)){rows+=row(p,t);for(const s of t.subtasks)rows+=row(p,t,s);}}
 $('timeline').innerHTML=`<div class="timeline-grid" style="--chart-width:${timelineMonths===1?900:timelineMonths===3?1100:1600}px"><div class="timeline-row timeline-heading"><div class="timeline-label">Projekt / Aufgabe</div><div class="timeline-axis">${ticks}${days}${todayPos!==null?`<span class="today-label" style="left:${todayPos}%">Heute</span>`:''}</div></div>${rows}</div>`;
}
