const corvexInit = () => {
  const yr = new Date().getFullYear();
  document.querySelectorAll('.cv-yr').forEach(el => el.textContent = yr);

  document.querySelectorAll('.cv-fq').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      const wasOpen = panel.classList.contains('cv-open');
      document.querySelectorAll('.cv-fa').forEach(p => p.classList.remove('cv-open'));
      document.querySelectorAll('.cv-fq').forEach(b => b.setAttribute('aria-expanded', 'false'));
      if (!wasOpen) {
        panel.classList.add('cv-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
};
document.addEventListener('DOMContentLoaded', corvexInit);
