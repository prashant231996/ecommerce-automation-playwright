import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ProductPage } from "./ProductPage";
import { ProductCategoryPage } from "./ProductCategoryPage";
import { Products } from "../models/Products";

export class StorePage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.productSearch = page.locator("input.search-field");
        this.searchBtn = page.locator("button[value='Search']");
        this.productCategoryEle = page.locator("#product_cat");
        this.sortingDropDown = page.locator("select[name='orderby']");
        this.productsList = page.locator("div ul.products li");
        this.maxPrice = 0;
        this.minPrice = 9999999;
        this.pageNumberLink = page.locator(".woocommerce-pagination a.page-numbers");
        this.productResultCount = page.locator(".woocommerce-result-count");
    }

    async searchProduct(productName) {
        await this.productSearch.fill("");
        await this.productSearch.fill(productName);
        await this.searchBtn.click();
        return new ProductPage(this.page);
    }

    async browsByCategory(categoryName) {
        await this.productCategoryEle.scrollIntoViewIfNeeded();
        const productCategories = await this.page.$$("#product_cat option");
        let flag = false;
        for (const productCategory of productCategories) {
            let value = await productCategory.getAttribute('value');
            if (value === categoryName) {
                await this.productCategoryEle.selectOption({ value: categoryName });
                flag = true;
                console.log("Clicked product category option " + categoryName);
                break;
            }
        }
        if (!flag) {
            console.log("Mentioned product category is not available !!");
        }
        expect(flag).toBeTruthy();
        return new ProductCategoryPage(this.page);
    }

    async sortProductByPriceHightToLow() {
        await this.page.waitForTimeout(4000);
        await this.sortingDropDown.selectOption({ value: "price-desc" });
        await this.page.waitForTimeout(4000);
    }

    async getFirstSortedPrroductDetails() {
        const productName = await this.productsList.nth(0).locator("h2").textContent();
        const productPrice = await this.productsList.nth(0).locator("bdi").last().textContent();
        return new Products(productName, productPrice);
    }

    async getProductDetailsWithMaxPrice() {

        const product = new Products();
        let maxPrice = 0;
        await this.page.waitForLoadState('load');
        const pageLinks = await this.pageNumberLink.count();

        for (let j = 0; j <= pageLinks - 1; j++) {

            if (j > 0) {
                await this.pageNumberLink.nth(j).click();
                await this.page.waitForLoadState('load');
            }

            const count = await this.productsList.count();

            for (let i = 0; i < count; i++) {

                let priceText = await this.productsList
                    .nth(i)
                    .locator("bdi")
                    .last()
                    .textContent();

                let price = parseInt(priceText.split(".")[0].replace(/[^\d]/g, ''));

                if (price > maxPrice) {
                    maxPrice = price;

                    product.productName = await this.productsList
                        .nth(i)
                        .locator("h2")
                        .textContent();

                    product.productPrice = price;
                }
            }
        }

        console.log("Max price:", maxPrice);
        console.log("Product with Max price:", product.productName, product.productPrice);

        return product;
    }

    async verifyProductCountMentionedOverResult() {
        let flag = false;
        const productResultEle = await this.productResultCount.textContent();
        const productCountResult = productResultEle.split(" ");
        let pageNumbers = await this.pageNumberLink.count();
        let productCounts = 0;
        for (let i = 0; i <= pageNumbers - 1; i++) {
            if (i > 0) {
                await this.pageNumberLink.nth(i).click();
            }
            let productsCountOverPage = await this.productsList.count();
            productCounts = productCounts + productsCountOverPage;
        }

        console.log("Array is " + productCountResult);
        console.log("Product count is " + productCounts);
        flag = await productCountResult.includes(productCounts.toString());
        return flag;
    }


}