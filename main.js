/* MemoHoney — main.js
   Vanilla JS only. No dependencies. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------------------
     Sticky header
     ---------------------------------------------------------------------- */
  var header = document.querySelector('.site-header');
  if (header && !header.classList.contains('always-solid')) {
    var stuck = false;
    var onScroll = function () {
      var should = window.scrollY > 24;
      if (should !== stuck) {
        stuck = should;
        header.classList.toggle('is-stuck', stuck);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ----------------------------------------------------------------------
     Mobile navigation
     ---------------------------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  if (toggle && nav) {
    var closeNav = function (focusToggle) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      if (focusToggle) { toggle.focus(); }
    };

    var openNav = function () {
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    };

    toggle.addEventListener('click', function () {
      if (toggle.getAttribute('aria-expanded') === 'true') { closeNav(false); }
      else { openNav(); }
    });

    // Escape closes and returns focus
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeNav(true);
      }
    });

    // Keep tab focus inside the open menu
    nav.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || toggle.getAttribute('aria-expanded') !== 'true') { return; }
      var focusable = nav.querySelectorAll('a[href], button:not([disabled])');
      if (!focusable.length) { return; }
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); toggle.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); toggle.focus();
      }
    });

    // Click outside closes
    document.addEventListener('click', function (e) {
      if (toggle.getAttribute('aria-expanded') !== 'true') { return; }
      if (!nav.contains(e.target) && !toggle.contains(e.target)) { closeNav(false); }
    });

    // Reset when resizing back to desktop
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (window.innerWidth > 900) { closeNav(false); }
      }, 140);
    });
  }

  /* ----------------------------------------------------------------------
     FAQ accordion — one open at a time per list, keyboard navigable
     ---------------------------------------------------------------------- */
  var faqLists = document.querySelectorAll('.qa');

  Array.prototype.forEach.call(faqLists, function (list) {
    var buttons = list.querySelectorAll('.faq-q');

    var setOpen = function (btn, open) {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) { return; }
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        panel.style.height = panel.scrollHeight + 'px';
        if (reduceMotion) { panel.style.height = 'auto'; }
      } else {
        // From auto to a fixed height first, so the transition has somewhere to go
        panel.style.height = panel.scrollHeight + 'px';
        void panel.offsetHeight;
        panel.style.height = '0px';
      }
    };

    Array.prototype.forEach.call(buttons, function (btn, i) {
      btn.addEventListener('click', function () {
        var isOpen = btn.getAttribute('aria-expanded') === 'true';
        Array.prototype.forEach.call(buttons, function (other) {
          if (other !== btn && other.getAttribute('aria-expanded') === 'true') {
            setOpen(other, false);
          }
        });
        setOpen(btn, !isOpen);
      });

      btn.addEventListener('keydown', function (e) {
        var target = null;
        if (e.key === 'ArrowDown') { target = buttons[(i + 1) % buttons.length]; }
        else if (e.key === 'ArrowUp') { target = buttons[(i - 1 + buttons.length) % buttons.length]; }
        else if (e.key === 'Home') { target = buttons[0]; }
        else if (e.key === 'End') { target = buttons[buttons.length - 1]; }
        if (target) { e.preventDefault(); target.focus(); }
      });
    });

    // Recalculate open panels after a resize reflows the text
    var faqTimer;
    window.addEventListener('resize', function () {
      clearTimeout(faqTimer);
      faqTimer = setTimeout(function () {
        Array.prototype.forEach.call(buttons, function (btn) {
          if (btn.getAttribute('aria-expanded') === 'true') {
            var panel = document.getElementById(btn.getAttribute('aria-controls'));
            if (panel) { panel.style.height = panel.scrollHeight + 'px'; }
          }
        });
      }, 160);
    });
  });

  /* ----------------------------------------------------------------------
     Smooth in-page scrolling with header offset
     ---------------------------------------------------------------------- */
  document.addEventListener('click', function (e) {
    var link = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!link) { return; }
    var id = link.getAttribute('href');
    if (!id || id === '#') { return; }
    var target = document.querySelector(id);
    if (!target) { return; }
    e.preventDefault();
    var offset = header ? header.offsetHeight + 16 : 16;
    var top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });

  /* ----------------------------------------------------------------------
     Reveal on scroll
     ---------------------------------------------------------------------- */
  var revealables = document.querySelectorAll('.reveal');
  if (revealables.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
      Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
    }
  }

  /* ----------------------------------------------------------------------
     Footer year
     ---------------------------------------------------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
