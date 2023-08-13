---
title: 함수형 프로그래밍 - 계층형 설계에 대해
tag: 함수형 프로그래밍, 쏙쏙 들어오는 함수형 코딩
description: 함수형 프로그래밍이 무엇인지, 불변성과 계층형 설계에 대해 정리한 글입니다.
date: 2023-08-01 16:01:34
---

<img src="https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791191600759.jpg" alt="book">
쏙쏙 들어오는 함수형 코딩을 읽고 정리한 글입니다.

## 함수형 프로그래밍이란?

1. 수학 함수를 사용하고 부수 효과를 피하는 것이 특징인 프로그래밍 패러다임
2. 부수 효과 없이 순수 함수만 사용하는 프로그래밍 스타일

## 액션과 계산, 데이터 구분하기

1. 액션
2. 계산
3. 데이터

액션은 호출하는 시점과 횟수에 의존한다.
많은 함수형 프로그래밍 기술과 개념은 코드를 애견과 계산, 데이터로 구분하는 것으로부터 시작한다.
계산: 실행 가능하나 데이터는 그렇지 않다.
데이터: 데이터는 정적이고 보이는 그대로이다. 데이터는 이벤트에 대한 사실이다.
계산은 실행하기 전까지 어떻게 동작할 지 알 수 없다.

- 일반적으로 액션 보다는 계산이 쓰기 쉽고 계산 보다는 데이터가 쓰기 쉽다.
- 함수형 프로그래머는 코드를 액션과 계산, 데이터로 구분한다. 핵심 개념.
- 액션은 실행 시점과 횟수에 의존하기 때문에 여전히 문제가 되지만, 코드 전체에 영향을 주지 않도록 격리시키면 된다.
  코드의 많은 부분을 액션에서 계산으로 옮기면 결과적으로 액션도 다루기 쉬워진다.

## 계산

- 계산은 반드시 입출력으로 이루어져야 하며, 같은 입력에 대해서는 항상 같은 출력값을 내놓아야 한다. 계산이 여러 번 실행되어도 외부 세계에 영향을 주지 않아야 한다.
- 계산 함수에 하나라도 액션이 존재한다면 그 함수는 액션이 된다.

## 암묵적 입력과 출력

- 함수 내의 전역 변수 사용은 암묵적 입력이라고 할 수 있다.
- 암묵적 입력과 출력은 인자와 리턴값으로 바꿔 없애는 것이 좋다.

## 불변성

JavaScript는 기본적으로 pass by reference 방식을 사용한다. 이것을 방지하기 위해 객체나 배열을 pass by value 형태로 변경하는 방식을 알아야 한다.

### Copy on write 원칙 세 단계

copy on write는 세 단계로 되어 있다. 각 단계를 구현하면 copy on write로 동작한다.

1. 복사본 만들기
2. 복사본 변경하기
3. 복사본 리턴하기

- copy on write는 **쓰기를 읽기로 바꾼다.**

#### Copy on write로 쓰기를 읽기로 바꾸기

```js
function add_element_last(array, elem) {
	const new_array = array.slice(); // 1. 복사본 만들기
	new_array.push(elem); // 2. 복사본 바꾸기

	return new_array; // 3. 복사본 리턴하기
}
```

#### 쓰기를 하면서 읽기도 하는 동작은 어떻게 해야 할까?

`shift()` 메서드가 좋은 예제이다. 이 메서드는 값을 바꾸는 동시에 배열 첫 번째 항목을 리턴한다. 즉 변경하면서 읽는 동작이다.

1. 읽기와 쓰기 함수로 각각 분리한다.

```js
function first_element(array) {
	return array[0];
}

function drop_first(array) {
	array.shift();
} // 인자로 들어온 값을 변경하는 "쓰기"이다. 이 함수를 copy on write로 변경해야 한다.

function drop_first(array) {
	const array_copy = array.slice();
	array_copy.shift();

	return array_copy;
}
```

2. 함수에서 값을 두 개 리턴한다.

