---
title: golang - 함수, 상수, 포인터 정리
tag: golang
date: 2023-02-11 23:51:35
---

- 입력이 들어가면 연산을 해서 출력이 나옴

## 출력 값에 이름 지정

```js
func Divide(a, b int) (result int, success bool) {
	if b == 0 {
		result = 0
		success = false
		return
	}
	result = a / b
	success = true
	return
}

func main() {
	c, success := Divide(9, 3)
	fmt.Println(c, success) // 3 true
	d, success := Divide(9, 0)
	fmt.Println(d, success) // 0 false
}

```

- 출력값을 변수처럼 쓸 수 있다. 이름 쓰면 return만 쓰면 된다.

## 재귀 호출

- go는 stack이 자동 증가 되는 스택을 쓴다. 다른 언어는 고정 길이 (메모리가 고갈되지 않는 한 종료되지 않음)

---

## 상수 선언

- 상수는 항상 초기화 시켜줘야 한다.
- 코드값으로 사용 (코드란 숫자에 의미를 부여하는 것)

```js
const Red = 0;
const Blue = 1;
const Green = 2;
```

- 이렇게 1씩 증가하기 귀찮을 때 -> `iota` 사용

```js
const (
  Red int = iota // 0
  Blue int = iota // 1
  Green int = iota // 2
)

const (
  C1 uint = iota + 1 // 1 = 0 + 1
  C2   // 2 = 1 + 1
  C3   // 3 = 2 + 1
)
```

### 비트플래그

```js
const (
  BitFlag1 uint = 1 << iota // 1 = 1 << 0
  BitFlag2  // 2 = 1 << 1
  BitFlag3  // 4 = 1 << 2
  BitFlag4  // 8 = 1 << 3
)
```

- 각 비트마다 다른 의미를 부여할 수 있다.

## 타입 없는 상수

```js
const PI = 3.14;
```

- 타입이 없으면 타입이 쓰일 때 결정된다.
- 타입이 없는 건 리터럴 형태라고 보면 된다.

## 상수 깊이 보기

- 상수는 좌변으로 사용할 수 없다. (l - value)

  - 좌측은 메모리 공간, 우측은 값
  - 항상 값으로만 쓰인다.
  - 즉 메모리 공간이 없다. (메모리 공간은 동적 메모리라고 한다.) 메모리 공간을 할당할 필요가 없는 것

## 연산자 Operator

계산을 표시하는 문자
데이터를 계산하는 게 컴퓨터의 목적

변수, 연산자

## 산술 연산자

### 사칙 연산과 나머지

| 연산자 | 연산   | 피연산자 타입              |
| ------ | ------ | -------------------------- |
| +      | 덧셈   | 정수, 실수, 복소수, 문자열 |
| -      | 뺄셈   | 정수, 실수, 복소수         |
| \*     | 곱셈   | 정수, 실수, 복소수         |
| /      | 나눗셈 | 정수, 실수, 복소수         |
| %      | 나머지 | 정수                       |

### 비트 연산

| 연산자 | 연산          | 피연산자 타입 |
| ------ | ------------- | ------------- |
| &      | AND 비트 연산 | 정수          |
| ㅣ     | OR 비트 연산  | 정수          |
| &      | XOR 비트 연산 | 정수          |
| &^     | 비트 클리어   | 정수          |

#### & (AND 연산자)

| A   | B   | A&B |
| --- | --- | --- |
| 0   | 0   | 0   |
| 1   | 0   | 0   |
| 0   | 1   | 0   |
| 1   | 1   | 1   |

```
  10 = 0 0 0 0  1 0 1 0
& 34 = 0 0 1 0  0 0 1 0
-----------------------
   2 = 0 0 0 0  0 0 1 0
```

#### | (OR)

| A   | B   | A   | B   |
| --- | --- | --- | --- |
| 0   | 0   | 0   |
| 1   | 0   | 1   |
| 0   | 1   | 1   |
| 1   | 1   | 1   |

