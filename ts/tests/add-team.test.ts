import { test, expect, chromium } from '@playwright/test'
import { resetDatabase } from '../utils/resetDatabase';

const browser = await chromium.launch({ slowMo: 1000 })
const page = await browser.newPage()
test.beforeAll(async () => {
    // Reset database
    resetDatabase(page);
});

test('has title', async () => {

  // Create a new team
  await page.goto('/add_team')
  const nameInput = page.locator('input[name="name"]')
  const teamName = 'my team'
  await nameInput.fill(teamName)
  await page.click("text='Add'")

  // Check the team has been created
  await page.goto('/teams')
  const isVisible = await page.isVisible(`td:has-text('${teamName}')`)
  expect(isVisible).toBe(true)
})