```js
// 동작을 감싸기
function shift(array) {
	return array.shift();
}

// 읽으면서 쓰기도 하는 함수를 읽기 함수로 바꾸기
function shift(array) {
	const array_copy = array.slice();
	const first = array.copy.shift();

	return {
		first: first,
		array: array_copy
	};
}

// 다른 방법
function shift(array) {
	return {
		first: first_element(array),
		array: drop_first(array)
	};
}
```

### 바뀔 때마다 복사를 하면 비효율적인가?

일반적으로 불변 데이터 구조는 변경 가능한 데이터 구조보다 메모리를 더 많이 쓰고 느리다. 하지만 불변 데이터 구조를 사용하면서 대용량의 고성능 시스템을 구현하는 사례는 많이 있다.

- 언제든 최적화 가능
  - 애플리케이션을 개발할 때 예상하기 힘든 병목 지점이 항상 있다. 그래서 성능 개선을 할 때는 미리 최적화하지 말라고 한다.
  - 불변 데이터 구조를 사용하고 속도가 느린 부분이 있다면 그때 최적화하라.
- 가비지 콜렉터는 매우 빠르다.
- 생각보다 많이 복사하지 않는다.
  - 얕은 복사는 같은 메모리를 가리키는 참조에 대한 복사본을 만든다. 이것을 구조적 공유(structural sharing)라고 한다.
- 함수형 프로그래밍 언어에는 빠른 구현체가 있다.
  - 앞에서는 직접 불변 데이터 구조를 만들었지만 어떤 함수형 프로그래밍 언어에는 불변 데이터 구조를 지원한다.

### 객체에 대한 Copy on write

배열은 `slice()`메서드로 복사본을 만들 수 있다. 객체는 `Object.assign()`을 이용할 수 있다.

## 방어적 복사 defensive copy

- 방어적 복사는 원본이 바뀌는 것을 막아준다.
- 들어오고 나가는 데이터의 복사본을 만드는 것이 방어적 복사가 동작하는 방식이다.
- 대부분의 웹 기반 API는 암묵적으로 방어적 복사를 한다.
  - JSON 데이터가 API에 요청으로 들어왔다고 했을 때 클라이언트는 데이터를 인터넷을 통해 API로 보내려고 직렬화한다. 이때 JSON 데이터는 **깊은 복사본**이다. 서비스가 잘 동작한다면 JSON으로 응답한다. 이때 JSON도 역시 **깊은 복사본**이다.

```js
// 원래 코드
function add_item_to_cart(name, price) {
	const item = make_cart_item(name, price);
	const shopping_cart = add_item(shopping_cart, item);
	const total = calc_total(shopping_cart);
	set_cart_total_dom(total);
	update_shipping_icons(shopping_cart);
	update_tax_dom(total);

	black_friday_promotion(shopping_cart); // 이 함수는 인자로 받은 장바구니 값을 바꾼다.
}

// 데이터를 전달하기전에 복사하기
function add_item_to_cart(name, price) {
	const item = make_cart_item(name, price);
	const shopping_cart = add_item(shopping_cart, item);
	const total = calc_total(shopping_cart);
	set_cart_total_dom(total);
	update_shipping_icons(shopping_cart);
	update_tax_dom(total);

	const cart_copy = deepCopy(shopping_cart);
	black_friday_promotion(cart_copy); // 넘기기 전에 복사하여 복사한 값을 전달
}
```

- 이제 `black_friday_promotion()`함수에 결과를 받아야 한다. 복사본을 전달해 `black_friday_promotion()`함수가 변경한 `cart_copy`가 결괏값이다. 어떻게 해야 `cart_copy`를 안전하게 쓸 수 있을까?
- 나중에 `cart_copy`의 참조를 가진 `black_friday_promotion()`함수가 `cart_copy`값을 바꾼다면 어떻게 될까? 아마 **버그** 로 발견될 것이다. 이 문제를 해결하기 위해 **방어적 복사** 를 적용해야 한다.

