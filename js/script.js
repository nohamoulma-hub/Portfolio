/* ═════════ À PERSONNALISER ═════════
   Remplace les valeurs ci-dessous : tout le site se met à jour. */
const PROFILE = {
  name: "Noham Oulma",                             // Nom Prénom (titre principal)
  role: "Développeur Fullstack et Agentic",       // Poste
  github: "https://github.com/nohamoulma-hub",
  linkedin: "https://www.linkedin.com/in/nohamoulma/",
  email: "noham.oulma@gmail.com",
};

/* Projets GitHub choisis.
   landing → page de présentation du projet dans ce site (ex. "projets/le-bras.html"), ouverte au clic en priorité
   url   → page de déploiement ; utilisée si pas de landing. Laisser "" si pas encore déployé
   repo  → dépôt GitHub (lien « Code source » ; ouvert au clic s'il n'y a ni landing ni url)
   image → capture d'écran (optionnel, ex. "img/projet1.jpg") ; sinon miniature typographique
   theme → "ink" | "sand" (couleur de la miniature sans image)
   note  → petite étiquette optionnelle (ex. travail d'équipe) */
const PROJECTS = [
  { title: "Le Bras", description: "Un agent opérationnel qui transforme une intention en actions, tout en laissant le contrôle final à l’humain.", stack: ["Python", "FastAPI", "PostgreSQL", "Docker", "HTML", "CSS", "JS", "Orchestration"], url: "https://lebras.nohamoulma.fr/", landing: "projets/le-bras.html", repo: "https://github.com/nohamoulma-hub/Holberton-school-Hackathon-Le_Bras", image: "img/le-bras.jpg", theme: "ink", note: "Projet d’équipe, hackathon" },
  { title: "Le Sosie", note: "Projet d’équipe, hackathon", description: "Vérification de calculs de dépenses : Python et SQL calculent chacun de leur côté, le serveur compare les deux résultats et l’interface les affiche une fois vérifiés.", stack: ["Python", "Flask", "SQLite", "HTML", "CSS", "JS", "Orchestration"], url: "https://le-sosie.onrender.com", landing: "projets/le-sosie.html", repo: "https://github.com/John-Natty/Holberton-school-Hackathon-le-Sosie/tree/main", image: "img/le-sosie.jpg", theme: "sand" },
  { title: "HBntory Inventor Management", note: "Projet d’équipe", description: "Projet de fin de second trimestre : gestion des stocks d’une entreprise de 3 filiales en France, avec un agent IA qui traite les requêtes grâce aux outils à sa disposition.", stack: ["Python", "SQLite", "SQLAlchemy", "HTML", "CSS", "JS", "REST API"], url: "https://hbntory.aeonlabs.fr/", landing: "projets/hbntory.html", repo: "https://github.com/Souf-F/HBntory-Inventor-Management-Platform", image: "img/hbntory.jpg", theme: "ink" },
  { title: "Voyager en Martinique", note: "Projet individuel", description: "Un agent IA qui crée un voyage sur mesure en Martinique selon le budget, la durée, les goûts et la météo estimée selon la saison.", stack: ["Python", "PostgreSQL", "HTML", "CSS", "JS", "Orchestration"], url: "", landing: "projets/martinique.html", repo: "https://github.com/nohamoulma-hub/Projet-Martinique", image: "img/martinique.jpg", theme: "sand" },
];
/* Logo GitHub (icône vectorielle) pour le lien vers le dépôt */
const GITHUB_ICON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>';

/* ═══════════════════════════════════ */

