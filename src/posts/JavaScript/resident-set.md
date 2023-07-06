---
title: Garbage Collection 자동 메모리 관리
tag: GC, JS, 스터디01, v8, Heap, Stack
date: 2022-12-28 00:24:48
---

<br />

> 🔹 [Demystifying memory management in modern programming languages](https://dev.to/deepu105/demystifying-memory-management-in-modern-programming-languages-ddd)  
> 🔹 [Visualizing memory management in V8 Engine (JavaScript, NodeJS, Deno, WebAssembly)](https://dev.to/deepu105/visualizing-memory-management-in-v8-engine-javascript-nodejs-deno-webassembly-105p)  
> 🔹 [V8 엔진(자바스크립트, NodeJS, Deno, WebAssembly) 내부의 메모리 관리 시각화하기(2번째 글 번역)](https://ui.toast.com/weekly-pick/ko_20200228)

- 이미지 출처는 모드 이 링크들

## js엔진

- 힙 + stack

## Resident Set

v8 엔진의 메모리 구조. 프로그램을 실행하면 메모리의 Resident Set이라는 빈 공간이 할당된다.

- js는 변수를 선언할 때 자동으로 메모리를 할당한다. 원시 타입의 값들은 스택 영역에 저장되고, 참조 타입의 값은 힙 영역에 저장되며, 그 주소값은 스택 영역에 저장된다.
- (Resident Set이라는 말은 v8에만 있는 단어라기 보다는.. 컴퓨터 용어인듯 하다.)

## Memory management

- 메모리 관리는 소프트웨어 응용 프로그램이 컴퓨터 메모리에 액세스하는 방식을 제어하고 조정하는 프로세스이다.
- 소프트웨어 프로그램이 메모리를 사용할 때 자체 바이트코드, `Stack`및 `Heap`메모리를 로드하는 데 사용되는 공간과 별도로 사용하는 메모리의 두 영역이 있다.

## Stack

- 스택은 정적 메모리 할당에 사용된다.
- LIFO 후입선출. 조회가 필요하지 않으므로 빠르다.
- 다중 스레드 애플리케이션은 스레드당 스택을 가질 수 있다.
- 스택에 저장되는 일반적인 데이터는 지역 변수 (값 유형 또는 Primitives, Primitive Constants), pointers, function frames
- Stack 크기가 Heap에 비해 제한되어 있으므로 **Stack overflow** 가 발생한다.
- 대부분의 언어에서 스택에 저장할 수 있는 값의 크기에는 제한이 있다.

## Heap

- 힙은 동적 메모리 할당에 사용된다.
- 스택과 달리 프로그램은 포인터를 사용하여 힙에서 데이터를 조회해야 한다.
  - ([Javascript 메모리 할당: 힙 및 스택](https://stackoverflow.com/questions/69334818/javascript-memory-allocation-heap-and-stack))
- 데이터를 조회하는 과정이 더 복잡하기 때문에 스택보다 느리지만 스택보다 더 많은 데이터를 저장할 수 있다.
- 힙은 응용 프로그램의 스레드 간에 공유된다.
- 동적 특성으로 인해 힙은 관리하기 까다로우며 대부분의 메모리 관리 문제가 발생하는 곳이며 언어의 자동 메모리 관리 솔루션이 시작되는 곳이다.
- 힙에 저장되는 일반적인 데이터는 전역 변수, 개체, 문자열, 맵 및 기타 복잡한 데이터 구조와 같은 참조 유형이다.
- 일반적으로 힙에 저장할 수 있는 값의 크기에는 제한이 없다. (애플리케이션에 할당되는 메모리의 상한선은 있다.)
- js에서 사용되는 스택, 객체는 Heap에 저장되고 필요할 때 참조된다.

## Automatic Memory Management 자동 메모리 관리

- RAM 메모리는 무한하지 않다. 프로그램이 메모리를 해제하지 않고 계속 사용하면 메모리가 부족하여 문제가 생길 것이다. 따라서 소프트웨어 개발자가 이를 파악하도록 하는 대신 대부분의 프로그래밍 언어는 자동 메모리 관리를 수행하는 방법을 제공한다.

## Manual memory management 수동 메모리 관리

- C, C++ 에서는 메모리를 관리하는 것은 개발자의 몫이다.

## Garbage collection (GC)

- 힙 메모리를 자동으로 관리한다. GC는 현대 언어에서 가장 일반적인 메모리 관리 중 하나이며 프로세스는 종종 특정 간격으로 실행되므로 pause times 이라는 약간의 오버헤드가 발생할 수 있다.

### GC를 기본적으로 사용하는 언어

- JS
- JVM(Java/Scala/Groovy/Kotlin)
- C#
- Golang
- OCaml
- Ruby

### Mark & Sweep GC

![mark-sweep](https://res.cloudinary.com/practicaldev/image/fetch/s--JxvXuUl1--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://i.imgur.com/AZaR0LP.gif)

- Tracing GC라고도 한다.
- "활성"으로 참조되는 개체를 먼저 표시하고 다음 단계에서 살아 있지 않은 개체의 메모리를 해제하는 2단계 알고리즘이다.
- 루트가 참조하는 값이나 체이닝으로 루트에서 참조할 수 있는 값은 도달 가능한 값이 된다.
- V8과 같은 JS 엔진은 이를 보완하기 위해 참조 카운팅 GC와 함께 Mark & Sweep GC를 사용한다.

---

## V8

JS는 인터프리터 언어기 때문에 코드를 해석하고 실행하는 엔진이 필요하다. V8 엔진은 자바스크립트를 해석하고 컴파일하여 기계어로 변환한다. V8은 C++로 작성되었다.

- JS는 단일 스레드 V8이므로 JS 컨텍스트당 단일 프로세스를 사용하므로 서비스 워커를 사용하는 경우 워커 하나당 새 V8 프로세스가 생성된다.
- 실행 중인 프로그램은 항상 V8 프로세스에서 할당된 메모리로 표시되며 이를 **Resident Set** 이라고 한다.

![resident-set](https://res.cloudinary.com/practicaldev/image/fetch/s--J4DjsB_m--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://i.imgur.com/kSgatSL.png)

## Heap Memory

V8 엔진은 힙 메모리에 객체나 동적 데이터를 저장한다. 힙 메모리는 메모리 영역에서 가장 큰 블록이면서 **가비지 컬렉션** 이 발생하는 곳이다.  
힙 메모리 전체에서 가비지 컬렉션이 실행되는 건 X, Young과 Old 영역에서만 실행된다.

## Stack

스택은 메모리 영역이고 V8 프로세스마다 하나의 스택을 가진다. 스택은 메서드와 함수 프레임, 원시 값, 객체 포인터를 포함한 정적 데이터가 저장되는 곳이다.

## V8 메모리 사용 시각화

![v8](https://raw.githubusercontent.com/h-alex2/h-blog/version1-nextjs/public/posts/v8-01.png?raw=true)

- 전역 스코프는 스택에서 "전역 프레임(Global frame)"에 보관된다.
- 모든 함수 호출은 프레임 블록으로 스택 메모리에 추가된다.

![v8](https://raw.githubusercontent.com/h-alex2/h-blog/version1-nextjs/public/posts/v8-02.png?raw=true)

- int와 string과 같은 모든 원시 타입 값은 스택에 바로 저장된다. 이는 전역 스코프에서도 적용된다.

![v8](https://raw.githubusercontent.com/h-alex2/h-blog/version1-nextjs/public/posts/v8-03.png?raw=true)

- `Employee와` `Function`과 같은 객체 타입의 값은 `Heap`에서 생성되고 스택 포인터를 사용해 힙에서 스택을 참조한다.

![v8](https://raw.githubusercontent.com/h-alex2/h-blog/version1-nextjs/public/posts/v8-04.png?raw=true)
![v8](https://raw.githubusercontent.com/h-alex2/h-blog/version1-nextjs/public/posts/v8-05.png?raw=true)

![v8](https://raw.githubusercontent.com/h-alex2/h-blog/version1-nextjs/public/posts/v8-06.png?raw=true)

![v8](https://raw.githubusercontent.com/h-alex2/h-blog/version1-nextjs/public/posts/v8-07.png?raw=true)

![v8](https://raw.githubusercontent.com/h-alex2/h-blog/version1-nextjs/public/posts/v8-08.png?raw=true)

- 현재 함수에서 호출된 함수들은 스택의 최상단에 추가된다.

![v8](https://raw.githubusercontent.com/h-alex2/h-blog/version1-nextjs/public/posts/v8-09.png?raw=true)

![v8](https://raw.githubusercontent.com/h-alex2/h-blog/version1-nextjs/public/posts/v8-10.png?raw=true)

![v8](https://raw.githubusercontent.com/h-alex2/h-blog/version1-nextjs/public/posts/v8-11.png?raw=true)

![v8](https://raw.githubusercontent.com/h-alex2/h-blog/version1-nextjs/public/posts/v8-12.png?raw=true)

![v8](https://raw.githubusercontent.com/h-alex2/h-blog/version1-nextjs/public/posts/v8-13.png?raw=true)

![v8](https://raw.githubusercontent.com/h-alex2/h-blog/version1-nextjs/public/posts/v8-14.png?raw=true)

![v8](https://raw.githubusercontent.com/h-alex2/h-blog/version1-nextjs/public/posts/v8-15.png?raw=true)

- 주요 프로세스가 완료될 때 힙에 있는 객체들은 어떤 포인터도 가지고 있지 않고 혼자 남게 된다.

---

- 보다시피 스택은 자동으로 관리되어 걱정하지 않아도 된다. 반면에 힙은 운영 체제에 의해 자동으로 관리되지 않고 가장 큰 메모리 영역과 동적 데이터를 보유하고 있기 때문에, 시간이 지남에 따라 프로그램의 메모리가 기하급수적으로 증가할 수 있다.
- 힙에서 포인터와 데이터를 구분하는 것은 가비지 컬렉션에서 중요하며 일ㄹ 처리하기 위해 V8엔진은 "태그된 포인터(Tagged pointers)" 접근 방식을 사용한다.

...작성중
