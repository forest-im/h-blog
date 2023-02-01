---
title: Presentational and Container Components
tag: Redux, React
date: 2023-01-23 10:25:57
---

[React Redux :: React Redux 입문 (Provider, Connect, mapStateToProps, mapDispatchToProps)](https://velog.io/@iamhayoung/React-Redux-React-Redux-%EC%9E%85%EB%AC%B8-Provider-Connect-mapStateToProps-mapDispatchToProps)

[Presentational and Container Components (번역)](https://medium.com/@seungha_kim_IT/presentational-and-container-components-%EB%B2%88%EC%97%AD-1b1fb2e36afb)

[복잡하고 어려운 Redux 적응기](https://tech.osci.kr/2022/06/29/%EB%B3%B5%EC%9E%A1%ED%95%98%EA%B3%A0-%EC%96%B4%EB%A0%A4%EC%9A%B4-redux-%EC%A0%81%EC%9D%91%EA%B8%B0/)

[Flux로의 카툰 안내서](https://bestalign.github.io/translation/cartoon-guide-to-flux/)

[관용적 Redux: React-Redux의 역사와 구현](https://blog.isquaredsoftware.com/2018/11/react-redux-history-implementation/)

https://github.com/minsgy/minesweeper_web_game

| 프레젠테이션 컴포넌트                                            | 컨테이너 컴포넌트                                                |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| 어떻게 보여지는가와 관련                                         | 어떻게 동작하는가와 관련                                         |
| 프레젠테이션 컴포넌트, 컨테이너 컴포넌트 모두 자식이 될 수 있다. | 프레젠테이션 컴포넌트, 컨테이너 컴포넌트 모두 자식이 될 수 있다. |
| DOM 마크업이나 스타일 시트를 포함한다.                           | DOM 마크업이나 스타일 시트가 없다.                               |
| 액션, store 등에 의존적이지 않다.                                | 액션을 호출한다.                                                 |
| 데이터 가져오기, 변경 등에 관여하지 않는다.                      | 상태가 자주 변경된다.                                            |
| props를 통해 배타적으로 콜백함수나 데이터를 받는다.              |                                                                  |

## Presentational

- 어떻게 보여질지를 책임집니다.
- 내부에 presentational 컴포넌트와 container 컴포넌트\*\* 모두를 가질 수 있고, 대개 DOM 마크업과 자체 스타일을 가지고 - 있습니다.
- this.props.children을 통해 다른 컴포넌트를 포함하게끔 만들 수 있습니다.
- 어플리케이션의 나머지 부분에 대해 아무런 의존성을 가지지 않습니다. (예를 들면 Flux 액션이나 스토어 등)
- 데이터를 불러오거나 변경하는 작업은 여기에 작성되지 않습니다.
- 데이터 및 데이터와 관련된 콜백은 props를 통해서 받기만 합니다. (데이터가 아닌) UI 상태를 관리하기 위해 state를 갖는 경우가 있습니다.
- state, 라이프사이클 훅, 성능 최적화가 필요없는 경우라면 함수형 컴포넌트로 작성됩니다.
- 예시: Page, Sidebar, Story, UserInfo, List.
- 이 컴포넌트들은 모두 외양을 담당하지만 데이터가 어디에서 온 것인지, 또 어떻게 데이터를 변경해야 하는지는 알지 못합니다. 그저 주어진 것을 표시해줄 뿐이죠. 만약 Redux를 쓰다가 Redux 대신 다른 무언가를 쓰게 된다면, 이 모든 컴포넌트들을 그대로 유지할 수 있습니다. Redux에 대한 의존성이 없기 때문입니다.

## container

- 어떻게 동작해야 할지를 책임집니다.
- 내부에 presentational 컴포넌트와 container 컴포넌트\*\* 모두를 가질 수 있지만, 대개 (전체를 감싸는 div를 제외하면) 자체적인 DOM 마크업이나 스타일을 갖고 있지 않습니다.
- 데이터 및 데이터와 관련된 동작을 다른 presentational 컴포넌트와 container 컴포넌트에게 제공합니다.
- Flux 액션을 호출하는 작업을 여기에 작성하며, 이 콜백들을 다른 presentational 컴포넌트에 넘겨줍니다.
- 주로 데이터 저장소로 활용되며 state를 갖고 있는 경우가 많습니다.
- 직접 작성되기 보다는 higher order components로부터 생성되는 경우가 많습니다. (React Redux의 connect(), Relay의 - createContainer(),Flux Utils의 Container.create())
- 예시: UserPage, FollowersSidebar, StoryContainer, FollowedUserList.

### 이러한 접근 방식의 이점

- 관심사의 분리를 더 잘할 수 있습니다. 이 방식으로 컴포넌트를 작성하면 여러분의 앱과 UI를 이해하기 쉽게 만들 수 있습니다.
- 재사용성을 높일 수 있습니다. 완전히 다른 곳으로부터 온 여러 상태라 할지라도, 이를 표현하기 위해 같은 presentational 컴포넌트를 - 사용할 수 있습니다. 이 때 각 상태를 나타내는 container 컴포넌트를 만들어 이를 또 재사용할 수 있습니다.
- Presentational 컴포넌트는 말하자면 앱의 “팔레트" 역할을 합니다. 이 컴포넌트들을 데모 페이지에 넣어두고, 디자이너에게 디자인 - 세부사항을 수정하는 작업을 맡길 수 있습니다. 디자이너는 앱의 로직을 건드릴 필요가 없습니다. 또한 데모 페이지에 대해 스크린샷 회귀 - 테스트를 수행할 수도 있습니다.
- 이 패턴을 제대로 적용하려면 “레이아웃 컴포넌트"를 추출해야 합니다. 레이아웃 컴포넌트를 추출하면, 똑같은 레이아웃 마크업을 여러 - container 컴포넌트에 작성하는 작업을 피할 수 있습니다.

## connect

connect 함수는 리액트 앱의 하위 컴포넌트에서 redux store를 접근하는 것을 가능하게 해주는 역할을 한다. 이 함수를 이용해서 컴포넌트 단에서 redux store에 접근하고 액션을 호출할 수 있게 된다.

## Redux 3가지 원칙

1. 진실은 하나의 소스로부터

- 애플리케이션의 모든 상태는 하나의 스토어 안에 하나의 객체 트리 구조로 저장된다.

2. 상태는 읽기 전용이다.

- 상태를 변화시키는 유일한 방법은 무슨일이 벌어지는 지를 묘사하는 액션 객체를 전달하는 방법뿐이다.
  - 이를 통해서 뷰나 네트워크 콜백에서 결코 상태를 바꾸지 못 한다는 것을 보장할 수 있다.
  - 액션은 그저 평범한 객체이다. 따라서 기록을 남길 수 있고, 시리얼라이즈할 수 있고 저장할 수 있고 이후에 테스트나 디버깅을 위해서 재현하는 것도 가능하다.

3. 변화는 순수 함수로 작성되어야한다.

- 액션에 의해 상태 트리가 어떻게 변화하는지를 저장하기 위해 프로그래머는 순수 리듀서를 작성해야한다.
- 리듀서는 그저 이전 상태와 액션을 받아 다음 상태를 반환하는 순수 함수이다. 이전 상태를 변경하는 대신 새로운 상태 객체를 생성해서 반환해야한다는 사실을 기억해야 한다.

## Action

액션은 애플리케이션에서 스토어로 보내는 데이터 묶음. 이들이 스토어의 유일한 정보원이 된다. store.dispatch()를 통해 이들을 보낼 수 있다.

- 액션은 평범한 자바스크립트 객체이다. 액션은 반드시 어떤 형태의 액션이 실행될지 나타내는 type 속성을 가져야 한다. 타입은 일반적으로 문자열 상수로 정의된다.
- 데이터를 어떻게 변경하려는 건지 기술할 유일한 방법

## 액션 생산자

- 액션 생산자는 액션을 만드는 함수이다.
- 전통적인 Flux 구현에서 액션 생산자는 보통 불러와졌을 때 액션을 보낸다.
- 액션 객체를 액션을 보내는 곳에서 만드는 대신 이를 만들어주는 함수를 만드는 것이 또 다른 일반적인 규칙이다.

- 액션 생산자는 보일러플레이트라고 비판받기도 한다. 이들을 반드시 작성할 필요는 없음. 프로젝트에서 그게 더 적당하다고 생각하는 부분에는 객체 리터럴을 사용할 수 있다.

```js
function addTodoWithDispatch(text) {
	const action = {
		type: ADD_TODO,
		text
	};
	dispatch(action);
}
```

이와는 대비되게 Redux의 액션 생성자는 단지 액션을 반환한다.

```js
function addTodo(text) {
	return {
		type: ADD_TODO,
		text
	};
}
```

이는 액션 생산자를 더 이식하기 좋고 테스트하기 쉽게 한다. 실제로 액션을 보내려면 결과값을 `dispatch()`함수에 넘긴다.

---

## Reducer

- 액션은 무언가 일어난다는 사실을 기술하지만, 그 결과 애플리케이션의 상태가 어떻게 바뀌는지는 특정하지 않는다. 이건 리듀서가 할 일
- 리듀서는 이전 상태와 액션을 받아서 다음 상태를 반환하는 순수 함수

### 절대로 Reducer에서 하지 말아야 할 것들

- 인수들을 변경하기(mutate)
- API 호출이나 라우팅 전환같은 사이드 이펙트를 일으키기
- `Date.now()`나 `Math.random()` 같이 순수하지 않은 함수를 호출하기

## Store

- 애플리케이션의 상태를 저장하고
- `getState()`를 통해 상태에 접근하게 하고,
- `dispatch(action)`를 통해 상태를 수정할 수 있게 하고,
- `subscribe(listener)`를 통해 리스너를 등록한다.
- Redux앱에서는 단 하나의 스토어만 가질 수 있다.
  - 만약 데이터를 다루는 로직을 쪼개고 싶으면 여러 개의 스토어 대신 리듀서 조합을 사용할 수 있다.

## connect

connect는 react redux가 제공해주는 것

[Container 컴포넌트 구현하기](https://lunit.gitbook.io/redux-in-korean/basics/usagewithreact#container-1)
connect()를 사용하려면, mapStateToProps라 불리는 특별한 함수를 정의해야 합니다. 이 함수에는 현재 Redux 스토어의 상태를 어떻게 변형할지, 그리고 어떤 속성을 통해 presentational 컴포넌트로 넘겨줄 지를 서술하면 됩니다. 예를 들어, VisibleTodoList 컴포넌트는 todos를 필터링해서 TodoList에 넘겨주어야 하기 때문에, state.visibilityFilter에 따라 state.todos를 필터링하는 함수를 작성하고 이 함수를 mapStateToProps로서 사용할 수 있습니다:

```js
import { connect } from 'react-redux';

class myContainer extends Component {}

function mapStateToProps(state) {
	// You return what it will show up as props of myContainer
	return {
		property: this.state.property
	};
}

function mapDispatchToProps(dispatch) {
	// Whenever property is called, it should be passed to all reducers
	return bindActionCreators({ property: property }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(myContainer);
```

```js
https://daveceddia.com/redux-mapdispatchtoprops-object-form/
const mapDispatchToProps = {
decrement,
increment: () => increment(42),
reset
};
```

## mapStateToPropsRedux

mapStateToPropsRedux에서 상태 조각을 뽑아 React 구성 요소가 사용할 소품에 할당하는 기능입니다.

## Provider

저희가 권장하는 방법은 React Redux가 제공하는 특별한 컴포넌트인 `<Provider>`를 사용하는 것입니다. 이 컴포넌트는 명시적으로 스토어를 넘겨주지 않더라도 마법처럼 모든 container 컴포넌트에서 스토어를 사용할 수 있도록 해줍니다. 이 컴포넌트는 최상단 컴포넌트를 렌더링할 때 한 번만 사용해주면 됩니다.

## React Redux

---
