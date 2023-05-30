---
title: 비동기 - Promise, Async
tag: 비동기
date: 2022-06-01 21:21:54
---

## 동기와 비동기

햄버거를 먹으려면 맥도날드에 가서 _바로_ 주문할 수 있다. 앞의 사람이 음식을 받지 않아도 바로 주문할 수 있다.

근데 만약 앞사람의 주문이 다 처리되고 나서야 주문할 수 있다면 어떻게될까? 효율적이지 못한 방법이라고 생각할 수 밖에 없다. 그리고 고객들의 불만이 쌓여갈 것이다.

이 간단한 예시로 비동기와 동기를 이해할 수 있다.

맥도날드의 예를 웹페이지로 바꿔서 생각해보면 더 잘 알 수 있다. 네이버 홈페이지를 예로 들어 홈페이지에 있는 하나 하나의 리소스가 주문이라고 생각해보자. 동기적으로 홈페이지를 구현하면 앞의 주문이 처리가 끝나야 다음 주문이 처리되기 때문에 하나씩 순차적으로 페이지에 나타나게 되고 답답한 페이지가 될 수 밖에 없다.

**비동기는 작업을 병렬적으로 실행할 수 있어 효율적으로 작업을 수행할 수 있게 해준다.**

예시

```js
let response = fetch("myImage.png");
let blob = response.blob();
// display your image blob in the UI somehow
```

인터넷 속도가 빠른 컴퓨터거나 사이즈가 아주 작은 이미지라면 문제없을 수 있지만 인터넷 속도가 느리거나 이미지 사이즈가 아주 크다면 가져오는 데 시간이 걸리게된다.

두번째 코드가 실행될 때 이미지가 다운로드 되지 않아 response가 아직 제공되지 않은 상황이라면 에러가 발생할 것이다. 이러한 경우 때문에 이 코드는 동기가 아닌 비동기적으로 작성하여 response가 반환되기 전까지 기다리도록 작성해야 한다.

## Async Callback

콜백함수는 나중에 호출되는 함수라는 뜻

비동기 흐름을 제어하는 가장 전통적인 방법은 콜백 함수를 이용하는 것

callback 함수가 쓰이는 예시로 eventListener의 두번째 인자, setTimeout의 두번째 인자가 있다.

예시