```
  10 = 0 0 0 0  1 0 1 0
| 34 = 0 0 1 0  0 0 1 0
-----------------------
  42 = 0 0 1 0  1 0 1 0
```

#### ^ (XOR)

| A   | B   | A   | B   |
| --- | --- | --- | --- |
| 0   | 0   | 0   |
| 1   | 0   | 1   |
| 0   | 1   | 1   |
| 1   | 1   | 0   |

```
  10 = 0 0 0 0  1 0 1 0
^ 34 = 0 0 1 0  0 0 1 0
-----------------------
  40 = 0 0 1 0  1 0 0 0
```

#### &^ (비트 클리어)

1. 1단계 ^ 연산을 수행한다.

- 10 &^ 2의 경우
- ^2 -> 비트 반전이 된다. [0 0 0 0 0 0 1 0] => [1 1 1 1 1 1 0 1]

2. 2단계 & 연산을 수행한다.

- [0 0 0 0 1 0 0 0]

### 시프트 연산

| 연산자 | 연산          | 피연산자 타입       |
| ------ | ------------- | ------------------- |
| `<<`   | 왼쪽 시프트   | 정수 `<<` 양의 정수 |
| `>>`   | 오른쪽 시프트 | 정수 `>>` 양의 정수 |

#### 왼쪽 시프트 `<<`

- 10 `<<` 2
  - 비트 단위로 왼쪽으로 2칸 민다.
  - [0 0 0 0 1 0 1 0] -> [0 0 1 0 1 0 0 0]
- 1칸 밀면 2배가 된다. (매번 그렇지는 않음)
  - [0 1 1 1 1 1 1 1] -> [1 1 1 1 1 1 1 0] 마이너스가 됨

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

| 우선순위 | 연산자             |
| -------- | ------------------ | --- |
| 5        | `* / % << >> & &^` |
| 4        | `+ -               | ^`  |
| 3        | `== != < <= > >=`  |
| 2        | `&&`               |
| 1        | `ㅣㅣ`             |

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

## for

- i = iterator
- 초기문, 후처리 생략할 수 있다.

```
for 초기문; 조건문; 후처리 {
  코드 블록
}
```

```js
func main() {
  for i := 0; i < 10; i++ {
    fmt.Print(i, ", ")
  }
}
```

### 초기문 생략

```js
func main() {
  for ; i < 10; i++ {
    fmt.Print(i, ", ")
  }
}
```

### 후처리 생략

```js
func main() {
  for i < 10 {
    fmt.Print(i, ", ")
  }
}
```

### continue와 break

```js
func main() {
  for i := 0; i < 10; i++ {
    if i == 3 {
      continue
    }
    if i == 6 {
      break
    }

    fmt.Println("")
  }
}
```

```js
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	stdin := bufio.NewReader(os.Stdin)
	for {
		fmt.Println("입력하세요")
		var number int
		_, err := fmt.Scanln(&number)

		if err != nil {
			fmt.Println("숫자로 입력하세요")

			// 키보드 버퍼를 지웁니다.
			stdin.ReadString('\n')
			continue
		}
		fmt.Printf("입력하신 숫자는 %d입니다. \n", number)

		if number%2 == 0 {
			break
		}
	}
	fmt.Println("for문이 종료되었습니다.")
}
```

```js
func main() {
	for i := 0; i < 10; i++ {
    for j := 0; j < i + 1; j++ {
      fmt.Print("*")
    }

    fmt.Println()
	}

  /**
  *
  **
  ***
  ****
  *****
  ******
  *******
  ********
  *********
  **********
  **/
}
```

## for문으로 별찍기

### 중첩 for문과 break, 레이블

특정 조건일 때 for문을 종료하고 싶을 때

1. 플래그 변수 활용
2. 레이블 활용

