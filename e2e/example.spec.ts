import { test, expect } from '@playwright/test';

test('has title', async ({ page, context }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
  //await page.getByRole('link', { name: 'Material UI' }).click();
  const [newPage] = await Promise.all([
    context.waitForEvent('page'), // Wait for new page
    page.getByRole('link', { name: 'Material UI' }).click(), // Action that opens it
  ]);

  // Wait until the new page has loaded
  await newPage.waitForLoadState();
  await expect(newPage).toHaveURL(/.*material-ui/);
  const numberLocator = newPage.getByRole('link', { name: '+ 3,039 contributors' })
  await expect(numberLocator).toBeVisible();
  await numberLocator.click();
  await newPage.waitForLoadState();

//
  const targetButton = newPage.getByRole('heading', { name: 'oliviertassinari \'s Commits' }).getByRole('link');
  await expect(targetButton).toBeVisible();
  await targetButton.click();
  await newPage.waitForLoadState();
  await expect(newPage).toHaveURL(/.*oliviertassinari/);
//
  //await newPage.close();
  await page.close();

});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
