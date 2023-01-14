import styled from "styled-components";
import PostList from "../components/postlist";
import TagList from "../components/taglist";
import { getSortedPostsData, getSortedTagsData } from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const allTagsData = getSortedTagsData();

  return {
    props: {
      allPostsData,
      allTagsData,
    },
  };
}

// https://stackoverflow.com/questions/67624601/how-to-implement-infinite-scroll-in-next-js

export default function Home({ allPostsData, allTagsData }) {
  return (
    <PostListSection>
      <TagList tagsData={allTagsData} postsData={allPostsData} />
      <PostList postsData={allPostsData} />
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
