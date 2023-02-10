import {test, Page, Locator} from '@playwright/test';
//Page object model for login page

export default class LoginPage {
    
    readonly page: Page;
    readonly usernames: object;
    readonly password: string
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly loginError: Locator;
    readonly loginErrorButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.usernames = {
            standard: 'standard_user',
            locked: 'locked_out_user',
            problem: 'problem_user',
            performance: 'performance_glitch_user'
        };
        this.password = 'secret_sauce';
        this.usernameField = page.locator('#user-name')
        this.passwordField = page.locator('#password')
        this.loginButton = page.locator('text=Login')

        this.loginError = page.locator('.error-message-container')
        this.loginErrorButton = this.loginError.locator('button')
    }
    async goto(){
        await this.page.goto('https://www.saucedemo.com/');
    }
    async login(username: string, password: string){
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click()
    }
}
