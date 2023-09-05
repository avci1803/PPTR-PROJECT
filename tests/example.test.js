const puppeteer = require('puppeteer')

describe('My First Puppeteer Test', () => {
	it('should launch the browser', async function () {
		const browser = await puppeteer.launch({
			headless: false,
			slowMo: 1,
			devtools: false,
		})
		const page = await browser.newPage()
		await page.goto('https://devexpress.github.io/testcafe/example/')

		const title = await page.title()
		const url = await page.url()
		console.log('title :' + title, 'url :' + url)

		await page.type('#developer-name', 'Mehmet', { delay: 500 })
		await page.click('#tried-test-cafe', { clickCount: 1 }) //click checklist
		await page.select('#preferred-interface', 'JavaScript API')
		const message = 'Lets fill that message with some text'
		await page.type('#comments', message)
		await page.click('#submit-button')
		await page.waitForSelector('.result-content')
		await page.close()
	})
})