```js
func main() {
	a := 1
	b := 1
	foundFlag := false // flag 변수

	for ; a <= 9; a++ {
		for b = 1; b <= 9; b++ {
			if a*b == 45 {
				foundFlag = true
				break
			}
		}

		if foundFlag {
			break
		}
	}
}
```

이걸 label을 활용하면

```js
func main() {
	a := 1
	b := 1

OuterFor:
	for ; a <= 9; a++ {
		for b = 1; b <= 9; b++ {
			if a*b == 45 {
				break OuterFor
			}
		}
	}
}
```

- label은 되도록 안 쓰는 게 좋다. 잘못하면 stack이 꼬일 수 있어 위험하다.

## Pointer

- 포인터는 메모리 주소를 값으로 갖는 타입
- 포인터는 Type이다.
- 포인터는 타입 앞에 `*`을 붙여서 표현
- 포인터 변수의 기본값은 `nil`

```js
var a int
var p *int // p도 변수다.
p = &a //a가 가리키고 있는 주소

// a의 메모리 주소를 포인터 변수 p에 대입한다.

*p = 20 // a는 20이 된다.
// 포인터가 가지고 있는 값이 가리키고 있는 공간을 말한다.


var f float64
var p *int
p = &f // error -> 타입이 다르다.
```

- 여러 포인터 변수가 하나의 변수를 가리킬 수 있다.
  - 여러 포인터가 같은 메모리 공간을 가리킬 수 있다.

```js
package main

import (
	"fmt"
)

func main() {
	var a int = 500
	var p *int

	p = &a

	fmt.Printf("p의 값: %v\n", p)
	fmt.Printf("p가 가리키는 메모리의 값: %v\n", *p)

	*p = 100
	fmt.Printf("a의 값 %v\np가 가리키는 메모리의 값: %v\n", a, *p)

	// p의 값: 0xc0000ac008 메모리 주소값은 보통 16진수로 표현이 된다.
	// p가 가리키는 메모리의 값: 500
	// a의 값 100
}
```

```js
package main

import (
	"fmt"
)

func main() {
	var a int = 10
	var b int = 20

	var p1 *int = &a
	var p2 *int = &a
	var p3 *int = &b

	fmt.Printf("p1 == p2: %v\n", p1 == p2)
	fmt.Printf("p1 == p2: %v\n", p2 == p3)
}
```

### 포인터 변수의 기본값은 `nil`

```js
var p *int
if p != nil {
	// p가 nil이 아니라는 얘기는 p가 유효한 메모리 주소를 가리킨다는 뜻
}
```

## 포인터를 왜 쓸까?

```js
package main

import (
	"fmt"
)

type Data struct {
	value int
	data  [200]int
}

func ChangeData(arg Data) Data {
	arg.value = 999
	arg.data[100] = 999

	return arg
}

func main() {
	var data Data

	ChangeData(data)
	fmt.Printf("value = %d\n", data.value)         // value = 0
	fmt.Printf("data[100] = %d\n", data.data[100]) // data[100] = 0

	data = ChangeData(data)
	fmt.Printf("value = %d\n", data.value)         // value = 999
	fmt.Printf("data[100] = %d\n", data.data[100]) // data[100] = 999
}
```

- 함수에 인자로 값이 쓰이면 이건 우변일까 좌변일까?
  - **함수에 인자로 쓰이면 무조건 우변 즉 값이다**
  - 저기서 arg와 data는 다르다. 인자로 넣으면 그냥 copy한 것일 뿐

```js
package main

import (
	"fmt"
)

type Data struct {
	value int
	data  [200]int
}

func ChangeData(arg *Data) {
	arg.value = 999 // (*arg).value = 999 이거랑 똑같음
	arg.data[100] = 999
}

func main() {
	var data Data

	ChangeData(&data) // 주솟값이 복사된다. : 8byte만 복사
	fmt.Printf("value = %d\n", data.value)         // value = 999
	fmt.Printf("data[100] = %d\n", data.data[100]) // data[100] = 999
}
```

## 구조체 포인터 초기화

