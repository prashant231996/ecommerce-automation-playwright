const {test}=require("../tests/base/baseTest");
const envCofig=require("../configs/envSelector");
const { HomePage } = require("../Pages/HomePage");

test("Apply Filters to products Test",async({loggedInPage})=>
{
    const homePage=new HomePage(loggedInPage);
    const storePage=await homePage.navigateToStorPage();
    await storePage.page.waitForTimeout(5000);
    await storePage.verifyPageTitle("Store");
    const ProductCategoryPage=await storePage.browsByCategory(envCofig.categoryName);
    await ProductCategoryPage.verifyProductHeader(envCofig.categoryName);
});