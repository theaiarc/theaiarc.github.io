(function () {
    "use strict";
    var root = document.documentElement;

    document.addEventListener("DOMContentLoaded", function () {
        initThemeToggle();
        initNav();
        initToTop();
        initReveal();
    });

    function setThemeIcon(btn) {
        var icon = btn.querySelector("i");
        if (!icon) return;
        icon.className = root.classList.contains("dark-mode") ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }

    function initThemeToggle() {
        var btn = document.getElementById("themeToggle");
        if (!btn) return;
        setThemeIcon(btn);
        btn.addEventListener("click", function () {
            var isDark = root.classList.toggle("dark-mode");
            try { localStorage.setItem("theme", isDark ? "dark" : "light"); } catch (e) { }
            setThemeIcon(btn);
        });
    }

    function initNav() {
        var toggle = document.getElementById("navToggle");
        var links = document.getElementById("navLinks");
        var header = document.getElementById("siteHeader");
        if (toggle && links) {
            toggle.addEventListener("click", function () {
                var open = links.classList.toggle("open");
                toggle.classList.toggle("open", open);
                toggle.setAttribute("aria-expanded", open ? "true" : "false");
            });
            links.addEventListener("click", function (e) {
                if (e.target.closest("a")) { links.classList.remove("open"); toggle.classList.remove("open"); }
            });
        }
        if (header) {
            var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
            onScroll();
            window.addEventListener("scroll", onScroll, { passive: true });
        }
    }

    function initToTop() {
        var btn = document.getElementById("toTop");
        if (!btn) return;
        var onScroll = function () { btn.classList.toggle("show", window.scrollY > 600); };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    }

    function fillBars(scope) {
        var bars = scope.querySelectorAll(".progress-bar[data-level]");
        for (var i = 0; i < bars.length; i++) bars[i].style.width = bars[i].getAttribute("data-level") + "%";
    }

    function initReveal() {
        var reveals = document.querySelectorAll(".reveal");
        if (!("IntersectionObserver" in window)) {
            reveals.forEach(function (el) { el.classList.add("in-view"); });
            fillBars(document);
            return;
        }
        var io = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("in-view");
                fillBars(entry.target);
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
        reveals.forEach(function (el) { io.observe(el); });
    }

    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
            navigator.serviceWorker.register("/sw.js").catch(function () { });
        });
    }
})();
