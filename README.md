# 项目介绍

基于 react+react-router+rudux 技术栈开发的一个租房项目

## 项目功能

- 1 登录
- 2 首页

## 导入路由模块

- 安装

```bash
npm i react-router-dom
```

## 引入semantic-ui-react组件库

- 安装

```npm
npm i semantic-ui-react
npm i semantic-ui-css
```

- 引入semantic-ui

```js
// 注意：semantic-ui-react是按需加载
import { Button } from 'semantic-ui-react'
```

- 引入样式文件

```js
// 在index.js中引入 样式文件
import 'semantic-ui-css/semantic.min.css'
```

- 点标记语法原理

```jsx
import React from 'react'
class Home extends React.Component {
  // 点标记语法
  render() {
    return (
      <Form>
        <Form.Input />
        <Form.Button />
      </Form>
    )
  }
}

class Form extends React.Component {
  render() {
    return (
      <div>
        我是一个form组件
        {this.props.children}
      </div>
    )
  }
  // 可以在组件内部去定义组件
  static Input = () => {
    return <div>Input组件</div>
  }

  static Button = () => {
    return <div>Button组件</div>
  }
}

export default Home

```

## 登录功能

### 文本受控组件

 ```jsx 
  //文本框添加 value={ this.state.pwd } onChange={ this.handleChange } 属性
  // 添加受控组件文本改变方法
  handleChange = e => {
    let {name, value} = e.target
    this.setState({
      [name]: value
    })
  }
 ```

### 引入axios

- 安装

```npm
npm i axios
```

- 使用

1. 在index.js文件中引入，不用再每个文件中多次引入

```js
import axios from 'axios'
```
2. 把axios对象绑定到React组件的原型上，将来所有的react组件都能访问到axios对象

```js
React.Component.prototype.axios = axios
```

3. 给axios对象配置默认全局路径

```js
axios.defaults.baseURL = 'http://47.96.21.88:8086/'
```

4. 给axios配置响应拦截器 直接把data中的数据返回
 ```js
 axios.interceptors.response.use(
   function(res) {

   },
   function(err) {

   }
 )
 ```

 ### 登录

 - 设置token

 - 编程式导航跳转到首页

 1. 引入withRouter实现编程式导航

 ```js
import { withRouter } from 'react-router-dom'
 ```

 2. 通过history对象跳转页面

 ```js
 let { history } = this.props

 // 跳转到主页
 history.push('/home')
 ```

 ## 首页

 ### 底部导航

 配置路由，跳转到对应的页面


### 首页问题

- 组件之间传参

问题：用data={ this.state.xxx }传过来的参数用props接收显示为空？

解决方法：

1. 在组件函数内部解构
```js
let { data } = props
```

2. 函数参数解构

```js
function Main({ data }) {}
```

- ajax请求优化

首页的不同组件数据获取的方式除了请求地址和存放数据的数组，其他一样。同样类型的函数太多，如何优化？

1. 定义一个通用的请求方法

```js
  // 优化首页ajax请求
  doRequest = (url, dataName) => {
    return this.axios.post(url).then(res => {
      let { data, meta } = res
      if(meta.status === 200) {
        this.setState({
          [dataName]: data.list
        })
      }
    })
  }
```

2. 使用Promise.all对象

```js
async componentDidMount () {
  await Promise.all([
    this.doRequest('homes/swipe', 'imgList'),
    this.doRequest('homes/menu', 'menuList'),
    this.doRequest('homes/info', 'infoList'),
    this.doRequest('homes/faq', 'faqList'),
    this.doRequest('homes/house', 'houseList')
  ])
  this.setState({
    loading: false
  })
}
```








