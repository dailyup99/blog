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

### **a、类的概念**

#### 1.类的使用

```typescript
class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  getPosition() {
    return `(${this.x}, ${this.y})`;
  }
}

const point = new Point(1, 2);
point.getPosition()   // (1, 2)
```

这里定义了一个 Point 坐标点类，它拥有两个number类型的属性 x 和 y，一个构造器函数和一个getPosition方法。

#### 2.类的继承

```typescript
class A {
  name: string;
  age: number;
  constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
  }
  getName() {
      return this.name;
  }
}

class B extends A {
  job: string;
  constructor(name: string, age: number) {
      super(name, age);
      this.job = "IT";
  }
  getJob() {
      return this.job;
  }
  getNameAndJob() {
      return super.getName() + this.job;
  }
}

var b = new B("Tom", 20);
console.log(b.name);
console.log(b.age);
console.log(b.getName());
console.log(b.getJob());
console.log(b.getNameAndJob());
//输出：Tom，20，Tom，IT，TomIT
```

如上，B继承A，那B被称为**父类**（超类），A被称为**子类**（派生类）。这就是类最基本的继承用法，B就是一个派生类，它派生自A类，此时B的实例继承了基类A的属性和方法。因此，实例 b 支持 name、age、getName 等属性和方法。

这里的 super 函数会调用基类的构造函数。

### **b、类的修饰符**

#### 1.访问修饰符

* public：修饰的是在任何地方可见、公有的属性或方法；
* private：修饰的是仅在同一类中可见、私有的属性或方法；
* protected：修饰的是仅在类自身及子类中可见、受保护的属性或方法。

#### 2.只读修饰符

在类中可以使用`readonly`关键字将属性设置为只读，就不能修改。

### c、类的类型

#### 1.属性类型

##### （1）参数属性

**参数属性就是在 constructor 构造函数的参数前面加上访问限定符**

```typescript
class A {
  constructor(name: string) {}
}
const a = new A("aaa");
console.log(a.name); // error 类型“A”上不存在属性“name”

class B {
  constructor(public name: string) {}
}
const b = new B("bbb");
console.log(b.name); // "bbb"
```

##### （2）静态属性

在 TypeScript 中和 ES6 中一样使用`static`关键字来指定属性或方法是静态的，实例将不会添加这个静态属性，也不会继承这个静态方法。

```typescript
class Parent {
  public static age: number = 18;
  public static getAge() {
    return Parent.age;
  }
  constructor() {
    //
  }
}
const p = new Parent();
console.log(p.age); // error Property 'age' is a static member of type 'Parent'
console.log(Parent.age); // 18
```

##### （3）可选类属性

TypeScript 还支持可选类属性，也是使用`?`符号来标记

```typescript
class Info {
  name: string;
  age?: number;
  constructor(name: string, age?: number, public sex?: string) {
    this.name = name;
    this.age = age;
  }
}
const info1 = new Info("TypeScript");
const info2 = new Info("TypeScript", 18);
const info3 = new Info("TypeScript", 18, "man");
```

#### 2.类的类型

定义一个类，并创建实例后，这个实例的类型就是创建他的类：

```typescript
class Person {}

/**
 * 类的作用:
 *  1.可以创建类对应的实例对象
 *  2.类本身可以作为这个实例的类型
 *  3.类也可以当中有一个构造签名的函数
 */

const name: string = "aaa"
const p: Person = new Person()
function printPerson(p: Person) {}

function factory(ctor: new () => void) {}
factory(Person)
```

### d、类的使用

##### 1.抽象类

抽象类一般用来被其他类继承，而不直接用它创建实例。抽象类和类内部定义抽象方法，使用`abstract`关键字：

```typescript
abstract class People {
  constructor(public name: string) {}
  abstract printName(): void;
}
class Man extends People {
  constructor(name: string) {
    super(name);
    this.name = name;
  }
  printName() {
    console.log(this.name);
  }
}
const m = new Man(); // error Expected 1 arguments, but got 0.
const man = new Man("TypeScript");
man.printName(); // 'TypeScript'
const p = new People("TypeScript"); // error Cannot create an instance of an abstract class.
```

##### 2.存取器

存取器就是 ES6 标准中的存值函数和取值函数，也就是在设置属性值的时候调用的函数，和在访问属性值的时候调用的函数，用法和写法和 ES6 的没有区别，可以通过getter、setter截取对类成员的读写访问：

```typescript
class UserInfo {
  private name: string;
  constructor() {}
  get userName() {
    return this.name;
  }
  set userName(value) {
    console.log(`setter: ${value}`);
    this.name = value;
  }
}
const user = new UserInfo();
user.name = "TypeScript"; // "setter: TypeScript"
console.log(user.name); // "TypeScript"
```

### e、类的接口

##### 1.类类型接口

**implements**关键字用来指定一个类要继承的接口，如果是接口和接口、类和类直接的继承，使用extends，如果是类继承接口，则用implements。

```typescript
interface FoodInterface {
  type: string;
}
class FoodClass implements FoodInterface {
  constructor(public type: string) {}
}
```

##### 2.接口继承类

