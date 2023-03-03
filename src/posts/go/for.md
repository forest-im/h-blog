---
title: for
tag: golang
date: 2023-02-12 16:12:29
published: false
---

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