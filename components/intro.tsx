"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Lenis from "lenis";
import Objet, { type ObjetState } from "@/components/objet";

// 인트로 — 무의미한 파티클 오브제 + 스크롤 안무.
// 1막(0~40%): 오브제 자전 + 마우스 시차.
// 2막(40~80%): 스크롤하면 카메라가 파고들며 입자가 흩어짐(통과).
// 3막(70~100%): TIL/BLOG 입구 페이드 인.
// prefers-reduced-motion: 스크롤 트랙 없이 정적 1화면.
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

export default function Intro() {
  const trackRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);
  const actsRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<ObjetState>({ p: 0, mx: 0, my: 0, active: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.classList.add("is-static");
      return;
    }

    const lenis = new Lenis({ autoRaf: false });

    const onMove = (e: PointerEvent) => {
      stateRef.current.mx = (e.clientX / window.innerWidth - 0.5) * 2;
      stateRef.current.my = (e.clientY / window.innerHeight - 0.5) * 2;
      stateRef.current.active = true;
    };
    const onLeave = () => {
      stateRef.current.active = false; // 커서 이탈 → 입자 복귀
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") onLeave(); // 터치 떼면 복귀
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onMove); // 터치 탭도 반발
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);

      const max = track.offsetHeight - window.innerHeight;
      const p = max > 0 ? clamp01(lenis.scroll / max) : 0;
      stateRef.current.p = p;

      const a3 = smooth(clamp01((p - 0.7) / 0.3));
      if (hintRef.current)
        hintRef.current.style.opacity = String(clamp01(1 - p * 10));
      if (actsRef.current) {
        actsRef.current.style.opacity = String(a3);
        actsRef.current.style.transform = `translateY(${(1 - a3) * 32}px)`;
        actsRef.current.style.pointerEvents = a3 > 0.5 ? "auto" : "none";
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={trackRef} className="intro intro-track">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* 상단 메타 */}
        <header className="flex items-start justify-between p-6 sm:p-8">
          <span className="intro-meta">
            HAZEL<span className="text-[var(--signal)]">®</span>
          </span>
          <span className="intro-meta">37.57°N 126.98°E</span>
        </header>

        {/* 3D 오브제 */}
        <div className="absolute inset-0">
          <Objet stateRef={stateRef} />
        </div>

        {/* 3막 콘텐츠 */}
        <div ref={actsRef} className="intro-acts">
          <p className="intro-meta">LEARNING LOG — SEOUL</p>
          <nav className="mt-6 flex items-center gap-8">
            <Link href="/til" className="intro-enter intro-meta text-sm">
              [ TIL ↵ ]
            </Link>
            <Link href="/blog" className="intro-enter intro-meta text-sm">
              [ BLOG ↵ ]
            </Link>
          </nav>
        </div>

        {/* 필름 그레인 */}
        <div className="intro-grain" aria-hidden />

        {/* 하단 메타 */}
        <footer className="mt-auto flex items-end justify-between p-6 sm:p-8">
          <span className="intro-meta">INTRO — 2026</span>
          <span ref={hintRef} className="intro-meta">
            [ SCROLL ↓ ]
          </span>
        </footer>
      </div>
    </div>
  );
}
