---
title: 함수형 프로그래밍 방식으로 함수 만들기
tag: 함수형 프로그래밍
description: 한다 나는 함수형 프로그래밍
date: 2023-08-05 21:50:00
---

유인동님의 자바스크립트로 알아보는 함수형 프로그래밍 (ES5) 강의를 보고 정리한 글입니다.

---

함수형 코딩 책을 읽으면서도 뭔가 아쉽다는 느낌을 받아 강의를 보게되었다. 결론은 너무 재밌음. `쏙쏙 들어오는 함수형 코딩`은 명령형 프로그래밍의 사고를 함수형으로 전환하기 위한 길을 터주는 역할이라면 유인동님 강의는 좀 더 실용적인 느낌이다. 좀 더 익히고 나서 프로젝트 리팩토링을 함수형으로 해봐야겠다.

## 함수형 프로그래밍

함수형 프로그래밍은 특정 언어에 국한되는 것이 아니라 **패러다임**이다. 언어 위에 있는 패러다임. 패러다임을 익히게 되면 함수형 프로그래밍의 대표격인 클로저나 엘릭서 같은 언어도 다룰 준비가 되었다는 것을 의미한다.

## 함수형 사고방식

문제의 해결 방법을 동사(함수)들로 구성(조합)하는 것

- 마이클 포거스 [클로저 프로그래밍의 즐거움]

## 객체 지향과 함수형 프로그래밍

```js
// 데이터(객체) 기준
duck.moveLeft();
duck.moveRight();
dog.moveLeft();
dog.moveRight();

// 함수 기준
moveLeft(dog);
moveRight(duck);
moveLeft({ x: 5, y: 2 });
moveRight(dog);
```

객체 지향에서는 데이터를 먼저 디자인하고 데이터에 맞는 메서드를 만든다. 함수형 프로그래밍은 함수를 만들고 함수에 맞게 데이터를 구성하는 식이다.

## 명령형 코드를 함수형으로 변경해보기

```js
const users = [
	{ id: 1, name: "ID", age: 36 },
	{ id: 2, name: "AD", age: 32 },
	{ id: 3, name: "DD", age: 32 },
	{ id: 4, name: "CD", age: 31 },
	{ id: 5, name: "FD", age: 27 },
	{ id: 6, name: "ED", age: 23 }
];
```

- 30세 이상인 users를 거른다.

```js
const temp_users = [];
for (let i = 0; i < users.length; i++) {
	if (users[i].age >= 30) {
		temp_users.push(users[i]);
	}
}
```

- 30세 이상인 users의 names를 수집한다.

```js
const names = [];
for (let i = 0; i < temp_users.length; i++) {
	if (users[i].age <= 30) {
		names.push(temp_users[i].name);
	}
}
```

- 30세 미만인 users를 거른다.

```js
  const temp_users = [];
  for (let i = 0l i < users.length; i++) {
    if (users[i].age < 30) {
      temp_users.push(users[i]);
    }
  }
```

- 30세 미만인 users의 ages를 수집한다.

```js
const ages = [];
for (let i = 0; i < temp_users.length; i++) {
	ages.push(temp_users[i].age);
}
```

- 코드를 보면 중복이 많다.

## `filter`와 `map`을 만들어서 개선해보기

```js
function _filter(list, predi) {
	const new_list = [];

	for (let i = 0; i < list.length; i++) {
		if (predi(list[i])) {
			new_list.push(list[i]);
		}
	}

	return new_list;
}

console.log(_filter(users, (user) => user.age >= 30));
console.log(_filter(users, (user) => user.age < 30));
```

- 추상화의 단위가 객체나 메서드나 클래스가 아니라 함수를 이용해서 프로그래밍 한다.
- 원래 있는 값을 직접 변경하지 않고 새로운 값을 만든다.
- 어떤 조건일 때 수행하는 지를 `predicate`에 완전히 위임한다.
- `filter`와 같은 것을 **응용형 함수**라고 한다. 함수를 인자로 받아 원하는 시점에 평가를 하면서 내가 원하는 특정한 인자를 적용해나가면서 로직을 완성해 나가는 방식

