---
title: Dynamic Programming
description: 와 진쫘 어렵눼
tag: Dynamic Programming
date: 2023-07-11 17:13:41
---

### Dynamic programming

- 작은 단위로 쪼갠다.
- 문제 크기를 작은 단위의 문제로 생각해보는 것
- 점화식을 만드는 게 중요하다.
- 다이나믹 테이블이 필요하다. dy 배열을 0으로 초기화
- dp는 원리를 아는 것이 중요하다.

- 주어진 문제를 풀기 위해서, 문제를 여러 개의 하위 문제로 나누어 푼 다음, 그것을 결합하여 최종적인 목적에 도달하는 것
- 큰 문제를 작은 문제로 쪼개어 해겨랗고, 한번 풀었던 문제는 어딘가에 저장해두었다가 반복하여 풀지 않는 것
- 하위 문제의 수가 기하급수적으로 증가할 때 유용하다.

- Bruth Force 방식의 문제점은 이미 카운팅 한 값들을 다시 카운팅 해야한다는 점에서 효율적이지 못하다는 것이다.
- 각각의 부분 배열의 합은 이전 부분 배열의 합에 현재의 인덱스 값을 더한 값이기 때문에, 이전 부분 배열의 합과 현재의 인덱스를 비교해 큰 값을 인덱스 자리에 할당한다면 O(n^2)으로 순회하지 않고도 가장 큰 값을 구할 수 있게 된다.

### Kadane 알고리즘

- 카데인 알고리즘은 다이나믹 프로그래밍을 적용한 방식
- 배열 또는 리스트에서 최대 부분합을 구하는 알고리즘
- 각 단계에서 현재 요소와 이전까지의 부분합을 비교하면서 부분합을 갱신해 나가는 방식으로 동작한다. 배열을 한 번 순회하면서 최대 부분합을 계산한다.

### 정리

1. 현재 요소를 현재 부분합에 추가한다.
2. 현재 부분합이 이전까지의 부분합보다 크다면, 현재 부분합을 최대 부분합으로 업데이트한다.
3. 현재 부분합이 음수가 되면, 현재 요소부터 다시 부분합을 시작한다.

```js
const maxSubArray = function (nums) {
	for (let i = 1; i < nums.length; i++) {
		nums[i] = Math.max(nums[i], nums[i] + nums[i - 1]);
	}

	return Math.max(...nums);
};
```

## Dynamic Programming 문제 리스트 (Feat. GPT)

### LeetCode

- 53. Maximum Subarray

  - 푼 시간: 1시간 30분
  - Time Limit Exceeded
  - 처음엔 Bruth Force 방식으로 접근하고 실패했다.
  - 그 이후에는 한 번 순회하면서 값이 양수가 없을 경우 제일 큰 값을 바로 반환하고, 양수값의 index를 배열에 저장한 후 그 index들 부터 마지막 양수 index까지 순회하는 방법을 적용했다. 이것도 실패

- 54. Climbing Stairs
  - 푼 시간: 5분
  - 법칙을 알아내니 금방 풀렸다.
- 55. Unique Paths
- 56. Coin Change
- 198. House Robber

### 프로그래머스

- 정수 삼각형(Triangle)
- 도둑질(House Robber)
- N으로 표현
- 등굣길

### 참고

- [Maximum subarray problem by wikipedia](<https://en.wikipedia.org/wiki/Maximum_subarray_problem#Kadane's%20algorithm%20(Algorithm%203:%20Dynamic%20Programming)>)

## RsJS

Observer 패턴과 Iterator 패턴을 결합하고 함수형 프로그래밍을 컬렉션과 결합하여 이벤트 시퀀스를 관리

- 이벤트용 Lodash?
- Observable을 생성하는 패턴은 Promise를 만들어내는 방식과 매우 흡사. 사실 Observable은 Promise의 상위 호환이다.
- Promise로 만들 수 있는 값은 Observable 방식으로도 생성이 가능하다.
- RxJS는 Array와 Promise 성질을 모두 가진 이벤트를 다루는 새로운 객체타입 Observable을 제공하는 라이브러리이다.
- 이 객체는 Array의 메소드(map, filter)와 같은 연산자를 제공하며 이를 통해 비동기 이벤트를 컬렉션 다루듯이 처리할 수 있게 만들어준다.

- 평면적인 배열, 시간의 흐름, 사용자의 동작, 네트워크 요청의 결과까지 전부 스트림. 즉 흐름으로 만들어서 파이프라인에 흘려보내 처리한다.

## WebRTC

## Module CSS vs CSS in JS

### CSS-module

CSS 모듈은 CSS를 모듈화 하여 사용하는 방식이다. CSS 클래스를 만들면 자동으로 고유한 클래스네임을 만들어서 scope를 지역적으로 제한한다.
CSS 모듈은 동일 프로젝트 소스 안에 CSS 클래스 이름이 중복되어도 새로운 이름이 입혀져 중복 및 관리의 위험성이 적고 CSS 네이밍 규칙이 간소화된다. 다만 한 곳에서 모든 것을 작성하지 않기 때문에 별도로 많은 CSS 파일을 만들어 관리해야 하는 단점이 있다.

- `{이름}.module.css`
- 클래스명이 충돌하는 단점 극복 가능

### 출처 및 참고

- [웹 컴포넌트 스타일링 관리 : CSS-in-JS vs CSS-in-CSS](https://www.samsungsds.com/kr/insights/web_component.html)
