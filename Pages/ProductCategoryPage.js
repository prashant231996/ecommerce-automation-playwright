const { BasePage } = require("./BasePage");
const { expect } = require("@playwright/test");

export class ProductCategoryPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.productHeader = page.locator("h1.page-title");
        this.mensJeanProductHeader = "Men's Jeans";
        this.menProductHeader = "Men";
        this.productList = page.locator("#primary .products li");
        this.lowest_Price = 99999;
        this.sortingDropdown=page.locator("select.orderby");
    }


    async verifyProductHeader(categoryName) {
        if (categoryName === "mens-jeans") {
            await expect(this.productHeader).toHaveText(this.mensJeanProductHeader);
        }
        else if (categoryName === "men") {
            await expect(this.productHeader).toHaveText(this.menProductHeader);
        }
        else {
            console.log("Invalid product category choosed " + categoryName);
        }
    }

    async getProductWithLowerPrice(minPrice) {
        let productName;
        const count = await this.productList.count();
        for (let i = 0; i < count; i++) {
            let productPrice = await this.productList.nth(i).locator(".price bdi").last().textContent();
            productPrice=productPrice.split(".")[0];
            productPrice=parseInt(productPrice.replace(/[^\d]/g, ''));
            if (productPrice === minPrice) {
                productName = await this.productList.nth(i).locator("div h2").textContent();
                break;
            }
        }
        return productName;
    }

    async getLowerPriceOfProduct() {

        const productPrices = await this.page.locator("#primary .products li .price");

        const count = await productPrices.count();

        for (let i = 0; i < count; i++) {

            let priceText = await productPrices
                .nth(i)
                .locator(".amount bdi")
                .last()
                .textContent();

            priceText = priceText.split('.')[0];

            let productPrice = parseInt(priceText.replace(/[^\d]/g, ''));

            if (productPrice < this.lowest_Price) {
                this.lowest_Price = productPrice;
            }
        }

        return this.lowest_Price;
    }

    async sortProductByPriceLowToHigh()
    {
        await this.page.waitForTimeout(2000);

        await this.sortingDropdown.selectOption({value:"price"})

        await this.page.waitForTimeout(4000);
    }

    async getFirstProductDetails()
    {
        return await this.productList.nth(0).locator("div h2").textContent();
    }
}