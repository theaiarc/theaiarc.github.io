/* Free App Solutions — store interactions: search/filter, featured carousel, shelf controls.
   Vanilla JS, dependency-free, progressive-enhancement (page works without it). */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------- Search + pill filtering */
  function initFilter() {
    var search = document.querySelector("[data-store-search]");
    var pills = Array.prototype.slice.call(document.querySelectorAll(".cat-pill"));
    var containers = Array.prototype.slice.call(document.querySelectorAll("[data-store-filterable]"));
    if (!containers.length) return;

    var cards = [];
    containers.forEach(function (c) {
      cards = cards.concat(Array.prototype.slice.call(c.querySelectorAll("[data-type]")));
    });
    if (!cards.length) return;

    var emptyMsg = document.querySelector(".store-empty");
    var activeFilter = "all";

    function matchesFilter(card) {
      if (activeFilter === "all") return true;
      var parts = activeFilter.split(":");
      var key = parts[0], val = parts.slice(1).join(":");
      if (key === "type") return card.getAttribute("data-type") === val;
      if (key === "category") return (card.getAttribute("data-category") || "") === val;
      if (key === "status") return (card.getAttribute("data-status") || "") === val;
      return true;
    }

    function matchesQuery(card, q) {
      if (!q) return true;
      var hay = (card.getAttribute("data-name") || "") + " " +
                (card.getAttribute("data-tags") || "") + " " +
                (card.getAttribute("data-category") || "");
      return hay.indexOf(q) !== -1;
    }

    function apply(force) {
      var q = search ? search.value.trim().toLowerCase() : "";
      var visible = 0;
      cards.forEach(function (card) {
        var show = matchesFilter(card) && matchesQuery(card, q);
        card.hidden = !show;
        // A card revealed by filtering may never have scrolled into view, so the
        // .reveal entrance rule would keep it at opacity:0 — force it visible.
        if (show && force) card.classList.add("in-view");
        if (show) visible++;
      });
      // Hide a shelf/section whose every card is filtered out.
      containers.forEach(function (c) {
        var any = c.querySelector("[data-type]:not([hidden])");
        var section = c.closest("[data-store-section]") || c;
        if (section !== c || c.hasAttribute("data-store-section")) {
          section.hidden = !any;
        }
      });
      if (emptyMsg) emptyMsg.hidden = visible !== 0;
    }

    if (search) {
      search.addEventListener("input", function () { apply(true); });
      // Don't let Enter submit/refresh if ever wrapped in a form.
      search.addEventListener("keydown", function (e) {
        if (e.key === "Enter") e.preventDefault();
      });
    }

    pills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        pills.forEach(function (p) {
          p.classList.remove("is-active");
          p.setAttribute("aria-selected", "false");
        });
        pill.classList.add("is-active");
        pill.setAttribute("aria-selected", "true");
        activeFilter = pill.getAttribute("data-filter") || "all";
        apply(true);
      });
    });

    apply(false);
  }

  /* ------------------------------------------------------------------------ Featured carousel */
  function initCarousel() {
    var root = document.querySelector("[data-carousel]");
    if (!root) return;
    var slides = Array.prototype.slice.call(root.querySelectorAll(".featured-slide"));
    if (slides.length < 2) return; // nothing to rotate

    var dotsWrap = root.querySelector("[data-carousel-dots]");
    var current = 0;
    var timer = null;
    var DELAY = 5000;

    var dots = slides.map(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "featured-dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      dot.addEventListener("click", function () { go(i); restart(); });
      if (dotsWrap) dotsWrap.appendChild(dot);
      return dot;
    });

    function go(n) {
      slides[current].classList.remove("is-active");
      if (dots[current]) dots[current].classList.remove("is-active");
      current = (n + slides.length) % slides.length;
      slides[current].classList.add("is-active");
      if (dots[current]) dots[current].classList.add("is-active");
    }

    function next() { go(current + 1); }

    function start() {
      if (reduceMotion || timer) return;
      timer = window.setInterval(next, DELAY);
    }
    function stop() {
      if (timer) { window.clearInterval(timer); timer = null; }
    }
    function restart() { stop(); start(); }

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);

    start();
  }

  /* ----------------------------------------------------------------- Shelf prev/next buttons */
  function initShelves() {
    var shelves = Array.prototype.slice.call(document.querySelectorAll(".shelf"));
    shelves.forEach(function (shelf) {
      var track = shelf.querySelector(".shelf-track");
      var prev = shelf.querySelector(".shelf-btn-prev");
      var next = shelf.querySelector(".shelf-btn-next");
      if (!track) return;

      function step() {
        var card = track.querySelector(":scope > *");
        return card ? card.getBoundingClientRect().width + 16 : track.clientWidth * 0.8;
      }
      function scrollByStep(dir) {
        track.scrollBy({ left: dir * step(), behavior: reduceMotion ? "auto" : "smooth" });
      }
      if (prev) prev.addEventListener("click", function () { scrollByStep(-1); });
      if (next) next.addEventListener("click", function () { scrollByStep(1); });

      function updateBtns() {
        var max = track.scrollWidth - track.clientWidth - 1;
        if (prev) prev.disabled = track.scrollLeft <= 0;
        if (next) next.disabled = track.scrollLeft >= max;
      }
      track.addEventListener("scroll", updateBtns, { passive: true });
      window.addEventListener("resize", updateBtns);
      updateBtns();
    });
  }

  function init() {
    initFilter();
    initCarousel();
    initShelves();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
