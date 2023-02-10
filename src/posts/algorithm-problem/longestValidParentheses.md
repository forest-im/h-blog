---
title: Leetcode 32. Longest Valid Parentheses
tag: 알고리즘-문제-풀이, leetcode, Grind 75, stack
date: 2023-02-10 15:56:39
---

|Date|Link|Time to solve|Submissions|
|-|-|-|
|2023.02.11|https://leetcode.com/problems/longest-valid-parentheses/|x|Fail|

저번에도 못풀었던 문제인데 다시 풀어도 못풀었다. 그 때 완벽히 이해하고 넘어가지 않고, 답만 이해하고 넘어가서 그런듯..  
이 문제의 핵심은 이전 위치를 기억하고 있는 것이다. stack을 이용하려고 할 때 거리를 기억해야 한다면 index를 넣어준다는 것..

- 풀 수 있는 방법
  - stack
  - dp
  - counting 이용

## Stack solution

```js
var longestValidParentheses = function(s) {
  const stack = [];
  let current = 0;
  let result = 0;

  for (let i = 0; i < s.length; i++) {
      if (s[i] === "(") {
          stack.push(i - current);
          current = 0;
          continue;
      }

      if (stack.length) {
          current = i - stack.pop() + 1;
          result = Math.max(result, current);
      } else {
          current = 0;
      }
  }

  return result;
};
```
- 태욱님 로직..👍
- 이전 위치를 기억하기 위해서 current 변수를 사용한다.
- 열린 괄호일 때 i - current를 넣어 이전 위치를 기억한다. 연속된 valid 괄호일 경우 current가 계속 업데이트 될 것임으로 current를 0으로 초기화해준다. (초기화하지 않으면, `()((())))(()` 의 경우에 잘못된 결과가 나온다.)
- 닫힌 괄호가 나왔을 때 stack에 아무것도 없는 경우는 맞지 않는 경우이므로 current를 0으로 초기화해준다.

```js
var longestValidParentheses = function(s) {
  const stack = [-1];
  let result = 0;

  for (let i = 0; i < s.length; i++) {
      if (s[i] === "(") {
          stack.push(i);
          continue;
      }

      stack.pop();

      if (stack.length) {
          result = Math.max(result, i - stack[stack.length - 1]);
      } else {
          stack.push(i);
      }
  }

  return result;
};

```
- 여기서 핵심은 미리 stack에 초기 index (-1)를 넣어줘서 완전한 괄호가 나와서 끝났을 때에도 위치를 기억할 수 있게 해주는 부분이다.
- `s[i]`가 ")"일 때 stack안에 아무것도 없다는 건 앞의 ( 개수보다 뒤의 ) 개수가 더 많다는 것. stack안에 아무것도 없을 때 s[i]의 index를 넣어줘서 열린 괄호가 나오기 전의 위치를 표시한다.


## Count Solution

```js
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    let left = 0;
    let right = 0;
    let result = 0;

    for (let cha of s) {
        if (cha === '(') {
            left++;
        } else {
            right++;
        }

        if (left < right) {
            left = 0;
            right = 0;
        }

        if (left === right) {
            result = Math.max(result, right * 2);
        }
    }

    left = 0;
    right = 0;

    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === ')') {
            right++;
        } else {
            left++;
        }

        if (right < left) {
            left = 0;
            right = 0;
        }

        if (right === left) {
            result = Math.max(result, left * 2);
        }
    }

    return result;
};
```


