const {test}=require("@playwright/test");

import { RegistrationPage} from "../Pages/RegistrationPage";

test("Registration Test", async({page})=>
{
    const registrationPage=new RegistrationPage(page);
    await registrationPage.navigateToAccountPage();
    await registrationPage.doSignup("TestUserPM","TestPM@gmail.com","Test@12345");
    await registrationPage.verifyUserLoggedIn("TestUserPM");
    await registrationPage.logoutFromApp();
})