---
title: 문자열
tag: golang
date: 2023-02-13 13:18:25
---

## 문자열
- 문자 집합
- 문자로 다 숫자다 결국 문자 코드. 즉 숫자의 배열이다.

```js
func main() {
	poet1 := "하하"
	poet2 := `하하
  엔터이당
  엔터이당
  `

	fmt.Println(poet1, poet2)
}
```

## UTF-8 문자 코드
문자 1개를 1 ~ 4바이트로 표현하는데 보통 1 ~ 바이트를 쓴다.

```
[0][][][][][][][]
-> 첫 비트가 0이면 1바이트
[1][1][][][][][][]
-> 1이 2개면 2바이트
[1][1][1][][][][][]
-> 3바이트
[1][1][1][1][][][][]
-> 4바이트
```

### UTF-16보다 UTF-8이 더 효율적인 이유
|UTF-16|UTF-8|
|-|-|
|2byte|1 ~ 3바이트 or 1 ~ 4바이트|
|모두 2바이트|많이 쓰지 않는 것엔 적은 공간, 많이 쓰는 곳엔 많은 공간 할당|
|아스키랑 호환이 잘 안된다. 별도 변환이 필요한 경우가 있다.|아스키랑 1대 1로 호환이 된다.|

- UTF-8은 많이 쓰지 않는 것엔 적은 공간을 할당하고 많이 쓰는 곳엔 많은 공간을 할당하자
- __20 : 80법칙__
	- 20% 코드, 성능 80% 일부 코드만 개선을 해도 성능 개선 효과가 뛰어나다. 성능을 많이 차지하는 코드를 찾아내서 거기를 개선하는 방법
- 대부분 쓰는 문자가 영문자 또는 숫자가 80프로이다. 이런 문자를 2바이트씩 표현하면 공간이 아깝다.
	- 80프로 이상이 1바이트로 표현 가능하기 때문에 영문자, 숫자는 1바이트로 표현하고.. 나머지는 2바이트 또는 3바이트로 표현을 하자

## 문자열 순회
### len 이용
```js
func main() {
	str := "Hello 월드"

  for i := 0; i < len(str); i++ {
    fmt.Printf("타입: %T 값: %d 문자값:%c\n", str[i], str[i], str[i])
		// index에 해당하는 바이트 정보가 나온다.
  }
}
// 타입: uint8 값: 72 문자값:H
// 타입: uint8 값: 101 문자값:e
// 타입: uint8 값: 108 문자값:l
// 타입: uint8 값: 108 문자값:l
// 타입: uint8 값: 111 문자값:o
// 타입: uint8 값: 32 문자값: 
// 타입: uint8 값: 236 문자값:ì
// 타입: uint8 값: 155 문자값:
// 입: uint8 값: 148 문자값:
// 타입: uint8 값: 235 문자값:ë
// 타입: uint8 값: 147 문자값:
// 타입: uint8 값: 156 문자값:
```
- 대문자가 소문자보다 작은 값
- 한글은 아스키 코드 바깥에 있어서 3바이트로 표현이 된다.
- `len()`은 바이트 길이를 반환한다.
	- "Hello" -> 5바이트
	- "Hello " -> 6바이트
	- "Hello 월드" -> 12바이트

### []rune으로 타입 변환 후 한 글자씩 순회
```js
func main() {
	str := "Hello 월드"
	arr := []rune(str)
	// rune -> int32의 별칭타입
	// 문자열을 int32의 배열로 바꾸는 것
	// 문자열은 동적배열로만 가능하다.

	for i := 0; i < len(arr); i++ {
		fmt.Printf("타입: %T 값: %d 문자값:%c\n", arr[i], arr[i], arr[i])
	}
}

// 타입: int32 값: 72 문자값:H
// 타입: int32 값: 101 문자값:e
// 타입: int32 값: 108 문자값:l
// 타입: int32 값: 108 문자값:l
// 타입: int32 값: 111 문자값:o
// 타입: int32 값: 32 문자값: 
// 타입: int32 값: 50900 문자값:월
// 타입: int32 값: 46300 문자값:드
```

### range로 순회
```js

func main() {
	str := "Hello 월드"

	for _, v := range str {
		fmt.Printf("타입: %v 값: %d 문자값: %c\n", v, v, v)
	}
}

// 타입: 72 값: 72 문자값: H
// 타입: 101 값: 101 문자값: e
// 타입: 108 값: 108 문자값: l
// 타입: 108 값: 108 문자값: l
// 타입: 111 값: 111 문자값: o
// 타입: 32 값: 32 문자값:  
// 타입: 50900 값: 50900 문자값: 월
// 타입: 46300 값: 46300 문자값: 드
```
- `range`를 이용해서 index, value에 접근할 수 있다.
	- 문자열을 넣으면 한 글자씩 순회할 수 있다. (한글도 한 글자로 침)
