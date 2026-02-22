const {test}=require("@playwright/test");
const { LoginPage } = require("../Pages/LoginPage");
const envConfig = require("../configs/envSelector");

test("Verify search product functionality",async({page})=>
{
    const loginPage = new LoginPage(page);
    await loginPage.navigateToAccountPage();
    const homepage = await loginPage.doLogin(envConfig.username, envConfig.password);
    await homepage.verifyUserLoggedIn(envConfig.username);
    const storePage=await homepage.navigateToStorPage();
    const productPage=await storePage.searchProduct(envConfig.productName);
    await productPage.verifyProductTitle(envConfig.productName);
    await productPage.logoutFromApp();
});