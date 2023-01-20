import GlobalStyle from "../components/theme/globalStyle";
import { base, lightTheme } from "../components/theme/default";
import styled, { ThemeProvider } from "styled-components";
import { usePageLoading } from "../hooks/usePageLoading";
import Layout from "../components/layout";
import { Analytics } from "@vercel/analytics/react";
import "../styles/markdown.css";

export default function App({ Component, pageProps }) {
  const { isPageLoading } = usePageLoading();
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

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;

  .loader {
    width: 130px;
    height: 48px;
    display: inline-block;
    background: linear-gradient(
        45deg,
        #000 25%,
        transparent 25%,
        transparent 75%,
        #000 75%,
        #000 100%
      ),
      linear-gradient(
        45deg,
        #000 25%,
        white 25%,
        white 75%,
        #000 75%,
        #000 100%
      );
    font-size: 10px;
    background-size: 32px 32px;
    box-sizing: border-box;
    animation: raceBoard 0.6s linear infinite;
    background-position: 0 0, 16px 16px;
  }

  @keyframes raceBoard {
    0% {
      background-position: 0 0, 16px 16px;
    }
    100% {
      background-position: 32px 0px, 48px 16px;
    }
  }
`;
