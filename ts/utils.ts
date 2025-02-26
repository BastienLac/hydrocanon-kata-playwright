export async function resetDatabase(page) {
  // Reset database
  await page.goto("/reset_db");
  const proceedButton = page.locator("button:has-text('proceed')");
  await proceedButton.click();
}

export async function createEmployee(page, employee) {
  const {
    employeeName,
    employeeEmail,
    employeeAddress,
    employeeCity,
    zipcode,
    hiringDate,
    jobTitle,
  } = employee;

  await page.goto("/add_employee");
  const nameInput = page.locator('input[name="name"]');
  await nameInput.fill(employeeName);

  const emailInput = page.locator('input[name="email"]');
  await emailInput.fill(employeeEmail);

  const addressLine = page.locator('input[name="address_line1"]');
  await addressLine.fill(employeeAddress);

  const cityInput = page.locator('input[name="city"]');
  await cityInput.fill(employeeCity);

  const zipInput = page.locator('input[name="zip_code"]');
  await zipInput.fill(zipcode);

  const hiringInput = page.locator('input[name="hiring_date"]');
  await hiringInput.fill(hiringDate);

  const jobInput = page.locator('input[name="job_title"]');
  await jobInput.fill(jobTitle);

  await page.click("text='Add'");
}

export async function createTeam(page, name) {
  await page.goto("/add_team");
  const nameInput = page.locator('input[name="name"]');
  await nameInput.fill(name);
  await page.click("text='Add'");
}
