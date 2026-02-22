const {test} =require("@playwright/test");
const { RegistrationPage } = require("../Pages/RegistrationPage");
import { faker } from "@faker-js/faker";

test("Verify mandatory details on Regisration page",async({page})=>
{
    const registraionPage=new RegistrationPage(page);
    registraionPage.navigateToAccountPage();
    const displayName=faker.person.firstName();
    const email=faker.internet.email();
    //Case 1) Without filling password field
    await registraionPage.doSignup(displayName,email,"");
    await registraionPage.verifyErrorMsgDisplayedOnAccountPage();
    //Case 2) Without filling email field
    const password=faker.person.lastName();
    await registraionPage.doSignup(displayName,"",password);
    await registraionPage.verifyErrorMsgDisplayedOnAccountPage();
    //Case 3) Without filling display name field
    await registraionPage.doSignup("",email,password);
    await registraionPage.verifyErrorMsgDisplayedOnAccountPage();
})
