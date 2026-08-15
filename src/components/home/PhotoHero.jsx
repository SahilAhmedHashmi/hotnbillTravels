import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SCENE_DURATION = 6.4;

const scenes = [
  {
    slug: 'dawki',
    name: 'Dawki River',
    state: 'Meghalaya',
    desktop: '/destinations/dawki-hero-wide.webp',
    mobile: '/destinations/dawki-river.jpg',
    alt: 'A boat crossing the clear Dawki River in Meghalaya',
    lineOne: 'See the region.',
    lineTwo: 'Take the road.',
    note: 'Clear water, limestone country and a road that follows the southern hills.',
    focal: 'center 52%',
    layout: 'full',
  },
  {
    slug: 'kaziranga',
    name: 'Kaziranga',
    state: 'Assam',
    desktop: '/destinations/kaziranga-hero-v2.webp',
    mobile: '/Kaziranga National Park.jpg',
    alt: 'A one-horned rhinoceros in the grasslands of Kaziranga',
    lineOne: 'Grassland.',
    lineTwo: 'At first light.',
    note: 'Wildlife country reached with an early start and a local route through Assam.',
    focal: 'center center',
    layout: 'full',
  },
  {
    slug: 'tawang',
    name: 'Tawang',
    state: 'Arunachal Pradesh',
    desktop: '/destinations/tawang-hero-v2.webp',
    mobile: '/tawang valley.jpg',
    alt: 'An ornate gateway, prayer flags and a mountain lake on the road to Tawang',
    lineOne: 'Beyond the pass.',
    lineTwo: 'The high road.',
    note: 'Mountain light, prayer flags and a journey where every bend changes the view.',
    focal: 'center center',
    layout: 'full',
  },
  {
    slug: 'majuli',
    name: 'Majuli Island',
    state: 'Assam',
    desktop: '/destinations/majuli-hero-v2.webp',
    mobile: '/majuli island.jpg',
    alt: 'Majuli Island, its river, fields and wooden boats at sunset',
    lineOne: 'Life shaped.',
    lineTwo: 'By the river.',
    note: 'Ferries, fields and island roads held inside the wide reach of the Brahmaputra.',
    focal: 'center center',
    layout: 'full',
  },
  {
    slug: 'cherrapunji',
    name: 'Living Root Bridges',
    state: 'Meghalaya',
    desktop: '/destinations/root-bridge-hero-v2.webp',
    mobile: '/root_bridge.jpg',
    alt: 'A living root bridge crossing a forest stream in Meghalaya',
    lineOne: 'A path grown.',
    lineTwo: 'Through rain.',
    note: 'Forest trails, clear streams and living bridges shaped slowly across generations.',
    focal: 'center center',
    layout: 'full',
  },
];

const Arrow = () => <span className="photo-arrow" aria-hidden="true">↗</span>;

