---
title: 슬라이스
tag: golang
date: 2023-02-14 00:44:26
published: false
---

## 슬라이스
- Go에서 제공하는 동적 배열 타입 -> __슬라이스는 Go에서 제공하는 배열을 가리키는 포인터 타입이다.__
- 배열의 포인터와 다른 점은 길이가 바뀔 수 있다는 점
- 동적: 배열의 사이즈가 런타임에 바뀔 수 있다.
- 정적: 빌드 타임에 결정

### 슬라이스 선언
```
var slice []int
```

```js
package main

import "fmt"

func main() {
	var slice []int

	if len(slice) == 0 {
		fmt.Println("slice is empty", slice)
	}

	slice[1] = 10
	// 없는 값에 접근해서 에러 남
	fmt.Println(slice)
  // slice is empty []
  // panic: runtime error: index out of range [1] with length 0

  // goroutine 1 [running]:
  // main.main()
}
```

## 슬라이스 초기화
```
var slice1 = []int{1, 2, 3}
var slice2 = []int{1, 5:2, 10:3}
```

### 주의사항
```
var array = [...]int{1, 2, 3}
	-> 배열이다
var slice = []int{1, 2, 3}
	-> 슬라이스
```

### Make()를 이용한 초기화
```
var slice = make([]int, 3)
slice := []int{0, 0, 0} 이것과 같음
```
- slice 또는 Map을 만들 때 사용한다.

## 슬라이스 순회
- 배열과 같음

## 슬라이스 요소 추가 append()사용
- 슬라이스는 동적으로 요소를 추가할 수 있다.
- 새로운 슬라이스를 반환해준다.
- 새 슬라이스 반환 없이 하려면 바꿔줘야한다.

### 여러 요소 추
- `slice = append(slice, 3, 4, 5, 6, 7)`

## 슬라이스 동작원리
```js
type SliceHeader struct {
	Data uintptr // 실제 배열을 가리키는 포인터
		-> 실제 배열이 따로 있다는 점
	Len int	// 요소 개수
	Cap int // 실제 배열의 길이
		-> Capacity의 약자
}
```

## make() 함수 인자
```js
var slice2 = make([]int, 3, 5)
// 첫 번째 인자 = Len
// 두 번째 인자 = Cap (최대 길이)
```

## 슬라이스 vs 배열

```js
package main

import "fmt"

func changeArray(array2 [5]int) {
	array2[2] = 200
}

func changeSlice(slice2 []int) {
	slice2[2] = 200
}

func main() {
	array := [5]int{1, 2, 3, 4, 5}
	slice := []int{1, 2, 3, 4, 5}

	changeArray(array)
	changeSlice(slice)

	fmt.Println(array) // [1 2 3 4 5]
	fmt.Println(slice) // [1 2 200 4 5]

}
```
- 함수 인자로 들어가는 건 __값__ 으로 동작해서 array[2]는 바뀌지 않음

- 슬라이스는 배열이 아니고, 배열을 가리키는 24바이트 structure이다.

### append() 동작 원리
- `append()`는 슬라이스에 요소를 추가한 새로운 슬라이스를 반환
- 기존 슬라이스가 바뀔 수도 있고 아닐수도 있다.
- 빈 공간이 있냐 없냐에 따라 배열을 만들거나 안만든다.

```js
package main

import "fmt"

func addNum(slice *[]int) {
	*slice = append(*slice, 4)
}

func main() {
	slice := []int{1, 2, 3}
  addNum(&slice)

	fmt.Println(slice)
}
```

```js
package main

import "fmt"

func addNum(slice []int) []int {
	slice = append(slice, 4)
	return slice
}

func main() {
	slice := []int{1, 2, 3}
  slice = addNum(&slice)

	fmt.Println(slice)
}
```
- pointer를 사용하면 복사가 많이 안 일어난다는 장점은 있지만 복사해서 메모리를 더 쓰긴 하지만 별 의미는 없음
- 하지만 slice를 쓸 때는 값 타입으로 쓰는 게 더 나을 수 있음

