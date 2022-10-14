import {Given, When, And, Then} from 'cypress-cucumber-preprocessor/steps'

const signUp = require('../../support/elements/signUp_elements.js')
const signUpObject = new signUp()

Given('User open the website', ()=>{
    cy
    .clearCookies()
    .visit('https://courses.ultimateqa.com/')
    .wait(3000)
})

Then('User click Sign In', () =>{
    cy
    .get(signUpObject.signInLink)
    .contains('Sign In')
    .click()
})

Then('User click Create a new Account', () =>{
    cy
    .get(signUpObject.signUpLink)
    .click()
})

When('User fill firstname with {string}', firstName => {
    cy
    .get(signUpObject.firstNameField)
    .type(firstName)
})

And('User fill lastname with {string}', lastName => {
    cy
    .get(signUpObject.lastNameField)
    .type(lastName)
})

And('User fill the email with {string}', email => {
    cy
    .get(signUpObject.emailField)
    .type(email+Date.now())
})

And('User fill the email with account {string}', email => {
    cy
    .get(signUpObject.emailField)
    .type(email)
})

And('User fill Password with {string}', password =>{
    cy
    .get(signUpObject.passwordField)
    .type(password)
})

And('User check the terms', () =>{
    cy
    .get(signUpObject.termCheckbox)
    .click()
})

Then('User click Sign Up Button', () =>{
    cy
    .get(signUpObject.signUpButton)
    .click()
    .wait(3000)
})

Then('User success to signup', () => {
    cy
    .get(signUpObject.success)
    .should('contain','My Dashboard')
})

Then('User will see an error message {string}', message =>{
    cy
    .get(signUpObject.message)
    .should('contain', message)
})