接口可以继承一个类，当接口继承了该类后，会继承类的成员，但是不包括其实现，也就是只继承成员以及成员类型。接口还会继承类的`private`和`protected`修饰的成员，当接口继承的这个类中包含这两个修饰符修饰的成员时，这个接口只可被这个类或他的子类实现：

```typescript
class A {
  protected name: string;
}
interface I extends A {}
class B implements I {} // error Property 'name' is missing in type 'B' but required in type 'I'
class C implements I {
  // error 属性“name”受保护，但类型“C”并不是从“A”派生的类
  name: string;
}
class D extends A implements I {
  getName() {
    return this.name;
  }
}
```

## 5. 说说你对函数类型的理解

### a.函数类型定义

##### （1）直接定义

函数类型的定义包括对**参数**和**返回值**的类型定义：

```typescript
function add(arg1: number, arg2: number): number {
  return x + y;
}
const add = (arg1: number, arg2: number): number => {
  return x + y;
};
```

这里用**function字面量**和**箭头函数**两种形式定义了add函数。函数参数 arg1 和 arg2 都是数值类型，最后通过相加得到的结果也是数值类型。

##### （2）接口定义

```typescript
interface Add {
  (x: number, y: number): number;
}
let add: Add = (arg1: string, arg2: string): string => arg1 + arg2; 
// error 不能将类型“(arg1: string, arg2: string) => string”分配给类型“Add”
```

##### （3）类型别名定义

可以使用**类型别名**来定义函数类型，这种形式更加直观易读：

```typescript
type Add = (x: number, y: number) => number;
let add: Add = (arg1: string, arg2: string): string => arg1 + arg2; 
// error 不能将类型“(arg1: string, arg2: string) => string”分配给类型“Add”
```

### b.函数参数定义

##### （1）可选参数

```typescript
type Add = (x: number, y: number, z?: number) => number;
let add: Add = (arg1, arg2, arg3) => arg1 + arg2 + arg3;
add(1, 2);    // success   3
add(1, 2, 3); // success   6
```

##### （2）默认参数

```typescript
const add = (x: number, y = 2) => {
  return x + y;
};
add(1, "ts"); // error 类型"string"的参数不能赋给类型"number"的参数
```

##### （3）剩余参数

```typescript
const handleData = (arg1: number, ...args: number[]) => {

};
handleData(1, "a"); // error 类型"string"的参数不能赋给类型"number"的参数
```

### c.函数重载

JavaScript 作为一个动态语言是没有函数重载的，只能自己在函数体内通过判断参数的个数、类型来指定不同的处理逻辑：

```typescript
const handleData = x => {
  if (typeof x === 'string') {
    return Number(x);
  }
  if (typeof x === 'number') {
    return String(x);
  }
  return -1;
};
handleData(996)   // "996"
handleData("996") // 996
handleData(null)  // -1
```

**TypeScript的函数重载通过为一个函数指定多个函数类型定义，从而对函数调用的返回值进行检查**：

```typescript
const handleData = (x: string): number;
const handleData = (x: number): string;
const handleData = (x: null): number;
const handleData = (x: string | number | null): any => {
  if (typeof x === 'string') {
    return Number(x);
  }
  if (typeof x === 'number') {
    return String(x);
  }
  return -1;
};
handleData(996)   // "996"
handleData("996") // 996
handleData(false)  // error
```

**注意：**函数重载只能用 function 来定义，不能使用接口、类型别名来定义。

## 6.说说你对泛型的理解

### a.泛型语法

```typescript
function pickObjectKeys<T, K extends keyof T>(obj: T, keys: K[]) {
  let result = {} as Pick<T, K>
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key]
    }
  }
  return result
}

const language = {
  name: "TypeScript",
  age: 8,
  extensions: ['ts', 'tsx']
}

const ageAndExtensions = pickObjectKeys(language, ['age', 'extensions'])
```

`<T, K extends keyof T>` 为函数声明了两个参数类型，其中 `K` 被分配给了一个类型，该类型是 `T` 中的 `key` 的集合。然后将 `obj` 参数设置为 `T`，表示任何类型，并将 `keys` 设置为数组，无论 `K` 是什么类型。

### b.在函数中使用泛型

##### （1）分配泛型参数

```typescript
function identity<T>(value: T): T {
  return value;
}

const result = identity(123);
```

##### （2）直接传递类型参数

```typescript
type ProgrammingLanguage = {
  name: string;
};

function identity<T>(value: T): T {
  return value;
}

const result = identity<ProgrammingLanguage>({ name: "TypeScript" });
```

在这段代码中，`result` 为自定义类型 `ProgrammingLanguage`，它直接传递给了 `identity` 函数。 如果没有显式地定义类型参数，则`result`的类型就是 `{ name: string } `。

另一个常见的例子就是使用函数从 API 获取数据：

```typescript
async function fetchApi<ResultType>(path: string): Promise<ResultType> {
  const response = await fetch(`https://example.com/api${path}`);
  return response.json();
}
```

这里就将函数转换为接受 `ResultType` 泛型类型参数的泛型函数。 此泛型类型用于函数的返回类型：`Promise<ResultType>`。

可以看到，泛型并没有在参数列表中使用，也没有在TypeScript能够推断其值的其他地方使用。这意味着在调用函数时，必须显式地传递此泛型的类型：

```typescript
type User = {
  name: string;
}

