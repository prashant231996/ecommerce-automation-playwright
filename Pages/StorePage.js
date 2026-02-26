import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ProductPage } from "./ProductPage";
import { ProductCategoryPage } from "./ProductCategoryPage";

export class StorePage extends BasePage
{
    constructor(page)
    {
        super(page);
        this.page=page;
        this.productSearch=page.locator("input.search-field");
        this.searchBtn=page.locator("button[value='Search']");
        this.productCategoryEle=page.locator("#product_cat");
    }

    async searchProduct(productName)
    {
        await this.productSearch.fill("");
        await this.productSearch.fill(productName);
        await this.searchBtn.click();
        return new ProductPage(this.page);
    }

    async browsByCategory(categoryName)
    {
        await this.productCategoryEle.scrollIntoViewIfNeeded();
        const productCategories=await this.page.$$("#product_cat option");
        let flag=false;
        for(const productCategory of productCategories)
        {
            let value=await productCategory.getAttribute('value');
            if(value===categoryName)
            {
                await this.productCategoryEle.selectOption({value:categoryName});
                flag=true;
                console.log("Clicked product category option "+categoryName);
                break;
            }
        }
        if(!flag)
        {
            console.log("Mentioned product category is not available !!");
        }
        expect(flag).toBeTruthy();
        return new ProductCategoryPage(this.page);
    }
}