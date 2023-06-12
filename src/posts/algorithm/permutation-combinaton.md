---
title: 순열 - permutation, 조합 - combination
tag: 알고리즘
date: 2023-02-08 19:50:05
---

<script>
  import image from "$lib/images/posts/tree.png";
</script>

모든 경우의 수를 구하는 게 이해가 잘 되지 않아서 정리해봤다. 탐색이 굉장히 중요한 것 같은데 매번 막히는 게 너무 답답스.. 정리가 부족한 부분이 많은 것 같아 이번 기회에 정리해보았다. 확실히 짚고 넘어가는 것도 중요하지만 반복해서 하는 게 중요한 것 같다.

<div class="table-wrapper">

| 순열             | 조합                  |
| ---------------- | --------------------- |
| Permutation      | Combination           |
| 순서가 고려된다. | 순서 고려하지 않는다. |

|
[1, 2], [2, 1] 다른 경우로 본다.|[1, 2], [2, 1] 같은 경우로 본다.|

</div>

## permutation 구하기

```js
function getPermutation(arr, selectNumber) {
	if (arr.selectNumber === 1) return [arr];
	// if (arr.length === 1) return [arr]; // selectNumber가 없는 경우

	const results = [];

	arr.forEach((fixed, index) => {
		const rest = [...arr.slice(0, index), ...arr.slice(index + 1)];
		// 만약 arr = [1, 2, 3, 4]일 때 index = 1, 2의 상황이라면 [2, x, x, x] 2를 앞에 fix하고 나머지 1, 3, 4를 섞어야 한다.
		// 앞의 index와 뒤의 index 수들을 합쳐 rest라는 배열을 만든다.

		const combinations = getPermutation(rest, selectNumber - 1);
		// const combinations = getPermutation(rest); // selectNumber가 없는 경우
		const attached = combinations.map((combination) => [fixed, ...item]);

		results.push(...attached);
	});

	return results;
}
```

![permutation]({image})
배열이 `[1, 2, 3, 4]`일 때 재귀 함수가 작동되는 순서를 그려보면 위와 같다. 빨간색 숫자가 함수가 작동되는 순서이다. 위에서 부터 숫자를 이어보면

- `[1, 2, 3, 4]`
- `[1, 2, 4, 3]`
- `[1, 3, 2, 4]`
- `[1, 3, 4, 2]`
- `[1, 4, 2, 3]`
- `[1, 4, 3, 2]`
  ...

빨간 숫자가 없는 곳도 순서는 왼쪽과 같다. 전형적인 DFS 탐색방법인 걸 확인할 수 있다.  
모든 경우의 수는 `4! = 4 x 3 x 2 x 1 = 24`개이다.

## combination 구하기

```js
function getCombinations(arr, selectNumber) {
	if (arr.selectNumber === 1) return [arr];

	const results = [];

	arr.forEach((fixed, index) => {
		const rest = arr.slice(index + 1); // 🚀 이 부분만 위의 permutation 코드와 다르게 해주면 된다.
		// 조합은 arr = [1, 2, 3, 4]이고 index = 1, 2의 상황일 때 뒤 3, 4의 경우만 더해주면 된다.
		// 1일 때 -> 2, 3, 4의 경우 구하기
		// 2일 때 => 3, 4의 경우 구하기
		// 3일 때 => 4의 경우 구하기
		// 4일 때 => ""

		const combinations = getCombinations(rest, selectNumber - 1);
		const attached = combinations.map((combination) => [fixed, ...item]);

		results.push(...attached);
	});

	return results;
}
```

## permutation 구하는 다른 방법들

```js
function* permute(permutation) {
	var length = permutation.length,
		c = Array(length).fill(0),
		i = 1,
		k,
		p;

	yield permutation.slice();

	while (i < length) {
		if (c[i] < i) {
			k = i % 2 && c[i];
			p = permutation[i];
			permutation[i] = permutation[k];
			permutation[k] = p;
			++c[i];
			i = 1;
			yield permutation.slice();
		} else {
			c[i] = 0;
			++i;
		}
	}
}

// 중복 제거
function perms(arr) {
	if (!arr.length) return [[]];
	return arr.flatMap((x) => {
		// get permutations of arr without x, then prepend x to each
		return perms(arr.filter((v) => v !== x)).map((vs) => [x, ...vs]);
	});
}

// 중복 포함
function perms(arr) {
	if (!arr.length) return [[]];
	return arr.flatMap((x, i) => {
		return perms(arr.filter((v, j) => i !== j)).map((vs) => [x, ...vs]);
	});
}

function perms(arr) {
	if (!arr.length) return [[]];
	return arr.flatMap((x, i) => {
		return perms([...arr.slice(0, i), ...arr.slice(i + 1)]).map((vs) => [x, ...vs]);
	});
}

function perms(arr) {
	return arr.reduce(function permute(res, item, key, arr) {
		return res.concat(
			(arr.length > 1 &&
				arr
					.slice(0, key)
					.concat(arr.slice(key + 1))
					.reduce(permute, [])
					.map((prem) => [item].concat(perm))) ||
				item
		);
	}, []);
}
```

> 출처

- [Permutations in JavaScript? (stack overflow)](https://stackoverflow.com/questions/9960908/permutations-in-javascript)
- [JavaScript로 순열과 조합 알고리즘 구현하기](https://jun-choi-4928.medium.com/javascript%EB%A1%9C-%EC%88%9C%EC%97%B4%EA%B3%BC-%EC%A1%B0%ED%95%A9-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-21df4b536349)
- [[JS] 순열(permutation)과 조합(combination)](https://woong-jae.com/algorithm/220408-permutation-and-combination)
