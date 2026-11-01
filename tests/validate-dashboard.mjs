import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const read = f => fs.readFileSync(f,'utf8');
const html=read('index.html');
const css=read('assets/css/dashboard.css');
const js=read('assets/js/app.js');
const search=read('assets/js/search.js');

for(const id of ['home-title','map-home','home-stars','home-awards','world-name','level-label','passport-stars','progress-fill','progressbar','mission-counter','next-award','featured-title','featured-desc','featured-symbol','featured-btn','settings-inline','astra-search','astra-search-results','astra-course-grid','astra-lesson']){
 assert.ok(html.includes('id="'+id+'"'),'ID obrigatório ausente: '+id);
}
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
assert.equal(ids.length,new Set(ids).size,'HTML contém IDs duplicados');
for(const page of ['inicio','mapa','missoes','circuitos','laboratorio','criacao','medalhas']){
 assert.match(html,new RegExp('data-page="'+page+'"'),'Seção ausente: '+page);
 assert.match(html,new RegExp('class="nav-btn[^"]*" data-nav="'+page+'"'),'Menu ausente: '+page);
}
for(const f of ['assets/css/styles.css','assets/css/dashboard.css','assets/js/app.js','assets/js/circuitos.js','assets/js/search.js']){
 assert.ok(fs.existsSync(f),'Arquivo essencial não encontrado: '+f);
 assert.ok(html.includes('"'+f+'"'),'HTML não carrega '+f);
}
for(const [,url] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
 if(url.startsWith('#')||/^(https?:|mailto:|data:)/.test(url))continue;
 assert.ok(fs.existsSync(url),'HTML referencia arquivo ausente: '+url);
}
for(const [,url] of css.matchAll(/url\(['"]?([^'")]+)['"]?\)/g)){
 if(/^(https?:|data:)/.test(url))continue;
 const file=path.resolve('assets/css',url);
 assert.ok(fs.existsSync(file),'CSS referencia imagem ausente: '+url);
}
const planets=['explorar','aprender','experimentar','criar','impactar','liderar'];
const illustrations=[
 ...planets.map(x=>x+'.svg'),
 ...['led','code','impact'].map(x=>'mission-'+x+'.svg'),
 ...['estrela','planeta','ideia','comunidade'].map(x=>'badge-'+x+'.svg')
];
for(const art of illustrations){
 const file='assets/images/astraverse/'+art;
 const svg=read(file);
 assert.match(svg,/<svg\b/,'Imagem inválida: '+art);
 assert.match(svg,/<\/svg>/,'SVG sem fechamento: '+art);
 assert.doesNotMatch(svg,/<script\b/i,'SVG com script: '+art);
}
assert.match(js,/buildMap\(id==='map-home'\)/,'Jornada precisa do mapa específico');
assert.match(js,/\.astra-achievement/,'Conquistas precisam acompanhar progresso');
assert.match(search,/astra-search-results/,'Busca deve possuir resultados acessíveis');
assert.match(search,/choose\(e\)/,'Busca deve permitir selecionar resultado');
assert.doesNotMatch(html,/72 meninas online agora/i,'Não inventar estatísticas de menores');
console.log('✓ Estrutura, 13 ilustrações, caminhos CSS/HTML, navegação e busca verificados.');
