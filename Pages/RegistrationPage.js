import { expect } from "@playwright/test"
import { BasePage } from "./BasePage";

export class RegistrationPage extends BasePage{

    constructor(page)
    {
        this.page=page;
        this.accoutLink=page.locator("//a[text()='Account']");
        this.registerHeader=page.locator("//*[text()='Register']");
        this.register_username=page.locator("#reg_username");
        this.register_email=page.locator("#reg_email");
        this.register_pwd=page.locator("#reg_password");
        this.register_btn=page.locator("//button[@name='register']");
        this.userDisplayName=page.locator("(//*[contains(text(),'test01')])[1]");
        this.logoutLink=this.page.locator("//a[text()='Logout']")

    }

    async doSignup(userName,email,password)
    {
        //await this.page.waitFor(this.registerHeader);
        await this.register_username.fill("");
        await this.register_username.fill(userName);
        await this.register_email.fill("");
        await this.register_email.fill(email);
        await this.register_pwd.fill("");
        await this.register_pwd.fill(password);
        await this.register_btn.click();
    }

}