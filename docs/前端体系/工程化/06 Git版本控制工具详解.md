---
outline: deep
---

## **认识版本控制（版本控制）**

**什么是版本控制？**

版本控制的英文是 Version control；

是维护工程蓝图的标准作法，能追踪工程蓝图从诞生一直到定案的过程；

版本控制也是一种软件工程技巧，借此能在软件开发的过程中，确保由不同人所编辑的同一程序文件都得到同步；

**简单来说，版本控制在软件开发中，可以帮助程序员进行代码的追踪、维护、控制等等一系列的操作。**

![image-20230425193315448](../../images/image-20230425193315448.png)

## **版本控制的功能**

**对于我们日常开发，我们常常面临如下一些问题，通过版本控制可以很好的解决：**

**不同版本的存储管理：**

一个项目会不断进行版本的迭代，来修复之前的一些问题、增加新的功能、需求，甚至包括项目的重构；

如果我们通过手动来维护一系列的项目备份，简直是一场噩梦；

**重大版本的备份维护：**

对于很多重大的版本，我们会进行备份管理；

**恢复之前的项目版本：**

当我们开发过程中发生一些严重的问题时，想要恢复之前的操作或者回到之前某个版本；

**记录项目的点点滴滴：**

如果我们每一个功能的修改、bug 的修复、新的需求更改都需要记录下来，版本控制可以很好的解决；

**多人开发的代码合并：**

项目中通常都是多人开发，将多人代码进行合并，并且在出现冲突时更好的进行处理；

## **版本控制的历史**

**版本控制的史前时代（没有版本控制）：**

人们通常通过文件备份的方式来进行管理，再通过 diff 命令来对比两个文件的差异；

**CVS（Concurrent Versions System）**

第一个被大规模使用的版本控制工具，诞生于 1985 年；

由荷兰阿姆斯特丹 VU 大学的 Dick Grune 教授实现的，也算是 SVN 的前身（SVN 的出现就是为了取代 CVS 的）。

**SVN（Subversion）**

因其命令行工具名为**svn**因此通常被简称为 SVN；

SVN 由 CollabNet 公司于 2000 年资助并发起开发，目的是取代 CVS，对 CVS 进行了很多的优化；

SVN 和 CVS 一样，也属于集中式版本控制工具；

SVN 在早期公司开发中使用率非常高，但是目前已经被 Git 取代；

**Git（Linus 的作品）**

早期的时候，Linux 社区使用的是 BitKeeper 来进行版本控制；

但是因为一些原因，BitKeeper 想要收回对 Linux 社区的免费授权；

于是 Linus 用了大概一周的时间，开发了 Git 用来取代 BitKeeper；

Linus 完成了 Git 的核心设计，在之后 Linus 功成身退，将 Git 交由另外一个 Git 的主要贡献者 Junio C Hamano 来维护；

## **集中式版本控制**

CVS 和 SVN 都是是属于集中式版本控制系统（Centralized Version Control Systems，简称 CVCS）

它们的主要特点是单一的集中管理的服务器，保存所有文件的修订版本；

协同开发人员通过客户端连接到这台服务器，取出最新的文件或者提交更新；

![image-20230425193450984](../../images/image-20230425193450984.png)

**这种做法带来了许多好处，特别是相较于老式的本地管理来说，每个人都可以在一定程度上看到项目中的其他人正在做些什么。**

**但是集中式版本控制也有一个核心的问题：中央服务器不能出现故障：**

如果宕机一小时，那么在这一小时内，谁都无法提交更新，也就无法协同工作；

如果中心数据库所在的磁盘发生损坏，又没有做恰当备份，毫无疑问你将丢失所有数据；

## **分布式版本控制**

**Git 是属于分布式版本控制系统（Distributed Version Control System，简称 DVCS）**

客户端并不只提取最新版本的文件快照， 而是把代码仓库完整地镜像下来，包括完整的历史记录；

这么一来，任何一处协同工作用的服务器发生故障，事后都可以用任何一个镜像出来的本地仓库恢复；

因为每一次的克隆操作，实际上都是一次对代码仓库的完整备份；

**目前在公司开发中我们都是使用 Git 来管理项目的，所以接下来我们会重点学习 Git 的各种用法；**

![image-20230425193900155](../../images/image-20230425193900155.png)

## **Git 的安装**

**电脑上要想使用 Git，我们需要先对 Git 进行安装：**

Git 的官网：https://git-scm.com/downloads

根据自己的操作系统下载 Git 即可；

**在 window 操作系统按照默认配置全局安装即可；**

