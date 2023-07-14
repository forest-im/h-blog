---
title: Web Storage, Cookies에 대해 정리해보자
tag: LocalStorage, SessionStorage, Cookies
date: 2023-07-13 14:55:20
---

<img src="https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" width="600">

쿠키, localStorage.. 매번 옵션에 대해 기억이 나질 않아 정리를 해본다🍪

## Web Storage

웹 스토리지 객체인 localStorage와 session Storage는 브라우저 내에 키-값 쌍을 저장할 수 있게 해준다.

## Local Storage

LocalStorage를 잘 사용하기 위해서는 저장된 데이터의 위협 수준이 매우 낮아야 한다. 추가적으로 쉽게 해킹되지 않도록 저장된 데이터를 암호화하는 것이 좋다.

- HTML5가 나온 이후 쿠키의 많은 사용 방법들은 LocalStorage 방법으로 대체되었다.
- origin이 같은 경우 데이터는 모든 탭과 창에서 공유된다. (origin(domain, port, protocol))만 같으면 url 경로가 달라도 동일한 결과를 볼 수 있다.)
- 브라우저가 OS가 재시작하더라도 데이터가 파기되지 않는다.

## Session Storage

- localStorage보다 자주 사용되지는 않는다. 제공하는 프로퍼티는 같지만, 훨씬 제한적이기 때문.
- 현재 떠 있는 탭에서만 유지된다. 같은 페이지라도 다른 탭이라면 다른 곳에 저장되기 때문이다.
- 페이지를 새로 고침해도 데이터가 유지된다. 하지만 탭을 닫고 새로 열 때는 사라진다.

### 쿠키 외의 방식을 사용하는 이유

쿠키를 사용하면 브라우저 데이터를 저장할 수 있는데, 왜 또 다른 객체를 사용해 데이터를 저장하는 걸까? 이유로는 아래와 같다.

- 쿠키와 다르게 웹 스토리지 객체는 네트워크 요청 시 서버로 전송되지 않는다. HTTP 요청에서 데이터를 주고받지 않기 때문에 클라이언트와 서버간의 전체 트래픽과 낭비되는 대역폭의 양을 줄일 수 있다.
- LocalStorage는 최대 5MB의 데이터를 저장할 수 있다. 쿠키가 저장할 수 있는 최대 4KB 용량보다 훨씬 많은 용량이다.
- 쿠키와 또 다른 점은 서버가 HTTP 헤더를 통해 스토리지 객체를 조작할 수 없다는 점. 웹 스토리지 객체 조작은 모두 JavaScript 내에서 수행된다.
- 웹 스토리지 객체는 도메인, 프로토콜, 포트로 정의되는 origin에 묶여있다. 따라서 프로토콜과 서브 도메인이 다르면 데이터에 접근할 수 없다.

## 작지만 강력한 Cookies

- 쿠키는 브라우저에 저장되는 작은 크기의 문자열로, RFC 6265 명세에서 정의한 HTTP 프로토콜의 일부이다.
- 쿠키는 주로 웹 서버에 의해 만들어진다. 서버가 HTTP 응답 헤더의 Set-Cookie에 내용을 넣어 전달하면, 브라우저는 이 내용을 자체적으로 브라우저에 저장한다. 브라우저는 사용자가 쿠키를 생성하도록 한 동일 서버(사이트)에 접속할 때마다 쿠키의 내용을 Cookie 요청 헤더에 넣어서 함께 전달한다.
- 쿠키는 클라이언트 식별과 같은 인증에 가장 많이 쓰인다.
- 쿠키는 **최대 4KB**의 용량을 가진 매우 작은 양의 데이터이다. 그리고 도메인 하나당 저장할 수 있는 쿠키의 개수는 20여 개 정도로 한정되어 있다. (브라우저에 따라 조금씩 다르다.)
- **문자열**만 저장할 수 있다.
- 쿠키의 또 다른 용도로는 사이트에서 제한된 인터넷 사용 기록을 기반으로 사용자 경험을 개선하는 것이다.

### Persistent Cookies

Persistent Cookies는 만료일을 가진다. 이 쿠키는 만료일까지 유저의 디스크에 저장되고 만료일이 지나면 삭제된다. 유저들이 방문할 때마다 유저 경험을 커스텀하기 위해 특정 웹사이트에서 행동을 기록하는 등 여러 활동들에 사용될 수 있다.

### Session Cookies

세션 쿠키는 만료일을 포함하지 않는다. 대신에 브라우저나 탭이 열려있는 동안에만 저장된다. 이 유형의 쿠키는 탭을 닫으면 모든 정보를 잊어버리기 때문에 **은행 유저들의 자격 증명을 저장**하는 데 사용될 수 있다.

### 쿠키에 접근하기

