const puppeteer = require('puppeteer')

describe('Device Emulation', () => {
	let browser
	let page

	before(async function () {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
		})
		const context = await browser.createIncognitoBrowserContext()
		page = await context.newPage()
		await page.setDefaultTimeout(10000)
		await page.setDefaultNavigationTimeout(20000)
	})

	after(async function () {
		await browser.close()
	})

	it('Desktop Device Test', async function () {
		await page.setViewport({ width: 1650, height: 1050 })
		await page.goto('https://www.example.com')
		await page.waitForTimeout(3000)
	})
	it('Tablet Device Test', async function () {
		const tablet = puppeteer.KnownDevices['iPad Pro 11 landscape']
		await page.emulate(tablet)
		await page.goto('https://www.example.com')
		await page.waitForTimeout(3000)
	})

	it('Mobile Device Test', async function () {
		const mobile = puppeteer.KnownDevices['iPhone 12 Pro']
		await page.emulate(mobile)
		await page.goto('https://www.example.com')
		await page.waitForTimeout(3000)
	})
})
