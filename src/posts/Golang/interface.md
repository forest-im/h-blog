---
title: golang - 인터페이스 정리
tag: golang
date: 2023-02-15 15:23:15
---

## 인터페이스
- 구체화된 객체(Concrete object)가 아닌 추상화된 상호작용으로 객체를 표현
- 메서드는 구현이 포함되어있다. (구체화된 코드가 들어가있음)
  - 여기서 구현을 빼고 오로지 관계만 표현한 것 -> 인터페이스

## 인터페이스 선언
- 선언할 때 항상 무엇을 선언하는지 쓴다.
  - func ...
  - var ...
  - const ...
  - type ...
- 인터페이스는 __타입이다__.

```js
type DuckInterface interface {
  Fly()
  Walk(distance int) int
  // 이 안에 구현이 빠진 메서드들을 적는다.
  // func 없이 함수명, 인자 or 어떤 출력을 가지는지
}
```

## 인터페이스 규칙
1. 메서드는 반드시 메서드명이 있어야 한다.
2. 매개변수와 반환이 다르더라도 이름이 같은 메서드는 있을 수 없다.
```
type Sample interface {
  String() string
  String(int) string -> String 메서드명이 겹친다.
  _(x int) -> 메서드는 반드시 이름이 있어야 한다.
}
```
3. 인터페이스에서는 메서드 구현을 포함하지 않는다.
  - 구현이 없는 걸 function signature라고 한다.

```js
package main

import "fmt"

type Stringer interface {
  String() string
}

type Student struct {
  Name string
  Age  int
}

func (s Student) String() string {
  return fmt.Sprintf("hi 나는 %d살 %s라고 해", s.Age, s.Name)
  // Sprintf -> 문자열을 반환한다.
}

func (s Student) GetAge() int {
  return s.Age
}

func main() {
  student := Student{"철수", 12}
  var stringer Stringer // 인터페이스

  stringer = student
  // Student라는 structure가 String이라는 메서드를 가지고 있어서 stringer라는 인터페이스에 할당할 수 있다. (조건이 성립됨)
  // stringer는 student의 레퍼런스라고 할 수 있다.
  fmt.Printf("%s\n", stringer.String())
  // GetAge는 호출할 수 없다.
}
```

## 인터페이스는 왜 쓸까?
- 추상화를 위해서 -> 추상 계층을 제공한다.
- 인터페이스는 의존성을 끊는 데 사용된다. (decoupling)

## 추상 계층
```
         인터페이스
            |
사용자   추상화된 서비스  <--  서비스 제공자
            |
         추상 계층
```

## 덕타이핑 Duck Typying
- Go, python 덕타이핑 제공
- 만약 어떤 새를 봤는데 그 새가 오리처럼 걷고, 오리처럼 날고 오리처럼 소리내면 나는 그 새를 오리라고 부르겠당.

```
type Sender interface {
  Send(parcel string)
}
```
- 뭔 타입인지는 모르겠지만 Send라는 메서드를 가지고 있으면 저걸 Sender라고 부르겠당
  - 다른 언어는 메서드를 선언할 때 이게 오리인지 표시를 해줘야 한다.

```
type Stringer interface {
  String() string
}

type Student struct { -> 타입선언시 인터페이스 구현 여부를 명시하지 않아도 된다.
  ...
}

func (s *Student) String() string {
  ...
}
```
- 빌드할 때 체크한다. (컴파일할 때)

### 좋은 점
- 사용자 중심의 코딩을 할 수 있다.
- 인터페이스 구현 여부를 타입 선언시 하지 않고, 인터페이스가 사용될 때 결정하기 때문에 서비스 제공자는 구체화된 객체를 제공하고 사용자가 필요에 따라 인터페이스를 정의해서 사용할 수 있다.
  - 사용자는 구체화된 객체를 쓰다가 교체할 필요가 있을 때 인터페이스를 만들어서 교체할 수 있다.


