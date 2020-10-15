import React from 'react';
// 自己封装的路由组件
import { Switch, Route, Redirect } from 'react-router-dom';
export default function RouterView(props) {
    return (
        <Switch>
            {
                props.routes.map((item, index) => {
                    if(item.component){
                        return(
                            <Route key={ index } path={ item.path } component={ item.component }/>
                        )
                    }else{
                        return(
                            <Route key={ index } path={ item.path }>
                                <Redirect  to={ item.to } />
                            </Route>
                        )
                    }
                })
            }
        </Switch>
    )
}