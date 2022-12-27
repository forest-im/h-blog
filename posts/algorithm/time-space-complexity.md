---
title: "시간 복잡도, 공간 복잡도"
tag: 알고리즘
date: 2022-12-23 22:20:35
---

## 빅오의 본질

- 빅오의 본질이란 데이터가 늘어날 때 알고리즘의 성능이 어떻게 바뀌는지가 중요한 것
- 컴퓨터 과학에서 O(logN)은 사실 O(log2N)을 줄여부르는 말. 편의를 위해 차수 2를 생략한 것
- N을 2로 나눠서 1이 될 때 까지의 단계수가 걸린다는 뜻

## 공간 복잡도

- 대부분의 원시값(booleans, numbers, undefined, null)은 constant space를 가진다.
- String은 다르다. 문자열은 O(n)공간이 필요하다.
- reference 타입 - 배열, 객체 -> O(n)

```js
var twoSum = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    if (nums[left] + nums[right] === target) {
      return [left, right];
    }

    if (left === right - 1) {
      left++;
      right = nums.length - 1;
    } else {
      right--;
    }
  }
};
```

- 변수로 설정된 부분은 모두 number형의 변수입니다.
- string을 제외한 원시값의 공간복잡도는 O1을 가지기에 공간 복잡도는 O1입니다.
- 입력값인 nums의 배열의 크기에 상관없이 같은 길이의 배열을 리턴

```js
var twoSum2 = function (nums, target) {
  const storedNumberAndIndex = {};

  nums.forEach((number, index) => (storedNumberAndIndex[number] = index));

  for (let i = 0; i < nums.length; i++) {
    if (
      storedNumberAndIndex[target - nums[i]] &&
      storedNumberAndIndex[target - nums[i]] !== i
    ) {
      return [storedNumberAndIndex[target - nums[i]], i];
    }
  }
};
```

- 사용한 공간은 storedNumberAndIndex 객체와 for문 안의 i
- 객체와 배열은 기본적으로 On 공간복잡도를 가지기 때문에 On입니다.
- forEach 메서드로 인해서 storedNumberAndIndex의 객체는 입력된 값의 배열 길이에 비례하여 공간이 커지게 된다.
