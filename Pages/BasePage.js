import { expect } from "@playwright/test";
export class BasePage{

    constructor(page)
    {
        this.page=page;
        this.logoutLink=page.locator("//a[text()='Logout']")
    }

    async logoutFromApp() {
        this.logoutLink.click();
    }

    async navigateToAccountPage()
    {
            await this.page.goto("https://askomdch.com/account/");
            await this.page.waitForLoadState('networkidle'); // wait until page finishes loading
            console.log('Page fully loaded!');
            await expect(this.page).toHaveTitle("Account – AskOmDch");
   }

    async verifyUserLoggedIn(displayname)
    {
           this.userDisplayName=this.page.locator("(//*[contains(text(),'"+displayname+"')])[1]");
           await expect(this.userDisplayName).toBeVisible();
           await expect(this.logoutLink).toBeVisible();
    }
}