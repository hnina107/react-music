import React, { Component } from 'react';
// 导入css样式
import '../assets/css/index.scss'
// 导入页头
import { PageHeader, Affix } from 'antd';

import { NavLink, HashRouter as Router, Route, Switch , Redirect} from 'react-router-dom';
import Hot from './Hot'
import Recommend from './Recommend'
import Search from './Search'
import SongList from './SongList'
import Play from './Play'

// 引入路由配置
// import routes from '../router/routes'
// import RouterView from '../router/RouterView'
class Index extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Affix>
                        <div>
                            <div className="header">
                                <PageHeader
                                    className="site-page-header"
                                    title="优音乐"
                                />
                                <a href="#" className="btn-download">下载App</a>
                            </div>
                            {/* 路由导航链接 */}
                            <div className="navBar">
                                <NavLink to="/recommend">推荐</NavLink>
                                <NavLink to="/hot">热歌</NavLink>
                                <NavLink to="/search">搜索</NavLink>
                            </div>
                        </div>
                    </Affix>
                    <Switch>
                        <Route exact path='/' render={()=><Redirect to='/recommend'/>}/>
                        <Route path="/recommend" component={Recommend} />
                        <Route path="/hot" component={Hot} />
                        <Route path="/search" component={Search} />
                        <Route path="/songlist/:id" component={SongList} />
                        <Route path="/play/:id" component={Play} />
                    </Switch>
                  
                </div>
                      
                    {/* 路由规则&路由出口 */}
                    {/* <RouterView routes={routes} /> */}

            </Router>
        );
    }
}

export default Index;
