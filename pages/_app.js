import GlobalStyle from "../components/theme/globalStyle";
import { base, lightTheme } from "../components/theme/default";
import { ThemeProvider } from "styled-components";
import Layout from "../components/layout";
import { Analytics } from "@vercel/analytics/react";
import "../styles/markdown.css";

export default function App({ Component, pageProps }) {
  const theme = {
    ...base,
    colors: lightTheme,
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
      <Analytics />
    </>
  );
}
