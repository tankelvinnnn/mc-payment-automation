import {Given, When, And, Then} from 'cypress-cucumber-preprocessor/steps'

const signIn = require('../../support/elements/signIn_elements.js')
const signInObject = new signIn()

Given('User open the website', ()=>{
    cy
    .clearCookies()
    .visit('https://courses.ultimateqa.com/')
    .wait(3000)
})

Then('User click Sign In', () =>{
    cy
    .get(signInObject.signInLink)
    .contains('Sign In')
    .click()
})

When('User fill email with {string}', email => {
    cy
    .get(signInObject.emailField)
    .type(email)
})

And('User fill Password with {string}', password =>{
    cy
    .get(signInObject.passwordField)
    .type(password)
})

And('User click Sign In Button', () =>{
    cy
    .get(signInObject.signInButton)
    .contains('Sign in')
    .click()
})

Then('User success to login', () => {
    cy
    .wait(3000)
    .get(signInObject.success)
    .should('contain','My Dashboard')
})

Then('User fail to login', () =>{
    cy
    .wait(3000)
    .get(signInObject.message)
    .should('contain','Invalid email or password.')
})