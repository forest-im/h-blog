'use client'

import { useEffect } from 'react'

export default function MobileDetector() {
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    if (isMobile) {
      document.documentElement.classList.add('is-mobile')
    }
  }, [])

  return null
}
