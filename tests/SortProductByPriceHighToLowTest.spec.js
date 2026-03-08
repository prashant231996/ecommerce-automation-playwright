const {test,expect}=require("./base/baseTest");
const envCofig=require("../configs/envSelector");
const { HomePage } = require("../Pages/HomePage");


test("Product Sorting, From High Price To Low Price", async({loggedInPage})=>
{
    const homePage=new HomePage(loggedInPage);
    const storePage=await homePage.navigateToStorPage();
    const productWithMaxPrice=await storePage.getProductDetailsWithMaxPrice();
    await storePage.sortProductByPriceHightToLow();
    const products = await storePage.getFirstSortedPrroductDetails();
    expect(await productWithMaxPrice.productName).toBe(await products.productName);
});