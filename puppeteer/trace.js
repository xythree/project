const puppeteer = require("puppeteer")
const devices = require("puppeteer/DeviceDescriptors")
const iphone = devices["iPhone 6"]

/*
 * 捕获网站的时间线跟踪，以进行诊断性能问题
 */

puppeteer.launch().then(async browser => {
	const page = await browser.newPage()

	await page.emulate(iphone)
	await page.tracing.start({ path: "./trace.json" })
	await page.goto("https://www.xythree.com/")
	await page.tracing.stop()
	await browser.close()
})