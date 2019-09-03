let url = require('url');
let req = require('request')

let path = new Map();

function getData(request, response) {
    console.log('发送信息');
      var dataText = url.parse(request.url, true).query.text;

    var data = {
        // "reqType":0,
        // "perception": {
        //     "inputText": {
        //         "text": dataText
        //     }
        // },
        // "userInfo": {
        //     "apiKey": "be3e88b9ae0c49b28582416c86a3f9b5",
        //     "userId": "123456"
        // }
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
    console.log(content)

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
            console.log(JSON.stringify(returnData.results[0].values));
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

path.set('/getData', getData);

module.exports.path = path;