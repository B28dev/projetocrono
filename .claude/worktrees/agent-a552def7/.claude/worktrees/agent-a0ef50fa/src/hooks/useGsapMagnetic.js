import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useGsapMagnetic(selector = '[data-magnetic]', options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const targets = Array.from(root.querySelectorAll(selector));
    if (!targets.length) return;

    const strength = options.strength ?? 16;
    const scale = options.scale ?? 1.02;
    const cleanups = [];

    targets.forEach((target) => {
      const handleMove = (event) => {
        if (!document.querySelector('.theme-cyberpunk')) return;

        const rect = target.getBoundingClientRect();
        const offsetX = event.clientX - (rect.left + rect.width / 2);
        const offsetY = event.clientY - (rect.top + rect.height / 2);

        gsap.to(target, {
          x: (offsetX / rect.width) * strength,
          y: (offsetY / rect.height) * strength,
          scale,
          duration: 0.35,
          ease: 'power3.out',
          overwrite: true,
        });
      };

      const handleLeave = () => {
        gsap.to(target, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: 'elastic.out(1, 0.5)',
          overwrite: true,
        });
      };

      target.addEventListener('mousemove', handleMove);
      target.addEventListener('mouseleave', handleLeave);
      cleanups.push(() => {
        target.removeEventListener('mousemove', handleMove);
        target.removeEventListener('mouseleave', handleLeave);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [selector, options.scale, options.strength]);

  return ref;
}
