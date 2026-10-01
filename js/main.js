(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  // À MODIFIER : adresse qui reçoit les messages des formulaires.
  var MAIL = 'bonjour@exemple.ci';

  /* en-tête, progression, menu */
  var hd = $('header.site'), bar = $('#progress');
  function onScroll() {
    var y = window.pageYOffset, h = document.documentElement.scrollHeight - innerHeight;
    hd.classList.toggle('stuck', y > 30);
    if (bar) bar.style.width = (h > 0 ? y / h * 100 : 0) + '%';
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  var bg = $('.burger'), nav = $('#nav');
  bg.addEventListener('click', function () { var o = nav.classList.toggle('open'); bg.setAttribute('aria-expanded', o); });
  $$('#nav a').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); bg.setAttribute('aria-expanded', 'false'); }); });

  /* compteurs : la valeur finale est déjà dans le HTML ; l'animation ne part que lorsque l'élément est visible */
  function count(el) {
    if (el.__d) return; el.__d = 1;
    var end = +el.getAttribute('data-count'), suf = el.getAttribute('data-suf') || '';
    if (reduce) { el.textContent = end + suf; return; }
    var t0 = Date.now(), dur = 1500;
    var iv = setInterval(function () { var p = Math.min(1, (Date.now() - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(end * e) + suf; if (p >= 1) clearInterval(iv); }, 30);
    setTimeout(function () { clearInterval(iv); el.textContent = end + suf; }, dur + 400);
  }
  function seen(el) { var r = el.getBoundingClientRect(); return r.top < innerHeight * .92 && r.bottom > 0; }

  /* révélations au défilement (+ filet de sécurité si l'observateur ne se déclenche pas) */
  var rv = $$('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('in'); });
  var cnt = $$('[data-count]');
  cnt.forEach(function (el) { if (!reduce) el.textContent = '0' + (el.getAttribute('data-suf') || ''); });
  function sweep() {
    rv.forEach(function (el) { if (!el.classList.contains('in') && seen(el)) el.classList.add('in'); });
    cnt.forEach(function (el) { if (seen(el)) count(el); });
  }
  addEventListener('scroll', sweep, { passive: true }); addEventListener('resize', sweep); setTimeout(sweep, 300); setInterval(sweep, 1000);

  /* traducteur juridique */
  var T = [
    ["Nul n'est censé ignorer la loi.", "Même si vous ne la connaissez pas, la loi s'applique à vous. Mieux vaut donc la comprendre."],
    ["Le contrat tient lieu de loi à ceux qui l'ont fait.", "Ce que vous avez signé vous engage. Relisez avant, pas après."],
    ["La charge de la preuve incombe au demandeur.", "C'est à celui qui réclame quelque chose de prouver ce qu'il avance. Gardez vos écrits."],
    ["Le bailleur est tenu de délivrer au preneur la chose louée.", "Le propriétaire doit vous remettre un logement utilisable, tel que prévu au contrat."]
  ];
  var src = $('#t-src'), out = $('#t-out'), tabs = $$('.trad-f button'), tc = $('#tcount');
  if (src && out) {
    var cur = 0, auto = true, timer, typer;
    var show = function (i, instant) {
      cur = i; tabs.forEach(function (b, k) { b.setAttribute('aria-selected', k === i); });
      if (tc) tc.textContent = (i + 1) + ' / ' + T.length;
      src.textContent = T[i][0]; clearInterval(typer);
      if (instant || reduce) { out.textContent = T[i][1]; return; }
      var s = T[i][1], n = 0; out.textContent = '';
      typer = setInterval(function () { n += 2; out.textContent = s.slice(0, n); if (n >= s.length) clearInterval(typer); }, 22);
    };
    tabs.forEach(function (b, i) { b.addEventListener('click', function () { auto = false; clearInterval(timer); show(i); }); });
    if (!reduce) timer = setInterval(function () { if (auto && document.visibilityState === 'visible') show((cur + 1) % T.length); }, 7000);
  }

  /* fiches : recherche + filtres */
  var grid = $('#fgrid');
  if (grid) {
    var cards = $$('.fcard', grid), q = $('#q'), chips = $$('#chips button'), filt = 'all', fc = $('#fcount'), fe = $('#fempty');
    var apply = function () {
      var v = q.value.trim().toLowerCase(), n = 0;
      cards.forEach(function (c) { var ok = (filt === 'all' || c.dataset.t === filt) && (!v || c.dataset.s.indexOf(v) > -1); c.hidden = !ok; if (ok) { n++; c.classList.add('in'); } });
      fc.textContent = n + (n > 1 ? ' fiches' : ' fiche'); fe.hidden = n > 0;
    };
    q.addEventListener('input', apply);
    chips.forEach(function (b) { b.addEventListener('click', function () { filt = b.dataset.f; chips.forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); apply(); }); });
  }

  /* liste à cocher */
  var cl = $('#checklist');
  if (cl) {
    var bx = $$('input', cl), fill = $('#cfill'), cc = $('#ccount');
    var upd = function () { var n = bx.filter(function (b) { return b.checked; }).length; fill.style.width = (n / bx.length * 100) + '%'; cc.textContent = n + ' / ' + bx.length + ' points vérifiés' + (n === bx.length ? ' : tout est vérifié' : ''); };
    bx.forEach(function (b) { b.addEventListener('change', upd); });
  }

  /* formulaires : validation puis ouverture de la messagerie (aucun envoi serveur) */
  function mail(sub, body) { location.href = 'mailto:' + MAIL + '?subject=' + encodeURIComponent(sub) + '&body=' + encodeURIComponent(body); }
  function bad(el, on) { var f = el.closest('.fld'); if (f) f.classList.toggle('bad', on); }
  function valid(el) { var v = el.value.trim(); return el.type === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) : v.length > 1; }
  function bind(id, fields, okId, build, extra) {
    var f = $(id); if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault(); var ok = true;
      fields.forEach(function (x) { var el = $(x); var g = valid(el); bad(el, !g); if (!g && ok) { el.focus(); } ok = ok && g; });
      if (extra && !extra()) ok = false;
      if (!ok) return;
      $(okId).hidden = false; var b = build(); mail(b[0], b[1]);
    });
    fields.forEach(function (x) { $(x).addEventListener('input', function () { bad($(x), false); }); });
  }
  bind('#qform', ['#q-n', '#q-e', '#q-m'], '#qok', function () { return ['Question : ' + $('#q-t').value, $('#q-m').value + '\n\n' + $('#q-n').value + ' (' + $('#q-e').value + ')']; }, function () { var c = $('#q-c'); $('#q-ce').classList.toggle('on', !c.checked); return c.checked; });
  bind('#cform', ['#c-n', '#c-e', '#c-m'], '#cok', function () { return ['Collaboration : ' + $('#c-t').value, $('#c-m').value + '\n\n' + $('#c-n').value + ' (' + $('#c-e').value + ')']; });
  bind('#nform', ['#ne'], '#nok', function () { return ['Prévenez-moi à la sortie des guides', 'Mon e-mail : ' + $('#ne').value]; });
})();

/* vidéos : filtre par plateforme */
(function () {
  var g = document.getElementById('vgrid'); if (!g) return;
  var chips = [].slice.call(document.querySelectorAll('#vchips button'));
  chips.forEach(function (b) { b.addEventListener('click', function () {
    chips.forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
    [].slice.call(g.children).forEach(function (c) { c.hidden = !(b.dataset.f === 'all' || c.dataset.p === b.dataset.f); });
  }); });
})();
