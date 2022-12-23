import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import styled from 'styled-components';

export default function Post({ postData }) {
  return (
    <Layout>
      <Container>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <Article>
          <Heading1>{postData.title}</Heading1>
          <small>{postData.date}</small>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </Article>
      </Container>
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

const Container = styled.div`
  margin: 1rem;
  padding: 1rem;
`;

const Heading1 = styled.h1`
  font-size: 2rem;
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.05rem;
  margin: 0;
`;

const PostDate = styled.div`
  color: #666;
`;

const Article = styled.article`
  /* width: 100%; */
`;
