# Juriste Blessing : guide de publication

Maquette offerte (cadeau) : **à ne publier publiquement qu'avec l'accord de l'intéressé.**
Site statique : aucun serveur, aucune base de données.

## Publier (Vercel)
1. Glisser le dossier `09-juriste-blessing` sur vercel.com/new (ou « Import » depuis GitHub).
2. Framework : « Other », pas de commande de build. `.vercelignore` exclut `_build`, `_raw`, `model.png`.
3. Les adresses sont propres : `/fiches/`, `/guides/`, `/collaborer/`, `/poser-une-question/`, `/a-propos/`.

## Modifier les contenus
Tout est généré par `node _build/build.js` à partir de `_build/build.js` (textes, fiches, guides). Relancer la commande après chaque changement.
Styles : `css/style.css`. Interactions : `js/main.js`.

## À remplacer avant un usage réel
- **Adresse e-mail** : `bonjour@exemple.ci` dans `_build/build.js` (constante `MAIL`) ET dans `js/main.js` (variable `MAIL`).
- **Les 12 fiches** sont des exemples : remplacer par de vrais textes validés. La fiche « Bail d'habitation » (`/fiche/`) sert de modèle de structure ; vérifier chaque affirmation juridique.
- **Guides** : 3 guides « bientôt » à créer, puis ajouter le lien de téléchargement.
- **Reconnaissance (À propos)** : ORA 2026 et audience vérifiées d'après la presse et la page Facebook, à confirmer et compléter avec l'intéressé. Ne rien ajouter qui ne soit pas confirmé (passages TV, nombre de publications, etc.).
- **Mentions légales** : compléter l'éditeur réel (nom, statut, contact). Faire valider par un juriste.
- **Photos** : ajouter ses propres portraits/visuels (avec son accord) ; supprimer ses crédits Wikimedia si les images sont remplacées.
- **Formulaires** : ils ouvrent la messagerie (mailto). Pour recevoir les messages directement, brancher Formspree, Web3Forms ou une fonction serveur.

## Photos de la personne (emplacements prêts)
Remplacer ces fichiers par ses vraies photos, **en gardant le même nom** (format WebP, ou relancer le build si le nom change) :
- `img/portrait-accueil.webp` : portrait vertical (3:4), en haut de l'accueil.
- `img/portrait-apropos.webp` : portrait (4:5), page À propos.
- `img/intervention.webp` : photo large (16:9 ou 21:9) en intervention / sur plateau, page Collaborer.
Ensuite, supprimer les mentions « Portrait à venir » / « Photo d'intervention à venir » : dans `_build/build.js`, fonction `portrait()` (la ligne `ph-badge`) et la balise `figcaption` de la page Collaborer, puis `node _build/build.js`.
Photos à demander à l'intéressé lui-même (droits d'image) : ne pas les récupérer sur ses réseaux sans accord.

## Réseaux sociaux et vidéos
- Liens : constante `SOCIAL` en haut de `_build/build.js`. **Seul Facebook est réel** ; TikTok, YouTube, Instagram et WhatsApp pointent vers l'accueil de la plateforme : à remplacer par ses vrais comptes.
- Les liens apparaissent dans le pied de page, la section « Suivez » de l'accueil, la page À propos et la page Vidéos.
- Vidéos : tableau `videos` dans `_build/build.js` (titre, plateforme, thème). Pour de vraies vidéos : remplacer chaque carte par un lien direct vers la publication, ou intégrer le lecteur (iframe) de TikTok / YouTube / Facebook.
- Blog : les « fiches » jouent déjà le rôle d'articles. Une page Blog séparée peut être ajoutée s'il le souhaite.

## Précautions
- Conserver l'avertissement « information juridique générale, pas une consultation » sur toutes les pages (il reprend sa propre mention : ni avocat ni notaire).
- Ne pas proposer de « consultation » payante sans avoir vérifié ce qu'un non-avocat peut légalement offrir.

## Pour le portfolio Code AZ
- Titre : Juriste Blessing, le droit en clair
- Description : site éditorial pour juriste et créateur de contenu : traducteur « texte de loi → en clair », bibliothèque de fiches avec recherche et filtres, liste à cocher interactive, guides, page collaborations, formulaires.
- Atouts : URLs propres, fonts auto-hébergées, images libres créditées, accessible (clavier, contrastes, mouvement réduit), responsive.
- Pas de lien vers le vrai profil de la personne sans son accord.
