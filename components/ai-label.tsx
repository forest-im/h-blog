import type { AiLevel } from "@/lib/posts";

// AI 기여도 라벨 — human은 조용히, AI 관여 글은 시그널 컬러로 구분
const LABELS: Record<AiLevel, string> = {
  human: "WRITTEN BY HUMAN",
  assist: "AI-ASSISTED",
  draft: "AI-DRAFTED",
};

export default function AiLabel({ level }: { level: AiLevel }) {
  return (
    <span
      className={
        "font-mono text-[10px] uppercase tracking-[0.18em] " +
        (level === "human" ? "text-muted" : "text-[var(--signal)]")
      }
    >
      [ {LABELS[level]} ]
    </span>
  );
}