```js
// 데이터를 전달하기 전후에 복사
function add_item_to_cart(name, price) {
	const item = make_cart_item(name, price);
	let shopping_cart = add_item(shopping_cart, item);
	const total = calc_total(shopping_cart);
	set_cart_total_dom(total);
	update_shipping_icons(shopping_cart);
	update_tax_dom(total);

	const cart_copy = deepCopy(shopping_cart);
	black_friday_promotion(cart_copy);
	shopping_cart = deepCopy(cart_copy); // 들어오는 데이터를 위한 복사
}
```

- 이것이 방어적 복사의 패턴이다. 복사할 때는 **깊은 복사** 를 해야 한다.

### 방어적 복사 규칙

- 데이터가 안전한 코드에서 나갈 때 복사하기

  - 변경 불가능한 데이터가 신뢰할 수 없는 코드로 나갈 때, 아래 단계로 원본 데이터를 보호할 수 있다.
    - 1. 불변성 데이터를 위한 깊은 복사본을 만든다.
    - 2. 신뢰할 수 없는 코드로 복사본을 전달한다.

- 안전한 코드로 데이터가 들어올 때 복사하기
  - 신뢰할 수 없는 코드에서 변경될 수도 있는 데이터가 들어온다면 다음 단계를 따른다.
  - 1. 변경될 수도 있는 데이터가 들어오면 바로 깊은 복사본을 만들어 안전한 코드로 전달한다.
  - 2. 복사본을 안전한 코드에서 사용한다.

## Copy on write와 방어적 복사 비교하기

|                | Copy on write                   | 방어적 복사                                     |
| -------------- | ------------------------------- | ----------------------------------------------- |
| 언제 쓰는가?   | 통제할 수 있는 데이터를 바꿀 때 | 신뢰할 수 없는 코드와 데이터를 주고받아야 할 때 |
| 어디서 쓰는가? | 안전지대 어디서나               | 안전지대의 경계에서 데이터가 오고 갈 때         |
| 복사 방식      | 얕은 복사                       | 깊은 복사                                       |
|                |                                 |                                                 |

---

## 계층형 설계

계층형 설계는 소프트웨어를 계층으로 구성하는 기술. 각 계층에 있는 함수는 바로 아래 계층에 있는 함수를 이용해 정의한다.

```js
        gets_free_shipping() cartTax()                         // 비즈니스 규칙 (각 계층의 목적)
                          ↓   ↓
remove_item_by_name() calc_total() add_item() setPriceByName() // 장바구니를 위한 동작들
              ↓                         ↓     |
          removeItems() add_element_last()   /                 // copy on write
                      ↓   ↓                 /
                    .slice()              ↲                    // 언어에서 지원하는 배열 관련 기능
```

- 패턴 1: 직접 구현
- 패턴 2: 추상화 벽
- 패턴 3: 작은 인터페이스
- 패턴 4: 편리한 계층

### 계층형 설계 패턴 1. 직접 구현

직접 구현 패턴을 적용하면 모두 같은 단계의 레벨을 사용해야 한다.

```js
  fucntion freeTieClip(cart) {
    let hasTie = false;
    let hasTieClip = false;

    for (let i = 0;i < cart.length; i++) {
      const item = cart[i];
      if (item.name === "tie") { // 넥타이가 있는지 확인
        hasTie = true;
      }

      if (item.name === "tie_clip") { // 넥타이가 있는지 확인
        hasTieClip = true;
      }
    }

    if (hasTie && !hasTieClip) {
      const tieClip = make_item("tie clip", 0);

      return add_item(cart, tieClip); // 넥타이 클립 추가
    }

    return cart;
  }
```

- 어렵지 않은 코드지만 많은 기능이 들어있다. 이 코드는 제대로 설계하지 않고 그냥 기능을 추가한 것. 배열로 되어 있는 장바구니에서 넥타이 클립을 추가하면서 문제를 바로 해결했다. 이렇게 코드를 바로 추가하면 유지보수하기 어렵다.
- `freeTieClip()` 함수가 알아야 할 필요가 없는 구체적인 내용을 담고 있다.
  - 마케팅 캠페인에 관련된 함수가 장바구니가 배열이라는 사실을 알아야 할까?

