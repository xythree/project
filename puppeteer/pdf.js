const puppeteer = require("puppeteer")

puppeteer.launch().then(async browser => {
    const page = await browser.newPage()

    page.setViewport({ width: 1920, height: 600 })

    await page.goto("https://www.xythree.com")
    await page.waitFor(2000)
    await page.pdf({ path: "example.pdf", format: "A4" })
    await browser.close()
})