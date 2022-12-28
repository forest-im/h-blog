---
title: "blog 만들기"
tag: nodejs, nextjs
date: 2022-12-23 15:56:45
---

## Todo

- [x] 태그별로 포스트 확인가능하게 만들기
- [x] 댓글 기능 만들기
- [ ] 검색 기능 만들기
- [ ] 메타 태그 개별로 추가하기
- [ ] 이미지 추가할 수 있게
- [ ] css 적용되기 전 데이터 안보이게 하기
  - styled components가 css in js 라이브러리라서 생기는 문제(지금 포스트 데이터는 serverside로 받아오고 있어서 스타일이 뒤늦게 적용되고 스타일 적용전의 모습이 나오고 있다.)
- [ ] nav에 프로젝트 메뉴, about 메뉴 만들기

## 기록

- Nextjs 공식문서, logrocket를 참고하였음 (90프로는 공식문서)
- Nextjs netlify 배포시 컴포넌트 이름 소문자로 바꿔야 함
- `process.cwd()`
  - node 명령을 호출한 작업 디렉터리의 절대 경로
- `__dirname`
  - 현재 실행하는 파일의 절대경로이다
