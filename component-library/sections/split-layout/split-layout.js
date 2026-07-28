/*
 * COMPONENT: split-layout
 * JS: Scroll-triggered staggered reveal for split sections.
 *     Text side reveals first (tag→headline→body→CTA),
 *     visual side fades in at 200ms.
 *     Uses GSAP ScrollTrigger. Falls back to IntersectionObserver.
 * RESPECTS: prefers-reduced-motion — animation is skipped entirely.
 * DEPENDS: GSAP 3.12.5 + ScrollTrigger (CDN), or standalone.
 */

(function () {
  'use strict';

  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function revealSplit(section) {
    var textChildren = section.querySelectorAll(
      '.split__tag, .split__headline, .split__body, .split__cta'
    );
    var visual = section.querySelector('.split__visual');

    // Unhide immediately if reduced motion is preferred
    if (motionQuery.matches) {
      textChildren.forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      if (visual) {
        visual.style.opacity = '1';
        visual.style.transform = 'none';
      }
      return;
    }

    // GSAP ScrollTrigger path
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        defaults: { ease: 'expo.out', duration: 0.7 }
      });

      tl.fromTo(textChildren, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, stagger: 0.1 }, 0)
        .fromTo(visual, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0 }, 0.2);
    } else {
      // Vanilla IntersectionObserver fallback
      if (!('IntersectionObserver' in window)) {
        textChildren.forEach(function (el) {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
        if (visual) {
          visual.style.opacity = '1';
          visual.style.transform = 'none';
        }
        return;
      }

      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);

            textChildren.forEach(function (el, i) {
              el.style.transition =
                'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
              setTimeout(function () {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
              }, i * 100);
            });

            if (visual) {
              visual.style.transition =
                'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
              setTimeout(function () {
                visual.style.opacity = '1';
                visual.style.transform = 'translateY(0)';
              }, 200);
            }
          });
        },
        { threshold: 0.15 }
      );

      observer.observe(section);
    }
  }

  function initSplits() {
    var splits = document.querySelectorAll('.split');
    splits.forEach(revealSplit);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSplits);
  } else {
    initSplits();
  }

  motionQuery.addEventListener('change', initSplits);
})();