## **Bash – CMD – GUI 区别**

**Bash，Unix shell 的一种，Linux 与 Mac OS X 都将它作为默认 shell。**

Git Bash 就是一个 shell，是 Windows 下的命令行工具，可以执行 Linux 命令；

Git Bash 是基于 CMD 的，在 CMD 的基础上增添一些新的命令与功能；

所以建议在使用的时候，用 Bash 更加方便；

**Git CMD**

命令行提示符（CMD）是 Windows 操作系统上的命令行解释程序；

当你在 Windows 上安装 git 并且习惯使用命令行时，可以使用 cmd 来运行 git 命令；

**Git GUI**

基本上针对那些不喜欢黑屏（即命令行）编码的人；

它提供了一个图形用户界面来运行 git 命令；

**上课演练的方式：**

在 Git Bash 中演练 Git 的常见操作；

## **Git 的配置分类**

**既然已经在系统上安装了 Git，你会需要做几件事来定制你的 Git 环境：**

每台计算机上只需要配置一次，程序升级时会保留配置信息；

你可以在任何时候再次通过运行命令来修改它们；

**Git** **自带一个** **git config** **的工具来帮助设置控制** **Git** **外观和行为的配置变量：**

①/etc/gitconfig 文件：包含系统上每一个用户及他们仓库的通用配置

如果在执行 git config 时带上 --system 选项，那么它就会读写该文件中的配置变量；

由于它是系统配置文件，因此你需要管理员或超级用户权限来修改它。（开发中通常不修改）

② （掌握）~/.gitconfig 或 C/用户/coderwhy/.gitconfig 文件：只针对当前用户

你可以传递 --global 选项让 Git 读写此文件，这会对你系统上 所有 的仓库生效；

③ 当前使用仓库的 Git 目录中的 config 文件（即 .git/config）：针对该仓库

你可以传递 --local 选项让 Git 强制读写此文件，虽然默认情况下用的就是它；

![image-20230425195514433](../../images/image-20230425195514433.png)

## **Git 的配置选项**

**安装 Git 后，要做的第一件事就是设置你的用户名和邮件地址。**

这一点很重要，因为每一个 Git 提交都会使用这些信息，它们会写入到你的每一次提交中，不可更改；

如果使用了 --global 选项，那么该命令只需要运行一次，因为之后无论你在该系统上做任何事情， Git 都会使用那些信息；

![image-20230425195601313](../../images/image-20230425195601313.png)

**检测当前的配置信息：git config --list**

![image-20230425195707310](../../images/image-20230425195707310.png)

## **Git 的别名（alias）**

**Git 并不会在你输入部分命令时自动推断出你想要的命令：**

如果不想每次都输入完整的 Git 命令，可以通过 git config 文件来轻松地为每一个命令设置一个别名。

![image-20230425195748116](../../images/image-20230425195748116.png)

## **获取 Git 仓库 – git init/git clone**

**我们需要一个 Git 来管理源代码，那么我们本地也需要有一个 Git 仓库。**

**通常有两种获取 Git 项目仓库的方式：**

方式一：初始化一个 Git 仓库，并且可以将当前项目的文件都添加到 Git 仓库中（目前很多的脚手架在创建项目时都会默认创建一个 Git 仓库）；

方式二：从其它服务器 克隆（clone） 一个已存在的 Git 仓库（第一天到公司通常我们需要做这个操作）；

**方式一：初始化 Git 仓库**

该命令将创建一个名为 .git 的子目录，这个子目录含有你初始化的 Git 仓库中所有的必须文件，这些文件是 Git 仓库的核心；

但是，在这个时候，我们仅仅是做了一个初始化的操作，你的项目里的文件还没有被跟踪；

```javascript
git init
```

**方式二：从 Git 远程仓库**

```javascript
git clone https://github.com/coderwhy/hy-react-web-music.git
```

## **文件的状态划分**

**现在我们的电脑上已经有一个 Git 仓库：**

在实际开发中，你需要将某些文件交由这个 Git 仓库来管理；

并且我们之后会修改文件的内容，当达成某一个目标时，想要记录下来这次操作，就会将它提交到仓库中；

**那么我们需要对文件来划分不同的状态，以确定这个文件是否已经归于 Git 仓库的管理：**

未跟踪：默认情况下，Git 仓库下的文件也没有添加到 Git 仓库管理中，我们需要通过 add 命令来操作；

已跟踪：添加到 Git 仓库管理的文件处于已跟踪状态，Git 可以对其进行各种跟踪管理；

**已跟踪的文件又可以进行细分状态划分：**

