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
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            "h-alex-blog"
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={"h-alex-blog"} />
        <meta name="twitter:card" content="summary_large_image" />
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
