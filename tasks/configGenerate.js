const fs = require('fs')

const generation = () => {
    fs.writeFile('../configGenerate.js', `export default {
        gaid: "${process.env.gaid !== undefined ? process.env.gaid : "请先在process.env中定义"}",
        wechat: "${process.env.wechat !== undefined ? process.env.wechat : "请先在process.env中定义"}",
        qq: "${process.env.qq !== undefined ? process.env.qq: "请先在process.env中定义"}"
    }`, (err) => {
        if (err) throw err
        console.log('The file has been saved!')
    })
}

generation()
