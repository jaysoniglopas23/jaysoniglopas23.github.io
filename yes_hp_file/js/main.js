
(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  // Loading
  window.addEventListener('load', () => {
    setTimeout(() => $('.preloader')?.classList.add('is-hidden'), 450);
  });

  // Header / progress / top button
  const header = $('[data-header]');
  const progress = $('.scroll-progress span');
  const pageTop = $('[data-page-top]');
  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 30);
    pageTop?.classList.toggle('is-visible', y > 650);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${Math.min(100, (y / max) * 100)}%`;
  };
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
  pageTop?.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

  // Mobile menu
  const toggle = $('[data-menu-toggle]');
  const nav = $('[data-nav]');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  $$('.nav-link').forEach(a => a.addEventListener('click', () => {
    nav?.classList.remove('is-open');
    toggle?.classList.remove('is-open');
  }));

  // Reveal animations
  const revealItems = $$('[data-reveal]');
  revealItems.forEach(el => {
    const d = el.getAttribute('data-delay');
    if (d) el.style.setProperty('--delay', `${d}ms`);
  });
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold:0.16 });
  revealItems.forEach(el => io.observe(el));

  // Counter animation
  const counters = $$('.count[data-count]');
  const counterIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count || 0);
      const suffix = target === 100 ? '%' : '';
      let start = null;
      const tick = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1000, 1);
        const val = Math.floor(target * (1 - Math.pow(1 - p, 3)));
        el.textContent = `${val}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  }, { threshold:.4 });
  counters.forEach(c => counterIO.observe(c));

  // Parallax card
  const parallax = $('[data-parallax]');
  const parallaxSection = $('[data-parallax-section]');
  if (parallax && parallaxSection && window.matchMedia('(pointer:fine)').matches) {
    parallaxSection.addEventListener('mousemove', (e) => {
      const r = parallaxSection.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      parallax.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translate3d(${x * 10}px,${y * 10}px,0)`;
    });
    parallaxSection.addEventListener('mouseleave', () => parallax.style.transform = '');
  }

  // Magnetic buttons
  if (window.matchMedia('(pointer:fine)').matches) {
    $$('.magnetic').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width/2;
        const y = e.clientY - r.top - r.height/2;
        el.style.transform = `translate(${x*.12}px, ${y*.18}px)`;
      });
      el.addEventListener('mouseleave', () => el.style.transform = '');
    });
  }

  // Case filters
  const tabs = $('[data-filter-tabs]');
  if (tabs) {
    tabs.addEventListener('click', e => {
      const btn = e.target.closest('button[data-filter]');
      if (!btn) return;
      $$('button', tabs).forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;
      $$('.case-card').forEach(card => {
        card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
      });
    });
  }

  // Accordion
  $$('[data-accordion] .accordion-item button').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const body = item.querySelector('div');
      const open = item.classList.toggle('is-open');
      body.style.maxHeight = open ? `${body.scrollHeight}px` : '0px';
    });
  });

  // Contact form demo
  $('[data-contact-form]')?.addEventListener('submit', e => {
    e.preventDefault();
    alert('これは静的サイト用の見本フォームです。実際の送信機能は、フォームサービスまたはサーバー実装を接続してください。');
  });

  // Copy email
  $$('[data-copy-button]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copyButton;
      try {
        await navigator.clipboard.writeText(text);
        const old = btn.textContent;
        btn.textContent = 'コピーしました';
        setTimeout(() => btn.textContent = old, 1400);
      } catch(e) {
        alert(text);
      }
    });
  });

  // Year
  $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
