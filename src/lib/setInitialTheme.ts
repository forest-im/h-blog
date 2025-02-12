export const setInitialTheme = `
  function setInitialTheme() {
    try {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const savedTheme = localStorage.getItem('theme')
      
      // 저장된 테마가 없으면 시스템 테마를 따름
      if (!savedTheme) {
        document.documentElement.classList.toggle('dark', prefersDark)
        localStorage.setItem('theme', prefersDark ? 'dark' : 'light')
      } else {
        document.documentElement.classList.toggle('dark', savedTheme === 'dark')
      }
    } catch (e) {}
  }
  setInitialTheme();
`
