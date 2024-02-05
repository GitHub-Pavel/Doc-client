import { gsap } from 'gsap';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useHomeLogoStore } from './home-logo.store';

export const useHomeLogoGsap = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const { isHide, setAnimationEnd } = useHomeLogoStore((state) => state);
  const homeLogoTimeline = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      homeLogoTimeline.current = gsap
        .timeline()
        .to('p', {
          y: -50,
          opacity: 0,
          duration: 0.5,
        })
        .to(
          'strong',
          {
            y: -25,
            opacity: 0,
            onComplete: () => {
              setTimeout(() => setAnimationEnd(), 200);
            },
          },
          '-=0.35',
        );
    }, boxRef);

    return () => ctx.revert();
  }, [isHide, boxRef, setAnimationEnd]);

  useEffect(() => {
    homeLogoTimeline.current?.reversed(!isHide);
  }, [isHide]);

  return boxRef;
};
