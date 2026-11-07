// ===== Mind Vault (mindvaultus.onrender.com) — lightweight shared site behavior =====
document.addEventListener('DOMContentLoaded', function () {

  // FAQ accordion — one open at a time
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (el) {
        el.classList.remove('open');
        el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Back to top
  var backBtn = document.querySelector('.back-to-top');
  if (backBtn) {
    window.addEventListener('scroll', function () {
      backBtn.classList.toggle('show', window.scrollY > 800);
    });
    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Exit-intent popup with 14:59 countdown (session-limited, unique key for this domain)
  var popup = document.getElementById('exitPopup');
  if (popup) {
    var shownKey = 'mv2_exit_popup_shown';
    var timerEl = document.getElementById('popupTimer');
    var seconds = 14 * 60 + 59;

    function tick() {
      if (!popup.classList.contains('active')) return;
      var m = Math.floor(seconds / 60);
      var s = seconds % 60;
      if (timerEl) timerEl.textContent = m + ':' + (s < 10 ? '0' + s : s);
      if (seconds > 0) { seconds--; setTimeout(tick, 1000); }
    }

    function showPopup() {
      if (sessionStorage.getItem(shownKey)) return;
      popup.classList.add('active');
      sessionStorage.setItem(shownKey, '1');
      tick();
    }

    document.addEventListener('mouseout', function (e) {
      if (!e.relatedTarget && e.clientY < 10) showPopup();
    });

    var closeBtn = popup.querySelector('.popup-close');
    if (closeBtn) closeBtn.addEventListener('click', function () {
      popup.classList.remove('active');
    });
    popup.addEventListener('click', function (e) {
      if (e.target === popup) popup.classList.remove('active');
    });
  }

  // Reading progress bar (blog posts)
  var progress = document.querySelector('.reading-progress-bar');
  if (progress) {
    window.addEventListener('scroll', function () {
      var h = document.documentElement;
      var scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      progress.style.width = scrolled + '%';
    });
  }

  // Sticky nav shadow on scroll
  var nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // Mobile menu toggle
  var toggle = document.querySelector('.nav-toggle');
  var mobileMenu = document.querySelector('.mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
      var expanded = mobileMenu.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
  }
});
