import React, { Component } from 'react';
//  导入样式表
import '../assets/css/recommend.scss'
import { Carousel,Row, Col, Card, List} from 'antd';
// 导入icon图片
import { PlayCircleOutlined } from '@ant-design/icons';
// 导入数据请求方法
import { query } from '../Utils'
import { Link } from 'react-router-dom';
const { Meta } = Card;
class Recommend extends Component {
    constructor() {
        super()
        this.state = {
            // 轮播图
            bannerList:[],
            // 歌单推荐
            recommendList:[],
            // 新歌推荐
            newSongs:[]
        }
    }
    // 获取轮播图数据
    getBanners() {
        query("/banner").then(res => {
            if (res.code === 200) {
                // console.log(res);
                // 跟新数据
                this.setState({ bannerList: res.banners })
            }
        })
    }
    // 歌单推荐
    getRecommends(){
        query("/personalized?limit=12").then(res=>{
            // console.log(res);
            if(res.code===200){
                // 更新数据
                this.setState({recommendList : res.result})
            }
        })
    }
    // 新歌推荐
    getNewSongs(){
        query("/personalized/newsong").then(res=>{
            // console.log(res);
            if(res.code===200){
                this.setState({newSongs:res.result})
            }
        })
    }
    // 生命周期
    componentWillMount() {
        this.getBanners()
        this.getRecommends()
        this.getNewSongs()
    }
    render() {
        const {push}=this.props.history;
        return (
            <div className="recommnd">
                {/* 轮播图 */}
                <Carousel autoplay>
                    {
                        this.state.bannerList.map(item => (
                            <div key={item.targetId}>
                               <img src={item.imageUrl} title={item.typeTitle}/>
                            </div>
                        ))
                    }
                </Carousel>
                {/* 歌单推荐 */}
                <div className="songMenu">
                    <h3>歌单推荐</h3>
                    <Row gutter={10}>
                        {
                            this.state.recommendList.map(item => (
                                <Col span={8} key={item.id} onClick={()=>push('/songlist/'+item.id)}>
                                    <Card
                                        hoverable
                                        cover={<img alt="example" src={item.picUrl} />}
                                    >
                                        <Meta title={item.name} description={item.copywriter.substr(0,4)} />
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </div>
                {/* 新歌推荐 */}
                <div className="songMenu">
                    <h3>新歌推荐</h3>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.newSongs}
                        renderItem={item => (
                            <List.Item
                            actions={[<PlayCircleOutlined onClick={()=>this.props.history.push('/play/'+item.id)} style={{fontSize:'26px'}}/>]}
                            >
                                <List.Item.Meta
                                    title={<Link to={'/play/'+item.id}>{item.name}</Link>}
                                    description={item.song.alias[0]}
                                />
                            </List.Item>
                        )}
                    />
                    
                  
                </div>
            </div>
        );
    }
}

export default Recommend;
