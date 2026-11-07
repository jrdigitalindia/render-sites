document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var burger = document.querySelector('.opx-burger');
  var mobileNav = document.querySelector('.opx-mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      mobileNav.classList.toggle('opx-open');
      var expanded = mobileNav.classList.contains('opx-open');
      burger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  // FAQ accordion
  document.querySelectorAll('.opx-faq-item').forEach(function (item) {
    var q = item.querySelector('.opx-faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('opx-open');
      document.querySelectorAll('.opx-faq-item.opx-open').forEach(function (el) {
        if (el !== item) el.classList.remove('opx-open');
      });
      item.classList.toggle('opx-open', !wasOpen);
    });
  });

  // Sticky order bar: hide once footer / final CTA is in view
  var sticky = document.querySelector('.opx-sticky-order');
  var footer = document.querySelector('.opx-footer');
  if (sticky && footer && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        sticky.style.display = entry.isIntersecting ? 'none' : '';
      });
    }, { rootMargin: '0px 0px -40% 0px' });
    io.observe(footer);
  }

  // Close mobile nav on link click
  document.querySelectorAll('.opx-mobile-nav a').forEach(function (a) {
    a.addEventListener('click', function () {
      mobileNav.classList.remove('opx-open');
    });
  });
});
