---
title: JavaScript sort
tag: JS, sort
date: 2023-06-05 15:14:18
---

## Array.prototype.sort
- 원본 배열을 직접 변경하며 정렬된 배열을 반환한다.
- sort 메서드는 기본적으로 오름차순
- sort 메서드의 기본 정렬 순서는 유니코드 코드 포인트의 순서를 따른다.
- sort 메서드는 배열의 요소를 일시적으로 문자열로 변환한 후 정렬한다.

### 숫자 정렬하기
```js
const points = [40, 100, 1, 5, 2, 25, 10]

points.sort((a, b) => a - b);
// 숫자 배열의 오름차순 정렬. 비교 함수의 반환값이 0보다 작으면 a를 우선하여 정렬한다.

points.sort((a, b) => b - a);
// 숫자 배열의 내림차순 정렬. 비교 함수의 반환값이 0보다 작으면 b를 우선하여 정렬한다.

```
- 비교 함수의 반환값이 0인 경우의 정렬 방식은 ECMAScript 사양에 명시되어 있지 않다. 자바스크립트 엔진마다 동작이 다를 수 있다.

### 문자열 정렬하기

```js
const todos = [
  { id: 4, content: "JS" },
  { id: 1, content: "HTML" },
  { id: 2, content: "CSS" },
]

// 비교 함수
function compare(key) {
  return (a, b) => (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0))
}
// 프로퍼티 값이 문자열인 경우 마이너스 산술 연산을 사용하면 NaN이 나오므로 비교 연산을 사용한다.
// 비교 함수는 양수/음수/0을 반환하면 되므로 마이너스 산술 연산 대신 비교 연산을 사용할 수 있다.
```

## sort 메서드의 정렬 알고리즘
- sort 메서드는 quicksort 알고리즘을 사용했었다. quicksort 알고리즘은 동일한 값의 요소가 중복되어 있을 때 초기 순서가 변경될 수 있는 불안정한 정렬 알고리즘으로 알려져 있다.
- ECMAScript 2019(ES10)에서는 timsort 알고리즘을 사용하도록 바뀌었다.