```
var data Data
var p *Data = &data

var p *Data = &Data{}
-> 구조체 생성자를 만들면서 할 수 있다는 것
```

## 인스턴스

- 인스턴스(Instance)는 메모리에 할당된 데이터의 실체

```
var data Data
var p *Data = &data

var p *Data = &Data{} 이것도 똑같음

0x100            -> 						Data (0x0100)
	p		Data 인스턴스 하나가 만들어졌고				data
			포인터 변수 p가 바리킨다
			: 인스턴스는 1개다.
```

### 1개의 인스턴스

```
var p1 *Data = &Data{}
var p2 *Data = p1
var p3 *Data = p1


p1 -
    |
p2  -----> Data (한 Data인스턴스를 세 포인터 변수가 가리킨다.)
    |				(인스턴스는 여전히 한 개)
p3 -

```

### 3개의 인스턴스

```
var data1 Data
var data2 Data = data1
var data3 Data = data1

			값 복사
  ------------
  |           |
  ------      |
  |    |      |
  |    v      v
Data	Data	Data
data1 data2 data3

각각이 따로따로다. 즉 3개의 인스턴스
```

- OOP의 기본에 인스턴스가 있다
- 인스턴스는 객체라고 볼 수도 있고 객체에는 생명주기가 존재한다.

## new() 내장함수

```
1.
	p1 := &Data{} 		 -> &를 사용하는 초기화
2.
	var p2 = new(Data) -> new()를 사용하는 초기화
```

- new를 이용할 때는 구조체의 초기화(초깃값 못 넣음)가 안됨 저렇게만 써야함

## 인스턴스는 언제 사라지나?

- 인스턴스는 아무도 찾지 않을 때 사라진다.

```js
func TestFunc() {
	u := &User{} // u 포인터 변수를 선언하고 인스턴스를 생성
	u.Age = 30
	fmt.Println(u) // 내부 변수 u는 사라진다. 더불어 인스턴스도 사라진다.
}
```

## 정리

- 인스턴스는 메모리에 생성된 데이터의 실체
- 포인터를 이용해서 인스턴스를 가리키게 할 수 있다.
- 함수 호출 시 포인터 인수를 통해서 인스턴스를 입력받고 그 값을 변경할 수 있게 된다.
- 쓸모 없어진 인스턴스는 가비지 컬렉터가 자동으로 지워준다.

## 스택메모리와 힙메모리

```js
package main

import "fmt"

type User struct {
	Name string
	Age  int
}

func NewUser(name string, age int) *User {
	var u = User{name, age}
	return &u
}

func main() {
	userPointer := NewUser("AAA", 23) // 무효한 주소? -> c에서는 무효
	fmt.Println(userPointer)          // &{AAA 23}
}
```

- function 내의 지역변수는 스택에 쌓인다. function이 돌아갈 때 pop을 한다. 그래서 괄호가 닫힐 때 u는 이미 없어졌을 것이다. -> C에서는
  - go에서는 그렇지 않음

### Escape Analasing

function 안에서 만들어진 게 탈출하면 -> 스택에 만들어지지 않음. (스택에 만들어지면 사라지니까) -> 힙에 만들어짐

- 힙에 있는 건 쓰임이 다하면 사라진다.
- 고에서는 탈출 분석을 통해서 스택에 만들지 힙에 만들지 결정한다.

## 구조체 Structure

- 구조체는 여러 필드를 묶어서 사용하는 타입
- 변수들을 묶어놓은 것

```js
type 타입명 struct {
  필드명 타입
  ...
  필드명 타입
}

type Student struct {
	Name  string
	Class int
	No    int
	Score float64
}

// |
// v

var a Student // 이렇게 사용할 수 있다.
```

