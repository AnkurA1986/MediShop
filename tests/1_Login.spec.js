const {test} = require('@playwright/test');
const {POManager} = require('../PageObjectModels/POManager');
const loginData = JSON.parse(JSON.stringify(require('../TestData/login.json')));

let pom;

test.beforeEach(async({page})=>{
    pom = new POManager(page);
})

test('Login with valid user', async () => {
    const email = loginData.validUser.username;
    const password = loginData.validUser.password;
    await pom.getLoginPage().goTo();
    await pom.getLoginPage().EnterValidLoginCredentials(email, password);
    await pom.getLoginPage().LoginSuccessfull();
})

test('Login with invalid user', async () => {
    const email = loginData.invalidUser.username;
    const password = loginData.invalidUser.password;
    await pom.getLoginPage().goTo();
    await pom.getLoginPage().InvalidLogin(email, password);
})

test('Login with Auto fill details', async () => {
    await pom.autoFillCredentials().loginPage();
    await pom.autoFillCredentials().FillLoginForm();
    await pom.getLoginPage().LoginSuccessfull();
})