<img width="993" alt="pattern" src="https://github.com/h-alex2/imgaes/assets/84281505/d0291b8b-065c-4091-b231-4baf7316d28c">

- `make_item()` 함수와 `add_item()`함수는 직접 만든 함수이다. 그리고 반복문이나 배열 인덱스 참조 기능은 언어에서 제공하는 기능이다. 직접 만든 함수와 언어 기능은 추상화 수준이 다르다.
- 다이어그램으로 표현하면 위와 같다.
- 화살표가 서로 다른 계층을 가리키고 있기 때문에 함수가 여러 계층을 사용하고 있다는 것을 알 수 있다. 한 함수에서 서로 다른 추상화 단계를 사용하면 코드가 명확하지 않아 읽기 어렵다.
- 서로 다른 추상화 단계에 있는 기능을 사용하면 직접 구현 패턴이 아니다.

```js
for (let i = 0; i < cart.length; i++) {
	const item = cart[i];
	if (item.name === "tie") {
		// 넥타이가 있는지 확인
		hasTie = true;
	}

	if (item.name === "tie_clip") {
		// 넥타이가 있는지 확인
		hasTieClip = true;
	}
}
```

- 장바구니 안에 제품이 있는지 확인하는 함수가 있다면, 저수준의 반복문을 직접 쓰지 않았을 것이다. 저수준의 코드는 추출해야 할 가능성이 높다.

```js
function freeTieClip(cart) {
	const hasTie = isInCart(cart, "tie");
	const hasTieClip = isInCart(cart, "tie clip");

	if (hasTie && !hasTieClip) {
		const tieClip = make_item("tie clip", 0);

		return add_item(cart, tieClip); // 넥타이 클립 추가
	}

	return cart;
}

// 반복문을 추출해 새로운 함수 생성
function isInCart(cart, name) {
	for (let i = 0; i < cart.length; i++) {
		if (cart[i].name === name) {
			return true;
		}

		return false;
	}
}
```

<img width="809" alt="cart" src="https://github.com/h-alex2/imgaes/assets/84281505/945bc0a5-b4df-4c3d-b274-83f73ecbd231">

- 개선된 함수에서는 장바구니가 배열인지 몰라도 된다. `freeTieClip()`이 사용하는 모든 함수는 장바구니가 배열인지 몰라도 된다.
  - 장바구니가 배열인지 몰라도 된다는 것은 함수가 모두 비슷한 계층에 있다는 것을 의미한다. 이처럼 함수가 모두 비슷한 계층에 있다면 직접 구현했다고 할 수 있다.

### 같은 계층에 있는 함수는 같은 목적을 가져야 한다.

- 각 계층은 추상화 수준이 다르다. 그래서 어떤 계층에 있는 함수를 읽거나 고칠 때 낮은 수준의 구체적인 내용은 신경 쓰지 않아도 된다.

### 계층형 설계 패턴 2. 추상화 벽 abstraction barrier

추상화 벽은 여러 가지 문제를 해결한다. 그중 하나는 팀 간 책임을 명확하게 나누는 것이다.

- 추상화 벽은 세부 구현을 감춘 함수로 이루어진 계층이다. 추상화 벽에 있는 함수를 사용할 때는 구현을 전혀 몰라도 함수를 쓸 수 있다.
- 추상화 벽은 흔하게 사용하는 라이브러리나 API와 비슷하다.

<img width="1171" alt="wall" src="https://github.com/h-alex2/imgaes/assets/84281505/6bfd652e-19a8-4516-95ac-d6e29d37cffe">

