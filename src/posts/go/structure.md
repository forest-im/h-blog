---
title: 구조체 Structure
tag: golang
date: 2023-02-12 22:38:49
---

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
- __결합도(의존성)은 낮게 응집도는 높게__
  - 구조체는 응집도를 높이는 데 도움을 준다.
- __low coupling, high cohesion__

- 함수는 관련 코드 블록을 묶어서 응집도를 높이고 재사용성을 증가시킨다.
- 배열은 같은 타입의 데이터들을 묶어서 응집도를 높인다.
- 구조체는 관련된 데이터들을 묵어서 응집도를 높이고 재사용성을 증가시킨다.

### 프로그래밍에서 객체의 등장
- 구조체는 객체 지향 프로그래밍의 기반이 된다.
- Go는 class가 없고 구조체만 있다. 구조체가 객체..