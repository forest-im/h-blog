---
title: 모던자바스크립트 - 객체
tag: JS, 객체, 책, 모던 자바스크립트
date: 2023-01-02 21:21:54
---

- [Object](#object)
  - [객체 생성 방법](#객체-생성-방법)
- [Pass-by-reference, Pass-by-value](#pass-by-reference-pass-by-value)
  - [Pass-by-reference](#pass-by-reference)
  - [Pass-by-value](#pass-by-value)
- [객체와 변경불가성 (Immutability)](#객체와-변경불가성-immutability)

## Object

자바스크립트에서는 원시 타입(Primitives)을 제외한 나머지 값들(함수, 배열, 정규표현식 등)은 모두 객체이다.asdf

- JS의 객체는 키와 값으로 구성된 프로퍼티들의 집합이다.
- JS의 함수는 일급 객체이므로 값으로 취급할 수 있다.
- JS의 객체는 객체지향의 상속을 구현하기 위해 **프로토타입(prototype)** 이라고 불리는 객체의 프로퍼티와 메소드를 상속받을 수 있다.
- 프로퍼티 값이 함수인 경우 구분짓기 위해 메소드라고 한다.

### 객체 생성 방법

- 자바와 같은 클래스 기반 객체 지향 언어는 클래스를 사전에 정의하고 필요한 시점에 new 연산자를 사용하여 인스턴스를 생성하는 방식으로 객체를 생성한다. 하지만 자바스크립트는 프로토타입 기반 객체 지향 언어로서 별도의 객체 생성 방법이 존재한다. (ECMAScript 6에서 새롭게 도입된 클래스는 새로운 객체지향 모델을 제공하는 것이 아니며 클래스도 사실 함수이고 기존 프로토타입 기반 패턴의 문법적 설탕이다.)

1. 객체 리터럴

```js
const obj = {};
```

- 객체 리터럴 방법도 JS 내부에서는 생성자 함수를 이용하여 만든다. 즉 Object 생성자 함수로 객체를 생성하는 것을 단순화시킨 축약 표현이다.

2. Object 생성자 함수

```js
const obj = new Object();
```

3. 생성자 함수

- 1, 2번의 방법으로는 프로퍼티 값만 다른 여러 개의 객체를 생성할 때 불편하다. 이럴 때 생성자 함수를 사용하면 프로퍼티가 동일한 여러 개의 객체를 간편하게 생성할 수 있다.

```js
// 출처 : https://poiemaweb.com/js-object
// 생성자 함수
function Person(name, gender) {
	this.name = name;
	this.gender = gender;
	this.sayHello = function () {
		console.log("Hi! My name is " + this.name);
	};
}

// 인스턴스의 생성
var person1 = new Person("Lee", "male");
var person2 = new Person("Kim", "female");

console.log("person1: ", typeof person1);
console.log("person2: ", typeof person2);
console.log("person1: ", person1);
console.log("person2: ", person2);

person1.sayHello();
person2.sayHello();
```

## Pass-by-reference, Pass-by-value

### Pass-by-reference

- 객체는 참조 방식으로 전달된다. 결코 복사되지 않는다.
- 객체는 프로퍼티를 변경, 추가, 삭제가 가능하므로 변경 가능한 값이라 할 수 있다.
- 객체 타입은 동적으로 변화할 수 있으므로 어느 정도의 메모리 공간을 확보해야 하는지 예측할 수 없기 때문에 런타임에 메모리 공간을 확보하고 메모리의 힙 영역(Heap Segment)에 저장된다.

### Pass-by-value

- 원시 타입은 값이 복사되어 전달된다. 이를 pass-by-value라 한다.
- 원시 타입은 런타임(변수 할당 시점)에 메모리의 스택 영역(Stack Segment)에 고정된 메모리 영역을 점유하고 저장된다.

## 객체와 변경불가성 (Immutability)

Immutability는 객체가 생성된 이후 그 상태를 변경할 수 없는 디자인 패턴을 의미한다.

- 객체는 참조 형태로 전달하고 전달 받는다. 객체가 참조를 통해 공유되어 있다면 그 상태가 얼마든지 변경될 수 있기 때문에 문제가 될 가능성도 커지게 된다.
- 의도하지 않은 객체의 변경이 발생하는 원인의 대다수는 '레퍼런스를 참조한 다른 객체에서 객체를 변경'하기 때문이다.
  - "해결 방법 ↓"
  - "불변 데이터 패턴" 객체를 불변객체로 만들어 프로퍼티의 변경을 방지하며 객체의 변경이 필요한 경우에는 참조가 아닌 객체의 방어적 복사를 통해 새로운 객체를 생성한 후 변경한다. (불변 객체로 사용하면 복제나 비교를 위한 조작을 단순화 할 수 있고 성능 개선에도 도움이 된다. 하지만 객체가 변경 가능한 데이터를 많이 가지고 있는 경우 오히려 부적절한 경우가 있다.)
  - Observer 패턴으로 객체의 변경에 대처한다.
