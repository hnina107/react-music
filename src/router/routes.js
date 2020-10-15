import Recommend from '../pages/Recommend';
import Hot from '../pages/Hot';
import Search from '../pages/Search';
import SongList from '../pages/SongList';
import Play from '../pages/Play'
// 路由规则数据
const routes=[
    {
        path:'/',
        to:'/recommend',
        exact:true      // 启用严格匹配模式
    },
    // 动态路由
    {
        path:'/songlist/:id',
        component:SongList,
        exact:false
    },
    {
        path:'/recommend',
        component:Recommend,
        exact:false 
    },
    {
        path:'/hot',
        component:Hot,
        exact:false
    },
    {
        path:'/search',
        component:Search,
        exact:false
    },
    {
        path:'/play/:id',
        component:Play,
        exact:false
    }
];

export default routes;