"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// 무의미한 3D 오브제 — 파티클 토러스 매듭 (remix.run 성운 오마주).
// 자전은 은은한 자동 회전만. 커서(터치 드래그) 위치의 입자만 국소적으로
// 밀려났다 스프링으로 복귀. 스크롤(stateRef.p)에 따라 입자가 흩어지며 통과.
// prefers-reduced-motion: 자전 없이 정적 1프레임.
export type ObjetState = { p: number; mx: number; my: number; active: boolean };

const ACCENT = new THREE.Color("#3d8bff"); // 일렉트릭 블루
const BONE = new THREE.Color("#d9e6ff"); // 쿨 블루 화이트

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

    // 토러스 매듭 정점을 입자 홈 위치로 샘플링
    const knot = new THREE.TorusKnotGeometry(2.6, 0.82, 320, 48);
    const home = knot.attributes.position.array as Float32Array;
    const count = home.length / 3;
    knot.dispose();

    const pos = new Float32Array(home); // 현재 위치 (매 프레임 갱신)
    const colors = new Float32Array(count * 3);
    const dirs = new Float32Array(count * 3); // 흩어질 방향 (단위 벡터)
    const push = new Float32Array(count * 3); // 커서 반발 오프셋 (스프링)
    for (let i = 0; i < count; i++) {
      const isAccent = Math.random() < 0.07;
      const c = isAccent ? ACCENT : BONE;
      const dim = isAccent ? 1 : 0.7 + Math.random() * 0.3;
      colors[i * 3] = c.r * dim;
      colors[i * 3 + 1] = c.g * dim;
      colors[i * 3 + 2] = c.b * dim;
      const v = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5,
      ).normalize();
      dirs[i * 3] = v.x;
      dirs[i * 3 + 1] = v.y;
      dirs[i * 3 + 2] = v.z;
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
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    // 커서 반발 계산용 임시 벡터 (할당 재사용)
    const cursorWorld = new THREE.Vector3();
    const cursorLocal = new THREE.Vector3();
    const RADIUS = 2.3; // 반발 반경 (로컬 단위)
    const FORCE = 1.9; // 최대 밀림 거리

    let raf = 0;
    let t = 0;
    const render = () => {
      const s = stateRef.current;

      t += 0.0035;
      if (!reduce) {
        group.rotation.y = t;
        group.rotation.x = t * 0.6;
      } else {
        group.rotation.set(0.4, 0.6, 0);
      }
      // 스크롤하면 카메라가 오브제 속으로 파고듦
      camera.position.z = 14 - s.p * 8;
      mat.opacity = 1 - s.p * 0.55;

      // 커서를 오브제 평면(z=0)으로 역투영 → 그룹 로컬 좌표로 변환
      let hasCursor = false;
      if (s.active && !reduce) {
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

      const disperse = s.p * s.p * 9; // 스크롤할수록 입자가 흩어짐
      for (let i = 0; i < count; i++) {
        const j = i * 3;
        const bx = home[j] + dirs[j] * disperse;
        const by = home[j + 1] + dirs[j + 1] * disperse;
        const bz = home[j + 2] + dirs[j + 2] * disperse;

        // 커서 근처 입자만 밀어냄 (부드러운 감쇠)
        let txp = 0;
        let typ = 0;
        let tzp = 0;
        if (hasCursor) {
          const dx = bx - cursorLocal.x;
          const dy = by - cursorLocal.y;
          const dz2 = bz - cursorLocal.z;
          const d = Math.sqrt(dx * dx + dy * dy + dz2 * dz2);
          if (d < RADIUS && d > 1e-4) {
            const f = (1 - d / RADIUS) ** 2 * (FORCE / d);
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
      if (!reduce) raf = requestAnimationFrame(render);
    };
    if (reduce) {
      render();
    } else {
      raf = requestAnimationFrame(render);
    }

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
