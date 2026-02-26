const { BasePage } = require("./BasePage");
const { expect }= require("@playwright/test");

export class ProductCategoryPage extends BasePage {

    constructor(page) {
        super(page);
        this.page=page;
        this.productHeader=page.locator("h1.page-title");
        this.mensJeanProductHeader="Men's Jeans";
        this.menProductHeader="Men";
    }


    async verifyProductHeader(categoryName)
    {
        if(categoryName==="mens-jeans")
        {
            await expect(this.productHeader).toHaveText(this.mensJeanProductHeader);
        }
        else if(categoryName==="men")
        {
            await expect(this.productHeader).toHaveText(this.menProductHeader);
        }
        else
        {
            console.log("Invalid product category choosed "+categoryName);
        }
    }
}