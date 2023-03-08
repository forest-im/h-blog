---
title: 함수 고급편
tag: golang
date: 2023-02-16 00:57:38
published: false
---

## 가변 인수 함수 (...)

```js
package main

import "fmt"

func sum(nums ...int) int {
	sum := 0

	fmt.Printf("nums 타입: %T\n", nums)

	for _, v := range nums {
		sum += v
	}

	return sum
}

func main() {
	fmt.Println(sum(1, 2, 3, 4, 5))
	fmt.Println(sum(10, 20))
	fmt.Println(sum())
}
```

```js
package main

import "fmt"

func sum(nums []int) int {
	sum := 0

	fmt.Printf("nums 타입: %T\n", nums)

	for _, v := range nums {
		sum += v
	}

	return sum
}

func main() {
	fmt.Println(sum([]int{1, 2, 3, 4, 5}))
	fmt.Println(sum([]int{10, 20}))
	fmt.Println(sum([]int{}))
}
```
- 위 두 개는 같음
- 모든 타입은 빈 인터페이스로

## defer 지연 실행
- `defer 명령문`
- 함수 종료 전에 실행을 보장한다.