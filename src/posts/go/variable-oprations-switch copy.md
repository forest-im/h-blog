---
title: 변수, 연산자, if, switch
tag: golang
date: 2023-02-11 20:32:25
---

## 연산자 Operator
계산을 표시하는 문자
데이터를 계산하는 게 컴퓨터의 목적

변수, 연산자

## 산술 연산자

### 사칙 연산과 나머지

|연산자|연산|피연산자 타입|
|-|-|-|
|+|덧셈|정수, 실수, 복소수, 문자열|
|-|뺄셈|정수, 실수, 복소수|
|*|곱셈|정수, 실수, 복소수|
|/|나눗셈|정수, 실수, 복소수|
|%|나머지|정수|

### 비트 연산
|연산자|연산|피연산자 타입|
|-|-|-|
|&|AND 비트 연산|정수|
|ㅣ|OR 비트 연산|정수|
|&|XOR 비트 연산|정수|
|&^|비트 클리어|정수|

#### & (AND 연산자)
|A|B|A&B|
|-|-|-|
|0|0|0|
|1|0|0|
|0|1|0|
|1|1|1|

```
  10 = 0 0 0 0  1 0 1 0
& 34 = 0 0 1 0  0 0 1 0
-----------------------
   2 = 0 0 0 0  0 0 1 0
```

#### | (OR)
|A|B|A|B|
|-|-|-|
|0|0|0|
|1|0|1|
|0|1|1|
|1|1|1|

```
  10 = 0 0 0 0  1 0 1 0
| 34 = 0 0 1 0  0 0 1 0
-----------------------
  42 = 0 0 1 0  1 0 1 0
```

#### ^ (XOR)
|A|B|A|B|
|-|-|-|
|0|0|0|
|1|0|1|
|0|1|1|
|1|1|0|

```
  10 = 0 0 0 0  1 0 1 0
^ 34 = 0 0 1 0  0 0 1 0
-----------------------
  40 = 0 0 1 0  1 0 0 0
```

#### &^ (비트 클리어)

1. 1단계 ^ 연산을 수행한다.
  - 10 &^ 2의 경우
  - ^2 -> 비트 반전이 된다. [0 0 0 0  0 0 1 0] => [1 1 1 1  1 1 0 1]

2. 2단계 & 연산을 수행한다.
  - [0 0 0 0  1 0 0 0]

### 시프트 연산
|연산자|연산|피연산자 타입|
|-|-|-|
|`<<`|왼쪽 시프트|정수 `<<` 양의 정수|
|`>>`|오른쪽 시프트|정수 `>>` 양의 정수| 

#### 왼쪽 시프트 `<<`
- 10 `<<` 2
  - 비트 단위로 왼쪽으로 2칸 민다.
  - [0 0 0 0  1 0 1 0] -> [0 0 1 0  1 0 0 0]
- 1칸 밀면 2배가 된다. (매번 그렇지는 않음)
  - [0 1 1 1  1 1 1 1] -> [1 1 1 1  1 1 1 0] 마이너스가 됨

```js
package main

import "fmt"

func main() {
	var x int8 = 4
	var y int8 = 64

	fmt.Printf("x:%08b x<<2 :%08b x<<2: %d\n", x, x<<2, x<<2)
	// x:00000100 x<<2 :00010000 x<<2: 16
	fmt.Printf("y:%08b y<<2 :%08b y<<2: %d\n", y, y<<2, y<<2)
	// y:01000000 y<<2 :00000000 y<<2: 0
}
```

#### 왼쪽 시프트 `>>`
- 오른쪽으로 2칸 민다.
- 음수면 1, 양수이면 0으로 채워진다.

```js
func main() {
	var x int8 = 16
	var y int8 = -128
	var z int8 = -1
	var w uint8 = 128

	fmt.Printf("x:%08b x>>2: %08b x>>2: %d\n", x, x>>2, x>>2)
	// x:00010000 x>>2: 00000100 x>>2: 4
	fmt.Printf("y:%08b y>>2: %08b y>>2: %d\n", uint8(y), uint8(y>>2), y>>2)
	// y:10000000 y>>2: 11100000 y>>2: -32
	fmt.Printf("z:%08b z>>2: %08b z>>2: %d\n", uint8(z), uint8(z>>2), z>>2)
	// z:11111111 z>>2: 11111111 z>>2: -1
	fmt.Printf("w:%08b w>>2: %08b w>>2: %d\n", w, w>>2, w>>2)
	// w:10000000 w>>2: 00100000 w>>2: 32
}
```

