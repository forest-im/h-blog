---
title: 지뢰찾기 만들기
tag: React, class component
date: 2023-01-22 18:45:38
---

## 이 프로젝트를 통해 배워야할 것

- 왜 redux가 나왔는지
- 액션이 헷갈렸는데 왜 액션을 사용하는지 잘 알게됨 중요한 건 디스패치가 아니었네ㅎㅎ

## 공식

- 지뢰 개수는 칸 수를 넘을 수 없다.

## 참고 사이트

- [minesweeper](https://minesweeper.online/ko/)
- [간단한 지뢰찾기 만들기](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=1ilsang&logNo=221590963211)
  - (Simple-minesweeper github)[https://github.com/1ilsang/Simple-minesweeper]
- [React에서 Mobx 경험기 (Redux와 비교기)](https://techblog.woowahan.com/2599/)

## 어려운 점

- class가 익숙치 않음
  - 함수형으로 먼저 했다가 class로 바꿔보는 건 어떨까?
  - useMemo를 class에서는 어떻게 사용하지?

## 생각하면서 해야할 것

- 왜 class형 컴포넌트에서 함수형 컴포넌트로 바뀌었는지
- 바뀐 방법이 편하기만 한 이유말고 또 무엇이 있는지

## 필요한 것

- 지뢰 개수 (지뢰 밀도)
  - 저 위 사이트에는 밀도를 31.33% 이상으로는 못하게 되어있는데 왜일까?
- 넓이
- 높이

---

## state

- 모드
  1. Easy
  2. Medium
  3. Hard
  4. Extream
  5. Custom
- 가로, 세로, 지뢰 개수
- 타이머
- 열어본 횟수
- 정지
- 전체 매트릭스

## 상수

- easy
- medium
- hard
- extream
- custom
  - 최대 가로, 세로

## reducer

- 랜덤 지뢰 숫자 난수 구하기

  - 처음 지뢰 설정할 때 테이블 matrix가 다 설정되어 있어야 함.

- 셀 오픈
  - 지뢰 선택
    - 게임 오버 화면 표시
    - 모든 지뢰 다 표시
    - 모든 숫자 다 표시
  - 빈 셀 선택
    - 셀 숫자 나올 때까지 다 펼쳐져야 한다.
  - 숫자 셀 선택
- 깃발 꽂기

부모 클래스의 생성자 함수를 호출할 때 사용
왜 super 없어도 되는거지?
react가 내부적으로

prop을 기대를 함
라이프 사이클이 다름

넣으면 초기부터 연결해줌
생성자 호출되고 나서 연결해줌 -> 어떨 때

this -> 호출할 때 바인딩되는 것?
https://ko.reactjs.org/docs/handling-events.html
JSX 콜백 안에서 this의 의미에 대해 주의해야 합니다. JavaScript에서 클래스 메서드는 기본적으로 바인딩되어 있지 않습니다. `this.handleClick`을 바인딩하지 않고 onClick에 전달하였다면, 함수가 실제 호출될 때 this는 undefined가 됩니다.

이는 React만의 특수한 동작이 아니며, JavaScript에서 함수가 작동하는 방식의 일부입니다. 일반적으로 `onClick={this.handleClick}`과 같이 뒤에 ()를 사용하지 않고 메서드를 참조할 경우, 해당 메서드를 바인딩 해야 합니다.

bind를 호출하는 것이 불편하다면, 이를 해결할 수 있는 두 가지 방법이 있습니다. 콜백을 올바르게 바인딩하기 위해 퍼블릭 클래스 필드 문법을 활용할 수 있다.

class는 this가 있다고 말하는 게 아니라 인스턴스에 this가 있다고 말해야..

호출하지 않고 바로 실행했을 때는 this가 잘 들어가는 것 같은데..

cleartimeout 하지 않고 object 안의 timerid가 든 곳을 delete 해줬는데 캐시가 쌓이지 않겠찡?

class todtjdgkf Eo akek dlstmxjstm
this 레퍼런스가 바뀔 수 있는것
렌더링 할 때 마다 바인드를 해주면 새로운 함수 생성하게 되니까

"상속받는" 경우에 class super 꼭 (extends 한다면) -> 문법적으로 반드시 (반드시 초반에 호출해야 한다.)

classnames

https://wonny.space/writing/dev/hello-tailwind-css
https://redpixelthemes.com/blog/tailwindcss-in-existing-project/
