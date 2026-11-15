import menuData from '../menu-data.json'
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav-links');
toggle.setAttribute('aria-expanded', 'false');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
nav.addEventListener('click', () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); });
document.addEventListener('keydown', event => { if(event.key === 'Escape'){ nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); } });
const items=menuData.items;
const grid=document.querySelector('#menuGrid');
const toolbar=document.querySelector('.menu-toolbar');
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let selected=menuData.categories[0].slug;
toolbar.innerHTML=menuData.categories.map(category=>`<button class="filter" aria-pressed="${category.slug===selected}" data-filter="${category.slug}">${escape(category.name)}</button>`).join('');
const search=document.querySelector('#menuSearch');
function render(){
  const query=search.value.trim().toLocaleLowerCase('de');
  const visible=items.filter(item=>(query || item.categorySlug===selected) && (!query || (item.title+' '+item.description).toLocaleLowerCase('de').includes(query)));
  document.querySelector('#menuCount').textContent=visible.length+' Gerichte & Getränke';
  grid.innerHTML=visible.length ? visible.map(item=>`<article class="menu-card"><div class="menu-card-head"><h3>${escape(item.title)}</h3><span class="price">${Number(item.price).toLocaleString('de-DE',{style:'currency',currency:'EUR'})}</span></div>${item.description ? `<p>${escape(item.description)}</p>` : ''}<div class="menu-card-bottom">${item.allergens ? `<details><summary>Allergene</summary><p>${escape(item.allergens)}</p></details>` : '<span></span>'}<a class="dish-link" href="https://pizza-holzminden.order.app.hd.digital/menus" target="_blank" rel="noopener" aria-label="${escape(item.title)} online bestellen"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></div></article>`).join('') : '<p class="empty-menu">Kein Gericht gefunden. Probiere einen anderen Suchbegriff.</p>';
  toolbar.querySelectorAll('button').forEach(button=>{button.classList.toggle('active',!query && button.dataset.filter===selected);button.setAttribute('aria-pressed',String(!query && button.dataset.filter===selected));});
}
toolbar.addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;selected=button.dataset.filter;search.value='';render();});
search.addEventListener('input',render);render();
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.animate([{opacity:0,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.2,.7,.2,1)'});observer.unobserve(entry.target);}}),{threshold:.12});
  document.querySelectorAll('.story-copy,.story-image,.section-intro,.order-band .container,.contact-card').forEach(el=>observer.observe(el));
}
