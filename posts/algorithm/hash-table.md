---
title: Hash Table
tag: 자료구조, 스터디01
date: 2022-12-27 19:55:58
---

## Hasing이란?
해싱이란, 임의의 길이의 값을 Hash Function을 사용하여 고정된 크기의 값으로 변환하는 작업을 말한다.

## Hash Function이란?
해시 함수란 입력받은 값을 특정 범위 내의 크기의 값으로 변경하는 함수이다.
- 멱등성을 유지해야 한다.

## Hash Table이란?
해싱을 사용하여 데이터를 저장하는 자료구조.  
- Hash Function을 사용하여 key를 해시값으로 매핑하고, 해시값을 주소 삼아 데이터의 value를 key와 함께 저장하는 자료구조.
- Key + Value 쌍의 형태로 이루어진 자료 구조
- 많은 언어에는 기본 유형으로 내장되어있는 Hash Table이나 Hash Map이 있다.
- 순서가 없다.
- 값 추가, 삭제 속도가 빠르다.
- 연속적인 흐름이 있거나 순서가 중요한 데이터에는 적합하지 않다.

## 해시 테이블의 장점
- 적은 리소스로 많은 데이터를 효율적으로 관리할 수 있다.
- 삽입, 삭제, 검색의 시간 복잡도가 평균적으로 O(1)이다.

## 해시 테이블의 단점
- 충돌이 발생할 수 있다.
- 알고리즘이 아무리 좋아도 어떤 해시 코드는 중복된 index를 가질 수 밖에 없다.

## 충돌 해결 방법
### Separate chaining
![Separate chaining](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Hash_table_5_0_1_1_1_1_1_LL.svg/900px-Hash_table_5_0_1_1_1_1_1_LL.svg.png)
- 한 버킷당 들어갈 수 있는 수에 제한을 두지 않는다.
- 배열 또는 연결리스트를 이용해서 충돌을 해결한다.
- 체이닝되는 데이터가 많아질수록 효율성이 감소할 수 있다.

### Open addressing
![Separate chaining](https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Hash_table_5_0_1_1_1_1_0_SP.svg/760px-Hash_table_5_0_1_1_1_1_0_SP.svg.png)

- 각 자리에 하나의 데이터만을 저장한다.
- 충돌이 발생하면 다음 칸이 어딘지 탐색 후 다음 칸에 넣는다.
- 삭제시 문제가 생길 수 있다.