- 이 예제에서 추상화 벽이 의미하는 것은 추상화 벽 위에 있는 함수가 데이터 구조를 몰라도 된다는 것을 말한다. 그래서 추상화 벽 위에 있는 함수를 사용하는 사람에게 구조가 **배열에서 객체로** 바뀌었다는 것을 알리지 않아도 된다.
- 추상화 벽을 가로지르는 화살표가 없다는 것이 중요하다.

#### 추상화 벽은 언제 사용하면 좋을까?

- 쉽게 구현을 바꾸기 위해
  - 구현에 대한 확신이 없는 경우 추상화 벽을 사용하면 구현을 간접적으로 사용할 수 있기 때문에 나중에 구현을 바꾸기 쉽다. 하지만 이런 장점은 때로는 독이 될 수 있다.
- 코드를 읽고 쓰기 쉽게 만들기 위해
- 팀 간에 조율해야 할 것을 줄이기 위해
- 주어진 문제에 집중하기 위해

### 계층형 설계 패턴 3. 작은 인터페이스

작은 인터페이스 패턴은 새로운 코드를 추가할 위치에 관한 것이다. 인터페이스를 최소화하면 하위 계층에 불필요한 기능이 쓸데없이 커지는 것을 막을 수 있다.

- 새로운 기능을 만들 때 하위 계층에 기능을 추가하거나 고치는 것보다 상위 계층에 만드는 것이 작은 인터페이스 패턴이라고 할 수 있다.
  - 작은 인터페이스 패턴을 사용하면 하위 계층을 고치지 않고 상위 계층에서 문제를 해결할 수 있다.

### 계층형 설계 패턴 4. 편리한 계층

앞에서 알아본 패턴 세 개는 계층을 구성하는 것에 관한 패턴이다. 세 개의 패턴은 가장 이상적인 계층 구성을 만드는 방법에 대해 설명하고 있다.

- 편리한 계층이라고 하는 패턴은, 다른 패턴과 다르게 조금 더 현실적이고 실용적인 측면을 다룬다.
- 편리한 계층 패턴은 언제 패턴을 적용하고 또 언제 멈춰야 하는지 실용적인 방법을 알려준다. 지금 편리한가? 만약 작업하는 코드가 편리하다고 느낀다면 설계는 조금 멈춰도 된다. 반복문은 감싸지 않고 그대로 두고 호출 화살표가 조금 길어지거나 계층이 다른 계층과 섞여도 그대로 둬라. 하지만 구체적인 것을 너무 많이 알아야 하거나, 코드가 지저분하다고 느껴진다면 다시 패턴을 적용해라.

### 가장 위에 있는 계층의 코드가 수정하기 쉽다.

함수는 그래프 위에서 멀어질수록 더 고치기 어렵다.

### 어떤 코드를 테스트 해야할까? -> 아래에 있는 코드

<img width="822" alt="test" src="https://github.com/h-alex2/imgaes/assets/84281505/5a48d8cc-70fb-43fd-bb00-6b7099a721ca">

- 2번째 계층의 2번째 함수를 테스트하면 해당 함수가 사용하는 함수들이 잘 동작하는지 확인할 수 있다.
- 만약 가장 아래의 함수를 테스트하면 해당 함수를 사용하는 함수는 더 믿고 쓸 수 있다.

<img width="1011" alt="test" src="https://github.com/h-alex2/imgaes/assets/84281505/113fa845-65c8-4cb4-a34c-6ff2c423088d">

- 테스트도 만들려면 시간이 걸리는 일이다. 그리고 일을 가능한 한 효율적으로 해야 한다. 위쪽에 있는 코드가 자주 바뀌면 해당 코드의 테스트 코드도 바뀐 행동에 맞게 고쳐줘야 한다. 하지만 아래쪽에 있는 코드는 자주 바뀌지 않기 때문에 테스트 코드도 자주 고칠 필요가 없다.
- 패턴을 사용하면 테스트 가능성에 맞춰 코드를 계층화할 수 있다. 하위 계층으로 코드를 추출하거나 상위 계층에 함수를 만드는 일은 테스트의 가치를 결정한다.
