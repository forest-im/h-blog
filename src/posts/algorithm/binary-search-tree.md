---
title: Binary Search Tree
tag: 자료구조, 스터디01
date: 2022-12-27 20:36:26
---

- [Tree란?](#tree란)
- [Binary Search Tree란?](#binary-search-tree란)

## Tree란?

- 하나의 경로로 이루어져있는 비선형 데이터 구조로 그래프의 일종이다.
- 선형 데이터 구조에서는 어떤 연산을 수행하기 위해서는 데이터 크기가 커질수록 시간복잡도가 증가하게 된다. 트리 데이터 구조는 비선형 데이터 구조이므로 더 빠르고 쉽게 액세스할 수 있다.

## Binary Search Tree란?

- 이진 트리 자료 구조
- 이진 탐색 트리
- 왼쪽 노드의 값은 부모보다 작고, 오른쪽 노드의 값은 부모보다 크다.
- 좌우 자식 노드는 각각 다시 bst여야 한다.

```js
class Node {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

class Bst {
	constructor() {
		this.root = null;
	}

	insert(value) {
		const node = new Node(value);

		if (this.root === null) {
			return (this.root = node);
		}

		let current = this.root;

		while (true) {
			if (current.val < value) {
				if (current.right === null) {
					return (current.right = node);
				}

				current = current.right;
			} else {
				if (current.left === null) {
					return (current.left = node);
				}

				current = current.left;
			}
		}
	}

	find(value) {
		if (this.root.val === null) return null;

		let current = this.root;

		while (current) {
			if (current.val === value) return current;

			if (current.val < value) {
				current = current.right;
			} else {
				current = current.left;
			}
		}

		return null;
	}

	BFS() {
		const queue = [];
		const visited = [];

		queue.push(this.root);

		while (queue.length) {
			const node = queue.shift();
			visited.push(node.val);

			if (node.left) {
				queue.push(node.left);
			}

			if (node.right) {
				queue.push(node.right);
			}
		}

		return visited;
	}

	DFSPreOrder() {
		const current = this.root;
		const visited = [];

		function traverse(node) {
			visited.push(node.val);

			if (node.left) {
				traverse(node.left);
			}

			if (node.right) {
				traverse(node.right);
			}

			return;
		}

		traverse(current);

		return visited;
	}

	DFSPostOrder() {
		const current = this.root;
		const visited = [];

		function traverse(node) {
			if (node.left) {
				traverse(node.left);
			}

			if (node.right) {
				traverse(node.right);
			}

			visited.push(node.val);

			return;
		}

		traverse(current);

		return visited;
	}

	DFSInOrder() {
		const current = this.root;
		const visited = [];

		function traverse(node) {
			if (node.left) {
				traverse(node.left);
			}

			visited.push(node.val);

			if (node.right) {
				traverse(node.right);
			}

			return;
		}

		traverse(current);

		return visited;
	}
}
```
