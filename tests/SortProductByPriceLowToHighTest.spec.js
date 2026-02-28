const { HomePage } = require("../Pages/HomePage");
const { test, expect } = require("../tests/base/baseTest");
const envCofig = require("../configs/envSelector");

test("Sort products by price: Low to High", async ({ loggedInPage }) => {

    const homePage = new HomePage(loggedInPage);
    const storePage = await homePage.navigateToStorPage();
    await storePage.page.waitForTimeout(5000);
    await storePage.verifyPageTitle("Store");
    const ProductCategoryPage = await storePage.browsByCategory(envCofig.categoryName);
    await ProductCategoryPage.verifyProductHeader(envCofig.categoryName);
    let lowest_Price = await ProductCategoryPage.getLowerPriceOfProduct();
    let product_Name = await ProductCategoryPage.getProductWithLowerPrice(lowest_Price);
    /*
      Verify after sorting product details with price low to high, first product should appear with lowest price
    */
    await ProductCategoryPage.sortProductByPriceLowToHigh();
    let actualProductName = await ProductCategoryPage.getFirstProductDetails();
    expect(actualProductName).toBe(product_Name);
});