```js
function _map(list, mapper) {
	const new_list = [];

	for (let i = 0; i < list.length; i++) {
		new_list.push(mapper(list[i]));
	}

	return new_list;
}

const over_30 = _filter(users, (user) => user.age >= 30);
console.log(_map(over_30, (user) => user.name));
```

- 이번에도 `mapper`를 통해서 무엇을 수집할 것인지를 완전히 위임해준다.
- 이 코드를 보면 데이터형이 어떻게 생겼는지 보이지 않는다. 이것이 함수형 프로그래밍의 중요한 특징이다. **다형성**이 굉장히 높고 관심사가 완전히 분리가 된다.
- 함수형 프로그래밍에서는 대입문을 많이 쓰지 않는 특징이 있다.

## each 만들기

filter와 map을 보면 loop를 도는 부분이 중복되고있다.

```js
function _each(list, iter) {
	//iteratee를 받아서 반복하는 함수
	for (let i = 0; i < list.length; i++) {
		iter(list[i]);
	}

	return list;
}
```

### `_map`과 `_filter`를 `_each`를 통해 개선해보기

```js
function _filter(list, predi) {
	const new_list = [];

	_each(list, function (val) {
		if (predi(val)) {
			new_list.push(val);
		}
	});

	return new_list;
}
```

```js
function _map(list, mapper) {
	const new_list = [];

	_each(list, function (val) {
		new_list.push(mapper(val));
	});

	return new_list;
}
```

- `for`문을 돌면서 안에서 하는 일을 `_each`에게 완전히 위임하게 된다.

## 다형성

앞서 만들었던 `map`, `filter`함수는 JavaScript에 원래 있는 함수이다. 근데 이미 있는 함수를 왜 만드는 걸까?

- 원래 있는 함수는 `메서드`이다. 메서드라는 말은 순수 함수가 아니고 객체의 상태에 따라 결과가 달라지는 특징을 가지고 있다.
- 메서드는 **객체 지향** 프로그래밍이다. 메서드의 특징은 해당 클래스에 정의되기 때문에 해당 클래스의 인스턴스 에서만 사용할 수 있는 특징이 있다.
- `array like` 객체에서는 사용할 수 없다는 특징을 갖고 있다. 대표적으로 돔의 노드 객체가 있다. -> 다형성을 지원하기 어려움이 있을 수 있다.

```js
console.log(document.querySelectorAll("*").map((node) => node.nodeName)); // error 발생
console.log(_map(document.querySelectorAll("*"), (node) => node.nodeName)); // 작동 O
```

- `_map`함수는 `length`가 있고 `key-value`쌍의 객체라면 모두 동작하도록 되어 있다.

### 내부 다형성

- `predicate`, `iteratee`, `mapper`

```js
_map([1, 2, 3, 4], (v) => v + 10);
```

- 이 모습을 봤을 때 저 두 번째 인자로 들어간 것을 **콜백 함수**라고 부르는 경향이 있다. 하지만 함수형 프로그래밍에서는 두 번째 함수가 어떤 역할을 하는 함수인지에 따라 굉장히 다양한 이름을 갖는 것이 중요하다. 각각의 역할에 맞는 보조 함수의 이름을 불러주는 것이 좋다.(ex, predi, iter, mapper)

## 커링 curring

```js
function _curry(fn) {
	return function (a) {
		return function (b) {
			return fn(a, b);
		};
	};
}

const add = _curry((a, b) => a + b);
const add10 = add(10);

console.log(add10(5)); //15
console.log(add(10)(5)); //15
```

- 원하는 시점까지 미뤄놨다가 최종적으로 평가하는 함수

```js
function _curry(fn) {
	return function (a) {
		return arguments.length === 2
			? fn(a, b)
			: function (b) {
					return fn(a, b);
			  };
	};
}
```

