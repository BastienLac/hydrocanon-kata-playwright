import { test, expect, chromium } from '@playwright/test'


test('delete employee team', async () => {
    const browser = await chromium.launch({ slowMo: 1000 })
    const page = await browser.newPage()
    await page.goto('https://h.lsi2.hr.dmerej.info/reset_db')
    const proceedButton = page.locator("button:has-text('proceed')")
    await proceedButton.click()

    // Create new user
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

    // Create a new team
    await page.goto('https://h.lsi2.hr.dmerej.info/add_team')
    const nameInput = page.locator('input[name="name"]')
    const teamName = 'Scalpeurs'
    await nameInput.fill(teamName)
    await page.click("text='Add'")

    
    // Add an employee to the team
    await page.goto('https://h.lsi2.hr.dmerej.info/');
    await page.getByRole('link', { name: 'List employees' }).click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('link', { name: 'Add to team' }).click();
    //await page.getByLabel('Team').selectOption({ label: 'Scalpeurs team' });
    //await page.getByLabel('Team').selectOption('70');
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    await page.getByRole('link', { name: 'List teams' }).click();
    await page.getByRole('link', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Proceed' }).click();
    
    await page.selectOption('select[name="team"]', { index: 1 });
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    await page.getByRole('link', { name: 'List teams' }).click();
    await page.getByRole('link', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Proceed' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    await page.getByRole('link', { name: 'List employees' }).click();
    await page.getByRole('link', { name: 'Home' }).click();

    await page.goto('https://h.lsi2.hr.dmerej.info/employees');
    const employeeisVisible = await page.isVisible(`td:has-text('${employeeName}')`);
    expect(employeeisVisible).toBe(true);
    
})