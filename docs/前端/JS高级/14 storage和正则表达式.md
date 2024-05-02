---
outline: deep
---

## **认识Storage**

**WebStorage主要提供了一种机制，可以让浏览器提供一种比cookie更直观的key、value存储方式：**

localStorage：本地存储，提供的是一种永久性的存储方法，在关闭掉网页重新打开时，存储的内容依然保留；

sessionStorage：会话存储，提供的是本次会话的存储，在关闭掉会话时，存储的内容会被清除；

```javascript
// storage基本使用
// 1.token的操作
let token = localStorage.getItem("token")
if (!token) {
    console.log("从服务器获取token")
    token = "coderwhytokeninfo"
    localStorage.setItem("token", token)
}

// 2.username/password的操作
let username = localStorage.getItem("username")
let password = localStorage.getItem("password")
if (!username || !password) {
    console.log("让用户输入账号和密码")
    username = "coderwhy"
    password = "123456"
    // 将token/username/password保存到storage
    localStorage.setItem("username", username)
    localStorage.setItem("password", password)
}

// 3.后续的操作
console.log(token)
console.log(token.length)
console.log(token + " 哈哈哈")
```

## **localStorage和sessionStorage的区别**

我们会发现localStorage和sessionStorage看起来非常的相似。

**那么它们有什么区别呢？**

验证一：关闭网页后重新打开，localStorage会保留，而sessionStorage会被删除；

```javascript
 // 1.验证一: 关闭网页
// 1.1.localStorage的存储保持
localStorage.setItem("name", "localStorage")

// 1.2.sessionStorage的存储会消失
sessionStorage.setItem("name", "sessionStorage")
```

如何验证？

先执行上面代码存储到浏览器缓存中，然后注释代码，关闭浏览器，再次打开。

验证二：在页面内实现跳转，localStorage会保留，sessionStorage也会保留；

```javascript
<a href="./static/about.html">关于</a>

// 2.验证二: 打开新的网页
localStorage.setItem("info", "local")
sessionStorage.setItem("info", "session")
```

在当前标签页实现跳转，两个都会保留。

验证三：在页面外实现跳转（打开新的网页），localStorage会保留，sessionStorage不会被保留；

```javascript
<a href="./static/about.html" target="_blank">关于</a>

// 3.验证三: 打开新的页面, 并且是在新的标签中打开
localStorage.setItem("infoTab", "local")
sessionStorage.setItem("infoTab", "session")
```

在新的标签页中打开，localStorage会保留，sessionStorage不会被保留。

## **Storage常见的方法和属性**

**Storage有如下的属性和方法：**

**属性：**

Storage.length：只读属性

返回一个整数，表示存储在Storage对象中的数据项数量；

方法：

Storage.key(index)：该方法接受一个数值n作为参数，返回存储中的第n个key名称；

Storage.getItem()：该方法接受一个key作为参数，并且返回key对应的value；

Storage.setItem()：该方法接受一个key和value，并且将会把key和value添加到存储中。

如果key存储，则更新其对应的值；

Storage.removeItem()：该方法接受一个key作为参数，并把该key从存储中删除；

Storage.clear()：该方法的作用是清空存储中的所有key；

```javascript
const ACCESS_TOKEN = "token" // 抽取常量，避免错误

console.log(localStorage.length)
// 常见的方法:
localStorage.setItem(ACCESS_TOKEN, "whytoken")
console.log(localStorage.getItem(ACCESS_TOKEN))

// 其他方法
console.log(localStorage.key(0))
console.log(localStorage.key(1))
console.log(localStorage.removeItem("infoTab"))
localStorage.clear()
```

## Storage工具封装

```javascript
<script src="./js/cache.js"></script>
<script>

localCache.setCache("sno", 111)

// storage本身是不能直接存储对象类型的
const userInfo = {
    name: "why",
    nickname: "coderwhy",
    level: 100,
    imgURL: "http://github.com/coderwhy.png"
}

// localStorage.setItem("userInfo", JSON.stringify(userInfo))
// console.log(JSON.parse(localStorage.getItem("userInfo")))

sessionCache.setCache("userInfo", userInfo)
console.log(sessionCache.getCache("userInfo"))

</script>
```

```javascript
class Cache {
  constructor(isLocal = true) {
    this.storage = isLocal ? localStorage: sessionStorage
  }

  setCache(key, value) {
    if (!value) {
      throw new Error("value error: value必须有值!")
    }

    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key) {
    const result = this.storage.getItem(key)
    if (result) {
      return JSON.parse(result)
    }
  }

  removeCache(key) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

const localCache = new Cache()
const sessionCache = new Cache(false)
```