```js
function _curryr(fn) {
	return function (a, b) {
		return arguments.length === 2
			? fn(a, b)
			: function (b) {
					return fn(b, b);
			  };
	};
}

const sub = _curryr((a, b) => a - b);

console.log(sub(10, 5)); //5
console.log(sub(10)(5)); //5
```

## `_get`을 만들어 좀 더 간단하게 하기

- object의 값을 안전하게 참조하는 함수

```js
function _get(obj, key) {
	return obj === null || obj === undefined ? undefined : obj[key];
}

const user1 = users[0];
console.log(_get(user1, "name"));
```

### curryr 적용해서 더 간결하게 만들기

```js
var _get = _curryr(_get);

_get("name")(users[0]);
```

- 위와 같은 예제로 사용할 수 있다. 먼저 name을 도출하는 함수를 return한다.

## `reduce`

```js
function _reduce(list, iter, memo) {
	if (arguments.length === 2) {
		memo = list[0];
		list = list.slice(1);
	}
	_each(list, function (val) {
		memo = iter(memo, val);
	});

	return memo;
}

const add = (a, b) => a + b;
console.log(_reduce([1, 2, 3, 4], add, 0)); //10
```

## `rest`

```js
const slice = Array.prototype.slice;
function _rest(list, num) {
	return slice.call(list, num || 1);
}

function _reduce(list, iter, memo) {
	if (argumnets.length === 2) {
		memo = list[0];
		list = _rest(list);
	}
	_each(list, function (val) {
		memo = iter(memo, val);
	});

	return memo;
}
```

## `reduce`를 이용해서 파이프라인 만들기

```js
const f1 = _pipe(
  a => a + 1;,
  a => a * 2
)

f1(1); // 4
```

- 함수들을 받아서 함수들을 **연속적으로** 실행하는 함수를 return하는 함수

```js
function _pipe() {
	const fns = arguments;

	return function (arg) {
		return _reduce(
			fns,
			function (arg, fn) {
				return fn(arg);
			},
			arg
		);
	};
}
```

## `_go`

- `pipe`는 함수를 리턴하는 함수고, `go`는 바로 결과를 만드는 함수라고 볼 수 있다.

```js
_go(
	1,
	(a) => a + 1,
	(a) => a * 2,
	(a) => a * a
);
```

```js
function _go(arg) {
	const fns = _rest(arguments); // 맨 앞의 인자가 제거된 인자를 만든다.
	return _pipe.apply(null, fns)(arg); // _pipe(...fns)(arg); 이것과 같다.
}
```

```js
_map(
	_filter(users, (user) => user.age >= 30),
	_get("name")
);

_go(
	users,
	(users) => _filter(users, (user) => user.age >= 30),
	(users) => _map(users, _get("name")),
	console.log
);
```

### curryr을 통해 더 간결하게 만들어보기

```js
var _map = _curryr(_map);
var _filter = _curryr(_filter);

// 원래 사용하는 방법
_map([1, 2, 3], (val) => val * 2);

// curryr을 적용한 방법
_map((val) => val * 2)([1, 2, 3]);

_go(
	users,
	_filter((user) => user.age >= 30),
	_map(_get("name")),
	console.log
);
```

## `_each`의 외부 다형성 높이기

- 함수형 프로그래밍에서는 예외적인 데이터가 들어오는 경우에 다형성을 높이는 방법으로 해결하기도 한다.

```js
function _each(list, iter) {
	//iteratee를 받아서 반복하는 함수
	for (let i = 0; i < list.length; i++) {
		iter(list[i]);
	}

	return list;
}
```

- 이 경우에 `list`에 `null`을 넣으면 에러가 나게된다.

```js
const _length = _get("length");

function _each(list, iter) {
	for (let i = 0, len = _length(list); i < len; i++) {
		iter(list[i]);
	}

	return list;
}

console.log(_each(null, console.log)); // undefined
console.log(_filter(null, (v) => v)); // []
console.log(_map(null, (v) => v)); // []

_go(
	null,
	_filter((v) => v % 2),
	_map((v) => v * v),
	console.log
); // []
```

