import { BasePage } from "./BasePage";
import { ProductPage } from "./ProductPage";

export class StorePage extends BasePage
{
    constructor(page)
    {
        super(page);
        this.page=page;
        this.productSearch=page.locator("input.search-field");
        this.searchBtn=page.locator("button[value='Search']");
    }

    async searchProduct(productName)
    {
        await this.productSearch.fill("");
        await this.productSearch.fill(productName);
        await this.searchBtn.click();
        return new ProductPage(this.page);
    }
}