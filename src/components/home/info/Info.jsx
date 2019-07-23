import React from 'react'
import './Info.css'
import { Tab, Item, Icon } from 'semantic-ui-react'
import TLoader from 'react-touch-loader'

class Info extends React.Component {
  render() {
    const panes = [
      { menuItem: '资讯',
        render: () => <Tab.Pane>
         <M1 />
        </Tab.Pane> 
      },
      { menuItem: '头条',
        render: () => <Tab.Pane>
          <M2 />
        </Tab.Pane> 
      },
      { menuItem: '问答',
        render: () => <Tab.Pane>
          <M3 />
        </Tab.Pane> 
      }
    ]
    return (
      <div className="find-container">
        <div className="find-topbar">资讯</div>
        <div className="find-content">
          <Tab panes={panes} />
        </div>
      </div>
    )
  }
}

function M1() {
  return <Loader type="1" />
}
function M2() {
  return <Loader type="2" />
}
function M3() {
  return <Loader type="3" />
}
// 定义Message组件
function Message({ data }) {
  return (
    <Item.Group unstackable>
      {
        data.map(item => (
          <Item key={item.id}>
            <Item.Image size="small" src="http://47.96.21.88:8086/public/1.png" />
            <Item.Content verticalAlign="middle">
              <Item.Header className="info-title">{item.info_title}</Item.Header>
              <Item.Meta>
                <span className="sprice">$10000</span>
                <span className="stay">1 Month</span>
              </Item.Meta>
            </Item.Content>
          </Item>
        ))
      }
    </Item.Group>
  )
}

// 定义问答组件
function AskAnswer({ data }) {
  return (
    <ul className="info-ask-list">
      {data.map(item => (
        <li key={item.id}>
          <div className="title">
            <span className="cate">
              <Icon color="green" name="users" size="small" />
              思维
            </span>
            <span>
              你好你好你好你好你好你好你好你好你好你好你好你好你好你好
            </span>
          </div>
          <div className="user">
            <Icon circular name="users" size="mini" />
            张三的回答
          </div>
          <div className="info">
            你好你好你好你好你好你好你好你好你好你好你好你好你好你好
          </div>
          <div className="tag">
            <span>你好X</span>
            <span>你好X</span>
            <span>你好X</span>
            <span>123个回答</span>
          </div>
        </li>
      ))}
    </ul>
  )
}

// 定义touch-loader组件
class Loader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasMore: false,
      initializing: 1,
      pagenum: 0,
      pagesize: 2,
      list: [],
      total: 0
    }
  }

  render() {
    let { hasMore, initializing, list } = this.state
    let { type } = this.props
    return (
      <div className="view">
        <TLoader
          className="main"
          onRefresh={this.refresh}
          onLoadMore={this.loadMore}
          hasMore={hasMore}
          initializing={initializing}
        >
          { type === '3' ? <AskAnswer data={list}/> : <Message data={ list }/> }
        </TLoader>
      </div>
    )
  }

  async componentDidMount() {
    let { pagenum, pagesize } = this.state
    let res = await this.getInfos()
    let { list } = res
    let newNum = pagenum + pagesize 
    this.setState({
      initializing: 2,
      pagenum: newNum,
      list: list.data,
      total: list.total,
      hasMore: newNum < list.total
    })
  }
  getInfos = async () => {
    let { pagenum, pagesize } = this.state
    let res = await this.axios.post('infos/list', {
      type: this.props.type,
      pagenum,
      pagesize
    })
    let { data, meta } = res
    if(meta.status === 200) {
      return data
    }
  }
  refresh = async (resolve, reject) => {
    // 重置初始条数
    // react中setState是异步的，通过setState修改react内部数据，不是立即刷新
    // 解决方式：
    // 1. async await 
    // 2. 定时器setTimeout
    // 3. 回调函数
    await this.setState({
      pagenum: 0
    })
    let { pagenum, pagesize } = this.state
    let res = await this.getInfos()
    let { list } = res
    let newNum = pagenum + pagesize 
    this.setState({
      pagenum: newNum,
      list: list.data,
      hasMore: newNum < list.total
    })
    resolve()
  }

  loadMore = async (resolve, reject) => {
    let { pagenum, pagesize } = this.state
    let res = await this.getInfos()
    let { list } = res
    let newData = [...this.state.list, ...list.data]
    let newNum = pagenum + pagesize 
    this.setState({
      pagenum: newNum,
      list: newData,
      hasMore: newNum < list.total
    })
    resolve()
  }
}
export default Info