let themeColor = "#999999"
let name = "自动化替换测试"


module.exports = {
    themeColor: themeColor,
    name: name,
    replacePage: {
        "app.json": {
            "window": {
                "navigationBarTextStyle": "white",
                "navigationBarTitleText": "xcx演示",
                "navigationBarBackgroundColor": "#000000",
                "backgroundColor": "#fffffff"
            }
        },
        "pages/char/char.json": {

        }
    }
}