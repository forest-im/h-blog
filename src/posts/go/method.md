---
title: 메서드
tag: golang
date: 2023-02-14 14:32:42
published: false
---

## 메서드
- 메서드는 타입에 속한 __함수__ 이다.
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