(function () {
  const root = document.querySelector(".pf");
  const $ = (s, el = root) => el.querySelector(s);
  const $$ = (s, el = root) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pretty = (u) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  /* Textes accessibles + pied de page */
  $("#pf-name").setAttribute("aria-label", PROFILE.name);
  $("#pf-role").setAttribute("aria-label", PROFILE.role);
  $("[data-footer-name]").textContent = "© " + PROFILE.name;
  $("[data-year]").textContent = new Date().getFullYear();
  const initials = PROFILE.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  $("[data-initials]").innerHTML = esc(initials) + "<span>.</span>";
  document.title = PROFILE.name + " | " + PROFILE.role;

  /* Projets : une carte par projet, puis une carte « d'autres projets arrivent » */
  $("#pf-projects").innerHTML = PROJECTS.map((p, i) => {
    const n = String(i + 1).padStart(2, "0");
    const href = p.landing || p.url || p.repo; // priorité : page du projet, puis site déployé, puis GitHub
    const blank = p.landing ? "" : ' target="_blank" rel="noopener"'; // la page du projet s'ouvre dans le même onglet
    const cta = p.landing ? "Présentation" : p.url ? "Voir le projet" : "Voir sur GitHub";
    /* Boutons de la carte : « Voir le site » si déployé, logo GitHub pour le code */
    const present = `<a class="pf-card-present" href="${esc(href)}"${blank}>${cta} <span class="pf-arrow" aria-hidden="true">↗</span></a>`; // bouton blanc vers la page du projet
    const thumb = p.image
      ? `<img src="${esc(p.image)}" alt="Capture d’écran de ${esc(p.title)}" loading="lazy">`
      : `<div class="pf-thumb-art"><span class="pf-thumb-num">${n}</span><span class="pf-thumb-stack">${esc((p.stack || [])[0] || "")}</span></div>`;
    return `<article class="pf-card">
      <div class="pf-thumb pf-thumb--${esc(p.theme || "ink")}${p.image ? " pf-thumb--shot" : ""}">${thumb}</div>
      <div class="pf-card-body">
        <h3 class="pf-card-title"><a class="pf-card-link" href="${esc(href)}"${blank}>${esc(p.title)}</a></h3>
        ${p.note ? `<p class="pf-card-note">${esc(p.note)}</p>` : ""}
        <p class="pf-card-desc">${esc(p.description)}</p>
        <ul class="pf-tags">${(p.stack || []).map((t) => `<li class="pf-tag">${esc(t)}</li>`).join("")}</ul>
        <div class="pf-card-foot">
            ${p.url ? `<a class="pf-card-site" href="${esc(p.url)}" target="_blank" rel="noopener">Voir le site <span aria-hidden="true">↗</span></a>` : present}
          <div class="pf-card-actions">
              ${p.url ? present : ""}
            ${(p.landing || p.url) && p.repo ? `<a class="pf-card-gh" href="${esc(p.repo)}" target="_blank" rel="noopener" title="Code source sur GitHub" aria-label="Code source de ${esc(p.title)} sur GitHub">${GITHUB_ICON}</a>` : ""}
          </div>
        </div>
      </div>
    </article>`;
  }).join("") + `<article class="pf-card pf-card--more">
      <p class="pf-more-kicker">À venir</p>
      <h3 class="pf-card-title">D’autres projets arrivent</h3>
      <p class="pf-card-desc">Ce portfolio sera mis à jour au fil de ma formation.</p>
    </article>`;

  /* Contacts */
  const contacts = [
    { label: "GitHub", href: PROFILE.github, value: pretty(PROFILE.github) },
    { label: "LinkedIn", href: PROFILE.linkedin, value: pretty(PROFILE.linkedin) },
    { label: "Mail", href: "mailto:" + PROFILE.email, value: PROFILE.email },
  ];
  $("#pf-contact").innerHTML = contacts.map((c, i) => `<li class="pf-reveal" style="--d:${i + 1}">
      <a class="pf-contact-row" href="${esc(c.href)}"${c.label === "Mail" ? "" : ' target="_blank" rel="noopener"'}>
        <span class="pf-contact-label">${c.label}</span>
        <span class="pf-contact-value">${esc(c.value)}</span>
        <span class="pf-arrow" aria-hidden="true">↗</span>
      </a></li>`).join("");

  /* Carrousel : boutons précédent / suivant, désactivés aux extrémités */
  const track = $("#pf-projects"), prevBtn = $("#pf-prev"), nextBtn = $("#pf-next");
  // Distance d'un pas : largeur d'une carte + l'espace entre deux cartes
  const step = () => track.querySelector(".pf-card").offsetWidth + (parseFloat(getComputedStyle(track).columnGap) || 0);
  // Fait défiler d'une carte vers la gauche (-1) ou la droite (1)
  const slide = (dir) => track.scrollBy({ left: dir * step(), behavior: reduce ? "auto" : "smooth" });
  // Grise le bouton quand on est au début ou à la fin
  const refreshNav = () => {
    prevBtn.disabled = track.scrollLeft <= 2;
    nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  };
  prevBtn.addEventListener("click", () => slide(-1));
  nextBtn.addEventListener("click", () => slide(1));
  // Floute et estompe les cartes à mesure qu'elles sortent de la zone de contenu (--out vaut 0 dedans, 1 dehors)
  const cards = [...track.querySelectorAll(".pf-card")];
  const paintFade = () => {
    const box = track.getBoundingClientRect(), cs = getComputedStyle(track);
    const left = box.left + parseFloat(cs.paddingLeft), right = box.right - parseFloat(cs.paddingRight);
    cards.forEach((card) => {
      const r = card.getBoundingClientRect();
      const inside = Math.max(0, Math.min(r.right, right) - Math.max(r.left, left)) / r.width;
      card.style.setProperty("--out", (1 - inside).toFixed(3));
    });
  };
  // Recalcule le flou une fois par image affichée pendant le défilement
  let queued = false;
  const onTrackScroll = () => {
    refreshNav();
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { paintFade(); queued = false; });
  };
  track.addEventListener("scroll", onTrackScroll, { passive: true });
  window.addEventListener("resize", onTrackScroll);
  refreshNav();
  paintFade();

  /* Apparition au défilement */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
  $$(".pf-reveal").forEach((el) => (reduce ? el.classList.add("is-visible") : io.observe(el)));

  /* Bordure de la barre de navigation */
  const nav = $("#pf-nav");
  const scroller = root.classList.contains("pf-frame") ? root : window;
  const onScroll = () => nav.classList.toggle("is-scrolled", (scroller.scrollY ?? scroller.scrollTop) > 8);
  scroller.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* Écriture dynamique */
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  async function type(key, text, speed) {
    const out = $(`[data-type="${key}"]`);
    if (reduce) { out.textContent = text; return; }
    for (let i = 1; i <= text.length; i++) {
      out.textContent = text.slice(0, i);
      await sleep(speed + Math.random() * speed * 0.6);
    }
  }
  (async () => {
    const caretName = $('[data-caret="name"]'), caretRole = $('[data-caret="role"]');
    await sleep(reduce ? 0 : 500);
    await type("name", PROFILE.name, 85);
    await sleep(reduce ? 0 : 450);
    caretName.hidden = true; caretRole.hidden = false;
    await type("role", PROFILE.role, 45);
    await sleep(reduce ? 0 : 250);
    $$("[data-after-type]").forEach((el) => el.classList.add("is-visible"));
  })();
})();

