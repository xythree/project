const puppeteer = require("puppeteer")

puppeteer.launch({
    headless: false
}).then(async browser => {

    let page = await browser.newPage()

    await page.goto("https://www.xythree.com/")
    await page.waitFor(1000)
    await page.screenshot({ path: "1.png" })
    let link = await page.$(".ibox_ani_2 h5 a")
    await link.click()
    await page.waitFor(2000)
    await page.screenshot({ path: "2.png" })
    await page.evaluate(() => {
        history.back()
    })
    let imenu = await page.$(".imenu")
    imenu.click()
    await page.waitFor(1000)
    await page.screenshot({ path: "3.png" })

    //await browser.close()
})