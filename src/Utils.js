
export function query(url, data, method = 'GET', headers) {
    let baseUrl='http://localhost:4000';
    return new Promise(function (resolve, reject) {
        const options={
            method,
            headers:Object.assign({
                'content-type': 'application/json'
            },headers)
        }
        //GET请求不能传递body请求体, 否则会错误
        if(method==='POST'){
            options.body=JSON.stringify(data)
        }
        fetch(baseUrl+url,options).then(response=>response.json()).then(res=>{
            if(res.code===200){
                resolve(res);
            }
        });
    });
}