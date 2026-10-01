// Génère le site : node _build/build.js
// Chaque page est écrite dans son dossier (fiches/index.html -> /fiches/) pour des URLs propres.
const fs = require('fs'), path = require('path');
const out = path.join(__dirname, '..');

const NAME = 'Juriste Blessing';
const MAIL = 'bonjour@exemple.ci'; // À remplacer par l'adresse réelle
const I = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
  seal: '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="currentColor"/><path d="M32 12v34M18 20h28M18 20l-7 16h14zM46 20l-7 16h14zM22 48h20" fill="none" stroke="var(--forest)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="32" cy="12" r="3" fill="var(--orange)"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.500"/></svg>',
};

// Réseaux sociaux : À REMPLACER par les vrais liens. Seul le profil Facebook est réel ; les autres pointent vers l'accueil de la plateforme.
const SOCIAL = [
  ['Facebook', 'https://www.facebook.com/profile.php?id=100086278839147', '649 K abonnés', '<path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.800c0-.9.3-1.500 1.600-1.500h1.700V4.400c-.3 0-1.300-.1-2.400-.1-2.400 0-4 1.400-4 4.100v2.400H7.700V14h2.700v8z"/>'],
  ['TikTok', 'https://www.tiktok.com/', 'Vidéos courtes', '<path d="M16.500 3c.3 2.200 1.600 3.600 3.800 3.800v3.100c-1.400 0-2.700-.4-3.800-1.200v6.100a5.700 5.700 0 1 1-5.700-5.700c.3 0 .6 0 .9.1v3.200a2.600 2.600 0 1 0 1.700 2.400V3z"/>'],
  ['YouTube', 'https://www.youtube.com/', 'Vidéos longues', '<path d="M21.600 7.200a2.500 2.500 0 0 0-1.800-1.800C18.200 5 12 5 12 5s-6.200 0-7.800.4A2.500 2.500 0 0 0 2.400 7.200C2 8.800 2 12 2 12s0 3.200.4 4.800a2.500 2.500 0 0 0 1.800 1.800C5.800 19 12 19 12 19s6.200 0 7.800-.4a2.500 2.500 0 0 0 1.800-1.800c.4-1.600.4-4.800.4-4.800s0-3.200-.4-4.800zM10 15V9l5.200 3z"/>'],
  ['Instagram', 'https://www.instagram.com/', 'Photos & stories', '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.500" cy="6.500" r="1.200"/>'],
  ['WhatsApp', 'https://www.whatsapp.com/', 'Chaîne', '<path d="M12 2a10 10 0 0 0-8.600 15.100L2 22l5-1.300A10 10 0 1 0 12 2zm5.300 14.200c-.2.600-1.300 1.200-1.800 1.200-.5.100-1 .2-3.300-.7-2.800-1.200-4.600-4-4.700-4.200-.1-.2-1.100-1.500-1.100-2.800s.7-2 1-2.300c.2-.3.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.8 2c.1.200.1.400 0 .5l-.4.600c-.1.200-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.100 1 2.100 1.300 2.400 1.500.3.100.4.100.6-.1l.8-1c.2-.3.400-.2.600-.1l1.900.9c.3.100.5.200.5.300.1.200.1.800-.1 1.400z"/>'],
];
const sico = (p) => `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${p}</svg>`;
const socialRow = (cls = '') => `<ul class="social ${cls}">${SOCIAL.map(s => `<li><a href="${s[1]}" target="_blank" rel="noopener noreferrer" aria-label="${s[0]}" title="${s[0]}">${sico(s[3])}</a></li>`).join('')}</ul>`;
const portrait = (img, alt, cls = '') => `<figure class="portrait ${cls}"><div class="pf"><img src="img/${img}.webp" alt="${alt}" loading="lazy"></div><figcaption class="ph-badge">Portrait à venir</figcaption></figure>`;
const videos = [['Vidéo d\'exemple', 'Les droits du locataire en 60 secondes', 'TikTok', 'Logement'], ['Vidéo d\'exemple', 'Contrat de travail : ce qu\'il faut lire', 'YouTube', 'Travail'], ['Vidéo d\'exemple', 'Mariage et régime matrimonial', 'Facebook', 'Famille'], ['Vidéo d\'exemple', 'Créer son entreprise : par où commencer', 'YouTube', 'Entreprise'], ['Vidéo d\'exemple', 'Que faire en cas d\'arnaque en ligne', 'TikTok', 'Numérique'], ['Vidéo d\'exemple', 'Perte de papiers : les bons réflexes', 'Facebook', 'Démarches']];
const vcard = (v, i) => `<a class="vcard rv" href="${SOCIAL.find(s => s[0] === v[2])[1]}" target="_blank" rel="noopener noreferrer" style="--d:${(i % 3) * .08}s"><span class="thumb"><span class="play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span><span class="plat">${v[2]}</span><span class="ex">${v[0]}</span></span><span class="vt">${v[1]}</span><span class="vm">${v[3]}</span></a>`;

