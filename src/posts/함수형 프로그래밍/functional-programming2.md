---
title: 함수형 프로그래밍 - 일급 함수와 고차 함수
tag: 함수형 프로그래밍, 쏙쏙 들어오는 함수형 코딩
description: 일급 함수와 고차 함수를 통해 리팩토링하기
date: 2023-08-02 22:50:16
---

<img src="https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791191600759.jpg" alt="book-image">
쏙쏙 들어오는 함수형 코딩을 읽고 정리한 글입니다.

## 코드의 냄새 - 함수 이름에 있는 암묵적 인자

- 값을 명시적으로 전달하지 않고 함수 이름의 일부로 "전달"하는 것
- 이 부분은 일급 값으로 바꾸면 표현력이 더 좋아진다. 함수 본문에서 사용하는 어떤 값이 함수 이름에 나타난다면 함수 이름에 있는 암묵적 인자는 코드의 냄새가 된다.

### 냄새를 맡는 법

함수 이름에 있는 암묵적 인자 냄새는 두 가지 특징을 보인다.

1. 함수 구현이 거의 똑같다.
2. 함수 이름이 구현의 차이를 만든다.
   함수 이름에서 서로 다른 부분이 암묵적 인자이다.

### 리팩터링 - 암묵적 인자를 드러내기

암묵적 인자를 드러내기 리팩터링은 암묵적 인자가 일급 값이 되도록 함수에 인자를 추가한다. 이렇게 하면 잠재적 중복을 없애고 코드의 목적을 더 잘 표현할 수 있다.

- 기본적인 아이디어는 암묵적 인자를 명시적인 인자로 바꾸는 것이다.

- 단계

1. 함수 이름에 있는 암묵적 인자를 확인한다.
2. 명시적인 인자를 추가한다.
3. 함수 본문에 하드 코딩된 값을 새로운 인자로 바꾼다.
4. 함수를 호출하는 곳을 고친다.

```js
// 리팩터링 전
function setPriceByName(cart, name, price) {
	// 함수 이름에 있는 price가 암묵적 인자이다.
	const itme = cart[name];
	const newItem = objectSet(item, "price", price);
	const newCart = objectSet(cart, name, newItem);

	return newCart;
}

cart = setPriceByName(cart, "shoe", 13);
cart = setQuantityByName(cart, "shoe", 3);
cart = setShippingByName(cart, "shoe", 0);
cart = setTaxByName(cart, "shoe", 2.4);

// 리팩터링 후
function setFieldByName(cart, name, field, value) {
	// 명시적인 인자를 추가한다.
	// 원래 인자는 더 일반적인 이름으로 바꾼다.
	const item = cart[name];
	const newItem = objectSet(item, field, value);
	const newCart = objectSet(cart, name, newItem);

	return newCart;
}

cart = setFieldByName(cart, "shoe", "price", 13);
cart = setFieldByName(cart, "shoe", "quantity", 3);
cart = setFieldByName(cart, "shoe", "shipping", 0);
cart = setFieldByName(cart, "shoe", "tax", 2.4);
```

- 리팩터링으로 필드명을 일급 값으로 만들었다. 전에는 필드명이 함수 이름에 암묵적으로 있었고 API로도 제공되지 않았다. 이제 암묵적인 이름은 인자로 넘길 수 있는 값(여기서는 문자열)이 되었다.
  - 값은 변수나 배열에 담을 수 있다. 그래서 일급(first-class)이라고 부른다.

## 일급인 것과 일급이 아닌 것을 구별하기

다른 언어를 사용해도 그렇고 JavaScript에는 일급이 아닌 것과 일급인 것이 섞여 있다.

- 일급으로 바꾸는 기술은 함수형 프로그래밍에서 중요하다.

### JavaScript에서 일급이 아닌 것

1. 수식 연산자
2. 반복문
3. 조건문
4. try/catch 블록

### 필드명을 문자열로 사용하면 안전하지 않을까?

- 문자열이라면 오타 등으로 문제가 생길 수 있다. 이 문제를 해결하기 위한 방법은 두 가지가 있다.
  - 컴파일 타임에 검사(TypeScript 활용)
  - 런타임에 검사

```js
const validItemFields = ["price", "quantity", "shipping", "tax"];

function setFieldByName(cart, name, field, value) {
	if (!validItemFields.includes(field)) throw "Not a valid item field: " + "'" + field + "'.";
}
```

- 필드가 일급이기 때문에 런타임에 확인하는 것은 쉽다.

### 예제

