const links = Array.from(document.querySelectorAll('.bottom-nav a'));
const sections = [];
const home = document.getElementById('home');
if (home) sections.push(home);
document.querySelectorAll('section.section').forEach((s) => sections.push(s));
const linkById = new Map(
  links.map((a) => [a.getAttribute('href').replace('#', ''), a])
);
const setActive = (id) => {
  links.forEach((a) => a.classList.remove('active'));
  const l = linkById.get(id);
  if (l) l.classList.add('active');
};
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      const id = e.target.id || (e.target === home ? 'home' : null);
      if (!id) return;
      if (e.isIntersecting) setActive(id);
    });
  },
  { root: null, threshold: 0.2, rootMargin: '-30% 0px -50% 0px' }
);
sections.forEach((s) => obs.observe(s));
setActive('home');
