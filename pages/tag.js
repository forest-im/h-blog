import styled from "styled-components";
import PostList from "../components/postlist";
import TagList from "../components/taglist";

import { getSortedPostsData, getSortedTagsData } from "../lib/posts";

export async function getServerSideProps(context) {
  const tag = context.query.v;
  const postsList = getSortedPostsData(tag);
  const allTagsData = getSortedTagsData();

  return {
    props: {
      postsList,
      allTagsData,
    },
  };
}

export default function Tag({ postsList, allTagsData }) {
  return (
    <PostListSection>
      <TagList tagsData={allTagsData} />
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
