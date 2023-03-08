---
title: 웹 만들기
tag: golang
date: 2023-02-16 21:10:07
published: false
---

```js
package main

import (
	"fmt"
	"net/http"
)

type fooHandler struct{}

func (f *fooHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello foo!")
}

func barHandler(w http.ResponseWriter, r *http.Request) {
  name := r.URL.Query().Get("name")
  if name == "" {
    name = "World"
  }

	fmt.Fprint(w, "Hello %s!", name)
}

func main() {
	mux := http.NewServeMux()
	// mux = router
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "Hello World")
		// writer에다가 프린트 response로 전달
	})
	// HandleFunc 핸들러 등록 (절대 경로(초기 경로))
	// w : http.ResponseWriter, r : request
	// 핸들러를 function 형태로 등록 -> HandleFunc
	// 핸들러 등록 -> (인스턴스 형태로 등록) -> Handle

	mux.HandleFunc("/bar", barHandler)

	mux.Handle("/foo", &fooHandler{})

	http.ListenAndServe(":3000", mux)
}
```
- mux -> router
  - `ListenAndServe`에 mux 등록해주기 : 인스턴스 넘겨주는 방식

### query받기
- `r.URL.Query().Get("name")`

### req body
- field Body `io.ReadCloser`
  - io.ReadCloser는 Reader, Closer를 포함하고 있는 인터페이스

## 스트림
- 스트림이란 데이터의 흐름이라고 할 수 있다.
- 스트림은 운영체제에 의해 생성되는 가상의 연결 고리를 의미하며, 중간 매개자 역할을 한다.

```
               -> 키보드
               -> 모니터
프로그램 <- 스트림 -> 파일
               -> ...
               -> 네트워크
```
- 스트림은 한 방향으로만 통신할 수 있으므로, 입력과 출력 동시에 처리할 수는 없다.
  - 따라서 스트림은 사용 목적에 따라 입력 스트림과 출력 스트림으로 구분된다.

