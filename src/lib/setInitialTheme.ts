export const setInitialTheme = `
  function setInitialTheme() {
    try {
      const isDark = localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      
      document.documentElement.classList.toggle('dark', isDark)
    } catch (e) {}
  }
  setInitialTheme();
`