async function fetchApi<ResultType>(path: string): Promise<ResultType> {
  const response = await fetch(`https://example.com/api${path}`);
  return response.json();
}

const data = await fetchApi<User[]>('/users')
```

在这段代码中，创建了一个名为 `User` 的新类型，并使用该类型的数组 (`User[]`) 作为 `ResultType` 泛型参数的类型。`data` 变量现在的类型是 `User[]` 而不是 `any`。

##### （3）默认参数类型

如果不打算为泛型函数的每次调用添加特定的类型，则可以为泛型类型参数添加默认类型。通过在泛型类型参数后面添加 `= DefaultType` 来完成：

```typescript
async function fetchApi<ResultType = Record<string, any>>(path: string): Promise<ResultType> {
  const response = await fetch(`https://example.com/api${path}`);
  return response.json();
}

const data = await fetchApi('/users')

console.log(data.a)
```

这里不需要在调用 `fetchApi` 函数时将类型传递给 `ResultType` 泛型参数，因为它具有默认类型 `Record<string, any>`。 这意味着 TypeScript 会将`data`识别为具有`string`类型的键和`any`类型值的对象，从而允许访问其属性。

##### （4）类型参数约束

```typescript
function stringifyObjectKeyValues<T extends Record<string, any>>(obj: T) {
  // ...
}
```

`extends Record<string, any>` 被称为**泛型类型约束**，它允许指定泛型类型必须可分配给 `extends` 关键字之后的类型。

### c.在接口、类和类型中使用泛型

##### （1）接口和类中的泛型

要创建泛型接口，可以在接口名称后添加类型参数列表：

```typescript
interface MyInterface<T> {
  field: T
}
```

对于类，它的语法和接口定义几乎是相同的：

```typescript
class MyClass<T> {
  field: T
  constructor(field: T) {
    this.field = field
  }
}
```

##### （2）自定义类型中的泛型

```typescript
type MyIdentityType<T> = T
```

泛型类型通常用于创建工具类型，尤其是在使用映射类型时。

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

这里，`Partial` 接受一个类型，遍历它的属性类型，然后将它们作为可选的新类型返回。

### d.使用泛型创建映射类型

使用 TypeScript 时，有时需要创建一个与另一种类型具有相同结构的类型。这意味着它们应该具有相同的属性，但属性的类型不同。对于这种情况，使用映射类型可以重用初始类型并减少重复代码。这种结构称为映射类型并依赖于泛型。

```typescript
type BooleanFields<T> = {
  [K in keyof T]: boolean;
};

type User = {
  email: string;
  name: string;
}

type UserFetchOptions = BooleanFields<User>;
```

`UserFetchOptions` 的类型如下：

```typescript
type UserFetchOptions = {
  email: boolean;
  name: boolean;
}
```

### e.使用泛型创建条件类型

条件类型提供了 infer 关键词，可以从正在比较的类型中推断类型，然后在 true 分支里引用该推断结果

**比如我们现在有一个函数类型，想要获取到一个函数的参数类型和返回值类型：**

我们可以直接使用内置工具ReturnType和Parameters来获取一个函数的返回值类型和参数类型，但是一些类型体操的题目是需要封装这些内置工具

```typescript
type CalcFnType = (num1: number, num2: string) => number

function foo() {
  return "abc"
}

// 总结类型体操题目: MyReturnType
type MyReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R? R: never // infer R表示推断处理返回值类型

type MyParameterType<T extends (...args: any[]) => any> = T extends (...args: infer A) => any? A: never // infer A表示推断出参数类型


// 获取一个函数的返回值类型: 内置工具
type CalcReturnType = MyReturnType<CalcFnType>
type FooReturnType = MyReturnType<typeof foo>
// type FooReturnType2 = MyReturnType<boolean> // 限制传入函数，传入boolean就会报错

type CalcParameterType = MyParameterType<CalcFnType>

export {}
```

## 7.说说你对TypeScript中高级类型的理解

### a.字面量类型

#### （1）字符串字面量类型

```typescript
type Direction = "north" | "east" | "south" | "west";

function getDirectionFirstLetter(direction: Direction) {
  return direction.substr(0, 1);
}

getDirectionFirstLetter("test"); // ❌ 类型“"test"”的参数不能赋给类型“Direction”的参数。
getDirectionFirstLetter("east");
```

#### （2）数字字面量类型

```typescript
type Age = 18;

interface Info {
  name: string;
  age: Age;
}

const info: Info = {
  name: "TS",
  age: 28 // ❌ 不能将类型“28”分配给类型“18”
};
```

#### （3）布尔字面量类型

```typescript
let success: true;
let fail: false;
let value: true | false;

success = true;
success = false;  // ❌ 不能将类型“false”分配给类型“true”
```

#### （4）模板字面量类型

```typescript
type Direction = 'left' | 'right' | 'top' | 'bottom';

type CssPadding = `padding-${Direction}`