## **什么是正则表达式？**

**我们先来看一下维基百科对正则表达式的解释：**

**正则表达式**（英语：Regular Expression，常简写为regex、regexp或RE），又称**正则表示式**、**正则表示法**、**规则表达式**、**常**

**规表示法**，是计算机科学的一个概念**；**

正则表达式使用单个字符串来描述、匹配一系列匹配某个句法规则的字符串**。**

许多程序设计语言都支持利用正则表达式进行字符串操作。

**简单概况：正则表达式是一种字符串匹配利器，可以帮助我们搜索、获取、替代字符串；**

**在JavaScript中，正则表达式使用RegExp类来创建，也有对应的字面量的方式：**

正则表达式主要由两部分组成：模式（patterns）和修饰符（flags）

```javascript
// 创建正则
// 1> 匹配的规则pattern
// 2> 匹配的修饰符flags
const re1 = new RegExp("abc", "ig")
const re2 = /abc/ig // 我是注释
```

## 正则表达式的演练

```javascript
// 创建正则
const re1 = /abc/ig

const message = "fdabc123 faBC323 dfABC222 A2324aaBc"

// 1.使用正则对象上的实例方法


// 2.使用字符串的方法, 传入一个正则表达式
// 需求: 将所有的abc(忽略大小写)换成cba
// const newMessage = message.replaceAll("abc", "cba")
// console.log(newMessage)

const newMessage = message.replaceAll(/abc/ig, "cba")
console.log(newMessage)

// 需求: 将字符串中数字全部删除
const newMessage2 = message.replaceAll(/\d+/ig, "") // \d表示数字，+表示一个或多个
console.log(newMessage2)
```

## **正则表达式的使用方法**

**有了正则表达式我们要如何使用它呢？**

JavaScript中的正则表达式被用于 RegExp 的 exec 和 test 方法；

也包括 String 的 match、matchAll、replace、search 和 split 方法；

