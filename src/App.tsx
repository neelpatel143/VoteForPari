/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MeetPari } from './components/MeetPari';
import { Vision } from './components/Vision';
import { WhyVote } from './components/WhyVote';
import { Promises } from './components/Promises';
import { Gallery } from './components/Gallery';
import { Countdown } from './components/Countdown';
import { SupportCounter } from './components/SupportCounter';
import { EasterEggs } from './components/EasterEggs';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-white min-h-screen text-gray-900 selection:bg-royal/30 selection:text-royal-dark">
      <CustomCursor />
      <Header />
      
      <main>
        <Hero />
        <MeetPari />
        <Vision />
        <WhyVote />
        <Promises />
        <Gallery />
        <Countdown />
      </main>

      <SupportCounter />
      <EasterEggs />
      
      <footer className="py-12 bg-white flex justify-center items-center gap-6 md:gap-12 opacity-60 flex-wrap px-6">
        <div className="flex flex-col text-center md:text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-royal">Leadership</span>
          <span className="text-[10px] text-gray-500">Experience & Integrity</span>
        </div>
        <div className="flex flex-col text-center md:text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-royal">Confidence</span>
          <span className="text-[10px] text-gray-500">Public Speaking Pro</span>
        </div>
        <div className="flex flex-col text-center md:text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-royal">Commitment</span>
          <span className="text-[10px] text-gray-500">100% Project Completion</span>
        </div>
      </footer>
    </div>
  );
}