staged：暂缓区中的文件状态；

Unmodified：commit 命令，可以将 staged 中文件提交到 Git 仓库

Modified：修改了某个文件后，会处于 Modified 状态；

**在工作时，你可以选择性地将这些修改过的文件放入暂存区；**

**然后提交所有已暂存的修改，如此反复；**

![image-20230425203622113](../../images/image-20230425203622113.png)

## **Git 操作流程图**

![image-20230425203645234](..\..\images\image-20230425203645234.png)

## **检测文件的状态 - git status**

**我们在有 Git 仓库的目录下新建一个文件，查看文件的状态：**

```javascript
git status
```

![image-20230425204617647](../../images/image-20230425204617647.png)

**Untracked files：未跟踪的文件**

未跟踪的文件意味着 Git 在之前的提交中没有这些文件；

Git 不会自动将之纳入跟踪范围，除非你明明白白地告诉它“我需要跟踪该文件”；

**我们也可以查看更加简洁的状态信息：**

![image-20230425204655933](../../images/image-20230425204655933.png)

左栏指明了暂存区的状态，右栏指明了工作区的状态；

## **文件添加到暂存区 – git add**

**跟踪新文件命令：**

```javascript
git add aaa.js
```

使用命令 git add 开始跟踪一个文件。

**跟踪修改的文件命令：**

如果我们已经跟踪了某一个文件，这个时候修改了文件也需要重新添加到暂存区中；

**通过 git add . 将所有的文件添加到暂存区中：**

![image-20230425204819114](../../images/image-20230425204819114.png)

## **git 忽略文件**

**一般我们总会有些文件无需纳入** **Git** **的管理，也不希望它们总出现在未跟踪文件列表。**

通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等；

我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件的模式；

**在实际开发中，这个文件通常不需要手动创建，在必须的时候添加自己的忽略内容即可；**

**比如右侧是创建的 Vue 项目自动创建的忽略文件：**

包括一些不需要提交的文件、文件夹；

包括本地环境变量文件；

包括一些日志文件；

包括一些编辑器自动生成的文件；

![image-20230425205729757](../../images/image-20230425205729757.png)

## **文件更新提交 – git commit**

**现在的暂存区已经准备就绪，可以提交了。**

每次准备提交前，先用 git status 看下，你所需要的文件是不是都已暂存起来了；

再运行提交命令 git commit；

可以在 commit 命令后添加 -m 选项，将提交信息与命令放在同一行;

```javascript
git commit –m "提交信息"
```

![image-20230425220054289](../../images/image-20230425220054289.png)

**如果我们修改文件的 add 操作，加上 commit 的操作有点繁琐，那么可以将两个命令结合来使用：**

```javascript
git commit -a -m "修改了bbb文件"
```

![image-20230425220122447](../../images/image-20230425220122447.png)

## **Git 的校验和**

**Git** **中所有的数据在存储前都计算校验和，然后以** **校验和** **来引用。**

Git 用以计算校验和的机制叫做 SHA-1 散列（hash，哈希）；

这是一个由 40 个十六进制字符（0-9 和 a-f）组成的字符串，基于 Git 中文件的内容或目录结构计算出来；

![image-20230425220204639](../../images/image-20230425220204639.png)

## **查看提交的历史 – git log**

**在提交了若干更新，又或者克隆了某个项目之后，有时候我们想要查看一下所有的历史提交记录。**

**这个时候我们可以使用 git log 命令：**

不传入任何参数的默认情况下，git log 会按时间先后顺序列出所有的提交，最近的更新排在最上面；

这个命令会列出每个提交的 SHA-1 校验和、作者的名字和电子邮件地址、提交时间以及提交说明；

```javascript
git log
```

![image-20230425220311500](../../images/image-20230425220311500.png)

```javascript
git log --pretty=oneline
```

![image-20230425220333129](../../images/image-20230425220333129.png)

```javascript
git log --pretty=oneline --graph
```

![image-20230425220353128](../../images/image-20230425220353128.png)

## **版本回退 – git reset**

**如果想要进行版本回退，我们需要先知道目前处于哪一个版本：Git 通过 HEAD 指针记录当前版本。**

HEAD 是当前分支引用的指针，它总是指向该分支上的最后一次提交；

理解 HEAD 的最简方式，就是将它看做 **该分支上的最后一次提交** 的快照；

![image-20230425220433554](../../images/image-20230425220433554.png)

**我们可以通过 HEAD 来改变 Git 目前的版本指向：**

上一个版本就是 HEAD^，上上一个版本就是 HEAD^^；

