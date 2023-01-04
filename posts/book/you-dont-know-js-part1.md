---

title: Java Script의 타입과 문법 (정리)
tag: YOU DON'T KNOW JS, 책, JS
date: 2022-12-23 19:40:54

---
<div className="toc">
<!-- vscode-markdown-toc -->

- 1. [궁금한 점](#)
  - 1.1. [궁금증 해결](#-1)
- 2. [JS 내장 타입](#JS)
- 3. [typeof null](#typeofnull)
- 4. [배열](#-1)
- 5. [유사 배열](#-1)
  - 5.1. [유사 배열 종류](#-1)
  - 5.2. [String 객체](#String)
- 6. [객체 레퍼 Wrapper](#Wrapper)
  - 6.1. [배열 메소드 빌려쓰기](#-1)
- 7. [리터럴](#-1)
- 8. [Number](#Number)
- 9. [특수 값](#-1)
  - 9.1. [식별자란](#-1)
  - 9.2. [값 아닌 값](#-1)
  - 9.3. [void 연산자](#void)
- 10. [특수 숫자](#-1)
  - 10.1. [The not number, number - NaN](#Thenotnumbernumber-NaN)
- 11. [0 (zero)](#zero)
- 12. [값 vs 레퍼런스](#vs)
- 13. [자바스크립트에서는 call by value만 존재한다.](#callbyvalue.)
- 14. [네이티브 - 내장 함수](#-)
  - 14.1. [가장 많이 쓰는 네이티브](#-1)
- 15. [Boxing](#Boxing)
- 16. [UnBoxing](#UnBoxing)
- 17. [문(statement)과 표현식(expression)](#statementexpression)
- 18. [식별자란?](#-1)
- 19. [연산자의 우선순위](#-1)
  - 19.1. [단락 평가](#-1)
  - 19.2. [결합성](#-1)
- 20. [에러](#-1)
  - 20.1. [TDZ 너무 이른 변수 사용](#TDZ)
- 21. [try catch finally](#trycatchfinally)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->
</div>

## 1. <a name=''></a>궁금한 점

- 책에서 문자열이 일종의 '유사 배열'이라고 나와있는데 MDN에서 보면 js에서 원시 값(primitive)은 객체가 아니면서 메서드도 가지지 않는 데이터라고 나와있다.

### 1.1. <a name='-1'></a>궁금증 해결

- 원시값이 메서드나 프로퍼티에 접근하려 하면 추가 기능을 제공해주는 특수한 객체, **원시 래퍼 객체(object wrapper)** 를 만들어준다.
  - 래퍼 객체는 원시 타입에 따라 종류가 다양하다. 원시 자료형의 이름을 그대로 차용해 `String`, `Number`, `Boolean`, `Symbol`
  - 메서드 또는 원시값의 프로퍼티에 접근하는 순간 특별한 객체인 래퍼 객체가 만들어진다. 메서드가 실행되고, 새로운 문자열이 반환된다. 특별한 객체는 파괴되고, 원시값만 남는다.
  - 이런 내부 프로세스를 통해 원시값을 가볍게 유지하면서 메서드를 호출할 수 있는 것

## 2. <a name='JS'></a>JS 내장 타입

1. null
2. undefined
3. boolean
4. number
5. string
6. object
7. symbol

## 3. <a name='typeofnull'></a>typeof null

- null은 falsy한 유일한 원시 값이지만 타입은 object이다.

## 4. <a name='-1'></a>배열

- 자바스크립트 배열은 타입이 엄격한 다른 언어와 달리 문자열, 숫자, 객체 심지어 다른 배열이나 어떤 타입의 값이라도 담을 수 있는 그릇이다.
- 배열 인덱스는 숫자인데, 배열 자체도 하나의 객체여서 키/프로퍼티 문자열을 추가할 수 있다.

## 5. <a name='-1'></a>유사 배열

- 직접 배열 리터럴로 선언한 array만 배열이다.
- 유사 배열 값 : 숫자 인덱스가 가리키는 값들의 집합

### 5.1. <a name='-1'></a>유사 배열 종류

1. dom 요소
2. Arguments
3. 문자열

### 5.2. <a name='String'></a>String 객체

- String 객체는 원시 타입인 문자열을 다룰 때 유용한 프로퍼티와 메소드를 제공하는 레퍼(wrapper) 객체이다.
- String 객체는 length 프로퍼티를 소유하고 있으므로 유사 배열 객체이다.

## 6. <a name='Wrapper'></a>객체 레퍼 Wrapper

### 6.1. <a name='-1'></a>배열 메소드 빌려쓰기

- Array prototype에서 메서드를 빌려쓸 수 있다.
- call, apply 이용
- Array.from 이용

## 7. <a name='-1'></a>리터럴

- 리터럴은 값 자체를 말한다. 상수는 변하지 않는 값으로 참조값의 위치를 말하지만 리터럴은 상수 또는 변수가 할당한 값 자체를 리터럴이라고 한다.
- 리터럴 표기법 : 선언과 동시에 값을 할당하는 것

## 8. <a name='Number'></a>Number

- js의 숫자 타입은 number가 유일. 정수, 부동 소수점 숫자를 모두 아우른다.
- js의 숫자 리터럴은 10진수 리터럴로 표시한다.
  - 소수점 앞 정수가 0이면 생랼 가능하다.
    - `var a = 0.42;`
    - `var a = .42;`
  - 소수점 이하가 0일 때도 생략 가능하다.
    - `var a = 42.0;`
    - `var a = 42.;`

부동 소수점 숫자의 최댓값 : Number.MAX_VALUE로 정의
부동 소수점 숫자의 최솟값 : Number.MIN_VALUE로 정의

정수는 Number.MAX_VALUE보다 훨씬 작은 수준에서 안전값의 범위가 정해져 있다.(9천 조 이상)

- 안전한 정수 최댓값 Number.MAX_SAFE_INTEGER
- 안전한 정수 최솟값 Number.MIN_SAFE_INTEGER

## 9. <a name='-1'></a>특수 값

### 9.1. <a name='-1'></a>식별자란

### 9.2. <a name='-1'></a>값 아닌 값

- null은 식별자 x
- undefined는 식별자로 사용할 수 있다. 값 할당도 됨 (strict 모드 아닐 때)

### 9.3. <a name='void'></a>void 연산자

- 표현식 void \_\_는 어떤 값이든 무효로 만들어 항상 결과값을 undefined로 만든다.

## 10. <a name='-1'></a>특수 숫자

### 10.1. <a name='Thenotnumbernumber-NaN'></a>The not number, number - NaN

- NaN은 Not A Number라는 뜻이지만 이 뜻 보다는 유효하지 않은 숫자, 실패한 숫자가 더 어울림
- NaN은 경계 값(Sentinel Value)의 일종으로 숫자 집합 내에서 특별한 종류의 에러 상황을 나타낸다.
- NaN은 다른 어떤 NaN과도 동등하지 않다. (자기 자신과도 같지 않다.) 유일무이한 값
- `isNaN`보다 `Number.isNaN()` 사용하기

## 11. <a name='zero'></a>0 (zero)

- js에는 보통의 0과 음의 0(-0)이 있다.

## 12. <a name='vs'></a>값 vs 레퍼런스

- 자바스크립트에서는 **값의 타입** 만으로 값 - 복사, 레퍼런스 - 복사 둘 중 한쪽이 결정된다.
- null, undefined, string, number, symbol, boolean 같은 원시값 (스칼라 원시 값)은 언제나 값 - 복사 방식으로 할당/전달된다.
- 객체(배열과 박싱된 객체 래퍼 전체)나 함수 등 합성 값은 할당/전달시 반드시 **레퍼런스 사본** 을 생성한다.

## 13. <a name='callbyvalue.'></a>자바스크립트에서는 call by value만 존재한다.

- 원시값은 값 - 복사에 의해, 합성 값(객체 등)은 레퍼런스 - 복사에 의해 값이 할당/전달된다.
- 자바스크립트에서의 레퍼런스는 다른 언어의 레퍼런스/포인터와는 전혀 다른 개념으로, 또 다른 변수/레퍼런스가 아닌 오직 자신의 값만을 가리킨다.

---

## 14. <a name='-'></a>네이티브 - 내장 함수

### 14.1. <a name='-1'></a>가장 많이 쓰는 네이티브

- `String()`
- `Number()`
- `Boolean()`
- `Array()`
- `Object()`
- `Function()`
- `RegExp()`
- `Date()`
- `Error()`
- `Symbol()`

- 네이티브는 생성자 함수처럼 사용할 수 있지만 new String()으로 생성된 결과값은 string이 아닌 객체이다.

## 15. <a name='Boxing'></a>Boxing

- 박싱이란 래핑해주는 것.
- js는 원시값을 자동으로 박싱해주므로 메서드를 쓸 수 있다.
- 문자열, 숫자 등 메서드를 빈번하게 쓰므로 엔진이 암시적으로 객체를 생성하는 것이 아니라 처음부터 객체로 갖게 한다면?
  - 원시값은 가능한 한 빠르고 가벼워야 한다. 미리 Pre-Optimize하면 프로그램이 더 느려질 수 있다. 그래서 직접 생성자함수로 객체를 만들 필요 없이 원시값을 사용하자.

## 16. <a name='UnBoxing'></a>UnBoxing

- 객체 레퍼의 원시 값은 valueOf() 메서드로 추출한다.

- 정규 표현식은 리터럴 형식으로 정의할 것을 권장.

- Error() 생성자는 앞에 new가 있든 없든 결과는 같다.
- error 객체의 주 용도는 현재의 실행 스택 컨텍스트(Execution Stack Context)를 포착하여 객체에 답는 것

---

## 17. <a name='statementexpression'></a>문(statement)과 표현식(expression)

- Statement : 문장 (Sentence)
- Expression : 어구 (Phrase)
- 연산자 : 구두점/접속사

모든 문은 완료 값을 가진다. ()

```js
var a = 3 * 6; // 선언문
a = 3 * 6; // 할당 표현식
var b = a; // 선언문
b = a; // 할당 표현식
b; // 표현식 문
```

레이블 문 Labeled Statement
레이블 점프
continue와 break 문은 선택적으로 어떤 레이블을 받아 goto처럼 프로그램의 실행 흐름을 점프시킨다.
레이블이 머지?
[label](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/label)

- 레이블 구문은 `break`나 `continue` 구문과 함께 사용할 수 있다. 원하는 식별자로 구문 앞에 레이블을 추가할 수 있다.

식별자란?

## 18. <a name='-1'></a>식별자란?

- 코드 내의 변수, 함수, 혹은 속성을 식별하는 문자열
- 할당 대상
- js에서 식별자는 영문자, 숫자, 언더스코어 또는 달러만을 사용할 수 있다.

## 19. <a name='-1'></a>연산자의 우선순위

- `,` : 어떤 연산자라도 이 연산자보다 먼저이다.
- &&가 || 연산자보다 우선
- &&, ||는 ? : 보다 우선

### 19.1. <a name='-1'></a>단락 평가

- &&, || 연산자는 좌측 피연산자의 평가 결과만으로 전체 결과가 이미 결정될 경우 우츠 피연산자의 평가를 건너뛴다.
- 단락 평가의 동작 방식은 두 번째 피연산자가 변수 할당과 같은 부수적인 효과를 가지는 표현식 일 때 명확히 볼 수 있다.

### 19.2. <a name='-1'></a>결합성

- &&, ||는 좌측 결합성을 가진다.
- ? : 조건부 연산자는 우측 결합성을 가진다.
- 처리 방향이 중요한 이유는 함수 호출과 같은 표현식이 있을 때 부수효과를 일으킬 수 있기 때문이다.

## 20. <a name='-1'></a>에러

- 조기에러 (컴파일러가 던진 잡을 수 없는 에러)와 런타임 에러(try catch로 잡을 수 있는 에러)로 분류된다.

- ReferenceError
  - 스코프에서 대상을 찾았는지와 관계
- TypeError
  - 함수가 아닌 값을 함수처럼 실행하거나 null 또는 undefined 값을 참조할 때
  - 스코프 검색은 성공했으나 결괏값을 가지고 적합하지 않거나 불가능한 시도를 한 경우

### 20.1. <a name='TDZ'></a>TDZ 너무 이른 변수 사용

- 임시 데드 존 (Temporal Dead Zone)
- 아직 초기화를 하지 않아 변수를 참조할 수 없는 코드 영역
- let 블록 스코핑이 대표적인 예

```js
a;
let a = 1;
```

```js
var b = 3;
function foo(a = 42, b = a + b + 5) {
  // ...
}

// Uncaught ReferenceError: Cannot access 'b' before initialization
```

- 아직 TDZ에 남아 있는 b를 참조하려고 하기 때문에 에러가 난다.
- 함수 인자의 디폴트 값은 마치 하나의 좌측 -> 우측 순서로 let 선언을 한 것과 동일하게 처리된다. 그래서 일단 무조건 TDZ에 속하게 된다.

## 21. <a name='trycatchfinally'></a>try catch finally

- finally 절에서 예외가 던져지면, 이전의 실행 결과는 모두 무시한다.
- finally 절의 return은 그 이전에 실행된 try나 catch의 return을 덮어쓴다. 단 명시적으로 return을 써주어야 하고 return을 쓰지 않으면 이전 return이 실행된다.
