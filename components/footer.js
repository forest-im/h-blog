import styled from 'styled-components';

export default function Footer() {
  return (
    <Wrapper>
      <small>&copy; alex {new Date().getFullYear()}</small>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  overflow: hidden;
  bottom: 0px;
  margin: 1rem;
  font-size: small;
`;
