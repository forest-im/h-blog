"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// 차원 상승 오브제 — "차원은 이전 차원의 궤적". 같은 입자들이 스크롤에 따라
// 0D 점 → 1D 선분 → 2D 원(첫 닫힌 둘레) → 3D 정육면체 → 4D 테서랙트
// (4차원 회전을 3D로 실시간 투영)로 모핑. 부드러움(점·선·원)에서
// 각진 구조(큐브·테서랙트)로 넘어가는 리듬을 의도함.
// 커서(터치) 위치의 입자는 국소 반발 후 스프링 복귀.
// prefers-reduced-motion: 3D 정육면체 정적 1프레임.
export type ObjetState = { p: number; mx: number; my: number; active: boolean };

const ACCENT = new THREE.Color("#3d8bff"); // 일렉트릭 블루
const BONE = new THREE.Color("#d9e6ff"); // 쿨 블루 화이트

// 각 차원 상태의 유지 구간 [시작, 끝] — 사이 구간에서 모핑
const HOLDS: [number, number][] = [
  [0, 0.06], // 0D 점
  [0.2, 0.26], // 1D 선
  [0.4, 0.46], // 2D 원
  [0.6, 0.7], // 3D 매듭
  [0.84, 1.01], // 4D 테서랙트
];

const smooth = (t: number) => t * t * (3 - 2 * t);

function blend(p: number): { a: number; b: number; s: number } {
  for (let i = 0; i < HOLDS.length; i++) {
    if (p < HOLDS[i][0]) {
      const prevEnd = HOLDS[i - 1][1];
      return { a: i - 1, b: i, s: smooth((p - prevEnd) / (HOLDS[i][0] - prevEnd)) };
    }
    if (p <= HOLDS[i][1]) return { a: i, b: i, s: 0 };
  }
  return { a: 4, b: 4, s: 0 };
}

