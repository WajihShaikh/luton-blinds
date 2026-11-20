/* Luton Blinds V5: progressive motion and usability fixes. */
(() => {
 'use strict';
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const root=document.documentElement;
 const main=document.querySelector('main');
 if(main&&!main.id)main.id='main-content';

 // Only reveal the skip link when it receives keyboard focus.
 if(main&&!document.querySelector('.skip-link')){
  const link=document.createElement('a');
  link.className='skip-link';
  link.href='#main-content';
  link.textContent='Skip to main content';
  document.body.insertBefore(link,document.body.firstChild);
 }

 if(!reduce && 'IntersectionObserver' in window){
  const selectors=['.section-head','.editorial-image','.editorial-copy','.compare-card','.gallery-wide','.asym-gallery','.split-photo','.split-panel .copy','.process-item','.review-photo','.review-copy','.dark-feature','.closing','.faq-layout','.product-rail','.collection-tile'];
  const targets=[...document.querySelectorAll('main '+selectors.join(',main '))].filter(el=>!el.closest('[data-v5-reveal]'));
  targets.forEach((el,i)=>{
   el.dataset.v5Reveal=el.matches('.editorial-image,.split-photo,.review-photo,.dark-feature>img,.collection-tile')?'photo':'content';
   const delay=el.matches('.collection-tile,.compare-card,.process-item')?Math.min(i%3*85,170):0;
   el.style.setProperty('--v5-delay',`${delay}ms`);
  });
  const io=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('v5-inview');io.unobserve(entry.target)}});
  },{threshold:.07,rootMargin:'0px 0px -18px 0px'});
  targets.forEach(el=>{if(el.getBoundingClientRect().top<innerHeight*.95)el.classList.add('v5-inview');else io.observe(el)});
  root.classList.add('v5-motion');
 }
 document.querySelectorAll('.method-tabs button').forEach(btn=>{
  btn.setAttribute('aria-pressed',String(btn.classList.contains('active')));
  btn.addEventListener('click',()=>{
   document.querySelectorAll('.method-tabs button').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
  });
 });
 document.querySelectorAll('.filter-btn[data-filter]').forEach(btn=>{
  btn.setAttribute('aria-pressed',String(btn.classList.contains('active')));
  btn.addEventListener('click',()=>document.querySelectorAll('.filter-btn[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn))));
 });
 const mobile=document.getElementById('mobile-nav');
 const toggle=document.querySelector('.menu-toggle');
 if(toggle&&mobile){
  const outside=e=>{
   if(innerWidth>920)return;
   if(mobile.classList.contains('show')&&!mobile.contains(e.target)&&!toggle.contains(e.target)){
    mobile.classList.remove('show');document.body.classList.remove('menu-open');toggle.setAttribute('aria-expanded','false');
   }
  };
  document.addEventListener('pointerdown',outside);
 }
 document.querySelectorAll('.review-note').forEach(el=>{
  if(/will be connected|approved source is confirmed/i.test(el.textContent||''))el.remove();
 });
 document.querySelectorAll('main .photo-banner-image').forEach(img=>{img.loading='eager';img.setAttribute('fetchpriority','high')});
 document.querySelectorAll('a[href^="#chapter-"]').forEach(a=>{
  a.addEventListener('click',e=>{
   const target=document.getElementById(a.hash.slice(1));if(!target)return;
   e.preventDefault();
   target.scrollIntoView({block:'start',behavior:reduce?'instant':'smooth'});
   history.replaceState(null,'',a.hash);
  });
 });
})();
