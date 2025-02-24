import { test, expect, chromium } from '@playwright/test'

const browser = await chromium.launch({ slowMo: 1000 })
const page = await browser.newPage()
test.beforeAll(async () => {
    // Reset database
    await page.goto('/reset_db')
    const proceedButton = page.locator("button:has-text('proceed')")
    await proceedButton.click()
});

test('update hiringDate', async () => {
    

    // Create a new team
    await page.goto('/add_employee')
    const nameInput = page.locator('input[name="name"]')
    const employeeName = 'toto'
    await nameInput.fill(employeeName)

    const emailInput = page.locator('input[name="email"]')
    const employeeEmail = 'toto@gmail.com'
    await emailInput.fill(employeeEmail)

    const addressLine = page.locator('input[name="address_line1"]')
    const employeeAdress = 'toto'
    await addressLine.fill(employeeAdress)

    const cityInput = page.locator('input[name="city"]')
    const employeeCity = 'Paris'
    await cityInput.fill(employeeCity)

    const zipInput = page.locator('input[name="zip_code"]')
    const zipcode = '75020'
    await zipInput.fill(zipcode)

    const hiringInput = page.locator('input[name="hiring_date"]')
    const hiringDate = '2025-02-25'
    await hiringInput.fill(hiringDate)

    const jobInput = page.locator('input[name="job_title"]')
    const jobTitle = 'RH'
    await jobInput.fill(jobTitle)

    await page.click("text='Add'")
    await page.goto('/employees')
    await page.click("text='Edit'")
    await page.click("text='Update contract'")

    const hiringDateInput = page.locator('input[name="hiring_date"]');
    expect(hiringDateInput).toHaveValue(hiringDate)
    const newDate = '2023-02-25';
    hiringDateInput.fill(newDate);
    await page.waitForTimeout(2000);
    expect(hiringDateInput, "La date d’embauche n’a pas été mise à jour correctement.").toHaveValue(newDate );
})
