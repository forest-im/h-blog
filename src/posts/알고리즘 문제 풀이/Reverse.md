---
title: Leetcode 7. Reverse Integer
tag: 알고리즘-문제-풀이, leetcode, Grind 75, Number
date: 2023-02-07 10:46:58
---

<div class="table-wrapper">

| Date       | Link                                                       | Time to solve | Submissions       |
| ---------- | ---------------------------------------------------------- | ------------- | ----------------- |
| 2023.02.06 | https://leetcode.com/problems/reverse-integer/description/ | 00:40:00      | 0 fail 1 Accepted |

</div>

## First to solve

```js
const reverse = function (x) {
	const range = 2147483648;
	// range = 2 ** 31 또는 Math.abs(2, 31)로 써도 됨
	const isNegative = x < 0 ? -1 : 1;

	const reverseXToString = String(x * isNegative)
		.split("")
		.reverse()
		.join("");
	const reverseX = Number(reverseXToString) * isNegative;

	if ((reverseX && reverseX > range) || (reverseX <= 0 && reverseX < range * isNegative)) return 0;

	return reverseX;
};
```

- 시간 복잡도 O(n)
- 공간 복잡도 O(n) (배열 변수 사용)

```js
var reverse = function (x) {
	const isNegative = x < 0;
	x = Math.abs(x);
	let reverse = 0;

	while (x > 0) {
		const num = x % 10;
		x = Math.floor(x / 10);
		reverse *= 10;
		reverse += num;
	}

	if (reverse > 2 ** 31) return 0;

	return isNegative ? reverse * -1 : reverse;
};
```

- 시간 복잡도 O(log(x))
- 공간 복잡도 O(1)

- `x % 10`으로 끝에서 부터의 값을 구할 수 있음
- `x / 10`으로 끝에서 부터 자릿수를 제거
- 10을 곱해서 `reverse`의 자릿수를 늘림
- 자릿수 늘린 후 reverse에 값을 더함
