---
title: Leetcode 53. Maximum Subarray
tag: 알고리즘-문제-풀이, leetcode, DP
date: 2023-07-11 17:13:41
---

<div class="table-wrapper" markdown="block">

| Date       | Link                                                        | Time to solve | Submissions |
| ---------- | ----------------------------------------------------------- | ------------- | ----------- |
| 2023.07.11 | https://leetcode.com/problems/maximum-subarray/description/ | x             | Fail        |

</div>

Time Limit Exceeded

- 처음엔 Bruth Force 방식으로 접근하고 실패했다.
- 그 이후에는 한 번 순회하면서 값이 양수가 없을 경우 제일 큰 값을 바로 반환하고, 양수값의 index를 배열에 저장한 후 그 index들 부터 마지막 양수 index까지 순회하는 방법을 적용했다. 이것도 실패

## Kadane 알고리즘

- 카데인 알고리즘은 다이나믹 프로그래밍을 적용한 방식
- 배열 또는 리스트에서 최대 부분합을 구하는 알고리즘
- 각 단계에서 현재 요소와 이전까지의 부분합을 비교하면서 부분합을 갱신해 나가는 방식으로 동작한다. 배열을 한 번 순회하면서 최대 부분합을 계산한다.

### Dynamic programming

- 주어진 문제를 풀기 위해서, 문제를 여러 개의 하위 문제로 나누어 푼 다음, 그것을 결합하여 최종적인 목적에 도달하는 것
- 큰 문제를 작은 문제로 쪼개어 해겨랗고, 한번 풀었던 문제는 어딘가에 저장해두었다가 반복하여 풀지 않는 것
- 하위 문제의 수가 기하급수적으로 증가할 때 유용하다.

- Bruth Force 방식의 문제점은 이미 카운팅 한 값들을 다시 카운팅 해야한다는 점에서 효율적이지 못하다는 것이다.
- 각각의 부분 배열의 합은 이전 부분 배열의 합에 현재의 인덱스 값을 더한 값이기 때문에, 이전 부분 배열의 합과 현재의 인덱스를 비교해 큰 값을 인덱스 자리에 할당한다면 O(n^2)으로 순회하지 않고도 가장 큰 값을 구할 수 있게 된다.

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

### 참고

- [Maximum subarray problem by wikipedia](<https://en.wikipedia.org/wiki/Maximum_subarray_problem#Kadane's%20algorithm%20(Algorithm%203:%20Dynamic%20Programming)>)
