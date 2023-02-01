---
title: Leetcode 82. Remove Duplicates from Sorted List II
tag: 알고리즘-문제-풀이, leetcode
date: 2023-01-08 13:12:52
---

[82. Remove Duplicates from Sorted List II](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/)

### 푼 방법

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (!head || !head.next) return head;

  // 밑에서 head value로 새 리스트를 만들었으니 인자 head next값을 copy한다.
  let currentNode = head.next;

  // 밑 while문에서 지나간 node의 value를 기록해주는 변수
  let passed = head.val;

  // head value를 넣어 새 list를 만들어준다.
  const newList = new ListNode(head.val);
  let copyNewList = newList;

  while (currentNode) {
    // 예를 들어 head가 [1, 1, 2]라면 처음 루프를 들어왔을 떄
    // currentNode.val = 1, copyNewList.val = 1이 될 것이다. 이 때 copyNewList.val를 101로 바꿔 중복된 노드라는 걸
    // 표시해준다.
    if (currentNode.val === copyNewList.val) {
      if (!currentNode.next) {
        // 여기에 들어오는 상황은 [1, 1] or [2, 2] 이런 식의 상황밖에 없다.
        // [1, 1, 4, 4] 와 같은 상황은 copyNewList.val = 1, currentNode.val = 4일 때
        // 밑의 if 문에서 (currentNode.next && currentNode.val !== currentNode.next.val)
        // currentNode의 next가 있다면 currentNode의 value와 currentNode의 next value가 같아야만
        // copyNewList의 값으로 추가해주기 때문에 값이 (4, 4)이므로 값이 추가되지 않는다.
        return newList.next;
      }

      copyNewList.val = 101;
    }

    // 여기서 passed는 만약 [1, 2, 3]이 주어졌을 때
    // currentNode.val가 3이면 passed는 2이다.
    if (passed !== currentNode.val) {
      if (
        // currentNode의 next가 있을 때와 없을 때를 같이 조건문 처리해주었음
        // next가 있을 때는 현재 값과 다음 값이 같지 않을 때만 값이 추가되도록 해주었다.
        !currentNode.next ||
        (currentNode.next && currentNode.val !== currentNode.next.val)
      ) {
        // 이 조건문의 경우는 [1, 1, 2, 3] 같은 경우, currentNode value가 2, passed가 1일 때 해당한다.
        // 앞이 1, 1로 중복되어 copyNewList value가 101이 되어있을 것이므로
        if (copyNewList.val === 101) {
          copyNewList.val = currentNode.val;
        } else {
          // 원래 코드는
          // copyNewList.next = new ListNode(currentNode.val);
          // copyNewList = copyNewList.next;
          // 이렇게 되어있었는데 은혜님 코드 보고 변경해보았습니다 이렇게 변경하고 밑에
          // if (passed === currentNode.val) if문도 추가해주었어요.
          copyNewList.next = currentNode;
          copyNewList = copyNewList.next;
        }
      }
    }

    // passed와 currentNode가 같지 않을 때 currentNode자체를 할당해주고 있기 때문에 node 전체가 할당이 되고 있다.
    // passed와 currentNode value가 같으면
    // copyNewList.next를 null을 넣어 참조를 끊어준다.
    if (passed === currentNode.val) {
      copyNewList.next = null;
    }

    passed = currentNode.val;
    currentNode = currentNode.next;
  }

  // newList value가 101인 경우는 [1, 1] or [1,1,1,1,1] 이런 경우 newList의 값이 [1]이 되어있을 것이므로
  // null을 리턴해준다.
  return newList.val === 101 ? null : newList;
};
```

- newList의 next값으로 새 리스트노드를 만들어 할당해주는 것보다 원래 있는 head 값을 넣었을 때 메모리 효율이 더 좋게 나오는 것 같다.
- 그 전엔 45MB언저리였지만 바꾸니 44.3MB가 되었음

## prev 이용해서 풀어보기

```js
var deleteDuplicates = function (head) {
  if (!head || !head.next) return head;

  let currentNode = head.next;
  const newList = new ListNode(head.val);
  let copyNewList = newList;
  let isDuplicate = false;
  let prevList;

  while (currentNode) {
    if (currentNode.val === copyNewList.val) {
      if (!currentNode.next) {
        if (!prevList) {
          return copyNewList.next;
        }
        prevList.next = null;

        return newList;
      }

      isDuplicate = true;
    }

    if (currentNode.val !== copyNewList.val) {
      if (isDuplicate) {
        copyNewList.val = currentNode.val;
        isDuplicate = false;
      } else {
        prevList = copyNewList;
        copyNewList.next = currentNode;
        copyNewList = copyNewList.next;
      }
    } else {
      copyNewList.next = null;
    }

    currentNode = currentNode.next;
  }

  return newList;
};
```

### 어려웠던 점

- while문을 돌면서 인자로 주어진 리스트의 마지막 부분에 다다랐을 때 next값을 체크해주는 부분이 어려웠다.
  - 다음엔 옵셔널 체이닝 연산자를 사용해서 해결하기
- `[1, 1, 2, 3]` 이렇게 맨 앞부분이 같은 경우에 1, 1을 제외하고 2부터 시작하게 해주는 부분도 어려웠다.
  - 처음에는 while문을 두 개를 만들고, 처음의 while문은 newList의 head를 만들어주는 역할을 담당하게 했다. 첫 번째 while문을 돌고나서 `currentNode`는 newList의 head 다음 노드로 설정하고 두 번째 while문을 시작하는 식으로 했었는데 풀고나니 두 개로 분리하지 않고 하나로 합칠 수 있을 것 같아 합치게 되었다.

