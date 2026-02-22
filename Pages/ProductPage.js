import { BasePage } from "./BasePage";
const {expect} = require("@playwright/test");

export class ProductPage extends BasePage
{
    constructor(page)
    {
        super(page);
        this.page=page;
        this.producttitle=page.locator("h1.product_title");
    }

    async verifyProductTitle(productName)
    {
        await expect(this.producttitle).toHaveText(productName);
    }
}