const themes = [['famille', 'Famille'], ['travail', 'Travail'], ['logement', 'Logement'], ['entreprise', 'Entreprise'], ['demarches', 'Démarches'], ['numerique', 'Numérique']];
const fiches = [
  ['logement', "Bail d'habitation : ce qu'il faut vérifier avant de signer", "Les points à relire ligne par ligne avant de donner sa signature, et les preuves à garder.", '6 min', true],
  ['famille', "Mariage : choisir son régime matrimonial en connaissance de cause", "Ce que le choix du régime change pour vos biens, vos dettes et votre famille.", '7 min'],
  ['travail', "Contrat de travail : ce qui doit être écrit noir sur blanc", "Les mentions à repérer, et pourquoi il ne faut jamais travailler sans écrit.", '5 min'],
  ['entreprise', "Créer son entreprise : les grandes étapes, dans l'ordre", "Du choix de la forme juridique aux premières formalités, sans se perdre.", '8 min'],
  ['demarches', "Perdre ses papiers : qui prévenir, et dans quel ordre", "Les réflexes des premières 48 heures pour limiter les risques d'usurpation.", '4 min'],
  ['numerique', "Diffamation sur les réseaux : où s'arrête la liberté d'expression", "Ce qu'on peut dire, ce qu'on ne peut pas, et ce qui vous protège.", '6 min'],
  ['famille', "Succession : par où commencer quand un proche décède", "Les premières démarches, les documents à réunir et les erreurs fréquentes.", '9 min'],
  ['travail', "Rupture du contrat : les questions à poser avant de signer", "Avant d'apposer votre signature, ce qu'il faut comprendre et demander.", '6 min'],
  ['logement', "Litige avec un propriétaire : les premiers bons réflexes", "Écrire, dater, conserver : comment constituer un dossier solide dès le départ.", '5 min'],
  ['entreprise', "Contrat avec un client : les clauses à ne pas oublier", "Prix, délais, paiement, rupture : le minimum qui évite les mauvaises surprises.", '7 min'],
  ['demarches', "Acte, certificat, attestation : à quoi servent ces documents", "Le vocabulaire des papiers officiels, expliqué avec des exemples.", '4 min'],
  ['numerique', "Arnaque en ligne : les réflexes à avoir tout de suite", "Conserver les preuves, alerter, signaler : l'ordre qui compte.", '5 min'],
];
const tName = Object.fromEntries(themes);

const translations = [
  ['Nul n\'est censé ignorer la loi.', 'Même si vous ne la connaissez pas, la loi s\'applique à vous. Mieux vaut donc la comprendre.', 'Principe général'],
  ['Le contrat tient lieu de loi à ceux qui l\'ont fait.', 'Ce que vous avez signé vous engage. Relisez avant, pas après.', 'Les contrats'],
  ['La charge de la preuve incombe au demandeur.', 'C\'est à celui qui réclame quelque chose de prouver ce qu\'il avance. Gardez vos écrits.', 'La preuve'],
  ['Le bailleur est tenu de délivrer au preneur la chose louée.', 'Le propriétaire doit vous remettre un logement utilisable, tel que prévu au contrat.', 'Le logement'],
];

// ---------- gabarits ----------
const nav = [['index', 'Accueil'], ['fiches', 'Les fiches'], ['videos', 'Vidéos'], ['guides', 'Guides'], ['collaborer', 'Collaborer'], ['a-propos', 'À propos']];

