'use client'

import { useTheme } from '@/context/ThemeProvider'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Hydration 에러 방지: 마운트 전에는 렌더링하지 않음
  if (!mounted) {
    return (
      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
        <span className="opacity-0">☀️</span>
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  )
}