- java는 class를 만들 때 미리 interface를 생각해줘야 한다.
  - Oop -> 설계 중요 (class - class간의 관계 설정) - 관계가 무엇이냐 ? 인터페이스
  - 설계 -> 구현 (폭포수 방식)
- go는 interface를 미리 뽑아낼 필요가 없다.
  - 애자일.., 스크럼 방식에 잘 어울린다.

## 인터페이스 사이즈
```
[인스턴스 메모리 주소][타입 정보]
인터페이스가 가리키고 있는
```
- 인터페이스가 아무것도 가리키지 않고 있을 때는 Type은 nil
- 항상 타입에 상관없이 인터페이스는 16바이트이다. (8바이트 + 8바이트)
```js
package main

import (
  "fmt"
  "unsafe" // type 사이즈 알 때
)

type Stringer interface {
  String() string
}

type Student struct {
  Name string
}

func (s *Student) String() string {
  return s.Name
}

type User struct {
  Name string
  Age  int
}

func (u User) String() string {
  return u.Name
}

func main() {
  var stringer1 Stringer
  fmt.Printf("type: %T size: %d\n", stringer1, unsafe.Sizeof(stringer1))
  // type: <nil> size: 16

  student := &Student{"AAA"}
  stringer1 = student
  fmt.Printf("type: %T size: %d\n", stringer1, unsafe.Sizeof(stringer1))
  // type: *main.Student size: 16

  var stringer2 Stringer
  fmt.Printf("type: %T size: %d\n", stringer2, unsafe.Sizeof(stringer2))
  // type: <nil> size: 16

  user := User{"BBB", 20}
  stringer2 = user
  fmt.Printf("type: %T size: %d\n", stringer2, unsafe.Sizeof(stringer2))
  // type: main.User size: 16
}

```

```js
package main

type Database interface {
  Get()
  Set()
}

type CDatabase struct {

}

func (c CDatabase) GetData() {

}

func (c CDatabase) SetData() {
  
}
```
- Database라는 인터페이스가 있고, CDatabase라는 게 있는데 저건 GetData, SetData라는 다른 메서드가 있어서 우리가 만들어놓은 인터페이스의 Get, Set을 쓸 수 없다. Get -> GetData .. 이런 식으로 이름을 바꿔도 되지만, 다른 곳에서 쓰고 있어서 바꿀 수 없는 문제가 생겼다. 어떻게 해결할 것인가?
  - Wrapper 이용하기

```js
package main

import "fmt"

type Database interface {
  Get()
  Set()
}

type CDatabase struct {
}

func (c CDatabase) GetData() {

}

func (c CDatabase) SetData() {

}

type Wrapper struct {
  cdb cDatabase
}

func (w Wrapper) Get() {
  w.cdb.GetData()
}

func (w Wrapper) Set() {
  w.cdb.SetData()
}

func main() {
  var cdatabase CDatabase
  var database Database
  database = Wrapper{cdatabase}

}
```

## 인터페이스 기능 더 알기
### 포함된 인터페이스
- 인터페이스가 인터페이스를 포함하는 것
```js
type Reader interface {
  Read() (n int, err error)
}

type Writer interface {
  Write() (n int, err error)
  Close() error
}

type ReadWriter interface {
  Reader
  Writer
}
```
- ReadWriter는 `Read()`, `Write()`, `Close()` 메서드를 가지게 된다.
  - 겹치는 메서드 -> 무시

### 빈 인터페이스
- 메서드가 아무것도 필요없는 인터페이스
  - 모든 타입이 가능하다.
- `printF`가 빈 인터페이스를 받는다.

