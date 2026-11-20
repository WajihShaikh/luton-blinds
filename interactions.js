(function(){
'use strict';
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header=document.querySelector('.site-header');
const mega=document.getElementById('mega');
let timer;
const navItems=[...document.querySelectorAll('.navlink.has-mega')];
function closeMega(){mega.classList.remove('show');navItems.forEach(a=>a.setAttribute('aria-expanded','false'));}
function showMega(type){clearTimeout(timer);const t=document.getElementById('mega-'+type+'-template');if(!t)return;mega.innerHTML=t.innerHTML;mega.classList.add('show');navItems.forEach(a=>a.setAttribute('aria-expanded',a.dataset.mega===type?'true':'false'));}
navItems.forEach(el=>{el.setAttribute('aria-haspopup','true');el.setAttribute('aria-expanded','false');el.addEventListener('mouseenter',()=>showMega(el.dataset.mega));el.addEventListener('focus',()=>showMega(el.dataset.mega));el.addEventListener('click',e=>{if(window.innerWidth>920){e.preventDefault();if(mega.classList.contains('show')&&el.getAttribute('aria-expanded')==='true')closeMega();else showMega(el.dataset.mega);}})});
header?.addEventListener('mouseleave',()=>{timer=setTimeout(closeMega,180)});
mega?.addEventListener('mouseenter',()=>clearTimeout(timer));mega?.addEventListener('mouseleave',()=>{timer=setTimeout(closeMega,180)});
window.addEventListener('scroll',()=>header?.classList.toggle('is-scrolled',window.scrollY>20),{passive:true});
document.addEventListener('click',e=>{if(header&&!header.contains(e.target))closeMega();});
const toggle=document.querySelector('.menu-toggle'),mobile=document.getElementById('mobile-nav');
function closeMobile(){mobile?.classList.remove('show');document.body.classList.remove('menu-open');toggle?.setAttribute('aria-expanded','false');}
toggle?.addEventListener('click',()=>{const isOpen=mobile.classList.toggle('show');document.body.classList.toggle('menu-open',isOpen);toggle.setAttribute('aria-expanded',String(isOpen));});
mobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMobile));
const box=document.getElementById('lightbox');
document.querySelectorAll('.enlargeable').forEach(img=>{img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label','Enlarge photo: '+img.alt);const open=()=>{const dest=box.querySelector('img');dest.src=img.src;dest.alt=img.alt;box.classList.add('open');box.querySelector('button')?.focus();};img.addEventListener('click',open);img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}})});
box?.addEventListener('click',e=>{if(e.target===box||e.target.closest('.close-lightbox'))box.classList.remove('open')});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMega();closeMobile();box?.classList.remove('open');}});
document.querySelectorAll('.filter-btn[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter-btn[data-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.inspo-tile').forEach(tile=>{tile.hidden=!(btn.dataset.filter==='All'||tile.dataset.cat===btn.dataset.filter);});}));
document.querySelectorAll('.method-tabs button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.method-tabs button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const target=document.getElementById('booking-content');const template=document.getElementById('booking-'+btn.dataset.mode+'-template');if(target&&template)target.innerHTML=template.innerHTML;}));
function toast(message){const t=document.getElementById('toast');if(!t)return;t.textContent=message;t.classList.add('show');window.clearTimeout(window.__lutonToast);window.__lutonToast=window.setTimeout(()=>t.classList.remove('show'),4300)}
document.addEventListener('submit',e=>{if(e.target.matches('.demo-form')){e.preventDefault();const status=e.target.querySelector('.form-status');if(status)status.textContent='Design preview only. Your information has not been sent.';toast('Preview only. No enquiry or appointment has been submitted.');}});
if(!reduce&&'IntersectionObserver'in window){const targets=document.querySelectorAll('main .section-head,main .editorial-image,main .editorial-copy,main .compare-card,main .mini-product,main .inspo-tile,main .review-photo,main .review-copy,main .process-item,main .split-panel .copy,main .split-photo,main .dark-feature,main .gallery-wide img,main .text-photo-bar,main .inline-booking');const obs=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');obs.unobserve(e.target);}}),{rootMargin:'0px 0px -25px 0px',threshold:.08});targets.forEach((node,i)=>{node.dataset.reveal=node.matches('img,.editorial-image,.review-photo,.split-photo')?'image':'text';obs.observe(node);});document.documentElement.classList.add('motion-ready');}
})();

;(function(){
'use strict';
const mega=document.getElementById('mega');
mega?.addEventListener('click',e=>{
 const btn=e.target.closest('.mega-close');
 if(btn){mega.classList.remove('show');document.querySelectorAll('.navlink.has-mega').forEach(a=>a.setAttribute('aria-expanded','false'));document.querySelector('.navlink.has-mega')?.focus();}
});
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduce&&'IntersectionObserver'in window){
 const sel=['main .collection-card','main .product-rail a','main .related a','main .gallery-wide img','main .inspo-tile','main .spec-row','main .faq','main .trust-point','main .text-photo-bar img','main .feature-copy','main .closing','main .inline-booking','main .contact-card','main .contact-detail','main .compare-card'];
 const nodes=[...document.querySelectorAll(sel.join(','))].filter(n=>!n.matches('[data-reveal]')&&!n.closest('[data-reveal]'));
 nodes.forEach((node,i)=>{node.dataset.v3Reveal=node.matches('img')?'image':'content';node.style.transitionDelay=Math.min(i%4*65,195)+'ms'});
 const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('v3-visible');o.unobserve(e.target)}}),{rootMargin:'0px 0px -30px 0px',threshold:.08});nodes.forEach(n=>o.observe(n));
}
})();
