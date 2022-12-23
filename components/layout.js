import Head from "next/head";
import Link from "next/link";
import Footer from "./footer";
import Nav from "./nav";
import styled from "styled-components";

export default function Layout({ children, home }) {
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
        {children}
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
