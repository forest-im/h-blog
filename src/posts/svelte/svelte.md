---
title: Svelte
description: 하나의 경로로 이루어져있는 비선형 데이터 구조로 그래프의 일종이다.
tag: Svelte
date: 2023-01-28 19:43:40
published: false
---

- React, Vue와 유사하지만 스벨트는 런타임 시 애플리케이션 코드를 해석하는 대신 빌드 시 앱을 js로 변환한다. -> 프레임워크 추상화의 성능 비용을 지불하지 않으며 앱이 처음 로드될 때 패널티 발생 x
- 스벨트에서 애플리케이션은 하나 이상의 구성 요소로 구성됨

```js
<script>
  let src = '/tutorial/image.gif';
</script>

<img {src} alt="a man">
```

vite-plugin-svelte로 vite를 설정하는 스벨트킷을 사용하는 것이 좋음

```js
<script>
  let count = 0;
  $: doubled = count * 2;

  function handleClick() {
    count += 1;
  }
</script>

<button on:click={handleClick}>
  {count} doubled is {doubled}
</button>
```

---

문을 블록과 함께 그룹화할 수 있다.
임의의 명령문을 반응형으로 실행할 수도 있다.

스벨트의 반응성은 할당에 의해 트리거된다. 배열이나 객체를 변경하는 메서드는 자체적으로 업데이트를 트리거하지 않는다.
-> 자기 자신에게 할당하여 컴파일러에게 변경되었음을 알릴 수 있다.

```js
function addNumber() {
  numbers.push(numbers.length + 1);
  numbers = numbers;
}
```

업데이트된 변수는 할당의 왼쪽에 직접 나타나야 한다.

## 데이터 전달 - props 전달

## 조건문

```js
<script>
  let user = { loggedIn: false };

  function toggle() {
    user.loggedIn = !user.loggedIn;
  }
</script>

{#if user.loggedIn}
  <button on:click={toggle}>
    Log out
  </button>
{/if}

{#if !user.loggedIn}
  <button on:click={toggle}>
    Log in
  </button>
{/if}
```

### "#"

블록 오프닝 태그를 의미한다. `{#if}`

### /

블록 닫기 태그를 나타낸다. `{/if}`

### :

블록 연속 태그를 나타낸다. `{:else}`

```js
{#if user.loggedIn}
  <button on:click={toggle}>
    Log out
  </button>
{:else}
  <button on:click={toggle}>
    Log in
  </button>
{/if}
```

```js
{#if x > 10}
  <p>{x} is greater than 10</p>
{:else if 5 > x}
  <p>{x} is less than 5</p>
{:else}
  <p>{x} is between 5 and 10</p>
{/if}
```

## 목록 반복 -> each 블록 사용

```js
<script>
  let cats = [
    { id: 'J---aiyznGQ', name: 'Keyboard Cat' },
    { id: 'z_AbfPXTKms', name: 'Maru' },
    { id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
  ];
</script>

<h1>The Famous Cats of YouTube</h1>

<ul>
  {#each cats as cat}
    <li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}" rel="noreferrer">
      {cat.name}
    </a></li>
  {/each}
</ul>
```

- 표현식 cats은 배열 또는 유사배열일 수 있다. `each [...iterable]`을 사용하여 일반 이터러블을 반복할 수 있다.
- `each cats as { id, name }`

- 스벨트는 내부적으로 `Map`을 사용하므로 모든 객체를 키로 사용할 수 있다. 그러나 일반적으로 문자열이나 숫자를 사용하는 것이 더 안전하다. (api 서버에서 최신 데이터로 업데이트할 때 id가 참조 동등성 없이 지속됨을 의미하기 때문)

## login / await blocks

- 스벨트는 마크업에서 직접 promise의 값을 쉽게 기다릴 수 있음

```js
{#await promise}
<p>
  ...waiting
</p>
{:then number}
<p>
  The number is {number}
</p>
{:catch error}
<p>
  {error.message}
</p>
{/await}

// 또는

{#await promise then number}
  <p>the number is {number}</p>
{/await}
```

---

# 이벤트

- 이벤트 핸들러를 인라인으로 선언할 수도 있다.
- 일부 프레임워크에서는 특히 루프 내부에서 성능상의 이유로 인라인 이벤트 핸들러를 사용하지 않는 것이 좋지만 스벨트에서는 어떤 형식을 선택하든 컴파일러는 항상 올바른 작업을 수행함.

- DOM 이벤트 핸들러는 동작을 변경하는 수정자를 가질 수 있다.
- 수정자를 체이닝 할 수 있다.
  `on:click|once|capture={...}`

- preventDefaultevent.preventDefault()— 핸들러를 실행하기 전에 호출 합니다. 예를 들어 클라이언트 측 양식 처리에 유용합니다.
- stopPropagation— 호출 event.stopPropagation(), 다음 요소에 도달하는 이벤트 방지
- passive— 터치/휠 이벤트에서 스크롤 성능을 향상시킵니다(Svelte는 안전한 곳에 자동으로 추가합니다).
- nonpassive— 명시적으로 설정passive: false
- capture— 버블링 단계 대신 캡처 단계 에서 처리기를 실행합니다 ( MDN 문서 ).
- once— 핸들러가 처음 실행된 후 핸들러를 제거합니다.
- self— event.target이 요소 자체인 경우에만 핸들러를 트리거합니다.
- trustedevent.isTrusted— 인 경우 에만 핸들러를 트리거합니다 true. 즉, 이벤트가 사용자 작업에 의해 트리거되는 경우입니다.

