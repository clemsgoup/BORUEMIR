'use strict';
(()=>{
 const button=document.getElementById('install'),standalone=window.matchMedia('(display-mode: standalone)');let prompt=null;
 const installed=()=>standalone.matches||window.navigator.standalone===true;
 const update=()=>{button.hidden=installed()||!prompt;document.getElementById('install-help').hidden=installed();};
 window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();prompt=e;update();});
 window.addEventListener('appinstalled',()=>{prompt=null;button.hidden=true;});
 standalone.addEventListener('change',update);
 button.addEventListener('click',async()=>{if(!prompt)return;const current=prompt;prompt=null;button.hidden=true;try{await current.prompt();await current.userChoice;}catch{document.getElementById('install-help').open=true;}update();});
 if('serviceWorker' in navigator&&window.isSecureContext)navigator.serviceWorker.register('./sw.js').catch(()=>{const n=document.getElementById('notice');n.textContent='Offline-Modus konnte nicht eingerichtet werden. Du kannst die App online weiter nutzen.';n.hidden=false;});
 update();
})();
