
export async function resetDatabase(page) {
    // Reset database
    await page.goto('/reset_db');
    const proceedButton = page.locator("button:has-text('proceed')");
    await proceedButton.click();
}