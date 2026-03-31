import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Attaches a GSAP ScrollTrigger reveal animation to a ref.
 * Respects prefers-reduced-motion by falling back to a simple fade.
 */
export function useGsapReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clearAnimatedProps = () => {
      gsap.set(el, { clearProps: 'opacity,transform,filter' });
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: prefersReduced ? 0 : 30,
          filter: prefersReduced ? 'none' : 'blur(8px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: prefersReduced ? 0.3 : 0.8,
          ease: 'power3.out',
          immediateRender: false,
          clearProps: 'opacity,transform,filter',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
            ...options,
          },
        }
      );
    });

    // Recalcula posições do ScrollTrigger após navegação SPA
    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
      clearAnimatedProps();
    };
  }, []);

  return ref;
}

/**
 * Staggers multiple child elements inside a container ref.
 * Pass a CSS selector for `childSelector` to target specific children.
 */
export function useGsapStagger(childSelector = '*', options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const children = el.querySelectorAll(childSelector);
    if (!children.length) return;
    const { blur = false, scrollStart = 'top 88%', ...animationOptions } = options;
    const clearAnimatedProps = () => {
      gsap.set(children, { clearProps: 'opacity,transform,filter' });
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        {
          opacity: 0,
          y: prefersReduced ? 0 : 24,
          filter: prefersReduced || !blur ? 'none' : 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: prefersReduced ? 0.2 : 0.6,
          ease: 'power3.out',
          stagger: prefersReduced ? 0 : 0.1,
          immediateRender: false,
          clearProps: 'opacity,transform,filter',
          scrollTrigger: {
            trigger: el,
            start: scrollStart,
            once: true,
          },
          ...animationOptions,
          onComplete: () => gsap.set(children, { clearProps: 'opacity,transform,filter' }),
        }
      );
    });

    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
      clearAnimatedProps();
    };
  }, [childSelector]);

  return ref;
}