```js
function incrementQuantityByName(cart, name) {
	const item = cart[name];
	const quantity = item["quantity"];
	const newQuantity = quantity + 1;
	const newItem = objectSet(item, "quantity", newQuantity);
	const newCart = objectSet(cart, name, newItem);

	return newCart;
}

function incrementSizeByName(cart, name) {
	const item = cart[name];
	const size = item["size"];
	const newSize = size + 1;
	const newItem = objectSet(item, "size", newSize);
	const newCart = objectSet(cart, name, newItem);

	return newCart;
}
```

- 함수명에 있는 "quantity"와 "size"는 필드명이다. 암묵적 인자를 드러내기 리팩터링으로 개선시킬 수 있다.

```js
function incrementFieldByName(cart, name, field) {
	const item = cart[name];
	const value = item[field];
	const newValue = value + 1;
	const newCart = objectSet(cart, name, newItem);

	return newCart;
}
```

## 데이터 지향

데이터 지향(data orientation)은 이벤트와 엔티티에 대한 사실을 표현하기 위해 일반 데이터 구조를 사용하는 프로그래밍 형식이다.
위의 장바구니와 제품 엔티티는 매우 일반적이다. 장바구니와 제품 엔티티는 커스텀 API처럼 구체적인 것보다는 낮은 곳에 위치한다. 그래서 장바구니와 제품 엔티티에 일반적인 데이터 구조인 객체와 배열을 사용하는 것이다.

- 이런 일반적인 엔티티는 재사용할 수 있어야 하기 때문에 일반적인 형식인 객체와 배열처럼 일반적인 데이터 구조를 사용해야 한다.
- 데이터를 데이터 그대로 사용하는 것의 중요한 장점은 여러 가지 방법으로 해석할 수 있다는 점이다.
  - 제한된 API로 정의하면 데이터를 제대로 활용할 수 없다.
  - 데이터가 미래에 어떤 방법으로 해석될지 미리 알 수 없기 때문에 필요할 때 알맞은 방법으로 해석할 수 있어야 한다.

## 정적 타입 vs 동적 타입

많은 동적 타입 언어가 데이터 구조에 있는 필드를 문자열로 표현하고 전송한다. 오타나 잘못된 문자열로 인한 에러가 종종 발생하는 것도 맞다.

- 웹 서버는 명령어를 데이터베이스로 전달하기 위해 문자열로 직렬화해야 한다. 그리고 데이터베이스는 받은 명령어를 해석하고 실행한다. 역시 통신 과정에 있는 것은 문자열이다.
  - 데이터 형식에 타입이 있다고 해도 역시 바이트일 뿐이다. 여기에도 오타나 악의적인 의도로 잘못된 문자열을 넣을 수 있는 가능성은 많이 있따.
- API는 클라이언트에게 받은 데이터를 런타임에 체크해야 한다. 이것은 정적 타입 언어를 사용해도 마찬가지이다.

## 고차 함수

### 리팩터링 - 콜백으로 바꾸기

```js
function cookAndEatFoods() {
	for (let i = 0; i < foods.length; i++) {
		const food = foods[i];
		cook(food);
		eat(food);
	}
}

function cleanDishes() {
	for (let i = 0; i < dishes.length; i++) {
		const dish = dishes[i];
		wash(dish);
		dry(dish);
		putAway(dish);
	}
}
```

- 주목할 부분은 지역변수의 이름이 매우 구체적이라는 것이다.

```js
function operateOnArray(array, f) {
	for (let i = 0; i < array.length; i++) {
		const item = array[i];
		f(item);
	}
}

operateOnArray(foods, cookAndEat);
operateOnArray(foods, clean);
```

- 이 부분은 `forEach()`고차 함수를 이용할 수 있다.
- 고차 함수의 좋은 점은 코드를 추상화할 수 있다는 점이다.

## 함수 본문을 콜백으로 바꾸기

45000줄의 코드를 모두 try/catch로 감싸 에러 로깅 시스템을 적용해야 한다고 생각해보자. 중복된 코드가 굉장히 많을 것이다.

```js
// 원래 코드
try {
	saveUserData(user);
} catch (error) {
	logToSnapErrors(error);
}

// 함수로 빼낸 코드
function withLogging() {
	try {
		saveUserData(user);
	} catch (error) {
		logToSnapErrors(error);
	}
}
```

- 빼낸 함수에 이름을 붙였기 때문에 이제 이름으로 함수를 부를 수 있다.

```js
// 콜백으로 빼낸 코드
function withLogging(f) {
	try {
		f();
	} catch (error) {
		saveUserData(user);
	}
}

withLogging(function () {
	saveUserData(user);
}); // 본문을 전달한다.
```