```js
package main

import "fmt"

type House struct {
	Address  string
	Size     int
	Price    float64
	Category string
}

func main() {
	var house House
	house.Address = "서울시 강남구"
	house.Size = 28
	house.Price = 10
	house.Category = "아파트"

	fmt.Println(house)
	fmt.Printf("주소: %v\n사이즈: %v\n평: %v\n카테고리: %v\n", house.Address, house.Size, house.Price, house.Size)
}
/**
{서울시 강남구 28 10 아파트}
주소: 서울시 강남구
사이즈: 28
평: 10
카테고리: 28
**/
```

### 구조체 변수 초기화

```js
var house House
var house House = House{ "서울시 강동구", 28, 9.80, "아파트"}
var house House = House{
  "서울시 강동구",
  28,
  9.80,
  "아파트", // 여러 줄일 경우 꼭 마지막 줄에 콤마 찍어야 함
}

var house House = House{ Size: 28, Type: "아파트"}

var house House = House {
  Size: 28,
  Type: "아파트",
}
// 기본값 설정안하면 초깃값
```

## 구조체를 포함하는 구조체

```js
type User struct {
  Name string
  Id string
  Age int
}

type VIPUser struct {
  UserInfo User
  VIPLevel int
  Price int
}
```

### 포함된 필드 방식 (embedded field)

```js
type User struct {
  Name struct
  Id string
  Age int
  Level
}

type VIPUser struct {
  User // 바로 내장 시킨다.
  Price int
  Level
}
```

- 여기서 User에도 Level이 있는데, VIPUser.Level로 접근하면 VIPUser안의 Level을 더 우선시한다.
- VIPUser.User.Level로 접근하면 된다.

## 구조체 크기

- 모든 필드의 사이즈를 더한 값

## 구조체 복사

- 모든 필드 값이 복사된다.

### 필드 배치에 따른 구조체 크기 변화

```js
package main

import (
	"fmt"
	"unsafe"
)

type User struct {
	Age   int32
	Score float64
}

func main() {
  var a int = 45
	user := User{23, 77.2}
	fmt.Println(unsafe.Sizeof(user), unsafe.Sizeof(a)) // 16 8
	// sizeof : 변수의 메모리 공간의 크기를 반환한다.

  // User의 int32, float64는 각각 4바이트, 8바이트 12바이튼데 왜 16?
}
```

- 왜 16바이트일까?

|  
v

### 메모리 정렬 (Memory Alignment)

- 컴파일러가 메모리를 정렬하기 때문에 이런 일이 생긴다.
- 메모리에 있는 값을 레지스터가 가져오는데, 메모리의 값이 정렬되어있으면 편하다는 것 -> 8의 배수가 되면 편하다는 것

```
240 244
Age Score <- 우리의 상상

240     244    248
[Age (padding)][Score] <- 실제 배치
```

- 8의 배수가 되도록 정렬해준다.

```js
package main

import (
	"fmt"
	"unsafe"
)

type User struct {
	A int8 // 1 byte
	B int  // 8 byte
	C int8 // 1 byte
	D int  // 8 byte
	E int8 // 1byte
}

func main() {
	user := User{1, 2, 3, 4, 5}
	fmt.Println(unsafe.Sizeof(user)) // 40
}

/**
1    ...   8 9 10 ... 16 17   ...  24 25 ... 32 33  ...  40
A [padding] [    B     ] C [padding]  [   D   ] E [padding]
*/
```

- 성능을 위해서 메모리를 희생하는 것

### 메모리 개선하기

```js
package main

import (
	"fmt"
	"unsafe"
)

type User struct {
	A int8 // 1 byte
	C int8 // 1 byte
	E int8 // 1 byte
	B int  // 8 byte
	D int  // 8 byte
}

func main() {
	user := User{1, 2, 3, 4, 5}
	fmt.Println(unsafe.Sizeof(user)) // 24
}
```

- 메모리를 효율적이게 쓰기 위해서 8바이트보다 작은 필드는 8바이트 크기(단위)를 고려해서 몰아서 배치하자. (작은 것에서 큰 순으로)
- 메모리 작은 환경에서는 이래도 되지만 메모리가 크기 때문에 딱히..

