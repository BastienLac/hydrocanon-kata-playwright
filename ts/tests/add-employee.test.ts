import { test, expect, chromium } from '@playwright/test';
import { resetDatabase } from '../utils/resetDatabase';

test.beforeAll(async () => {
    const browser = await chromium.launch({ slowMo: 1000 })
    const page = await browser.newPage()
    // Reset database
    await resetDatabase(page);
});

test('test', async ({ page }) => {
    const employeeName = 'TestEmployee';
  await page.goto('https://h.lsi2.hr.dmerej.info/');
  await page.getByRole('link', { name: 'Add new employee' }).click();
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill(employeeName);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('test@gmail.com');
  await page.locator('#id_address_line1').click();
  await page.locator('#id_address_line1').fill('55 rue de villejuif');
  await page.locator('#id_address_line2').click();
  await page.locator('#id_address_line2').fill('Batiment A');
  await page.getByPlaceholder('City').click();
  await page.getByPlaceholder('City').fill('Paris');
  await page.getByPlaceholder('Zip code').click();
  await page.getByPlaceholder('Zip code').fill('75010');
  await page.getByPlaceholder('Hiring date').fill('2025-02-25');
  await page.getByPlaceholder('Job title').click();
  await page.getByPlaceholder('Job title').fill('RH');
  await page.getByRole('button', { name: 'Add' }).click();

  // Check the team has been created
  await page.goto('/employees')
  const isVisible = await page.isVisible(`td:has-text('${employeeName}')`)
  expect(isVisible).toBe(true)
});