---
title: Next.js 공식문서 정리 - Data Fetching
tag: fetch
date: 2023-07-24 11:59:28
---

Next.js 공식홈페이지를 볼 때 `fetch`를 사용하는 것을 많이 봤지만 이 부분을 정리하지 않고 넘어간 것 같아 정리해본다.
아직 전체적으로 보지 못하고 필요한 부분만 찾아봤더니 이런 실수를 했다.

과제 등 내 실력을 보여줘야 하는 중요한 자리에서는 완벽히 이해하지 않은 프레임워크 또는 신버전을 사용하는 것은 위험 요소가 큰 것 같다. 공부할 때 제대로 공부하고 정리하도록 하자.

---

Next.js 공식 문서 [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching)를 보고 간략하게 정리한 글입니다.

## Next.js fetch

> Next.js 앱 라우터를 사용하면 함수를 비동기로 표시하고 프로미스에 대해 await을 사용하여 React 컴포넌트에서 직접 데이터를 가져올 수 있습니다. 데이터 불러오기는 fetch() 웹 API와 React 서버 컴포넌트 위에 구축됩니다. fetch()를 사용할 때 요청은 기본적으로 자동으로 중복 제거됩니다. Next.js는 각 요청이 자체 캐싱 및 재검증을 설정할 수 있도록 fetch 옵션 객체를 확장합니다. [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching)

Next.js 자체에서 **fetch 옵션 객체를 확장**하여 캐싱 처리를 적용하기 때문에 Next.js에서는 fetch를 사용하는 것이 좋다.

```js
async function getComments() {
	const res = await fetch("https://..."); // The result is cached
	return res.json();
}

// This function is called twice, but the result is only fetched once
const comments = await getComments(); // cache MISS

// The second call could be anywhere in your application
const comments = await getComments(); // cache HIT
```

- 동일한 요청을 두 번 하면 두 번째 요청은 첫 번째 요청의 결과를 재사용한다.

```js
export default async function Page() {
	// 최대 10초마다 이 데이터의 유효성을 재확인한다.
	const res = await fetch("https://...", { next: { revalidate: 10 } });
	const data = res.json();
	// ...
}
```

## `use` Hook (정식 X)

> `use` Hook을 소개합니다. await과 마찬가지로 use는 프로미스의 값을 언래핑하지만 클라이언트를 포함한 일반 컴포넌트 및 Hook 내부에서 사용할 수 있습니다. async/await와 거의 동일한 프로그래밍 모델을 제공하면서 일반(비동기) 함수 구성 요소 및 Hooks 내부에서 계속 작동하도록 설계되었습니다. JavaScript의 비동기 함수와 유사하게 에 대한 런타임은 일시 use중지 및 재개할 내부 상태 머신을 유지합니다. 출처: [rfcs - 0000-first-class-support-for-promises](https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md#usepromise)

`use`는 React의 새로운 함수라고 한다. 원래는 서버 컴포넌트, 클라이언트 컴포넌트 및 공유 컴포넌트에서 데이터에 액세스하기 위해 일관된 API를 원했다고 한다. 하지만 다른 기술적인 이유로 클라이언트 컴포넌트에서 `async/await`을 지원할 수 없어 만들어진 hook인 것 같다. 이름도 확정된 것 같지 않고.. 아직 많은 개선사항이 있는 것 같다.

다음과 같은 역할을 한다.

- `await`과 개념적으로 유사한 프로미스를 수락하는 함수 즉 **wrapper**이다.
- `async/await`과 거의 동일한 프로그래밍 모델을 제공하면서 Hooks 내부에서 계속 작동하도록 설계됨
- 컴포넌트, 후크 및 Suspense와 호환되는 방식으로 함수가 반환한 프로미스를 처리한다.

```js
function Note({ id }) {
	// 이것은 비동기적으로 노트를 가져오지만, 컴포넌트 작성자에게는
	// 동기식 작업처럼 보입니다.

	const note = use(fetchNote(id));
	return (
		<div>
			<h1>{note.title}</h1>
			<section>{note.body}</section>
		</div>
	);
}
```

현재는 아직 개발 단계에 있는 것 같고 권장되지는 않는다고 한다. (클라이언트에서 fetching하는 경우 SWR, React Query를 권장한다.)

## 정적 데이터 가져오기

기본적으로, `fetch`는 데이터를 자동으로 가져와서 무기한(indefinitely) 캐시한다.

## 데이터 가져오기 패턴

### 병렬 데이터 가져오기

- 클라이언트-서버 waterfall을 최소화하기 위해서는 밑과 같은 패턴을 사용해 데이터를 병렬로 가져오는 것이 좋다.

```js
import Albums from "./albums";

async function getArtist(username: string) {
	const res = await fetch(`https://api.example.com/artist/${username}`);
	return res.json();
}

