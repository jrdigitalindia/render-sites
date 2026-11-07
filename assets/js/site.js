document.addEventListener('DOMContentLoaded', function () {
  var burger = document.querySelector('.ns-burger');
  var mobileNav = document.querySelector('.ns-mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      mobileNav.classList.toggle('is-open');
      var expanded = mobileNav.classList.contains('is-open');
      burger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('is-open');
      });
    });
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth > 999 && mobileNav) {
      mobileNav.classList.remove('is-open');
    }
  });

  var faqItems = document.querySelectorAll('.ns-faq-item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });
});
