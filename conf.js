let fs = require('fs');
let globalConfig = {};
let configArr = fs.readFileSync('./service.conf').toString().split('\r\n');

configArr.forEach((val, index) => {
    globalConfig[val.split('=')[0]] = val.split('=')[1];
})

if(globalConfig['static_file']){
    globalConfig['static_file'] = globalConfig['static_file'].split('|');
}else{
    throw new Error('缺少static_file')
}

module.exports = globalConfig;