import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';
fs.mkdirSync('artifacts',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const errors=[];
let page;
try{
 page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
 page.on('pageerror',e=>errors.push(String(e)));
 await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
 assert.ok(await page.locator('.astra-home').isVisible(),'Página inicial invisível');
 assert.equal(await page.locator('#map-home .map-node').count(),6,'Mapa precisa ter seis planetas');
 assert.equal(await page.locator('.astra-feature-card').count(),3,'Destaques ilustrados ausentes');
 assert.equal(await page.locator('.astra-achievement').count(),4,'Selos ausentes');
 await page.screenshot({path:'artifacts/astra-desktop.png',fullPage:true,animations:'disabled'});

 await page.locator('#astra-search').fill('buzzer');
 assert.ok(await page.locator('.astra-search-result').count()>=1,'Busca não devolveu buzzer');
 await page.locator('.astra-search-result').first().click();
 assert.ok(await page.locator('[data-page="circuitos"]').isVisible(),'Busca não navegou para circuitos');
 assert.equal(await page.locator('.astra-course-card').count(),10,'Não existem dez aulas');
 assert.ok(await page.locator('#astra-lesson').isVisible(),'Busca não abriu a lição');
 await page.waitForTimeout(450);
 const broken=await page.locator('img').evaluateAll(xs=>xs.filter(x=>x.offsetParent!==null && (!x.complete||x.naturalWidth===0)).map(x=>x.getAttribute('src')));
 assert.deepEqual(broken,[],'Imagens visíveis não carregadas');

 await page.locator('.nav-btn[data-nav="inicio"]').click();
 await page.locator('#map-home .map-node.n0').click();
 assert.ok(await page.locator('#activity-modal').evaluate(x=>x.classList.contains('open')),'Missão 1 não abriu');
 await page.locator('#close-activity').click();

 await page.setViewportSize({width:390,height:844});
 await page.reload({waitUntil:'networkidle'});
 assert.ok(await page.locator('.astra-home').isVisible(),'Página inicial não aparece no celular');
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
 assert.ok(overflow<=12,'Site extrapola viewport móvel: '+overflow+'px');
 await page.screenshot({path:'artifacts/astra-mobile.png',fullPage:true,animations:'disabled'});
 assert.deepEqual(errors,[],'Erros JavaScript encontrados: '+errors.join(' | '));
 console.log('✓ Browser QA: desktop, mobile, jornada, busca, dez aulas e imagens renderizaram.');
}finally{await browser.close()}
