// breatheus.onrender.com site script
document.addEventListener('DOMContentLoaded', function () {

  var burger = document.querySelector('.br-burger');
  var nav = document.querySelector('.br-nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('br-open');
      var expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('br-open'); });
    });
  }

  document.querySelectorAll('.br-faq-item').forEach(function (item) {
    var q = item.querySelector('.br-faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var isActive = item.classList.contains('br-active');
      item.closest('.br-faq').querySelectorAll('.br-faq-item').forEach(function (i) {
        i.classList.remove('br-active');
      });
      if (!isActive) item.classList.add('br-active');
    });
  });

  var yearEl = document.getElementById('br-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
