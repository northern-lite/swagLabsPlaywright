import {test, Page, Locator} from '@playwright/test';
//Page object model for login page

export default class Product {
    //Product locators
    readonly page: Page;
    readonly backpack: Locator;
    readonly bikeLight: Locator;
    readonly boltTshirt: Locator;
    readonly fleeceJacket: Locator;
    readonly onesie: Locator;
    readonly redTshirt: Locator;
    //Header locators
    readonly cartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        //Product locators
        this.backpack = page.locator('[class="inventory_item"]:has-text("Sauce Labs Backpack")')
        this.bikeLight = page.locator('[class="inventory_item"]:has-text("Sauce Labs Bike Light")')
        this.boltTshirt = page.locator('[class="inventory_item"]:has-text("Sauce Labs Bolt T-Shirt")')
        this.fleeceJacket = page.locator('[class="inventory_item"]:has-text("Sauce Labs Fleece Jacket")')
        this.onesie = page.locator('[class="inventory_item"]:has-text("Sauce Labs Onesie")')
        this.redTshirt = page.locator('[class="inventory_item"]:has-text("Test.allTheThings() T-Shirt (Red)")')
        //Header locators
        this.cartButton = page.locator('a[class="shopping_cart_link"]')
    }
    async goto(){
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }
    async addToCart(product: Locator){
        await product.locator('button:has-text("ADD TO CART")').click()
    }
    async clickCart(){
        await this.cartButton.click()
    }
}