## 슬라이싱
- 슬라이싱은 배열의 일부를 집어내는 기능
- 슬라이싱의 결과가 슬라이스이다.

### 슬라이싱 사용법
```
array[startIndex:endIndex]
-> endIndex 전 까지

[1][2][3][4][5]
array[1:4] => [2][3][4]

-> 잘라서 새로운 배열을 반환하는 것이 "아님"
 ---
|Data
 ---
|Len = 4 - 1(endIndex - startIndex)
 ---
|Cap = 5 - 1(전체 길이 - startIndex)
	->원 배열 전체에서 쓸 수 있는 만큼 가져옴
```

```js
package main

import "fmt"

func main() {
	array := [5]int{1, 2, 3, 4, 5}

	slice := array[1:2]
	fmt.Println("array:", array)
	fmt.Println("slice:", slice, len(slice), cap(slice))

	// array: [1 2 3 4 5]
	// slice: [2] 1 4

	slice[0] = 100
	fmt.Println("array:", array) // array: [1 100 3 4 5]

	slice = append(slice, 500)
	fmt.Println("After append 500")
	fmt.Println("array:", array)
	fmt.Println("slice:", slice, len(slice), cap(slice))

	// array: [1 100 500 4 5]
	// slice: [100 500] 2 4
}
```

### 슬라이스를 슬라이싱
```
slice1 := []int{1, 2, 3, 4, 5}
slice2 := slice1[1:2]

[1][2][3][4][5]

slice1
 ------
|포인터
 ------
|len: 5
 ------
|cap: 5
 ------

slice2
 ------
|포인터
 ------
|len: 1
 ------
|cap: 4
 ------
```
- 파이썬에서는 슬라이싱하면 새로운 배열이 나오지만 Go에서는 그렇지 않음

### 끝까지 슬라이싱하기
```
slice1 := []int{1, 2, 3, 4, 5}
slice2 := slice1[2:len(slice1)] // [3, 4, 5]
 -> slice2 := slice[2:] 와 같다.
 -> slice[2:-1] 안됨
 -> slice[2:len(slice1) -1 ] 이렇게 해줘야 함.
```

- Go에서는 끝 index를 꼭 적어줘야한다. js처럼 -1 이런 거 안됨

### 전체 슬라이싱
```
array := [5]int{1, 2, 3, 4, 5}
slice := array[:]
```
- 배열을 슬라이스로 바꾸고 싶을 때


```js
package main

import "fmt"

func main() {
	array := [100]int{1: 1, 2: 2, 99: 100}
	slice1 := array[1:10]

	slice2 := slice1[2:99]
	fmt.Println(slice1)
  // [1 2 0 0 0 0 0 0 0]
	fmt.Println(slice2)
  // [0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 100]
}
```
- 슬라이싱할 땐 슬라이스를 보는 게 아닌 슬라이스가 가리키고 있는 배열을 가리킨다.

### 캡사이즈 조절 슬라이싱
```
slice[시작인덱스 : 끝인덱스: 최대인덱스]

slice1 := []int{1, 2, 3, 4, 5}
slice2 := slice1[1:3:4]

-> cap 사이즈는 3이 된다.  (최대인덱스 - 시작인덱스)
```

### 유용한 슬라이싱 기능 - 복사
```js
func main() {
  slice1 := []int{1, 2, 3, 4, 5}
  slice2 := slice1[:]

  slice2[1] = 100
  fmt.Println(slice1); // [1, 100, 3, 4, 5]
}
// 덮어 씌워짐
```
- 슬라이스를 그대로 복사해서 새로운 슬라이스를 만들면 두 슬라이스가 서로 영향을 주지 않음

#### for문으로 하나씩 복사
```js
func main() {
	slice1 := []int{1, 2, 3, 4, 5}
	slice2 := make([]int, len(slice1))

	for i, v := range slice1 {
		slice2[i] = v
	}

	slice2[1] = 100
	fmt.Println("slice1", slice1)
	fmt.Println("slice2", slice2)
	// slice1 [1 2 3 4 5]
	// slice2 [1 100 3 4 5]
}
```

