/* =============================================================
   个人作品集 · 交互脚本
   纯原生 JavaScript，无构建、无依赖
   ============================================================= */
(function () {
  'use strict';

  var data = window.SITE_DATA;
  if (!data) return;

  /* ---------- 小工具 ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  var supportsIO = 'IntersectionObserver' in window;

  document.body.classList.remove('no-js');

  /* ---------- 图标 ---------- */
  var ICONS = {
    layout: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9.5h18M9.5 9.5V20"/>',
    code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5"/>',
    server: '<rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><path d="M6.6 7h.01M6.6 17h.01"/>',
    sparkles: '<path d="M12 3.2 13.9 8.6 19.3 10.5 13.9 12.4 12 17.8 10.1 12.4 4.7 10.5 10.1 8.6 12 3.2Z"/><path d="m18.6 15.4.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z"/>',
    gauge: '<path d="M3.5 17.5a8.5 8.5 0 0 1 17 0"/><path d="m12 13 3.6-3.8"/><circle cx="12" cy="13.4" r="1.3"/>'
  };

  var ARROW = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3.5 12.5 12.5 3.5M5.5 3.5h7v7"/></svg>';
  var CHECK = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5 6.2 11.5 13 4.5"/></svg>';

  /* ---------- 1. 文案绑定 ---------- */
  function bindText() {
    var p = data.profile;
    var map = {
      name: p.name,
      latin: p.latin,
      initials: p.initials,
      role: p.role,
      location: p.location,
      status: p.status,
      email: p.email,
      heroDesc: p.heroDesc,
      heroTitle: p.heroTitle,
      heroTitleAccent: p.heroTitleAccent,
      focus: p.focus,
      availableBadge: p.texts.availableBadge,
      contactTitle: data.contact.title,
      contactTitleAccent: data.contact.titleAccent,
      contactDesc: data.contact.desc,
      contactNote: data.contact.note
    };

    Object.keys(map).forEach(function (key) {
      $$('[data-bind="' + key + '"]').forEach(function (el) {
        el.textContent = map[key];
      });
    });

    var mailLink = $('#mail-link');
    if (mailLink) mailLink.href = 'mailto:' + p.email;

    var copyBtn = $('#copy-email');
    if (copyBtn) copyBtn.setAttribute('aria-label', '复制邮箱地址 ' + p.email);

    // 让浏览器标题与分享信息跟随数据配置
    document.title = p.name + ' · ' + p.role.replace(' / ', ' & ');
    var descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', p.heroDesc);
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', document.title);
    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', p.heroDesc);

    var yearEl = $('#year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    var pillYear = $('#pill-year');
    if (pillYear) pillYear.textContent = String(new Date().getFullYear());
  }

  /* ---------- 2. 首屏关键词滚动带 ---------- */
  function renderMarquee() {
    var track = $('#marquee-track');
    if (!track || !data.marquee) return;
    var html = data.marquee.map(function (item) {
      return '<span class="marquee__item">' + esc(item) + '</span>';
    }).join('');
    track.innerHTML = html + html;
  }

  /* ---------- 3. 关于 ---------- */
  function renderAbout() {
    var textWrap = $('#about-text');
    if (textWrap) {
      textWrap.innerHTML = data.about.paragraphs.map(function (paragraph) {
        return '<p>' + esc(paragraph) + '</p>';
      }).join('');
    }

    var list = $('#about-highlights');
    if (list) {
      list.innerHTML = data.about.highlights.map(function (item, i) {
        return (
          '<li class="about__item">' +
            '<span class="about__check">' + CHECK + '</span>' +
            '<div><strong>' + esc(item.title) + '</strong><span>' + esc(item.desc) + '</span></div>' +
          '</li>'
        );
      }).join('');
    }

    var stats = $('#stats');
    if (stats) {
      stats.innerHTML = data.stats.map(function (item) {
        return (
          '<div class="stat">' +
            '<span class="stat__num" data-count="' + item.value + '" data-suffix="' + esc(item.suffix) + '">0</span>' +
            '<span class="stat__label">' + esc(item.label) + '</span>' +
          '</div>'
        );
      }).join('');
    }
  }

  /* ---------- 4. 技能 ---------- */
  var SKILL_ACCENTS = ['#5eead4', '#60a5fa', '#a78bfa', '#f472b6'];

  function renderSkills() {
    var grid = $('#skills-grid');
    if (!grid) return;

    grid.innerHTML = data.skills.map(function (group, i) {
      var accent = SKILL_ACCENTS[i % SKILL_ACCENTS.length];
      var bars = group.bars.map(function (bar) {
        return (
          '<div class="bar">' +
            '<div class="bar__top">' +
              '<span class="bar__label">' + esc(bar.name) + '</span>' +
              '<span class="bar__val">' + bar.level + '</span>' +
            '</div>' +
            '<span class="bar__track"><i class="bar__fill" style="--w:' + bar.level + '%"></i></span>' +
          '</div>'
        );
      }).join('');

      var tags = group.stack.map(function (tag) {
        return '<li>' + esc(tag) + '</li>';
      }).join('');

      return (
        '<article class="skill reveal" style="--sc:' + accent + ';--d:' + i * 70 + 'ms">' +
          '<header class="skill__head">' +
            '<span class="skill__icon"><svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[group.icon] || ICONS.code) + '</svg></span>' +
            '<div><h3>' + esc(group.title) + '</h3><p>' + esc(group.desc) + '</p></div>' +
          '</header>' +
          '<div class="skill__bars">' + bars + '</div>' +
          '<ul class="skill__tags">' + tags + '</ul>' +
        '</article>'
      );
    }).join('');
  }

  /* ---------- 5. 作品 ---------- */
  function projectArt(project) {
    var a = project.accent[0];
    var b = project.accent[1];
    return (
      'radial-gradient(140% 120% at 12% 0%, ' + a + 'aa, transparent 62%),' +
      'radial-gradient(120% 120% at 92% 100%, ' + b + 'bb, transparent 64%),' +
      'radial-gradient(80% 80% at 50% 50%, ' + a + '22, transparent 72%),' +
      'linear-gradient(150deg, #0c1524, #06090f 76%)'
    );
  }

  var GLYPH_POS = [
    { x: 64, y: 44 },
    { x: 38, y: 58 },
    { x: 56, y: 46 },
    { x: 44, y: 54 },
    { x: 66, y: 42 },
    { x: 40, y: 60 }
  ];

  function glyphOf(title) {
    var latin = title.match(/[A-Za-z]/);
    return latin ? latin[0].toUpperCase() : title.trim().charAt(0);
  }

  function renderProjects() {
    var grid = $('#projects');
    var filters = $('#filters');
    if (!grid) return;

    grid.innerHTML = data.projects.map(function (project, i) {
      var tags = project.tags.map(function (tag) { return '<li>' + esc(tag) + '</li>'; }).join('');
      var pos = GLYPH_POS[i % GLYPH_POS.length];
      return (
        '<article class="project reveal' + (project.featured ? ' project--lg' : '') + '"' +
          ' data-cat="' + esc(project.category) + '" data-index="' + i + '"' +
          ' style="--d:' + (i % 3) * 60 + 'ms">' +
          '<div class="project__cover">' +
            '<div class="project__art" style="--gx:' + pos.x + '%;--gy:' + pos.y + '%;background:' + projectArt(project) + '"></div>' +
            '<span class="project__glyph" aria-hidden="true">' + esc(glyphOf(project.title)) + '</span>' +
            '<span class="project__index">' + String(i + 1).padStart(2, '0') + '</span>' +
            '<span class="project__year">' + esc(project.year) + '</span>' +
            (project.featured ? '<span class="project__badge">Featured</span>' : '') +
          '</div>' +
          '<div class="project__body">' +
            '<div class="project__top">' +
              '<h3 class="project__title">' + esc(project.title) + '</h3>' +
              '<span class="project__arrow">' + ARROW + '</span>' +
            '</div>' +
            '<p class="project__desc">' + esc(project.desc) + '</p>' +
            '<ul class="project__tags">' + tags + '</ul>' +
          '</div>' +
          '<button class="project__hit" type="button" data-open="' + i + '" aria-label="查看项目详情：' + esc(project.title) + '"></button>' +
        '</article>'
      );
    }).join('');

    if (filters) {
      var categories = ['全部'];
      data.projects.forEach(function (p) {
        if (categories.indexOf(p.category) === -1) categories.push(p.category);
      });

      filters.innerHTML = categories.map(function (cat, i) {
        return '<button class="filter-btn' + (i === 0 ? ' is-active' : '') + '" type="button" data-filter="' +
          esc(cat) + '" aria-pressed="' + (i === 0 ? 'true' : 'false') + '">' + esc(cat) + '</button>';
      }).join('');
    }

    // 网格收尾：更多开源入口
    var github = (data.profile.socials.filter(function (s) { return s.icon === 'github'; })[0] || {}).href || 'https://github.com/';
    grid.insertAdjacentHTML('beforeend',
      '<a class="project-cta reveal" href="' + esc(github) + '" target="_blank" rel="noopener noreferrer" style="--d:120ms">' +
        '<span class="project-cta__arrow" aria-hidden="true">' + ARROW + '</span>' +
        '<span class="project-cta__label">More on GitHub</span>' +
        '<span class="project-cta__title">更多实验、源码<br>与工程笔记</span>' +
        '<span class="project-cta__meta">持续更新中的小工具和视觉实验，欢迎来逛逛。</span>' +
      '</a>'
    );
  }

  /* ---------- 6. 时间线 ---------- */
  function renderTimeline() {
    var list = $('#timeline');
    if (!list) return;

    list.innerHTML = data.timeline.map(function (item, i) {
      var tags = (item.tags || []).map(function (tag) { return '<li>' + esc(tag) + '</li>'; }).join('');
      return (
        '<li class="tl reveal" style="--d:' + i * 60 + 'ms">' +
          '<span class="tl__dot" aria-hidden="true"></span>' +
          '<div class="tl__content">' +
            '<div class="tl__meta">' +
              '<span class="tl__date">' + esc(item.date) + '</span>' +
              (item.now ? '<span class="tl__now">Now</span>' : '') +
            '</div>' +
            '<h3 class="tl__title">' + esc(item.title) + '</h3>' +
            '<p class="tl__org">' + esc(item.org) + '</p>' +
            '<p class="tl__desc">' + esc(item.desc) + '</p>' +
            (tags ? '<ul class="tl__tags">' + tags + '</ul>' : '') +
          '</div>' +
        '</li>'
      );
    }).join('');
  }

  /* ---------- 7. 联系方式 ---------- */
  function renderSocials() {
    var wrap = $('#socials');
    if (!wrap) return;

    wrap.innerHTML = data.profile.socials.map(function (item) {
      var isMail = item.href.indexOf('mailto:') === 0;
      return (
        '<a class="social" href="' + esc(item.href) + '"' +
          (isMail ? '' : ' target="_blank" rel="noopener noreferrer"') +
          ' aria-label="' + esc(item.label) + '：' + esc(item.handle) + '">' +
          '<span class="social__text">' +
            '<span class="social__label">' + esc(item.label) + '</span>' +
            '<span class="social__handle">' + esc(item.handle) + '</span>' +
          '</span>' +
          '<span class="social__arrow" aria-hidden="true">' + ARROW + '</span>' +
        '</a>'
      );
    }).join('');
  }

  /* ---------- 8. 滚动揭示 ---------- */
  var revealObserver = null;

  function initReveal() {
    var items = $$('.reveal');

    if (!supportsIO || reduceMotion) {
      items.forEach(function (el) { el.classList.add('in'); });
      $$('.stats').forEach(animateStats);
      return;
    }

    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        if (entry.target.classList.contains('stats')) animateStats(entry.target);
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -7% 0px' });

    items.forEach(function (el) { revealObserver.observe(el); });
  }

  function animateStats(container) {
    $$('.stat__num', container).forEach(function (el) {
      if (el.dataset.done) return;
      el.dataset.done = '1';
      var target = parseInt(el.dataset.count, 10) || 0;
      var suffix = el.dataset.suffix || '';

      if (reduceMotion) {
        el.innerHTML = target + '<i>' + esc(suffix) + '</i>';
        return;
      }

      var duration = 1300;
      var start = null;

      function step(now) {
        if (start === null) start = now;
        var progress = clamp((now - start) / duration, 0, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = String(Math.round(target * eased));
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.innerHTML = target + '<i>' + esc(suffix) + '</i>';
        }
      }
      requestAnimationFrame(step);
    });
  }

  /* ---------- 9. Header / 进度 / 视差 / 时间线 ---------- */
  function initScrollEffects() {
    var header = $('#header');
    var progress = $('.scroll-progress i');
    var fill = $('#timeline-fill');
    var wrap = $('.timeline-wrap');
    var parallaxItems = $$('[data-parallax]');
    var ticking = false;

    function update() {
      var y = window.scrollY || window.pageYOffset;
      var viewportH = window.innerHeight;

      if (header) header.classList.toggle('is-scrolled', y > 10);

      if (progress) {
        var max = document.documentElement.scrollHeight - viewportH;
        progress.style.transform = 'scaleX(' + (max > 0 ? clamp(y / max, 0, 1) : 0) + ')';
      }

      if (!reduceMotion) {
        parallaxItems.forEach(function (el) {
          var speed = parseFloat(el.dataset.parallax) || 0;
          el.style.transform = 'translate3d(0,' + (y * speed).toFixed(1) + 'px,0)';
        });
      }

      if (fill && wrap) {
        var rect = wrap.getBoundingClientRect();
        var lineHeight = rect.height - 26;
        var p = clamp((viewportH * 0.62 - rect.top) / (rect.height * 0.9), 0, 1);
        fill.style.height = Math.max(0, p * lineHeight) + 'px';
      }

      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  /* ---------- 10. 导航高亮 ---------- */
  function initActiveNav() {
    if (!supportsIO) return;

    var links = $$('.nav__link');
    var map = {};
    links.forEach(function (link) {
      map[link.getAttribute('href')] = link;
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var href = '#' + entry.target.id;
        links.forEach(function (l) { l.classList.remove('is-active'); });
        if (map[href]) map[href].classList.add('is-active');
      });
    }, { rootMargin: '-42% 0px -52% 0px', threshold: 0 });

    $$('main section[id]').forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---------- 11. 移动端菜单 ---------- */
  function initMenu() {
    var toggle = $('#menu-toggle');
    var menu = $('#mobile-menu');
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
      menu.classList.toggle('is-open', open);
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    $$('.mobile-menu__link', menu).forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });

    document.addEventListener('click', function (e) {
      if (!menu.classList.contains('is-open')) return;
      if (menu.contains(e.target) || toggle.contains(e.target)) return;
      setOpen(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) setOpen(false);
    });
  }

  /* ---------- 12. Canvas 粒子场 ---------- */
  function initCanvas() {
    var canvas = $('#bg-canvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var colors = ['94,234,212', '96,165,250', '167,139,250', '244,114,182'];
    var w = 0, h = 0, dpr = 1;
    var particles = [];
    var mouse = { x: -9999, y: -9999 };
    var rafId = null;
    var running = false;

    function makeParticles() {
      var count = Math.round(clamp((w * h) / 20000, 26, 92));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.4 + 0.5,
          c: colors[(Math.random() * colors.length) | 0],
          a: Math.random() * 0.45 + 0.2
        });
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeParticles();
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      var i, j, p, q, dx, dy, dist2, dist;

      for (i = 0; i < particles.length; i++) {
        p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        dx = p.x - mouse.x;
        dy = p.y - mouse.y;
        dist2 = dx * dx + dy * dy;
        if (dist2 < 26000 && dist2 > 1) {
          dist = Math.sqrt(dist2);
          var force = (1 - dist / 161) * 0.7;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fillStyle = 'rgba(' + p.c + ',' + p.a + ')';
        ctx.fill();
      }

      for (i = 0; i < particles.length; i++) {
        for (j = i + 1; j < particles.length; j++) {
          p = particles[i];
          q = particles[j];
          dx = p.x - q.x;
          dy = p.y - q.y;
          if (dx > 132 || dx < -132 || dy > 132 || dy < -132) continue;
          dist2 = dx * dx + dy * dy;
          if (dist2 > 17424) continue;
          dist = Math.sqrt(dist2);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = 'rgba(122,170,255,' + ((1 - dist / 132) * 0.13).toFixed(3) + ')';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(draw);
    }

    function start() {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(draw);
    }

    function stop() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    }

    resize();

    if (reduceMotion) {
      // 静态绘制一帧，保留氛围但不产生持续动画
      for (var k = 0; k < particles.length; k++) {
        var pt = particles[k];
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r, 0, 6.2832);
        ctx.fillStyle = 'rgba(' + pt.c + ',' + pt.a + ')';
        ctx.fill();
      }
    } else {
      start();
    }

    window.addEventListener('resize', function () {
      resize();
      if (reduceMotion) return;
      stop();
      start();
    });

    window.addEventListener('pointermove', function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    document.addEventListener('pointerleave', function () {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    document.addEventListener('visibilitychange', function () {
      if (reduceMotion) return;
      if (document.hidden) stop();
      else start();
    });
  }

  /* ---------- 13. 鼠标光晕 ---------- */
  function initCursorGlow() {
    if (!finePointer || reduceMotion) return;
    var glow = $('.cursor-glow');
    if (!glow) return;

    var targetX = window.innerWidth / 2;
    var targetY = window.innerHeight / 2;
    var currentX = targetX;
    var currentY = targetY;
    var active = false;

    window.addEventListener('pointermove', function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!active) {
        active = true;
        glow.classList.add('is-on');
      }
    }, { passive: true });

    document.addEventListener('pointerleave', function () {
      glow.classList.remove('is-on');
      active = false;
    });

    function loop() {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      glow.style.transform = 'translate3d(' + currentX.toFixed(1) + 'px,' + currentY.toFixed(1) + 'px,0)';
      requestAnimationFrame(loop);
    }
    loop();
  }

  /* ---------- 14. 卡片 3D 倾斜 + 聚光 ---------- */
  function initTilt() {
    if (!finePointer || reduceMotion) return;

    $$('[data-tilt]').forEach(function (el) {
      var frame = null;

      el.addEventListener('pointermove', function (e) {
        if (frame) return;
        frame = requestAnimationFrame(function () {
          var rect = el.getBoundingClientRect();
          var px = (e.clientX - rect.left) / rect.width - 0.5;
          var py = (e.clientY - rect.top) / rect.height - 0.5;
          el.style.transform = 'perspective(1000px) rotateY(' + (px * 7).toFixed(2) +
            'deg) rotateX(' + (-py * 7).toFixed(2) + 'deg)';
          frame = null;
        });
      });

      el.addEventListener('pointerleave', function () {
        el.style.transform = '';
      });
    });

    var grid = $('#projects');
    if (grid) {
      grid.addEventListener('pointermove', function (e) {
        var card = e.target.closest('.project');
        if (!card) return;
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + '%');
        card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + '%');
      }, { passive: true });
    }
  }

  /* ---------- 15. 项目筛选 ---------- */
  function initFilters() {
    var filters = $('#filters');
    var grid = $('#projects');
    if (!filters || !grid) return;

    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;

      var value = btn.dataset.filter;
      grid.classList.toggle('is-filtered', value !== '全部');

      $$('.filter-btn', filters).forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      $$('.project', grid).forEach(function (card) {
        var show = value === '全部' || card.dataset.cat === value;
        card.classList.toggle('is-hidden', !show);
        if (!show) return;

        if (!card.classList.contains('in')) card.classList.add('in');
        if (reduceMotion || !card.animate) return;
        card.animate(
          [
            { opacity: 0, transform: 'translateY(14px) scale(0.985)' },
            { opacity: 1, transform: 'none' }
          ],
          { duration: 420, easing: 'cubic-bezier(.16,1,.3,1)' }
        );
      });

      var cta = $('.project-cta', grid);
      if (cta) cta.hidden = value !== '全部';
    });
  }

  /* ---------- 16. 项目详情弹窗 ---------- */
  function initModal() {
    var modal = $('#modal');
    if (!modal) return;

    var panel = $('.modal__panel', modal);
    var closeBtn = $('.modal__close', modal);
    var lastFocus = null;
    var openIndex = -1;

    var els = {
      cover: $('#modal-cover'),
      index: $('#modal-index'),
      category: $('#modal-category'),
      meta: $('#modal-meta'),
      title: $('#modal-title'),
      desc: $('#modal-desc'),
      points: $('#modal-points'),
      tags: $('#modal-tags')
    };

    function fill(project, i) {
      var a = project.accent[0];
      var b = project.accent[1];
      els.cover.style.background =
        'radial-gradient(circle at 18% 10%, ' + a + '88, transparent 55%),' +
        'radial-gradient(circle at 88% 96%, ' + b + '99, transparent 58%),' +
        'linear-gradient(150deg, #0c1526, #070a12 78%)';
      els.index.textContent = String(i + 1).padStart(2, '0');
      els.category.textContent = project.category;
      els.meta.textContent = project.year + ' · ' + project.role;
      els.title.textContent = project.title;
      els.desc.textContent = project.desc;
      els.points.innerHTML = project.highlights.map(function (point) {
        return '<li>' + esc(point) + '</li>';
      }).join('');
      els.tags.innerHTML = project.tags.map(function (tag) {
        return '<li>' + esc(tag) + '</li>';
      }).join('');
    }

    function focusables() {
      return $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', panel)
        .filter(function (el) { return el.offsetParent !== null; });
    }

    function onKeydown(e) {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab') return;
      var list = focusables();
      if (!list.length) return;
      var first = list[0];
      var last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function open(project, i) {
      lastFocus = document.activeElement;
      openIndex = i;
      fill(project, i);
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', onKeydown);
      window.setTimeout(function () { if (closeBtn) closeBtn.focus(); }, 60);
    }

    function close() {
      if (!modal.classList.contains('is-open')) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onKeydown);
      openIndex = -1;
      if (lastFocus && document.contains(lastFocus)) {
        lastFocus.focus({ preventScroll: true });
      }
    }

    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-open]');
      if (trigger) {
        var index = parseInt(trigger.dataset.open, 10);
        var project = data.projects[index];
        if (project) open(project, index);
        return;
      }
      var closer = e.target.closest('[data-close]');
      if (closer && modal.classList.contains('is-open')) {
        close();
      }
    });

    // 供外部（例如分享链接）关闭
    window.__closeProjectModal = close;
    void openIndex;
  }

  /* ---------- 17. 复制邮箱 ---------- */
  function initCopyEmail() {
    var btn = $('#copy-email');
    if (!btn) return;

    var email = data.profile.email;

    function toast(message) {
      var el = $('#toast');
      if (!el) return;
      el.textContent = message;
      el.classList.add('is-visible');
      window.clearTimeout(toast._timer);
      toast._timer = window.setTimeout(function () {
        el.classList.remove('is-visible');
      }, 2200);
    }

    function fallbackCopy() {
      var input = document.createElement('textarea');
      input.value = email;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.top = '-100px';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      input.setSelectionRange(0, email.length);
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      document.body.removeChild(input);
      return ok;
    }

    btn.addEventListener('click', function () {
      var done = function (ok) {
        toast(ok ? '邮箱已复制 · ' + email : '复制失败，请手动选择：' + email);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () { done(true); }, function () {
          done(fallbackCopy());
        });
      } else {
        done(fallbackCopy());
      }
    });
  }

  /* ---------- 18. 初始化 ---------- */
  function init() {
    bindText();
    renderMarquee();
    renderAbout();
    renderSkills();
    renderProjects();
    renderTimeline();
    renderSocials();

    initReveal();
    initScrollEffects();
    initActiveNav();
    initMenu();
    initCanvas();
    initCursorGlow();
    initTilt();
    initFilters();
    initModal();
    initCopyEmail();

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.body.classList.add('is-ready');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
