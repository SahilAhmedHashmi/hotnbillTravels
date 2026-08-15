import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const heroParts = (scope) => {
  const hero = scope.querySelector('.hero');
  return {
    hero,
    media: hero?.querySelector('.hero-bg'),
    title: hero?.querySelector('.hero-title'),
    copy: hero?.querySelectorAll('.hero-kicker,.hero-desc,.hero-actions'),
  };
};

export function useDirectionMotion(direction) {
  const scope = useRef(null);
  useGSAP(() => {
    const root = scope.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      gsap.set(root.querySelectorAll('*'), { clearProps: 'transform,opacity,visibility,clipPath,filter' });
      return;
    }

    const mm = gsap.matchMedia();
    const { hero, media, title, copy } = heroParts(root);

    mm.add('(min-width: 901px)', () => {
      if (direction === 'cinematic') cinematicDesktop(root, { hero, media, title, copy });
      if (direction === 'editorial') editorialDesktop(root, { hero, media, title, copy });
      if (direction === 'earthy') earthyDesktop(root, { hero, media, title, copy });
      if (direction === 'minimal') minimalDesktop(root, { hero, media, title, copy });
      if (direction === 'photographic') photographicDesktop(root, { hero, media, title, copy });
    });
    mm.add('(max-width: 900px)', () => mobileMotion(direction, root, { hero, media, title, copy }));
    return () => mm.revert();
  }, { scope, dependencies: [direction], revertOnUpdate: true });
  return scope;
}

