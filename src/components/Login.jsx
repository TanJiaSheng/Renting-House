import React from 'react'
// 导入axios
// import axios from 'axios'
// 引入semantic组件
import { Form } from 'semantic-ui-react'
// 引入css样式
import './Login.css'
// 引入withRouter实现编程式导航
import { withRouter } from 'react-router-dom'

class Login extends React.Component {
  // 构造函数
  constructor(props) {
    super(props)
    this.state = {
      uname: '',
      pwd: ''
    }
  }

  // 组件渲染
  render() {
    return (
      <div className="login_container">
        <div className="login_title">登录</div>
        <div className="login_form">
          {/* 
            Form: 表示整个表单组件
            Form.Field：表示表单的一个字段
          */}
          <Form onSubmit={this.login}>
            <Form.Field>
              <Form.Input
                name="uname"
                icon="user"
                iconPosition="left"
                placeholder="请输入用户名..."
                autoComplete="off"
                value={ this.state.uname }
                onChange={ this.handleChange }
                required
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="password"
                name="pwd"
                icon="lock"
                iconPosition="left"
                placeholder="请输入密码..."
                autoComplete="off"
                value={ this.state.pwd }
                onChange={ this.handleChange }
                required
              />
            </Form.Field>
            <Form.Field>
              <Form.Button fluid positive size="big">登录</Form.Button>
            </Form.Field>
          </Form>
        </div>
      </div>
    )
  }

  // 处理受控组件
  handleChange = e => {
    let {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  // 登录功能
  login = async (e) => {
    e.preventDefault()
    let { history } = this.props
    let { uname, pwd } = this.state
    // 发送axios请求
    let res = await this.axios.post('users/login', {
      uname,
      pwd
    })
    let { data, meta } = res
    if (meta.status === 200) {
      // 1. 把token保存到浏览器本地
      localStorage.setItem("token", data.token)
      // 2. 跳转到主页
      history.push('/home')
    } else {

    }
  }
}

export default withRouter(Login)
