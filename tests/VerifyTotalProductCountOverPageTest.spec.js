const {test,expect}=require("../tests/base/baseTest");
const envCofig=require("../configs/envSelector");
const { HomePage } = require("../Pages/HomePage");

test("Verify total products present over page",async({loggedInPage})=>
{
    const homePage=new HomePage(loggedInPage);
    const storePage=await homePage.navigateToStorPage();
    expect(await storePage.verifyProductCountMentionedOverResult()).toBeTruthy();
});
