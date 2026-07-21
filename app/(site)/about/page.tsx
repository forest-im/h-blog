import AiLabel from "@/components/ai-label";

export const metadata = { title: "about — 블로그" };

export default function AboutPage() {
  return (
    <div>
      <section className="mb-10">
        <h1 className="font-mono text-lg text-foreground">about/</h1>
      </section>

      {/* 소개 — 직접 다듬을 것 */}
      <section className="mb-12">
        <p className="text-[15px] leading-relaxed text-foreground/90">
          프론트엔드 개발자 Hazel. 배운 걸 그때그때 남기는 학습 로그입니다.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="meta-label mb-4 text-muted">STRUCTURE</h2>
        <ul className="flex flex-col gap-3 text-sm text-foreground/80">
          <li>
            <span className="font-mono text-foreground">til/</span>
            <span className="ml-3 text-muted">
              오늘 배운 것을 짧게. 개조식, 완성도보다 기록.
            </span>
          </li>
          <li>
            <span className="font-mono text-foreground">blog/</span>
            <span className="ml-3 text-muted">
              생각을 조금 더 길게. 회고와 정리.
            </span>
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="meta-label mb-4 text-muted">AI DISCLOSURE</h2>
        <p className="mb-5 text-sm leading-relaxed text-foreground/80">
          모든 글에 AI 기여도를 표기합니다. 판단과 경험은 사람의 것이고, AI가
          어디까지 관여했는지 숨기지 않습니다.
        </p>
        <ul className="flex flex-col gap-3">
          <li className="flex items-baseline gap-4">
            <AiLabel level="human" />
            <span className="text-sm text-muted">직접 씀</span>
          </li>
          <li className="flex items-baseline gap-4">
            <AiLabel level="assist" />
            <span className="text-sm text-muted">사람이 쓰고 AI가 보조</span>
          </li>
          <li className="flex items-baseline gap-4">
            <AiLabel level="draft" />
            <span className="text-sm text-muted">
              AI 초안, 사람이 검수 (기록·경험은 사람의 것)
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="meta-label mb-4 text-muted">LINKS</h2>
        <a
          href="https://github.com/forest-im"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-sm text-foreground/80 transition-colors hover:text-[var(--signal)]"
        >
          github.com/forest-im ↗
        </a>
      </section>
    </div>
  );
}
