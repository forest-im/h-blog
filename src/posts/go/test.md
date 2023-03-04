---
title: test
tag: golang
date: 2023-02-16 15:09:10
---

## 테스트 규칙
1. 파일명이 _test.go로 끝나야 한다
2. testing 패키지를 임포트해야 한다.
3. 테스트 코드는 func TestXxxx(t *testing.T)형태여야 한다.

## 테스트 좀 더 쉽게할 수 있는 외부 패키지
[testity](https://github.com/stretchr/testify)
```js
package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
  // go mod tidy로 모듈을 다운로드 받아야 한다.
)

func TestSquare1(t *testing.T) {
	assert.Equal(t, 81, square(9), "square(9) should be 81")

	// rst := square(9)
	// if rst != 81 {
	//   t.Errorf("square(9) should be 81 but returns %d", rst)
	// }
}

func TestSquare2(t *testing.T) {
	assert.Equal(t, 9, square(3), "square(3) should be 9")

	// rst := square(3)
	// if rst != 9 {
	// 	t.Errorf("square(3) should be 9 but returns %d", rst)
	// }
}

// 바운더리 테스트
func TestSquare3(t *testing.T) {
	assert.Equal(t, 0, square(0), "square(0) should be 0")

	// rst := square(0)
	// if rst != 0 {
	// 	t.Errorf("square(0) should be 0 but return %d", rst)
	// }
}
```


## TDD
### TDD의 장점
- 테스트가 촘촘해진다.
- 자연스러운 회기 테스트가 가능하다.
- 리팩토링이 쉬워진다.
- 코드 커버리지가 자연히 증가된다.

### TDD의 단점
- 모듈간 의존성이 높은 경우 테스트 케이스를 만들기 힘들다.
- 동시성 테스트에 취약하다
- 진정한 TDD가 아닌 형식적인 테스트로 전락할 수 있다.
- 지속적인 모니터링과 관리가 필요하다.

## 벤치마크
- 성능 검사시 사용

```js
package main

import "fmt"

func fibonacci1(n int) int {
	if n < 0 {
		return 0
	}

	if n < 2 {
		return n
	}

	return fibonacci1(n-1) + fibonacci1(n-1)
}

func fibonacci2(n int) int {
	if n < 0 {
		return 0
	}

	if n < 2 {
		return n
	}

	one := 1
	two := 0
	rst := 0
	for i := 2; i <= n; i++ {
		rst = one + two
		two = one
		one = rst
	}

	return rst
}

func main() {
	fmt.Println(fibonacci2(13))
	fmt.Println(fibonacci2(13))
}
```

```js
package main

import "testing"

func BenchmarkFibonacci1(b *testing.B) {
	for i := 0; i < b.N; i++ {
		// b.N -> N번만큼 반복
		fibonacci1(20)
	}
}

func BenchmarkFibonacci2(b *testing.B) {
	for i := 0; i < b.N; i++ {
		fibonacci2(20)
	}
}
// go test -bench . v 
```