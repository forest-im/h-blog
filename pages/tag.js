import styled from "styled-components";
import PostList from "../components/postlist";
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
    <PostListSection>
      <PostList postsData={postsList} />
    </PostListSection>
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
