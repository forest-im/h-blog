import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Comments from "../../components/comments";

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
    <Layout>
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
    </Layout>
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
