---
title: Leetcode 21. Merge Two Sorted Lists
tag: 알고리즘-문제-풀이, leetcode, Grind 75, linked-list
date: 2023-02-06 14:19:17
---

|Date|Link|Time to solve|Submissions|
|-|-|-|
|2023.02.06|https://leetcode.com/problems/merge-two-sorted-lists/|01:12:00|2 fail 1 Accepted|

## First to solve

```js
   if (!list1 || !list2) {
        if (!list1 && !list2) return list1;

        if (list1) return list1;
        if (list2) return list2;
    }

    const newNode = new ListNode(list1.val);
    let copyNewNode = newNode;
    let copyList1 = list1.next;

    while (copyList1) {
        copyNewNode.next = new ListNode(copyList1.val);

        copyNewNode = copyNewNode.next;
        copyList1 = copyList1.next;
    }

    let copyList2 = list2;
    copyNewNode = newNode;

    while (copyList2 && copyNewNode) {
        if (copyNewNode.val > copyList2.val) {
            const temp = new ListNode(copyNewNode.val);
            temp.next = copyNewNode.next;

            copyNewNode.val = copyList2.val;
            copyNewNode.next = temp;

            copyList2 = copyList2.next;
        }

        if (!copyNewNode.next) {
            break;
        }

        copyNewNode = copyNewNode.next;
    }
    if (copyList2) {
        copyNewNode.next = copyList2;
    }

    return newNode;
```
- 첫 번째 리스트를 복사하지 말고 바로 이어서 하는 방법을 썼더라면.
- 리스트가 비어있는지 조건문 처리할 때 효율적이게 하지 못한 것 같다.
- 생각해야 할 case를 미리 기록하고 시작하기.

## Solutions
1. Iterative 이용

```js
var mergeTwoLists = function(list1, list2) {
  const mergedHead = new ListNode(-1, null);
  let copyHead = mergedHead;

  while (list1 && list2) {
      if (list1.val < list2.val) {
          copyHead.next = new ListNode(list1.val);
          list1 = list1.next;
      } else {
          copyHead.next = new ListNode(list2.val);
          list2 = list2.next;
      }

      copyHead = copyHead.next;
  }

  copyHead.next = list1 ? list1 : list2;

  return mergedHead.next;
}
```

- 처음부터 list1, list2가 비어있을 경우를 체크해주지 않아도 while문에서 통과되지 않기 때문에 조건문 처리가 됨
- 처음 head만들 때 -1 넣어서 만들기
- 입력값 조건을 잘 보기

2. Recursive 이용

```js
var mergeTwoLists = function(list1, list2) {
  if (!list1 || !list2) return list1 ? list1 : list2;

  if (list1.val < list2.val) {
      list1.next = mergeTwoLists(list1.next, list2);
      return list1;
  } else {
      list2.next = mergeTwoLists(list1, list2.next);
      return list2;
  }
};

```

- 새로운 리스트를 만들지 않고, 제일 처음 list1, list2 value의 값이 작은 리스트로 연결되게 재귀를 이용한 방법