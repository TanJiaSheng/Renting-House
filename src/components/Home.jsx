import React from 'react'
import './Home.css'
import { Grid, Icon } from 'semantic-ui-react'
import { Switch, Route, NavLink } from 'react-router-dom'
import Main from './home/main/Main'
import Info from './home/info/Info'
import Chat from './home/Chat'
import My from './home/My'


class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="home_content">
          <Switch>
            <Route exact path="/home" component={ Main }></Route>
            <Route path="/home/info" component={ Info }></Route>
            <Route path="/home/chat" component={ Chat }></Route>
            <Route path="/home/my" component={ My }></Route>
          </Switch>
        </div>
        <div className="home_menu">
         <Grid>
          <Grid.Row columns={4}>
            <Grid.Column>
              <NavLink exact to="/home">
                <Icon name="qrcode"></Icon>
                <p>主页</p>
              </NavLink>
            </Grid.Column>
            <Grid.Column>
              <NavLink to="/home/info">
                <Icon name="search"></Icon>
                <p>资讯</p>
              </NavLink>
            </Grid.Column>
            <Grid.Column>
              <NavLink to="/home/chat">
                <Icon name="rocketchat"></Icon>
                <p>微聊</p>
              </NavLink>
            </Grid.Column>
            <Grid.Column>
              <NavLink to="/home/my">
                <Icon name="user"></Icon>
                <p>我的</p>
              </NavLink>
            </Grid.Column>
          </Grid.Row>
         </Grid>
        </div>
      </div>
    )
  }
}

export default Home