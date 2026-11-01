(()=>{
'use strict';
const input=document.getElementById('astra-search');
const list=document.getElementById('astra-search-results');
if(!input||!list)return;
const entries=[
 ['Início','Página inicial','inicio',''],
 ['Jornada estelar','Mapa das missões','mapa',''],
 ['Missões da galáxia','Seis desafios de lógica e impacto','missoes',''],
 ['Meu progresso e medalhas','Conquistas e progresso local','medalhas',''],
 ['Laboratório de sensores','Experimento virtual de nível de água','laboratorio',''],
 ['Meu cantinho de invenções','Crie um projeto social','criacao',''],
 ['Circuitos e lógica','Dez aulas interativas','circuitos',''],
 ['LED e resistor','Eletrônica: missão 1','circuitos','0'],
 ['Botão e LED','Circuitos: missão 2','circuitos','1'],
 ['Semáforo com Arduino','Circuitos: missão 3','circuitos','2'],
 ['Buzzer sonoro','Circuitos: missão 4','circuitos','3'],
 ['Sensor de luz LDR','Circuitos: missão 5','circuitos','4'],
 ['Sensor ultrassônico','Circuitos: missão 6','circuitos','5'],
 ['Servo motor','Circuitos: missão 7','circuitos','6'],
 ['Display LCD 16x2','Circuitos: missão 8','circuitos','7'],
 ['Temperatura e umidade DHT11','Circuitos: missão 9','circuitos','8'],
 ['Portas lógicas','Circuitos: missão 10','circuitos','9']
];
let shown=[],focusIndex=-1;
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
function close(){list.hidden=true;list.replaceChildren();shown=[];focusIndex=-1;input.setAttribute('aria-expanded','false');input.removeAttribute('aria-activedescendant')}
function open(){const q=normalize(input.value);if(q.length<2){close();return}
 shown=entries.filter(e=>normalize(e[0]+' '+e[1]).includes(q)).slice(0,8);
 list.replaceChildren();focusIndex=-1;
 if(!shown.length){const p=document.createElement('p');p.className='astra-search-no-results';p.textContent='Nenhum resultado encontrado. Experimente “LED”, “robótica” ou “missões”.';list.append(p)}
 shown.forEach((e,i)=>{
   const b=document.createElement('button');b.type='button';b.className='astra-search-result';b.id='astra-search-item-'+i;b.setAttribute('role','option');b.setAttribute('aria-selected','false');
   const glyph=document.createElement('span');glyph.setAttribute('aria-hidden','true');glyph.textContent=e[2]==='circuitos'?'⚡':'✧';
   const detail=document.createElement('span'),title=document.createElement('strong'),sub=document.createElement('small');
   title.textContent=e[0];sub.textContent=e[1];detail.append(title,sub);b.append(glyph,detail);
   b.addEventListener('click',()=>choose(e));list.append(b);
 });
 list.hidden=false;input.setAttribute('aria-expanded','true');
}
function choose(e){
 const nav=document.querySelector('.nav-btn[data-nav="'+e[2]+'"]');
 close();input.value='';
 if(nav)nav.click();
 if(e[2]==='circuitos'&&e[3]!==''){
   const btn=document.querySelector('#astra-course-grid [data-lesson="'+e[3]+'"]');
   if(btn)btn.click();
 }
}
input.addEventListener('input',open);
input.addEventListener('focus',()=>{if(input.value.trim().length>=2)open()});
input.addEventListener('keydown',e=>{
 if(e.key==='Escape'){close();return}
 if(list.hidden)return;
 if(e.key==='ArrowDown'||e.key==='ArrowUp'){
   e.preventDefault();if(!shown.length)return;
   focusIndex=(focusIndex+(e.key==='ArrowDown'?1:-1)+shown.length)%shown.length;
   const opts=[...list.querySelectorAll('[role=option]')];
   opts.forEach((x,i)=>x.setAttribute('aria-selected',String(i===focusIndex)));
   input.setAttribute('aria-activedescendant',opts[focusIndex].id);
   opts[focusIndex].scrollIntoView({block:'nearest'});
 }
 if(e.key==='Enter'&&shown.length){e.preventDefault();choose(shown[Math.max(0,focusIndex)])}
});
document.addEventListener('pointerdown',e=>{if(!e.target.closest('.astra-search-wrap'))close()});
})();