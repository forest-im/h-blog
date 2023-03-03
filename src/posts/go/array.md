---
title: 배열
tag: golang
date: 2023-02-12 17:43:45
published: false
---

## 배열
- 배열은 같은 타입의 데이터들로 이루어진 타입
- 배열은 연속된 메모리다.
- 컴퓨터는 인덱스와 타입 크기를 사용해서 메모리 주소를 갖는다.

```js
  var 변수명 [요소 개수]int
  var t [5]float64

  func main() {
    var t [5]float64 = [5]float64{24.0, 25.9, 23.6}

    for i := 0; i < 3; i++ {
      fmt.Println(t[i])
    }
  }

  days := [3]string{"monday", "tuesday", "wednesday"}

  var temps [5]float64 = [5]float64{24.3, 26.7}
  // 나머지는 기본값으로 채워짐

  var s = [5]int{1:10, 3:30}
  // index 1에 해당하는 곳에 10을 넣어라
  // 특정 인덱스의 값을 지정해줄 수 있다.

  x := [...]int{10, 20, 30}
  // 길이가 뒤에 나오는 값의 길이와 같아진다. 길이는 고정

  []int{10, 20, 30}
  // 이것과 위는 완전 다르다. -> 이건 slice라고 길이가 고정되지 않은 배열
```

### 배열 선언시 개수는 항상 상수이다.
`[5]int` 에서 5는 항상 상수 즉 literal이다. 변수를 넣으면 에러


### 배열 순회
- `len`이용

```js
package main

import "fmt"

func main() {
	nums := [...]int{10, 20, 30, 40, 50}

	nums[2] = 300

	for i := 0; i < len(nums); i++ {
		fmt.Println(nums[i])
	}
}
```

```js
func main() {
  var t [5]float64 = [5]float64{24.0, 25.9, 27.8, 23.9, 21.2}

  for i, v := range t {
    fmt.Println(i, v)
  }
}
```
- `range`: for문에서 range가 쓰이면 요소들을 순회해준다.
  - 1. index
  - 2. 요소값

## 다중 배열
```
                              b[0][0] b[0][1] b[0][2]
                    b[0]  ->     1       2       3
                     |
  var b [2][3]int----
                     |        b[1][0] b[1][1] b[1][2]
                    b[1]  ->     4       5       6
```

## 2중 배열 순회
```js
func main() {
	a := [2][5]int{
		{1, 2, 3, 4, 5},
		{6, 7, 8, 9, 10},
	}

	for _, arr := range a {
		for _, v := range arr {
			fmt.Print(v, " ")
		}
		fmt.Println()
	}
}
```

## 배열 크기
- 배열 크기 = 타입 크기 x 항목 개수

```js
[2][5]int(이중배열) = 2 x 5 x 8 = 80바이트
// -> int 5묶음이 2묶음이라는 말
// 배열이 여러개든 어떻든 청크로 한 묶음
```
