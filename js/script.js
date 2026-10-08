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
  { title: "Le Bras", description: "Un agent opérationnel qui transforme une intention en actions, tout en laissant le contrôle final à l’humain.", stack: ["Python", "FastAPI", "PostgreSQL", "Docker", "HTML", "CSS", "JS", "Claude"], url: "", landing: "projets/le-bras.html", repo: "https://github.com/nohamoulma-hub/Holberton-school-Hackathon-Le_Bras", image: "img/le-bras.jpg", theme: "ink", note: "Projet d’équipe, hackathon" },
  { title: "Le Sosie", note: "Projet d’équipe, hackathon", description: "Vérification de calculs de dépenses : Python et SQL calculent chacun de leur côté, le serveur compare les deux résultats et l’interface les affiche une fois vérifiés.", stack: ["Python", "Flask", "SQLite", "HTML", "CSS", "JS", "Claude"], url: "", landing: "projets/le-sosie.html", repo: "https://github.com/John-Natty/Holberton-school-Hackathon-le-Sosie/tree/main", image: "img/le-sosie.jpg", theme: "sand" },
  { title: "HBntory Inventor Management", note: "Projet d’équipe", description: "Projet de fin de second trimestre : gestion des stocks d’une entreprise de 3 filiales en France, avec un agent IA qui traite les requêtes grâce aux outils à sa disposition.", stack: ["Python", "SQLite", "SQLAlchemy", "HTML", "CSS", "JS", "REST API"], url: "", landing: "projets/hbntory.html", repo: "https://github.com/Souf-F/HBntory-Inventor-Management-Platform", image: "img/hbntory.jpg", theme: "ink" },
  { title: "Voyager en Martinique", note: "Projet individuel", description: "Un agent IA qui crée un voyage sur mesure en Martinique selon le budget, la durée, les goûts et la météo estimée selon la saison.", stack: ["Python", "PostgreSQL", "HTML", "CSS", "JS", "Claude"], url: "", landing: "projets/martinique.html", repo: "https://github.com/nohamoulma-hub/Projet-Martinique", image: "img/martinique.jpg", theme: "sand" },
];
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
    const cta = p.landing ? "Voir la page du projet" : p.url ? "Voir le projet" : "Voir sur GitHub";
    const thumb = p.image
      ? `<img src="${esc(p.image)}" alt="Capture d’écran de ${esc(p.title)}" loading="lazy">`
      : `<div class="pf-thumb-art"><span class="pf-thumb-num">${n}</span><span class="pf-thumb-stack">${esc((p.stack || [])[0] || "")}</span></div>`;
    return `<article class="pf-card pf-reveal" style="--d:${i % 3}">
      <div class="pf-thumb pf-thumb--${esc(p.theme || "ink")}${p.image ? " pf-thumb--shot" : ""}">${thumb}</div>
      <div class="pf-card-body">
        <h3 class="pf-card-title"><a class="pf-card-link" href="${esc(href)}"${blank}>${esc(p.title)}</a></h3>
        ${p.note ? `<p class="pf-card-note">${esc(p.note)}</p>` : ""}
        <p class="pf-card-desc">${esc(p.description)}</p>
        <ul class="pf-tags">${(p.stack || []).map((t) => `<li class="pf-tag">${esc(t)}</li>`).join("")}</ul>
        <div class="pf-card-foot">
          <span class="pf-card-cta">${cta} <span class="pf-arrow" aria-hidden="true">${p.landing ? "→" : "↗"}</span></span>
          ${(p.landing || p.url) && p.repo ?`<a class="pf-card-code" href="${esc(p.repo)}" target="_blank" rel="noopener">Code source</a>` : ""}
        </div>
      </div>
    </article>`;
  }).join("") + `<article class="pf-card pf-card--more pf-reveal" style="--d:${PROJECTS.length % 3}">
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

