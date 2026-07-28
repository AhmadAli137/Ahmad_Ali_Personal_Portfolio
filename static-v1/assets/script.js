// Scroll-reveal, animated counters, and hero typing effect

// Reveal sections as they scroll into view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Animated stat counters (elements with data-count)
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      counterObserver.unobserve(el);
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || "";
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll("[data-count]").forEach((el) => counterObserver.observe(el));

// Typing effect for the hero role line
const roleEl = document.getElementById("typed-roles");
if (roleEl) {
  const roles = [
    "Software Engineer",
    "Electrical Engineer",
    "Entrepreneur",
    "Robotics Educator",
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;

  const step = () => {
    const current = roles[roleIdx];
    if (!deleting) {
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(step, 1600);
        roleEl.textContent = current.slice(0, charIdx);
        return;
      }
    } else {
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    roleEl.textContent = current.slice(0, charIdx);
    setTimeout(step, deleting ? 40 : 75);
  };
  step();
}
