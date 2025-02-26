import { test, expect, chromium } from '@playwright/test'

test('add-employee-error-zipcode', async () => {
    const browser = await chromium.launch({ slowMo: 1000 })
    const page = await browser.newPage()
    await page.goto('https://h.lsi2.hr.dmerej.info/reset_db')
    const proceedButton = page.locator("button:has-text('proceed')")
    await proceedButton.click()

    await page.goto('https://h.lsi2.hr.dmerej.info/');
    await page.getByRole('link', { name: 'Add new employee' }).click();
    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('ERIC');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('ERIC@gmail.com');
    await page.locator('#id_address_line1').click();
    await page.locator('#id_address_line1').fill('20 avenue du gourou');
    await page.getByRole('textbox', { name: 'City' }).click();
    await page.getByRole('textbox', { name: 'City' }).fill('Paris');
    await page.locator('div').filter({ hasText: 'Zip code' }).click();
    await page.getByRole('spinbutton', { name: 'Zip code' }).fill('111123456787654323456787654324567876543234567865432');
    await page.getByRole('textbox', { name: 'Hiring date' }).fill('2000-04-23');
    await page.getByRole('textbox', { name: 'Job title' }).click();
    await page.getByRole('textbox', { name: 'Job title' }).fill('Ecrivain');
    await page.locator('html').click();
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Server Error (500)')).toBeVisible();
  });