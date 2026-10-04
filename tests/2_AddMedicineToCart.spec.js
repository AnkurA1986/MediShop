const {test} = require('@playwright/test');
const {POManager} = require('../PageObjectModels/POManager');

const loginData = JSON.parse(JSON.stringify(require('../TestData/login.json')));
const medData = JSON.parse(JSON.stringify(require('../TestData/medicine.json')));

let pom;

test.beforeEach(async ({ page }) => {
    pom = new POManager(page);
})

test('Search fever medicine and add it to cart', async () => {
    const email = loginData.validUser.username;
    const password = loginData.validUser.password;
    const search = medData.medicineName.searchTerm;
    await pom.getLoginPage().login(email, password);
    await pom.addMedtoCart().SearchFeverMedicine(search);
    await pom.addMedtoCart().AddToCart_FeverMedicine(search);
})