---
title: Svelte로 블로그 만들기
tag: Svelte
date: 2023-01-29 14:01:55
---

## 해야할 것

- [x] 1. md highlight 추가ㅜㅜ
- [ ] 4. tailwind 정리해보기
- [ ] 1. css
- [ ] 1. 태그 정리, 태그 라우트 만들기
- [ ] 1. 포스트 카운트 10개 -> 20개 (10개씩)
- 라우트 이동될 때 포스트 카운트 초기화
- [ ] 5. 린트에 tailwind 추가
- [ ] 6. 상단 메뉴에 project, note 추가하기
- [ ] 7. 댓글

## vite glob

- glob 이용해 여러 모듈을 한 번에 가져옴 (fs쓰지 않고 모듈로 해결)

## promise 에러처리

- 어떤 부분에서 에러가 났는지 잡기 힘듬

### Promise.all

순회 가능한 객체에 주어진 모든 프로미스가 이행한 후, 혹은 프로미스가 주어지지 않았을 때 이행하는 Promise를 반환한다. 주어진 프로미스 중 하나가 거부하는 경우, 첫 번째로 거절한 프로미스의 이유를 사용해 자신도 거부한다.

- 여러 프로미스의 결과를 집계할 때 사용, 일반적으로 다음 코드를 계속 실행하기 전에 서로 연관된 비동기 작업 여러 개가 모두 이행되어야 하는 경우에 사용한다.
- Promise.all은 배열 내 모든 값의 이행(또는 첫 번째 거부)를 기다림 (실패 우선성)
- 하나라도 거부 당했을 때 즉시 거부하고 싶을 때 적합하다.

### Promise.allSettled

주어진 모든 프로미스를 이행하거나 거부한 후, 각 프로미스에 대한 결과를 나타내는 객체 배열을 반환한다.

- 일반적으로 서로의 성공 여부에 관련 없는 여러 비동기 작업을 수행해야 하거나, 항상 각 프로미스의 실행 결과를 알고 싶을 때 사용한다.

## mdsvex 버그

- 개행 중요함 html 태그 안에서 한 칸 띄우고 마크다운 쓰고나서도 한 칸 띄워야 함
- `<>` 괄호 입력하면 오류 남 (열고 닫힌 괄호) , `{}` 이것두

## 전처리

https://kit.svelte.dev/docs/integrations

## tailwind

https://tailwindcss.com/docs/guides/sveltekit

### postcss?

css 컴파일러인듯

theme 방법 찾아보기

```js
<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
</style>
```

### tailwind typhography

https://tailwindcss.com/docs/typography-plugin

## 신기

```js
{#if slug}
  <h3 class="heading" class:large={!slug} {id}>
    <a {href}>
      {title}
    </a>
  </h3>
{:else}
  <h2 class="heading" class:large={!slug} {id}>
    <a {href}>
      {title}
    </a>
  </h2>
{/if}
```
