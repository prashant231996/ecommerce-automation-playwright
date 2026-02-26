import { test as base } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { BasePage } from '../../Pages/BasePage';
const envCofig=require("../../configs/envSelector");

// base.beforeAll(async ({ browser }) => {
//    const context=browser.newContext();
//    const page=(await context).newPage();
//    const loginPage=new LoginPage(page);
//    loginPage.doLogin(envCofig.username,envCofig.password);
//    loginPage.verifyUserLoggedIn(envCofig.username);
//    return loginPage;
// });

export const test = base.extend({
  loggedInPage: async ({ page }, use) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToAccountPage();
  await loginPage.doLogin(envCofig.username, envCofig.password);
  await loginPage.verifyUserLoggedIn(envCofig.username);

  await use(page);

  // automatic cleanup
  if (!page.isClosed()) {
    const basePage = new BasePage(page);
    await basePage.logoutFromApp();
  }
},
});

// base.afterAll(async({browser})=>
// {
//     const context=browser.newContext();
//     const page=(await context).newPage();
//     const loginPage=new LoginPage(page);
//     loginPage.logoutFromApp();
// })

//export const test = base;
export { expect } from '@playwright/test';