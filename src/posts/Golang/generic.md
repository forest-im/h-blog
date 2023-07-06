---
title: golang - Generic, Map 정리
tag: golang
date: 2023-02-16 19:45:39
---

## Generic 프로그래밍

- 최강타입 언어

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

<!-- - [자주 쓰는 타입 정의된 패키지](golang.org/x/exp/constraints) -->

- type Complex
- type Float
- type Integer
- type Ordered
- type Signed
- type Unsigned

## Map

- 해시테이블을 구현한 자료구조
- Go 언어는 Map 타입 내장하고 있음
  - `map[Key타입]Value타입`과 같이 선언할 수 있다.

### map 선언하기

```
var idMap map[int]string
```

- 정수를 key로 갖고, string을 값으로 받는 맵
- 선언된 변수 idMap은 nil 값을 갖는다. -> `Nil Map`이라 부른다.
  - Nil map에는 어떤 데이터를 쓸 수 없음 map을 초기화하기 위해 make()함수를 사용할 수 있다.

### make 이용해서 초기화

```
idMap = make(map[int]string)
```

### 리터럴 사용해서 초기화

```
tickets := map[string]string {
  "GOOG": "Google Inc",
  "MSFT": "Microsoft",
  "FB": "FaceBook",
}
```

```js
func main() {
  var m map[int]stirng

  m = make(map[int]string)

  // 추가 혹은 갱신
  m[901] = "Apple"
  m[134] = "Grape"
  m[777] = "Tomato"

  // 키에 대한 값 읽기
  str := m[134]
  println(str)

  noData := m[999] // 값이 없으면 nil 혹은 zero 리턴
  println(noData)

  // 삭제
  delete(m, 777)
}
```

### Map 키 체크

- `map변수[키]`읽기를 수행할 때 2개의 리턴값을 리턴한다.
  - 1. 키에 상응하는 값
  - 2. 그 키가 존재하는지 아닌지를 나타내는 bool 값

```js
func main() {
  tickets := map[string]string {
    "GOOG": "Google Inc",
    "MSFT": "Microsoft",
    "FB": "FaceBook",
  }

  val, exists := tickers["MSFT"]
  if !exists {
    println("No MSFT ticker")
  }
}
```

### for 루프를 사용한 Map 열거

- `Map` 컬렉션에 for range를 사용하면, Map 키와 Map 값 2개의 데이타를 리턴함.
- Map은 unordered이므로 순서는 무작위다.

```
func main() {
  myMap := map[string]string {
    "A": "Apple",
    "B": "Banana",
    "C": "Charlie",
  }

  for key, val := range myMap {
    fmt.Println(key, val)
  }
}
```

## SOLID

- 객체지향 설계 5가지 원칙의 약자

- 단일 책임 원칙 single responsibility principle, SRP
- 개방-폐쇄 원칙 open-closed principle, OCP
- 리스코프 치환 원칙 liskov substitution principle, LSP
- 인터페이스 분리 원칙 interface segregation principle, ISP
- 의존 관계 역전 원칙 dependency inversion principle, DIP
