const { expect } = require("@playwright/test");


class AddMedToCart {
    constructor(page) {
        this.page = page;
        this.ShopButton = page.getByTestId('nav_shop');
        this.PageHeading = page.locator("//h1[text()='Search medicines']");
        this.SearchBox = page.getByTestId('product_search_input');
        this.ProductCards = page.locator('.product-card');
        this.toastMessage = page.locator('.toast.toast-success');
        this.cartIcon = page.getByTestId('cart_button');
        this.CartItems = page.locator('#cart_items');
        this.CartItemName = page.locator('#cart_items tr a');
        this.prodType = page.locator('.product-cat');
    }

    async SearchFeverMedicine(searchType) {
        await this.ShopButton.click();
        await expect(this.PageHeading).toBeVisible();
        await this.SearchBox.clear();
        await this.SearchBox.fill(searchType);
        await this.page.keyboard.press('Enter');
        await this.ProductCards.first().waitFor({ state: 'visible' });
    }

    async AddToCart_FeverMedicine(search) {
        //const searchLowerCase = search.toLowerCase();
        const ProdTypeCount = await this.prodType.count();
        let medName;
        for (let i = 0; i < ProdTypeCount; i++) {
            if ((await this.prodType.nth(i).textContent()).toLowerCase() === search) {
                medName = await this.ProductCards.nth(i).locator('h3').textContent()
                await this.ProductCards.nth(i).locator('.product-foot button').click();
                break;
            }
        }
        await this.toastMessage.waitFor({ state: 'visible' });
        console.log(await this.toastMessage.textContent());
        await this.cartIcon.click();
        await expect(this.CartItems.first()).toBeVisible();
        const CartItemsCount = await this.CartItems.count();
        for (let i = 0; i < CartItemsCount; i++) {
            if (await this.CartItemName.nth(i).textContent() === medName) {
                await expect(true).toBeTruthy();
            }
            else {
                await expect(true).toBeFalsy();
            }
        }
    }
}
module.exports = { AddMedToCart };