const { Given, When, Then, AfterAll } = require('cucumber');
const { Builder, By, Capabilities, until, Key } = require('selenium-webdriver');
const { expect, assert } = require('chai');


////////////////////////////////////////////////////////////////////
//// driver setup 'headless' 
// console.log('Headless test run');
// const chrome = require('selenium-webdriver/chrome');
// const screen = {
// width: 640,
// height: 480
// };

// const capabilities = Capabilities.chrome();
// capabilities.set('chromeOptions');
// const driver = new Builder().forBrowser('chrome')
// .setChromeOptions(new chrome.Options().headless().windowSize(screen))
// .build();
////////////////////////////////////////////////////////////////////
//// driver setup 'Headful' 
console.log('headful test run');
require("chromedriver");
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions');
const driver = new Builder().withCapabilities(capabilities).build();
////////////////////////////////////////////////////////////////////


Given('I am on Homepage', async function () {
    await driver.getCurrentUrl().then(url => {        
        if (url === 'http://automationpractice.com/index.php'){
            expect(url).equal('http://automationpractice.com/index.php')
        } else {
            driver.get('http://automationpractice.com/index.php');
        }
    });
});

Given('I have a valid account', async function () {
    await driver.getCurrentUrl().then(url => {        
        if (url === 'http://automationpractice.com/index.php?controller=authentication&back=my-account'){
            expect(url).equal('http://automationpractice.com/index.php?controller=authentication&back=my-account')
        } else {
            driver.get('http://automationpractice.com/index.php?controller=authentication&back=my-account');
        }
    });
});

When('I click on {string} link', {timeout: 30000}, async function(text){
    await driver.findElement(By.linkText(text)).then((el)=>{
        el.click();
    });
});

When('I click over {string} button', async function(text){
    await driver.findElement(By.id(text)).then((el) => {
        el.click();
        driver.sleep(3000);
    });
});

Then('I am on {string} page', {timeout: 60000}, async function(page) {
    (await driver).sleep(3000);
    await driver.wait(until.elementLocated(By.css('h1.page-heading'), 10000)).then((el) => {
        el.getAttribute("textContent").then((atr)=>{
            expect(atr).to.equal(page);
        });
    });
});

Then('I validate {string} form is displayed', {timeout: 60000}, async function(form){
    await driver.wait(until.elementLocated(By.id(form), 10000)).then((el)=>{
        expect(el.isDisplayed());
    });
});

Then('I validate {string} link is displayed', {timeout: 60000}, async function(link){
    await driver.wait(until.elementLocated(By.xpath('//a//span[text()="' + link + '"]'), 10000)).then((el)=>{
        expect(el.isDisplayed());
    });
});

Then('I check option {string} from Title', {timeout: 60000}, async function(option) {
    driver.wait(until.elementLocated(By.xpath(('//label[contains(.,"' + option + '")]'), 10000))).then((el) => {
        el.click();
    });
});


Then('I set {string} input with {string} value', {timeout: 60000}, async function (tagid, value) {
    const input = await driver.findElement(By.id(tagid));
    input.clear();
    await driver.findElement(By.id(tagid)).then((el) => {
        el.getAttribute('value').then((atr)=>{
            expect(atr).to.equal('');
        });        
    });
    input.sendKeys(value);
    await driver.findElement(By.id(tagid)).then((el) => {
        el.getAttribute('value').then((atr)=>{
            expect(atr).to.equal(value);
        });        
    });
});

Then('I validate {string} input contains {string} value', {timeout: 20000}, async function (tagid, value) {
    await driver.findElement(By.name(tagid)).then((el) => {
        el.getAttribute('value').then((atr)=>{
            expect(atr).to.equal(value);
        });        
    });
});

Then('I click {string} options and select {string} position', {timeout: 30000}, async function(tagid, pos) {
    const options = By.id(tagid);
    const position = By.xpath('//select[@id="' + tagid + '"]/option[@value="' + pos + '"]');
    await driver.findElement(options).then((el)=>{
        el.getAttribute("selectedIndex").then((index) => {
            expect(index).to.equal('0');
        });
        el.click();
    });

    await driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(position))

    await driver.findElement(position).then((el) => {
        el.click();
    });

    await driver.findElement(options).then((el)=>{
        el.getAttribute("selectedIndex").then((index) => {
            expect(index).to.equal(pos);
        });
    });        
});

Then('I click {string} options and select {string} value', {timeout: 30000}, async function(tagid, text) {
    const options = By.id(tagid);
    const position = By.xpath('//select[@id="' + tagid + '"]/option[contains(text(),"' + text + '")]');
    let pos;
    await driver.findElement(options).then((el)=>{
        el.getAttribute("selectedIndex").then((index) => {
            expect(index).to.equal('0');
        });
        el.click();
    });

    await driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(position))

    await driver.findElement(position).then((el) => {
        el.getAttribute("index").then((index) => {
            pos = index;
        });
        el.click();

        driver.findElement(options).then((opts)=>{
            opts.getAttribute("selectedIndex").then((index) => {
                expect(index).to.equal(pos);
            });
        });
    });
});

Then('I validate {string} user created', {timeout: 20000}, async function(text){
    await driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(By.linkText(text)))

    await driver.findElement(By.linkText(text)).then((el)=>{
        expect(el.isDisplayed());
    });
});

AfterAll('end', async function(){
    await driver.quit();
});