const fs = require("fs")
const path = require("path")
let argsname = process.argv[2]
const theme = require(`./theme/${argsname}/${argsname}.theme.js`)

const obj = {}

Object.keys(theme.replacePage).forEach(t => {
    obj[t.replace(/\//g, "\\\\")] = theme.replacePage[t]
})

let dirname = path.basename(__dirname)
let list = []
let exclude = ["release.js", "output", "theme", ".gitignore"]
let themeList = []

function getFile(dir, build) {
    let files = fs.readdirSync(dir)

    files.forEach((filename, i) => {
        let src = path.join(dir, filename)
        let stats = fs.statSync(src)
        if (stats.isFile() && exclude.indexOf(filename) == -1) {
            if (src.indexOf("theme\\") == -1) {
                list.push({ src })
            } else {
                themeList.push({ src })
            }
        } else if (stats.isDirectory() && filename != build) {
            getFile(src, path.join(build, filename))
        }

    })
}

function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}


getFile("./", "output")

console.log(list)
console.log(themeList)

//开始生成文件
list.forEach(t => {
    let file = fs.readFileSync(t.src)
    let excludename = ".theme.js"
    let filename = path.basename(t.src)
    let isConfig = false

    if (filename.lastIndexOf(excludename) != -1) {
        if (filename != argsname) { //忽略其他的配置文件
            return
        }
        isConfig = true
    }
    if (fs.existsSync(t.src)) {
        let src = path.resolve("output/" + t.src)
        if (mkdirsSync(path.dirname(src))) {
            let result = file.toString()
            let temp = obj[t.src]

            if (temp) {
                let obj1 = JSON.parse(result)
                result = JSON.stringify(Object.assign(obj1, temp))
            }

            let file2 = fs.writeFileSync(src, result)
        }
    }
})