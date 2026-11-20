(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const doc = document.documentElement;
  const header = document.querySelector('.site-header');
  const progress = document.getElementById('reading-progress');
  const mega = document.getElementById('mega');
  const scrim = document.getElementById('mega-scrim');
  const nav = [...document.querySelectorAll('.navlink.has-mega')];

  // A consistent scrolling progress indicator, throttled to the paint cycle.
  let scheduled = false;
  function onScroll() {
    if(scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      const max = Math.max(1,doc.scrollHeight - window.innerHeight);
      const v = Math.max(0,Math.min(1,window.scrollY / max));
      if (progress) progress.style.transform=`scaleX(${v})`;
      const banner=document.querySelector('main .photo-banner');
      if (banner && !reduce && window.innerWidth>920 && window.scrollY < window.innerHeight*1.2) {
        banner.style.setProperty('--v4-hero-shift', `${Math.round(window.scrollY*0.10)}px`);
      }
      scheduled=false;
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  // Synchronize a lightweight outside-click scrim with the existing mega menu.
  function syncMega() {
    const open=!!mega?.classList.contains('show') && window.innerWidth>920;
    scrim?.classList.toggle('is-active',open);
  }
  if (mega) {
    new MutationObserver(syncMega).observe(mega,{attributes:true,attributeFilter:['class']});
    syncMega();
  }
  scrim?.addEventListener('click',()=>{
    mega?.classList.remove('show');
    nav.forEach(n=>n.setAttribute('aria-expanded','false'));
    syncMega();
  });
  // Image reacts a few pixels to pointer movement inside the menu.
  mega?.addEventListener('pointermove', e=> {
    if(reduce || e.pointerType !== 'mouse') return;
    const visual=e.target.closest('.mega-visual');if(!visual)return;
    const rect=visual.getBoundingClientRect();
    visual.style.setProperty('--v4-mx',`${((e.clientX-rect.left)/rect.width-.5)*-11}px`);
    visual.style.setProperty('--v4-my',`${((e.clientY-rect.top)/rect.height-.5)*-11}px`);
  });
  mega?.addEventListener('pointerleave',()=>{
    mega.querySelectorAll('.mega-visual').forEach(el=>{
      el.style.removeProperty('--v4-mx');el.style.removeProperty('--v4-my');
    });
  });

  // Animated FAQ disclosure. Native details remains functional for keyboard users,
  // and animation is skipped when reduced motion is requested.
  const faqItems=[...document.querySelectorAll('details.faq')];
  const durations = {open:460,close:340};
  function cleanAnim(item) { if(item._faqAnim){item._faqAnim.cancel();item._faqAnim=null;} }
  function setFaq(item,open) {
    const panel=item.querySelector('.faq-answer');
    if(!panel) {item.open=open;return;}
    cleanAnim(item);
    if(reduce || typeof panel.animate !== 'function') {item.open=open;panel.style.height='';return;}
    const isOpen=item.open;
    if(isOpen===open) return;
    if(open) {
      item.open=true;
      const h=panel.scrollHeight;
      panel.style.height='0px';
      const anim=panel.animate([{height:'0px',opacity:0,transform:'translateY(-9px)'},{height:h+'px',opacity:1,transform:'translateY(0)'}],{duration:durations.open,easing:'cubic-bezier(.2,.78,.2,1)'});
      item._faqAnim=anim;
      anim.finished.then(()=>{if(item._faqAnim===anim){panel.style.height='';item._faqAnim=null;}}).catch(()=>{});
    } else {
      const h=panel.getBoundingClientRect().height || panel.scrollHeight;
      panel.style.height=h+'px';
      const anim=panel.animate([{height:h+'px',opacity:1,transform:'translateY(0)'},{height:'0px',opacity:0,transform:'translateY(-8px)'}],{duration:durations.close,easing:'cubic-bezier(.38,0,.6,1)'});
      item._faqAnim=anim;
      anim.finished.then(()=>{if(item._faqAnim===anim){item.open=false;panel.style.height='';item._faqAnim=null;}}).catch(()=>{});
    }
  }
  faqItems.forEach(item=>{
    item.querySelector('summary')?.addEventListener('click',e=>{
      e.preventDefault();
      const target=!item.open;
      if(target){
        const group=item.closest('.faq-layout');
        group?.querySelectorAll('details.faq[open]').forEach(other=>{if(other!==item)setFaq(other,false)});
      }
      setFaq(item,target);
    });
  });

  // Reveals are activated once the observer is configured. No JS means visible content.
  if (!reduce && 'IntersectionObserver' in window) {
    const contentSel = ['.editorial','.compare-layout','.split-panel','.gallery-wide','.asym-gallery','.spec-list','.faq-layout','.process','.product-rail','.collection-grid','.contact-grid','.booking-shell','.related','.closing','.inline-booking','.dark-feature'];
    const nodes=[...document.querySelectorAll('main '+contentSel.join(',main '))];
    nodes.forEach((el,i)=>{
      if(el.closest('.chapter-nav'))return;
      const kind=el.matches('.gallery-wide,.asym-gallery')?'gallery':el.matches('.editorial,.split-panel')?'editorial':el.matches('.compare-layout,.collection-grid')?'compare':el.matches('.spec-list')?'technical':'content';
      el.dataset.v4Stage=kind;
      el.style.setProperty('--v4-delay',`${Math.min(i%3*50,100)}ms`);
    });
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('v4-stage-visible');obs.unobserve(entry.target)}});
    },{rootMargin:'0px 0px -30px 0px',threshold:.04});
    nodes.forEach(el=>obs.observe(el));
    doc.classList.add('v4-ready');
  }
  // Product sections get an active chapter selection as the visitor scrolls.
  const chapterAnchors=[...document.querySelectorAll('.chapter-link[href^="#"]')];
  if(chapterAnchors.length && 'IntersectionObserver' in window){
    const targets=chapterAnchors.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const setActive=id=>chapterAnchors.forEach(a=>{
      const yes=a.getAttribute('href')==='#'+id;a.classList.toggle('is-current',yes);
      if(yes)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');
    });
    if(targets.length) setActive(targets[0].id);
    const chapterObs=new IntersectionObserver(entries=>{
      const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
      if(visible[0])setActive(visible[0].target.id);
    },{rootMargin:'-18% 0px -65% 0px',threshold:0});
    targets.forEach(el=>chapterObs.observe(el));
    chapterAnchors.forEach(a=>a.addEventListener('click',()=>setActive(a.hash.slice(1))));
  }
  // User-operated featured collection carousel. Never auto-scroll.
  const rail=document.getElementById('featured-product-rail');
  document.querySelectorAll('button[data-rail]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(!rail)return;
      const first=rail.querySelector('.mini-product');
      const w=first?.getBoundingClientRect().width||280;
      rail.scrollBy({left:(btn.dataset.rail==='next'?1:-1)*(w+20)*1.12,behavior:reduce?'instant':'smooth'});
    });
  });
})();
