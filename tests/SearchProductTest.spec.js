const {test}=require("../tests/base/baseTest");
const { LoginPage } = require("../Pages/LoginPage");
const envConfig = require("../configs/envSelector");
const { HomePage } = require("../Pages/HomePage");

test("Verify search product functionality",async({loggedInPage})=>
{
    const homepage = new HomePage(loggedInPage);
    const storePage=await homepage.navigateToStorPage();
    const productPage=await storePage.searchProduct(envConfig.productName);
    await productPage.verifyProductTitle(envConfig.productName);
});