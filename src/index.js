import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import 'semantic-ui-css/semantic.min.css'
import App from './App.jsx';

// 导入axios
import axios from 'axios'
// 把axios对象绑定到React组件的原型上，将来所有的react组件都能访问到axios对象
React.Component.prototype.axios = axios

// 给axios对象配置默认全局路径
axios.defaults.baseURL = 'http://47.96.21.88:8086/'

// 给axios配置响应拦截器 直接把data中的数据返回
axios.interceptors.response.use(
  function(response) {
    // console.log(response.data)
    return response.data
  },
  function(error) {
    return error
  }
)

// 配置请求拦截器，每次请求，处了login外，其他页面数据请求都需要带token
axios.interceptors.request.use(
  function(config) {
    if(!window.location.href.endsWith('./login')) {
      config.headers.Authorization = localStorage.getItem('token')
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)


ReactDOM.render(<App />, document.getElementById('root'));

