---
title: Generic
tag: golang
date: 2023-02-16 19:45:39
published: false
---

## Generic 프로그래밍
- 최강타입 언어라서 좀 귀차나

```js
package main

import "fmt"

func min(a, b int) int {
	if a < b {
		return a
	}

	return b
}

func minF32(a, b float32) float32 {
	if a < b {
		return a
	}

	return b
}

func main() {
	var a int = 10
	var b int = 20
	fmt.Println(min(a, b))

	var c int16 = 10
	var d int16 = 20
	fmt.Println(min(c, d))           // go는 최강타입이라서 타입 변환을 자동으로 해주질 않는다.
	fmt.Println(min(int(c), int(d))) // go는 최강타입이라서 타입 변환을 자동으로 해주질 않는다.

	var e float32 = 3.14
	var f float32 = 3.98
	fmt.Println(minF32((e), (f)))

	// 실수를 정수로 바꿨을 때 소수점 탈락이라는 현상 발생 -> 대소 비교 잘 안됨

	// 이렇게 타입별로 만들어줘야 하는 상황이 발생 -> 귀찮고.. 효율적이지 않은..
}
```

```js
package main

import "fmt"

func print[T any](a T) { // 대괄호 안에서 타입 파라미터 (제네릭 타입을 정의한다) 다른 언어는 보통 꺽쇠
												 // [T(이름. 일반적으로 대문자 T) any, T2 any, T3 any]
	fmt.Println(a)

}
//  빈 인터페이스를 쓰면 다 됐는데 왜 제네릭을 써야할까?


func main() {
	var a int = 10
	print(a)
	var b float32 = 3.14
	print(b)
	var c string = "Hello"
	print(c)
}
```

```js
package main

func min(a, b interface{}) interface{} {
	if a < b { // 빈 인터페이스는 대소 비교를 지원하지 않는다.
		return a
	}

	return b
}

func main() {
	var a int = 10
	var b int = 20
	fmt.Println(min(a, b));
	
}
```

```js
package main

import "fmt"

func min[T any](a, b T) T { // T는 모든 타입이 올 수 있게 any지만 모든 타입이 대소 비교를 지원하지 않아서 작동하지 않음
	if a < b {
		return a
	}
	return b
}

func main() {
	var a int = 10
	var b int = 20
	fmt.Println(min(a, b));
	
}
```

```js
package main

import "fmt"

func min[T int | int16 | float32 | float64 | int64](a, b T) T {
	if a < b {
		return a
	}

	return b
}

func main() {
	var a int = 10
	var b int = 20
	fmt.Println(min(a, b))
}
```

## 타입 제한자
```js
package main

import "fmt"

type Integer interface {
	int | int8 | int16 | int32 | int64
}
// 타입 제한자도 interface처럼 동작한다고 해서 interface 용어를 사용한다.

type Float interface {
	float32 | float64
}

type Numeric interface {
	Integer | Float
}

func min[T Numeric | Float](a, b T) T {
	if a < b {
		return a
	}

	return b
}

func main() {
	var a int = 10
	var b int = 20
	fmt.Println(min(a, b))

	var c int16 = 10
	var d int16 = 20
	fmt.Println(min(c, d))

	var e float32 = 3.14
	var f float32 = 3.89
	fmt.Println(min(e, f))
}
```

- [자주 쓰는 타입 정의된 패키지](golang.org/x/exp/constraints)
  - type Complex
  - type Float
  - type Integer
  - type Ordered
  - type Signed
  - type Unsigned