如果是上 1000 个版本，我们可以使用 HEAD~1000；

我们可以可以指定某一个 commit id；

```javascript
git reset --hard HEAD^
git reset --hard HEAD~1000
git reset --hard 2d44982
```

## **什么是远程仓库？**

**什么是远程仓库（Remote Repository）呢？**

目前我们的代码是保存在一个本地仓库中，也就意味着我们只是在进行本地操作；

在真实开发中，我们通常是多人开发的，所以我们会将管理的代码共享到远程仓库中；

**那么如何创建一个远程仓库呢？**

远程仓库通常是搭建在某一个服务器上的（当然本地也可以，但是本地很难共享）；

所以我们需要在 Git 服务器上搭建一个远程仓库；

**目前我们有如下方式可以使用 Git 服务器：**

使用第三方的 Git 服务器：比如 GitHub、Gitee、Gitlab 等等；

在自己服务器搭建一个 Git 服务；

![image-20230425221912236](../../images/image-20230425221912236.png)

## **远程仓库的验证**

**常见的远程仓库有哪些呢？目前比较流行使用的是三种：**

GitHub：https://github.com/

Gitee：https://gitee.com/

自己搭建 Gitlab：http://152.136.185.210:7888/

**对于私有的仓库我们想要进行操作，远程仓库会对我们的身份进行验证：**

如果没有验证，任何人都可以随意操作仓库是一件非常危险的事情；

**目前 Git 服务器验证手段主要有两种：**

方式一：基于 HTTP 的凭证存储（Credential Storage）；

方式二：基于 SSH 的密钥；

**下面我们来具体讨论一下这两种方式的验证规则和过程；**

## **远程仓库的验证 – 凭证**

**因为本身 HTTP 协议是无状态的连接，所以每一个连接都需要用户名和密码：**

如果每次都这样操作，那么会非常麻烦；

幸运的是，Git 拥有一个凭证系统来处理这个事情；

**下面有一些** **Git Crediential** **的选项：**

选项一：默认所有都不缓存。 每一次连接都会询问你的用户名和密码；

选项二：“cache” 模式会将凭证存放在内存中一段时间。 密码永远不会被存储在磁盘中，并且在 15 分钟后从内存中清除；

选项三：“store” 模式会将凭证用明文的形式存放在磁盘中，并且永不过期；

选项四：如果你使用的是 Mac，Git 还有一种 “osxkeychain” 模式，它会将凭证缓存到你系统用户的钥匙串中（加密的）；

选项五：如果你使用的是 Windows，你可以安装一个叫做 “Git Credential Manager for Windows” 的辅助工具；

可以在 https://github.com/Microsoft/Git-Credential-Manager-for-Windows 下载。

不过我们在安装 git 的时候已经默认帮我们安装了这个工具，之后只需要手动输入一次用户名和密码就再也不用输入。

怎么查看有没有安装这个工具？

```javascript
git config credential.helper
```

可以看到

```javascript
manager - core;
```

就表示这个工具安装成功了

## **远程仓库的验证 – SSH 密钥**

**Secure Shell（安全外壳协议，简称 SSH）是一种加密的网络传输协议，可在不安全的网络中为网络服务提供安全的传输环境。**

**SSH 以非对称加密实现身份验证。**

例如其中一种方法是使用自动生成的公钥-私钥对来简单地加密网络连接，随后使用密码认证进行登录；

另一种方法是人工生成一对公钥和私钥，通过生成的密钥进行认证，这样就可以在不输入密码的情况下登录；

公钥需要放在待访问的电脑之中，而对应的私钥需要由用户自行保管；

**如果我们以 SSH 的方式访问 Git 仓库，那么就需要生产对应的公钥和私钥：**

```javascript
ssh-keygen -t ed25519 -C "your email"
```

或

```javascript
ssh-keygen -t rsa -b 2048 -C "your email"
```

当然，在使用 SSH 之前需要清除凭证的验证方式，如何清除凭证？

windows 电脑搜索凭据管理器，然后点 Windows 凭据，删除想要删除的凭证即可

![image-20230426234411536](../../images/image-20230426234411536.png)

通过上面的命令可以拿到私钥和公钥，用 vscode 打开公钥，.pub 后缀的是公钥，复制，然后粘贴到 git 服务器中，在设置那配置公钥

![image-20230426234536963](../../images/image-20230426234536963.png)

![image-20230426234655949](..\..\images\image-20230426234655949.png)

## **管理远程服务器**

**查看远程地址：比如我们之前从 GitHub 上 clone 下来的代码，它就是有自己的远程仓库的：**