## 이벤트 전달

컴포넌트는 이벤트를 전달할 수도 있다. 그렇게 하려면 이벤트 디스패처를 만들어야 한다.
createEventDispatche는 반드시 컴포넌트가 처음 인스턴스화 됐을 때 호출돼야 한다.
settimeout 콜백처럼 나중에 내부에서 호출할 수 없다. 이건 컴포넌트 인스턴스에 dispatch로 연결된다

```js
// App.svelte
<script>
  import Inner from './Inner.svelte';

  function handleMessage(event) {
    alert(event.detail.text);
  }
</script>

<Inner on:myevent={handleMessage}/>

// Inner.svelte
<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function sayHello() {
    dispatch('myevent', {
      text: 'Hello'
    })
  }
</script>

<button on:click={sayHello}>
  Click to say hello
</button>

```

## Event forwarding

- DOM 이벤트와 달리 컴포넌트 이벤트는 버블링 되지 않는다.
- 깊게 중첩된 일부 컴포넌트에서 이벤트를 수신하려면 중간 컴포넌트가 이벤트를 전달해야 한다.

```js
<script>
  import Inner from './Inner.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function forward(event) {
    dispatch('message', event.datail);
  }

</script>

<Inner on:message={forward(event)} />
```

- 하지만 작성해야 할 코드가 많아서 스벨트는 `<Inner on:message />` 이런 식으로 값이 없는 이벤트 지시문은 모든 message 이벤트 전달을 의미한다.
- 이벤트 전달은 DOM 이벤트에도 적용됨

## 바인딩 - bind

- 일반적으로 스벨트의 데이터 흐름은 하향식이다.
- 규칙을 어길 수도 있음 -> bind 사용

```
<script>
  let name = 'world';
</script>

<input bind:value={name}>

<h1>Hello {name}!</h1>
```

## DOM에서는 모든 것이 문자열이다.

```html
<script>
  let a = 1;
  let b = 2;
</script>

<label>
  <input type="number" bind:value="{a}" min="0" max="10" />
  <input type=range bind:value={a} min=0 max=10/ >
</label>

<label>
  <input type="number" bind:value="{b}" min="0" max="10" />
  <input type="range" bind:value="{b}" min="0" max="10" />
</label>

<p>{a} + {b} = {a + b}</p>
```

- input type number는 숫자 입력을 처리할 때 도움이 x
- bind:value 하면 스벨트가 처리함

## group input

- 동일한 값과 관련된 여러 입력이 있는 경우 `bind:group`과 함께 사용할 수 있다.

- `	import { onMount } from 'svelte';`

- 모든 구성 요소에는 생성될 때 시작되고 소멸될 때 끝나는 수명 주기가 있다.

---

# 라이프 사이클

## onMount

- 구성 요소가 먼저 DOM에 렌더링된 후에 실행되는 것

- fetch는 onMount안에 넣는 걸 추천함 (script top level보다) 이유는 서버사이드 렌더링 중에 실행되지 않아서(onDestroy 제외하고)
- 라이프사이클 함수는 ssr중에 실행되지 않는다. 컴포넌트가 DOM에 마운트된 후 느리게 로드되어야 하는 데이터를 가져오는 것을 피할 수 있따.
- setTimeout에서가 아니라 구성 요소 인스턴스에 바인딩되도록 구성 요소가 초기화되는 동안 수명주기 함수를 호출해야 한다.
- 콜백이 함수를 반환하는 경우 컴포넌트가 소멸될 때 해당 함수가 호출된다.

## onDestroy

- 컴포넌트가 소멸될 때 코드 실행
- 인터벌 같은 것 정리해줄 때 씀

```js
import { onDestroy } from "svelte";

export function onInterval(callback, milliseconds) {
  const interval = setInterval(callback, milliseconds);

  onDestroy(() => {
    clearInterval(interval);
  });
}
```

## beforeUpdate, afterUpdate

- beforeUpdate: DOM이 업데이트되기 직전에 작업이 수행되도록 예약한다.
- afterUpdate: DOM이 데이터와 동기화되면 코드를 실행하는 데 사용된다.

## tick

- tick 함수는 구성 요소가 처음 초기화될 때만이 아니라 언제든지 호출할 수 있다는 점에서 다른 수명 주기 함수랑 다르다. 보류 중인 상태 변경이 DOM에 적용되는 즉시(또는 보류 중인 상태 변경이 없는 경우 즉시) 해결되는 promise를 반환한다.
  tick을 통해 돔 업데이트를 보장해줄때까지 기다린다. 그리고 그 다음이 실행된다.

스벨트에서 구성 요소 상태를 업데이트하면 돔이 즉시 업데이트되지 않는다. 다른 컴포넌트를 포함하여 적용해야 하는 다른 변경 사항이 있는지 확인하기 위해 다음 마이크로 작업까지 기다린다. -> 그렇게 하면 불필요한 작업을 피하고 브라우저가 작업을 보다 효과적으로 처리..
-> 태스크를 완료하고 나서 화면이 갱신되도록 되어 있듬

asdflasdjflaskjflsa

## Store
asldfjalsdkjf