---
title: ts
tag: ts
date: 2023-03-06 14:21:16
published: false
---

애너테이션

```js
let myVar: type = value;

let myNumber: number = 42;

let gameOver: boolean = false;
gameOver = true;
```

tsc 파일.ts

## 타입 추론

변수 선언을 보면 어떤 값이 할당되는지 판단한다.

## Any

일반적으로는 잘 사용 x

let thing: any = "hello";
thing = 1;
thing = false;
thing()

초기화와 별도로 변수를 선언했을 때 타입을 명시하지 않으면 ts는 any로 추론한다.
any를 쓰면 타입스크립트의 기능을 제대로 활용하기 힘들다.

## 파라미터에 기본값

```js
function greet2(person: string = "strianger") {
	return `hi there, ${person}`;
}

greet2();
greet2("Tony");
```

## return 타입 애너테이션

함수 return에 애너테이션 안쓰면 void타입으로됨

```js
function rando(num: number): string | number {
	if (Math.random() < 0.5) {
		return num.toString();
	}

	return num;
}

const add = (x: number, y: number): number => {
	return x + y;
};
```

## void

변수가 아닌 함수에서 주로 사용됨 (아주 드물게)
아무것도 반환하지 않는 함수의 반환 타입으로 사용

```js
function printTwice(msg: string): void
```

## Never

함수의 반환 타입
절대 반환되지 않아야 할 함수를 애너테이션 처리할 때
일반적으로 예외를 발생시키는 함수

```js
function makeError(msg: string): never {
	throw new Error(msg);
}
```

```js
function gameLoop(): never {
	while (true) {
		console.log("GAMP LOOP RUNNING!");
	}
}
```

never과 void를 비교하면 void는 엄밀히 값이다.
never은 반환할 기회를 가지면 안된다

## Object

ts에는 객체를 설명하는 애너테이션을 만들 수 있다.

```js
let coordinate: { x: number, y: number } = { x: 34, y: 50 };

function randomCoordinate(): { x: number, y: number } {
	return { x: Math.random(), y: Math.random() };
}
```

함수의 객체 파라미터
객체 리터럴은 알려진 프로퍼티만 지정할 수 있당

```js
function printName(person: { first: string, last: string }): void {
	console.log(`${person.first} ${person.last}`);
}
printName({ first: "Mick", last: "Jagger", age: 473 }); // 이건 에러가 남 (객체 리터럴은 알려진 프로퍼티만 지정할 수 있당)
const singer = { first: "Mick", last: "Jagger", age: 473 };
printName(singer); // 이건 에러안남
```

객체를 전달하면 Ts는 객체 안에 성과 이름이 있는지만 판단 필요한 프로퍼티가 있는지 체크. 리터럴로 전달하면 불필요한 프로퍼틸는 전달하지 못하게 함

## 타입 별칭 생성하기 Type Alias

```js
function randomCoordinate(): { x: number, y: number } {
	return { x: Math.random(), y: Math.random() };
}

function doublePoint(point: { x: number, y: number }): {
	x: number,
	y: number
} {
	return { x: point.x * 2, y: point.y * 2 };
}
```

이렇게 쓰면 귀찮징

```js
type Point = {
	x: number,
	y: number
};
function randomCoordinate(): Point {
	return { x: Math.random(), y: Math.random() };
}

function doublePoint(point: Point): Point {
	return { x: point.x * 2, y: point.y * 2 };
}
```

## 중첩 객체

```js
type Song = {
	title: string,
	artist: string,
	numStreams: number,
	credits: { producer: string, writer: string }
};

function calculatePayout(song: Song): number {
	return song.numStreams * 0.333;
}

function printSong(song: Song): void {
	console.log();
}

const mySong: Song = {
	title: "title",
	artist: "alex",
	numStreams: 12341234,
	credits: { producer: "leo", writer: "lleo" }
};
```

## 선택적 프로퍼티

```js
type Point = {
	x: number,
	y: number,
	z?: number
};

const myPoint: Point = { x: 1, y: 3 };
```

## readonly 제어자 키워드

ts에서 배열이나 클래스에 접근할 때 사용
객체에 프로퍼티에 리드온리를 하면 프로퍼티에 쓰기를 해서 변경할 때 경고를 해준다.

```js
type User = {
  readonly id: number;
  username: string;
};

const user: User = {
  id: 1234,
  username: "catgurl",
};

user.id = 13123123; //Cannot assign to 'id' because it is a read-only property.ts(2540)
```

## 교차 타입 (intersection type)

이 타입은 여러 타입을 앰퍼샌드(&)기호로 결합한다.

```js
type Circle = {
	radius: number
};

type Colorful = {
	color: string
};

type ColorfulCircle = Circle & Colorful;

const happyFace: ColorfulCircle = {
	radius: 4,
	color: "yellow"
};

type Cat = {
	numLives: number
};

type Dog = {
	breed: string
};

type CatDog = Cat &
	Dog & {
		age: number
	};

const christy: CatDog = {
	numLives: 7,
	breed: "Husky",
	age: 9
};
```