## 구조체의 역할

- **결합도(의존성)은 낮게 응집도는 높게**
  - 구조체는 응집도를 높이는 데 도움을 준다.
- **low coupling, high cohesion**

- 함수는 관련 코드 블록을 묶어서 응집도를 높이고 재사용성을 증가시킨다.
- 배열은 같은 타입의 데이터들을 묶어서 응집도를 높인다.
- 구조체는 관련된 데이터들을 묵어서 응집도를 높이고 재사용성을 증가시킨다.

### 프로그래밍에서 객체의 등장

- 구조체는 객체 지향 프로그래밍의 기반이 된다.
- Go는 class가 없고 구조체만 있다. 구조체가 객체..

## 모듈

- 모듈은 패키지의 모음
- 모듈은 패키지의 상위 개념

## 패키지란

- 코드를 묶는 단위
- 모든 코드는 반드시 패키지로 묶여야 한다.

## 프로그램이란

- 실행 파일
- 실행 시작 지점을 포함한 패키지
- main 함수를 포함한 main 패키지

## Main 패키지가 아닌 그 외 패키지

- 프로그램의 보조 패키지로 동작
- 실행 시작 지점을 포함하지 않은 패키지

### 겹치는 패키지명

```
import {
	"text/template"
	"html/template"
}

import {
	"text/template"
	htmlplatae "html/template" -> 별칭을 달 수 있다.
}
```

## 사용하지 않는 패키지 포함하기

- 패키지나 변수 안쓰면 에러남
  - `_ "strings"` -> 이렇게 쓰면 실제 사용하지 않더라도 에러안남
- 왜 사용하지 않는 패키지를 포함해야 하는가?
  - 패키지 초기화에 따른 부가효과를 위해

폴더 아래에 있는 파일들은 다 같은 패키지이기 때문에 다른 함수들 등을 공유할 수 있다.
go에서는 폴더 이름이 패키지 기준점이 된다.

- `go mod tidy`
  - 필요한 것들을 다운받는다.
  - `go.sum` -> 패키지 정보
  - 다운받은 건 어디로 가는가 ? -> go env

## 패키지 외부 공개

- 패키지내 타입, 전역변수, 상수, 함수, 메서드 등을 외부로 공개해서 사용할 수 있다.
- **대문자** 로 시작하면 외부 공개
- **소문자** 로 시작하면 비공개

## 패키지 초기화

- 패키지가 프로그램에 포함되어 초기화 될 때 패키지 내의 `init()`가 **한 번만** 호출된다.
- `init()`를 통해서 패키지내 전역 변수를 초기화 한다.

---

- 숫자 만들기 게임

1. 0 ~ 99사이 랜덤한 숫자 생성
2. 사용자 입력
3. 입력값이 크면 "큽니다" 작으면 "작습니다" 출력 2번 반복
4. 입력값이 같으면 프로그램 종료

```js
package main

import (
	"fmt"
	"math/rand"
)

func pickNumber(pick int) int {
	return pick
}

func main() {
	var randomNumber int = rand.Intn(99)
	var inputInt int

	for true {
		fmt.Println("입력해")
		fmt.Scanln(&inputInt)

		if inputInt == randomNumber {
			break
		} else {
			if inputInt < randomNumber {
				fmt.Println("작아")
			} else if inputInt == randomNumber {
				break
			} else {
				fmt.Println("커")
			}
			continue
		}
	}
}
```

### go mod init

go module을 사용하지 않으면 $GOPATH 바깥쪽의 정보를 알지 못한다. `go mod init`을 이용해 모듈 루트로 만들어줘야 한다.

- `go.mod`파일은 오직 모듈의 루트 안에 존재하게 된다.
- 서브 디렉터리에 있는 패키지는 현재 존재하는 모듈의 경로에 하위 디렉터리 경로를 더하여 임포트 한다. (서브 디렉터리를 만든다면 또 다시 `go mod init`을 실행할 필요가 없다.)

