import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import PostList from "../components/postlist";
import TagList from "../components/taglist";

import { getSortedPostsData, getSortedTagsData } from "../lib/posts";

export async function getStaticProps() {
  const postsList = getSortedPostsData();
  const allTagsData = getSortedTagsData();

  return {
    props: {
      postsList,
      allTagsData,
    },
  };
}

export default function Tag({ postsList, allTagsData }) {
  const router = useRouter();
  const [tagPostLists, setTagPostLists] = useState();

  useEffect(() => {
    if (!router.query.v) return;

    setTagPostLists(postsList.filter((item) => !!item.tags[router.query.v]));
  }, [postsList, router.query.v]);

  return (
    <PostListSection>
      <TagList tagsData={allTagsData} />
      <PostList postsData={tagPostLists} />
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
