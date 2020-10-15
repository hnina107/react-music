import React, { Component } from 'react';

import { Input, Divider, Row, Col, Button, List, message } from 'antd';
import { SearchOutlined,PlayCircleOutlined } from '@ant-design/icons';
import '../assets/css/search.scss';
import { query } from '../Utils';
import { Link } from 'react-router-dom';

export default class Search extends Component {
    
    constructor(){
        super();
        this.state={
            // 搜索关键词
            keywords:'',
            // 热门搜索
            hots:[],
            // 搜索结果
            songs:[]
        }
    }

    // 获取热门搜索
    async getHots(){
      const res=await query('/search/hot');
    //   console.log(res);
      if(res.code===200){
        // 更新数据
        this.setState({hots:res.result.hots});
      }
    }

    componentDidMount(){
        this.getHots();
    }
    // 搜索输入框的change事件处理函数
    keywordsUpdate(event){
        const keywords=event.target.value;
        this.setState({keywords});
    }
    // 搜索输入框keyup事件的处理函数
    enter(event){
        if(event.keyCode===13){
            //执行搜索操作
            this.search();
        }
    }

    // 点击搜索热词, 更新keywords
    setKeywords(keywords){
        this.setState({keywords},()=>{
            // 第一种: 执行一次搜索
            this.search();
        });
        
    }
    // keywords搜索关键词更新之后,手动执行一次搜索
    componentDidUpdate(){
        // this.search();
    }

    // 搜索方法
    async search(){
        // 表单校验
        if(this.state.keywords.trim()===''){
            return message.warning('请输入搜索关键词');
        }
       const res=await query('/search?keywords='+this.state.keywords);
       if(res.code===200){
            // 更新数据
            // console.log(res);
            this.setState({songs:res.result.songs});
       }
    }
    
    render() {
        return (
            <div className="search-container">
                <Input value={this.state.keywords} onKeyUp={this.enter.bind(this)} onChange={(event)=>this.keywordsUpdate(event)} size="large" placeholder="请输入搜索关键词" prefix={<SearchOutlined />} />

                <Divider />
                <Row gutter={10}>
                   {
                       this.state.hots.map(item=>(
                        <Col key={item.first}>
                            <Button onClick={()=>this.setKeywords(item.first)}>{item.first}</Button>
                        </Col>
                       ))
                   }
                    
                </Row>
                <Divider />

                {/* 搜索结果展示区域 */}
                <List
                    dataSource={this.state.songs}
                    renderItem={item => 
                    <List.Item 
                    actions={[<PlayCircleOutlined onClick={()=>this.props.history.push('/play/'+item.id)} style={{ fontSize: '26px' }} />]}
                    >
                        <Link style={{color:'#333'}} to={'/play/'+item.id}>{item.name.substr(0,30)+'...'}</Link>
                    </List.Item>
                }
                />
            </div>
        )
    }
}