function head({ title, desc, page }) {
  const t = page === 'index' ? `${NAME} · Le droit, en clair` : `${title} · ${NAME}`;
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${t}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#10261B">
<meta property="og:type" content="website">
<meta property="og:locale" content="fr_FR">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${desc}">
<link rel="icon" type="image/svg+xml" href="favicon.svg">
<link rel="preload" href="fonts/instrument-serif-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/dm-sans-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="css/style.css">
<script>document.documentElement.className+=' js'</script>
</head>
<body>
<a class="skip" href="#contenu">Aller au contenu</a>
<div id="progress" aria-hidden="true"></div>
`;
}
function header(cur) {
  const links = nav.map(([h, l]) => `<li><a href="${h}.html"${h === cur ? ' aria-current="page"' : ''}>${l}</a></li>`).join('');
  return `<header class="site"><div class="hbar">
<a class="brand" href="index.html" aria-label="${NAME}, accueil"><span class="seal">${I.seal}</span><span class="bn">Juriste <i>Blessing</i></span></a>
<nav class="nav" id="nav" aria-label="Navigation principale"><ul>${links}</ul></nav>
<a class="btn sm" href="poser-une-question.html">Poser une question ${I.arrow}</a>
<button class="burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav"><i></i><i></i></button>
</div></header>
<main id="contenu">
`;
}
function footer() {
  return `</main>
<footer class="site"><div class="wrap">
<div class="fword" aria-hidden="true">Le droit, en clair.</div>
<div class="fgrid">
<div><a class="brand" href="index.html"><span class="seal">${I.seal}</span><span class="bn">Juriste <i>Blessing</i></span></a>${socialRow('foot')}<p class="fnote">Information juridique générale. Ce site ne remplace pas une consultation personnalisée auprès d'un avocat ou d'un notaire.</p></div>
<div><h2>Explorer</h2><a href="fiches.html">Les fiches</a><a href="videos.html">Vidéos</a><a href="guides.html">Guides</a><a href="collaborer.html">Collaborer</a><a href="a-propos.html">À propos</a></div>
<div><h2>Contact</h2><a href="poser-une-question.html">Poser une question</a><a href="mailto:${MAIL}">${MAIL}</a><a href="mentions-legales.html">Mentions légales</a><a href="confidentialite.html">Confidentialité</a></div>
</div>
<div class="legal"><span>© 2026 ${NAME}. Maquette de démonstration, contenus d'exemple.</span><span>Site créé par <a href="https://agnissanisaac.com" target="_blank" rel="noopener noreferrer">Code AZ</a></span></div>
</div></footer>
<script src="js/main.js"></script>
</body>
</html>`;
}
const phero = (kicker, h1, lead) => `<section class="phero"><div class="wrap"><p class="kicker rv">${kicker}</p><h1 class="rv">${h1}</h1>${lead ? `<p class="lead rv">${lead}</p>` : ''}</div></section>`;
const card = (f, i) => `<a class="fcard rv" href="fiche.html" data-t="${f[0]}" data-s="${(f[1] + ' ' + f[2]).toLowerCase()}" style="--d:${(i % 3) * .08}s"><span class="num">Art. ${String(i + 1).padStart(2, '0')}</span><span class="tag">${tName[f[0]]}</span><h3>${f[1]}</h3><p>${f[2]}</p><span class="meta"><span>${f[3]} de lecture</span><span class="go">Lire ${I.arrow}</span></span></a>`;

const pages = {};

// ================= ACCUEIL =================
pages.index = head({ title: 'Accueil', desc: "Le droit expliqué simplement : fiches pratiques, guides et conseils d'orientation pour les particuliers et les entrepreneurs en Côte d'Ivoire.", page: 'index' }) + header('index') + `
<section class="hero"><div class="hero-bg" aria-hidden="true"></div><div class="wrap hgrid">
<div class="htxt"><p class="kicker light rv">Juriste · Créateur de contenu · Côte d'Ivoire</p>
<h1 class="rv">Le droit,<br><em>en clair.</em></h1>
<p class="lead rv">Des fiches pratiques, des guides et des réponses simples pour comprendre vos droits au quotidien : famille, travail, logement, entreprise, démarches.</p>
<div class="actions rv"><a class="btn light" href="fiches.html">Explorer les fiches ${I.arrow}</a><a class="btn ghost" href="poser-une-question.html">Poser une question</a></div>
<p class="hnote rv">« La loi est dure mais c'est la loi. »</p></div>
<div class="hside rv">${portrait('portrait-accueil', 'Portrait de Juriste Blessing', 'lead')}<div class="hnumbers"><b>649 K</b><span>abonnés qui apprennent le droit avec lui</span></div></div></div></section>

<div class="marquee" aria-hidden="true"><div class="track">${[...Array(2)].map(() => `<span>${themes.map(t => t[1]).concat(['Bail', 'Succession', 'Contrat', 'Création d\'entreprise', 'Consommation', 'Preuve']).join('</span><span>')}</span>`).join('')}</div></div>

<section class="s tradsec"><div class="wrap split">
<div><p class="kicker rv">Le traducteur</p><h2 class="rv">Un texte de loi, <em>traduit en direct.</em></h2><p class="big rv">C'est la méthode : prendre une phrase de loi qui semble faite pour les juristes, et la dire comme on la dirait à un ami. Essayez avec les quatre exemples.</p></div>
<aside class="trad rv flat" aria-label="Traducteur juridique">
<div class="trad-h"><span>Le traducteur</span><span class="cnt" id="tcount">1 / ${translations.length}</span></div>
<div class="trad-b"><p class="lbl">Dans le texte</p><blockquote id="t-src">${translations[0][0]}</blockquote>
<div class="arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v16M6 14l6 6 6-6"/></svg></div>
<p class="lbl o">En clair</p><p class="clear" id="t-out" aria-live="polite">${translations[0][1]}</p></div>
<div class="trad-f" role="tablist" aria-label="Choisir un exemple">${translations.map((t, i) => `<button type="button" role="tab" data-i="${i}" aria-selected="${i === 0}">${t[2]}</button>`).join('')}</div>
</aside></div></section>

<section class="s intro"><div class="wrap split">
<div><p class="kicker rv">Pourquoi ce site</p><h2 class="rv">Comprendre la loi ne devrait pas être <em>réservé aux juristes.</em></h2></div>
<div class="rv"><p class="big">Chaque fiche traduit un texte de loi en langage de tous les jours : ce que dit le droit, ce que cela change pour vous, les erreurs fréquentes et les bons réflexes.</p>
<div class="stats"><div><b data-count="649" data-suf=" K">649 K</b><span>abonnés sur Facebook</span></div><div><b>ORA 2026</b><span>Distingué parmi les 50 figures de l'effort africain</span></div><div><b data-count="6">6</b><span>grands thèmes du quotidien</span></div></div></div>
</div></section>

<section class="s dark scope"><div class="wrap">
<div class="two">
<div class="rv"><p class="kicker light">Ce que vous trouverez ici</p><ul class="ticks">${['Des explications claires, sans jargon', 'Des exemples tirés de la vie courante', 'Des listes de vérification avant de signer', 'Une orientation vers les bons interlocuteurs', 'Des guides à télécharger'].map(x => `<li>${I.check}${x}</li>`).join('')}</ul></div>
<div class="rv notbox"><p class="kicker light o">Ce que vous ne trouverez pas ici</p><ul class="ticks no">${['La représentation devant un tribunal', 'Une consultation personnalisée sur votre dossier', 'La rédaction d\'actes qui engagent un avocat ou un notaire'].map(x => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>${x}</li>`).join('')}</ul><p class="small">Juriste Blessing se présente comme juriste, ni avocat ni notaire : le contenu est de l'information juridique générale. Pour un dossier précis, rapprochez-vous d'un professionnel habilité.</p></div>
</div></div></section>

<section class="s"><div class="wrap">
<div class="shead"><div><p class="kicker rv">Les fiches</p><h2 class="rv">Un droit, <em>une fiche.</em></h2></div><a class="more rv" href="fiches.html">Toutes les fiches ${I.arrow}</a></div>
<div class="fgrid3">${fiches.slice(0, 6).map(card).join('')}</div>
</div></section>

<section class="s vidsec"><div class="wrap">
<div class="shead"><div><p class="kicker rv">Les vidéos</p><h2 class="rv">Le droit, <em>en vidéo.</em></h2></div><a class="more rv" href="videos.html">Toutes les vidéos ${I.arrow}</a></div>
<div class="vgrid">${videos.slice(0, 3).map(vcard).join('')}</div>
</div></section>

<section class="band"><img src="img/plateau.webp" width="2200" height="1040" alt="Vue d'Abidjan et de la lagune, avec les tours du Plateau, au crépuscule" loading="lazy"><div class="band-in"><p class="bq rv">« La loi est dure<br>mais <em>c'est la loi.</em> »</p><p class="bc">Pour tous les Ivoiriens, d'Abidjan à la diaspora.</p></div></section>

<section class="s"><div class="wrap split rev">
<figure class="themis rv"><img src="img/themis.webp" width="1000" height="1334" alt="Statue en bronze de la justice tenant une balance, devant un bâtiment de marbre" loading="lazy"><figcaption>Photo : Deiadameian, CC BY-SA 4.0</figcaption></figure>
<div><p class="kicker rv">Les guides</p><h2 class="rv">Des guides pour <em>garder sous la main.</em></h2><p class="big rv">Locataire, salarié, entrepreneur : des guides courts, structurés et téléchargeables, pour avoir les bons réflexes avant de signer.</p>
<ul class="glist rv">${['Le guide du locataire', 'Comprendre son contrat de travail', 'Créer son entreprise sans se perdre'].map((g, i) => `<li><span>0${i + 1}</span>${g}<em>Bientôt</em></li>`).join('')}</ul>
<a class="btn dark rv" href="guides.html">Voir les guides ${I.arrow}</a></div>
</div></section>

<section class="s socsec"><div class="wrap"><div class="socbox rv"><div><p class="kicker light">Suivez Juriste Blessing</p><h2>Sa communauté, <em>là où il publie.</em></h2><p>Vidéos, explications, actualité du droit : retrouvez-le sur ses réseaux.</p></div>
<ul class="soclist">${SOCIAL.map(x => `<li><a href="${x[1]}" target="_blank" rel="noopener noreferrer"><span class="si">${sico(x[3])}</span><span class="sn">${x[0]}<small>${x[2]}</small></span>${I.arrow}</a></li>`).join('')}</ul></div></div></section>

<section class="s cta"><div class="wrap"><div class="ctabox rv"><img class="stamp" src="img/sceau.webp" width="600" height="600" alt="" loading="lazy"><div><p class="kicker light">Médias, entreprises, institutions</p><h2>Une intervention, une formation, <em>un partenariat ?</em></h2><p>Pour parler de droit au grand public, former des équipes ou sensibiliser une communauté.</p><div class="actions"><a class="btn light" href="collaborer.html">Collaborer ${I.arrow}</a><a class="btn ghost" href="poser-une-question.html">Poser une question</a></div></div></div></div></section>
` + footer();

// ================= FICHES =================
pages.fiches = head({ title: 'Les fiches', desc: 'Toutes les fiches pratiques : famille, travail, logement, entreprise, démarches, numérique. Recherche et filtres.', page: 'fiches' }) + header('fiches') +
  phero('La bibliothèque', 'Les fiches <em>pratiques.</em>', 'Cherchez un sujet, filtrez par thème. Chaque fiche explique le droit en langage simple.') + `
<section class="s tight"><div class="wrap">
<div class="tools rv"><label class="search"><span class="vh">Rechercher une fiche</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input id="q" type="search" placeholder="Rechercher : bail, mariage, contrat…" autocomplete="off"></label>
<div class="chips" id="chips" role="group" aria-label="Filtrer par thème"><button type="button" data-f="all" aria-pressed="true">Tous</button>${themes.map(t => `<button type="button" data-f="${t[0]}" aria-pressed="false">${t[1]}</button>`).join('')}</div></div>
<p class="count" id="fcount" aria-live="polite">${fiches.length} fiches</p>
<div class="fgrid3" id="fgrid">${fiches.map(card).join('')}</div>
<p class="empty" id="fempty" hidden>Aucune fiche ne correspond. Essayez un autre mot, ou <a href="poser-une-question.html">posez-nous la question</a>.</p>
<p class="small ctr">Fiches d'exemple : les contenus seront remplacés par les vrais textes.</p>
</div></section>` + footer();

// ================= FICHE (exemple) =================
const checks = ['Les noms et pièces d\'identité des deux parties', 'L\'adresse exacte et la description du logement', 'Le montant du loyer et la date de paiement', 'La durée du bail et ses conditions de fin', 'Ce qui est inclus ou non (eau, électricité, charges)', 'Un état des lieux d\'entrée écrit et signé par les deux', 'Un reçu pour chaque paiement'];
pages.fiche = head({ title: "Bail d'habitation", desc: "Exemple de fiche : les points à vérifier avant de signer un bail d'habitation, expliqués simplement.", page: 'fiche' }) + header('fiches') + `
<section class="phero art-h"><div class="wrap narrow"><p class="kicker rv"><a href="fiches.html">← Les fiches</a> · Logement · 6 min</p><h1 class="rv">Bail d'habitation : ce qu'il faut vérifier <em>avant de signer.</em></h1><p class="lead rv">Louer un logement engage pour des mois, parfois des années. Voici les points à relire calmement avant de donner votre signature.</p></div></section>
<section class="s tight"><div class="wrap narrow"><article class="art">
<p class="note rv"><strong>Fiche d'exemple.</strong> Cette page montre la structure d'une fiche. Le texte sera remplacé par les contenus rédigés par le juriste.</p>
<div class="in30 rv"><b>En 30 secondes</b><p>Un bail se prépare : demandez un écrit, relisez-le entièrement, vérifiez les informations essentielles, faites un état des lieux et gardez chaque preuve de paiement.</p></div>
<h2 class="rv">Le texte, puis <em>en clair</em></h2>
<div class="pair rv"><div><span class="lbl">Dans le texte</span><p>Le bailleur est tenu de délivrer au preneur la chose louée.</p></div><div class="o"><span class="lbl">En clair</span><p>Le propriétaire doit vous remettre un logement utilisable, tel que prévu dans le contrat.</p></div></div>
<div class="pair rv"><div><span class="lbl">Dans le texte</span><p>Le preneur est tenu de payer le loyer aux termes convenus.</p></div><div class="o"><span class="lbl">En clair</span><p>Vous devez payer le loyer à la date et au montant prévus, et en garder la preuve.</p></div></div>
<h2 class="rv">La liste à cocher avant de signer</h2>
<div class="checklist rv" id="checklist"><div class="cbar"><i id="cfill"></i></div><p class="cc" id="ccount" aria-live="polite">0 / ${checks.length} points vérifiés</p>
<ul>${checks.map((c, i) => `<li><label><input type="checkbox"><span class="box">${I.check}</span><span>${c}</span></label></li>`).join('')}</ul></div>
<h2 class="rv">Les erreurs fréquentes</h2>
<ul class="plain rv"><li>Signer sans avoir tout lu, sous la pression du temps.</li><li>Se contenter d'une promesse orale.</li><li>Ne pas conserver les reçus de paiement.</li><li>Oublier l'état des lieux, ce qui complique tout litige.</li></ul>
<h2 class="rv">Et si cela se passe mal ?</h2>
<p class="rv">Écrivez, datez, conservez : un échange écrit est plus solide qu'une discussion. Pour un litige précis, rapprochez-vous d'un avocat ou des services compétents.</p>
<p class="warn rv">Information juridique générale. Elle ne remplace pas une consultation personnalisée.</p>
<div class="actions rv"><a class="btn dark" href="poser-une-question.html">Poser une question sur ce sujet ${I.arrow}</a><a class="btn line" href="fiches.html">Autres fiches</a></div>
</article></div></section>` + footer();

// ================= VIDÉOS =================
pages.videos = head({ title: 'Vidéos', desc: "Les vidéos de Juriste Blessing : le droit expliqué simplement sur TikTok, YouTube et Facebook.", page: 'videos' }) + header('videos') +
  phero('Ses vidéos', 'Le droit, <em>en vidéo.</em>', "Des explications courtes pour comprendre ses droits. Retrouvez-les sur chaque plateforme.") + `
<section class="s tight"><div class="wrap">
<div class="feat rv"><div class="screen"><span class="play big" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span><span class="ex">Emplacement de la vidéo à la une</span></div>
<div class="finfo"><p class="kicker">À la une</p><h2>Votre vidéo la plus <em>importante.</em></h2><p class="big">Ici s'affichera la vidéo mise en avant : intégrée directement depuis TikTok, YouTube ou Facebook, avec son titre et une courte description.</p><div class="actions"><a class="btn dark" href="${SOCIAL[1][1]}" target="_blank" rel="noopener noreferrer">Voir sur TikTok ${I.arrow}</a><a class="btn line" href="${SOCIAL[2][1]}" target="_blank" rel="noopener noreferrer">Voir sur YouTube</a></div></div></div>
<div class="tools rv"><div class="chips" id="vchips" role="group" aria-label="Filtrer par plateforme"><button type="button" data-f="all" aria-pressed="true">Toutes</button>${['TikTok', 'YouTube', 'Facebook'].map(t => `<button type="button" data-f="${t}" aria-pressed="false">${t}</button>`).join('')}</div></div>
<div class="vgrid" id="vgrid">${videos.map((v, i) => vcard(v, i).replace('class="vcard rv"', `class="vcard rv" data-p="${v[2]}"`)).join('')}</div>
<p class="small ctr">Vidéos d'exemple : elles seront remplacées par ses vraies publications, intégrées depuis ses plateformes.</p>
<div class="socbox dk rv"><div><p class="kicker light">Abonnez-vous</p><h2>Ne ratez <em>aucune vidéo.</em></h2></div><ul class="soclist">${SOCIAL.map(x => `<li><a href="${x[1]}" target="_blank" rel="noopener noreferrer"><span class="si">${sico(x[3])}</span><span class="sn">${x[0]}<small>${x[2]}</small></span>${I.arrow}</a></li>`).join('')}</ul></div>
</div></section>` + footer();

// ================= GUIDES =================
pages.guides = head({ title: 'Guides', desc: "Guides pratiques à garder sous la main : locataire, salarié, entrepreneur. Bientôt disponibles.", page: 'guides' }) + header('guides') +
  phero('À télécharger', 'Les guides <em>pratiques.</em>', 'Des guides courts et structurés, pour avoir les bons réflexes avant de signer.') + `
<section class="s tight"><div class="wrap"><div class="gshelf">${[['Le guide du locataire', 'Bail, état des lieux, loyers, litiges : tout ce qu\'il faut savoir avant et pendant la location.', 'Logement', 'livres'], ['Comprendre son contrat de travail', 'Les mentions essentielles, les droits du salarié et les questions à poser.', 'Travail', 'colonnes'], ['Créer son entreprise sans se perdre', 'Les étapes, dans l\'ordre, avec une liste de vérification à chaque étape.', 'Entreprise', 'plateau-nuit']].map((g, i) => `
<article class="book rv" style="--d:${i * .1}s"><div class="cover"><img src="img/${g[3]}.webp" alt="" width="600" height="800" loading="lazy"><span>Guide</span><b>${g[0]}</b></div><div class="binfo"><span class="tag">${g[2]}</span><h3>${g[0]}</h3><p>${g[1]}</p><span class="soon">Bientôt disponible · exemple</span></div></article>`).join('')}</div>
<div class="notify rv"><h2>Être prévenu <em>à la sortie</em></h2><p>Laissez votre e-mail : vous recevrez le guide dès sa publication.</p>
<form id="nform" class="form inline" novalidate><div class="fld"><input id="ne" type="email" placeholder=" " autocomplete="email" required><label for="ne">Votre e-mail *</label><p class="err">Indiquez une adresse e-mail valide.</p></div><button class="btn dark" type="submit">Me prévenir ${I.arrow}</button></form><p class="ok" id="nok" hidden>Votre messagerie s'ouvre avec la demande prête à partir.</p></div>
</div></section>` + footer();

// ================= COLLABORER =================
pages.collaborer = head({ title: 'Collaborer', desc: 'Interventions médias, formations, partenariats : travaillons ensemble pour rendre le droit accessible.', page: 'collaborer' }) + header('collaborer') +
  phero('Travaillons ensemble', 'Parler de droit <em>au plus grand nombre.</em>', 'Médias, entreprises, institutions et marques : quatre façons de collaborer.') + `
<section class="s tight"><div class="wrap"><figure class="inter rv"><img src="img/intervention.webp" alt="Juriste Blessing en intervention" width="1600" height="900" loading="lazy"><figcaption class="ph-badge">Photo d'intervention à venir (plateau, conférence)</figcaption></figure><div class="offers">${[['01', 'Médias & plateaux', 'Intervenir comme invité pour éclairer l\'actualité sous l\'angle du droit.'], ['02', 'Entreprises & équipes', 'Ateliers et sensibilisations pour que vos équipes comprennent les règles qui les concernent.'], ['03', 'Institutions & associations', 'Campagnes d\'information et conférences pour les communautés et les étudiants.'], ['04', 'Marques & partenariats', 'Contenus partenaires sur des sujets utiles, dans le respect de l\'indépendance éditoriale.']].map((o, i) => `<article class="offer rv" style="--d:${i * .08}s"><span class="n">${o[0]}</span><h3>${o[1]}</h3><p>${o[2]}</p></article>`).join('')}</div>
<div class="split formsec"><div class="rv"><p class="kicker">Proposer une collaboration</p><h2>Parlez-nous de <em>votre projet.</em></h2><p class="big">Précisez le type de demande, la date et le public visé. Une réponse vous est adressée par e-mail.</p></div>
<form id="cform" class="form rv" novalidate aria-label="Demande de collaboration"><div class="fld"><input id="c-n" type="text" placeholder=" " autocomplete="name" required><label for="c-n">Nom ou organisation *</label><p class="err">Indiquez votre nom.</p></div>
<div class="fld"><input id="c-e" type="email" placeholder=" " autocomplete="email" required><label for="c-e">E-mail *</label><p class="err">Indiquez une adresse e-mail valide.</p></div>
<div class="fld sel"><select id="c-t"><option>Média / plateau</option><option>Entreprise / formation</option><option>Institution / association</option><option>Marque / partenariat</option></select><label for="c-t">Type de demande</label></div>
<div class="fld"><textarea id="c-m" rows="5" placeholder=" " required></textarea><label for="c-m">Votre projet *</label><p class="err">Décrivez brièvement votre projet.</p></div>
<button class="btn dark" type="submit">Envoyer la demande ${I.arrow}</button><p class="ok" id="cok" role="status" hidden>Votre messagerie s'ouvre avec le message prêt à partir.</p></form></div>
</div></section>` + footer();

// ================= POSER UNE QUESTION =================
pages['poser-une-question'] = head({ title: 'Poser une question', desc: "Posez votre question juridique par thème. Réponse d'orientation générale, sans valeur de consultation.", page: 'poser-une-question' }) + header('') +
  phero('Écrivez-nous', 'Posez votre <em>question.</em>', 'Choisissez un thème, expliquez votre situation en quelques lignes. Les questions fréquentes nourrissent de nouvelles fiches.') + `
<section class="s tight"><div class="wrap split formsec">
<div class="rv"><div class="warnbox"><b>Avant d'écrire</b><ul class="plain"><li>La réponse est une orientation générale, pas une consultation.</li><li>N'envoyez pas de pièces d'identité ni de documents confidentiels.</li><li>Pour un dossier urgent ou une procédure en cours, contactez un avocat.</li></ul></div></div>
<form id="qform" class="form rv" novalidate aria-label="Poser une question"><div class="fld"><input id="q-n" type="text" placeholder=" " autocomplete="given-name" required><label for="q-n">Votre prénom *</label><p class="err">Indiquez votre prénom.</p></div>
<div class="fld"><input id="q-e" type="email" placeholder=" " autocomplete="email" required><label for="q-e">E-mail *</label><p class="err">Indiquez une adresse e-mail valide.</p></div>
<div class="fld sel"><select id="q-t">${themes.map(t => `<option>${t[1]}</option>`).join('')}<option>Autre</option></select><label for="q-t">Thème</label></div>
<div class="fld"><textarea id="q-m" rows="6" placeholder=" " required></textarea><label for="q-m">Votre question *</label><p class="err">Écrivez votre question.</p></div>
<label class="consent"><input id="q-c" type="checkbox" required><span class="box">${I.check}</span><span>J'ai compris qu'il s'agit d'une information générale, sans valeur de consultation, et j'accepte le traitement de mes données selon la <a href="confidentialite.html">politique de confidentialité</a>.</span></label><p class="err" id="q-ce">Cochez la case pour continuer.</p>
<button class="btn dark" type="submit">Envoyer ma question ${I.arrow}</button><p class="ok" id="qok" role="status" hidden>Votre messagerie s'ouvre avec la question prête à partir.</p></form>
</div></section>` + footer();

// ================= À PROPOS =================
pages['a-propos'] = head({ title: 'À propos', desc: "Juriste, créateur de contenu : rendre le droit compréhensible par tous en Côte d'Ivoire. Ce que fait, et ne fait pas, Juriste Blessing.", page: 'a-propos' }) + header('a-propos') +
  phero('À propos', 'Rendre le droit <em>compréhensible.</em>', "Juriste et créateur de contenu, Juriste Blessing explique le droit ivoirien au grand public.") + `
<section class="s tight"><div class="wrap split">
<div class="rv">${portrait('portrait-apropos', 'Portrait de Juriste Blessing', 'about')}</div>
<div><h2 class="rv">Une mission : <em>expliquer.</em></h2><p class="big rv">Beaucoup de problèmes juridiques viennent d'un simple manque d'information. L'ambition est de traduire les textes en langage courant, avec des exemples du quotidien.</p>
<p class="rv">Sa devise résume l'esprit : « La loi est dure mais c'est la loi ». Il ne s'agit pas de faire peur, mais de rappeler que connaître ses droits permet de mieux les défendre.</p>
<div class="rv socabout"><p class="kicker">Le retrouver</p>${socialRow('big')}</div>
<div class="rv warnbox"><b>Précision importante</b><p>Juriste Blessing n'est ni avocat ni notaire. Les contenus relèvent de la sensibilisation et de l'information juridique générale, et ne remplacent pas une consultation personnalisée.</p></div></div>
</div></section>
<section class="s dark"><div class="wrap"><div class="shead"><div><p class="kicker light rv">Reconnaissance</p><h2 class="rv">Une <em>audience</em> qui compte.</h2></div></div>
<ol class="awards"><li class="rv"><span>01</span><p>Plus de 649 000 abonnés sur Facebook</p><em>Communauté</em></li><li class="rv"><span>02</span><p>ORA 2026 : distingué parmi les 50 figures de l'effort africain</p><em>2026</em></li><li class="rv"><span>03</span><p>Prix du meilleur influenceur d'Afrique pour l'engagement civique, l'éducation juridique et l'impact social</p><em>2026</em></li></ol>
<p class="small light rv">Source presse : <a href="https://www.linfodrome.com/culture/125413-ora-2026-stoni-et-le-juriste-blessing-distingues-parmi-les-50-figures-de-l-effort-africain" target="_blank" rel="noopener noreferrer">L'Infodrome, ORA 2026</a>. À vérifier et compléter avec l'intéressé.</p></div></section>` + footer();

// ================= LÉGAL =================
const legal = (key, title, body) => head({ title, desc: title, page: key }) + header('') + phero('Légal', title) + `<section class="s tight"><div class="wrap narrow"><div class="prose rv">${body}</div></div></section>` + footer();
pages['mentions-legales'] = legal('mentions-legales', 'Mentions légales', `<p><strong>Maquette de démonstration</strong> réalisée par Code AZ. Les informations ci-dessous sont à remplacer par les informations réelles de l'éditeur.</p>
<h2>Éditeur du site</h2><p>Juriste Blessing<br>Abidjan, Côte d'Ivoire<br>Email : <a href="mailto:${MAIL}">${MAIL}</a></p>
<h2>Nature des contenus</h2><p>Les contenus de ce site sont de l'information juridique générale destinée à la sensibilisation. Ils ne constituent pas une consultation juridique personnalisée et ne remplacent pas l'avis d'un avocat ou d'un notaire.</p>
<h2>Conception</h2><p>Site conçu par <a href="https://agnissanisaac.com" target="_blank" rel="noopener noreferrer">Code AZ</a>.</p>
<h2>Propriété intellectuelle</h2><p>Les textes et éléments graphiques sont protégés. Les photographies proviennent de Wikimedia Commons, sous licences libres, avec les crédits ci-dessous.</p>
<h2>Crédits photographiques</h2><ul><li>Palais de justice d'Abidjan : Alex Sirac, CC BY 4.0</li><li>Le Plateau depuis le Pont ADO, Abidjan : Edison McCullen, CC BY 4.0</li><li>Statue de la justice (Amaliada) : Deiadameian, CC BY-SA 4.0</li><li>Plateau d'Abidjan de nuit : abdallahh, CC BY 2.0</li><li>Rayonnages de livres, Royal Holloway : CC0 ; colonnes de tribunal et sceau de cire : domaine public</li></ul>`);
pages.confidentialite = legal('confidentialite', 'Confidentialité', `<h2>Données collectées</h2><p>Nous collectons uniquement ce que vous saisissez dans les formulaires : prénom ou nom, e-mail, thème et message. Aucune donnée sensible n'est demandée. Le site n'utilise pas de cookies publicitaires.</p>
<h2>Utilisation</h2><p>Vos données servent à répondre à votre demande et à identifier les sujets qui méritent une nouvelle fiche. Elles ne sont ni vendues ni cédées.</p>
<h2>Conservation</h2><p>Les messages sont conservés le temps nécessaire au traitement de votre demande, puis supprimés.</p>
<h2>Vos droits</h2><p>Conformément à la loi ivoirienne n°2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel, vous disposez d'un droit d'accès, de rectification et de suppression. Écrivez à <a href="mailto:${MAIL}">${MAIL}</a>. Vous pouvez aussi saisir l'ARTCI.</p>
<h2>Fonctionnement des formulaires</h2><p>Les formulaires ouvrent votre messagerie avec un message prêt à partir. Aucune donnée n'est enregistrée sur le site.</p>`);

// ---------- écriture : URLs propres ----------
const dirs = { index: '' }; // les autres pages vont dans /<nom>/
for (const f of fs.readdirSync(out)) { const p = path.join(out, f); if (fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html')) && !['_build', '_raw', 'img', 'css', 'js', 'fonts'].includes(f)) fs.rmSync(p, { recursive: true }); }
for (const [key, raw] of Object.entries(pages)) {
  const dir = key === 'index' ? '' : key + '/', up = dir ? '../' : '';
  let html = raw.replace(/(["'(])((?:img|css|js|fonts)\/|favicon\.svg)/g, `$1${up}$2`);
  html = html.replace(/href="([a-z0-9-]+)\.html(#[^"]*)?"/g, (m, h, hash) => `href="${h === 'index' ? (up || './') : up + h + '/'}${hash || ''}"`);
  if (dir) fs.mkdirSync(path.join(out, dir), { recursive: true });
  fs.writeFileSync(path.join(out, dir, 'index.html'), html);
}
console.log('OK', Object.keys(pages).length, 'pages');
