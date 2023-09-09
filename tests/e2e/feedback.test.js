const { it } = require('mocha')
const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('FeedBack Test', () => {
	let browser
	let page

	before(async function () {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: true,
			devtools: false,
		})

		page = await browser.newPage()
		await page.setDefaultTimeout(10000)
		await page.setDefaultNavigationTimeout(20000)
	})

	after(async function () {
		await browser.close()
	})

	it('Display Feedback form', async function () {
		await page.goto('http://zero.webappsecurity.com/index.html')
		await page.waitForSelector('#feedback')
		await page.click('#feedback')
	})

	it('Submit Feedback form', async function () {
		await page.waitForSelector('form')
		await page.type('#name', 'Mehmet')
		await page.type('#email', 'hummels@gmail.com')
		await page.type('#subject', 'New Topic')
		await page.type('#comment', 'Buraya yazarlar...')
		await page.click('input[type="submit"]')
	})

	it('Display Results page', async () => {
		await page.waitForSelector('#feedback-title')
		const url = await page.url()
		expect(url).to.include('/sendFeedback.html')
	})
})
