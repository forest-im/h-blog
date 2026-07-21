"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Lenis from "lenis";
import Objet, { type ObjetState } from "@/components/objet";

// 인트로 — 차원 상승 스크롤 안무.
// 스크롤할수록 입자가 0D 점 → 1D 선 → 2D 원 → 3D 매듭 → 4D 테서랙트로
// 모핑하고, 하단 라벨이 현재 차원을 표시. 끝에서 TIL/BLOG 입구 페이드 인.
// prefers-reduced-motion: 스크롤 트랙 없이 정적 1화면.
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

// 차원 라벨 (전환 중간점 기준으로 스위칭)
const DIMS = [
  "0D — POINT",
  "1D — LINE",
  "2D — CIRCLE",
  "3D — CUBE",
  "4D — TESSERACT",
];
const dimAt = (p: number) =>
  p < 0.13 ? 0 : p < 0.33 ? 1 : p < 0.53 ? 2 : p < 0.77 ? 3 : 4;

// 차원 지도 클릭 시 점프할 스크롤 진행률 (각 유지 구간 중심)
const DIM_TARGETS = [0, 0.23, 0.43, 0.65, 0.95];

export default function Intro() {
  const trackRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);
  const actsRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLSpanElement>(null);
  const dimsMapRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const stateRef = useRef<ObjetState>({ p: 0, mx: 0, my: 0, active: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // 정적 1화면: 정육면체 + 입구를 바로 보여줌 (스크롤 안무 없음)
      track.classList.add("is-static");
      if (dimRef.current) dimRef.current.textContent = DIMS[3];
      if (dimsMapRef.current) dimsMapRef.current.style.display = "none";
      if (hintRef.current) hintRef.current.style.display = "none";
      if (actsRef.current) {
        actsRef.current.style.opacity = "1";
        actsRef.current.style.pointerEvents = "auto";
      }
      return;
    }

    const lenis = new Lenis({ autoRaf: false });
    lenisRef.current = lenis;

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

      const a3 = smooth(clamp01((p - 0.88) / 0.12));
      if (hintRef.current)
        hintRef.current.style.opacity = String(clamp01(1 - p * 10));
      const dim = dimAt(p);
      if (dimRef.current) {
        const label = DIMS[dim];
        if (dimRef.current.textContent !== label)
          dimRef.current.textContent = label;
      }
      if (dimsMapRef.current) {
        const items = dimsMapRef.current.children;
        for (let i = 0; i < items.length; i++)
          items[i].classList.toggle("on", i === dim);
      }
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
      lenisRef.current = null;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={trackRef} className="intro intro-track">
      {/* 무대 — sticky는 iOS에서 안 붙는 경우가 있어 fixed로 뷰포트에 고정 */}
      <div className="fixed inset-0 flex flex-col overflow-hidden">
        {/* 상단 메타 */}
        <header className="flex items-start justify-between p-6 sm:p-8">
          <span className="intro-meta">
            HAZEL<span className="text-[var(--signal)]">®</span>
          </span>
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-5">
              <Link href="/til" className="intro-enter intro-meta">
                [ TIL ]
              </Link>
              <Link href="/blog" className="intro-enter intro-meta">
                [ BLOG ]
              </Link>
            </nav>
            <span className="intro-meta hidden sm:inline">
              37.57°N 126.98°E
            </span>
          </div>
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

        {/* 차원 지도 — 현재 위치 표시 + 클릭 점프 */}
        <nav ref={dimsMapRef} className="intro-dims" aria-label="차원 이동">
          {DIMS.map((label, i) => (
            <button
              key={i}
              type="button"
              className={"intro-dim" + (i === 0 ? " on" : "")}
              aria-label={label}
              onClick={() => {
                const track = trackRef.current;
                const lenis = lenisRef.current;
                if (!track || !lenis) return;
                const max = track.offsetHeight - window.innerHeight;
                lenis.scrollTo(max * DIM_TARGETS[i]);
              }}
            >
              {i}D
            </button>
          ))}
        </nav>

        {/* 필름 그레인 */}
        <div className="intro-grain" aria-hidden />

        {/* 하단 메타 */}
        <footer className="mt-auto flex items-end justify-between p-6 sm:p-8">
          <span className="intro-meta">INTRO — 2026</span>
          <span ref={dimRef} className="intro-meta text-[var(--signal)]">
            0D — POINT
          </span>
          <span ref={hintRef} className="intro-meta">
            [ SCROLL ↓ ]
          </span>
        </footer>
      </div>
    </div>
  );
}
