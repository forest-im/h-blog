---
title: Hash Table
tag: 자료구조
date: 2022-04-13 00:24:48
---

# Hash Table

<!-- TOC tocDepth:2..3 chapterDepth:2..6 -->

- [What is a Hash Table?](#what-is-a-hash-table)
- [Benefits of Hash Table](#benefits-of-hash-table)
- [Drawbacks of Hash Table](#drawbacks-of-hash-table)
- [Hash Table의 기본 작업과 Big O](#hash-table의-기본-작업과-big-o)
- [Hash Function](#hash-function)
- [Hash algorithm collision](#hash-algorithm-collision)
- [collision 해결 방법](#collision-해결-방법)
- [1. Separate chaining](#1-separate-chaining)
- [2. Open addressing 개방 주소법](#2-open-addressing-개방-주소법)
  - [probing](#probing)

<!-- /TOC -->

## What is a Hash Table?

- 일반적인 의미로 hash란 고기와 감자를 잘게 다진 요리를 뜻합니다. 예로 해시브라운이 있습니다.
- Hash Function을 사용하여 key를 해시값으로 매핑하고, 이 해시값을 색인(index) 혹은 주소 삼아 데이터의 value를 key와 함께 저장하는 자료구조를 Hash Table이라고 합니다.
  - 여기서 데이터가 저장되는 장소를 bucket 또는 slot이라고 합니다.
- 해시테이블에서 가장 중요한 요소는 Hashing Function입니다. 해시 함수란 입력받은 값을 특정 범위 내의 값으로 변경하는 함수입니다.

<!-- ### Hash Table in JavaScript
- 메모리 관점에서 자바스크립트는 하위 레벨의 언어인데요, 자바스크립트로 Hash Table을 직접 구현해서 사용하는 것은 기술적으로 거의 불가능합니다.
- we use javascript plain objects in the place of Hash Table. 해시테이블 대신 일반 객체를 사용함 (자바스크립트에 있는 plain object가 해시테이블을 이용해 구현됐고 해시테이블과 유사한 성격을 가졌다고 합니다..)  -->

<a href="https://en.wikipedia.org/wiki/Hash_table#Choosing_a_hash_function" target='_blank'> 
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Hash_table_3_1_1_0_1_0_0_SP.svg/1280px-Hash_table_3_1_1_0_1_0_0_SP.svg.png" alt="hash"></a>

```js
const table = {};
table["key"] = 100;
table["key2"] = "Hello";
```

## Benefits of Hash Table

- 해시 코드 자체가 배열방의 index로 사용되기 때문에 검색 자체를 할 필요가 없고 해시 코드로 데이터의 위치에 디렉트로 접근할 수 있어서 검색 속도가 매우 빠릅니다.
- 삽입, 삭제, 검색의 시간 복잡도가 평균적으로 O(1)을 가집니다.
- 해시충돌이 발생할 가능성이 있음에도 해시테이블을 쓰는 이유는 적은 리소스로 많은 데이터를 효율적으로 관리하기 위해서입니다.

## Drawbacks of Hash Table

- collision이 발생할 수 있습니다.
- Hash Function의 의존도가 높아 Hash Function이 꼭 필요합니다.
- Not suitable for ordered data
- Might need large space allocation 큰 공간 할당이 필요할 수 있어 비효율적일 수 있습니다.

## Hash Table의 기본 작업과 Big O

- Insertion : O(1)
- Deletion: O(1)
- Search: O(1)
- 일반적으로 O(1)의 시간복잡도를 가집니다. Collision이 많이 발생할수록 시간복잡도는 O(n)까지 늘어날 수 있습니다.

## Hash Function

- 어떤 특정한 규칙을 이용해서 입력받은 key 값으로 그 key값이 얼마나 큰지에 상관없이 동일한 hash code를 만들어주는 함수입니다.
- 임의의 길이의 데이터를 고정된 길이의 데이터로 매핑, 변환 해주는 함수입니다. 매핑 전의 값을 키(key), 매핑 된 후의 값을 해시 값(hash value) 이 과정을 통틀어 해싱(hashing)이라 합니다.
- 해쉬함수를 구현하실 때 멱등성(Input과 output 결과가 달라지지 않아야함)을 유지해야 합니다. 즉, 해쉬함수는 동일한 입력값에 대해 동일한 해쉬값을 반환해야만 합니다.
- good distribution of values를 가져야합니다.
- performant를 가져야합니다.
- 입력받은 key를 가지고 얼마나 고르게 분배를 하느냐에 좋은 알고리즘인지 판결됩니다.

## Hash algorithm collision

- collision이 많은 경우에는 시간 복잡도가 O(n)까지 걸릴 수 있습니다.
- 해시 함수는 때로 서로 다른 key 값으로 동일한 해시 코드를 만들어내기도 합니다. 알고리즘이 아무리 좋아도 어떤 해시 코드는 중복된 index를 가질 수밖에 없습니다.

## collision 해결 방법

## 1. Separate chaining

- 한 버킷당 들어갈 수 있는 엔트리의 수에 제한을 두지 않음으로써 모든 자료를 해시테이블에 담는 것입니다.
- linked list와 같은 연결을 통해 collision을 해결합니다.
- 미리 충돌을 대비해 공간을 넓힐 필요가 없습니다.
- 데이터의 수가 많아지면 동일한 버킷에 chaining되는 데이터가 많아지며 그에 따라 캐시의 효율성이 감소할 수 있습니다.
- 데이터의 수가 많아지면 linked list를 tree형태로 바꾸어 성능의 이슈를 해결할 수 있습니다.

<a href="https://en.wikipedia.org/wiki/Hash_table#Choosing_a_hash_function" target='_blank'> 
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Hash_table_5_0_1_1_1_1_1_LL.svg/1280px-Hash_table_5_0_1_1_1_1_1_LL.svg.png" alt="separate"></a>

## 2. Open addressing 개방 주소법

- 비어있는 해시 테이블의 공간을 활용하는 방법입니다. 해시함수로 얻은 주소가 아닌 다른 주소에 데이터를 저장할 수 있도록 허용한다는 취지에서 open addressing이라는 이름이 붙은 것 같습니다.
- 메모리 문제가 발생하지 않으나 또 다시 해시 충돌이 생길 수 있습니다.
- index의 값은 해시함수에 의해서 정해지는 게 아닌 이전 값에 영향을 받게됩니다.

<a href="https://en.wikipedia.org/wiki/Hash_table#Choosing_a_hash_function" target='_blank'> 
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Hash_table_5_0_1_1_1_1_0_SP.svg/1024px-Hash_table_5_0_1_1_1_1_0_SP.svg.png" alt="addressing"></a>

<a href="https://en.wikipedia.org/wiki/Hash_table#Choosing_a_hash_function" target='_blank'> 
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/HASHTB12.svg/1920px-HASHTB12.svg.png" alt="open"></a>

### probing

- open addressing은 구조상 해시충돌 문제가 발생할 수 있습니다. 해시충돌은 probing(탐사) 방식으로 해결할 수 있습니다. 탐사란 삽입, 삭제, 탐색을 수행하기 위해서 해시테이블 내 새로운 주소(해시값)을 찾는 과정입니다.

1. Linear probing 선형 탐사

   - 가장 간단한 방식입니다. 다른 데이터가 저장돼 있으면 해당 해시값에서 고정 폭을 옮겨 다음 해시값에 해당하는 버킷에 액세스(삽입, 삭제, 탐색) 합니다. 여기에 데이터가 있으면 고정폭으로 또 옮겨 액세스합니다.
   - 삭제시 문제가 생길 수 있습니다.

2. Quadratic probing 제곱 탐사

   - 고정 폭으로 이동하는 선형 탐사와 달리 그 폭이 제곱수로 늘어난다는 특징이 있습니다.
   - 여러 개의 서로 다른 키들이 동일한 초기 해시값을 갖는 secondary clustering에 취약하다고 합니다. 초기 해시값이 같으면 그 전에 이미 같은 해시값을 가졌던 데이터가 이동했던 것처럼 똑같이 이동하고 한 번 더 이동해야 데이터를 저장할 수 있습니다.

3. Double hasing
   - 탐사할 해시값의 규칙성을 없애버려서 clustering을 방지하는 기법입니다.

> 참고 출처
>
> 1. [해싱, 해시함수, 해시테이블 by ratsgo's blog (2017)](https://ratsgo.github.io/data%20structure&algorithm/2017/10/25/hash/)
> 2. [Hash table by 위키피디아 (2022)](https://en.wikipedia.org/wiki/Hash_table#Choosing_a_hash_function)
> 3. [Hash table 데이터 구조, collision, dynamic resizing에 대해 설명! 성능 이슈가 없기 위해서는 이해하고 해시테이블을 사용하자 by Vagazine님 YOUTUBE (2019)](https://www.youtube.com/watch?v=W-KV24YEB9g)
> 4. [[자료구조 알고리즘] 해쉬테이블(Hash Table)에 대해 알아보고 구현하기 by 엔지니어대한민국 YOUTUBE (2018)](https://www.youtube.com/watch?v=Vi0hauJemxA)
>    Save
