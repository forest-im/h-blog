import styled from "styled-components";
import PostList from "../components/postlist";
import Layout from "../components/layout";
import { getSortedPostsData } from "../lib/posts";

export async function getServerSideProps(context) {
  const tag = context.query.v;
  const postsList = getSortedPostsData(tag);

  return {
    props: {
      postsList,
    },
  };
}

export default function Tag({ postsList }) {
  return (
    <Layout home>
      <PostListSection>
        <PostList postsData={postsList} />
      </PostListSection>
    </Layout>
  );
}

const PostListSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;

  .link {
    color: black;

    &:hover {
      background-color: #fffee0;
      text-decoration: none;
    }
  }
`;
