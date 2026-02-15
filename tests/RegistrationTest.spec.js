const {test}=require("@playwright/test");

import { RegistrationPage} from "../Pages/RegistrationPage";
import { faker } from "@faker-js/faker";

test("Registration Test", async({page})=>
{
    const registrationPage=new RegistrationPage(page);
    await registrationPage.navigateToAccountPage();
    const displayname=faker.person.firstName();
    const email=faker.internet.email();
    await registrationPage.doSignup(displayname,email,"Test@12345");
    await registrationPage.verifyUserLoggedIn(displayname);
    await registrationPage.logoutFromApp();
})