- `_length`라는 함수를 만들면 `_get`에 list가 `null`이나 `undefined`가 와도 대응할 수 있도록 되어 있기 때문에 에러가 나지 않을 것

## `_keys` 만들기

- `Object.keys(null)`은 에러가 나게된다. 이 부분을 좀 더 안전하게 만들어보자.

```js
function _is_object(obj) {
	return typeof obj === "object" && !!obj;
}

function _keys(obj) {
	return _is_object(obj) ? Object.keys(obj) : [];
}

console.log(_keys({ name: "ID" })); // "name"
console.log(_keys(null)); // []
```

- 이것을 이용하면 `_each`함수도 조금 더 다향성을 높일 수 있다.
  - array말고 key value 쌍이라도 반복하게끔 만들 수 있다.

```js
_each(
	{
		13: "ID",
		19: "HD",
		29: "YD"
	},
	(name) => console.log(name)
);
// 이런 것이 가능하게끔
```

```js
function _each(list, iter) {
	const keys = _keys(list);

	for (let i = 0, len = keys.length; i < len; i++) {
		iter(list[keys[i]]);
	}

	return list;
}

console.log(
	_map(
		{
			13: "ID",
			19: "HD",
			29: "YD"
		},
		(name) => name.toLowerCase()
	)
); // ['id', 'hd', 'yd']
```

## 컬렉션 중심 프로그래밍

- 수집하기: `map`, `values`, `pluck` 등
- 거르기: `filter`, `reject`, `compack`, `without` 등
- 찾아내기: `fine`, `some`, `every` 등
- 접기: `reduce`, `min`, `max`, `group_by`, `count_by`

## 수집하기

### `map`을 이용해 `values`만들기

```js
function _values(data) {
	return _map(data, (val) => val);
}

console.log(_values(users[0])); // [1, "ID", 36]

function _identity(val) {
	return val;
}

function _values(data) {
	return _map(data, _identity);
}

console.log(_values(users[0])); // [1, "ID", 36]
console.log(_map(_identity)(users[0])); // [1, "ID", 36]

var _values = _map(_identity);
```

### `map`을 이용해 `pluck` 만들기

- 배열 내부의 객체에 있는 key를 이용해 값들을 수집하는 함수

```js
function _pluck(data, key) {
	return _map(data, _get(key));
}

console.log(_pluck(users, "age"));
console.log(_pluck(users, "name"));
console.log(_pluck(users, "id"));
```

## 거르기

### `filter`를 이용해 `reject`만들기

- `reject`는 `filter`와 반대로 true로 평가되는 값들을 제외시킨다.

```js
function _reject(data, predi) {
	return _filter(data, (val) => !predi(val));
}

console.log(_reject(users, (user) => user.age < 30));
// [
//     {
//         "id": 1,
//         "name": "ID",
//         "age": 36
//     },
//     {
//         "id": 2,
//         "name": "AD",
//         "age": 32
//     },
//     {
//         "id": 3,
//         "name": "DD",
//         "age": 32
//     },
//     {
//         "id": 4,
//         "name": "CD",
//         "age": 31
//     }
// ]
```

```js
function _negate(func) {
	return function (val) {
		return !func(val);
	};
}

function _reject(data, predi) {
	return _filter(data, _negate(predi));
}
```

- `_negate`를 만들어 더 간결하게 만들 수도 있다.
- 순수 함수를 계속 평가 시점을 다루거나 함수를 리턴하거나.. 이런 식으로 함수들 간의 조합을 이용하는 것이 함수형 프로그래밍

### `filter`를 이용해 `compact`만들기

- truthy한 값만 남기는 것

```js
const _compact = _filter(_identity);

console.log(_compact([0, 1, 2, null, false])); // [1, 2]
```

## 찾아내기

### `find` 만들기

