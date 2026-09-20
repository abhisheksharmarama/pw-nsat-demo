/* ---------- landing helpers ---------- */
function toForm(){var el=document.getElementById('formCard');el.scrollIntoView({behavior:'smooth',block:'center'});
  if(!document.getElementById('s1').classList.contains('hidden')){setTimeout(function(){document.getElementById('f-class').focus()},420);}}
function show(id){['s1','s2','s3','s4'].forEach(function(s){document.getElementById(s).classList.toggle('hidden',s!==id);});}
function dots(n){for(var i=1;i<=3;i++)document.getElementById('d'+i).classList.toggle('on',i<=n);}
document.getElementById('f-phone').addEventListener('input',function(){this.value=this.value.replace(/\D/g,'').slice(0,10);});
function toS2(){var c=document.getElementById('f-class').value,ph=document.getElementById('f-phone').value;
  if(!c){alert('Please select your class');return;}
  if(!/^[6-9]\d{9}$/.test(ph)){alert('Enter a valid 10-digit mobile number');return;}
  document.getElementById('pEcho').textContent='+91 '+ph; show('s2');dots(2);
  var o=document.querySelectorAll('.o');if(o[0])o[0].focus();}
function backS1(){show('s1');dots(1);}
function toS3(){show('s3');dots(3);}
function pickMode(el){document.querySelectorAll('.mode label').forEach(function(l){l.classList.remove('on')});el.closest('label').classList.add('on');}
function toDone(){if(!document.getElementById('f-date').value){alert('Please select an exam date');return;} show('s4');}
document.querySelectorAll('.o').forEach(function(b,i,a){
  b.addEventListener('input',function(){this.value=this.value.replace(/\D/g,'');if(this.value&&a[i+1])a[i+1].focus();});
  b.addEventListener('keydown',function(e){if(e.key==='Backspace'&&!this.value&&a[i-1])a[i-1].focus();});});
document.querySelectorAll('#faq .qa button').forEach(function(b){b.addEventListener('click',function(){
  var qa=b.parentElement,a=qa.querySelector('.a'),open=qa.classList.contains('open');
  document.querySelectorAll('#faq .qa').forEach(function(x){x.classList.remove('open');x.querySelector('.a').style.maxHeight=null;});
  if(!open){qa.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';}});});

/* ---------- live timer ---------- */
(function(){var dl=new Date();dl.setDate(dl.getDate()+9);dl.setHours(23,59,0,0);
  function p(x){return String(x).padStart(2,'0')}
  function t(){var d=dl-new Date();if(d<0)d=0;
    document.getElementById('cd-d').textContent=p(Math.floor(d/8.64e7));
    document.getElementById('cd-h').textContent=p(Math.floor(d%8.64e7/3.6e6));
    document.getElementById('cd-m').textContent=p(Math.floor(d%3.6e6/6e4));
    document.getElementById('cd-s').textContent=p(Math.floor(d%6e4/1e3));}
  t();setInterval(t,1000);})();

/* ---------- dashboard ---------- */
var MOCKS=[1,2,3,4,5].map(function(i){return {name:'Mock Paper '+i,done:false};});
function renderMocks(){
  document.getElementById('mocks').innerHTML=MOCKS.map(function(m,i){
    return '<div class="mock'+(m.done?' done':'')+'">'+
      '<span class="live">'+(m.done?'DONE':'LIVE')+'</span>'+
      '<div class="row"><div class="thumb">📝</div><div><div class="ends">Ends 30 Sept</div>'+
      '<div class="nm">'+m.name+'</div><div class="mins">60 mins · 40 questions</div></div></div>'+
      '<button class="att" onclick="attempt('+i+')">'+(m.done?
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg> Completed':
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg> Attempt')+
      '</button></div>';
  }).join('');
}
function attempt(i){ if(MOCKS[i].done){return;} MOCKS[i].done=true; renderMocks(); updateTracker(); }
function updateTracker(){
  var done=MOCKS.filter(function(m){return m.done}).length;
  document.getElementById('pDone').textContent=done;
  document.getElementById('trackFill').style.width=(done/5*100)+'%';
  for(var i=1;i<=5;i++){document.getElementById('n'+i).classList.toggle('hit',done>=i);}
  var c5=document.getElementById('chip500'),c10=document.getElementById('chip1000');
  c5.classList.toggle('hit',done>=3); c10.classList.toggle('hit',done>=5);
  var note=document.getElementById('rewardNote');
  if(done>=5){note.innerHTML='🎉 Unlocked! You\'ve earned <b>₹1000 off</b> on your PW Vidyapeeth batch.';}
  else if(done>=3){note.innerHTML='✅ <b>₹500 off</b> unlocked! Attempt '+(5-done)+' more to unlock <b>₹1000 off</b>.';}
  else{note.innerHTML='Attempt <b>'+(3-done)+'</b> more mock paper'+((3-done)>1?'s':'')+' to unlock <b>₹500 off</b> on your PW batch.';}
}
function openDashboard(){
  var nm=(document.getElementById('f-name').value||'').trim();
  document.getElementById('dName').textContent = nm ? nm.split(' ')[0] : 'there';
  document.getElementById('landing').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
  window.scrollTo(0,0);
  renderMocks(); updateTracker();
}
function backToSite(){document.getElementById('dashboard').classList.add('hidden');document.getElementById('landing').classList.remove('hidden');window.scrollTo(0,0);}
