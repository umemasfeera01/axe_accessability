
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';


function violationFingerprints(accessibilityScanResults) {
  const violationFingerprints = accessibilityScanResults.violations.map(violation => ({
    rule: violation.id,
    // These are CSS selectors which uniquely identify each element with
    // a violation of the rule in question.
    targets: violation.nodes.map(node => node.target),
  }));
  return JSON.stringify(violationFingerprints, null, 2);
}


test('Axe accessibility snapshot test', async ({ page }) => {
  await page.goto('https://github.com/');
  const results = await new AxeBuilder({ page }).analyze();
  // Compare with snapshot (Jest-style snapshot built into Playwright expect)
  expect(violationFingerprints(results)).toMatchSnapshot();
});