```javascript
git remote 查看远程仓库名
git remote –v
-v是—verbose的缩写(冗长的)
```

![image-20230427204151464](../../images/image-20230427204151464.png)

**添加远程地址：我们也可以继续添加远程服务器（让本地的仓库和远程服务器仓库建立连接）：**

```javascript
git remote add <shortname> <url>
git remote add gitlab http://152.136.185.210:7888/coderwhy/gitremotedemo.git
```

**重命名远程地址：**

```javascript
git remote rename gitlab glab
```

**移除远程地址：**

```javascript
git remote remove gitlab
```

## **本地分支的上游分支（跟踪分支）**

问题一：当前分支没有 track 的分支

就是执行 git pull 的时候会给下面这个提示

![image-20230427204247975](../../images/image-20230427204247975.png)

原因：当前分支没有和远程的 origin/master 分支进行跟踪

在没有跟踪的情况下，我们直接执行 pull 操作的时候必须指定从哪一个远程仓库中的哪一个分支中获取内容；

比如下面：我们从 origin 远程仓库的 master 分支获取内容

![image-20230427204344627](../../images/image-20230427204344627.png)

git pull 命令相当于 git fetch + git merge，如果我们想要直接执行 git fetch 是有一个前提的：必须给当前分支设置一个跟踪分支：

![image-20230427204732960](../../images/image-20230427204732960.png)

## **拒绝合并不相干的历史**

问题二：合并远程分支时，拒绝合并不相干的历史

![image-20230427204758642](../../images/image-20230427204758642.png)

原因：我们将两个不相干的分支进行了合并：

https://stackoverflow.com/questions/37937984/git-refusing-to-merge-unrelated-histories-on-rebase

![image-20230427204832122](../../images/image-20230427204832122.png)

简单来说就是：过去 git merge 允许将两个没有共同基础的分支进行合并，这导致了一个后果：新创建的项目可能被一个毫不

怀疑的维护者合并了很多没有必要的历史，到一个已经存在的项目中，目前这个命令已经被纠正，但是我们依然可以通过

--allow-unrelated-histories 选项来逃逸这个限制，来合并两个独立的项目；

![image-20230427204859283](../../images/image-20230427204859283.png)

## 流程梳理

我们在本地新建一个项目，执行 git init 初始化一个本地仓库，然后执行

```javascript
git add .
git commit -m "初始化本地仓库"
```

就可以将所有东西添加到本地仓库

那么现在可以从远程仓库 git pull 拉取代码，或者 git push 推送代码吗？不可以，因为本地仓库和远程仓库都还没有建立连接

如何建立连接呢？

![image-20230427205859524](../../images/image-20230427205859524.png)

建立完连接之后，就可以拉取代码了，执行 git pull，会发现报下面的错误

![image-20230427210051720](../../images/image-20230427210051720.png)

虽然本地仓库和远程仓库建立了连接，但是不知道本地仓库的哪个分支和远程仓库的哪个分支在建立连接

可以通过下面命令指定和 origin 远程仓库的 master 分支建立连接

```javascript
git pull origin master
```

但是每次拉取代码都得 git pull 后面跟上要连接的远程分支很麻烦，那么我们就可以给当前的 master 分支设置上游分支，也叫跟踪分支，

通过下面的命令设置 origin/master 这个上游分支

![image-20230427211227129](../../images/image-20230427211227129.png)

设置完之后，继续执行 git pull，发现还是会报错

![image-20230427211418702](../../images/image-20230427211418702.png)

git pull 其实是 git fetch 和 git merge 的结合，现在执行 git fetch 已经没有问题了，就是执行 git merge 会有问题

因为 git merge 命令后面没有跟任何东西，会默认和上游分支也就是 origin/master 分支合并，当然就算执行

git merge origin/master（和 git merge 是等价的）也会报错，

![image-20230427212024179](../../images/image-20230427212024179.png)

这是因为合并远程分支时，拒绝合并不相干的历史，那么就需要执行下面的命令

![image-20230427212154134](../../images/image-20230427212154134.png)

执行完之后，就可以拉取代码了，git pull，就包含本地的代码和远程的代码

刚才因为设置了上游分支，就可以直接 git push 推送代码

## **远程仓库的交互**

**从远程仓库 clone 代码：将存储库克隆到新创建的目录中；**

```javascript
git clone http://152.136.185.210:7888/coderwhy/gitremotedemo.git
```

**将代码 push 到远程仓库：将本地仓库的代码推送到远程仓库中；**

