import Link from "next/link";
import styled from "styled-components";

export default function PostList({ postsData }) {
  return (
    <Container>
      {postsData.map(({ id, tags, date, title, param, content }) => {
        return (
          <Link
            key={id}
            className="link"
            href={param ? `/posts/${param}/${id}` : `/posts/${id}`}
          >
            <PostCard>
              <div className="title_wrapper">
                <div className="title">{title}</div>
              </div>
              <TagDateWrapper>
                <div className="tag_wrapper">
                  {tags.map((tag, i) => {
                    return (
                      <div className="tag" key={i + tag}>
                        {tag}
                      </div>
                    );
                  })}
                </div>
                <div className="date">{date}</div>
              </TagDateWrapper>
            </PostCard>
          </Link>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const PostCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  margin: 1rem;
  padding: 1rem;
  border-radius: 10px;

  text-align: left;

  .title_wrapper {
    display: flex;
  }

  .title {
    font-weight: 400;
    margin: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-height: 1.3;
    height: 22px;
  }

  &:hover {
    background-color: #f7fbff;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  }
`;

const TagDateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .tag_wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  .tag {
    padding: 0 8px;
    margin: 6px 6px 3px 0;
    border-radius: 3px;
    font-size: 14px;
    background-color: #e0f3ff;
  }

  .date {
    min-width: 70px;
    color: #afafaf;
    font-size: 12px;
    text-align: center;
    margin: 0;
    min-width: 66px;
  }
`;

const PostListSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;

  .link {
    color: black;

    &:hover {
      background-color: #fffee0;
      text-decoration: none;
    }
  }
`;
