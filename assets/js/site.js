document.addEventListener("DOMContentLoaded", function () {
  var burger = document.querySelector(".erp-burger");
  var nav = document.querySelector(".erp-nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      nav.classList.toggle("erp-open");
      var expanded = nav.classList.contains("erp-open");
      burger.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("erp-open");
      });
    });
  }

  var yearEls = document.querySelectorAll(".erp-year");
  var y = new Date().getFullYear();
  yearEls.forEach(function (el) {
    el.textContent = y;
  });
});