- 위 코드는 함수를 정의하고 전달하는 일반적인 방법이다. 함수를 정의하는 방법에는 세 가지가 있다.

1. 전역으로 정의하기
2. 지역적으로 정의하기
3. 인라인으로 정의하기: 사용하는 곳에서 바로 정의 즉 익명 함수라고 한다.

### 왜 함수에 일반 데이터값으로 전달하지 않고 함수를 전달하나?

위 코드의 `saveUserData()` 함수에서 에러가 나면 어떻게 될까? `withLogging()`함수에 있는 `try/catch`가 처리해줄까?

- 함수로 전달하는 이유는 함수 안에 있는 코드가 특정한 문맥 안에서 실행돼야 하기 때문이다. 이 경우에 문맥은 `try/catch`라고 할 수 있다.
  - 고차 함수를 쓰면 다른 곳에 정의된 문맥에서 코드를 실행할 수 있다. 그리고 문맥은 함수이기 때문에 재사용 할 수 있다.

---

## Copy on write 리팩터링하기

```js
// 리팩터링 전
function arraySet(array, idx, value) {
	const copy = array.slice();
	copy[idx] = value;

	return copy;
}

// 리팩터링 후
function arraySet(array, idx, value) {
	return withArrayCopy(array, function (copy) {
		copy[idx] = value;
	});
}

function withArrayCopy(array, modify) {
	const copy = array.slice();
	modify(copy);

	return copy;
}
```

- 리팩터링으로 얻은 것
  - 표준화된 원칙
  - 새로운 동작에 원칙을 적용할 수 있음
  - 여러 개를 변경할 때 최적화
  - `withArrayCopy()`함수를 쓰면 최적화를 위해 복사본을 하나만 만들어 쓸 수 있다.

## 함수형 도구 체이닝

- 데이터 만들기
  - 함수형 도구는 배열 전체를 다룰 때 잘 동작한다. 배열 일부에 대해 동작하는 반복문이 있다면 배열 일부를 새로운 배열로 나눌 수 있다.
- 배열 전체를 다루기
- 작은 단계로 나누기
  - 알고리즘이 한 번에 너무 많은 일을 한다고 생각된다면 직관에 반하지만 두 개 이상의 단계로 나눠보라.
  - 단계를 더 만들면 더 쉬워진다.
- 유용한 함수로 추출하기
  - `map()`, `filter()`, `reduce()`는 함수형 도구의 전부가 아니다. 자주 사용하는 함수형 도구일 뿐이다.

```js
// 절차형
function shoesAndSocksInventory(products) {
	var inventory = 0;
	for (let p = 0; p < products.length; p++) {
		const product = products[p];
		if (product.type === "shoes" || product.type === "socks") {
			inventory += product.numberInventory;
		}
	}

	return inventory;
}

// 함수형으로 개선
function shoesAndSocksInventory(products) {
	const shoesAndSocks = filter(
		products,
		(product) => product.type === "shoes" || product.type === "socks"
	);
	const inventories = map(shoesAndSocks, (product) => product.numberInventory);

	return reduce(inventories, 0, plus);
}
```

### 체이닝 디버깅을 위한 팁

고차 함수를 사용하는 것은 매우 추상적이기 때문에 문제가 생겼을 때 이해하기 어려운 때도 있다.

- 구체적인 것을 유지하기
  - 데이터를 처리하는 과정에서 데이터가 어떻게 생겼는지 잊어버리기 쉽다. 파이프라인 단계가 많다면 더 잊어버리기 쉽다. 각 단계에서 어떤 것을 하고 있는지 알기 쉽게 이름을 잘 지어야 한다.
  - 의미를 기억하기 쉽게 이름을 붙이자
- 출력해보기
  - 정말 복잡한 체인이라면 한 번에 한 단계씩 추가해 결과를 확인하고 다음 단계를 추가하기
- 타입을 따라가 보기
  - 함수형 도구는 정확한 타입이 있다. JavaScript처럼 타입이 없는 언어를 사용해도 함수형 도구는 타입이 있다.

## 다양한 함수형 도구

`map()`, `filter()`그리고 `reduce()`가 가장 단순하고 많이 쓰는 도구이다. 함수형 도구 문서를 살펴보면 영감을 얻는 데 도움이 된다.

### `pluck()`

`map()`으로 특정 필드값을 가져오기 위해 콜백을 매번 작성하는 것은 번거롭다. `pluck()`을 사용하면 매번 작성하지 않아도 된다.

```js
function pluck(array, field) {
	return map(array, function (object) {
		return object[field];
	});
}

// 사용법
const prices = pluck(products, "price");

// 비슷한 도구
function invokeMap(array, method) {
	return map(array, function (object) {
		return object[method]();
	});
}
```

