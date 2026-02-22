const {test}=require("@playwright/test");
import { LoginPage} from "../Pages/LoginPage";
const envConfig = require('../configs/envSelector');

test("Login Test",async({page})=>
{
    const loginPage=new LoginPage(page);
    await loginPage.navigateToAccountPage();
    const homepage=await loginPage.doLogin(envConfig.username,envConfig.password);
    await homepage.verifyUserLoggedIn(envConfig.username);
    await homepage.logoutFromApp();
})