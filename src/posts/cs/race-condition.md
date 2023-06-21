---
title: React, JavaScript로 Race Condition 대응하기
tag: Race Condition
date: 2023-06-18 23:34:52
type: blog
description: Race condition에 대응할 수 있는 방법을 정리합니다.
---

<!-- TOC tocDepth:2..3 chapterDepth:2..6 -->

- [Race Condition이란?](#race-condition이란)
- [단일 스레드인 JS에서도 Race Condition이 발생할까?](#단일-스레드인-js에서도-race-condition이-발생할까)
- [예제로 살펴보기](#예제로-살펴보기)
  - [문제의 원인은 무엇일까?](#문제의-원인은-무엇일까)
  - [boolean flag를 이용해 해결하기](#boolean-flag를-이용해-해결하기)
  - [flag 방법의 문제점](#flag-방법의-문제점)
  - [AbortController로 해결하기](#abortcontroller로-해결하기)
- [데이터의 동기화 생각해보기](#데이터의-동기화-생각해보기)
  - [순차적으로 처리할 때](#순차적으로-처리할-때)
  - [병렬적으로 처리할 때](#병렬적으로-처리할-때)
  - [어떻게 해결할 수 있을까?](#어떻게-해결할-수-있을까)
- [정리](#정리)
- [출처](#출처)

<!-- /TOC -->

---

이번에 React 공식 문서를 보면서 Race Condition을 고려하며 코드를 작성해야 한다는 것을 보고 Race Condition에 대응할 수 있는 방법에 대해 정리해보려고 한다.

<br />

## Race Condition이란?

> 두 개 이상의 프로세스가 병행적으로 읽거나 쓰는 동작을 할 때, 공용 데이터에 대한 접근이 어떤 순서에 따라 이루어졌는지에 따라 그 실행 결과가 같지 않고 달라지는 상황을 말한다. Race의 뜻 그대로, 간단히 말하면 경쟁하는 상태, 즉 두 개의 스레드가 하나의 자원을 놓고 서로 경쟁하는 상황을 말한다.

쉽게 말해 서로 다른 두 요청이 서로 “경쟁”하여 예상과 다른 순서로 도착하는 것을 말한다.

- 소프트웨어
- 스토리지
- 메모리
- 네트워킹

등을 포함하여 여러 형태로 나타난다.

<br />

## 단일 스레드인 JS에서도 Race Condition이 발생할까?

답은 Yes이다.

<img src="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop/the_javascript_runtime_environment_example.svg" />

JavaScript는 단일 스레드 기반의 언어로, 한 번에 하나의 작업만을 처리할 수 있다(브라우저 기준) 그러나 비동기인 동작을 가능하게 하기 위해서 이벤트 루프와 메시지 큐라는 매커니즘을 사용한다.

이벤트 루프는 계속해서 실행되며, 메인 스레드에서 실행되는 작업을 처리한다. 이벤트 루프는 메시지 큐를 감시하고, 큐에 작업이 쌓여 있으면 해당 작업을 순서대로 실행한다. 이벤트 루프의 주된 역할은 비동기 작업의 완료를 감지하고, 그에 맞는 콜백 함수를 호출하는 것이다.

메시지 큐는 작업을 순서대로 처리하지만, 여러 개의 작업이 동시에 발생하면 **처리 순서가 보장되지 않을 수 있다**.

즉 Race Condition은 단일 스레드, 멀티 스레드에 상관 없이 발생할 수 있다.

<br />

## 예제로 살펴보기

하나의 예제를 React, JavaScript 코드로 살펴보자. [JSONPlaceholder](https://jsonplaceholder.typicode.com/)를 사용했다.

시나리오는 이렇다.

1. 각각의 데이터를 가져올 수 있는 버튼이 2개가 있다.
2. 버튼을 누르면 그에 맞는 데이터를 화면에 보여준다.

<img src="https://github.com/h-alex2/imgaes/assets/84281505/33dc4de6-e0a7-424b-b6f0-198be23736d9" />

```js
export default function Index() {
	const [id, setId] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		if (id == null) {
			return;
		}

		const fetchData = async () => {
			const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}/`);
			const newData = await response.json();
		};

		fetchData();
	}, [id]);

	return (
		<>
			<button onClick={() => setId(1)}>DATA 1</button>
			<button onClick={() => setId(2)}>DATA 2</button>
			{!!data && (
				<>
					<div>id: {data.id}</div>
					<div>title: {data.title}</div>
				</>
			)}
		</>
	);
}
```

<details>
  <summary>JavaScript 코드</summary>

```js
// DATA 1 버튼
button1.addEventListener("click", async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
	const json = await response.json();

	idContainer.textContent = `id: ${json.id}`;
	dataContainer.textContent = `title: ${json.title}`;
});

// DATA 2 버튼
button2.addEventListener("click", async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/todos/2");
	const json = await response.json();

	idContainer.textContent = `id: ${json.id}`;
	dataContainer.textContent = `title: ${json.title}`;
});
```

</details>

해당 코드는 버튼을 클릭할 때마다 id state가 변경되어 리렌더링이 일어나면 `useEffect` 내의 fetch 코드가 실행되는 코드이다.

<br />

DATA 1을 fetch할 때 delay(1000ms)를 적용해보자.

<img src="https://github.com/h-alex2/imgaes/assets/84281505/d1758963-7649-4c9f-aa95-58a4cb681081" />

```js
function delay(ms) {
	return new Promise((res) => setTimeout(res, ms));
}

export default function Index() {
	const [id, setId] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		if (id == null) {
			return;
		}

		const fetchData = async () => {
			if (id === 1) {
				await delay(1000); // delay 적용
			}

			const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}/`);
			const newData = await response.json();
		};

		fetchData();
	}, [id]);

  return (
   ...
  )
}
```

<details>
  <summary>JavaScript 코드</summary>

```js
function delay(ms) {
	return new Promise((res) => setTimeout(res, ms));
}

// DATA 1 버튼
button1.addEventListener("click", async () => {
	await delay(1000); // delay 적용
	const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
	const json = await response.json();

	idContainer.textContent = `id: ${json.id}`;
	dataContainer.textContent = `title: ${json.title}`;
});
```

</details>

<br />

만약 DATA 1 데이터 fetch가 완료되기 전에 DATA 2를 누른다면 어떻게 될까?
<img src="https://github.com/h-alex2/imgaes/assets/84281505/e2758052-e095-4e70-a4d7-e07c66709c99" />

DATA 2 데이터를 원했지만 DATA 1 의 데이터가 화면에 표시되게 된다. 이는 유저가 원했던 것이 아닐 것이다.

### 문제의 원인은 무엇일까?

네트워크 요청은 얼마나 걸릴지는 절대 예측할 수 없기 때문이다. 예제에서는 DATA 1에 명시적으로 1000ms를 기다렸지만, 이 경우가 아니더라도 더 늦은 요청이 이른 요청보다 더 빠르게 도착할 수 있다.
React 공식문서에는 어떻게 적혀있을까?

> 이렇게 하면 각각 페칭을 수행하지만, 어떤 순서로 응답이 도착할지는 보장할 수 없습니다. .. 이를 “경쟁 조건”이라고 합니다. 서로 다른 두 요청이 서로 “경쟁”하여 예상과 다른 순서로 도착한 경우입니다. 경쟁 조건을 수정하기 위해서는 오래된 응답을 무시하도록 클린업 함수를 추가해야 합니다. - [Fetching data](https://react-ko.dev/learn/you-might-not-need-an-effect#fetching-data)

### boolean flag를 이용해 해결하기

제일 간단한 방법으로는 **마지막 요청만 처리** 하는 방법이 있다.

```js
useEffect(() => {
	if (id == null) {
		return;
	}

	// 01.
	let shouldRender = true; // boolean flag 추가

	const fetchData = async () => {
		if (id === 1) {
			await delay(1000);
		}

		const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}/`);
		const newData = await response.json();

		// 02.
		if (shouldRender) {
			setData(newData);
		}
	};

	fetchData();

	// 03.
	return () => {
		// unmount시 false 설정
		shouldRender = false;
	};
}, [id]);
```

React에서는 간단히 `boolean flag`를 이용할 수 있다.
이렇게 하면 `useEffect`가 데이터를 fetch할 때 마지막으로 요청된 응답을 제외한 모든 응답이 무시된다.

- 리렌더링 될 때 마다 클린업 함수가 실행되고 `shouldRender`가 false로 설정된다.(return 문)
- 02번 단계가 완료되기 전에 id가 변경되어 리렌더링 됐을 경우 `shouldRender`가 false이므로 데이터 업데이트가 무시된다.

위 코드가 만약 위 이미지의 DATA 1번 상황이라면 데이터 페칭이 완료되기 전에 id가 1에서 2로 바뀌기 때문에 순서로는 01 -> 03 -> 02번 순으로 실행될 것이다.

---

<details>
<summary>JavaScript 코드</summary>

```js
let clickedButtonName = null;

button1.addEventListener("click", async () => {
	await delay(1000);
	const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
	const json = await response.json();

	// fetch 후에 이뤄지는 조건 처리
	if (clickedButtonName !== "button1") return; // 조건 추가

	idContainer.textContent = `id: ${json.id}`;
	dataContainer.textContent = `title: ${json.title}`;
});

button2.addEventListener("click", async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/todos/2");
	const json = await response.json();

	// fetch 후에 이뤄지는 조건 처리
	if (clickedButtonName !== "button2") return; // 조건 추가

	idContainer.textContent = `id: ${json.id}`;
	dataContainer.textContent = `title: ${json.title}`;
});
```

</details>

JavaScript 코드에서는 마지막으로 클릭한 버튼을 변수에 저장하여 fetch 이후 화면에 보여줄 때 클릭된 버튼과 id가 다르면 보여주는 것을 취소하도록 작성할 수 있다.

### flag 방법의 문제점

하지만 코드를 보면 클릭된 버튼이 다를 경우 return 해주는 부분이 **이미 fetch가 완료된 후**에 이뤄지도록 되어있다. 이 경우 필요없는 fetch까지 이뤄지기 때문에 성능상의 문제가 발생할 수도 있어보인다. 좀 더 개선할 수 없을까?

이를 개선하기 위해서는 [AbortController](https://developer.mozilla.org/ko/docs/Web/API/AbortController)를 사용할 수 있다. AbortController를 이용하면 HTTP 요청을 직접 취소할 수 있다.

### AbortController로 해결하기

```js
export default function Index() {
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const abortController = new AbortController(); // 추가

  useEffect(() => {
    if (id == null) {
      return;
    }

    const fetchData = async () => {
      if (id === 1) {
        await delay(1000);
      }

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${id}/`,
          {
            signal: abortController.signal, // 추가
          }
        );
        const newData = await response.json();
        setData(newData);
      } catch (error) {
        if (error.name === "AbortError") {
          // error handling 추가
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort(); // 추가
    };
  }, [id]);
```

<details>
<summary>JavaScript 코드</summary>

```js
let controller = null; // 추가

button1.addEventListener("click", async () => {
	if (button2.classList.value) {
		button2.classList.toggle("clicked");
	}

	button1.classList.toggle("clicked");

	// controller에 저장되어 있는 게 있다면 초기화 (이전 요청 취소하기)
	if (controller) {
		controller.abort();
		controller = null;
	}

	controller = new AbortController();

	try {
		await delay(1000);
		const response = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
			signal: controller.signal
		});
		const json = await response.json();

		idContainer.textContent = `id: ${json.id}`;
		dataContainer.textContent = `title: ${json.title}`;
	} catch (error) {
		if (error.name === "AbortError") {
			// error handling 추가
		}
	} finally {
		controller = null;
	}
});

button2.addEventListener("click", async () => {
	if (button1.classList.value) {
		button1.classList.toggle("clicked");
	}
	button2.classList.toggle("clicked");

	if (controller) {
		console.log(controller);
		controller.abort();
		controller = null;
	}

	controller = new AbortController();

	try {
		const response = await fetch("https://jsonplaceholder.typicode.com/todos/2", {
			signal: controller.signal
		});
		const json = await response.json();

		idContainer.textContent = `id: ${json.id}`;
		dataContainer.textContent = `title: ${json.title}`;
		controller = null;
	} catch (error) {
		if (error.name === "AbortError") {
			// error handling 추가
		}
	} finally {
		controller = null;
	}
});
```

</details>

<br />

## 데이터의 동기화 생각해보기

위의 예제는 데이터의 정합성과 관련이 있는 예제일 것이다. 위의 예제 말고도 여러 스레드 또는 여러 프로세스에서 동시에 같은 자원에 접근했을 때 발생하는 임계 영역을 고려해야 한다.

간단한 예제로는 아래와 같다. ([What is a Race Condition (Computer Programming)?](https://www.youtube.com/watch?v=KF8dF1QS8Go) 에서 예제를 가져왔다.)

유저가 사용하는 신용 카드가 2개가 있고 그 2개 모두 출금일, 출금 시간 모두 같다고 가정한다.

유저의 계좌 잔액으로는 100만원이 있다.

- 신용 카드 1의 출금 금액은 100만원이다.
- 신용 카드 2의 출금 금액은 50만원이다.

### 순차적으로 처리할 때

순차적으로 처리된다고 한다면 신용 카드 1 먼저 출금된 후 신용 카드 2에서는 잔액 부족으로 출금 처리가 되지 않을 것이다.

### 병렬적으로 처리할 때

만약 동시에 출금 처리가 이뤄진다면 신용 카드 1, 신용 카드 2가 접근했을 때 잔액은 모두 **100만원**으로 모두 출금 처리가 될 수도 있다.

여기서 공유 자원과 임계 영역은 유저의 잔액이다. Race condition에 대한 처리가 되어 있지 않다면 위 처럼 최악의 상황이 발생할 수도 있을 것이다.

### 어떻게 해결할 수 있을까?

동시에 접근 가능한 공유 자원에 대한 접근을 조절하는 데 사용되는 뮤텍스(Mutex)와 세마포어(Semaphore)를 사용할 수 있다. 이 부분에 대해서는 아직 부족해 개념만 정리해보려고 한다.

- 뮤텍스(Mutex)

  - 뮤텍스는 상호 배제를 위해 사용된다. 뮤텍스는 Locking 매커니즘으로 오직 하나의 스레드 또는 프로세스만이 뮤텍스를 얻어 임계 영역에 접근할 수 있도록 한다.

- 세마포어(Semaphore)
  - 동시에 접근 가능한 자원의 수를 제한하는 데 사용된다. 세마포어는 정해진 개수의 자원을 동시에 사용할 수 있도록 허용하거나 제한함으로써 동기화를 달성한다.

<br />

## 정리

- Race condition은 서로 다른 두 요청이 서로 "경쟁"하여 예상과 다른 순서로 도착한 경우 또는 여러 개의 프로세스 또는 스레드가 공유 자원에 동시에 접근하고 수정하려고 할 때 발생하는 동기화 문제이다.
- Race condition을 해결하기 위해 마지막 요청만 처리하는 경우 `boolean flag`를 사용할 수 있다.
- 불필요한 데이터 페칭을 줄이기 위해서는 `AbortController`를 사용할 수 있다.
- 데이터 동기화에서 임계 영역을 해결하기 위해서는 뮤텍스, 세마포어 방법을 사용할 수 있다.

## 출처

- [React 공식 문서](https://react-ko.dev/learn/you-might-not-need-an-effect#fetching-data)
  - 비공식 한글 번역 사이트를 참고했습니다.
- [Fixing Race Conditions in React with useEffect](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect#useeffect-clean-up-function-with-abortcontroller)
- [Your Web Application May Have Bugs Due to Race Conditions](https://betterprogramming.pub/fix-race-conditions-in-react-187afc87d9e)
- [Does this JavaScript example create “race conditions”? (To the extent that they can exist in JavaScript)](https://stackoverflow.com/questions/73202786/does-this-javascript-example-create-race-conditions-to-the-extent-that-they)
- [How to avoid async race conditions in JavaScript](https://medium.com/@slavik57/async-race-conditions-in-javascript-526f6ed80665)
- [세마포어(Semaphore) vs 뮤텍스(Mutex)](https://dkwjdi.tistory.com/247)
- [What is a Race Condition (Computer Programming)?](https://www.youtube.com/watch?v=KF8dF1QS8Go)
- [비동기 처리 시 race condition 고려하기](https://tecoble.techcourse.co.kr/post/2021-09-12-race-condition-handling/)