[[번역] Go 둘러보기 - bytes + strings 패키지](https://mingrammer.com/translation-go-walkthrough-bytes-strings-packages/#%EC%8A%A4%ED%8A%B8%EB%A6%BC%EC%9D%84-%EC%9C%84%ED%95%9C-%EB%AC%B8%EC%9E%90%EC%97%B4%EC%8A%AC%EB%9D%BC%EC%9D%B4%EC%8A%A4-%EA%B0%9C%EC%A1%B0%ED%95%98%EA%B8%B0)

- Go언어는 byte stream을 다루는 프로그래밍 언어다. 바이너리 데이터를 읽거나 쓸 때 byte 형식을 주로 사용한다.
- network connection으로 부터 넘어오는 데이터를 파일로 저장하거나 처리해야 하는 경우 등의 경우에 모두 byte stream을 다룰 수 있어야 한다.
- io package활용
- Go는 바이트를 다루기 위해 io라는 표준 라이브러리를 사용함. io 패키지 stream of byte를 다루기 위해 필요한 인터페이스와 helper함수들을 제공한다. -> io.Reader, io.Writer
```
Data Source -> io.Reader -> [A][B][C][D][E] -> io.Writer -> Target
```

- Go에서는 io패키지의 io.Reader, io.Writer 인터페이스를 활용하여 I/O stream을 다루는 다양한 방법들을 제공함 (예: in-memory나 파일에 적재, network connection을 통한 전송)

## Buffered Stream
- 버퍼란 temporary region of volatile memory (RAM)을 의미, 즉 메모리에 특정 공간을 차지한다.
- built-in 패키지인 `bytes`는 `Buffer`라는 자료구조를 통해 variable size buffer를 제공함
[[Golang] go가 byte stream을 다루는 방법에 대하여 (io.Reader, io.Writer, Copy, Close, Seeker, Pipe, Buffer 등 개념 뿌시기)](https://etloveguitar.tistory.com/m/100)


```js
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type User struct {
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
}

// 뒤 `json:""`
// 어노테이션. 설명을 붙여주는 것
// 설명을 붙이면 Marshal에서 자동으로 저렇게 바꿔준다.

type fooHandler struct{}

func (f *fooHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// request로 json이 올것임
	user := new(User) // user structure 형태로 json이 올것임
	// json 파싱하기
	err := json.NewDecoder(r.Body).Decode(user) // NewDecoder의 인자 : r io.Reader
	// r.Body 값을 읽어서 decode
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, "Bad Request: ", err)
		return
	}
	user.CreatedAt = time.Now()
	// 지금 user는 go의 structure 형태이므로 다시 json으로 변환하는 과정 필요

	data, _ := json.Marshal(user) // 어떤 형태를 받아서 json형태로 인코딩 해준다.
	// data는 byte array 밑에서 string으로 변환해야 함 (json은 string이니까)

	w.Header().Add("content-type", "application/json")
	w.WriteHeader(http.StatusOK)
	// json타입이라고 header에 알려줘야 한다.

	fmt.Fprint(w, string(data))
}

func barHandler(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")

	if name == "" {
		name = "World"
	}
	fmt.Fprintf(w, "Hello %s!", name)
}

func main() {
	mux := http.NewServeMux()
	// mux = router
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "Hello World")
		// writer에다가 프린트 response로 전달
	})
	// HandleFunc 핸들러 등록 (절대 경로(초기 경로))
	// w : http.ResponseWriter, r : request
	// 핸들러를 function 형태로 등록 -> HandleFunc
	// 핸들러 등록 -> (인스턴스 형태로 등록) -> Handle

	mux.HandleFunc("/bar", barHandler)

	mux.Handle("/foo", &fooHandler{})

	http.ListenAndServe(":3000", mux)
}
```

## test
- GoConvey
- [GoConvey](https://github.com/smartystreets/goconvey)
  - 계속 실행시켜 주지 않아도 자동으로 업데이트 돼서 결과를 볼 수 있다.
- `$GOPATH/bin/goconvey`
- [stretchr/testify](https://github.com/stretchr/testify)
  - `go get github.com/stretchr/testify/assert`
  - assert만 가져오겠다

---

## 모듈
Go 모듈은 다음과 같은 특징을 가집니다:

모듈은 go.mod 파일로 정의됩니다. go.mod 파일은 모듈 이름, 버전 및 종속성을 명시합니다.

모듈은 버전 제어를 쉽게 할 수 있도록 해 줍니다. 모듈은 고유한 버전 번호를 갖고, 해당 모듈의 버전을 명시적으로 지정할 수 있습니다.

모듈은 공개 저장소에서 다운로드할 수 있으며, 개인 저장소에서도 사용할 수 있습니다. go.mod 파일은 모듈을 참조하는 URL을 포함하고 있으며, 해당 URL을 사용하여 모듈을 다운로드할 수 있습니다.

모듈은 다른 모듈에 의존할 수 있습니다. 모듈의 종속성은 go.mod 파일에서 선언됩니다. 모듈을 가져올 때 해당 모듈의 종속성도 함께 가져옵니다.

모듈은 패키지와 함께 사용됩니다. 모듈 내에 여러 패키지가 포함될 수 있습니다. 모듈 내의 패키지를 가져올 때는 패키지의 경로를 모듈 이름으로부터 상대적으로 지정합니다.

Golang 모듈 시스템은 프로젝트의 의존성 관리를 간소화하고, 코드의 재사용성을 높이며, 버전 관리를 용이하게 합니다. 따라서 Golang 개발자들은 모듈 시스템을 적극적으로 활용하여 더욱 효율적인 개발을 할 수 있습니다.

```js
user := User{
    Name: "John Doe",
    Interests: []Interest{
        Interest{
            Title: "Programming",
            Description: "Coding stuff",
            Level: 5,
        },
        Interest{
            Title: "Music",
            Description: "Playing guitar",
            Level: 3,
        },
    },
}

collection := client.Database("database").Collection("users")
result, err := collection.InsertOne(context.Background(), user)
```

## 0219 -일
### 목표
- db 연결 v
- create, post 

## mongodb 연결

- go driver 이용
-[mongodb quick start](https://www.mongodb.com/docs/drivers/go/current/quick-start/#std-label-golang-quickstart)

## bson
- [[MongoDB] MongoDB에서 사용하는 JSON vs BSON - 쿤즈랜드](https://koonsland.tistory.com/86)
- Binary JSON
- JSON과 동일한 구조지만 Binary 형태로 변경된 구조를 말한다.
- mongoDB는 내부적으로 BSON을 사용한다. 사람에게 보여질 때에는 JSON의 형태로 보여주고 저장할 때나 네트워크로 전송할 때에는 BSON 형태로 만들어서 저장 또는 전송한다.
- BSON은 JSON보다 더 디테일하게 표현할 수 있다.
- bson.M ? 
	- bson.M -> M은 Map
	- bson.D -> D는 Slice
		- 이름과 값을 순서대로 저장하는데 사용된다. 필드 이름은 문자열 형태로 표현되지 않으며, bson.E 타입을 사용하여 표현된다. bson.D는 도큐먼트의 필드 순서가 중요한 경우 사용된다.

## connection
- [MongoDB Golang 드라이버의 컨텍스트와 커넥션](https://www.popit.kr/mongodb-golang-%EB%93%9C%EB%9D%BC%EC%9D%B4%EB%B2%84%EC%9D%98-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8%EC%99%80-%EC%BB%A4%EB%84%A5%EC%85%98/)

---
- login은 없으니까.. 날짜를 id값으로
- query date -> 날짜에 해당하는 스케줄 콜렉션이 없으면, C (POST)
	- 있으면 Update (Patch)

아 mongoose는 nods js odm이구나
```
type User struct {
    ID       primitive.ObjectID `bson:"_id,omitempty"`
    Name     string             `bson:"name"`
    Age      int                `bson:"age"`
    Address  string             `bson:"address"`
    Email    string             `bson:"email"`
    Password string             `bson:"password"`
}
```

## go 환경변수
[GoDotEnv](https://github.com/joho/godotenv)




- 요청은 year month day 형식으로 처리 할 것임 (230220)
- db의 id주소로 보내는 것이 아닌, 날짜로 id를 사용해서 만들어서 보낸다.

- 달력을 펼쳤을 때 스케줄 목록이 다 나오는데, 이 경우 달 별로 스키마를 관리해서 달 스키마에 제목을 추가하면 좋을 것 같음