默认情况下是将当前分支（比如 master）push 到 origin 远程仓库的；

```javascript
git push
git push origin master
```

**从远程仓库 fetch 代码：从远程仓库获取最新的代码**

默认情况下是从 origin 中获取代码；

```javascript
git fetch
git fetch origin master
```

获取到代码后默认并没有合并到本地仓库，我们需要通过 merge 来合并；

```javascript
git merge
git merge origin master
```

**从远程仓库 pull 代码：上面的两次操作有点繁琐，我们可以通过一个命令来操作**

```javascript
git pull
git fetch + git merge(rebase)
```

## 到公司之后如何操作

![image-20230427220725222](../../images/image-20230427220725222.png)

## **常见的开源协议**

![image-20230429155014112](..\..\images\image-20230429155014112.png)

基本上比较流行的一些框架使用的都是 MIT 许可证。

## 问题记录

在 github 创建的主分支默认叫 main，而本地的分支叫 master，在设置上游分支完成之后

```javascript
git branch --set-upstream-to=origin/main
```

推送代码，git push 会报错，是因为远程执行 git push 的 push.default（push 操作的默认行为）是 simple，也就是说执行 git push 相当于执行

```javascript
git push origin master:master
```

第 1 个 master 是本地的 master 分支，第 2 个 master 是远程分支，但是远程没有 master 分支，所以会报错

那么，我们就可以设置 push.default 的值，怎么设置呢？

```javascript
git config push.default upstream
```

这里设置 push 到上游分支，那么上游分支的设置才会生效，就可以直接使用 git push，就会将本地的 master 分支推送到远程的 main 分支

push.default 还有另外一个值，叫 current，它和 simple 的区别是，如果远程没有这个分支那么就会在远程创建这个分支，而不是报错

为了演示，新建一个 dev 分支

```javascript
git checkout -b dev
```

修改代码，提交，然后 git push，在这之前设置 push.default

```javascript
git config push.default current
```

设置完之后执行 git push 就会将本地的 dev 分支推送到远程的 dev 分支

## **Git 标签（tag） - 创建 tag**

**对于重大的版本我们常常会打上一个标签，以表示它的重要性：**

Git 可以给仓库历史中的某一个提交打上标签；

比较有代表性的是人们会使用这个功能来标记发布结点（ v1.0 、 v2.0 等等）；

**创建标签：**

Git 支持两种标签：轻量标签（lightweight）与附注标签（annotated）；

```javascript
git tag v1.0
```

附注标签：通过-a 选项，并且通过-m 添加额外信息；

```javascript
git tag -a v1.0 -m "附注标签"
```

如果想看添加的额外信息

```javascript
git show v1.0
```

**默认情况下，git push 命令并不会传送标签到远程仓库服务器上。**

在创建完标签后你必须显式地推送标签到共享服务器上，当其他人从仓库中克隆或拉取，他们也能得到你的那些标签；

```javascript
git push origin v1.0
```

推送所有标签

```javascript
git push origin --tags
```

## **Git 标签（tag） - 删除和检出 tag**

**删除本地 tag：**

要删除掉你本地仓库上的标签，可以使用命令 git tag -d \<tagname>

```javascript
git tag -d v1.1
```

**删除远程 tag：**

要删除远程的 tag 我们可以通过 git push \<remote> –delete \<tagname>

```javascript
git push origin --delete v1.1
```

也可以简写

```javascript
git push origin -d v1.1
```

**检出 tag：**

如果你想查看某个标签所指向的文件版本，可以使用 git checkout 命令；

通常我们在检出 tag 的时候还会创建一个对应的分支（分支后续了解）；

```javascript
git checkout v1.0
```

就是在切换到 v1.0 这个 tag 之后，我们不会直接修改代码，而是新创建一个分支

## **Git 提交对象（Commit Object）**

**几乎所有的版本控制系统都以某种形式支持分支。**

使用分支意味着你可以把你的工作从开发主线上分离开来，以免影响开发主线。

**在进行提交操作时，Git 会保存一个提交对象（commit object）：**

该提交对象会包含一个指向暂存内容快照的指针；

该提交对象还包含了作者的姓名和邮箱、提交时输入的信息以及指向它的父对象的指针；

首次提交产生的提交对象没有父对象(parent 属性)，普通提交操作产生的提交对象有一个父对象；

而由多个分支合并产生的提交对象有多个父对象；

有个 tree 属性

![image-20230430130038555](../../images/image-20230430130038555.png)

git log 本质上是找到最后一个提交对象，然后再通过 parent 属性依次往上找

