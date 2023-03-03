---
title: Go와 Node.js에서 동시성 작업을 처리하는 방법 02 - Go
tag: Go, Node.js
date: 2023-03-03 17:60:00
description: Golang에서 동시성 작업을 처리하는 방법에 대해 알아봅니다.
type: blog
---

<script>
  import gmp from "$lib/images/posts/golang-08.png";
  import gmp2 from "$lib/images/posts/golang-09.png";
  import gmp3 from "$lib/images/posts/golang-10.png";
  import gmp4 from "$lib/images/posts/golang-11.jpg";
  import node2 from "$lib/images/posts/golang-12.png";
</script>


![node2]({node2})

<br />

### 목차

<!-- TOC tocDepth:2..3 chapterDepth:2..6 -->

- [목차](#목차)
- [Go](#go)
- [Go에는 스레드를 다루는 방법이 존재하지 않는다?](#go에는-스레드를-다루는-방법이-존재하지-않는다)
- [고루틴 (Goloutine)](#고루틴-goloutine)
- [고루틴과 스레드의 차이점](#고루틴과-스레드의-차이점)
- [Go Runtime Scheduler](#go-runtime-scheduler)
- [고루틴 병렬 실행하기](#고루틴-병렬-실행하기)
- [채널](#채널)
- [Go의 장점](#go의-장점)
- [Go의 단점](#go의-단점)
- [끝](#끝)

<!-- /TOC -->

## Go

![Thompson](https://upload.wikimedia.org/wikipedia/commons/1/1b/Ken_Thompson_and_Dennis_Ritchie--1973.jpg)
Go언어는 구글에서 일하는 로버트 그리즈머, 롭 파이크, 켄 톰프슨이 개발했어요.
사진 왼쪽 켄 톰프슨은 C언어의 모체가 된 B언어를 개발한 인물이에요. (그리고 켄 톰슨과 롭 파이크는 `UTF-8`를 만들었다고 해요.(Go의 기본 문자 인코딩은 `UTF-8`입니다.))

Go는 C++의 복잡함과 긴 컴파일 시간을 줄일 수 있는 간결한 언어, 또한 사용자가 배우기 쉬운 언어를 만들어보자는 취지로 만들어졌습니다.

기존에 구글에서 주로 사용하던 언어가 대부분 C++이었고, 개발자들이 새로운 언어에서 빠르게 생산성을 발휘할 수 있도록 하기 위해서 C와 구문을 비슷하게 만들었다고 합니다.

C와 구문은 비슷하지만 복잡도를 낮추고 컴파일 속도 향상을 위해 기존에 사용하던 헤더 파일을 정의하는 방식 대신 소스 자체를 패키지화하는 방식을 채택했습니다. 소스 코드 자체를 패키지화하여 변경된 부분만 컴파일 함으로써 컴파일 속도를 향상시켰습니다.

그리고 미니멀리즘을 추구해 그 흔한 객체지향 개념도 도입하지 않았고 Go 언어에서 복잡한 문법은 오직 구조체(structure) 뿐입니다.

<br />

## Go에는 스레드를 다루는 방법이 존재하지 않는다?
Go에서는 스레드를 다루는 방법이 존재하지 않아요. 스레드를 수동으로 생성하고 제어하는 방법이 없어요. C나 Java에서는 스레드를 생성하여 동시성 프로그래밍을 하지만 Go에서는 스레드를 다루는 방식이 존재하지 않고 go 키워드를 이용한 고루틴 생성 로직만 존재합니다.

<br />

## 고루틴 (Goloutine)
고루틴은 Go언어에서 프로그램의 동시성을 쉽게 구현하고 기존의 단순 스레드 기반의 구현에 비해 효율적인 동작을 수행해 내기 위해 만든 작업 단위에요.
Go에서 사용하는 경량 스레드를 의미합니다. 고루틴은 __OS의 스레드와 1대 1 매칭되지 않고__, 다중화되어 있기 때문에 논리적 스레드 혹은 가상 스레드라고도 불립니다. 모든 동기화 및 메모리 관리는 기본적으로 Go가 __런타임__ 상에서 수행합니다.

고루틴은 함수 단위로 실행할 수 있으며 함수 실행 앞에 go라는 키워드를 붙여서 생성합니다.

```js
go func() {
  // ...
}();
```

즉 고의 모든 프로그램은 반드시 __하나 이상__의 고루틴을 가지고 있음을 의미합니다.  

함수를 고루틴으로 생성하면 이 함수는 곧바로 실행되는 것이 아니라 실행해야 할 함수로 예약된 후 논리 프로세스가 여력이 있을 때 실행되는 독립적인 작업 단위로 취급됩니다. Go 런타임 스케줄러는 코드에서 생성되어 프로세서가 개별적으로 처리해야 할 모든 고루틴들을 관리하기 위해 만들어진 소프트웨어입니다. 이 스케줄러는 운영체제를 기반으로 동작하며 운영체제의 스레드를 고루틴을 실행하는 논리 프로세서에 바인딩합니다. 또한 스케줄러는 어떤 고루틴이 어떤 논리 프로세서상에서 얼마나 오래 실행 중인지를 추적하는 데 __필요한 모든 것들을 관리합니다.__  

Go에서의 동시성 처리 시 동기화(concurrency synchronization)는 CSP(Communicating Sequential Process, 통신 순차 처리)라는 패러다임에서 비롯되었습니다. CSP는 고루틴 사이에 데이터를 교환할 때 동시적 접속으로부터 데이터를 잠그는 기법이 아니라 메시지를 전달하는 모델이에요. 고루틴 사이의 동기화 및 메시지 교환을 위한 핵심 데이터 타입은 __채널__입니다.

<br />

## 고루틴과 스레드의 차이점

### 1. 메모리 소비
고루틴은 생성하는데에 많은 메모리를 필요로 하지 않습니다. 오직 2kb의 스택 공간만 필요로 하며 가지고 있는 레지스터도 프로그램 카운더(pc)와 스택 포인터(sp) 정도가 전부입니다. 고루틴을 할당하고 필요에 따라 힙 저장 공간을 확보하여 사용합니다. 반대로 스레드는 스레드의 메모리와 다른 스레드의 메모리 간의 경비 역할을 하는 Guard page라고 불리는 메모리 영역과 함께 1mb(500배 더 큼)용량으로 시작합니다.

### 2. 비용
스레드는 설치와 철거 비용을 가집니다. 왜냐하면, 스레드는 OS로부터 리소스를 요청해야 하고 작업이 끝나면 리소스를 돌려줘야 합니다. 이 문제의 차선책으로는 스레드의 Pool을 유지하는 것입니다. 이와는 대조적으로 고루틴은 __런타임__에서 만들어지고 파괴되는 작업들이 매우 저렴합니다. 

### 3. Context Switching 비용
스레드의 상태 정보를 관리하는 자료구조로 `TCB(Thread control block)`가 있습니다. `TCB`는 같은 프로세스에서 컨텍스트 스위칭하는 스레드에 대한 정보를 저장합니다. 스레드의 컨텍스트 스위칭은 프로세스에 비해 적은 정보만 필요하므로 프로세스의 컨텍스트 스위칭보다 더 빠르게 이루어질 수 있습니다.

이런 스레드에 비해서도 고루틴은 컨텍스트 스위칭을 위해 더 적은 정보만을 필요로 하기 때문에 매우 빠르게 컨텍스트 스위칭이 가능합니다.

고루틴은 협조적으로 스케쥴링되고 교체가 일어날 때, 오직 3개의 레지스터만이 save/restore되기 위해 필요합니다. 바로 Program Counter, Stack Pointer 그리고 DX입니다. 비용은 훨씬 덜 듭니다.

고루틴의 갯수는 스레드보다 일반적으로 훨씬 많지만, 2가지 이유에 의해 교체 시간에 차이점을 낳지 않습니다. 오직 동작하는 고루틴들만이 고려되고, Blocking된 것들을 고려되지 않습니다. 또한, 현대의 스케쥴러들은 O(1) complexity를 가집니다. 즉 교체 시간이 고루틴의 수에 의해 영향을 받지 않는다는 의미입니다.

<br />

## Go Runtime Scheduler
고루틴은 Runtime Scheduler에 의해 관리됩니다. Runtime Scheduler는 Go 프로그램이 실행되는 시점(런타임)에 함께 실행되며 끝나는 시점까지 내내 고루틴을 관리합니다. 고루틴을 효율적으로 스레드에 스케줄링 시키는 역할을 수행합니다.

각 논리 프로세서는 하나의 운영체제 스레드에 개별적으로 바인딩됩니다. Go 1.5버전 이전에는 오로지 하나의 논리 프로세서만 할당했지만, 이후에는 논리 프로세서를 사용 가능한 각 물리 프로세서마다 할당합니다.  

설령 하나의 논리 프로세서만 존재한다 하더라도 수백 수천의 고루틴을 동시적으로 실행해 효율과 성능을 향상시킬 수 있습니다.

자체 스케줄러에 의해 관리하므로 컨텍스트 비용을 줄입니다.

<br />

### GMP 구조체
![gmp4]({gmp4})
Go의 스케줄러는 G, M, P로 구성되어 돌아가고 있습니다.

__GMP가 뭐죠?__
- G(Goroutine): 고루틴
  - 런타임이 고루틴을 관리하기 위해서 사용합니다.
  - 컨텍스트 스위칭을 위해 스택 포인터, 고루틴의 상태 등을 가지고 있습니다.

- P(Processor): 논리적인 프로세서
  - 최대 GOMAXPROCS개를 가질 수 있습니다.
  - 스케줄링에 대한 컨텍스트 정보를 담고 있습니다.

- M(Machine): 워커 스레드 (OS의 스레드를 뜻합니다.)

<br />

### Go 스케줄러가 고루틴을 관리하는 방법
![gmp3]({gmp3})
고루틴이 생성되고 실행할 준비가 되면 스케줄러의 범용 실행 큐(global runner queue)에 위치합니다. 그리고 논리 프로세서(P)가 할당되어 해당 프로세서의 지역 실행 큐(Local runnable queue)에 위치합니다. 그리고 여기에서 논리 프로세서가 자신을 실행해줄 때까지 기다립니다.

![gmp]({gmp})
Go 런타임 스케줄러는 하나의 운영체제 스레드에 바인딩된 논리적 프로세서에서 고루틴이 실행되도록 예약합니다. 고루틴이 실행 가능 상태가 되면 논리 프로세서의 실행 큐에 추가합니다.
오른쪽 G들을 `runqueues`라고 부르는데 이 큐는 앞으로 실행될 고루틴을 쌓아두는 역할을 하고 P(context)에 종속되어 있습니다.

![gmp]({gmp2})
간혹 실행 중인 고루틴이 파일을 여는 등 자신의 실행을 중단해야 하는 시스템 콜을 수행하는 경우가 있습니다. 이런 작업이 발생하면 blocking이 발생하게 되는데 이 경우 해당 스레드에 영향을 끼치기 때문에 성능 저하를 불러올 수 있게 됩니다. Go의 스케줄러는 계속해서 멈추지 않고 스케줄링을 할 수 있도록 syscall이 발생한 고루틴을 다른 스레드로 넘겨(hand off) 모든 고루틴이 정상적으로 작동할 수 있도록 보장합니다.

앞서 수행한 시스템 콜이 리턴되면 실행 중인 고루틴은 다시 지역 실행 큐로 이동하며, 이때 나중에 다시 사용될 것을 대비해 고루틴이 실행 중이던 스레드도 함께 보관됩니다.

<br />

## 고루틴 병렬 실행하기
```js
package main

import (
	"fmt"
	"runtime"
	"sync"
)

// wg은 프로그램의 종료를 대기하기 위해 사용합니다.
var wg sync.WaitGroup

// 애플리케이션 진입점
func main() {
	// 스케줄러에 두 개의 논리 프로세서만 할당합니다.
	runtime.GOMAXPROCS(2)

	// 고루틴마다 하나씩 두 개의 카운트를 추가합니다.
	wg.Add(2)

	// 두 개의 고루틴을 생성합니다.
	fmt.Println("고루틴 실행합니다.")
	go printPrime("A")
	go printPrime("B")

	// 고루틴이 끝나기 까지 대기합니다.
	fmt.Println("대기 중..")
	wg.Wait()

	fmt.Println("프로그램을 종료합니다.")
}

// 소수 중 처음 3000개를 출력하는 함수입니다.
func printPrime(prefix string) {
	// 작업이 완료되면 Done 함수를 호출하도록 예약합니다.
	defer wg.Done()

next:
	for outer := 2; outer < 3000; outer++ {
		for inner := 2; inner < outer; inner++ {
			if outer%inner == 0 {
				continue next
			}
		}

		fmt.Printf("%s:%d\n", prefix, outer)
	}

	fmt.Println("완료: ", prefix)
}
```

`runtime.GOMAXPROCS(2)`을 이용해 두 개의 논리 프로세서를 할당했습니다.
A와 소수를 출력하는 고루틴 함수와 B와 소수를 출력하는 고루틴 함수를 실행해보았습니다.

```
A:1249
A:1259
A:1277
A:1279
B:2347
B:2351
B:2357
B:2371
B:2377
A:1283
B:2381
B:2383
B:2389
A:1289
A:1291
A:1297
A:1301
A:1303
A:1307
A:1319
A:1321
A:1327
A:1361
A:1367
A:1373
B:2393
B:2399
B:2411
...
```
A와 B가 섞여서 나오는 것으로 보아 고루틴이 병렬적으로 실행됐음을 확인할 수 있습니다.
한 가지 기억할 점은 고루틴이 하나 이상의 물리적 프로세서 및 논리 프로세서가 존재하는 경우에만 병렬적으로 실행된다는 점입니다.

<br />

## 채널
채널은 필요한 공유 자원을 다른 고루틴에 보내거나 받아 고루틴 사이의 동기화를 지원하는 개념입니다.

고루틴 간에 자원을 공유해야 하는 경우 채널은 고루틴 사이를 연결하는 파이프처럼 동작하며, 둘 사이의 데이터 교환에 있어 동기화를 보장하는 메커니즘을 제공합니다. 

<br />

## Go의 장점
- 간결한 문법
- 시스템 프로그래밍, 대규모 분산 시스템, 확장성이 뛰어난 네트워크 애플리케이션에 유리합니다.
- Go언어는 다른 언어에 비해 배우기 쉽습니다.
- 스레드보다 매우 가벼운 고루틴을 쉽게 이용할 수 있습니다.
- 기본 모듈이 풍부합니다.

<br />

## Go의 단점
- 커뮤니티가 다른 언어에 비해 작습니다.
- 가비지 컬렉션이 런타임에서 실행되기 때문에 C, Rust처럼 메모리가 중요시되는 언어들보다는 퍼포먼스가 낮습니다.

---

<br />

## 정리

이렇게 Node.js와 Golang이 동시성을 처리하는 방법에 대해 살펴보았습니다. 두 언어 다 장점이 있어 각각의 환경에 따라 선택해서 사용하면 좋을 것 같습니다.

정리하다보니 힘이 빠져서 Go에 대해서는 잘 정리하지 못한 것 같은데.. 나중에 조금 더 채워넣어 봐야겠네요. 짧은 시간이었지만 Go라는 언어를 배우며 정적 언어에 대한 경험을 해봤고 Javascript와 Go를 비교해보며 많이 배운 것 같아요. Javascript는 굉장히 유연한 언어라서 (혹은 완벽한 언어가 아니라서) 다른 언어를 배우는 게 도움이 되는 것 같아요. 기본적인 프로그래밍 개념에 대해 더 잘 알게 되었습니다.

그리고 Go는 Java나 Rust에 비해 러닝커브가 깊지 않아서 관심이 생기신다면 배워보셔도 좋을 것 같아요.

관심이 가신다면 여기 이 [JavaScript 개발자를 위한 Golang - 1부(번역)](https://lannex.github.io/blog/2019/Golang-for-JavaScript-developers-1/) 글을 추천합니다.

Go만 정리하려고 했는데, 하다 보니 Node.js에 대해서도 잘 모른다는 생각에 함께 정리를 해봤는데 굉장히 힘들었네용. 그래도 언어마다 자원을 다루는 방식이 달라서 재밌었던 것 같아요.🥹

운영체제를 공부하시려는 분들이 계신다면 프로그래밍 언어가 어떻게 자원을 다루는 방식이 어떤지 같이 살펴보시면 좋을 것 같아요. 저는 운영체제에 관해서만 공부하려고 하다 보니 잘 와 닿지 않았는데 언어가 동시성을 처리하는 방법에 대해 살펴보니 더 이해가 잘 되었던 것 같아요.



<br />

## 끝
Node.js를 만든 라이언달의 2017년 인터뷰를 끝으로 마무리해보려 합니다.(DeepL 번역기 돌린 것..)  
[Episode 8: Interview with Ryan Dahl, Creator of Node.js](https://mappingthejourney.com/single-post/2017/08/31/episode-8-interview-with-ryan-dahl-creator-of-nodejs/)

제가 적어놓은 부분은 아주 일부분이고 어떻게 Node.js를 만들었고 왜 Node를 떠나게 되었는지에 대한 내용이 담겨있습니다. 라이언 달은 Node.js를 만들었을 때 이렇게 커다란 프로젝트가 되길 바라지는 않았다고 해요. 

<br />

- (↓ 링크 영상도 재밌어요)
- [Node.js에 관해 후회하는 10가지(영상) - Ryan Dahl - JSConf EU](https://www.youtube.com/watch?v=M3BM9TB-8yA)
- [Node.js에 관해 후회하는 10가지(번역 글) - Ryan Dahl - JSConf EU](https://medium.com/tech-confs-in-korean/ryan-dahl-%EB%82%B4%EA%B0%80-node-js%EC%97%90-%EB%8C%80%ED%95%B4-%ED%9B%84%ED%9A%8C%ED%95%98%EB%8A%94-%EA%B2%83-10%EA%B0%80%EC%A7%80-jsconf-eu-2018-c4c3cbb6b5ef)


<details>
<summary>원문</summary>

...

Pramod: Nice. Take us through the journey you went through with the development of Node. I know it’s a long time Ryan since you created Node around 2009.

Ryan: I think at least for myself, there’s no greater moment in my life than when I’m like, in the flow, and having an idea that I believe in. And have the time to sit down and work on it. And I think Node was an idea waiting to happen and had I not done it; somebody else would have. But it just so happened that I was relatively unemployed and had some free time, and could work on it non-stop for months, which is what was required to get an initial product out. So yeah, that was awesome, it was fun.

Pramod: Great. That’s fantastic. You did it really well. Node is built on the idea of “pure async” programming model. How did this idea work out for node?

Ryan: Yeah, I think that’s a really interesting question. Now, it’s been several years, and I haven’t worked on Node myself since like, 2012, or 2013. And Node, of course, is a big project at this point. So, yeah, I think… when it first came out, I went around and gave a bunch of talks, trying to convince people that they should. That maybe we were doing I/O wrong and that maybe if we did everything in a non-blocking way, that we would solve a lot of the difficulties with programming. Like, perhaps we could forget about threads entirely and only use process abstractions and serialized communications. But within a single process, we could handle many, many requests by being completely asynchronous. I believe strongly in this idea at the time, but over the past couple of years, I think that’s probably not the end-all and be-all idea for programming. In particular, when Go came out.

Well, I think Go came out a long time ago, but when I first started hearing about Go, which was around 2012. They had a very nice runtime that had proper green threads and easy to use abstractions around that. That I think makes blocking I/O – again, blocking I/O in quotes, because it’s all in green threads at the interface of… between Go and the operating system, I think it is all non-blocking I/O.

But the interface that they present to the user is blocking, and I think that that’s a nicer programming model. And you can think through what you’re doing in many situations more easily if it’s blocking. You know, if you have a bunch of following actions, it’s nice to be able to say: do thing A, wait for a response, maybe error out. Do thing B, wait for a response, error out. And in Node, that’s harder, because you have to jump into another function call.

...

Pramod: Yeah, I like the programming model of Go. Using goroutines is so much easy and fun. In fact, we are using at work for building a distributed application.

Ryan: Yeah, I think it’s… for a particular class of application, which is like, if you’re building a server, I can’t imagine using anything other than Go. That said, I think Node’s non-blocking paradigm worked out well for JavaScript, where you don’t have threads. And I think that a lot of the problems with kind of the call-back soup problem, where you have to jump into many anonymous functions to complete what you’re doing has been alleviated these days, with the async keyword, the async feature that’s in Javascript now.

So, kind of the newer versions of Javascript has made this easier. That said, I think Node is not the best system to build a massive server web. I would use Go for that. And honestly, that’s the reason why I left Node. It was the realization that: oh, actually, this is not the best server-side system ever.

Yeah. I think where Node has shined, weirdly, on the client side. So, doing kind of scripting around building websites. So, Browserify, for example. Kind of bundles up client-side Javascript. So, you can have all this server-side processing of client-side Javascript. And then, you know, maybe small servers to… maybe little development servers, and here and there, maybe some real servers serving live traffic. Node can be useful, or it can be the right choice for it. But if you’re building a massively distributed DNS server, I would not choose Node.

</details>

...


프라모드: 멋지네요. 노드 개발 과정에서 겪은 여정을 소개해 주세요. 2009년경에 노드를 만든 이후로 꽤 오랜 시간이 흘렀다고 알고 있습니다.

Ryan: 적어도 제 인생에서 흐름에 따라 제가 믿고 있는 아이디어가 생겼을 때보다 더 좋은 순간은 없다고 생각합니다. 그리고 앉아서 작업할 시간이 생겼을 때죠. 노드는 제가 하지 않았더라면 다른 누군가가 해냈을 아이디어라고 생각합니다. 하지만 운이 좋게도 저는 상대적으로 실직 상태였고 시간적 여유가 있었기 때문에 초기 제품을 출시하는 데 필요한 몇 달 동안 쉬지 않고 작업할 수 있었습니다. 네, 정말 멋지고 재미있었어요.

프라모드: 잘됐네요. 환상적이네요. 정말 잘 하셨어요. 노드는 "순수 비동기" 프로그래밍 모델이라는 아이디어를 기반으로 만들어졌습니다. 이 아이디어가 노드에 어떻게 적용되었나요?

Ryan: 네, 정말 흥미로운 질문이네요. 몇 년이 지났지만 저는 2012년이나 2013년 이후로 노드에서 직접 작업한 적이 없습니다. 물론 노드는 현재로서는 큰 프로젝트입니다. 그래서 노드가 처음 나왔을 때 저는 여러 강연을 다니며 사람들에게 노드를 사용해야 한다고 설득했습니다. 어쩌면 우리가 I/O를 잘못하고 있을 수도 있고, 모든 것을 비차단 방식으로 수행하면 프로그래밍의 많은 어려움을 해결할 수 있을 거라고요. 예를 들어, 스레드를 완전히 없애고 프로세스 추상화와 직렬화된 통신만 사용할 수 있을지도 모릅니다. 하지만 단일 프로세스 내에서는 완전히 비동기화하여 수많은 요청을 처리할 수 있었습니다. 당시에는 이 아이디어를 강력하게 믿었지만, 지난 몇 년 동안 저는 이것이 프로그래밍의 모든 것이 될 수는 없다고 생각했습니다. 특히 Go가 나왔을 때요.

Go는 오래 전에 나온 것 같지만, 제가 처음 Go에 대해 듣기 시작했을 때가 2012년쯤이었어요. 당시에는 적절한 녹색 스레드와 이를 둘러싼 사용하기 쉬운 추상화가 있는 매우 멋진 런타임이 있었습니다. 제가 생각하기에 블록킹 I/O, 다시 말해서 따옴표로 묶은 블록킹 I/O는 모두 Go와 운영 체제 사이의 인터페이스에서 그린 스레드에 있기 때문에 모두 비블록킹 I/O라고 생각합니다.

하지만 사용자에게 표시되는 인터페이스는 블로킹이며, 저는 그것이 더 좋은 프로그래밍 모델이라고 생각합니다. 그리고 블로킹이 있으면 여러 상황에서 무엇을 하고 있는지 더 쉽게 생각할 수 있습니다. 예를 들어 다음 동작이 여러 개 있는 경우 A를 수행하고 응답을 기다린 다음 오류를 발생시킬 수 있다는 점이 좋습니다. B 작업을 수행하고 응답을 기다린 후 오류를 발생시키면 되죠. Node에서는 다른 함수 호출로 넘어가야 하기 때문에 더 어렵습니다.

...

프라모드: 네, 저는 Go의 프로그래밍 모델을 좋아합니다. 고루틴을 사용하는 것은 매우 쉽고 재미있어요. 실제로 회사에서 분산 애플리케이션을 구축하는 데 사용하고 있습니다.

Ryan: 네, 특정 클래스의 애플리케이션, 예를 들어 서버를 구축하는 경우 Go 이외의 다른 것을 사용하는 것은 상상할 수 없습니다. 하지만 노드의 비차단 패러다임은 스레드가 없는 자바스크립트에서 잘 작동한다고 생각합니다. 또한, 현재 자바스크립트에 있는 비동기 키워드, 즉 비동기 기능 덕분에 작업을 완료하기 위해 많은 익명 함수로 이동해야 하는 일종의 콜백 수프 문제도 많이 완화되었다고 생각합니다.

따라서 최신 버전의 자바스크립트 덕분에 이 작업이 더 쉬워졌습니다. 하지만 노드는 대규모 서버 웹을 구축하는 데 가장 적합한 시스템은 아니라고 생각합니다. __저는 Go를 사용하고 싶습니다. 그리고 솔직히 이것이 제가 Node를 떠난 이유입니다.__ '아, 사실 이것은 최고의 서버 측 시스템이 아니구나'라는 깨달음이었죠.

네, 노드가 빛을 발한 부분은 이상하게도 클라이언트 쪽이었습니다. 웹 사이트 구축과 관련된 일종의 스크립팅을 수행합니다. 예를 들어 Browserify는 클라이언트 측 자바스크립트를 번들로 묶어주는 서비스죠. 따라서 클라이언트 측 자바스크립트를 서버 측에서 모두 처리할 수 있습니다. 그리고 작은 서버부터... 작은 개발 서버, 그리고 여기저기서 실제 트래픽을 처리하는 실제 서버가 있을 수도 있습니다. 노드가 유용할 수도 있고 적합한 선택일 수도 있습니다. 하지만 대규모로 분산된 DNS 서버를 구축하는 경우라면 Node를 선택하지 않을 것입니다.

<br />

> 출처 및 참고 자료
- [(OS) 커널(Kernel)이란?](https://medium.com/@su_bak/os-%EC%BB%A4%EB%84%90-kernel-%EC%9D%B4%EB%9E%80-b6b8aae8d0b4)
- [브라우저와 Nodejs의 이벤트 루프는 무엇이 다를까](https://yceffort.kr/2021/08/browser-nodejs-event-loop)
- [로우 레벨로 살펴보는 Node.js 이벤트 루프](https://evan-moon.github.io/2019/08/01/nodejs-event-loop-workflow/)
- [Relationship between event loop,libuv and v8 engine](https://stackoverflow.com/questions/49811043/relationship-between-event-loop-libuv-and-v8-engine)
- [이벤트 루프와 워커 풀을 막지 마세요! by node.js](https://nodejs.org/ko/docs/guides/dont-block-the-event-loop/)
- [Node.js 이벤트 루프, 타이머, process.nextTick() by node.js](https://nodejs.org/ko/docs/guides/event-loop-timers-and-nexttick/)
- [nodejs의 내부 동작 원리 (libuv, 이벤트루프, 워커쓰레드, 비동기)](https://sjh836.tistory.com/149)
- [I/O 루프](https://docs.libuv.org/en/v1.x/design.html)
- [Node.js 이벤트 루프를 제대로 이해하기 위해 알아야 할 사항](https://medium.com/the-node-js-collection/what-you-should-know-to-really-understand-the-node-js-event-loop-and-its-metrics-c4907b19da4c)
- [고루틴은 어떻게 동작하는가?](https://stonzeteam.github.io/How-Goroutines-Work/)
- [고루틴은 어떻게 스케줄링되는가?](https://velog.io/@kineo2k/%EA%B3%A0%EB%A3%A8%ED%8B%B4%EC%9D%80-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%8A%A4%EC%BC%80%EC%A4%84%EB%A7%81%EB%90%98%EB%8A%94%EA%B0%80)
- [Goroutines vs Threads](https://tech.ssut.me/goroutine-vs-threads/)
- [고루틴의 동작 원리에 관하여](https://ykarma1996.tistory.com/188)
- [고루틴 — Go 언어의 동시성 모델](https://medium.com/curg/%EA%B3%A0%EB%A3%A8%ED%8B%B4-go-%EC%96%B8%EC%96%B4%EC%9D%98-%EB%8F%99%EC%8B%9C%EC%84%B1-%EB%AA%A8%EB%8D%B8-1045986cc001)
- [내가 Go 언어를 선택한 이유](https://pronist.dev/67)