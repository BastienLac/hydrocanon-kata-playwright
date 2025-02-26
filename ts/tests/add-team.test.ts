import { test, expect, chromium } from "@playwright/test";
import { createTeam, resetDatabase } from "../utils";

test.beforeAll(async () => {
  const browser = await chromium.launch({ slowMo: 1000 });
  const page = await browser.newPage();
  // Reset database
  await resetDatabase(page);
});

test("Add Team Test", async ({ page }) => {
  // Create a new team
  const teamName = "my team";
  await createTeam(page, teamName);

  // Check if the team has been created
  await page.goto("/teams");
  const isVisible = await page.isVisible(`td:has-text('${teamName}')`);
  expect(isVisible).toBe(true);
});
