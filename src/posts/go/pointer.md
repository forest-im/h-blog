---
title: Pointer
tag: golang
date: 2023-02-12 23:39:07
---

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
	- __함수에 인자로 쓰이면 무조건 우변 즉 값이다__
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

