/*
 * COMPONENT: hero-fullbleed
 * JS: Staggered entrance animation for hero headline, subheading, and CTA.
 *     Uses GSAP or falls back to CSS class toggling.
 * MOTION: headline at 0ms, subheading at 150ms, CTA at 300ms.
 * RESPECTS: prefers-reduced-motion — animation is skipped entirely.
 * DEPENDS: GSAP 3.12.5 (loaded via CDN with ScrollTrigger), or runs standalone.
 */

(function () {
  'use strict';

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function initHero() {
    const headline = document.querySelector('.hero__headline');
    const subheading = document.querySelector('.hero__subheading');
    const cta = document.querySelector('.hero__cta');

    if (!headline) return;

    // Skip animation if user prefers reduced motion
    if (motionQuery.matches) {
      [headline, subheading, cta].forEach(function (el) {
        if (el) {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      });
      return;
    }

    // Use GSAP if available, otherwise fall back to CSS transitions
    if (typeof gsap !== 'undefined') {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 0.8 } });

      tl.fromTo(headline, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0 }, 0)
        .fromTo(subheading, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0 }, 0.15)
        .fromTo(cta, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0 }, 0.3);
    } else {
      // Vanilla CSS fallback
      var elements = [
        { el: headline, delay: 0 },
        { el: subheading, delay: 150 },
        { el: cta, delay: 300 }
      ];

      elements.forEach(function (item) {
        if (!item.el) return;
        item.el.style.transition =
          'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(function () {
          item.el.style.opacity = '1';
          item.el.style.transform = 'translateY(0)';
        }, item.delay);
      });
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHero);
  } else {
    initHero();
  }

  // Re-check on motion preference change
  motionQuery.addEventListener('change', function () {
    initHero();
  });
})();
