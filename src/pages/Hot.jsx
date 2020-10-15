import React, { Component } from 'react';
import {List} from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
// 导入样式表
import '../assets/css/hot.scss'
import { query } from '../Utils'
import { Link } from 'react-router-dom';
class Hot extends Component {
    constructor(){
        super()
        this.state={
            hotList:{}
        }
    }
    // 获取热歌榜单的数据
    getHotList(){
        query("/top/list?idx=1").then(res=>{
            // console.log(res);
            if(res.code===200){
                this.setState({hotList:res.playlist})
            }
        })
    }

    // 生命周期
    componentWillMount(){
        this.getHotList()
    }

    render() {
        // 音乐列表
        const playlist = this.state.hotList.tracks;
        const styleBanner = {
            backgroundImage: "url('" + this.state.hotList.coverImgUrl + "')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }
        return (
            <div className="hot-container">
                  <div className="banner" style={styleBanner}></div>
                  <List
                    bordered
                    dataSource={playlist}
                    renderItem={item => (
                        <List.Item
                            actions={[<PlayCircleOutlined onClick={()=>this.props.history.push('/play/'+item.id)} style={{ fontSize: '26px' }} />]}
                        >
                            
                           <Link to={'/play/'+item.id} style={{color:"#333"}}>{item.name.substr(0,25)+"..."}</Link>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default Hot;