export default function Objet({
  stateRef,
}: {
  stateRef: React.MutableRefObject<ObjetState>;
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 14;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const count = 14000;

    // n-큐브의 모서리 목록: 꼭짓점 = {±1}^n, 모서리 = 한 좌표만 다른 쌍
    const cubeEdges = (bits: number): [number[], number[]][] => {
      const verts: number[][] = [];
      for (let v = 0; v < 1 << bits; v++) {
        const vv: number[] = [];
        for (let k = 0; k < bits; k++) vv.push(v & (1 << k) ? 1 : -1);
        verts.push(vv);
      }
      const edges: [number[], number[]][] = [];
      for (let a = 0; a < verts.length; a++)
        for (let b = a + 1; b < verts.length; b++) {
          const x = a ^ b;
          if ((x & (x - 1)) === 0) edges.push([verts[a], verts[b]]);
        }
      return edges;
    };

    // n-큐브 모서리 위에 입자 분배 (남는 축은 0 + 미세 지터)
    const fillEdges = (bits: number, scale: number): Float32Array => {
      const out = new Float32Array(count * 3);
      const edges = cubeEdges(bits);
      const perEdge = Math.ceil(count / edges.length);
      for (let i = 0; i < count; i++) {
        const [A, B] = edges[i % edges.length];
        const s = Math.floor(i / edges.length) / perEdge;
        for (let k = 0; k < 3; k++) {
          const a = k < bits ? A[k] : 0;
          const b = k < bits ? B[k] : 0;
          out[i * 3 + k] =
            (a + (b - a) * s) * scale +
            (k >= bits ? (Math.random() - 0.5) * 0.05 : 0);
        }
      }
      return out;
    };

    // ── 차원별 홈 위치 — n-큐브 사다리 (4D는 매 프레임 투영) ──
    const point = new Float32Array(count * 3); // 0D: 꼭짓점 (미세 지터)
    for (let i = 0; i < count * 3; i++) point[i] = (Math.random() - 0.5) * 0.12;
    const line = fillEdges(1, 5.5); // 1D: 선분
    const circle = new Float32Array(count * 3); // 2D: 원 (첫 닫힌 둘레)
    for (let i = 0; i < count; i++) {
      const th = (i / count) * Math.PI * 2;
      circle[i * 3] = Math.cos(th) * 3.2;
      circle[i * 3 + 1] = Math.sin(th) * 3.2;
      circle[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
    }
    const cube = fillEdges(3, 2.3); // 3D: 정육면체

    // 4D 테서랙트: 32개 모서리에 입자 분배 (4D 좌표로 저장)
    const tess4 = new Float32Array(count * 4);
    {
      const edges = cubeEdges(4);
      const perEdge = Math.ceil(count / edges.length);
      for (let i = 0; i < count; i++) {
        const [A, B] = edges[i % edges.length];
        const s = Math.floor(i / edges.length) / perEdge;
        for (let k = 0; k < 4; k++)
          tess4[i * 4 + k] = (A[k] + (B[k] - A[k]) * s) * 2.1;
      }
    }
    const tess3 = new Float32Array(count * 3); // 투영 결과 버퍼

    const states = [point, line, circle, cube]; // states[4] = tess3 (동적)

    const pos = new Float32Array(cube); // 렌더 위치
    const colors = new Float32Array(count * 3);
    const push = new Float32Array(count * 3); // 커서 반발 오프셋
    for (let i = 0; i < count; i++) {
      const isAccent = Math.random() < 0.07;
      const c = isAccent ? ACCENT : BONE;
      const dim = isAccent ? 1 : 0.7 + Math.random() * 0.3;
      colors[i * 3] = c.r * dim;
      colors[i * 3 + 1] = c.g * dim;
      colors[i * 3 + 2] = c.b * dim;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // 부드러운 원형 점 스프라이트
    const sprite = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const g = c.getContext("2d")!;
      const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grd.addColorStop(0, "rgba(255,255,255,1)");
      grd.addColorStop(0.4, "rgba(255,255,255,0.5)");
      grd.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = grd;
      g.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    })();

    const mat = new THREE.PointsMaterial({
      size: 0.065,
      map: sprite,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geo, mat);
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // 세로 화면은 가로 시야가 좁으므로 카메라를 뒤로 빼서 오브제를 화면에 맞춤
      camera.position.z = Math.min(32, 14 * Math.max(1, 0.95 / camera.aspect));
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const cursorWorld = new THREE.Vector3();
    const cursorLocal = new THREE.Vector3();
    const RADIUS = 2.3; // 반발 반경
    const FORCE = 1.9; // 최대 밀림

    let raf = 0;
    let t = 0;
    let tp = 0; // 맥동 시계
    const render = () => {
      const s = stateRef.current;

      // reduce: 자동 회전·맥동만 끄고 스크롤 모핑(사용자 조작)은 유지
      t += 0.0035;
      tp += 0.055;
      if (!reduce) {
        group.rotation.y = t;
        group.rotation.x = t * 0.6;
      } else {
        group.rotation.set(0.4, 0.6, 0);
      }

      const { a, b, s: mix } = blend(s.p);

      // 0D 점 구간에서 심장박동처럼 맥동 (다음 차원으로 갈수록 소멸)
      const pointness = a === 0 ? (b === 0 ? 1 : 1 - mix) : 0;
      const beat = reduce ? 0.5 : 0.5 + 0.5 * Math.sin(tp);
      mat.size = 0.065 * (1 + pointness * 0.9 * beat);
      mat.opacity = reduce ? 1 : 1 - pointness * 0.25 * (1 - beat);

      // 4D 구간이면 테서랙트를 4차원 회전 후 3D로 투영
      if (a === 4 || b === 4) {
        const ang = t * 2.2;
        const c1 = Math.cos(ang);
        const s1 = Math.sin(ang);
        const c2 = Math.cos(ang * 0.7);
        const s2 = Math.sin(ang * 0.7);
        for (let i = 0; i < count; i++) {
          let x = tess4[i * 4];
          const y = tess4[i * 4 + 1];
          let z = tess4[i * 4 + 2];
          let w = tess4[i * 4 + 3];
          // x-w 평면 회전
          const x1 = x * c1 - w * s1;
          w = x * s1 + w * c1;
          x = x1;
          // z-w 평면 회전
          const z1 = z * c2 - w * s2;
          w = z * s2 + w * c2;
          z = z1;
          // 원근 투영 (4D → 3D)
          const f = 5.2 / (5.2 - w);
          tess3[i * 3] = x * f * 1.15;
          tess3[i * 3 + 1] = y * f * 1.15;
          tess3[i * 3 + 2] = z * f * 1.15;
        }
      }

      const A = a === 4 ? tess3 : states[a];
      const B = b === 4 ? tess3 : states[b];

      // 커서를 오브제 평면(z=0)으로 역투영 → 그룹 로컬 좌표 (사용자 조작이라 reduce에도 유지)
      let hasCursor = false;
      if (s.active) {
        cursorWorld.set(s.mx, -s.my, 0.5).unproject(camera);
        cursorWorld.sub(camera.position).normalize();
        const dz = cursorWorld.z;
        if (Math.abs(dz) > 1e-6) {
          const dist = -camera.position.z / dz;
          if (dist > 0) {
            cursorWorld.multiplyScalar(dist).add(camera.position);
            group.updateMatrixWorld();
            cursorLocal.copy(cursorWorld);
            group.worldToLocal(cursorLocal);
            hasCursor = true;
          }
        }
      }

      for (let i = 0; i < count; i++) {
        const j = i * 3;
        const bx = A[j] + (B[j] - A[j]) * mix;
        const by = A[j + 1] + (B[j + 1] - A[j + 1]) * mix;
        const bz = A[j + 2] + (B[j + 2] - A[j + 2]) * mix;

        let txp = 0;
        let typ = 0;
        let tzp = 0;
        if (hasCursor) {
          const dx = bx - cursorLocal.x;
          const dy = by - cursorLocal.y;
          const dz2 = bz - cursorLocal.z;
          const d = Math.sqrt(dx * dx + dy * dy + dz2 * dz2);
          if (d < RADIUS && d > 1e-4) {
            const f = Math.min(4, (1 - d / RADIUS) ** 2 * (FORCE / d));
            txp = dx * f;
            typ = dy * f;
            tzp = dz2 * f;
          }
        }
        push[j] += (txp - push[j]) * 0.12;
        push[j + 1] += (typ - push[j + 1]) * 0.12;
        push[j + 2] += (tzp - push[j + 2]) * 0.12;

        pos[j] = bx + push[j];
        pos[j + 1] = by + push[j + 1];
        pos[j + 2] = bz + push[j + 2];
      }
      geo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(render); // 스크롤 반응을 위해 상시 렌더
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      geo.dispose();
      mat.dispose();
      sprite.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount)
        mount.removeChild(renderer.domElement);
    };
  }, [stateRef]);

  return <div ref={mountRef} className="h-full w-full" aria-hidden />;
}
