import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch({
      executablePath: "c/Users/PC/AppData/chromium",
      headless: false,
      slowMo: 250, // slow down by 250ms
      ignoreDefaultArgs: ["--disable-extensions"], // ignores default setting that causes timeout errors
      args: ["--no-sandbox", "--disabled-setupid-sandbox"],
    }); // Launches the browser
    page = await browser.newPage(); // Opens a new tab
    await page.goto("http://localhost:3000/"); // Navigates to https://example.com
    await page.waitForSelector(".event"); // Takes a screenshot and saves it as “example.png”
  });

  afterAll(() => {
    browser.close(); // Closes the browser
  });

  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".event-container .event-details");
    expect(eventDetails).toBeNull();
  });

  test("User can expand an event to see its details", async () => {
    await page.click(".event .expand-btn");
    const eventDetails = await page.$(".event-container .event-details");
    expect(eventDetails).toBeDefined();
  });

  test("User can collapse an event to hide its details", async () => {
    await page.click(".event .expand-btn");
    const eventDetails = await page.$(".event-container .event-details");
    expect(eventDetails).toBeNull();
  });
});
