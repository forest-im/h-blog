import GlobalStyle from "../components/theme/globalStyle";
import { base, lightTheme } from "../components/theme/default";
import { ThemeProvider } from "styled-components";

export default function App({ Component, pageProps }) {
  const theme = {
    ...base,
    colors: lightTheme,
  };
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
