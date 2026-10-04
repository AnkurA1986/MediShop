const {Login} = require('..//PageObjectModels/Login');
const {AutoFillLogin} = require('..//PageObjectModels/AutoFillLogin');
const {AddMedToCart} = require('../PageObjectModels/AddMedToCart');

class POManager
{
    constructor (page)
    {
        this.page = page;
        this.login = new Login(this.page);
        this.autofill = new AutoFillLogin(this.page);
        this.addMed_Cart = new AddMedToCart(this.page);
    }

    getLoginPage()
    {
        return this.login;
    }

    autoFillCredentials()
    {
        return this.autofill;
    }

    addMedtoCart()
    {
        return this.addMed_Cart;
    }



}
module.exports = {POManager};