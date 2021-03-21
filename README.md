# Example of UI Testing Framework using Javascript, Chai, Chromedriver, Cucumber-js, Selenium for automationpractice.com website
* the site http://automationpractice.com/
```
$ git clone https://github.com/vsshk/javascript-chai-chromedriver-cucumberjs-selenium-example-automationpractice.git
$ cd javascript-chai-chromedriver-cucumberjs-selenium-example-automationpractice
```
#### Dependencies:
* chromedriver has to be in path https://chromedriver.chromium.org/downloads
* Before doing the setup, validate that you already have installed NodeJS (6 or high). 
* Chrome browser installed.
* in package.json update "dependencies": {"chromedriver": "^n"} where n your version of Chrome browser.
* Pull dependencies:
```
$ npm install
```
This will create all the project structure for the "node_modules" folder 
and will create a package-lock.json file.
* run the command:
```
$ npm test 
```
```
Given the following user stories
Feature: User Creates an account
Scenario: User can create an account
Scenario: User can log in account
```
* in order to run headless open features\step_definitions\automationpractice.js and uncomment //// driver setup 'headless' block  
