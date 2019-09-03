let fs = require('fs');
let globalConfig = require('./conf');

let pathMap = new Map();

let filesName = fs.readdirSync(globalConfig['web_path']);

filesName.forEach((val) => {
    let temp = require(globalConfig['web_path'] + '/' + val);
    if(temp.path){
        for(let [k, v] of temp.path){
            if(pathMap.get(k) == null){
                pathMap.set(k, v)
            }else{
                throw new Error('url path异常， url:' + k)
            }
        }
    }
})
// console.log(pathMap)

module.exports = pathMap;