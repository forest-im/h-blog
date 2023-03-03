---
title: Map
tag: golang
date: 2023-02-16 14:11:03
published: false
---

## Map
- 해시테이블을 구현한 자료구조
- Go 언어는 Map 타입 내장하고 있음
  - `map[Key타입]Value타입`과 같이 선언할 수 있다.

### map 선언하기
```
var idMap map[int]string
```
- 정수를 key로 갖고, string을 값으로 받는 맵
- 선언된 변수 idMap은 nil 값을 갖는다. -> `Nil Map`이라 부른다.
  - Nil map에는 어떤 데이터를 쓸 수 없음 map을 초기화하기 위해 make()함수를 사용할 수 있다.

### make 이용해서 초기화
```
idMap = make(map[int]string)
```

### 리터럴 사용해서 초기화
```
tickets := map[string]string {
  "GOOG": "Google Inc",
  "MSFT": "Microsoft",
  "FB": "FaceBook",
}
```

```js
func main() {
  var m map[int]stirng

  m = make(map[int]string)

  // 추가 혹은 갱신
  m[901] = "Apple"
  m[134] = "Grape"
  m[777] = "Tomato"

  // 키에 대한 값 읽기
  str := m[134]
  println(str)

  noData := m[999] // 값이 없으면 nil 혹은 zero 리턴
  println(noData)

  // 삭제
  delete(m, 777)
}
```

### Map 키 체크
- `map변수[키]`읽기를 수행할 때 2개의 리턴값을 리턴한다.
  - 1. 키에 상응하는 값
  - 2. 그 키가 존재하는지 아닌지를 나타내는 bool 값

```js
func main() {
  tickets := map[string]string {
    "GOOG": "Google Inc",
    "MSFT": "Microsoft",
    "FB": "FaceBook",
  }

  val, exists := tickers["MSFT"]
  if !exists {
    println("No MSFT ticker")
  }
}
```

### for 루프를 사용한 Map 열거
- `Map` 컬렉션에 for range를 사용하면, Map 키와 Map 값 2개의 데이타를 리턴함.
- Map은 unordered이므로 순서는 무작위다.

```
func main() {
  myMap := map[string]string {
    "A": "Apple",
    "B": "Banana",
    "C": "Charlie",
  }

  for key, val := range myMap {
    fmt.Println(key, val)
  }
}
```