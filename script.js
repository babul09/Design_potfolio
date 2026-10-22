(function () {
  const config = window.PORTFOLIO_CONFIG || {};
  const name = config.name || "Babul Bishwas";
  document.querySelectorAll(".wordmark").forEach(el => {
    el.innerHTML = '<span class="mark">●</span> ' + escapeHtml(name) + (el.textContent.includes("PORTFOLIO") ? ' <span class="slash">/</span> PORTFOLIO' : "");
  });
  document.querySelectorAll(".footer .wordmark").forEach(el => {
    el.innerHTML = '<span class="mark">●</span> ' + escapeHtml(name);
  });
  const email = document.getElementById("email-link");
  const github = document.getElementById("github-link");
  if (email && config.email) email.href = "mailto:" + config.email;
  if (github && config.github) github.href = config.github;
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".topbar nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "×" : "☰";
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    }));
  }

  // Reveal sections gently when they enter the viewport.
  const revealTargets = document.querySelectorAll(".project, .principle, .notes-grid details, .about-layout");
  if ("IntersectionObserver" in window) {
    revealTargets.forEach(el => el.classList.add("reveal"));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealTargets.forEach(el => observer.observe(el));
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, ch => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[ch]);
  }
})();