```js
class UserStorage {
	loginUser(id, password, onSuccess, onError) {
		setTimeout(() => {
			if ((id === "ellie" && password === "dream") || (id === "coder" && password === "academy")) {
				onSuccess(id);
			} else {
				onError(new Error("not fount"));
			}
		}, 2000);
	}

	getRoles(user, onSuccess, onError) {
		setTimeout(() => {
			if (user === "ellie") {
				onSuccess({ name: "ellie", role: "admin" });
			} else {
				onError(new Error("no access"));
			}
		});
	}
}

const userStorage = new UserStorage();
const id = prompt("enter your id");
const password = prompt("enter your password");
userStorage.loginUser(
	id,
	password,
	(user) => {
		userStorage.getRoles(
			user,
			(userWithRole) => {
				alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`);
			},
			(error) => {
				console.log(error);
			}
		);
	},
	(error) => {
		console.log(error);
	}
);
```

ID와 비밀번호를 입력하는 프롬프트를 생성하고 ID와 비밀번호가 각각 ellie, dream 또는 coder, academy라면

Hello ellie, you have a admin role 이라는 문구가 alert에 뜨고 그 외의 단어라면 에러가 뜨는 함수를 만들었다.

비동기로 실행되는 코드는 콜백 함수 내부에서 에러에 대한 분기 처리가 필수적이기 때문에 비동기 작업이 연속된다면 더욱 복잡해짐. 콜백 함수가 중첩됨에 따라 뎁스가 깊어져 가독성이 떨어지고, 에러 핸들링에 대한 로직까지 더해져 더욱 이해하기 힘든 코드가 나올 수 있다.

흔히 콜백 지옥 이라고 부름

## Promise

promise는 저 안의 비동기작업이 완료되면 (성공하던 실패하던) 결과를 받을 수 있다는 약속을 객체의 형태로 받는 것.

생성된 프로미스 객체는 미래에 맞이할 성공 혹은 실패에 대한 결과값을 나타냄. 미래에 겨로가를 돌려주겠다는 약속이다.

모든 프로미스 객체는 다음 세 가지 상태 중 하나의 상태를 가지며, 한 번이라도 성공하거나 실패한 프로미스는 초기 상태로 돌아갈 수 없다. 즉 promise는 무조건적으로 결과를 반환한다. (만드는 순간 실행된다.)

promise는 객체라서 변수에 담을 수도 있고 원하는 곳에 넣을 수도 있다.

단순히 콜백헬을 해결하려고 나온 것은 아니다. 콜백헬을 조금 더 개선해주기는 하지만 그건 부수적인 것이고 근본적으로는 콜백함수에서 수동적, 제한적으로 통제하던 상황을 조금 더 능동적으로 개선해준다.

### Promise의 상태

- Pending
  - 아직 결과가 정해지지 않은 상태
- Fulfilled
  - 성공한 상태
- Rejected
  - 실패한 상태

### Promise 만들기

1. 함수를 인자로 받는다.

```js
const promise = new Promise(function () {
	// something..
});
```

2. 프로미스 생성자 함수에 인자로 들어간 함수는 일반적으로 resolve, reject라고 부르는 2개의 매개 변수를 사용할 수 있다. resolve와 reject는 함수다.

```js
const promise = new Promise(function (resolve, reject) {
	// do something async here..
});
```

3. 프로미스 생성자 함수에 인자로 들어간 함수 내부에서 우리는 비동기 작업을 하고, 비동기 작업이 성공하면 resolve를 실행해야 하고, 실패하면 reject를 실행해야 한다.

```js
const promise = new Promise(function (resolve, reject) {
	// do something async here..
	fs.readFile(path, "utf-8", (err, data) => {
		if (err) {
			reject(err);
		} else {
			resolve(data);
		}
	});
});
```

promise 생성 예시

```js
const promise = new Promise((resolve, reject) => {
	console.log("doing something...");
	setTimeout(() => {
		// resolve('ellie'); //작동이 잘 되었다면 'ellie'를 호출
		reject(new Error("no netword"));
	}, 2000);
});
```

생성하고 나서 then, catch, finally 를 이용해 값을 받아올 수 있다.

- then
  - promise가 정상적으로 잘 수행이 되어서 마지막 최종적으로 전달한 값이 value의 파라미터로 전달된다. then은 값을 바로 전달할 수도 있고 promise를 전달할 수도 있다.
- finally
  - 성공, 실패 상관없이 무조건 마지막에 수행

```js
promise
	.then((value) => {
		console.log(value);
	}) //then을 호출하게되면 promise가 리턴되고 그 리턴된 promise에 .catch를 등록하는 것
	.catch((error) => {
		console.log(error);
	})
	.finally(() => {
		console.log("finally");
	});
```

예시

```js
const fetchNumber = new Promise((resolve, reject) => {
	setTimeout(() => resolve(1), 1000);
});

fetchNumber
	.then((num) => num * 2) // num = 2
	.then((num) => num * 3) // num = 6
	.then((num) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(num - 1), 1000); // num = 5
		});
	})
	.then((num) => console.log(num)); // 5
```

```js
const getHen = () =>
	new Promise((resolve, reject) => {
		setTimeout(() => resolve("🐓"), 1000);
	});
const getEgg = (hen) =>
	new Promise((resolve, reject) => {
		setTimeout(() => resolve(`${hen} => 🥚`), 1000);
	});
const cook = (egg) =>
	new Promise((resolve, reject) => {
		setTimeout(() => resolve(`${egg} => 🍳`), 1000);
	});