export default function PhotoHero() {
  const scope = useRef(null);
  const selectScene = useRef(() => {});
  const toggleMotion = useRef(() => {});
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    scenes.slice(1).forEach((scene) => {
      const image = new Image();
      image.src = window.innerWidth > 900 ? scene.desktop : scene.mobile;
    });
  }, []);

  useGSAP(() => {
    const root = scope.current;
    const sceneEls = gsap.utils.toArray('[data-photo-scene]', root);
    const rail = root.querySelector('.photo-hero__index');
    const railTrack = root.querySelector('.photo-hero__index-track');
    const progress = root.querySelector('.photo-hero__progress i');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 900px)').matches;
    let current = 0;
    let progressTween;
    let transition;
    let inView = true;
    let userPaused = false;

    gsap.set(sceneEls, { autoAlpha: 0, zIndex: 0 });
    gsap.set(sceneEls[0], { autoAlpha: 1, zIndex: 1 });

    const moveRail = (index, animate = true) => {
      const button = railTrack.children[index];
      if (!button) return;
      if (mobile) {
        rail.scrollTo({ left: Math.max(0, button.offsetLeft - 18), behavior: animate && !reduced ? 'smooth' : 'auto' });
        return;
      }
      const minimum = Math.min(0, rail.clientWidth - railTrack.scrollWidth);
      const target = gsap.utils.clamp(minimum, 0, rail.clientWidth * .15 - button.offsetLeft);
      gsap.to(railTrack, { x: target, duration: animate ? .8 : 0, ease: 'power3.inOut', overwrite: true });
    };

    const startClock = () => {
      progressTween?.kill();
      gsap.set(progress, { scaleX: 0 });
      if (reduced || userPaused || !inView || document.hidden) return;
      progressTween = gsap.to(progress, {
        scaleX: 1,
        duration: SCENE_DURATION,
        ease: 'none',
        onComplete: () => selectScene.current((current + 1) % sceneEls.length, false),
      });
    };

    const showScene = (nextIndex, manual = true) => {
      const next = ((nextIndex % sceneEls.length) + sceneEls.length) % sceneEls.length;
      if (next === current) {
        startClock();
        return;
      }

      progressTween?.kill();
      transition?.kill();
      const previous = current;
      const outgoing = sceneEls[previous];
      const incoming = sceneEls[next];
      const direction = next > previous || (previous === sceneEls.length - 1 && next === 0) ? 1 : -1;
      const outgoingImage = outgoing.querySelector('img');
      const incomingImage = incoming.querySelector('img');
      const outgoingWords = outgoing.querySelectorAll('.photo-scene__copy span');
      const incomingWords = incoming.querySelectorAll('.photo-scene__copy span');
      const outgoingShade = outgoing.querySelector('.photo-scene__shade');
      const incomingShade = incoming.querySelector('.photo-scene__shade');

      current = next;
      setActive(next);
      moveRail(next);

      if (reduced) {
        gsap.set(sceneEls, { autoAlpha: 0, zIndex: 0 });
        gsap.set(incoming, { autoAlpha: 1, zIndex: 1 });
        startClock();
        return;
      }

      gsap.set(incoming, { autoAlpha: 1, zIndex: 2 });
      gsap.set(incomingImage, {
        clipPath: direction > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
        xPercent: direction * 4.5,
        scale: 1.105,
      });
      gsap.set(incomingWords, { yPercent: 112, rotate: direction * .8 });
      gsap.set(incomingShade, { autoAlpha: .3 });

      transition = gsap.timeline({
        defaults: { overwrite: true },
        onComplete: () => {
          gsap.set(outgoing, { autoAlpha: 0, zIndex: 0 });
          gsap.set(incoming, { zIndex: 1 });
          gsap.set(outgoingImage, { clearProps: 'transform,clipPath' });
          startClock();
        },
      })
        .to(outgoingImage, { xPercent: direction * -3.6, scale: 1.075, duration: 1.18, ease: 'power2.inOut' }, 0)
        .to(outgoingShade, { autoAlpha: .72, duration: .42, ease: 'power2.in' }, 0)
        .to(outgoingWords, { yPercent: -112, rotate: direction * -.6, stagger: .045, duration: .42, ease: 'power3.in' }, 0)
        .to(incomingImage, { clipPath: 'inset(0 0% 0 0%)', xPercent: 0, scale: 1, duration: 1.18, ease: 'power3.inOut' }, 0)
        .to(incomingShade, { autoAlpha: 1, duration: .72, ease: 'power2.out' }, .22)
        .to(incomingWords, { yPercent: 0, rotate: 0, stagger: .07, duration: .68, ease: 'power4.out' }, .4);

      if (manual) transition.timeScale(1.08);
    };

    selectScene.current = showScene;
    toggleMotion.current = () => {
      userPaused = !userPaused;
      setPaused(userPaused);
      if (userPaused) progressTween?.pause();
      else startClock();
    };
    moveRail(0, false);

    const firstImage = sceneEls[0].querySelector('img');
    const firstWords = sceneEls[0].querySelectorAll('.photo-scene__copy span');
    const supporting = root.querySelectorAll('.photo-hero__edition,.photo-hero__actions,.photo-hero__index-wrap,.photo-hero__caption,.photo-hero__scroll');

    if (!reduced) {
      gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: startClock })
        .fromTo(firstImage, { scale: 1.12, clipPath: 'inset(1.6rem)' }, { scale: 1, clipPath: 'inset(0rem)', duration: 1.45, ease: 'power3.inOut' })
        .from(firstWords, { yPercent: 112, stagger: .07, duration: .72, ease: 'power4.out' }, .24)
        .from(supporting, { y: 14, autoAlpha: 0, stagger: .055, duration: .42 }, .62);
    } else {
      startClock();
    }

    if (!reduced) {
      const exit = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: .7 } });
      exit
        .to(root.querySelectorAll('.photo-scene__media'), { yPercent: 9, scale: 1.045, ease: 'none' }, 0)
        .fromTo(root.querySelectorAll('.photo-scene__copy'), { yPercent: 0, autoAlpha: 1 }, { yPercent: -16, autoAlpha: .18, ease: 'none', immediateRender: false }, 0)
        .fromTo(root.querySelector('.photo-hero__index-wrap'), { yPercent: 0, autoAlpha: 1 }, { yPercent: -22, autoAlpha: .22, ease: 'none', immediateRender: false }, 0)
        .fromTo(root.querySelector('.photo-hero__actions'), { yPercent: 0, autoAlpha: 1 }, { yPercent: 25, autoAlpha: 0, ease: 'none', immediateRender: false }, 0);
    }

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) startClock();
      else progressTween?.pause();
    }, { threshold: .18 });
    visibilityObserver.observe(root);

    const onVisibilityChange = () => {
      if (document.hidden) progressTween?.pause();
      else if (inView && !userPaused) progressTween?.resume();
    };
    const onFocusIn = () => progressTween?.pause();
    const onFocusOut = () => window.setTimeout(() => {
      if (!root.contains(document.activeElement) && !userPaused) startClock();
    }, 0);
    document.addEventListener('visibilitychange', onVisibilityChange);
    root.addEventListener('focusin', onFocusIn);
    root.addEventListener('focusout', onFocusOut);

    return () => {
      progressTween?.kill();
      transition?.kill();
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      root.removeEventListener('focusin', onFocusIn);
      root.removeEventListener('focusout', onFocusOut);
      selectScene.current = () => {};
      toggleMotion.current = () => {};
    };
  }, { scope });

  const select = (index) => selectScene.current(index, true);

  return (
    <section ref={scope} className="photo-hero" aria-label="Photographic journey through Northeast India">
      <div className="photo-hero__scenes">
        {scenes.map((scene, index) => (
          <article id={`photo-scene-${index}`} role="tabpanel" className={`photo-scene photo-scene--${scene.layout}`} data-photo-scene key={scene.slug} aria-hidden={active !== index}>
            <div className="photo-scene__media">
              <picture>
                <source media="(min-width: 901px)" srcSet={scene.desktop} />
                <img
                  src={scene.mobile}
                  alt={index === active ? scene.alt : ''}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  decoding={index === 0 ? 'sync' : 'async'}
                  style={{ objectPosition: scene.focal }}
                />
              </picture>
            </div>
            <div className="photo-scene__shade" />
            <div className="photo-scene__copy">
              <p><span>{scene.state} / photographic field note</span></p>
              <h1 id={index === 0 ? 'photo-hero-title' : undefined}>
                <span>{scene.lineOne}</span><br />
                <em><span>{scene.lineTwo}</span></em>
              </h1>
              <div className="photo-scene__note"><span>{scene.note}</span></div>
            </div>
          </article>
        ))}
      </div>

      <p className="photo-hero__edition">Field notes / Northeast India</p>
      <div className="photo-hero__actions">
        <Link className="photo-action photo-action--primary" to="/plan-my-trip"><span>Plan a complete trip</span><Arrow /></Link>
        <Link className="photo-action" to="/fleet"><span>Book a vehicle</span><Arrow /></Link>
      </div>

      <div className="photo-hero__index-wrap">
        <div className="photo-hero__index" role="tablist" aria-label="Select a photographic destination">
          <div className="photo-hero__index-track">
            {scenes.map((scene, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls={`photo-scene-${index}`}
                aria-label={`Show ${scene.name}, ${scene.state}`}
                className={active === index ? 'is-active' : ''}
                onClick={() => select(index)}
                key={scene.slug}
              >
                <img src={scene.mobile} alt="" aria-hidden="true" loading={index < 3 ? 'eager' : 'lazy'} decoding="async" />
                <span>0{index + 1}</span>
                <b>{scene.name}</b>
              </button>
            ))}
          </div>
        </div>
        <div className="photo-hero__index-meta">
          <span>{scenes[active].name}</span>
          <button type="button" className="photo-hero__pause" aria-pressed={paused} onClick={() => toggleMotion.current()}>
            <span className={`photo-hero__pause-icon ${paused ? 'is-paused' : ''}`} aria-hidden="true"><i /><i /></span>
            <span>{paused ? 'Play story' : 'Pause story'}</span>
          </button>
        </div>
        <div className="photo-hero__progress" aria-hidden="true"><i /></div>
      </div>

      <div className="photo-hero__caption" aria-live="polite">
        <span>0{active + 1} / 0{scenes.length}</span>
        <Link to={`/destinations/${scenes[active].slug}`}>{scenes[active].name} · {scenes[active].state} <Arrow /></Link>
      </div>
      <p className="photo-hero__sr-status" role="status">Scene {active + 1} of {scenes.length}: {scenes[active].name}, {scenes[active].state}</p>
      <div className="photo-hero__scroll" aria-hidden="true"><i />Scroll to enter</div>
    </section>
  );
}
