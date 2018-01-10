const puppeteer = require("puppeteer")

const { sleep } = require("./common/function")


puppeteer.launch().then(async browser => {
    const page = await browser.newPage()

    page.setViewport({ width: 1920, height: 600 })

    await page.goto("https://www.xythree.com")
    await page.waitFor(2000)
    const documentSize = await page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.body.clientHeight,
        }
    })

    await page.screenshot({ path: "screenshot.png", clip: { x: 0, y: 0, width: 1920, height: documentSize.height } })
    await browser.close()
})


/* 
 * 截取手机尺寸图片
 */

/*

const devices = require('puppeteer/DeviceDescriptors')
const iPhone = devices['iPhone 6']

puppeteer.launch().then(async browser => {
    const page = await browser.newPage()
    await page.emulate(iPhone)
    await page.goto("https://www.xythree.com")
    await page.waitFor(2000)
    await page.screenshot({ path: "phone_screenshot.png" })
    await browser.close()
})

*/