```js
package main

import "fmt"

type Student struct {
  Age int
}

func PrintVal(v interface{}) {
  switch t := v.(type) {
  case int:
    fmt.Printf("v is int %d\n", int(t))
  case float64:
    fmt.Printf("v is float64 %f\n", float64(t))
  case string:
    fmt.Printf("v is string %s\n", string(t))
  default:
    fmt.Printf("Not supported type %T:%v\n", t, t)
  }
}

func main() {
  PrintVal(10)
  PrintVal(3.14)
  PrintVal("Hello")
  PrintVal(Student{15})
  // v is int 10
  // v is float64 3.140000
  // v is string Hello
  // Not supported type main.Student:{15}
}
```

### 인터페이스 기본값
- nil
```js
package main

import "fmt"

type Attacker interface {
  Attack()
}

func main() {
  var att Attacker
  att.Attack()

  fmt.Println(att)
  // panic: runtime error: invalid memory address or nil pointer dereference
  // [signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x108ca36]

  // goroutine 1 [running]:
  // main.main()
  // 				/Users/alex/Desktop/practice/go/ex6.4/ex6.4.go:11 +0x16
}
```
- 아무것도 안 가지고 있어서 오류 발생

## 인터페이스 타입 변환

```
          var a Interface
          t := a.(ConcreteType) -> 인터페이스 변수에 .(타입) 을 붙여 변환한다.
          |    |          |
  1. 인터페이스 변수 a를      |
          |        2. ConcreteType 타입으로 변환해
3. ConcreteType 타입 변수
    t를 생성하고 대입
```

```js
package main

import "fmt"

type Attacker interface {
	Attack()
}

type Monster struct {
	Lv int
}

func (m *Monster) Attack() {
	fmt.Println("Monster Attack")
}

func DoAttack(att Attacker) {
	if att != nil {
		att.Attack()

		var monster *Monster
		monster = att.(*Monster)
		fmt.Println(monster.Lv)

	}
}

func main() {
	DoAttack(&Monster{20})
}
```

## 인터페이스 타입 변환시 컴파일 에러
```js
package main

type Stringer interface {
	String() string
}

type Student struct {
}

func main() {
	var stringer Stringer
	stringer.(*Student) // String 메서드가 없으니까 빌드 타임에 에러

//   ./ex6.4.go:12:2: impossible type assertion: stringer.(*Student)
//         *Student does not implement Stringer (missing method String)
// ./ex6.4.go:12:2: stringer.(*Student) (comma, ok expression of type *Student) is not used
}
```
- 빌드 에러

```js
package main

import "fmt"

type Stringer interface {
	String() string
}

type Student struct {
}

func (s *Student) String() string {
	return "Student"
}

func main() {
	var stringer Stringer
	s := stringer.(*Student)

	fmt.Println(s)
	// panic: interface conversion: main.Stringer is nil, not *main.Student

	// goroutine 1 [running]:
	// main.main()
	//         /Users/alex/Desktop/practice/go/ex6.4/ex6.4.go:18 +0x29
  // 런타임 에러가 남
  // -> 문법적으로는 가능한데 교환하려고 보니 에러가 생길 때 컴파일 에러
}
```

## 다른 인터페이스 타입으로 변환
```js
package main

type Reader interface {
	Read()
}

type Closer interface {
	Close()
}

type File struct {
}

func (f *File) Read() {

}

func ReadFile(reader Reader) {
	c := reader.(Closer)
	c.Close()
}

func main() {
	file := &File{}
	ReadFile(file) // file - File 포인터는 Closer로 변환될 수 없다. File에는 Close()메서드가 없음
}
```

```js
package main

type Reader interface {
	Read()
}

type Closer interface {
	Close()
}

type File struct {
}

func (f *File) Read() {

}

func (f *File) Close() { // Close 메서드 추가
  
}

func ReadFile(reader Reader) {
	c := reader.(Closer)
	c.Close()
}

func main() {
	file := &File{}
	ReadFile(file) // file - File 포인터는 Closer로 변환 가능
}
```

## 타입 변환 성공 여부 반환

```
var a Interface
t, ok := a.(ConcreteType)
|  |
|  |___변환 성공 여부
|
|
타입 변환한 결과
```