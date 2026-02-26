import { BasePage } from "./BasePage";
import { StorePage } from "./StorePage";
const {expect}=require("@playwright/test");


export class HomePage extends BasePage{

    constructor(page) {
        super(page);
        this.page = page;
        this.shopNowLink = page.locator("#ast-desktop-header a[href*='/store']");
    }

    async navigateToStorPage() {
        await this.shopNowLink.click();
        return new StorePage(this.page);
    }
}