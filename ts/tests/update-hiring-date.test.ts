import { test, expect, chromium } from "@playwright/test";
import { resetDatabase, createEmployee } from "../utils";

test.beforeAll(async () => {
  const browser = await chromium.launch({ slowMo: 1000 });
  const page = await browser.newPage();
  // Reset database
  await resetDatabase(page);
});

test("Update hiringDate", async ({ page }) => {
  const hiringDate = "2025-02-25";

  await createEmployee(page, {
    employeeName: "toto",
    employeeEmail: "toto@gmail.com",
    employeeAddress: "toto",
    employeeCity: "Paris",
    zipcode: "75020",
    hiringDate: hiringDate,
    jobTitle: "RH",
  });

  await page.goto("/employees");
  await page.click("text='Edit'");
  await page.click("text='Update contract'");

  const hiringDateInput = page.locator('input[name="hiring_date"]');
  expect(hiringDateInput).toHaveValue(hiringDate);
  const newDate = "2023-02-25";
  hiringDateInput.fill(newDate);
  await page.waitForTimeout(2000);
  expect(
    hiringDateInput,
    "La date d’embauche n’a pas été mise à jour correctement."
  ).toHaveValue(newDate);
});
