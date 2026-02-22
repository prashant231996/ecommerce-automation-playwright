import { expect } from "@playwright/test";
const envConfig = require('../configs/envSelector');
export class BasePage{

    constructor(page)
    {
        this.page=page;
        this.accountPageLink=page.locator("#ast-desktop-header a[href*='/account']");
        this.logoutLink=page.locator("//a[text()='Logout']")
        this.errorMsg=page.locator("//*[contains(@class,'notices-wrapper')]//*[contains(text(),'Error')]");
    }

    async logoutFromApp() {
        await this.accountPageLink.waitFor({ state: 'visible' });
        await expect(this.accountPageLink).toBeEnabled();
        await this.accountPageLink.click();
        await this.logoutLink.waitFor({ state: 'visible' });
        await expect(this.logoutLink).toBeEnabled();
        await this.logoutLink.click();
    }

    async navigateToAccountPage()
    {
            await this.page.goto(envConfig.baseURL);
            // await this.page.waitForLoadState('networkidle'); // wait until page finishes loading
            // console.log('Page fully loaded!');
            await expect(this.page).toHaveTitle("Account – AskOmDch");
   }

    async verifyUserLoggedIn(displayname)
    {
           this.userDisplayName=this.page.locator("(//*[contains(text(),'"+displayname+"')])[1]");
           await expect(this.userDisplayName).toBeVisible();
           await expect(this.logoutLink).toBeVisible();
    }

     async verifyErrorMsgDisplayedOnAccountPage()
    {
        await expect(this.errorMsg).toBeVisible();
    }
}