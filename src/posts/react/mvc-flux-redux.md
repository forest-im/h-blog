---
title: MVC vs Flux vs Redux
tag: Redux, MVC, Flux
date: 2023-01-23 10:25:57
---

## MVC 패턴

- 3계층 개발 아키텍처
- MVC 패턴은 어떤 action이 발생하면 데이터 상태가 변경되고 그에 따라 디스플레이를 변경하는데 상태가 변경되었다는 정보를 View와 Model이 서로 양방향으로 주고받는 형태이다.

<div class="table-wrapper">

| 이름       | 기능                                                               |
| ---------- | ------------------------------------------------------------------ |
| Model      | 앱의 데이터를 관리해주는 부분                                      |
| View       | 앱이 사용자에게 어떻게 보여주는지에 대한 관리                      |
| Controller | Model의 자료와 View의 인터렉션을 총괄하는 어플리케이션 로직을 관리 |

</div>

### MVC 패턴 단점

![mvc](https://velog.velcdn.com/images%2Faeong98%2Fpost%2F2c86077a-0a05-4302-86a6-e0d692b32299%2Fimage.png)
MVC 패턴이 대규모 프로젝트에서는 관리하기 어렵다고 느끼기 시작, 프로젝트 규모가 커지면 데이터 자료의 양과 화면이 많아지면서 Model과 View가 급격히 늘어나고 그에 따라 각각의 모듈들이 어떤 식으로 연결되었는지 파악하기가 매우 어려워진다.

## Flux 패턴

![flux](https://www.clariontech.com/hs-fs/hubfs/Image2-61.png?width=513&name=Image2-61.png)

- Flux 패턴은 action이 발생하면 `dispatcher`에 의해 `store`에 변경된 사항이 저장되고 그 저장된 사항에 의해 `view`가 변경되는 단방향 패턴을 보인다.
- MVC 패턴의 대안으로 출시되었다. (Facebook 개발 팀에 의해)

- Store/Stores: 앱 상태 및 로직의 컨테이너 역할을 한다.
- Action: 디스패처에 데이터 전달을 활성화한다.
- View: MVC 아키텍처의 보기와 동일하지만 리액트 컴포넌트 컨텍스트 안에서
- Dispatcher: 액션을 관리하고 스토어를 업데이트

- 유저가 어떤 것을 클릭하면 `view`는 `actions`를 만들고, `Action`은 새로운 데이터를 만들고 `dispatcher`에 보낸다. `dispatcher`는 `action` 결과를 적절한 `store`로 디스패치 한다. `store`는 결과에 따라 `state`를 업데이트하고 view를 업데이트한다.

## Redux

![redux-architecture](https://www.clariontech.com/hs-fs/hubfs/Image3-43.png?width=417&name=Image3-43.png)

- Redux는 Flux로부터 영감을 얻음. Flux와 달리 Redux에는 디스패처라는 개념이 존재하지 않음

- Redux는 Flux의 아이디어를 구현하지만 완전히 다른 방식으로 구현하는 라이브러리.
- Reducer: 데이터 변경이 순수 함수에 존재하는 방식을 결정하는 논리
- Centralized Store: 전체 앱의 상태를 나타내는 state obj를 보관한다.

- Redux 아키텍처에서 애플리케이션 이벤트는 순수 함수인 `Reducer`에 전달되는 `Action`으로 표시된다. 그런 다음 `Reducer`는 수신하는 이벤트의 종류에 따라 새로운 데이터로 중앙 집중식 `Store`를 업데이트 한다. `Store`는 새로운 상태를 생성하고 `View`에 업데이트를 보낸다. 당시 업데이트를 반영하기 위해 `View`가 다시 생성되었음

## MVC Flux Redux의 데이터 흐름 방향

<div class="table-wrapper">

| 특징                        | MVC                                   | Flux                            | Redux                              |
| --------------------------- | ------------------------------------- | ------------------------------- | ---------------------------------- |
| 데이터 흐름 방향            | 양방향                                | 단방향                          | 단방향                             |
| Single or Multiple Stores   | store가 없음                          | Includes multiple stores        | Includes single store              |
| 비즈니스 로직은 어디있는가? | Controller                            | Store                           | Reducer                            |
| 디버깅은 어떻게 처리되는가? | 양방향 흐름으로 디버깅이 어렵다.      | Dispatcher로 간단한 디버깅 보장 | single Store로 디버깅이 훨씬 쉽다. |
| 어디에서 사용할 수 있는가?  | 클라이언트 및 서버 측 프레임워크 모두 | 클라이언트 측 프레임워크 지원   | 클라이언트 측 프레임워크 지원      |

</div>

- Flux 및 Redux는 깨끗한 데이터 흐름 아키텍처를 보장하기 위해 양방향 흐름을 권장하지 않는다. 단방향 접근 방식의 중요한 이점은 데이터가 애플리케이션을 통해 단일 방향으로 흐르기 때문에 데이터를 더 잘 제어할 수 있다는 것이다.
- Flux는 Stores를 사용하여 데이터 또는 `state`와 관련된 모든 애플리케이션을 캐시하는 반면 MVC 모델은 single object를 모델링하려고 시도한다. MVC에는 `Store`의 개념이 없다. Flux의 `Store`는 MVC의 모델과 비슷하지만 단일 데이터베이스 레코드를 나타내는 대신 여러 obj의 `state`를 처리한다.
- Flux와 Redux의 주요 차이점은 Flux는 앱당 여러 `Store`를 포함하지만 Redux는 앱당 단일 `Store`를 포함한다는 것이다. 애플리케이션 전반에 걸쳐 여러 `Store`에 상태 정보를 배치하는 대신 Redux는 모든 것을 앱의 한 영역에 유지한다. -> 단일 중앙 집중식 스토어
- MVC에서 컨트롤러는 애플리케이션의 데이터와 상태를 모두 처리할 책임이 있다. 요청의 초기 처리를 담당하지만 **비즈니스 결정은 모델 내에서 이루어져야 한다.**
- Flux 앱의 `Store`는 공개적으로 노출할 데이터 부분을 결정할 수 있는 유연성도 가지고 있다. 반면에 Redux에서는 논리가 `reducer` 함수에 남아 있어 이전 `state`와 하나의 `action`을 받은 다음 새로운 `state`를 return 한다.
- Flux에는 싱글톤 디스패처가 포함되어 있으며 모든 작업은 해당 디스패처를 통과한다.

> 출처
> [MVC vs Flux vs Redux – The Real Differences](https://www.clariontech.com/blog/mvc-vs-flux-vs-redux-the-real-differences)
