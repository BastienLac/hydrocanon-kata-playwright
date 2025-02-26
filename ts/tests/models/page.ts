import { chromium } from '@playwright/test'

export class page {
    page: any;

    constructor() {
        this.initialize();
    }

    async initialize() {
        const browser = await chromium.launch({ slowMo: 1000 });
        this.page = await browser.newPage();
    }

    async goto(url: string) {
        await this.page.goto(url);
    }

    async locator(selector: string) {
        return this.page.locator(selector);
    }
}