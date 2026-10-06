const {test} = require('@playwright/test');
const {POManager} = require('../PageObjectModels/POManager');
const loginData = JSON.parse(JSON.stringify(require('../TestData/login.json')));

let pom;

test.beforeEach(async({page})=>{
    pom = new POManager(page);
})

test('Login with valid user', async () => {
    await pom.getLoginPage().goTo();
    await pom.getLoginPage().EnterValidLoginCredentials(loginData.validUser.username, loginData.validUser.password);
    await pom.getLoginPage().LoginSuccessfull();
})

test('Login with invalid user', async () => {
    await pom.getLoginPage().goTo();
    await pom.getLoginPage().InvalidLogin(loginData.invalidUser.username, loginData.invalidUser.password);
})

test('Login with Auto fill details', async () => {
    await pom.autoFillCredentials().loginPage();
    await pom.autoFillCredentials().FillLoginForm();
    await pom.getLoginPage().LoginSuccessfull();
})