## **Git master 分支**

**Git 的分支，其实本质上仅仅是指向提交对象的可变指针。**

Git 的默认分支名字是 master，在多次提交操作之后，你其实已经有一个指向最后那个提交对象的 master 分支；

master 分支会在每次提交时自动移动；

**Git 的 master 分支并不是一个特殊分支。**

它就跟其它分支完全没有区别；

之所以几乎每一个仓库都有 master 分支，是因为 git init 命令默认创建它，并且大多数人都懒得去改动它；

![image-20230430132011670](../../images/image-20230430132011670.png)

## **Git 创建分支**

**Git** **是怎么创建新分支的呢？**

很简单，它只是为你创建了一个可以移动的新的指针；

**比如，创建一个** **testing** **分支， 你需要使用** **git branch** **命令：**

```javascript
git branch testing
```

![image-20230430132104905](../../images/image-20230430132104905.png)

**那么，Git 又是怎么知道当前在哪一个分支上呢？**

也很简单，它也是通过一个名为 HEAD 的特殊指针；

![image-20230430132148353](../../images/image-20230430132148353.png)

如果想切换到某一个分支使用 git checkout xxx，比如切换到 testing 分支

```javascript
git checkout testing
```

## **Git 分支提交**

**如果我们指向某一个分支，并且在这个分支上提交：**

如下图，指向 testing 分支，并且进行了提交

![image-20230430132402342](../../images/image-20230430132402342.png)

**你也可以切换回到 master 分支，继续开发：**

![image-20230430132458767](../../images/image-20230430132458767.png)

## **创建分支同时切换**

**创建新分支的同时切换过去**

通常我们会在创建一个新分支后立即切换过去；

这可以用 git checkout -b \<newbranchname> 一条命令搞定；

比如：

```javascript
git checkout -b testing
```

## **为什么需要使用分支呢？**

**让我们来看一个简单的分支新建与分支合并的例子，实际工作中你可能会用到类似的工作流。**

开发某个项目，在默认分支 master 上进行开发；

实现项目的功能需求，不断提交；

并且在一个大的版本完成时，发布版本，打上一个 tag v1.0.0；

**继续开发后续的新功能，正在此时，你突然接到一个电话说有个很严重的问题需要紧急修补， 你将按照如下方式来处理：**

切换到 tag v1.0.0 的版本，并且创建一个分支 hotfix；

**想要新建一个分支并同时切换到那个分支上，你可以运行一个带有** **-b** **参数的** **git checkout** **命令：**

```javascript
git checkout –b hotfix
```

![image-20230430141158433](../../images/image-20230430141158433.png)

## **分支开发和合并**

**分支上开发、修复 bug：**

我们可以在创建的 hotfix 分支上继续开发工作或者修复 bug；

当完成要做的工作后，重新打上一个新的 tag v1.0.1；

**切换回 master 分支，但是这个时候 master 分支也需要修复刚刚的 bug：**

所以我们需要将 master 分支和 hotfix 分支进行合并；

```javascript
git checkout master // 切回master分支
git merge hotfix // 合并hotfix分支的代码
```

![image-20230430141332662](../../images/image-20230430141332662.png)

## **合并冲突（conflict）**

合并代码的时候会产生冲突，那么就需要解决冲突

![image-20230430141458792](../../images/image-20230430141458792.png)

当前在 master 分支，合并 hotfix 分支的代码

Accept Current Change：全部使用 master 分支的代码

Accept Incoming Change：全部使用 hotfix 分支的代码

Accept Both Changes：既保留 master 分支的代码，也保留 hotfix 分支的代码

Compare Changes：选了这个左边是 master 分支的代码，右边是 hotfix 分支的代码，然后再进行合并

![image-20230430141727347](../../images/image-20230430141727347.png)

## **查看和删除分支**

**如果我们希望查看当前所有的分支，可以通过以下命令：**

```javascript
git branch # 查看当前所有的分支
git branch –v # 同时查看最后一次提交
git branch --merged # 查看所有合并到当前分支的分支
git branch --no-merged # 查看所有没有合并到当前分支的分支
```

**如果某些已经合并的分支我们不再需要了，那么可以将其移除掉：**

```javascript
git branch –d hotfix # 删除当前分支
git branch –D hotfix # 强制删除某一个分支
```

## **Git 的工作流（git flow）**

**由于 Git 上分支的使用的便捷性，产生了很多 Git 的工作流：**

也就是说，在整个项目开发周期的不同阶段，你可以同时拥有多个开放的分支；

你可以定期地把某些主题分支合并入其他分支中；

