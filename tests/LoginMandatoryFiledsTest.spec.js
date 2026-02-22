const {test} =require("@playwright/test");
const { LoginPage } = require("../Pages/LoginPage");
import { faker } from "@faker-js/faker";

test("Verify mandatory details for login page",async({page})=>
{
    const loginPage=new LoginPage(page);
    await loginPage.navigateToAccountPage();
    const displayName=faker.person.firstName();
    const pwd=faker.person.lastName();
    await loginPage.doLogin("",pwd);
    await loginPage.verifyErrorMsgDisplayedOnAccountPage();
    await loginPage.doLogin(displayName,"");
    await loginPage.verifyErrorMsgDisplayedOnAccountPage();
});