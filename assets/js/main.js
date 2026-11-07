document.addEventListener("DOMContentLoaded", function () {
  var burger = document.querySelector(".mfo-burger");
  var links = document.querySelector(".mfo-links");
  if (burger && links) {
    burger.addEventListener("click", function () {
      links.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", links.classList.contains("is-open") ? "true" : "false");
    });
  }
  document.querySelectorAll(".mfo-faqit").forEach(function (item) {
    var q = item.querySelector(".mfo-faqq");
    if (!q) return;
    q.addEventListener("click", function () {
      var open = item.classList.contains("is-open");
      document.querySelectorAll(".mfo-faqit.is-open").forEach(function (o) {
        if (o !== item) o.classList.remove("is-open");
      });
      item.classList.toggle("is-open", !open);
    });
  });
  document.querySelectorAll(".mfo-year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
});