`document.cookie` 프로퍼티를 이용하면 브라우저에서도 쿠키에 접근할 수 있다.

### 쿠키 쓰기

`document.cookie`에 직접 값을 쓸 수 있다. 이때 cookie는 데이터 프로퍼티가 아닌 접근자 프로퍼티이다. 접근자 프로퍼티에 값을 할당하는 것은 데이터 프로퍼티에 값을 할당하는 것과는 조금 다르게 처리된다.

`document.cookie`에 값을 할당하면, 브라우저는 이 값을 받아 해당 쿠키를 갱신한다. 이때, **다른 쿠키의 값은 변경되지 않는다.**

```js
document.cookie = "user=John"; // 이름이 user인 쿠키의 값만 갱신한다.
```

쿠키의 이름과 값에는 특별한 제약이 없기 때문에 모든 글자가 허용된다. 하지만 형식의 유효성을 일관성 있게 유지하기 위해 반드시 내장 함수 `encodeURIComponent`를 사용하여 이름과 값을 이스케이프 처리해 줘야 한다.

```js
const name = "my name";
const value = "John Smith"; // 특수 값인 공백은 인코딩 처리해 줘야 한다.

document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

alert(document.cookie); // ...; my%20name=John%20Smith
```

쿠키를 쓸 때 옵션은 key, value 쌍 뒤에 `;`로 구분해줘야 한다.

```js
document.cookie = "user=John"; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
```

### 쿠키 설정

#### domain

- `domain=site.com`
- 쿠키에 접근 가능한 도메인을 설정한다. domain 옵션에 아무 값도 넣지 않았다면 쿠키를 설정한 도메인에서만 쿠키에 접근할 수 있다. 이 외의 까다로운 제약사항으로는 서브 도메인에서도 쿠키 정보를 얻을 수 없다는 점이다.
- **서브 도메인이나 다른 도메인에서 쿠키에 접속할 방법은 없다. `site.com`에서 생성한 쿠키를 `other.com`에선 절대 전송받을 수 없다.** 이런 제약사항은 안정성을 높이기 위해 만들어졌다. 민감한 데이터가 저장된 쿠키는 관련 페이지에서만 볼 수 있도록 하기 위해서 말이다. 하지만 domain 옵션에 **루트 도메인을 명시적으로 설정하면 서브 도메인에서도 쿠키에 접근할 수 있다.**

```js
document.cookie = "user=John; domain=site.com";
```

이렇게 설정하면 forum.site.com 같은 서브도메인에서도 쿠키 정보를 얻을 수 있다.

#### expires와 max-age

expires나 max-age(만료 기간) 옵션이 지정되어 있지 않으면, 브라우저가 닫힐 때 쿠키도 함께 삭제된다. 이런 쿠키를 **Session Cookie** 라고 부른다.

- 브라우저는 설정된 유효 일자까지 쿠키를 유지하다가, 해당 일자가 도달하면 쿠키를 자동으로 삭제한다.
- 쿠키의 유효 일자는 반드시 GMT(Greenwich Mean Time) 포맷으로 설정해야 한다. `date.toUTCString`을 사용하면 해당 포맷으로 쉽게 변경할 수 있다.

```js
const date = new Date(Date.now() + 86400e3);
date = date.toUTCString();
document.cookie = "user=John; expires=" + date;
```

- max-age는 expires 옵션의 대안으로, 쿠키 만료 기간을 설정할 수 있게 해준다. 현재부터 설정하고자 하는 만료일시까지의 시간을 초로 환산한 값을 설정한다.
- 0이나 음수값을 설정하면 쿠키는 바로 삭제된다.

```js
document.cookie = "user=John; max-age=3600";
```

### secure

이 옵션을 설정하면 HTTPS로 통신하는 경우에만 쿠키가 전송된다.
`secure` 옵션이 없으면 기본 설정이 적용되어 프로토콜 상관없이 읽을 수 있게 된다. 쿠키는 기본적으로 도메인만 확인하지 프로토콜을 따지진 않기 때문이다.

### samesite

`samesite`옵션은 크로스 사이트 요청 위조(cross-site request forgery, XSRF) 공격을 막기 위해 만들어진 옵션이다.

#### XSRF 공격

추가 필요

#### samesite 옵션 - lax

추가 필요

### httpOnly

추가 필요

### 서드 파티 쿠키

추가 필요

### GDPR

추가 필요

## 출처 및 참고

- [쿠키 vs 로컬스토리지: 차이점은 무엇일까? ](https://erwinousy.medium.com/%EC%BF%A0%ED%82%A4-vs-%EB%A1%9C%EC%BB%AC%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80-%EC%B0%A8%EC%9D%B4%EC%A0%90%EC%9D%80-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C-28b8db2ca7b2)
- [쿠키와 document.cookie](https://ko.javascript.info/cookie)
