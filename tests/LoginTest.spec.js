const {test}=require("@playwright/test");
import { LoginPage} from "../Pages/LoginPage";

test("Login Test",async({page})=>
{
    const loginPage=new LoginPage(page);
    await loginPage.navigateToAccountPage();
    await loginPage.doLogin("TestUserPM","Test@12345");
    await loginPage.verifyUserLoggedIn("TestUserPM");
    await loginPage.logoutFromApp();

})