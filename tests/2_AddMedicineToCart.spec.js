const {test} = require('@playwright/test');
const {POManager} = require('../PageObjectModels/POManager');

const loginData = JSON.parse(JSON.stringify(require('../TestData/login.json')));
const medData = JSON.parse(JSON.stringify(require('../TestData/medicine.json')));

let pom;

test.beforeEach(async ({ page }) => {
    pom = new POManager(page);
})

test('Search fever medicine and add it to cart', async () => {
    await pom.getLoginPage().login(loginData.validUser.username, loginData.validUser.password);
    await pom.addMedtoCart().SearchFeverMedicine(medData.medicineName.searchTerm);
    //await pom.addMedtoCart().AddToCart_FeverMedicine(search);
})