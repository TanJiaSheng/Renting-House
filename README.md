#项目介绍

基于 react+react-router+rudux 技术栈开发的一个租房项目

##导入路由模块

- 安装

```bash
npm i react-router-dom
```

##引入semantic-ui-react组件库

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