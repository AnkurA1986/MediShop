const{expect} = require('@playwright/test');

class AutoFillLogin {

constructor(page)
{
    this.page=page;
    this.autoFillLink = page.locator('#fill_demo_button');
    this.email = page.getByTestId('email_id');
    this.SignInButton = page.locator('#signin_button');
}

async loginPage()
{
    await this.page.goto('login.html');
    await expect(this.autoFillLink).toBeVisible();
}

async FillLoginForm()
{
    await this.autoFillLink.click();
    //await expect(this.email).toContainText('way2automation');
    await expect(this.email).toHaveValue(/way2automation/);
}

}

module.exports = {AutoFillLogin};