async function getArtistAlbums(username: string) {
	const res = await fetch(`https://api.example.com/artist/${username}/albums`);
	return res.json();
}

export default async function Page({ params: { username } }: { params: { username: string } }) {
	// 두 요청을 동시에 시작하기
	const artistData = getArtist(username);
	const albumsData = getArtistAlbums(username);

	// promise가 해결될 때까지 기다리기
	const [artist, albums] = await Promise.all([artistData, albumsData]);

	return (
		<>
			<h1>{artist.name}</h1>
			<Albums list={albums}></Albums>
		</>
	);
}
```

- 두 요청을 병렬로 시작하면 시간을 절약할 수 있지만 사용자는 두 promise가 해결될 때까지 렌더링된 결과를 볼 수 없다. 즉 어떤 것 하나가 먼저 끝나더라도 모든 요청이 끝날 때 까지 기다려야 한다. 이를 개선하기 위해 `Suspense`를 추가하여 렌더링 작업을 중단하고 가능한 한 빨리 결과의 일부를 표시할 수 있다.
- 더 개선하기 위해서 [Preload pattern with cache()](https://nextjs.org/docs/app/building-your-application/data-fetching/caching#preload-pattern-with-cache)를 적용할 수 있음

## 순차적 데이터 가져오기

- 데이터를 순차적으로 가져오려면 데이터가 필요한 컴포넌트 내부에서 직접 가져오거나 데이터가 필요한 컴포넌트 내부에서 fetch 결과를 `await`할 수 있다.
- 컴포넌트 내부에서 데이터를 fetching하면 경로의 각 fetch 요청과 중첩된 세그먼트는 이전 요청이나 세그먼트가 완료될 때까지 데이터 fetching 및 렌더링을 시작할 수 없다.

## Route에서 렌더링 차단

- layout에서 데이터를 fetching하면 그 아래의 모든 경로 세그먼트에 대한 렌더링은 데이터 로딩이 완료된 후에만 시작할 수 있다.
- 페이지 디렉토리에서 서버 렌더링을 사용하는 페이지는 `getServerSideProps`가 완료될 때까지 브라우저 로딩 스피너를 표시한 다음 해당 페이지에 대한 React 컴포넌트를 렌더링한다. 페이지에 대한 전체 데이터를 가져올 수도 있고, 아무것도 가져올 수 없다.

### `app` 디렉토리에서 탐색할 수 있는 추가 옵션

- `loading.js`를 사용하여 데이터 불러오기 함수에서 결과를 스트리밍하는 동안 서버에서 즉시 로딩 상태를 표시할 수 있다.
- 컴포넌트 트리에서 데이터 불러오기를 아래로 이동하여 페이지에서 필요한 부분의 렌더링만 차단할 수 있다.

가능하면 데이터를 사용하는 세그먼트에서 데이터를 가져오는 것이 가장 좋다. 이렇게 하면 페이지 전체가 아닌 로딩 중인 부분만 로딩 상태를 표시할 수 있다.

## `fetch()`없이 데이터 fetching하기

- `fetch`를 사용할 수 없지만 레이아웃이나 페이지의 캐싱 또는 재검증 동작을 제어하려는 경우 세그먼트의 기본 캐싱 동작을 사용하거나 세그먼트 캐싱 구성을 사용할 수 있다.

### `cache()` 사용하기

- `fetch()`를 사용하지 않고 데이터 캐싱 동작을 적용하기 위해서 `cache` wrapper를 사용할 수 있다.

```js
// On getSome.js

export const getSome = cache(async () => {
	const res = await axios.get("https://...", otherAxiosConfigObject);
	const data = res.json();
	return data;
});

// On Page (or component)

export const revalidate = 10; //revalidate every 10 seconds

export default async function Page() {
	const someData = await getSome();
}
```
