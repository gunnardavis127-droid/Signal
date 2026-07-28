/*
 * COMPONENT: card-grid
 * JS: Scroll-triggered staggered reveal for card grids.
 *     Cards reveal one at a time: card 1 at 0ms, card 2 at 100ms,
 *     card 3 at 200ms, etc. Uses GSAP ScrollTrigger.
 * RESPECTS: prefers-reduced-motion — animation is skipped entirely.
 * DEPENDS: GSAP 3.12.5 + ScrollTrigger (CDN), or standalone fallback.
 */

(function () {
  'use strict';

  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function revealGrid(grid) {
    var cards = grid.querySelectorAll('.card');

    if (!cards.length) return;

    if (motionQuery.matches) {
      cards.forEach(function (card) {
        card.style.opacity = '1';
        card.style.transform = 'none';
      });
      return;
    }

    // GSAP ScrollTrigger path
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
    } else {
      // Vanilla IntersectionObserver fallback
      if (!('IntersectionObserver' in window)) {
        cards.forEach(function (card) {
          card.style.opacity = '1';
          card.style.transform = 'none';
        });
        return;
      }

      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);

            cards.forEach(function (card, i) {
              card.style.transition =
                'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
              setTimeout(function () {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, i * 100);
            });
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(grid);
    }
  }

  function initCards() {
    var grids = document.querySelectorAll('.card-grid');
    grids.forEach(revealGrid);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCards);
  } else {
    initCards();
  }

  motionQuery.addEventListener('change', initCards);
})();