// type CssPadding = 'padding-left' | 'padding-right' | 'padding-top' | 'padding-bottom'
```

### b.联合类型

联合类型是一种互斥的类型，该类型同时表示所有可能的类型。**联合类型可以理解为多个类型的并集。**

```typescript
type Union = "A" | "B" | "C";
```

在使用联合类型时，如何来区分联合类型中的类型呢？

通过向具有唯一值的每个类型中添加一个字段来实现的，该字段用于使用相等类型保护来区分类型。这就是**可辨识联合类型**。

```typescript
type Square = {
  kind: "square";
  size: number;
}

type Rectangle = {
  kind: "rectangle";
  height: number;
  width: number;
}

type Circle = {
  kind: "circle";
  radius: number;
}

type Shape = Square | Rectangle | Circle; 

function getArea(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
  }
}
```

在这个例子中，`Shape` 就是一个可辨识联合类型，它是三个类型的联合，而这三个类型都有一个 `kind` 属性，且每个类型的 `kind` 属性值都不相同，能够起到标识作用。 函数内应该包含联合类型中每一个接口的 `case`，**以**保证每个**case**都能被处理。

### c.交叉类型

**交叉类型可以理解为多个类型的交集。**

```typescript
type Types = type1 & type2 & .. & .. & typeN;
```

使用场景

#### ①合并接口类型

```typescript
type Person = {
	name: string;
  age: number;
} & {
	height: number;
  weight: number;
} & {
	id: number;
}

const person: Person = {
	name: "zhangsan",
    age: 18,
    height: 180,
    weight: 60,
    id: 123456
}
```

这里就通过交叉类型使 `Person` 同时拥有了三个接口中的五个属性。那如果两个接口中的同一个属性定义了不同的类型会发生了什么情况呢？

```typescript
type Person = {
	name: string;
  age: number;
} & {
  age: string;
	height: number;
  weight: number;
}
```

在合并后，`age`的类型就是`string & number`，也就是 `never` 类型：

如果同名属性的类型兼容，比如一个是 `number`，另一个是 `number` 的子类型——数字字面量类型，合并后 `age` 属性的类型就是两者中的子类型：

```typescript
type Person = {
	name: string;
  age: number;
} & {
  age: 18;
	height: number;
  weight: number;
}

const person: Person = {
	name: "zhangsan",
  age: 20,  // ❌ 不能将类型“20”分配给类型“18”。
  height: 180,
  weight: 60,
}
```

第二个接口中的`age`是一个数字字面量类型，它是`number`类型的子类型，所以合并之后的类型为字面量类型`18`。

#### ②合并联合类型

提取所有联合类型的相同类型成员，如果没有，那就是never类型

```typescript
type A = "blue" | "red" | 999;
type B = 999 | 666;
type C = A & B; // type C = 999;

const c: C = 999;
```

```typescript
type A = "blue" | "red";
type B = 999 | 666;
type C = A & B;

const c: C = 999; // ❌ 不能将类型“number”分配给类型“never”。
```

### d.索引类型

#### （1）索引类型查询字符串

使用 `keyof` 操作符可以返回一个由这个类型的所有属性名组成的联合类型：

```typescript
type UserRole = 'admin' | 'moderator' | 'author';

type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

type UserKeysType = keyof User; // 'id' | 'name' | 'email' | 'role';
```

#### （2）索引访问操作符

索引访问操作符就是`[]`，其实和访问对象的某个属性值是一样的语法，但是在 TS 中它可以用来访问某个属性的类型：

```typescript
type User = {
  id: number;
  name: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
}

type Params = {
  id: User['id'],
  address: User['address']
}
```

#### （3）应用

我们可以使用以下方式来获取给定对象中的任何属性：

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

### e.条件类型

条件类型根据条件来选择两种可能的类型之一，就像 JavaScript 中的三元运算符一样。其语法如下所示：

```typescript
T extends U ? X : Y
```

条件类型的推断

条件类型提供了一个`infer`关键字用来推断类型。

下面来定义一个条件类型，如果传入的类型是一个数组，则返回数组元素的类型；如果是一个普通类型，则直接返回这个类型。如果不使用  `infer` 可以这样写：

```typescript
type Type<T> = T extends any[] ? T[number] : T;

type test = Type<string[]>; // string
type test2 = Type<string>;  // string
```

如果传入 `Type` 的是一个数组类型，那么返回的类型为`T[number]`，即该数组的元素类型，如果不是数组，则直接返回这个类型。这里通过索引访问类型`T[number]`来获取类型，如果使用 `infer` 关键字则无需手动获取：

```typescript
type Type<T> = T extends Array<infer U> ? U : T;