![image-20230226193146959](http://139.196.79.103:9001/myimages/imgs/image-20230226193146959.png)

test和match方法在开发中用的比较多

```javascript
// 创建正则
const re1 = /abc/ig
const message = "fdabc123 faBC323 dfABC222 A2324aaBc"

// 1.使用正则对象上的实例方法
// webpack -> loader -> test: 匹配文件名
// 正则 -> 拿到文件 -> loader操作
// 1.1.test方法: 检测某一个字符串是否符合正则的规则
if (re1.test(message)) { // 只要包含abc就符合
    console.log("message符合规则")
} else {
    console.log("message不符合规则")
}
```

下面通过一个案例，来使用test方法

```javascript
输入账号: <input type="text">
<p class="tip">请输入账号</p>

// 案例: 让用户输入的账号必须是5-8个a
const inputEl = document.querySelector("input")
const tipEl = document.querySelector(".tip")

inputEl.oninput = function() {
    const value = this.value
    if (/^a{5,8}$/.test(value)) {
        tipEl.textContent = "输入的内容符合规则要求"
    } else {
        tipEl.textContent =  "输入的内容不符合规则要求, 请重新输入"
    }
}
```

```javascript
// 1.2.exec方法: 使用正则执行一个字符串
const res1 = re1.exec(message)
console.log(res1)
```

![image-20230226194842626](http://139.196.79.103:9001/myimages/imgs/image-20230226194842626.png)

```javascript
// 2.使用字符串的方法, 传入一个正则表达式
// 2.1. match方法:
const result2 = message.match(re1)
console.log(result2) //  ['abc', 'aBC', 'ABC', 'aBc']

// 2.2. matchAll方法
// 注意: matchAll传入的正则修饰符必须加g
const result3 = message.matchAll(re1)
// console.log(result3.next())
// console.log(result3.next())
// console.log(result3.next())
// console.log(result3.next())
for (const item of result3) {
    console.log(item)
}

// 2.3. replace/replaceAll方法

// 2.4. split方法
const result4 = message.split(re1)
console.log(result4)

// 2.5. search方法
const result5 = message.search(re1)
console.log(result5)
```

## **修饰符flag的使用**

常见的修饰符：

![image-20230226201808180](http://139.196.79.103:9001/myimages/imgs/image-20230226201808180.png)

需求：

获取一个字符串中所有的abc；

将一个字符串中的所有abc换成大写；

![image-20230226201912231](http://139.196.79.103:9001/myimages/imgs/image-20230226201912231.png)

## **规则 – 字符类（Character classes）**

**字符类（Character classes）** 是一个特殊的符号，匹配特定集中的任何符号。

![image-20230226201949132](http://139.196.79.103:9001/myimages/imgs/image-20230226201949132.png)

**反向类（Inverse classes）**

\D 非数字：除 \d 以外的任何字符，例如字母。

\S 非空格符号：除 \s 以外的任何字符，例如字母。

\W 非单字字符：除 \w 以外的任何字符，例如非拉丁字母或空格。

```javascript
const message = "fdaa4 22242asfasdf2242"

const re = /\d+/ig

// \d -> 所有的数字 0~9
console.log(message.match(re))
```

## **规则 – 锚点（Anchors）**

**符号 ^ 和符号 $ 在正则表达式中具有特殊的意义，它们被称为“锚点”。**

符号 ^ 匹配文本开头；

符号 $ 匹配文本末尾；

```javascript
const message = "My name is WHY."

// 字符串方法，有局限性，必须完全匹配
if (message.startsWith("my")) {
    console.log("以my开头")
}
if (message.endsWith("why")) {
    console.log("以why结尾")
}

// 正则: 锚点
if (/^my/i.test(message)) {
    console.log("以my开头")
}

if (/why\.$/i.test(message)) { // .需要进行转义
    console.log("以why.结尾")
}


const re = /^coder$/
const info = "codaaaer"
console.log(re.test(info)) // false d后面必须是e
```

**词边界（Word boundary）**

词边界 \b 是一种检查，就像 ^ 和 $ 一样，它会检查字符串中的位置是否是词边界。

词边界测试 \b 检查位置的一侧是否匹配 \w，而另一侧则不匹配 “\w”

```javascript
// \w
const message = "My name! is WHY."

// 需求: name, name必须是一个单独的词
// name的左右两边不能有\w，！不属于\w
// 词边界
if (/\bname\b/i.test(message)) { // true !
    console.log("有name, name有边界")
}

// 词边界的应用
const infos = "now time is 11:56, 12:00 eat food, number is 123:456"
const timeRe = /\b\d\d:\d\d\b/ig
console.log(infos.match(timeRe)) // ["11:56", "12:00"]
```

## 规则 – 转义字符

**如果要把特殊字符作为常规字符来使用，需要对其进行转义：**

只需要在它前面加个反斜杠；

**常见的需要转义的字符：**

```javascript
[] \ ^ $ . | ? * + ( )
```

斜杠符号 ‘/’ 并不是一个特殊符号，但是在字面量正则表达式中也需要转义；

```javascript
 // 定义正则: 对.转义
const re = /\./ig
const message = "abc.why"

const results = message.match(re)
console.log(results)


// 特殊: /
const re2 = /\//
```

**练习：匹配所有以.js或者jsx结尾的文件名**

在webpack当中，匹配文件名时就是以这样的方式。

```javascript
// 获取到很多的文件名
// jsx -> js文件
const fileNames = ["abc.html", "Home.jsx", "index.html", "index.js", "util.js", "format.js"]
// 获取所有的js的文件名(webpack)
// x?: x是0个或者1个
const jsfileRe = /\.jsx?$/
// 1.for循环做法
// const newFileNames = []
// for (const filename of fileNames) {
//   if (jsfileRe.test(filename)) {
//     newFileNames.push(filename)
//   }
// }
// console.log(newFileNames)

// 2.filter高阶函数
const newFileNames = fileNames.filter(filename => jsfileRe.test(filename))
console.log(newFileNames)
```

## **集合（Sets）和范围（Ranges）**

**有时候我们只要选择多个匹配字符的其中之一就可以：**

在方括号 […] 中的几个字符或者字符类意味着“搜索给定的字符中的任意一个”；

**集合（Sets）**

比如说，[eao] 意味着查找在 3 个字符 ‘a’、‘e’ 或者 `‘o’ 中的任意一个；

```javascript
// 手机号的规则: 1[3456789]033334444
const phoneStarts = ["132", "130", "110", "120", "133", "155"]
const phoneStartRe = /^1[3456789]\d/ // [3456789]表示3-9中的任意一个
const filterPhone = phoneStarts.filter(phone => phoneStartRe.test(phone))
console.log(filterPhone)
```

**范围（Ranges）**

方括号也可以包含字符范围；

比如说，[a-z] 会匹配从 a 到 z 范围内的字母，[0-5] 表示从 0 到 5 的数字；

[0-9A-F] 表示两个范围：它搜索一个字符，满足数字 0 到 9 或字母 A 到 F；

\d —— 和 [0-9] 相同；

\w —— 和 [a-zA-Z0-9_] 相同；

```javascript
const phoneNum = "133888855555"
const phoneRe = /^1[3-9]\d{9}$/ // 1开头，第2位3-9，后面9个数字
console.log(phoneRe.test(phoneNum))
```

**排除范围：除了普通的范围匹配，还有类似 [^…] 的“排除”范围匹配；**

```javascript
// 了解: 排除范围
// \d -> [0-9]
// \D -> [^0-9] 不是0-9
```

## **量词（Quantifiers）**

**假设我们有一个字符串 +7(903)-123-45-67，并且想要找到它包含的所有数字。**

因为它们的数量是不同的，所以我们需要给与数量一个范围；

用来形容我们所需要的数量的词被称为**量词（** **Quantifiers** **）**。

**数量 \{n}**

确切的位数：\{5}

某个范围的位数：\{3,5}

**缩写：**

+：代表“一个或多个”，相当于 \{1,}

?：代表“零个或一个”，相当于 \{0,1}。换句话说，它使得符号变得可选；

*：代表着“零个或多个”，相当于 \{0,}。也就是说，这个字符可以多次出现或不出现；

```javascript
// 1.量词的使用
const re = /a{3,5}/ig
const message = "fdaaa2fdaaaaaasf42532fdaagjkljlaaaaf"

const results = message.match(re)
console.log(results)

// 2.常见的符号: +/?/*
// +: {1,}
// ?: {0,1}
// *: {0,}
```

**案例：匹配开始或结束标签**

```javascript
// 3.案例: 字符串的html元素, 匹配出来里面所有的标签
const htmlElement = "<div><span>哈哈哈</span><h2>我是标题</h2></div>"
const tagRe = /<\/?[a-z][a-z0-9]*>/ig
const results2 = htmlElement.match(tagRe)
console.log(results2)
```

## **贪婪（Greedy）和惰性（lazy）模式**

**如果我们有这样一个需求：匹配下面字符串中所有使用《》包裹的内容**

```javascript
// 1.贪婪模式/惰性模式
const message = "我最喜欢的两本书: 《黄金时代》和《沉默的大多数》、《一只特立独行的猪》"

// 默认.+采用贪婪模式
// const nameRe = /《.+》/ig

// const result1 = message.match(nameRe)
// console.log(result1) // 《黄金时代》和《沉默的大多数》、《一只特立独行的猪》

// 使用惰性模式
const nameRe = /《.+?》/ig

const result1 = message.match(nameRe)
console.log(result1) // ['《黄金时代》', '《沉默的大多数》', '《一只特立独行的猪》']
```

**默认情况下的匹配规则是查找到匹配的内容后，会继续向后查找，一直找到最后一个匹配的内容**

这种匹配的方式，我们称之为贪婪模式（Greedy）

**懒惰模式中的量词与贪婪模式中的是相反的。**

只要获取到对应的内容后，就不再继续向后匹配；

我们可以在量词后面再加一个问号 ‘?’ 来启用它；

所以匹配模式变为 *? 或 +?，甚至将 '?' 变为 ??

## **捕获组（capturing group）**

**模式的一部分可以用括号括起来 (...)，这称为“捕获组（capturing group）”。**

**这有两个作用：**

它允许将匹配的一部分作为结果数组中的单独项；

它将括号视为一个整体；

```javascript
// 2.将捕获组作为整体
const info = "dfabcabcfabcdfdabcabcabcljll;jk;j"
const abcRe = /(abc){2,}/ig
console.log(info.match(abcRe)) // ['abcabc', 'abcabcabc']
```

有的时候我们只想拿到书名中间的文字，那就可以使用捕获组，使用（）作为一个整体，下面分成三组

```javascript
// 1.捕获组
const message = "我最喜欢的两本书: 《黄金时代》和《沉默的大多数》、《一只特立独行的猪》"

// 使用惰性模式
const nameRe = /(《)(.+?)(》)/ig
const iterator = message.matchAll(nameRe)
for (const item of iterator) {
    console.log(item)
}
```

![image-20230226223758770](http://139.196.79.103:9001/myimages/imgs/image-20230226223758770.png)

这样，就可以根据索引拿到想要的

当然，有的时候，根据索引来获取比较难记住索引，可以使用命名组。

**命名组：**

用数字记录组很困难。

对于更复杂的模式，计算括号很不方便。我们有一个更好的选择：给括号起个名字。

这是通过在开始括号之后立即放置 ?\<name> 来完成的。

```javascript
// 1.捕获组
const message = "我最喜欢的两本书: 《黄金时代》和《沉默的大多数》、《一只特立独行的猪》"

// 使用惰性模式
const nameRe = /(《)(?<why>.+?)(》)/ig // 这里使用命名组
const iterator = message.matchAll(nameRe)
for (const item of iterator) {
    console.log(item)
}
```

![image-20230226224121549](http://139.196.79.103:9001/myimages/imgs/image-20230226224121549.png)

上面的结果显示"《"和"》"，如果不想让结果显示，可以使用非捕获组

**非捕获组：**

有时我们需要括号才能正确应用量词，但我们不希望它们的内容出现在结果中。

可以通过在开头添加 ?: 来排除组。

```javascript
// 1.捕获组
const message = "我最喜欢的两本书: 《黄金时代》和《沉默的大多数》、《一只特立独行的猪》"

// 使用惰性模式
const nameRe = /(?:《)(?<why>.+?)(?:》)/ig // 这里对《和》使用非捕获组
const iterator = message.matchAll(nameRe)
for (const item of iterator) {
    console.log(item)
}
```

![image-20230226224415350](http://139.196.79.103:9001/myimages/imgs/image-20230226224415350.png)

**or是正则表达式中的一个术语，实际上是一个简单的“或”。**

在正则表达式中，它用竖线 | 表示；

通常会和捕获组一起来使用，在其中表示多个值；

```javascript
// 1.将捕获组作为整体
const info = "dfabcabcfabcdfdabcabcabcljcbacballnbanba;jk;j"
const abcRe = /(abc|cba|nba){2,}/ig
console.log(info.match(abcRe)) // ['abcabc', 'abcabcabc', 'cbacba', 'nbanba']
```

## **案例练习 – 歌词解析**

```javascript
/*
      currentTime: 2000

      [00:00.000] 作词 : 许嵩 -> { time: 0, content: "作词 : 许嵩" }
      [00:01.000] 作曲 : 许嵩 -> { time: 1000, content: "作曲 : 许嵩" }
      [00:02.000] 编曲 : 许嵩
      [00:22.240]天空好想下雨
    */
    const lyricString = "[00:00.000] 作词 : 许嵩\n[00:01.000] 作曲 : 许嵩\n[00:02.000] 编曲 : 许嵩\n[00:22.240]天空好想下雨\n[00:24.380]我好想住你隔壁\n[00:26.810]傻站在你家楼下\n[00:29.500]抬起头数乌云\n[00:31.160]如果场景里出现一架钢琴\n[00:33.640]我会唱歌给你听\n[00:35.900]哪怕好多盆水往下淋\n[00:41.060]夏天快要过去\n[00:43.340]请你少买冰淇淋\n[00:45.680]天凉就别穿短裙\n[00:47.830]别再那么淘气\n[00:50.060]如果有时不那么开心\n[00:52.470]我愿意将格洛米借给你\n[00:55.020]你其实明白我心意\n[00:58.290]为你唱这首歌没有什么风格\n[01:02.976]它仅仅代表着我想给你快乐\n[01:07.840]为你解冻冰河为你做一只扑火的飞蛾\n[01:12.998]没有什么事情是不值得\n[01:17.489]为你唱这首歌没有什么风格\n[01:21.998]它仅仅代表着我希望你快乐\n[01:26.688]为你辗转反侧为你放弃世界有何不可\n[01:32.328]夏末秋凉里带一点温热有换季的颜色\n[01:41.040]\n[01:57.908]天空好想下雨\n[01:59.378]我好想住你隔壁\n[02:02.296]傻站在你家楼下\n[02:03.846]抬起头数乌云\n[02:06.183]如果场景里出现一架钢琴\n[02:08.875]我会唱歌给你听\n[02:10.974]哪怕好多盆水往下淋\n[02:15.325]夏天快要过去\n[02:18.345]请你少买冰淇淋\n[02:21.484]天凉就别穿短裙\n[02:22.914]别再那么淘气\n[02:25.185]如果有时不那么开心\n[02:27.625]我愿意将格洛米借给你\n[02:30.015]你其实明白我心意\n[02:33.327]为你唱这首歌没有什么风格\n[02:37.976]它仅仅代表着我想给你快乐\n[02:42.835]为你解冻冰河为你做一只扑火的飞蛾\n[02:48.406]没有什么事情是不值得\n[02:52.416]为你唱这首歌没有什么风格\n[02:57.077]它仅仅代表着我希望你快乐\n[03:01.993]为你辗转反侧为你放弃世界有何不可\n[03:07.494]夏末秋凉里带一点温热\n[03:11.536]\n[03:20.924]为你解冻冰河为你做一只扑火的飞蛾\n[03:26.615]没有什么事情是不值得\n[03:30.525]为你唱这首歌没有什么风格\n[03:35.196]它仅仅代表着我希望你快乐\n[03:39.946]为你辗转反侧为你放弃世界有何不可\n[03:45.644]夏末秋凉里带一点温热有换季的颜色\n"

    // 一. 没有封装
    // 1.根据\n切割字符串
    const lyricLineStrings = lyricString.split("\n")
    // console.log(lyricLineStrings)

    // 2.针对每一行歌词进行解析
    // [01:22.550]夏末秋凉里带一点温热有换季的颜色
    const timeRe = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/i
    const lyricInfos = []
    for (const lineString of lyricLineStrings) {
        // 1.获取时间
        const result = lineString.match(timeRe)
        if (!result) continue // 最后一个result是空字符串
        const minuteTime = result[1] * 60 * 1000
        const secondTime = result[2] * 1000
        const mSecondTime = result[3].length === 3? result[3]*1: result[3]*10 // 毫秒只有两位要乘10
        const time = minuteTime + secondTime + mSecondTime

        // 2.获取内容
        const content = lineString.replace(timeRe, "").trim()

        // 3.将对象放到数组中
        lyricInfos.push({ time, content })
    }
	console.log(lyricInfos)

// 二.封装工具: 解析歌词
// const lyricInfos = parseLyric(lyricString)
// console.log(lyricInfos)
```

```javascript
function parseLyric(lyricString) {
  // 1.根据\n切割字符串
  const lyricLineStrings = lyricString.split("\n")
  // console.log(lyricLineStrings)

  // 2.针对每一行歌词进行解析
  // [01:22.550]夏末秋凉里带一点温热有换季的颜色
  const timeRe = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/i
  const lyricInfos = []
  for (const lineString of lyricLineStrings) {
    // 1.获取时间
    const result = lineString.match(timeRe)
    if (!result) continue
    const minuteTime = result[1] * 60 * 1000
    const secondTime = result[2] * 1000
    const mSecondTime = result[3].length === 3? result[3]*1: result[3]*10
    const time = minuteTime + secondTime + mSecondTime
    
    // 2.获取内容
    const content = lineString.replace(timeRe, "").trim()

    // 3.将对象放到数组中
    lyricInfos.push({ time, content })
  }

  return lyricInfos
}
```

## **案例练习 – 时间格式化**

**时间格式化：从服务器拿到时间戳，转成想要的时间格式**

```html
<h2 class="time"></h2>

<script>

    // timestamp: 1659252290626
    // yyyy/MM/dd hh:mm:ss
    // yyyy*MM*dd hh-mm-ss
    // dayjs/moment
    function formatTime(timestamp, fmtString) {
        // 1.将时间戳转成Date
        const date = new Date(timestamp)

        // // 2.获取到值
        // const year = date.getFullYear()
        // const month = date.getMonth() + 1
        // const day = date.getDate()
        // const hour = date.getHours()
        // const minute = date.getMinutes()
        // const second = date.getSeconds()

        // // 3.创建正则
        // const yearRe = /y+/
        // const monthRe = /M+/

        // 2.正则和值匹配起来
        const dateO = {
            "y+": date.getFullYear(),
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds()
        }

        // 3.for循环进行替换
        for (const key in dateO) {
            const keyRe = new RegExp(key)
            if (keyRe.test(fmtString)) {
                const value = (dateO[key] + "").padStart(2, "0") // 只有1位，前面补0
                fmtString = fmtString.replace(keyRe, value)
            }
        }

        return fmtString
    }

    // 某一个商品上架时间, 活动的结束时间
    const timeEl = document.querySelector(".time")
    const productJSON = {
        name: "iPhone",
        newPrice: 4999,
        oldPrice: 5999,
        endTime: 1659252301637
    }
    timeEl.textContent = formatTime(productJSON.endTime, "hh:mm:ss yyyy*MM*dd")

</script>
```

