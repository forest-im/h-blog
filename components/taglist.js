import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

export default function TagsList({ tagsData }) {
  const router = useRouter();

  const handleClickTag = function (e, tag) {
    e.preventDefault();
    router.push(`tag?v=${tag}`);
  };

  return (
    <Container>
      <TagsWrapper>
        <Link href="/">
          <Tag clicked={router.pathname === "/"}>All</Tag>
        </Link>
        {tagsData.map((tag) => {
          return (
            <>
              <Tag
                clicked={router.query.v === tag.name}
                onClick={(e) => handleClickTag(e, tag.name)}
                key={tag.name}
              >
                <span className="count">#</span>
                {tag.name} <span className="count">{tag.value}</span>
              </Tag>
            </>
          );
        })}
      </TagsWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem;
  padding: 1rem;

  overflow: auto;
  white-space: nowrap;
`;

const Tag = styled.div`
  padding: 0.2rem 0.5rem;
  margin: 6px 6px 3px 0;
  border-radius: 10px;
  font-size: 12px;
  background-color: ${(props) => (props.clicked ? "#ffe16b" : "none")};
  border: 1px solid #dbdbdb;
  cursor: pointer;

  &:hover {
    background-color: #ffe16b;
  }

  .count {
    color: gray;
  }
`;