type test = Type<string[]>; // string
type test2 = Type<string>;  // string
```

这里 `infer` 能够推断出 `U` 的类型，并且供后面使用，可以理解为这里定义了一个变量 `U` 来接收数组元素的类型。

### f.类型推断

编译器自动推断类型

### g.类型保护

* instanceof： 是一个内置的类型保护，可用于检查一个值是否是给定构造函数或类的实例。
* typeof：类型保护用于确定变量的类型，它只能识别以下类型：
  * boolean、string、bigint、symbol、undeined、funtion、number
* in：它通常返回一个布尔值，指示该属性是否存在于对象中。

### h.类型断言

#### （1）基本使用

```typescript
const getLength = (target: string | number): number => {
  if (target.length) { // error 类型"string | number"上不存在属性"length"
    return target.length; // error  类型"number"上不存在属性"length"
  } else {
    return target.toString().length;
  }
};
```

这时就可以使用类型断言，将`target`的类型断言成`string`类型。它有两种写法：`<type>value` 和 `value as type`：

```typescript
// 这种形式是没有任何问题的，建议使用这种形式
const getStrLength = (target: string | number): number => {
  if ((target as string).length) {      
    return (target as string).length; 
  } else {
    return target.toString().length;
  }
};

// 这种形式在JSX代码中不可以使用，而且也是TSLint不建议的写法
const getStrLength = (target: string | number): number => {
  if ((<string>target).length) {      
    return (<string>target).length; 
  } else {
    return target.toString().length;
  }
};
```

**注意：类型断言不要滥用，在万不得已的情况下使用要谨慎，因为强制把某类型断言会造成 TypeScript 丧失代码提示的能力。**

#### （2）双重断言

虽然类型断言是强制性的，但并不是万能的，在一些情况下会失效:

```typescript
interface Person {
	name: string;
	age: number;
}
const person = 'ts' as Person; // Error
```

这时就会报错，很显然不能把 `string` 强制断言为一个接口 `Person` ，但是并非没有办法，此时可以使用双重断言:

```typescript
interface Person {
	name: string;
	age: number;
}
const person = 'ts' as any as Person;
```

先把类型断言为 `any` ，再接着断言为想断言的类型就能实现双重断言，当然上面的例子肯定说不通的，双重断言我们也更不建议滥用，但是在一些少见的场景下也有用武之地。

#### （3）显式赋值断言

**① 严格模式下 null 和 undefined 赋值给其它类型值**

当在 `tsconfig.json` 中将 `strictNullChecks` 设为 `true` 后，就不能再将 `undefined` 和 `null` 赋值给除它们自身和`void` 之外的任意类型值了，但有时确实需要给一个其它类型的值设置初始值为空，然后再进行赋值，这时可以自己使用联合类型来实现 `null` 或 `undefined` 赋值给其它类型：

```typescript
let str = "ts";
str = null; // error 不能将类型“null”分配给类型“string”
let strNull: string | null = "ts"; // 这里你可以简单理解为，string | null即表示既可以是string类型也可以是null类型
strNull = null; // right
strNull = undefined; // error 不能将类型“undefined”分配给类型“string | null”
```

**② 可选参数和可选属性**

如果开启了 `strictNullChecks`，可选参数会被自动加上 `|undefined`：

```typescript
const sum = (x: number, y?: number) => {
  return x + (y || 0);
};
sum(1, 2); // 3
sum(1); // 1
sum(1, undefined); // 1
sum(1, null); // error Argument of type 'null' is not assignable to parameter of type 'number | undefined'
```

#### （4）const断言

`const` 断言是 TypeScript 3.4 中引入的一个实用功能。在 TypeScript 中使用 `as const` 时，可以将对象的属性或数组的元素设置为只读

```typescript
function sum(a: number, b: number) {
  return a + b;
}

// 相当于 const arr: readonly [3, 4]
const arr = [3, 4] as const;

// 类型“readonly [3, 4]”上不存在属性“push”。
arr.push(5);
```

因为使用了 `const` 断言，因此数组现在是一个只读元组，其内容无法更改，并且尝试这样做会在开发过程中导致错误。

#### （5）非空断言

在 TypeScript 中感叹号 ( **!** ) 运算符可以使编译器忽略一些错误

##### ① 非空断言运算符

感叹号运算符称为**非空断言运算符**，添加此运算符会使编译器忽略`undefined`和`null`类型。

```typescript
const parseValue = (value: string) => {
  // ...
};

const prepareValue = (value?: string) => {
  // ...
  parseValue(value!);
};
```

##### ② 使用示例

React 中的 Refs 提供了一种访问 DOM 节点或 React 元素的方法：

```typescript
const App = () => {
  const handleClick = () => {
    console.log(ref.current!.getBoundingClientRect());
  };
};
```

## 8.说说你对TypeScript装饰器的理解？应用场景？

TypeScript 5.0 中已经引入了装饰器。

在 TypeScript 中，装饰器就是可以添加到类及其成员的函数。TypeScript 装饰器可以注释和修改类声明、方法和属性，以及访问器和参数。

### 类装饰

例如声明一个函数 `addAge` 去给 Class 的属性 `age` 添加年龄

```ts
function addAge(constructor: Function) {
  constructor.prototype.age = 18;
}

@addAge
class Person{
  name: string;
  age!: number;
  constructor() {
    this.name = 'huihui';
  }
}

let person = new Person();