#### append 이용
```js
func main() {
	slice1 := []int{1, 2, 3, 4, 5}
	slice2 := append([]int{}, slice1...)
	// 비어있는 슬라이스에 append

	slice2[1] = 100
	fmt.Println("slice1", slice1)
	fmt.Println("slice2", slice2)
}
```
- `slice1...` 전체 element
- append는 명확하지 않음

#### copy 이용
```js
func main() {
	slice1 := []int{1, 2, 3, 4, 5}
	slice2 := make([]int, len(slice1))
	// copy(목적지, src)
	copy(slice2, slice1)

	slice2[1] = 100
	fmt.Println("slice1", slice1)
	fmt.Println("slice2", slice2)
}
```
- copy는 명확하게 보임 (하고자 하는 게 뭔지)

## 요소 삭제
```
[1][2][3][4][5][6] 4를 제거하기
[1][2][3][5][6][6] 5부터 하나씩 왼쪽으로 옮김
[1][2][3][5][6] 6 제거하기
```

### for 사용

```js
func main() {
	slice1 := []int{1, 2, 3, 4, 5, 6}
	idx := 2 // 2번째 인덱스 제거

	for i := idx + 1; i < len(slice1); i++ {
		slice1[i-1] = slice1[i]
	}

	slice1 = slice1[:len(slice1)-1]
	fmt.Println(slice1) // [1 2 4 5 6]
}
```

### copy 사용
```
func main() {
	slice1 := []int{1, 2, 3, 4, 5, 6}
	idx := 2 // 2번째 인덱스 제거

	copy(slice1[idx:], slice1[idx+1:])

	slice1 = slice1[:len(slice1)-1]
	fmt.Println(slice1)
}
```

### append 사용
```js
func main() {
	slice1 := []int{1, 2, 3, 4, 5, 6}
	idx := 2 // 2번째 인덱스 제거

	slice1 = append(slice1[:idx], slice1[idx+1:]...)
	// idx 전까지 넣고, idx + 1부터 끝까지 넣음

	fmt.Println(slice1) // [1 2 4 5 6]
}
```

## 요소 삽입
```
[1][2][3][4][5][6] <- [100] index 2 자리에 삽입

[1][2][3][3][4][5][6] 3부터 뒤로 한 칸씩 복사한다.

[1][2][100][3][4][5][6]
```

### for문 사용
```js
func main() {
	slice := []int{1, 2, 3, 4, 5, 6}
	slice = append(slice, 0)
	idx := 2

	for i := len(slice) - 1; i > idx; i-- {
		slice[i] = slice[i-1]
	}

	fmt.Println(slice) // [1 2 3 3 4 5 6]

	slice[idx] = 100
	fmt.Println(slice) // [1 2 100 3 4 5 6]
}
```

### append 사용
```js
func main() {
	slice := []int{1, 2, 3, 4, 5, 6}
	idx := 2
	slice = append(slice[:idx], append([]int{100}, slice[idx:]...)...)

	fmt.Println(slice) // [1 2 100 3 4 5 6]
}
```

- `append([]int{100}, slice[idx:]...)`는 임시 버퍼이다. 즉 중간에 메모리를 한 번 더 썼다. 앞의 for문의 방법보다 덜 효율적이다.

### copy 사용
```js
func main() {
	slice := []int{1, 2, 3, 4, 5, 6}
	idx := 2

  slice = append(slice, 0)
  copy(slice[idx+1:], slice[idx:]) // [1 2 3 3 4 5 6]
  slice[idx] = 100

	fmt.Println(slice) // [1 2 100 3 4 5 6]
}
```
- 불필요한 메모리 할당 없이 하는 방법

## 슬라이스 정렬
```js
package main

import (
	"fmt"
	"sort"
)

func main() {
	slice := []int{1, 2, 7, 5, 3, 4}

	sort.Ints(slice)
	fmt.Println(slice)
}
```
