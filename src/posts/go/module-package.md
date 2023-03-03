---
title: 모듈과 패키지
tag: golang
date: 2023-02-13 17:24:57
published: false
---

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
- __대문자__ 로 시작하면 외부 공개
- __소문자__ 로 시작하면 비공개

## 패키지 초기화
- 패키지가 프로그램에 포함되어 초기화 될 때 패키지 내의 `init()`가 __한 번만__ 호출된다.
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
- 시간 초과 또는 cancel되면 컨텍스트가 만료된 것으로 간주, but, cancel된다고 디비 서버가 중단되지 않을 수 있는 것 같음https://stackoverflow.com/questions/70779021/does-cancelling-the-context-for-a-query-using-the-mongodb-go-driver-affect-runni

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