### `concat()`

`concat()`으로 배열 안에 배열을 뺄 수 있다. 중첩된 배열을 한 단계의 배열로 만든다.

### `frequenciesBy()와 groupBy()`

개수를 세거나 그룹화하는 일은 종종 쓸모가 있다. 이 함수는 객체 또는 맵을 리턴한다.

```js
function frequenciesBy(array, f) {
	const ret = {};
	forEach(array, function (element) {
		const key = f(element);
		if (ret[key]) ret[key] += 1;
		else ret[key] = 1;
	});

	return ret;
}

function groupBy(array, f) {
	const ret = {};
	forEach(array, function (element) {
		const key = f(element);
		if (ret[key]) ret[key].push(element);
		else ret[key] = [element];
	});

	return ret;
}
```

---

전형적으로 함수형 프로그래밍의 자격 요건에는 관계형 정의뿐 아니라 타입, 패턴 매치, 불변성, 순수성 같은 명확히 다른 자격 요건들도 들어간다. 각각의 특성이 함수형 프로그래밍 언어의 특정 부분을 설명할 수는 있지만 포괄적인 함수형 프로그래밍 언어를 대변할 수는 없다.

프로그램을 여러 구성 요소로 분해하고, 추상화된 함수를 이용해서 본래의 기능을 수행하도록 재조립하는 것이 함수형 프로그래밍이다.

## 메타프로그래밍

코드가 어떤 동작을 하도록 구현하는 것을 프로그래밍이라고 한다면 어떤 것이 해석되는 방식을 바꾸도록 코드를 구현하는 것을 메타프로그래밍이라고 한다.

---

## 중첩된 데이터에 함수형 도구 사용하기

```js
function doubleField(item, field) {
  const value = item[field];
  const newValue = value + 1;
  const newItem = objectSet(item, field, newValue);

  return newItem;
}
function decrementField(item, field) {...}
function doubleField(item, field) {...}
function halveField(item, field) {...} // 본문들 다 비슷한 함수를 가지고 있다.
```

- 이 함수들은 목적은 다르지만 대부분 비슷하다. `함수 이름에 있는 암묵적 인자` 냄새와 비슷하다. 각 함수 이름에는 **동작**이름이 있다.

```js
function update(item, field, modify) {
	const value = item[field];
	const newValue = modify(value);
	const newItem = objectSet(item, field, newValue);

	return newItem;
}

function incrementField(item, field) {
	return updateField(item, field, (value) => value + 1);
}
```

- 모든 동작을 고차 함수 하나로 합쳤다. 이제 바꾸고 싶은 필드와 동작을 콜백으로 전달할 수 있다.
- 이 함수는 `objectSet()`을 사용하기 때문에 카피-온-라이트 원칙을 따른다.

### 중첩된 객체라서 `update`함수를 여러번 사용해야 한다면?

```js
function updateX(object, keys, modify) {
	if (keys.length === 0) {
		return modify(object);
	}

	const key1 = keys[0];
	const restOfKeys = drop_first(keys);

	return update(object, key1, function (value) {
		return updateX(value1, restOfKeys, modify); // 재귀 호출
	});
}
```

- 재귀 호출을 사용하면 키 길이에 상관없이 사용할 수 있다.
- `updateX`보다 `nestedUpdate`라고 사용하는 것이 더 일반적일 수 있다.

## 깊이 중첩된 데이터에 추상화 벽 사용하기

주어진 ID로 블로그를 변경하는 함수가 있다고 생각해보자.

```js
function updatePostById(category, id, modifyPost) {
	return nestedUpdate(category, ["posts", id], modifyPost);
}
```

- `["posts", id]`로 분류의 구조 같은 구체적인 부분은 추상화 벽 뒤로 숨긴다.
- 블로그 글 구조에 대해서는 콜백에 맡긴다.

```js
function updateAuthor(post, modifyUser) {
	return update(post, "author", modifyUser);
}

function capitalizeName(user) {
	return update(user, "name", capitalize);
}
```

```js
updatePostById(blogCategory, "12", (post) => updateAuthor(post, capitalizeUserName));
```

## 타임라인 격리하기

### JavaScript의 단일 스레드

JavaScript의 스레드 모델은 타임라인이 자원을 공유하면서 생기는 문제를 줄여준다. 하나의 메인 스레드만 있어서 대부분의 액션을 하나의 박스로 표현할 수 있다.
하지만 비동기 콜백을 함께 사용한다면 문제가 생길 수 있다. 비동기 호출은 미래에 알 수 없는 시점에 런타임에 의해 실행된다.
