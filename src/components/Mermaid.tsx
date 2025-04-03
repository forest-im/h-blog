'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({ startOnLoad: false })

type MermaidProps = {
  chart: string
}

export default function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      // 1. 기존 내용을 비움
      containerRef.current.innerHTML = ''

      // 2. mermaid div를 직접 생성
      const el = document.createElement('div')
      el.className = 'mermaid'
      el.textContent = chart // ⬅ Mermaid는 내부 텍스트로 다이어그램을 판단함
      containerRef.current.appendChild(el)

      // 3. Mermaid 초기화
      mermaid.init(undefined, el)
    }
  }, [chart])

  return <div ref={containerRef} />
}
