const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default; // 1

   test('Scanning an entire page', async ({ page }) => {
    await page.goto("https://github.com/", { waitUntil: 'commit' });
    await page.waitForTimeout(6000); 
    // await page.getByRole('textbox', { name: 'Enter store password' }).click();
    // await page.getByRole('textbox', { name: 'Enter store password' }).fill('ss');
    // await page.getByRole('button', { name: 'Enter' }).click();
    const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze(); // 4
    expect(accessibilityScanResults.violations).toEqual([]); // 5
  });
   



  test.use({ viewport: { width: 390, height: 844 } });

  test('Configuring axe to scan a specific part of a page', async ({ page }) => {

    await page.goto("https://urbangents2.yeetonline.com/");

    // Open mobile menu
    await page.click(".navbar-toggler");

    // Wait until sidebar exists in DOM
    const sidebar = page.locator('.nav__sidebar--body');
    await expect(sidebar).toBeVisible();

    // Wait small time for animation (VERY important)
    await page.waitForTimeout(800);

    // Now run Axe
    const results = await new AxeBuilder({ page })
      .include('.nav__sidebar--body').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // console.log(results.violations);   // ADD THIS
    // expect(results.violations.length).toBe(0);
    console.log(JSON.stringify(results.violations, null, 2));

    // ❗ Test fails because results.violations.length == 1
    expect(results.violations.length).toBe(0);

  });


// nav__sidebar--body

    
 