console.log(person.age); // 18
```

上述代码，实际等同于以下形式：

```ts
Person = addAge(function Person() { ... });
```

上述可以看到，当装饰器作为修饰类的时候，会把构造器传递进去。 `constructor.prototype.age` 就是在每一个实例化对象上面添加一个 `age` 属性

### 方法/属性装饰

同样，装饰器可以用于修饰类的方法，这时候装饰器函数接收的参数变成了：

- target：对象的原型
- propertyKey：方法的名称
- descriptor：方法的属性描述符

可以看到，这三个属性实际就是`Object.defineProperty`的三个参数，如果是类的属性，则没有传递第三个参数

如下例子：

```ts
// 声明装饰器修饰方法/属性
function method(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(target);
  console.log("prop " + propertyKey);
  console.log("desc " + JSON.stringify(descriptor) + "\n\n");
  descriptor.writable = false;
};

function property(target: any, propertyKey: string) {
  console.log("target", target)
  console.log("propertyKey", propertyKey)
}

class Person{
 @property
 name: string;
 constructor() {
   this.name = 'huihui';
 }

 @method
 say(){
   return 'instance method';
 }

 @method
 static run(){
   return 'static method';
 }
}

const xmz = new Person();

// 修改实例方法say
xmz.say = function() {
 return 'edit'
}
```

![img](http://139.196.79.103:9001/myimages/imgs/20250117162325064.png)

### 参数修饰

接收3个参数，分别是：

- target ：当前对象的原型
- propertyKey ：参数的名称
- index：参数数组中的位置

```ts
function logParameter(target: Object, propertyName: string, index: number) {
  console.log(target); // 就是 emp
  console.log(propertyName);
  console.log(index);
}

class Employee {
  greet(@logParameter message: string): string {
      return `hello ${message}`;
  }
}
const emp = new Employee();
emp.greet('hello');
```

输入如下图：

![img](http://139.196.79.103:9001/myimages/imgs/20250117162601486.png)

### 访问器装饰

使用起来方式与方法装饰一致，如下：

```ts
function modification(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(target);
  console.log("prop " + propertyKey);
  console.log("desc " + JSON.stringify(descriptor) + "\n\n");
};

class Person{
 _name: string;
 constructor() {
   this._name = 'huihui';
 }

 @modification
 get name() {
   return this._name
 }
}
```

**执行顺序**

当多个装饰器应用于一个声明上，将由上至下依次对装饰器表达式求值，求值的结果会被当作函数，由下至上依次调用，例如如下：

```ts
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class C {
    @f()
    @g()
    method() {}
}

// 输出
f(): evaluated
g(): evaluated
g(): called
f(): called
```

**应用场景**

可以看到，使用装饰器存在两个显著的优点：

- 代码可读性变强了，装饰器命名相当于一个注释
- 在不改变原有代码情况下，对原来功能进行扩展

## 9.说说对TypeScript中命名空间与模块的理解？区别？

任何包含顶级 `import` 或者 `export` 的文件都被当成一个模块

命名空间在TypeScript早期时，称之为内部模块，目的是将一个模块内部再进行作用域的划分，防止一些命名冲突的问题；

虽然命名空间没有被废弃，但是由于 ES 模块已经拥有了命名空间的大部分特性，因此更推荐使用 ES 模块，这样才能与 JavaScript 的（发展）方向保持一致。

`TypeScript` 中命名空间使用 `namespace` 来定义，语法格式如下：

```ts
namespace SomeNameSpaceName {
   export interface ISomeInterfaceName {      }
   export class SomeClassName {      }
}
```

使用方式如下：

```ts
SomeNameSpaceName.SomeClassName
```

## 10.说说如何在React项目中应用TypeScript？

安装 `@types/react`、`@types/react-dom`

`@types` 实际就是社区中的 `DefinitelyTyped` 库，定义了目前市面上绝大多数的 `JavaScript` 库的声明

在编写 `React` 项目的时候，最常见的使用的组件就是：

- 无状态组件
- 有状态组件
- 受控组件

### 无状态组件

主要作用是用于展示 `UI`，如果使用 `js` 声明，则如下所示：

```jsx
import * as React from "React";

export const Logo = (props) => {
  const { logo, className, alt } = props;

  return <img src={logo} className={className} alt={alt} />;
};
```

但这时候 `ts` 会出现报错提示，原因在于没有定义 `porps` 类型，这时候就可以使用 `interface` 接口去定义 `porps` 即可，如下：

```tsx
import * as React from "React";

interface IProps {
  logo?: string;
  className?: string;
  alt?: string;
}

export const Logo = (props: IProps) => {
  const { logo, className, alt } = props;

  return <img src={logo} className={className} alt={alt} />;
};
```

但是我们都知道 `props` 里面存在 `children` 属性，我们不可能每个 `porps` 接口里面定义多一个 `children`，如下：

```ts
interface IProps {
  logo?: string;
  className?: string;
  alt?: string;
  children?: ReactNode;
}
```

更加规范的写法是使用 `React` 里面定义好的 `FC` 属性，里面已经定义好 `children` 类型，如下：

```tsx
export const Logo: React.FC<IProps> = (props) => {
  const { logo, className, alt } = props;

  return <img src={logo} className={className} alt={alt} />;
};
```

- React.FC 显式地定义了返回类型，其他方式是隐式推导的
- React.FC 对静态属性：displayName、propTypes、defaultProps 提供了类型检查和自动补全
- React.FC 为 children 提供了隐式的类型（ReactElement | null）

### 有状态组件

可以是一个类组件且存在 `props` 和 `state` 属性

如果使用 `TypeScript` 声明则如下所示：

```tsx
import * as React from "React";

