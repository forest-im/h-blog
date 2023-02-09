---
title: Leetcode 179. Largest Number
tag: 알고리즘-문제-풀이, leetcode, Grind 75, sort
date: 2023-02-10 01:42:51
---

|Date|Link|Time to solve|Submissions|
|-|-|-|
|2023.02.10|https://leetcode.com/problems/largest-number/|01:10:00|3 fail 3 Runtime Error|

## First to solve -> Fail (Runtime Error)

```js
/**
 * @param {number[]} nums
 * @return {string}
 */

function permutation(arr, originalLength) {
  if (arr.length === 1) return [arr];

  const result = [];

  arr.forEach((fixed, index) => {
    const rest = [...arr.slice(0, index), ...arr.slice(index + 1)];
    const combinations = permutation(rest, originalLength);
    const attach = combinations.map((combination) => {
      if (arr.length !== originalLength) return [fixed, ...combination];

      return [fixed, ...combination].join("");
    });

    result.push(...attach);
  });

  return result;
}

const largestNumber = function (nums) {
  if (nums.length === 1 || (new Set(nums).size === 1 && nums[0] === 0))
    return nums[0] + "";

  let result = "";
  const keep = [];

  const sortNums = [...nums].sort().reverse();

  sortNums.forEach((num, index) => {
    const currentStringNum = num + "";

    if (keep.length) {
      if (keep[0][0] !== currentStringNum[0]) {
        result += permutation(keep, keep.length).sort().pop();
        keep.length = 0;
      } else if (index === sortNums.length - 1) {
        keep.push(currentStringNum);

        return result += permutation(keep, keep.length).sort().pop();
      } else {

        return keep.push(currentStringNum);
      }
    }

    if (
      index !== sortNums.length - 1 &&
      currentStringNum.charCodeAt(0) ===
        sortNums[index + 1].toString().charCodeAt(0)
    ) {

      return keep.push(currentStringNum);
    }

    return (result += currentStringNum);
  });

  return result;
};
```
1. 먼저 정렬한다.
2. 반복문을 돌면서 맨 앞자리가 같은 수가 있을 때 keep이라는 배열에 넣어준다.
3. 앞자리가 다른 수가 나왔을 때 keep 배열에 permutation 함수를 실행해서 경우의 수를 찾은 다음 제일 큰 수를 result 문자에 넣어주고 keep을 비워준다.
4. 반복

- 불필요한 조건문 처리도 있고 개략적으로 깔끔하게 풀지 못한 것 같다. if문 여러 개를 쓰다 보니 가독성도 좋지 못하다.
- 앞자리가 같을 경우에 같은 경우를 다 모아 순열을 구하는데 만약 정말 최악의 경우 앞자리가 같은 경우가 10개만 넘어도 몇 만이 넘는 경우의 수가 생겼다. 굉장히 비효율적인 코드.. 반성해라..

- 시간 복잡도 O(n!)🫢
- 공간 복잡도 O(n! × n)

## 코드스타일 개선
```js
if (nums.length === 1 || (new Set(nums).size === 1 && nums[0] === 0))
    return nums[0] + "";


if (
    nums.length === 1
    || (new Set(nums).size === 1 && nums[0] === 0)
) {
    return nums[0] + "";
}

// 로직 밑처럼 간소화 시켜보기

let keep = [];

[9, 5, 34, 30, 3]
  .sort()
  .reverse()
  .forEach((num, idx, arr) => {
    if (
      num.toString()[0] === arr[idx + 1]?.toString()[0]
    ) {
      keep.push(num);
    } else {
      result += (keep.permutation().sort().pop()) + "" + num + "";
      keep = [];
    }
  });
```
- 코드 리뷰 받은 걸 토대로 개선해보기.

## Solution
sort하나로 다 해결가능한 문제였다니.. 너무 놀라웠고.. sort에 대해 정말 모르는구나 느꼈다.

```js
const largestNumber = (nums) => {
  if (
    nums.length === 1
    || (new Set(nums).size === 1 && nums[0] === 0)
  ) {
      return nums[0] + "";
  }

  return nums.sort((a, b) => `${b}${a}` - `${a}${b}`).join("");
}
```
