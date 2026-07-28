/*
 * COMPONENT: footer-standard
 * JS: Subtle scroll-triggered fade-in for the footer section. Restrained
 *     animation — the footer is informational, not dramatic.
 *     Also sets the copyright year dynamically.
 * RESPECTS: prefers-reduced-motion — animation is skipped entirely.
 * DEPENDS: GSAP 3.12.5 + ScrollTrigger (CDN), or standalone fallback.
 */

(function () {
  'use strict';

  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function revealFooter(footer) {
    if (motionQuery.matches) {
      footer.style.opacity = '1';
      footer.style.transform = 'none';
      return;
    }

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.fromTo(
        footer,
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 95%',
            toggleActions: 'play none none none'
          }
        }
      );
    } else {
      // Vanilla IntersectionObserver fallback
      if (!('IntersectionObserver' in window)) {
        footer.style.opacity = '1';
        footer.style.transform = 'none';
        return;
      }

      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);
            footer.style.transition =
              'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            footer.style.opacity = '1';
            footer.style.transform = 'translateY(0)';
          });
        },
        { threshold: 0.05 }
      );

      observer.observe(footer);
    }
  }

  function setCopyrightYear() {
    var yearEl = document.getElementById('footer-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  function initFooters() {
    var footers = document.querySelectorAll('.site-footer');
    footers.forEach(revealFooter);
    setCopyrightYear();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooters);
  } else {
    initFooters();
  }

  motionQuery.addEventListener('change', function () {
    var footers = document.querySelectorAll('.site-footer');
    footers.forEach(function (f) {
      f.style.opacity = '1';
      f.style.transform = 'none';
    });
  });
})();
