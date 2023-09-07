const puppeteer = require('puppeteer')
const expect = require('chai').expect

const { click } = require('../lib/helpers')
const { getText } = require('../lib/helpers')
const { getCount } = require('../lib/helpers')
const { shouldNotExist } = require('../lib/helpers')

describe('My Second Puppeteer Test', () => {
	let browser
	let page

	before(async function () {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
		})

		page = await browser.newPage()
		//await page.setDefaultTimeout(10000)
		//await page.setDefaultNavigationTimeout(20000)
	})

	after(async function () {
		//await browser.close()
	})

	beforeEach(async function () {
		//execute before each test case
	})

	afterEach(async function () {
		//execute after each test case
	})

	it('should get the element text', async function () {
		await page.goto('http://example.com/')
		await page.waitForXPath('//h1')
		const title = await page.title()
		const url = await page.url()
		const text = await getText(page, 'h1')
		const count = await getCount(page, 'p')

		expect(title).to.be.a('String', 'Example Domain')
		expect(url).to.include('example.com')
		expect(text).to.be.a('string', 'Example Domain')
		expect(count).to.equal(2)

		await page.goto('http://zero.webappsecurity.com/index.html')
		//await page.waitForSelector('#signin_button')
		//await page.click('#signin_button')
		await click(page, '#signin_button')
		await page.waitForTimeout(2000)
		await shouldNotExist(page, '#signin_button')
	})
})
