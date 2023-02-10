import { test, expect } from '@playwright/test';
import LoginPage from '../pages/Login';
import ProductPage from '../pages/Product';

let login: LoginPage;
let product: ProductPage;

test.beforeEach(async ({ page }) => {
	// Go to the login page before each test.
	login = new LoginPage(page)
	product = new ProductPage(page)
	await login.goto();
});

test('The login page has the expected title', async ({ page }) => {
	// Expect the page title to be "Swag Labs"
	await expect(page).toHaveTitle(/Swag Labs/);
});

test('The standard user can log in', async ({ page }) => {
	//Login with the standard user
	await login.login(login.usernames['standard'], login.password);
	//Expect the product page to be visible
	await page.pause();
	await expect(page.locator('text=Products')).toBeVisible();
	expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
})

test('The locked user cannot log in. They see an error message upon login, which can be closed', async ({ page }) => {
	//Login with the locked user
	await login.login(login.usernames['locked'], login.password);
	//Expect the error message to be visible
	await expect(login.loginError).toBeVisible();
	await expect(login.loginError).toHaveText('Epic sadface: Sorry, this user has been locked out.');
	//User can close the error message and the error message is no longer visible
	await login.loginErrorButton.click();
	await expect(login.loginError).not.toHaveText('Epic sadface: Sorry, this user has been locked out.');
})

test('The performance user can log in', async ({ page }) => {
	//Login with the performance user
	await login.login(login.usernames['performance'], login.password);
})

test('The problem user can log in', async ({ page }) => {
	//Login with the problem user
	await login.login(login.usernames['problem'], login.password);
})

test('The user can log out', async ({ page }) => {
	//Login with the standard user
	await login.login(login.usernames['standard'], login.password);
	//Expect the product page to be visible
	await expect(page.locator('text=Products')).toBeVisible();
	//Click the logout button
	await page.locator('text=Open Menu').click();
	await page.locator('text=Logout').click();
	//Expect the login page to be visible
	await expect(page.locator('text=Username')).toBeVisible();
})



test('The user can add an item to the cart and then checkout with their information and then complete the purchase and then return to the products page and then logout', async ({ page }) => {
	//Login with the standard user
	await login.login(login.usernames['standard'], login.password);
	//Expect the product page to be visible
	await expect(page.locator('text=Products')).toBeVisible();
	//Add the first item to the cart
	await product.addToCart(product.backpack)
	//Click the cart button
	await product.clickCart()
	//Click the checkout button
	await page.locator('[data-test="checkout"]').click();
	//Fill out the checkout form
	await page.locator('[data-test="firstName"]').click();
	await page.locator('[data-test="firstName"]').fill('Test');
	await page.locator('[data-test="firstName"]').press('Tab');
	await page.locator('[data-test="lastName"]').fill('Guy');
	await page.locator('[data-test="lastName"]').press('Tab');
	await page.locator('[data-test="postalCode"]').fill('12345');
	//Click the continue button
	await page.locator('[data-test="continue"]').click();
	//Click the finish button
	await page.locator('[data-test="finish"]').click();
	//Log out
	await page.locator('[data-test="back-to-products"]').click();
	await page.getByRole('button', { name: 'Open Menu' }).click();
	await page.getByRole('link', { name: 'Logout' }).click();
})