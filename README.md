# Turing
图灵聊天机器人

用node搭建简易服务器，受到数据请求时，利用request模块向`http://openapi.tuling123.com/openapi/api/v2`接口请求数据，再将数据返回页面。（本质上是利用服务器实现跨域，因为跨域只出现在浏览器上）

## 界面

!["界面"](./page/img/main.png '聊天机器人界面')

### 主要知识点request
1. 安装并引入request模块
```javascript
//安装request
npm install requset --save 

//引入request
let req = require("request")
```

2. get请求
两个参数
- 第一个参数：请求的url（包括参数）
- 第二个参数：回调函数，该函数有三个参数，错误、响应对象、返回数据
```javascript
request(url, function(error, response, data){

})
```
3. post请求
post请求有三种方式，由请求头中content-type决定
- application/x-www-form-urlencoded：普通的http请求，参数为url参数拼接
- application/json：json请求，参数为json
- multipart/form-data：文件上传

***demo中使用的是post请求并且格式为json，以此说明***
```javascript
let url = require('url');
let req = require('request');

function getData(request, response) {
    console.log('发送信息');

    var dataText = url.parse(request.url, true).query.text;

    var data = {  //接口请求参数
        reqType: 0,
        perception: {
            inputText: {
                text: dataText
            }
        },
        userInfo: {
            apiKey: "be3e88b9ae0c49b28582416c86a3f9b5",
            userId: "123456"
        }
    }
    var content = JSON.stringify(data);

    req({
        url: "http://openapi.tuling123.com/openapi/api/v2",
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: content
    }, function (err, resp, body) {
        console.log(body)
        if(!err && resp.statusCode == 200){  
            response.writeHead(200);
            var returnData = JSON.parse(body);
            if(returnData &&  returnData.results.length > 0 && returnData.results[0].values){
                response.write(JSON.stringify(returnData.results[0].values));
                response.end()
            }else{
                response.write(JSON.stringify({text: "你说的啥？我听不懂！"}));
                response.end();
            }
        }
    })
}

```


