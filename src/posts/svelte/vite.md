---
title: vite
tag: vite
date: 2023-01-28 19:43:53
published: false
---

## Snowpack

esbuild(기존의 빌드 속도보다 100배 빠른 도구)로 빌드하고, 브라우저 표준 방식으로 개발하고, 기존 번들툴로 결과물을 만들어 내는 방식?

- 기존에 파일을 하나 수정할 때마다 전체를 빌드해서 결과를 만드는 것이 아니라 각각의 모듈을 별도로 빌드하고, 수정이 발생하면 해당 파일만 다시 빌드해서 업데이트하는 방식 빌드할 때는 esbuild를 활용
- Snowpack은 esbuild를 통해 개발 모드를 지원하고, 실제 번들은 webpack을 통해 제공하는 방식
- 이러한 방식을 통해서 파일 수정 시 새로고침을 하지 않고 수정된 파일의 내용만 반영할 수 있는 HMR(hot module replace)기능을 매우 강력하게 제공

> 출처

- [Vite 이야기(feat. Svelte)](https://yozm.wishket.com/magazine/detail/1620/)

## Svelte
- 기존 모듈 번들러는 rollup.js였으나 hmr 기능 제공이 안돼서 snowpack으로 변경함
- snowpack -> 안정적이지 않아 에반 유(vue.js 개발)가 Snowpack 단점을 개선해서 `Vite`를 만듦
- snowpack을 버리고 vite와 통합하게 됨