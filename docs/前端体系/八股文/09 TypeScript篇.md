---
outline: deep
---

## 1.说说TypeScript的数据类型有哪些？

`typescript` 的数据类型主要有如下：

- boolean（布尔类型）

- number（数字类型）

- string（字符串类型）

- null 和 undefined 类型

  - ```typescript
    let n: null = null;
    let u: undefined = undefined;
    ```

- array（数组类型）有两种写法：

  - 元素类型后面接上 `[]`

    - ```typescript
      let arr:string[] = ['12', '23'];
       arr = ['45', '56'];
      ```

  - 使用数组泛型，`Array<元素类型>`：

    - ```tsx
      let arr:Array<number> = [1, 2];
      arr = ['45', '56'];
      ```

- object 对象类型

- tuple（元组类型）

  - ```tsx
    let tupleArr:[number, string, boolean];
    tupleArr = [12, '34', true]; //ok
    typleArr = [12, '34'] // no ok
    ```

- enum（枚举类型）

  - ```tsx
    enum Color {Red, Green, Blue}
    let c: Color = Color.Green;
    ```

- any（任意类型）

- unknown（描述不确定的变量）

- void 类型：用于标识方法返回值的类型，表示该方法没有返回值

- never 类型：永远不会发生值的类型

## 2.说说你对TypeScript中枚举类型的理解？应用场景？

枚举类型就是一个对象的所有可能取值的集合。

可以分为：

* 数字枚举
* 字符串枚举
* 异构枚举

**数字枚举**

默认从0开始依次累加

```ts
enum Direction {
    Up,   // 值默认为 0
    Down, // 值默认为 1
    Left, // 值默认为 2
    Right // 值默认为 3
}

console.log(Direction.Up === 0); // true
console.log(Direction.Down === 1); // true
console.log(Direction.Left === 2); // true
console.log(Direction.Right === 3); // true
```

如果我们将第一个值进行赋值后，后面的值也会根据前一个值进行累加1：

```ts
enum Direction {
    Up = 10,
    Down,
    Left,
    Right
}

console.log(Direction.Up, Direction.Down, Direction.Left, Direction.Right); // 10 11 12 13
```

**字符串枚举**

```ts
enum Direction {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right'
}

console.log(Direction['Right'], Direction.Up); // Right Up
```

如果设定了一个变量为字符串之后，后续的字段也需要赋值字符串，否则报错：

```ts
enum Direction {
 Up = 'UP',
 Down, // error TS1061: Enum member must have initializer
 Left, // error TS1061: Enum member must have initializer
 Right // error TS1061: Enum member must have initializer
}
```

**异构枚举**

即将数字枚举和字符串枚举结合起来混合起来使用，如下：

```ts
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
```

通常情况下我们很少会使用异构枚举

**应用场景**

后端返回的字段使用 0 - 6 标记对应的日期，这时候就可以使用枚举可提高代码可读性

```ts
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true
```

## 3.说说你对TypeScript中接口的理解？应用场景？

接口描述的是一个对象相关的属性和方法，但并不提供具体创建此对象实例的方法。

**一、接口属性**

使用方式：

```typescript
interface User {
    name: string
    age: number
}

const getUserName = (user: User) => user.name
```

可以设置属性是否可选（？）或只读（readonly）。

```ts
interface User {
    name: string
    age?: number
    readonly isMale: boolean
}
```

**多余属性检查**

使用类型断言，只要保证传入的类型有type就行

```typescript
interface Vegetables {
  color?: string;
  type: string;
}

const getVegetables = ({ color, type }: Vegetables) => {
  return `A ${color ? color + " " : ""}${type}`;
};

getVegetables({
  type: "tomato",
  size: 12,
  price: 1.2
} as Vegetables);
```

更好的方式是使用索引签名

```ts
interface Vegetables {
  color: string;
  type: string;
  [prop: string]: any;
}

const getVegetables = ({ color, type }: Vegetables) => {
  return `A ${color ? color + " " : ""}${type}`;
};

getVegetables({
  color: "red",
  type: "tomato",
  size: 12,
  price: 1.2
});
```

**二、接口使用**

**定义函数类型**

```typescript
interface AddFunc {
  (num1: number, num2: number): number;
}
```

实际上，很少使用接口类型来定义函数类型，更多使用**类型别名**配合箭头函数语法来定义函数类型

```typescript
type AddFunc = (num1: number, num2: number) => number;
```

**定义索引类型**

使用索引签名来定义对象映射结构

```typescript
interface RoleDic {
  [id: number]: string;
}

interface RoleDic1 {
  [id: string]: string;
}

const role1: RoleDic = {
  0: "super_admin",
  1: "admin"
};

const role2: RoleDic = {
  s: "super_admin",  // error 不能将类型"{ s: string; a: string; }"分配给类型"RoleDic"。
  a: "admin"
};

const role3: RoleDic = ["super_admin", "admin"];
```

**三、高级用法**

**继承接口**

```typescript
interface Vegetables {
  color: string;
}

interface Tomato {
  color: string;
  radius: number;
}

interface Carrot {
  color: string;
  length: number;
}
```

三个接口中都有对`color`的定义，但是这样写很繁琐，可以用继承来改写：

```typescript
interface Vegetables {
  color: string;
}

interface Tomato extends Vegetables {
  radius: number;
}

interface Carrot extends Vegetables {
  length: number;
}

const tomato: Tomato = {
  radius: 1.2 // error  Property 'color' is missing in type '{ radius: number; }'
};

const carrot: Carrot = {
  color: "orange",
  length: 20
};
```

一个接口可以被多个接口继承，同样，一个接口也可以继承多个接口，多个接口用逗号隔开。

```ts
interface Vegetables {
  color: string;
}

interface Food {
  type: string;
}

interface Tomato extends Food, Vegetables {
  radius: number;
}

const tomato: Tomato = {
  type: "vegetables",
  color: "red",
  radius: 1
};  
```

如果想要覆盖掉继承的属性，那就只能使用兼容的类型进行覆盖：

```typescript
interface Tomato extends Vegetables {
  color: number;
}
```

**与类型别名的区别**

* 类型别名可以在接口类型无法覆盖的场景中使用，比如联合类型、交叉类型等

  * ```typescript
    // 联合类型
    type Name = number | string;
    
    // 交叉类型
    type Vegetables = {color: string, radius: number} & {color: string, length: number}
    ```

* 重复定义接口类型，它的属性会叠加，方便扩展；但是如果重复定义类型别名就会报错

**应用场景**

在js中定义一个函数，用来获取用户的姓名和年龄

```ts
// 先定义一个接口
interface IUser {
  name: string;
  age: number;
}

const getUserInfo = (user: IUser): string => {
  return `name: ${user.name}, age: ${user.age}`;
};

// 正确的调用
getUserInfo({name: "koala", age: 18});
```

## 4.说说你对TypeScript中类的理解？应用场景？