## 정수 오버플로
- 수학에서는 양의 정수에 1을 더하면 항상 더 커지지만 컴퓨터에서는 다를 수 있다.
```js
func main() {
	var x int8 = 127

	fmt.Printf("%d < %d+1: %v\n", x, x, x < x+1)    // 127 < 127+1: false
	fmt.Printf("x= %4d, %08b\n", x, x)              //x=  127, 01111111
	fmt.Printf("x+1= %4d, %08b\n", x+1, uint8(x+1)) // x+1= -128, 10000000
}
```

## 실수
```js
func main() {
	var a float64 = 0.1
	var b float64 = 0.2
	var c float64 = 0.3

	fmt.Printf("%f + %f == %f : %v\n", a, b, c, a+b == c)
  // 0.100000 + 0.200000 == 0.300000 : false
  fmt.Println(a+b) // 0.30000000000000004
}
```

- 실수는 오차가 발생할 수 밖에 없다.

```js
package main

import (
	"fmt"
	"math"
)

func equal(a, b float64) bool {
	return math.Nextafter(a, b) == b
}

func main() {
	var a float64 = 0.1
	var b float64 = 0.2
	var c float64 = 0.3

	fmt.Printf("%0.18f == %0.18f : %v\n", c, a+b, equal(a+b, c))
	// 0.299999999999999989 == 0.300000000000000044 : true
}
```
- `math.Nextafter`를 사용하면 앞의 인자값에서 뒤의 인자값으로 가는데 1비트 만큼만 간다.
- 아주 근소한 차이일 때 오차를 보정할 수 있다.

## 논리 연산자
|&&|AND|양변이 모두 true이면 true 반환|
|ㅣㅣ|OR|양변 중 하나라도 true이면 true 반환|
|!|NOT|true -> false, false -> true|

## 대입 연산자
- 대입 연산자는 값을 반환하지 않는다.
- `a = 30`
- `a, b = 30, 34`
- `a, b = b, a`

## 복합 대입 연산자
- `+=`
- `-=`
- `*=`
- `%=`
- `&=`
- `|=`
- `^=`
- `<<=`
- `>>=`

## 증감 연산자
- `++`
- `--`
- 전위 증감, 후위 증감 없다.
- 값을 반환하지 않는다.
- `b = a++` -> XX

## 연산자 우선순위
|우선순위|연산자|
|-|-|
|5|`* / % << >> & &^`|
|4|`+ - | ^`|
|3|`== != < <= > >=`|
|2|`&&`|
|1|`ㅣㅣ`|

## 조건문

```js
if 조건문 {
  문장
} else if 조건문 {
  문장
} else {
  문장
}
```

### if 초기문; 조건문

```js
if 초기문; 조건문 {
  문장
}

if filename, success := UploadFile(); success {
  fmt.Println("Upload 성공", filename)
}
```

## Switch문
- if는 조건을 비교, switch는 값을 비교
- Go에서는 break문 안써도 괜찮음

```js
switch 비굣값 {
  case 값1:
    문장
  case 값2:
    문장
  default:
    문장
}
```

### 한 번에 여러 값 비교

```js
switch day {
  case "monday", "tuesday":
    fmt.Println("월, 화")
  case "wednesday", "thursday":
    fmt.Println("수, 목")
}
```

### Switch 초기문
```js
switch 초기문; 비굣값 {
  case 값1:
    ...
}
```

```js
type ColorType int
// 값을 명확하게 해주기 위해서 별칭을 써주는 것

const (
  Red ColorType = iota
  Blue
  Green
  Yellow
)

func colorToString(color ColorType) string {
  switch color {
    case Red:
      return "Red"
    case Blue:
      return "Blue"
    case Green:
      return "Green"
    case Yellow:
      return "Yellow"
    default:
      return "Undefined"
  }
}

func getMyFavoriteColor() ColorType {
  return Red
}

func main() {
  fmt.Println("내 최애 컬러는", colorToString(getMyFavoriteColor()))
  // 내 최애 컬러는 Red
}
```