```js
const _find = _curryr((list, predi) => {
	const keys = _keys(list);
	for (let i = 0, len = keys.length; i < len; i++) {
		const val = list[keys[i]];
		if (predi(val)) return val;
	}
});

console.log(_find(users, (user) => user.age < 30));
_go(
	users,
	_find((user) => user.age < 30),
	_get("name"),
	console.log
);
```

### `find_index`만들기

```js
function _find_index(list, predi) {
	const keys = _keys(list);
	for (let i = 0, len = keys.length; i < len; i++) {
		const val = list[keys[i]];
		if (predi(val)) return i;
	}

	return -1;
}
```

### `find_index`를 이용해 `some` 만들기

- `_some([1, 2, 5, 10, 20], val => val > 10);` 이 조건에 맞는 값이 하나라도 있으면 `true`가 된다.

```js
const _some = _curryr((list, predi) => {
	return _find_index(list, predi) !== -1;
});
```

- `predi`를 안 넣어도 동작해야 한다.

```js
const _some = (data, predi) => {
	return _find_index(data, predi || _identity) !== -1;
};
```

### `find_index`를 이용해 `every` 만들기

- 모든 값이 predi에 만족해야 `true`가 나온다.

```js
const _every = (data, predi) => {
	return _find_index(data, _negate(predi || _identity)) === -1;
};
```

## 접기

### `reduce`를 이용해 `min` 만들기

```js
function _min(data) {
	return _reduce(data, (a, b) => {
		return a < b ? a : b;
	});
}
```

### `reduce`를 이용해 `max` 만들기

```js
function _max(data) {
	return _reduce(data, (a, b) => {
		return a > b ? a : b;
	});
}
```

### `reduce`를 이용해 `min_by` 만들기

```js
const _min_by = _curryr((data, iter) => {
	return _reduce(data, (a, b) => {
		return iter(a) < iter(b) ? a : b;
	});
});
```

### `reduce`를 이용해 `max_by` 만들기

```js
const _max_by = _curryr((data, iter) => {
	return _reduce(data, (a, b) => {
		return iter(a) > iter(b) ? a : b;
	});
});

_go(
	users,
	_filter((user) => user.age >= 30),
	_min_by(_get("age")),
	console.log
);
console.log(_max_by([1, 2, 4, 10, 5, -4, -11], Math.abs)); // -11
```

### `reduce`를 이용해 `group_by` 만들기

- 특정 조건을 통해 그룹을 만들어주는 함수

```js
const _group_by = _curryr((data, iter) => {
	return _reduce(
		data,
		(grouped, val) => {
			const key = [iter(val)];
			(grouped[key] = grouped[key] || []).push(val);

			return grouped;
		},
		{}
	);
});

console.log(_group_by(users, (user) => user.age));
// {
//     "23": [
//         {
//             "id": 6,
//             "name": "ED",
//             "age": 23
//         }
//     ],
//     "27": [
//         {
//             "id": 5,
//             "name": "FD",
//             "age": 27
//         }
//     ],
//     "31": [
//         {
//             "id": 4,
//             "name": "CD",
//             "age": 31
//         }
//     ],
//     "32": [
//         {
//             "id": 2,
//             "name": "AD",
//             "age": 32
//         },
//         {
//             "id": 3,
//             "name": "DD",
//             "age": 32
//         }
//     ],
//     "36": [
//         {
//             "id": 1,
//             "name": "ID",
//             "age": 36
//         }
//     ]
// }
```

```js
function _push(obj, key, val) {
	(obj[key] = obj[key] || []).push(val);

	return obj;
}

const _group_by = _curryr((data, iter) => {
	return _reduce(
		data,
		(grouped, val) => {
			const key = [iter(val)];

			return _push(grouped, iter(val), val);
		},
		{}
	);
});
```

- `_push` 함수를 만들어 더 간결하게 만들 수 있다.

```js
console.log(_group_by(users, (user) => user.age - (user.age % 10)));
console.log(_group_by(users, (user) => user.name[0])); // 첫 글자로 그루핑
```

- 이렇게 10대 20대... 로 groupping 할 수 있다.

### `reduce`를 이용해 `count_by` 만들기

