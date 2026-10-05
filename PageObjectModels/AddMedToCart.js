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

    async SearchFeverMedicine(searchType)
    {
        await this.ShopButton.click();
        await expect(this.PageHeading).toBeVisible();
        await this.SearchBox.clear();
        await this.SearchBox.fill(searchType);
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('networkidle');
        const productCount = await this.ProductCards.count();

        if (productCount > 0)
        {
            await this.ProductCards.first().waitFor({ state: 'visible' });
            const ProdTypeCount = await this.prodType.count();
            let medName;
            for (let i = 0; i < ProdTypeCount; i++) 
                {
                const text = await this.prodType.nth(i).textContent()??'';
                if (text.toLowerCase() === searchType) 
                    {
                    medName = (await this.ProductCards.nth(i).locator('h3').textContent()) ?? '';
                    await this.ProductCards.nth(i).locator('.product-foot button').click();
                    break;
                    }
                }
            await this.toastMessage.waitFor({ state: 'visible' });
            console.log(await this.toastMessage.textContent());
            await this.cartIcon.click();
            await expect(this.CartItems.first()).toBeVisible();
            const CartItemsCount = await this.CartItems.count();
            for (let i = 0; i < CartItemsCount; i++) 
                {
                    if (await this.CartItemName.nth(i).textContent() === medName) 
                    {
                    await expect(true,`${medName} added to cart successfully`).toBeTruthy();
                    }
                    else
                        {
                        await expect(true, `${searchType} medicine not added to cart`).toBeFalsy();
                        }
                    }
        }

        else
        {
            expect (false,`${searchType} medicine not found`).toBeTruthy();
            return;
        }
    }

}
module.exports = { AddMedToCart };