interface IProps {
  color: string;
  size?: string;
}
interface IState {
  count: number;
}
class App extends React.Component<IProps, IState> {
  public state = {
    count: 1,
  };
  public render() {
    return <div>Hello world</div>;
  }
}
```

上述通过泛型对 `props`、`state` 进行类型定义，然后在使用的时候就可以在编译器中获取更好的智能提示

### 受控组件

受控组件的特性在于元素的内容通过组件的状态 `state` 进行控制

由于组件内部的事件是合成事件，不等同于原生事件，

例如一个 `input` 组件修改内部的状态，常见的定义的时候如下所示：

```ts
private updateValue(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ itemText: e.target.value })
}
```

常用 `Event` 事件对象类型：

- ClipboardEvent<T = Element> 剪贴板事件对象
- DragEvent<T = Element> 拖拽事件对象
- ChangeEvent<T = Element> Change 事件对象
- KeyboardEvent<T = Element> 键盘事件对象
- MouseEvent<T = Element> 鼠标事件对象
- TouchEvent<T = Element> 触摸事件对象
- WheelEvent<T = Element> 滚轮事件对象
- AnimationEvent<T = Element> 动画事件对象
- TransitionEvent<T = Element> 过渡事件对象

`T` 接收一个 `DOM` 元素类型

**总结**

上述只是简单的在 `React` 项目使用 `TypeScript`，但在编写 `React` 项目的时候，还存在 `hooks`、默认参数、以及 `store` 等等......

## 11.说说你对工具类型的理解

### Paratial

`Partial` 作用是**将传入的属性变为可选项**。

```typescript
type Person = {
  name: string;
  age: number;
  height: number;
}

type PartialPerson = Partial<Person>;
// PartialPerson 的类型为 {name?: string; age?: number; height?: number;}

const person: PartialPerson = {
  name: "zhangsan";
}
```

Partial的实现：

```typescript
/**
 * Make all properties in T optional
 * 将T中的所有属性设置为可选
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

### Required

`Required` 的作用是将传入的属性变为必选项，和上面的`Partial`恰好相反，其声明如下：

```typescript
/**
 * Make all properties in T required
 * 将T中的所有属性设置为必选
 */
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```

可以看到，这里使用`-?`将属性设置为必选，可以理解为减去问号。使用形式和上面的`Partial`差不多：

```typescript
type Person = {
  name?: string;
  age?: number;
  height?: number;
}

type RequiredPerson = Required<Person>;
// RequiredPerson 的类型为 {name: string; age: number; height: number;}

const person: RequiredPerson = {
  name: "zhangsan";
  age: 18;
  height: 180;
}
```

### Readonly

将T类型的所有属性设置为只读（`readonly`），构造出来类型的属性不能被再次赋值。`Readonly`的声明形式如下：

```typescript
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

来看下面的例子：

```typescript
type Person = {
  name: string;
  age: number;
}

type ReadonlyPerson = Readonly<Person>;

const person: ReadonlyPerson = {
  name: "zhangsan",
  age: 18
}

person.age = 20;  //  Error: cannot reassign a readonly property
```

可以看到，通过 `Readonly` 将`Person`的属性转化成了只读，不能再进行赋值操作。`Readonly` 类型对于冻结对象非常有用。

### Pick<Type, Keys>

从 `Type` 类型中挑选部分属性 `Keys` 来构造新的类型。它的声明形式如下：

```typescript
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

来看下面的例子：

```typescript
type Person = {
  name: string;
  age: number;
  height: number;
}

const person: Pick<Person, "name" | "age"> = {
  name: "zhangsan",
  age: 18
}
```

这样就使用`Pick`从`Person`类型中挑出来了`name`和`age`属性的类型，新的类型中只包含这两个属性。

### Record<Keys, Type>

`Record` 用来构造一个类型，其属性名的类型为`Keys`中的类型，属性值的类型为`Type`。这个工具类型可用来将某个类型的属性映射到另一个类型上，下面是其声明形式：

```typescript
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

来看下面的例子：

```typescript
type Pageinfo = {
    title: string;
}

type Page = 'home' | 'about' | 'contact';

const page: Record<Page, Pageinfo> = {
    about: {title: 'about'},
    contact: {title: 'contact'},
    home: {title: 'home'},
}
```

### Exclude<Type, ExcludedUnion>

`Exclude` 用于从类型`Type`中去除不在`ExcludedUnion`类型中的成员，下面是其声明的形式：

```typescript
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;
```

来看下面的例子：

```typescript
type Person = {
  name: string;
  age: number;
  height: number;
}

const person: Exclude<Person, "age" | "sex"> = {
  name: "zhangsan";
  height: 180;
}
```

里就使用`Exclude`将`Person`类型中的`age`属性给剔除了，只会剔除两个参数中都包含的属性。

### Extract<Type, Union>

`Extract` 用于从类型`Type`中取出可分配给`Union`类型的成员。作用与Exclude相反。下面是它的声明形式：

```typescript
/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;
```

来看下面的例子：

