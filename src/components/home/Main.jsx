import React from 'react'
import "react-image-gallery/styles/css/image-gallery.css"
import './Main.css'
import { Input, Grid, Icon, Item, Button } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'
// 导入轮播图组件
import ImageGallery from 'react-image-gallery'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imgList: [],
      menuList: [],
      infoList: [],
      faqList: [],
      houseList: []
    }
  }
  render() {
    return (
      <div className="main">
        <div className="search">
          <Input icon={{ name: 'search', circular: true, link: true }} placeholder='搜房源...' fluid />
        </div>
        <div className="content">
          {/* 轮播图 */}
          <ImageGallery
            items={this.state.imgList}
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
            showBullets={true}
            autoPlay={true}
          />
          {/* 菜单部分 */}
          <Menu data={ this.state.menuList }/>
          {/* 咨询部分 */}
          <Info data={ this.state.infoList }/>
          {/* 问答部分 */}
          <Faq data={ this.state.faqList }/>
          {/* 房屋部分 */}
          <House data={this.state.houseList }/>
        </div>
      </div>
    )
  }

  // 页面加载完成，发送ajax请求，获取页面数据
  componentDidMount () {
    this.getSwipe()
    this.getMenuList()
    this.getInfoList()
    this.getFaqList()
    this.getHouseList()
  }
  // 获取轮播图数据
  getSwipe = async () => {
    // 发送ajax请求
    let res = await this.axios.post('homes/swipe')
    let { data, meta } = res
    if(meta.status === 200) {
      // 同步数据
      this.state.imgList = data.list
      this.setState(this.state)
    }
  }

  // 获取菜单数据
  getMenuList = async () => {
    let res = await this.axios.post('homes/menu')
    let { data, meta } = res
    if(meta.status === 200) {
      // 同步数据
      this.state.menuList = data.list
      this.setState(this.state)
    }
  }

  // 获取咨询数据
  getInfoList = async () => {
    let res = await this.axios.post('homes/info')
    let { data, meta } = res
    if(meta.status === 200) {
      // 同步数据
      this.state.infoList = data.list
      this.setState(this.state)
    }
  }

  // 获取问答参数
  getFaqList = async () => {
    let res = await this.axios.post('homes/faq')
    let { data, meta } = res
    if(meta.status === 200) {
      // 同步数据
      this.state.faqList = data.list
      this.setState(this.state)
    }
  }

  getHouseList = async () => {
    let res = await this.axios.post('homes/house')
    let { data, meta } = res
    if(meta.status === 200) {
      // 同步数据
      this.state.houseList = data.list
      this.setState(this.state)
    }
  }
}

// 定义菜单组件，渲染菜单数据
// {data} 参数结构
/* function Menu ({ data }) {
  return (
    <Grid padded divided className="menu">
      <Grid.Row columns={4}>
      {
        data.map(item => (
          <Grid.Column key={item.id}>
            <div className="home-menu-item">
              <Icon name="home" size="big" />
            </div>
            <div>{ item.menu_name }</div>
          </Grid.Column>
        ))
      }
      </Grid.Row>
    </Grid>
  )
} */

// class方式
class Menu extends React.Component {
  constructor(props) {
    super(props) 
  }
  render() {
    let { data } = this.props
    return (
      <Grid padded divided className="menu">
        <Grid.Row columns={4}>
        {
          data.map(item => (
            <Grid.Column key={item.id}>
              <div className="home-menu-item">
                <Icon name="home" size="big" />
              </div>
              <div>{ item.menu_name }</div>
            </Grid.Column>
          ))
        }
        </Grid.Row>
      </Grid>
    )
  }
}

// 定义咨询组件
class Info extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { data } = this.props
    return (
      <div className="home-msg">
        <Item.Group unstackable>
          <Item className="home-msg-img">
            <Item.Image 
              src={'http://47.96.21.88:8086/public/zixun.png'}
              szie="tiny"
            />
            <Item.Content verticalAlign="top">
              {
                data.map(item => (
                  <Item.Header key={ item.id }>
                    <span>限购 ●</span>
                    <span>{item.info_title}</span>
                  </Item.Header>
                ))
              }
              <div className="home-msg-more">
                <Icon name="angle right" size="big"/>
              </div>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    )
  }
}

class Faq extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { data } = this.props
    return (
      <div className="home-ask">
        <div className="home-ask-title">好客问答</div>
        <ul>
          {data.map(item => (
            <li key={item.question_id}>
              <div>
                <Icon color="green" name="question circle outline" />
                <span>{item.question_name}</span>
              </div>
              <div>
                {item.question_tag.split(',').map(tag => (
                  <Button key={tag} basic color="green" size="mini">
                    {tag}
                  </Button>
                ))}
                <div>
                  {item.atime} ● <Icon name="comment alternate outline" />{' '}
                  {item.qnum}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

class House extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { data } = this.props
    let newHouse = []
    let oldHouse = []
    let hireHouse = []
    data.forEach(item => {
      let temp = (
        <Item key={item.id}>
          <Item.Image src="http://47.96.21.88:8086/public/home.png" />
          <Item.Content>
            <Item.Header>{item.home_name}</Item.Header>
            <Item.Meta>
              <span className="cinema">{item.home_desc}</span>
            </Item.Meta>
            <Item.Description>
              {item.home_tags.split(',').map(tag => (
                <Button key={tag} basic color="green" size="mini">
                  {tag}
                </Button>
              ))}
            </Item.Description>
            <Item.Description>{item.home_price}</Item.Description>
          </Item.Content>
        </Item>
      )
      if (item.home_type === 1) {
        newHouse.push(temp)
      } else if (item.home_type === 2) {
        oldHouse.push(temp)
      } else {
        hireHouse.push(temp)
      }
    })
    // console.log(data)
    return (
      <div>
        <div>
          <div className="home-hire-title">最新开盘</div>
          <Item.Group divided unstackable>
            {newHouse}
          </Item.Group>
        </div>
        <div>
          <div className="home-hire-title">二手精选</div>
          <Item.Group divided unstackable>
            {oldHouse}
          </Item.Group>
        </div>
        <div>
          <div className="home-hire-title">组一个家</div>
          <Item.Group divided unstackable>
            {hireHouse}
          </Item.Group>
        </div>
      </div>
    )
  }
}

export default Main