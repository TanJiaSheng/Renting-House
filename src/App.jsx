import React from "react"
// 引入路由
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'

class App extends React.Component {
  render () {
    return (
     <Router>
        {/* 配置路由 */}
        <Switch>
          <Redirect exact path="/" to="/login" />
          <Route path="/home" component={ Home } />
          <Route path="/login" component={ Login } />
        </Switch>
     </Router>
    )
  }
}

export default App