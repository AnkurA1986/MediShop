const{expect} = require('@playwright/test');

class Login {
    constructor(page) {
        this.page = page;
        this.Email = page.locator('#email_id');
        this.Password = page.getByTestId('password_id');
        this.SignInButton = page.locator('#signin_button');
        this.invalidLoginMsg = page.getByTestId('login_alert_message');
        this.homeButton = page.getByTestId('nav_home');
    }

    async goTo() {
        await this.page.goto('login.html');
    }

    async EnterValidLoginCredentials(email, password) {
        await this.Email.fill(email);
        await this.Password.fill(password);
    }

    async LoginSuccessfull() {
        await this.SignInButton.click();
        await expect(this.page).toHaveURL('home.html');
        await expect(this.homeButton).toBeVisible();
    }

    async InvalidLogin(email, password) {
        await this.Email.fill(email);
        await this.Password.fill(password);
        await this.SignInButton.click();
        await expect(this.invalidLoginMsg).toBeVisible();
        console.log(await this.invalidLoginMsg.textContent());
    }

    async login(email, password)
    {
        await this.page.goto('login.html');
        await this.Email.fill(email);
        await this.Password.fill(password);
        await this.SignInButton.click();
    }
}
module.exports = { Login };