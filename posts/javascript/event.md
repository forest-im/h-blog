---
title: "DOM Event"
tag: DOM, Event, JS, 스터디01
date: 2022-12-27 16:38:40
---

<div className="toc">
<!-- TOC tocDepth:2..3 chapterDepth:2..6 -->

  - [TL;DR](#tldr)
  - [Event Handler](#event-handler)
  - [Event 핸들러 등록](#event-핸들러-등록)
- [Event 핸들러 등록 방법](#event-핸들러-등록-방법)
- [event 객체의 공통 프로퍼티](#event-객체의-공통-프로퍼티)
- [버블링하지 않는 이벤트](#버블링하지-않는-이벤트)
- [Event Propagation 이벤트 전파](#event-propagation-이벤트-전파)
  - [Capturing phase](#capturing-phase)
  - [Target phase](#target-phase)
  - [Bubbling phase](#bubbling-phase)
  - [Bubbling 막기 stopPropagation()](#bubbling-막기-stoppropagation)
- [Event Delegation 이벤트 위임](#event-delegation-이벤트-위임)
  - [이벤트 위임의 장점](#이벤트-위임의-장점)

<!-- /TOC -->
</div>

### TL;DR

event propagation에는 3가지 단계가 있다. 이벤트 캡처링 단계, 타겟 단계, 이벤트 버블링 단계이다. 이벤트 캡처링은 최상위 조상에서부터 핸들러가 있는지 확인하고 있다면 실행하는 단계를 이벤트 타겟이 있는 위치까지 반복해서 전파되는 방식이다. 타겟 단계는 이벤트가 타겟에 도착해 실행되는 단계이고, 이벤트 버블링은 이벤트 캡처링과 반대로 이벤트 타겟에서부터 이벤트 핸들러가 있는지 있다면 실행하고, 조상으로 부터 올라가며 이 단계를 반복하는 방법이다.

이벤트 위임이란, 하위의 여러 DOM 요소에 이벤트 핸들러를 할당하는 대신 상위의 DOM요소 하나에만 이벤트 핸들러를 설정해 하위 DOM 요소의 이벤트를 상위 요소에게 위임하는 방법이다. 여러 핸들러를 할당하지 않아도 되어서 메모리의 이점을 가질 수 있다. 이벤트 위임을 하려면 꼭 이벤트 버블링이 일어나야 한다.

### Event Handler

이벤트가 발생했을 때 호출될 함수

### Event 핸들러 등록

이벤트 발생시 브라우저에게 이벤트 함수 호출을 위임하는 것

## Event 핸들러 등록 방법

1. 이벤트 핸들러 어트리뷰트 방식(인라인 이벤트 핸들러) 사용하지 말 것  
   `<button onClick="sayHi('alex')">button</button>`

- html과 js를 섞는 건 좋지 않은 방법이다.

2. 이벤트 핸들러 프로퍼티 방식

```js
var targetBtn = document.getElementById("target");
targetBtn.onclick = function () {
  alert("Hello world");
  // 실행 >> Hello world
};
```

- 오직 하나의 핸들러만을 등록할 수 있다.
- 구식 방법

3. addEventListener 메서드 방식  
   `EventTarget.addEventListener('eventType', functionName [, useCapture])`

- 다수의 이벤트 핸들러를 할당할 수 있다.
- 마지막 매개변수에는 이벤트를 캐치할 이벤트 전파 단계를 설정한다.

## event 객체의 공통 프로퍼티

Event 인터페이스, 즉 Event.prototype에 정의되어 있는 이벤트 관련 프로퍼티는 UIEvent, CustomEvent, MouseEvent 등 모든 파생 이벤트 객체에 상속된다.  
➡ 즉 Event 인터페이스의 이벤트 관련 프로퍼티는 **모든 이벤트 객체** 가 상속받는 공통 프로퍼티다.

- `type`
- `target`
  - 이벤트 발생시킨 DOM 요소
- `currentTarget`
  - 이벤트 핸들러가 바인딩된 DOM 요소
- `eventPhase` (number)
  - 0(이벤트 x), 1: 캡처링 단계, 2: 타깃 단계, 3: 버블링 단계
- `bubbles` (boolean)
  - 버블링하지 않는 이벤트 (bubbles: false)
- `cancelable`
  - preventDefault 메서드를 호출하여 이벤트의 기본 동작을 취소할 수 있는지 여부. 버블링하지 않는 이벤트는 cancelable: false로 취소할 수 없다.
- `defaultPrevented`
  - preventDefault 메서드를 호출하여 이벤트를 취소했는지 여부
- `isTrusted`
  - 사용자의 행위에 의해 발생한 이벤트인지 여부 (인위적으로 발생시킨 이벤트(click...)의 경우 false
- `timeStamp`

## 버블링하지 않는 이벤트

- 포커스 이벤트 `focus`/`blur`
- 리소스 이벤트 `load`/`unload`/`abort`/`error`
- 마우스 이벤트 `mouseenter`/`mouseleave`

## Event Propagation 이벤트 전파

DOM 요소 노드에서 발생한 이벤트는 DOM 트리를 통해 전파된다. 이를 이벤트 전파라고 한다.

- 생성된 이벤트 객체는 이벤트 target을 중심으로 DOM 트리를 통해 전파된다.
- 부모 요소를 가지고 있는 요소에서 이벤트가 발생되었을 때, 현대의 브라우저들은 두 가지 다른 단계(phase)를 실행한다. 1. 캡처링 단계 2. 버블링 단계
- **현대의 브라우저들은 대부분 버블링 단계에 등록되어 있다. 이벤트가 일어나면 이벤트가 일어난 요소에서부터 document (html) 요소까지 전파된다.**
- 이벤트 캡처링과 버블링은 이벤트 위임의 토대가 된다.

![event-propagation](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Building_blocks/Events/bubbling-capturing.png)

### Capturing phase

- 간단하게 최상위 조상에서 시작해 아래로 전파된다.
- 브라우저는 요소의 가장 바깥쪽의 조상(`<html>`)에 이벤트 핸들러가 있는지 확인한다. 있다면 그것을 실행하고 내부로 들어와 이벤트 핸들러가 등록된 요소에 닿을 때까지 반복한다.

### Target phase

- 이벤트가 타깃 요소에 도착해 실행된다.

### Bubbling phase

- 캡처링과 정확히 반대의 일을 한다.
- 간단하게 이벤트 타깃에서 조상으로 전파된다.
- 이벤트가 일어난 곳에서부터 이벤트 핸들러가 있는지 확인한다. 있다면 그것을 실행하고, 상위 요소로 이동해 이벤트 핸들러가 등록되어있는지 확인하고, 등록되어 있다면 실행한다. document 요소(html)에 닿을 때까지 반복한다.

### Bubbling 막기 stopPropagation()

- `stopPropagation()`을 이용해 버블링을 멈출 수 있지만 추천하지 않는다.
- 버블링은 이벤트 위임의 이점을 취할 수 있게 한다.

## Event Delegation 이벤트 위임

- 여러 개의 하위 DOM 요소에 각각 이벤트 핸들러를 등록하는 대신, 하나의 상위 DOM 요소에 이벤트 핸들러를 등록하는 방법
- `event.target`을 이용하면 어디서 이벤트가 발생했는지 알 수 있다. 이를 이용해 이벤트를 핸들링한다.

### 이벤트 위임의 장점

- 동적으로 하위 DOM 요소를 추가하더라도 일일히 이벤트 핸들러를 할당하지 않아도 된다.
- 많은 핸들러를 할당하지 않아도 되기 때문에 단순해지고 메모리가 절약된다.