```js
const _count_by = _curryr((data, iter) => {
	return _reduce(
		data,
		(count, val) => {
			const key = iter(val);
			count[key] = count[key] ? count[key] + 1 : 1;

			return count;
		},
		{}
	);
});
```

```js
const _inc = (count, key) => {
	count[key] = count[key] ? count[key] + 1 : 1;

	return count;
};

const _count_by = _curryr((data, iter) => {
	return _reduce(
		data,
		(count, val) => {
			return _inc(count, iter(val));
		},
		{}
	);
});
```

- `_inc` 함수를 통해 더 간결하게 만들 수 있다.

## `map`, `each` 더 개선하기

```js
function _each(list, iter) {
	const keys = _keys(list);

	for (let i = 0, len = keys.length; i < len; i++) {
		iter(list[keys[i]], keys[i]); // key[i]도 넘기기
	}

	return list;
}

function _map(list, mapper) {
	const new_list = [];

	_each(list, function (val, key) {
		// 여기도 key 함께 넘기기
		new_list.push(mapper(val, key));
	});

	return new_list;
}

_map(users[0], console.log);
// 1 "id"
// ID name
// 36 "age"

console.log(_map(users[0], (val, key) => [key, val]));
// [
//     [
//         "id",
//         1
//     ],
//     [
//         "name",
//         "ID"
//     ],
//     [
//         "age",
//         36
//     ]
// ]
```

### `map`을 이용해서 `pairs`만들기

```js
const _pairs = _map((val, key) => [key, val]);

console.log(_pairs(users[0])); // 위 결과와 같다.
```

### 실용적인 예제 보기

```js
_go(
	users,
	_count_by((user) => user.age - (user.age % 10)),
	_map((count, key) => `${key}대는 ${count}명 입니다.`),
	console.log
); // ["20대는 2명 입니다.", "30대는 4명 입니다."]

_go(
	users,
	_count_by((user) => user.age - (user.age % 10)),
	_map((count, key) => `<li>${key}대는 ${count}명 입니다.</li>`),
	(list) => "<ul>" + list.join("") + "</ul>",
	(html) => document.write(html) // 또는 document.write.bind(document),
);
```

## 지연 평가

### 지연 평가를 시작 시키고 유지 시키는(이어 가는) 함수

- `map`
- `filter`, `reject`

### 지연 평가를 끝내는 함수

- `take`
- `some`, `every`, `find`

```js
// partial.js
// 총 200번의 반복을 하는 함수
-.go(
  _.range(100),
  _.map(val => val * val),
  _.filter(val => val % 2),
  console.log
)

-.go(
  _.range(100),
  L.map(val => val * val),
  L.filter(val => val % 2), // 50개짜리 배열
  L.take(5), // 5개 꺼내기
  console.log
)

```

- `L`로 바꾸면 lazy로 평가하라는 뜻
- `L`로 바꾸면 `map`이 끝난 후에 `filter`를 하는 것이 아니라, 하나를 진행한 후에 바로 `filter`에 간다. `filter`를 통과하면 바로 `take`에 넘겨서 하나를 축적하게 된다. 이렇게 반복하면서 5개가 모일 만큼만 실행하고 그 뒤에는 실행하지 않도록 내부적으로 최적화를 알아서 해준다.
- 이것이 가능한 이유는 **순수 함수**이기 때문이다.
- **순수 함수는 평가 시점을 바꿔도 항상 동일한 결과를 만들 수 있다.**

```js
        val val2 val3 val4 val5
map     ↓
filter  ↓
map     ↓
reject  ↓
take(2)
```

- 방향이 아래를 향하게 된다. 아래를 향하여 다음 메소드를 통과하지 않으면 다시 올라오는 방식

## 엄격한 평가

```js
        val val2 val3 val4 val5
map     ->
filter  ->
map     ->
reject  ->
take(2) ->
```

- 방향이 오른쪽으로 향하게 된다. 오른쪽 방향이 끝나면 밑으로 내려가는 방식
