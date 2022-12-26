import Head from "next/head";
import Link from "next/link";
import Footer from "./footer";
import Nav from "./nav";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Layout({ children, home }) {
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    if (!router) return;

    router.events.on("routeChangeStart", () => {
      console.log("loading");
      setIsPageLoading(true);
    });

    router.events.on("routeChangeComplete", () => {
      setIsPageLoading(false);
    });
  }, [router]);
  return (
    <Container>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{"Blog | 임현정"}</title>
        <meta name="description" content="Alex's blog" />
        <meta property="og:image" content="/images/profile.png" />
        <meta name="og:title" content={"h-alex-blog"} />
        <meta property="og:description" content="공부한 것을 기록합니다." />
        <meta name="twitter:card" content="/images/profile.png" />
      </Head>
      <Main>
        <Nav />
        {isPageLoading ? <Loading /> : <>{children}</>}
      </Main>
      {!home && (
        <div>
          <Link href="/">← Back to home</Link>
        </div>
      )}
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 0 1rem;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-width: 300px;
  max-width: 800px;
  line-height: 1.625;
`;

const Loading = styled.div`
  .lds-default {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-default div {
    position: absolute;
    width: 6px;
    height: 6px;
    background: #fff;
    border-radius: 50%;
    animation: lds-default 1.2s linear infinite;
  }
  .lds-default div:nth-child(1) {
    animation-delay: 0s;
    top: 37px;
    left: 66px;
  }
  .lds-default div:nth-child(2) {
    animation-delay: -0.1s;
    top: 22px;
    left: 62px;
  }
  .lds-default div:nth-child(3) {
    animation-delay: -0.2s;
    top: 11px;
    left: 52px;
  }
  .lds-default div:nth-child(4) {
    animation-delay: -0.3s;
    top: 7px;
    left: 37px;
  }
  .lds-default div:nth-child(5) {
    animation-delay: -0.4s;
    top: 11px;
    left: 22px;
  }
  .lds-default div:nth-child(6) {
    animation-delay: -0.5s;
    top: 22px;
    left: 11px;
  }
  .lds-default div:nth-child(7) {
    animation-delay: -0.6s;
    top: 37px;
    left: 7px;
  }
  .lds-default div:nth-child(8) {
    animation-delay: -0.7s;
    top: 52px;
    left: 11px;
  }
  .lds-default div:nth-child(9) {
    animation-delay: -0.8s;
    top: 62px;
    left: 22px;
  }
  .lds-default div:nth-child(10) {
    animation-delay: -0.9s;
    top: 66px;
    left: 37px;
  }
  .lds-default div:nth-child(11) {
    animation-delay: -1s;
    top: 62px;
    left: 52px;
  }
  .lds-default div:nth-child(12) {
    animation-delay: -1.1s;
    top: 52px;
    left: 62px;
  }
  @keyframes lds-default {
    0%,
    20%,
    80%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
  }
`;
