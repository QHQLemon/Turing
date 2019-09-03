let http = require('http');
let url = require('url');
let globalConfig = require('./conf');
let fs = require('fs');
let loader = require('./loader')

http.createServer(function (request, response) {
    console.log('连接');
    let pathName = url.parse(request.url).pathname;
    let data = url.parse(request.url, true).query;
    console.log(pathName);
    if (isStaticFile(pathName)) { //静态文件
        try {
            let fileData = fs.readFileSync(globalConfig['page_path'] + pathName);
            response.writeHead(200);
            response.write(fileData);
            response.end();
        } catch (error) {
            response.writeHead(404);
            response.write('<html><body><h1>404 NotFound</h1></body></html>');
            response.end();
        }
    } else { //请求数据
        console.log('data', data);
        if (loader.get(pathName)) {
            try {
                loader.get(pathName)(request, response);
            } catch (error) {
                response.writeHead(500);
                response.write('<html><body><h1>500 BadServer</h1></body></html>');
                response.end();
            }
        } else {
            response.writeHead(404);
            response.write('<html><body><h1>404 NotFound</h1></body></html>');
            response.end();
        }
    }

}).listen(globalConfig.port, function () {
    console.log('.....8090....')
})

function isStaticFile(pathName) {
    let staticeFile = globalConfig['static_file'];
    for (let i = 0; i < staticeFile.length; i++) {
        if (pathName.indexOf(staticeFile[i]) === pathName.length - staticeFile[i].length) {
            return true;
        }
    }
    return false;
}