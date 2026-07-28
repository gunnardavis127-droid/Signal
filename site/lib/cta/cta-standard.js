/*
 * COMPONENT: cta-standard
 * JS: Scroll-triggered fade-in for the full CTA band section.
 *     Uses GSAP ScrollTrigger. Respects prefers-reduced-motion.
 * DEPENDS: GSAP 3.12.5 + ScrollTrigger (CDN), or standalone fallback.
 */

(function () {
  'use strict';

  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function revealCTA(band) {
    if (motionQuery.matches) {
      band.style.opacity = '1';
      return;
    }

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.fromTo(
        band,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: band,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    } else {
      // Vanilla IntersectionObserver fallback
      if (!('IntersectionObserver' in window)) {
        band.style.opacity = '1';
        return;
      }

      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);
            band.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            band.style.opacity = '1';
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(band);
    }
  }

  function initCTAs() {
    var bands = document.querySelectorAll('.cta-band');
    bands.forEach(revealCTA);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCTAs);
  } else {
    initCTAs();
  }

  motionQuery.addEventListener('change', initCTAs);
})();