- `range`는 value로 유니코드를 반환한다.
- `int(v - '0')`하면 본 문자의 숫자가 나옴 '0'은 48


## 문자열 합산
```js

func main() {
	str1 := "Hello"
	str2 := "World"

	str3 := str1 + " " + str2
	fmt.Println(str3) // Hello World

	str1 += " " + str2
	fmt.Println(str1) // Hello World
}
```

## 문자열 비교
- ==, != 같다 비교
- 대소 비교
- 사전식 비교 - 대문자가 더 작다.

## 문자열 구조
- 타이 
```
var str1 string = "Hello"
var str2 string

str2 = str1
```
- 문자열 사이즈가 다른데 어떻게 저게 가능한가?
- 배열은 `[4]int` -> `[1][2][3][4]`
	- 문자열은 포인터의 형태로 들고있다.
	- `[H][e][l][l][o]` str은 이 공간을 가리키는 포인터이다. 저 주소를 값으로 가지고 있어 __str 타입은 항상 고정된 값을__ 가진다. 8byte

```
type StringHeader struct {
	Data uintptr -> pointer 8byte
	Len int -> 8byte
}
```
- go 내부에서 string을 나타내는 구조는 structure
- row pointer
- 즉 같은 공간을 가리키게 된다.

```js
package main

import (
	"fmt"
	"reflect"
	"unsafe"
)

func main() {
	str1 := "Hello 월드"
	str2 := str1

	stringHeader1 := (*reflect.StringHeader)(unsafe.Pointer(&str1))
	//reflect.StringHeader의 포인터로 변환하는 것
	stringHeader2 := (*reflect.StringHeader)(unsafe.Pointer(&str2))

	fmt.Println(stringHeader1)
	fmt.Println(stringHeader2)
	// &{17462685 12}
	// &{17462685 12}
  // str1, str2 똑같은 메모리주소 공간을 가지고 있다.
}
```
- string 타입은 늘 고정 길이 -> 16비트

## 문자열은 불변이다.
- 문자열 일부만 수정할 수 없다.
```js
var str string = "Hello world"
str = "How are you"
str[2] = "a"
```

```js
func main() {
	var str string = "Hello World"
	var slice []byte = []byte(str)

	slice[2] = 'a'

	fmt.Println(slice)
	// [72 101 97 108 111 32 87 111 114 108 100]
	fmt.Printf("slice: %s str: %v\n", slice, str)
	// slice: Healo World str: Hello World
}
```
- slice[2]를 'a'로 바꿨는데 str은 바뀌지 않았다
	- slice[2]를 바꿀 때 새로운 것을 만들어서 다른 메모리를 가리킨다.
	- 문자열은 불변이기 때문에 타입변환 할 때 __복사__ 가 일어난다.
	- 문자열을 보호하기 위해서

## 문자열 합산
- 합산시마다 새로운 문자열이 생성된다.

### 한 글자씩 합치거나, builder 이용

```js
package main

import (
	"fmt"
	"strings"
)

func ToUpper1(str string) string {
	var rst string
	for _, c := range str {
		if c >= 'a' && c <= 'z' {
			rst += string('A' + (c - 'a'))
			// c - 'a' 는 몇 번째 글자냐는 말
		} else {
			rst += string(c)
		}
	}

	return rst
}

func ToUpper2(str string) string {
	var builder strings.Builder
	for _, c := range str {
		if c >= 'a' && c <= 'z' {
			builder.WriteRune('A' + (c - 'a'))
		} else {
			builder.WriteRune(c)
		}
	}

	return builder.String()
}

func main() {
	var str string = "Hello World"

	fmt.Println(ToUpper1(str))
	fmt.Println(ToUpper2(str))
}
```

### 합산
`rst + 'H'`
- 하나씩 합치는 건 합칠 때 마다 복사하여 새로운 공간을 할당하면서 동작
- 문자열이 엄청 클 때 효율이 떨어진다.

### strings 패키지의 builder
- 내부에 슬라이더를 가지고 있어 공간을 할당한다.
- 공간에 추가하는 방식으로 새로운 공간을 할당하지 않고 넣는다.
- 합산보다 더 효율적이다.

### 왜 문자열은 불변일까?
- 안정성 때문
- go는 대입할 땐 공유하고 바뀔 때 복사한다라는 조치를 취한 것