```typescript
type ExtractedType = Extract<"x" | "y" | "z", "x" | "y">;
// "x" | "y"
```

该工具类型对于找出两种类型的公共部分很有用：

```typescript
interface Human {
  id: string;
  name: string;
  surname: string;
}

interface Cat {
  id: string;
  name: string;
  sound: string;
}

// "id" | "name"
type CommonKeys = Extract<keyof Human, keyof Cat>;
```

### Omit<Type, Keys>

上面的 `Pick` 和 `Exclude` 都是最基础的工具类型，很多时候用 `Pick` 或者 `Exclude` 可能不如直接写类型更直接。而 Omit 就基于这两个来做的一个更抽象的封装，它允许从一个对象中剔除若干个属性，剩下的就是需要的新类型。下面是它的声明形式：

```typescript
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

来看下面的例子：

```typescript
type Person = {
  name: string;
  age: number;
  height: number;
}

const person: Omit<Person, "age" | "height"> = {
  name: "zhangsan";
}
```

这样就使用`Omit`从`Person`类型中剔除了 `age` 和 `height` 属性，只剩下 `name` 属性。

### ReturnType

`ReturnType`会返回函数返回值的类型，其声明形式如下：

```typescript
/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

来看下面的例子：

```typescript
function foo(type): boolean {
  return type === 0
}

type FooType = ReturnType<typeof foo>
```

这里使用 `typeof` 是为了获取 `foo` 的函数签名，等价于 `(type: any) => boolean`。

### InstanceType\<Type>

InstanceType 会返回 Type 构造函数类型的实例类型。其声明形式如下：

```typescript
/**
 * Obtain the return type of a constructor function type
 */
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;
```

来看下面的例子：

```typescript
class Person {
  name: string;
  age: number;

  constructor(person: { name: string; age: number }) {
    this.name = person.name;
    this.age = person.age;
  }
}

type PersonInstanceType = InstanceType<typeof Person>;
// PersonInstanceType 的类型：{ name: string; age: number }
```

当然，你可能不会这么写，因为可以直接使用`UserManager`类型：

```typescript
class Person {
  name: string;
  age: number;

  constructor(person: { name: string; age: number }) {
    this.name = person.name;
    this.age = person.age;
  }
}

const person: Person = {
  name: "zhangsan",
  age: 18,
};
```

这就等价于：

```typescript
class Person {
  name: string;
  age: number;

  constructor(person: { name: string; age: number }) {
    this.name = person.name;
    this.age = person.age;
  }
}

type PersonInstanceType = InstanceType<typeof Person>;
                                       
const person: PersonInstanceType = {
  name: "zhangsan",
  age: 18,
};
```

当我们在 TypeScript 中创建动态类时，`InstanceType`可以用于检索动态实例的类型。

### Parameters\<Type>

`Parameters` 可以从函数类型`Type`的参数中使用的类型构造一个元组类型。其声明形式如下：

```typescript
/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```

来看下面的例子：

```typescript
const add = (x: number, y: number) => {
  return x + y;
};

type FunctionParameters = Parameters<typeof add>;
// FunctionParameters 的类型：[x: number, y: number]
```

除此之外，还可以检测单个参数：

```typescript
// "number"
type FirstParam = Parameters<typeof add>[0];

// "number"
type SecondParam = Parameters<typeof add>[1];

// "undefined"
type ThirdParam = Parameters<typeof add>[2];
```

Parameters 对于获取函数参数的类型以确保类型安全很有用，尤其是在使用第三方库时：

```typescript
const saveUser = (user: { name: string; height: number; age: number }) => {
  // ...
};

const user: Parameters<typeof saveUser>[0] = {
  name: "zhangsan",
  height: 180,
  age: 18,
};
```

### ConstructorParameters\<Type>

`ConstructorParameters` 可以从构造函数的类型来构造元组或数组类型。其声明形式如下：

```typescript
/**
 * Obtain the parameters of a constructor function type in a tuple
 */
type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;
```

它类似于参数，但适用于类构造函数：

```typescript
class Person {
  private name: string;
  private age: number;

  constructor(person: { name: string; age: number }) {
    this.name = person.name;
    this.age = person.age;
  }
}

type ConstructorParametersType = ConstructorParameters<typeof Person>;
// ConstructorParametersType 的类型：[person: { name: string, age: number}]
```

与 `Parameters` 类型一样，当使用外部库时，它有助于确保构造函数接受我们传入的参数：

```typescript
class Person {
  private name: string;
  private age: number;

  constructor(person: { name: string; age: number }) {
    this.name = person.name;
    this.age = person.age;
  }
}

const params: ConstructorParameters<typeof Person>[0] = {
  name: "zhangsan",
  age: 18,
};
```

### NonNullable\<Type>

`NonNullable` 通过从`Type`中排除`null`和`undefined`来创建新类型。它就等价于`Exclude<T, null | undefined>`。其声明形式如下：

```typescript
/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T;
```

来看下面的例子：

```typescript
type Type = string | null | undefined; 

// string
type NonNullableType = NonNullable<Type>;
```

这里就使用`NonNullable`将`Type`中的`null`和`undefined`剔除掉了。