### go mod tidy

- `go mod tidy`명령어는 사용하지 않는 의존성을 go.mod 파일에서 삭제하고, import되었지만 실제 모듈이 다운로드 되지 않은 경우 go.mod파일에 추가해준다.

### layout

[표준 Go 프로젝트 레이아웃](https://github.com/golang-standards/project-layout/blob/master/README_ko.md)

### go mod, go sum 파일도 커밋해야 할까?

- yes
- [go.mod와 go.sum 도 커밋해야 할까?](https://johngrib.github.io/wiki/commit-go-mod-go-sum/)

## 라우터 선택

httprouter vs gorilla/mux vs chi

- 표준 라이브러리 선택
- 잘 문서화 되어있고 이걸 쓰면 타사 종속성을 가져올 필요가 없음
  - 유지 관리 측면에서 장점을 가져올 것으로 예상

## mongodb - context

- 시간 초과 또는 cancel되면 컨텍스트가 만료된 것으로 간주, but, cancel된다고 디비 서버가 중단되지 않을 수 있는 것 같음 [참고링크](https://stackoverflow.com/questions/70779021/does-cancelling-the-context-for-a-query-using-the-mongodb-go-driver-affect-runni)

## InsertOne

```
  id, err := collection.InsertOne(context.TODO(), filter)

  newId := id.InsertedID
  fmt.Println(newId)
```

- json.Marshal
- vars := mux.Vars(r)
- json.NewDecoder(res.Body).Decode(user..)
- type확인
- FindOneAndUpdate
  - 반환값에 따라 다른 메서드 사용
- buffer

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

| UTF-16                                                     | UTF-8                                                        |
| ---------------------------------------------------------- | ------------------------------------------------------------ |
| 2byte                                                      | 1 ~ 3바이트 or 1 ~ 4바이트                                   |
| 모두 2바이트                                               | 많이 쓰지 않는 것엔 적은 공간, 많이 쓰는 곳엔 많은 공간 할당 |
| 아스키랑 호환이 잘 안된다. 별도 변환이 필요한 경우가 있다. | 아스키랑 1대 1로 호환이 된다.                                |

- UTF-8은 많이 쓰지 않는 것엔 적은 공간을 할당하고 많이 쓰는 곳엔 많은 공간을 할당하자
- **20 : 80법칙**
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
  - `[H][e][l][l][o]` str은 이 공간을 가리키는 포인터이다. 저 주소를 값으로 가지고 있어 **str 타입은 항상 고정된 값을** 가진다. 8byte

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
  - 문자열은 불변이기 때문에 타입변환 할 때 **복사** 가 일어난다.
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

## 메서드

- 메서드는 타입에 속한 **함수** 이다.
- 함수의 종류 중에 메서드가 있다.
- 일반적인 함수는 타입과 독립적으로 존재한다.
  - 함수 -> 독립적
  - 메서드 -> 타입에 종속

## 메서드 선언

```

        리시버    메서드명
          |       |
func (r Rabbit) into() int {

}
```

- 리시버는 모든 패키지 지역 타입이 가능하다. 구조체, 별칭 타입 등
- 고에서는 리시버라고 부른다.
- 다른 언어에서는 Class
- 그냥 리시버가 있는 함수

```js
package main

import "fmt"

type account struct {
	balance int
}

func widthdrawFunc(a *account, amount int) { // function
	a.balance -= amount
}

func (a *account) widthdrawMethod(amount int) { // method
	a.balance -= amount
}

// 저 a *account가 뒤에 있으면 함수, 앞에 있으면 메서드

func main() {
	a := &account{100} // 포인터 타입의 값 *account

	widthdrawFunc(a, 30)
	a.widthdrawMethod(30)
	// a의 타입에 속한 메서드

	fmt.Println(a)
}
```

- 패키지 안에서 정의된 타입만 함수(메서드)를 가질 수 있다.

## 객체로 진화

- 객체(Object)란 데이터(state)와 기능(Function)을 묶은 것이다. 이 묶는 것에 중요한 역할을 하는 게 메서드
- 둘이 묶여야 하는데 따로 따로 있으면 관리가 힘들다. (묶여야 할 건 묶여야 하기 때문에 - 관련된 기능을 묶기 위해서)
- 관계 중심 -> OOP
- 관계가 뭐냐 -> 상호 작용
- 메서드 -> 객체와 객체간의 관계를 정의한다.

## 포인터 타입 메서드 vs 값 타입 메서드

```js
package main

import "fmt"

type account struct {
	balance   int
	firstname string
	lastname  string
}

func (a1 *account) withdrawPointer(amount int) { // 포인터 타입
	a1.balance -= amount
}

func (a2 account) withdrawValue(amount int) { // 값 타입
	a2.balance -= amount
}

func (a2 account) withdrawValue2(amount int) account {
	a2.balance -= amount
	return a2
}

func main() {
	var mainA *account = &account{100, "joe", "park"}
	mainA.withdrawPointer(30)
	fmt.Println(mainA.balance) // 70

	mainA.withdrawValue(20)
	fmt.Println(mainA.balance) // 70

	*mainA = mainA.withdrawValue2(20)
	fmt.Println(mainA.balance) // 50
  fmt.Println(mainA, *mainA);
}
```

## 언제 값타입을 쓰고 포인터 타입을 쓰는가?

### Time vs Timer

- Time은 보통 값타입을 쓰고 Timer는 포인터 타입을 쓴다.
- 객체가 Data로 바꼈을 때
- 필드값이 바뀌더라도 스트럭처의 개념적인 실체는 바뀌지 않음 -> 포인터 타입
- 온도 타입이 있을 때 20도의 온도와 25도의 온도는 다르다 -> 값 타입
- Time : 시각을 나타냄
- Timer : 값이 바뀌어도 같은 타이머

## Go에서는 생성자, 소멸자 없음

- 생성자가 없어서 어떤 방식으로 객체를 만들어야 한다는 강제성이 없다. 일반적으로는 특정 함수를 만들어서 권유하는 방법

### Embedded field 메서드

```js
package main

import "fmt"

type User struct {
	Name string
	Age  int
}

func (u User) String() string {
	return fmt.Sprintf("%s, %d", u.Name, u.Age) // Sprintf: string을 만들어서 반환
}

type VIPUser struct {
	User     // User를 포함 -> embedded field
	VIPLevel int
}

func (v VIPUser) vipLevel() int {
	return v.VIPLevel
}

func main() {
	vip := VIPUser{User{"alex", 34}, 5}
	fmt.Println(vip.String()) // alex, 34
  // vip안에 상속된 게 아니라 편리를 위해서 점을 찍고 쓸 수 있는 것
}
```

- embedded는 상속이 아니다. 단순히 포함된 것 그 안에 있는 메서드도 포함되었기 때문에 쓸 수 있는 것

```js
package main

import "fmt"

type User struct {
	Name string
	Age  int
}

func (u User) String() string {
	return fmt.Sprintf("%s, %d", u.Name, u.Age) // Sprintf: string을 만들어서 반환
}

type VIPUser struct {
	User     // User를 포함 -> embedded field
	VIPLevel int
}

func (v VIPUser) vipLevel() int {
	return v.VIPLevel
}

func (v VIPUser) String() string {
	return fmt.Sprintf("%d", v.VIPLevel) // Sprintf: string을 만들어서 반환
}

func main() {
	vip := VIPUser{User{"alex", 34}, 5}
	fmt.Println(vip.String()) // 5
}
```

- VIPUser에도 String이란 메서드가 있으면 그걸 실행하고 없으면 안에 있는지 확인하고 그걸 실행함 -> 메소드 오버라이드가 아님(상속이 아니니까)

```
  slice2 := make([]int, len(slice1))
  append
```

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
