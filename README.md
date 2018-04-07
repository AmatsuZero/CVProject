# 这是一个简历项目

(如果您是非技术人员，你对技术细节不是很了解的话，可以直接查看[静态页面版简历](https://amatsuzero.github.io/CVProject/))  
这个项目本来是受到 [EFResume](https://eyrefree.github.io/EFResume/) 这个项目的启发，本来打算做一个用纯 Swift 写组件的版本（实际上已经做了一部分了，可以见这个[仓库](https://github.com/AmatsuZero/Resume)）,但是在看了几篇面试贴以后，发现目前市场上公司使用 OC 和 Swift 做项目的比例差不多是对半。然而我从去年开始，除了墨刀的那个[Sketch 插件项目](https://zhuanlan.zhihu.com/p/28325423)外，就一直在写 Swift 和 JS 了。为了回顾一下 OC，加上个人觉得 React Native 也是个不错的加分项，于是便有了这个简历项目。  
需要注意的是，**这不是一个简历模板生成项目**，目前所有内容都是固定，如果未来我真的借此获得了更好的机会，或者这个项目真的还是有点用的话，我会考虑重新改造一下这个项目，比如添加个 CLI，从而帮助更多的人造简历。

## 准备

为了运行此项目，你需要确保本机上已经安装了以下工具：

* Node
* react-native-cli
* 最新版 Xcode（因为用到了 ARKit）  
  克隆本项目值本地后，可以在终端直接执行`yarn`或者`npm i`来进行安装。  
  本项目用到了 GA 统计、微信和 QQ 分享的 SDK，由于不想透露 Key，您可以选择将 Key 添加到 process.env，并重新执行安装；

## 亮点

* 所有组件皆为使用 React Native 打造；
* OC 与 Swift 混编；
* iOS（仅限 iOS 11）平台上的 Github Contribution 部分包含[SceneKit](https://github.com/JustinFincher/GitHubContributionsiOS)展示与[ARKit]()两种展示，Android 平台上是通过 WebView 展示；

## 未来计划

* 自动部署。您或许已经注意到了，package.json 里面包含一些非 koa 相关的 package，现在正在开发自动部署的部分，将来计划可以让用户提供证书，就能自动打包->签名->上传 Fir 平台->二维码分享简历；
* 补完测试代码；
* 继续寻找更多更好的简历展示模板或者组件，并把用到所有组件都用[story book](https://github.com/storybooks/storybook)展示（现在仅展示了一部分，您可以通过执行`npm run storybook`来查看）；
* 为了能帮助到现在也在找工作的同学，我们把遇到的和收集到的面试题以单元测试的形式添加到 iOS 项目中（我现在在刷[LeetCode 上面的题](https://github.com/AmatsuZero/Leetcode)的时候就是这么干的，一是可以方便添加各种测试用例，二是因为我觉得以把这些代码写在一个只有 main 函数的 command line tool 的程序里实在太蠢了……）