**比如以下的工作流：**

master 作为主分支；

develop 作为开发分支，并且有稳定版本时，合并到 master 分支中；

topic 作为某一个主题或者功能或者特性的分支进行开发，开发完成后合并到 develop 分支中；

![image-20230430142653544](../../images/image-20230430142653544.png)

## **比较常见的 git flow**

![image-20230430142720041](../../images/image-20230430142720041.png)

## **Git 的远程分支**

**远程分支是也是一种分支结构：**

以 \<remote>/\<branch> 的形式命名的；

**如果我们刚刚 clone 下来代码，分支的结构如下：**

![image-20230430144505454](../../images/image-20230430144505454.png)

**如果其他人修改了代码，那么远程分支结构如下：**

你需要通过 fetch 来获取最新的远程分支提交信息；

![image-20230430144708430](../../images/image-20230430144708430.png)

## **远程分支的管理**

**操作一：推送分支到远程**

当你想要公开分享一个分支时，需要将其推送到有写入权限的远程仓库上；

运行 git push \<remote> \<branch>；

```javascript
git push origin <branch>
```

比如：本地新建了一个 develop 分支，想要推送到远程

```javascript
git push origin develop:develop
```

可以简写成

```javascript
git push origin develop
```

**操作二：跟踪远程分支**

当克隆一个仓库时，它通常会自动地创建一个跟踪 origin/master 的 master 分支；

如果你愿意的话可以设置其他的跟踪分支，可以通过运行 git checkout --track \<remote>/\<branch>

如果你尝试检出的分支 (a) 不存在且 (b) 刚好只有一个名字与之匹配的远程分支，那么 Git 就会为你创建一个跟踪分支；

```javascript
git checkout --track <remote>/<branch>
git checkout <branch>
```

本地通过 git init 会默认创建一个 master 分支，但是远程的分支叫 main，名字不一样，我们想要本地建立一个 main 分支和远程的 origin/main 分支进行关联，可以执行

```javascript
git checkout --track origin/main
```

**操作三：删除远程分支**

如果某一个远程分支不再使用，我们想要删除掉，可以运行带有 --delete 选项的 git push 命令来删除一个远程分支。

```javascript
git push origin --delete <branch>
```

## **Git rebase 用法**

**在 Git 中整合来自不同分支的修改主要有两种方法：merge 以及 rebase。**

**什么是 rebase 呢？**

在 Git 中，rebase 叫做 变基；

你可以使用 rebase 命令将提交到某一分支上的所有修改都移至另一分支上，就好像“重新播放”一样；

rebase 这个单词如何理解呢？

我们可以将其理解成改变当前分支的 base；

比如在分支 feature 上执行 rebase master，那么可以改变 feature 的 base 为 master

![image-20230430151522308](../../images/image-20230430151522308.png)

执行

```javascript
git checkout feature
git rebase master
```

![image-20230430150935920](../../images/image-20230430150935920.png)

如果想要将 master 分支的代码进行同步，执行

```javascript
git merge feature
```

![image-20230430151555584](../../images/image-20230430151555584.png)

## **rebase 的原理**

**rebase 是如何工作的呢？**

它的原理是首先找到这两个分支（即当前分支 experiment、变基操作的目标基底分支 master） 的最近共同祖先 C2；

然后对比当前分支相对于该祖先的历次提交，提取相应的修改并存为临时文件；

然后将当前分支指向目标基底 C3；

最后以此将之前另存为临时文件的修改依序应用；

我们可以再次执行 master 上的合并操作：

```javascript
git checkout master
git merge experiment
```

![image-20230430151855414](../../images/image-20230430151855414.png)

## **rebase 和 merge 的选择**

**开发中对于 rebase 和 merge 应该如何选择呢？**

**事实上，rebase 和 merge 是对 Git 历史的不同处理方法：**

merge 用于记录 git 的所有历史，那么分支的历史错综复杂，也全部记录下来；

rebase 用于简化历史记录，将两个分支的历史简化，整个历史更加简洁；

**了解了 rebase 的底层原理，就可以根据自己的特定场景选择 merge 或者 rebase。**

**注意：rebase 有一条黄金法则：永远不要在主分支上使用 rebase**

如果在 main 上面使用 rebase，会造成大量的提交历史在 main 分支中不同；

而多人开发时，其他人依然在原来的 main 中，对于提交历史来说会有很大的变化；

![image-20230430152305321](../../images/image-20230430152305321.png)

## **Git 常见命令速查表**

![image-20230430152447272](..\..\images\image-20230430152447272.png)