getHen()
	.then((hen) => getEgg(hen)) //받아오는 value를 다른 함수 호출에 사용하는 경우에는
	.then((egg) => cook(egg)) // 밑과 같이 줄여쓸 수 있다.
	.then((meal) => console.log(meal));

getHen().then(getEgg).then(cook).then(console.log);
```

오류 처리 예시

```js
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('🐓'), 1000);
  });
const getEgg = hen =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${hen} => 🥚`), 1000);
  });
const cook = egg =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🍳`), 1000);
  });

getHen()
  .then(getEgg)
  .catch(error => {
    return '🍟';
  } // 위 then에서 발생하는 에러를 처리하기 위해 바로 밑에 catch를 달아서 에러처리를 해줬다.
  .then(cook)
  .then(console.log);
```

위 콜백함수의 예제를 promise로 변경해보기

```js
class UserStorage {
	loginUser(id, password) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (
					(id === "ellie" && password === "dream") ||
					(id === "coder" && password === "academy")
				) {
					resolve(id);
				} else {
					reject(new Error("not found"));
				}
			}, 2000);
		});
	}

	getRoles(user) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (user === "ellie") {
					resolve({ name: "ellie", role: "admin" });
				} else {
					reject(new Error("no access"));
				}
			}, 1000);
		});
	}
}

const userStorage = new UserStorage();
const id = prompt("enter your id");
const password = prompt("enter your password");

userStorage
	.loginUser(id, password)
	.then(userStorage.getRoles)
	.then((user) => alert(`Hello ${user.name}`))
	.catch(console.log);
```

## async, await

- syntactic sugar라고 하는 것 중 하나다. (대표적인 신택스 슈가는 class가 있다.)

- await 구문을 실행하는 함수는 앞에 async 를 붙여줘야 한다.

- 함수의 반환 값이 바뀐다. 일반적인 함수와 달리 async 함수는 항상 Promise 객체를 반환한다.

- 비동기 코드를 동기적으로 작동하는 코드와 더욱 유사한 형태로 편리하게 작성할 수 있도록 도와준다.

예시

```js
function resolveAfter2Seconds(x) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(x);
		}, 2000);
	});
}

async function add(x) {
	console.log("start 2");
	const a = await resolveAfter2Seconds(20);
	console.log("a", a);
	const b = await resolveAfter2Seconds(30);
	console.log("b", b);
	return x + a + b;
}

console.log("start 1");

add(10);

console.log("finish");
```

Async function은 원래 Promise를 반환한다. 근데 구문 내부에 return값이 있다면?

- Async 함수 내부에서의 return 구문은 해당 Promise에 대한 resolve 값으로 사용된다. 즉, 위 add(10) 함수 실행문이 반환하는 결과는 Promise이며, 그 Promise의 resolve 값은 60이다.

예시

```js
// Async/Await Example #1

const a = new Promise(function (resolve, reject) {
	setTimeout(function () {
		resolve(666);
	}, 1000);
});

const b = new Promise(function (resolve, reject) {
	setTimeout(function () {
		resolve(777);
	}, 1000);
});

// a, b: promise
async function process() {
	const result = (await a) + (await b);
	console.log(result);
}

process();
```

에러핸들링 예시

```js
// Async/Await Example #4
function foo() {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			console.log(2);
			reject();
		}, 1000);
	});
}

async function bar() {
	try {
		const a = await foo();
		const b = await foo();
		return a;
	} catch (err) {
		console.error(err);
	}
}
```

> 참고 출처
> [Introducing asynchronous JavaScript](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Introducing#asynchronous_javascript) > [자바스크립트 12. 프로미스 개념부터 활용까지 JavaScript Promise | 프론트엔드 개발자 입문편 (JavaScript ES6)](https://youtu.be/JB_yU6Oe2eE) > [자바스크립트 13. 비동기의 꽃 JavaScript async 와 await 그리고 유용한 Promise APIs | 프론트엔드 개발자 입문편 (JavaScript ES6)](https://youtu.be/aoQSOZfz3vQ) > [콜백](https://ko.javascript.info/callbacks)
> 바코더클럽
