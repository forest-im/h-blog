import Head from "next/head";
import { getAllPostIds, getPostData } from "../../lib/posts";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Comments from "../../components/comments";
import Link from "next/link";

const MarkDownRenderer = dynamic(
  () => import("../../components/markdownrenderer"),
  { ssr: false }
);

export default function Post({ postData }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <div className="markdown-body">
          <Heading1>{postData.title}</Heading1>
          <small>{postData.date}</small>
          <MarkDownRenderer post={postData.content} />
        </div>
      </article>
      <Comments />
      <HomeLink>
        <Link href="/">← Back to home</Link>
      </HomeLink>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData =
    params.param.length === 1
      ? await getPostData(params.param[0])
      : await getPostData(params.param[1], params.param[0]);

  return {
    props: {
      postData,
    },
  };
}

const Heading1 = styled.h1`
  font-size: 2rem;
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.05rem;
  margin: 0;
`;

const HomeLink = styled.div`
  margin: 0 auto;
`;
