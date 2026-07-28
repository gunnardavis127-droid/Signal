/*
 * COMPONENT: list-column
 * JS: Scroll-triggered staggered reveal for list items.
 *     Each item reveals at 100ms stagger. Uses GSAP ScrollTrigger.
 * RESPECTS: prefers-reduced-motion — animation is skipped entirely.
 * DEPENDS: GSAP 3.12.5 + ScrollTrigger (CDN), or standalone fallback.
 */

(function () {
  'use strict';

  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function revealList(list) {
    var items = list.querySelectorAll('.list-item');

    if (!items.length) return;

    if (motionQuery.matches) {
      items.forEach(function (item) {
        item.style.opacity = '1';
        item.style.transform = 'none';
      });
      return;
    }

    // GSAP ScrollTrigger path
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: list,
            start: 'top 78%',
            toggleActions: 'play none none none'
          }
        }
      );
    } else {
      // Vanilla IntersectionObserver fallback
      if (!('IntersectionObserver' in window)) {
        items.forEach(function (item) {
          item.style.opacity = '1';
          item.style.transform = 'none';
        });
        return;
      }

      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);

            items.forEach(function (item, i) {
              item.style.transition =
                'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
              setTimeout(function () {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
              }, i * 100);
            });
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(list);
    }
  }

  function initLists() {
    var lists = document.querySelectorAll('.list-column');
    lists.forEach(revealList);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLists);
  } else {
    initLists();
  }

  motionQuery.addEventListener('change', initLists);
})();