function cinematicDesktop(root, { hero, media, title, copy }) {
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .fromTo(media, { scale: 1.16, filter: 'brightness(.45) saturate(.6)' }, { scale: 1, filter: 'brightness(1) saturate(1)', duration: 2.2 })
    .from(title, { yPercent: 110, rotateX: -18, transformOrigin: 'bottom center', duration: 1.35, ease: 'power4.out' }, .2)
    .from(copy, { y: 30, stagger: .15, duration: .8 }, .7);
  gsap.to(media, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  gsap.from('.cine-overture h2', { yPercent: 35, skewY: 2, duration: 1.3, ease: 'power4.out', scrollTrigger: { trigger: '.cine-overture', start: 'top 68%' } });

  const scenes = gsap.utils.toArray('[data-cine-scene]', root);
  gsap.set(scenes, { autoAlpha: 0 });
  gsap.set(scenes[0], { autoAlpha: 1 });
  scenes.forEach((scene, index) => {
    const segment = 1 / scenes.length;
    const start = index * segment;
    const end = (index + 1) * segment;
    const image = scene.querySelector('img');
    const sceneCopy = scene.querySelector('.cine-scene__copy');
    ScrollTrigger.create({
      trigger: '.cine-scenes', start: `${start * 100}% top`, end: `${end * 100}% top`,
      onEnter: () => gsap.timeline().set(scene, { autoAlpha: 1 }).fromTo(image, { clipPath: 'inset(0 0 0 25%)', scale: 1.1 }, { clipPath: 'inset(0 0 0 0%)', scale: 1, duration: .95, ease: 'power3.inOut' }).from(sceneCopy.children, { y: 34, stagger: .08, duration: .55 }, .35),
      onEnterBack: () => gsap.set(scene, { autoAlpha: 1 }),
      onLeave: () => index < scenes.length - 1 && gsap.set(scene, { autoAlpha: 0 }),
      onLeaveBack: () => index > 0 && gsap.set(scene, { autoAlpha: 0 }),
    });
    gsap.to(image, { scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.cine-scenes', start: `${start * 100}% top`, end: `${end * 100}% top`, scrub: true } });
  });
  gsap.to('.cine-scenes__progress i', { scaleX: 4, ease: 'none', scrollTrigger: { trigger: '.cine-scenes', start: 'top top', end: 'bottom bottom', scrub: true } });
  gsap.fromTo('.cine-cut__still img', { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.cine-cut', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.utils.toArray('[data-cine-link]', root).forEach((row, index) => gsap.from(row, { x: index % 2 ? 28 : -28, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 86%' } }));
}

function editorialDesktop(root, { media, title, copy }) {
  gsap.timeline({ defaults: { ease: 'power3.inOut' } })
    .fromTo(media, { clipPath: 'inset(0 28% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.15 })
    .from(title, { x: -42, duration: .7, ease: 'power2.out' }, .2)
    .from(copy, { x: 12, stagger: .08, duration: .4 }, .5);
  gsap.from('.ed-lede h2', { letterSpacing: '.02em', x: -40, duration: .8, ease: 'power2.out', scrollTrigger: { trigger: '.ed-lede', start: 'top 72%' } });
  gsap.utils.toArray('.ed-plate__media', root).forEach((plate, index) => {
    gsap.fromTo(plate, { clipPath: index % 2 ? 'inset(0 0 100% 0)' : 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0% 0)', duration: .85, ease: 'power3.inOut', scrollTrigger: { trigger: plate, start: 'top 82%' } });
  });
  gsap.from('.ed-service__chapters>a', { borderColor: 'transparent', x: 20, stagger: .12, duration: .55, ease: 'power2.out', scrollTrigger: { trigger: '.ed-service__chapters', start: 'top 80%' } });
  gsap.utils.toArray('.ed-journeys>a', root).forEach((row) => gsap.from(row.querySelector('h3'), { x: -20, duration: .4, scrollTrigger: { trigger: row, start: 'top 90%' } }));
}

function earthyDesktop(root, { hero, media, title, copy }) {
  gsap.timeline({ defaults: { ease: 'sine.out' } }).from(media, { scale: 1.08, yPercent: -3, duration: 1.55 }).from(title, { y: 45, duration: .95 }, .2).from(copy, { y: 18, stagger: .13, duration: .7 }, .5);
  gsap.to(media, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .6 } });
  gsap.to('.earth-source__rings', { rotate: 18, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.earth-source', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.to('.earth-trail__line path', { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.earth-trail', start: 'top 65%', end: 'bottom 75%', scrub: true } });
  gsap.utils.toArray('[data-earth-stop]', root).forEach((stop, index) => {
    const image = stop.querySelector('img');
    const copyBlock = stop.querySelector('.earth-stop__copy');
    gsap.from(image, { yPercent: index % 2 ? 9 : -9, scale: 1.05, duration: 1.1, ease: 'sine.out', scrollTrigger: { trigger: stop, start: 'top 78%' } });
    gsap.from(copyBlock, { x: index % 2 ? -38 : 38, duration: .85, ease: 'sine.out', scrollTrigger: { trigger: stop, start: 'top 72%' } });
  });
  gsap.utils.toArray('.earth-field__rail a', root).forEach((card, index) => gsap.to(card, { y: index % 2 ? -28 : 18, ease: 'none', scrollTrigger: { trigger: '.earth-field', start: 'top bottom', end: 'bottom top', scrub: .7 } }));
}

function minimalDesktop(root, { media, title, copy }) {
  gsap.timeline({ defaults: { duration: .24, ease: 'power1.out' } }).from(title, { x: -12 }, .04).from(copy, { x: 4, stagger: .035 }, .1);
  gsap.from('.minifesto h2', { x: -14, duration: .32, scrollTrigger: { trigger: '.minifesto', start: 'top 78%' } });
  gsap.utils.toArray('[data-min-row]', root).forEach((row) => gsap.from(row, { x: -5, duration: .16, ease: 'none', scrollTrigger: { trigger: row, start: 'top 96%' } }));
  gsap.from('.min-binary>a', { scaleY: .985, stagger: .06, duration: .25, transformOrigin: 'top', scrollTrigger: { trigger: '.min-binary', start: 'top 90%' } });
}

function photographicDesktop(root, { hero, media, title, copy }) {
  gsap.timeline({ defaults: { ease: 'power3.inOut' } }).from(media, { clipPath: 'inset(7% 7% 7% 7%)', scale: 1.11, duration: 1.5 }).from(title, { yPercent: 80, duration: .9, ease: 'power3.out' }, .25).from(copy, { y: 15, stagger: .1, duration: .55 }, .65);
  gsap.to(media, { scale: 1.08, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  gsap.from('.ph-opening h2', { clipPath: 'inset(0 0 100% 0)', yPercent: 18, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.ph-opening', start: 'top 70%' } });
  gsap.utils.toArray('[data-photo-frame]', root).forEach((frame, index) => {
    const image = frame.querySelector('img');
    gsap.fromTo(frame, { clipPath: index % 2 ? 'inset(12% 0 12% 0)' : 'inset(0 12% 0 12%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power3.inOut', scrollTrigger: { trigger: frame, start: 'top 85%' } });
    gsap.fromTo(image, { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: .7 } });
  });
  gsap.to('.ph-sequence__sticky>img', { scale: 1.1, yPercent: 5, ease: 'none', scrollTrigger: { trigger: '.ph-sequence', start: 'top top', end: 'bottom bottom', scrub: true } });
  gsap.fromTo('.ph-choice__image', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', ease: 'power3.inOut', scrollTrigger: { trigger: '.ph-choice', start: 'top 85%', end: 'top 25%', scrub: true } });
}

function mobileMotion(direction, root, { media, title, copy }) {
  const ease = direction === 'earthy' ? 'sine.out' : direction === 'minimal' ? 'none' : 'power2.out';
  gsap.timeline().from(media, { scale: direction === 'minimal' ? 1 : 1.045, duration: .7, ease }).from(title, { y: direction === 'minimal' ? 0 : 20, duration: .45, ease }, .12).from(copy, { y: 6, stagger: .06, duration: .3 }, .25);
  const selector = direction === 'cinematic' ? '.cine-scene__copy' : direction === 'editorial' ? '.ed-plate' : direction === 'earthy' ? '.earth-stop' : direction === 'minimal' ? '[data-min-row]' : '[data-photo-frame]';
  gsap.utils.toArray(selector, root).forEach((item) => gsap.from(item, { y: direction === 'minimal' ? 0 : 18, duration: direction === 'minimal' ? .18 : .5, ease, scrollTrigger: { trigger: item, start: 'top 92%', once: true } }));
}
