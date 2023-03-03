---
title: 함수, 상수
tag: golang
date: 2023-02-11 23:51:35
published: false
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
const Red = 0
const Blue = 1
const Green = 2
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
const PI = 3.14
```
- 타입이 없으면 타입이 쓰일 때 결정된다.
- 타입이 없는 건 리터럴 형태라고 보면 된다.

## 상수 깊이 보기
- 상수는 좌변으로 사용할 수 없다. (l - value)
  - 좌측은 메모리 공간, 우측은 값
  - 항상 값으로만 쓰인다.
  - 즉 메모리 공간이 없다. (메모리 공간은 동적 메모리라고 한다.) 메모리 공간을 할당할 필요가 없는 것