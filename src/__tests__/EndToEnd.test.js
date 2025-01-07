import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
    let browser;
    let page;

    beforeAll(async () => {
        // Launch the browser once before all tests
        browser = await puppeteer.launch({ headless: true });
    });

    afterAll(async () => {
        // Close the browser after all tests
        if (browser) await browser.close();
    });

    beforeEach(async () => {
        // Open a new page for each test
        page = await browser.newPage();
        await page.goto('http://localhost:5173/');
    });

    afterEach(async () => {
        // Close the page after each test
        if (page) await page.close();
    });

    test('An event element is collapsed by default', async () => {
        // Wait for the first event to render
        await page.waitForSelector('.event');

        // Check if the details section is not visible
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull(); // Assuming .details doesn't exist when collapsed
    });
});
