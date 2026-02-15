import { BasePage } from "./BasePage";
export class LoginPage extends BasePage{

    constructor(page)
    {
        super(page);
        this.page=page;
        this.usernameField=page.locator("#username");
        this.passwordField=page.locator("#password");
        this.loginBtn=page.locator("button[name='login']");
    }

    async doLogin(username,password)
    {
        await this.usernameField.fill("");
        await this.usernameField.fill(username);
        await this.passwordField.fill("");
        await this.passwordField.fill(password);
        await this.loginBtn.click();
    }
}  