```js
type Movie = {
	title: string,
	originalTitle?: string,
	director: string,
	releaseYear: number,
	boxOffice: {
		budget: number,
		grossUS: number,
		grossWorldwide: number
	}
};

function getProfit({ boxOffice: { grossWorldwide, budget } }: Movie): number {
	return grossWorldwide - budget;
}
```

## 배열

`const activeUsers: string[] = ["colt"];`

```js
const bools: boolean[] = [];

type Point = {
	x: number,
	y: number
};

const coords: Point[] = [];
coords.push({ x: 23, y: 8 });

const board: string[][] = [
	["X", "O", "X"],
	["X", "O", "X"],
	["X", "O", "X"]
];

const demo: number[][][] = [[[1]]];
```

## 유니온

숫자 또는 문자.. 여러 타입의 값을 가질 수 있다.

```js
let age: number | string = 21;
age = 23;
age = "24";
```

```js
let age: number | string | boolean = 21;
age = 23;
age = "24";
age = true;

type Point = {
	x: number,
	y: number
};

type Loc = {
	lat: number,
	long: number
};

let coordinates: Point | Loc = { x: 1, y: 34 };
coordinates = { lat: 321.213, long: 23.23 };
```

## 타입 좁히기

```js
function calculateTax(price: number | string, tax: number) {
	if (typeof price === "string") {
		price = parseFloat(price.replace("$", ""));
	}

	return price * tax;
}
```

## 유니온 타입과 배열

```js
const numbs: number[] = [1, 2, 3];

const stuff: (number | string)[] = [1, 2, "dfs"];
```

```js
const numbs: number[] = [1, 2, 3];

const stuff: (number | string)[] = [1, 2, "dfs"];

type Point = {
	x: number,
	y: number
};

type Loc = {
	lat: number,
	long: number
};

const coords: (Point | Loc)[] = [];
coords.push({ lat: 321.233, long: 23.34234 });
coords.push({ x: 321.233, y: 23.34234 });
```

## 리터럴 타입

```js
let zero: 0 = 0;

zero = 2;

let hi: "hi" = "hi";
```

```js
const giveAnswer = (answer: "yes" | "no" | "maybe") => {
	return `The answer is ${answer}.`;
};

let mood: "Happy" | "Sad" = "Happy";
mood = "Sad";

type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

let today: DayOfWeek = "weds";
```

## 제네릭 중요~

여러 타입에서 사용할 수 있는 재사용 함수나 재숑 클래스를 정의할 수 있게 해주는 특수 기능 또는 특수 구문

```js
const nums: number[] = [];
const nums2: Array<number> = []; // Array라는 인터페이스

// 인터페이스의 정의에서 대문자 T는 타입(Type)을 나타낸다.

const colors: Array<string> = [];
```

## 빌트인 제네릭의 다른 예시

```js
function numberIdentity(item: number): number {
	return item;
}

function stringIdentity(item: string): string {
	return item;
}

function booleanIdentity(item: boolean): boolean {
	return item;
}

function identity(item: any): any {
	return item;
}
```

각 타입의 상황을 저렇게 일일이 나열하는 것은 좋지 않다.

```ts
function identity<Type>(item: Type): Type {
	return item;
}

identity<number>(3);
identity<string>("st");
identity<boolean>(true);
```

`Type`은 모종의 타입이라는 의미의 제네릭 버전이다.
`Type`은 제네릭 파라미터 이름이고 한 번에 교체가 가능하다.

- 보통 `T`를 쓴다.

```js
function getRandomElement<T>(list: T[]): T {
	const randIdx = Math.floor(Math.random() * list.length);

	return list[randIdx];
}

getRandomElement < string > ["a", "b", "c"];
getRandomElement < number > [1, 2, 3];

getRandomElement(["a", "b"]);
```

## 화살표 함수, tsx

```js
function getRandomElement<T>(list: T[]): T {
	const randIdx = Math.floor(Math.random() * list.length);

	return list[randIdx];
}

const getRandomElement2 = <T>(list: T[]): T => {
	const randIdx = Math.floor(Math.random() * list.length);

	return list[randIdx];
};
```

`<T,>`

- 후행 쉼표 붙여야 함

## 여러 타입을 갖는 제네릭
```js
function merge<T, U>(object1: T, object2: U) {
  return {
    ...object1,
    ...object2,
  };
}

const comboObj = merge({ name: "colr" }, { pets: ["blue", "elton"] });
```

```js
function merge<T extends object, U extends object>(object1: T, object2: U) {
  return {
    ...object1,
    ...object2,
  };
}

const comboObj = merge({ name: "colr" }, { pets: ["blue", "elton"] });
```