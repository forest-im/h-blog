import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import
url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');

html,
body {
  padding: 0;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  line-height: 1.6;

  .toc {
    display: flex;
    justify-content: space-around;
    padding: 2em 0 1rem 0;
    border: 1px solid #ededed;
    border-radius: 20px;
    font-size: 0.9rem;
    color: #d4d4d4;

    a {
      color: #73b0ff;

      &:hover {
      color: #006fff;
    }
    }
  }
}

img {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;    border-radius: 0.5rem;
}

* {
  font-family: 'Noto Sans KR', sans-serif;
  box-sizing: border-box;
}

a {
  color: #0070f3;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  max-width: 100%;
  display: block;
}
`;

export default GlobalStyle;
