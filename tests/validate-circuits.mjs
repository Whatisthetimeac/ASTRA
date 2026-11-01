import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = p => fs.readFileSync(p,'utf8');
const html=read('index.html'), js=read('assets/js/circuitos.js'), app=read('assets/js/app.js');
assert.match(html,/data-page="circuitos"/);
assert.match(html,/assets\/js\/circuitos\.js/);
assert.match(app,/circuitos:'Circuitos e lógica'/);
assert.match(js,/tinkercad\.com\/circuits/);
assert.match(js,/não são fotografias ou capturas reais/);
const ids=['led','button','traffic','buzzer','ldr','sonar','servo','lcd','dht','logic'];
for(const id of ids) {
  assert.ok(fs.existsSync('assets/images/circuitos/'+id+'.svg'),id+' sem SVG');
  assert.match(js,new RegExp('"'+id+'"'),id+' sem aula');
}
const matches=[...js.matchAll(/\["[^"]+","[^"]+","(led|button|traffic|buzzer|ldr|sonar|servo|lcd|dht|logic)"/g)];
assert.equal(matches.length,10,'A trilha precisa de 10 aulas');
assert.match(js,/this\.onerror=null/,'fallback deve evitar loop de erro');
console.log('ASTRA: 10 aulas, navegacao, aviso de imagens e fallback verificados.');
