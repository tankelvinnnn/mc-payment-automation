@userLogin

Feature: User SignUp

@positiveTest
Scenario: User sign up using valid account
    Given User open the website
    Then User click Sign In
    Then User click Create a new Account
    When User fill firstname with "kelvin"
    And User fill lastname with "kelvin"
    And User fill the email with "kelvintest@mail.com"
    And User fill Password with "12345678"
    And User check the terms
    Then User click Sign Up Button
    Then User success to signup

@negativeTest
Scenario: User sign up with empty first name
    Given User open the website
    Then User click Sign In
    Then User click Create a new Account
    When User fill firstname with ""
    And User fill lastname with "kelvin"
    And User fill the email with "kelvintest@mail.com"
    And User fill Password with "12345678"
    And User check the terms
    Then User click Sign Up Button
    Then User will see an error message "First name can't be blank"

Scenario: User sign up with empty last name
Given User open the website
    Then User click Sign In
    Then User click Create a new Account
    When User fill firstname with "kelvin"
    And User fill lastname with ""
    And User fill the email with "kelvintest@mail.com"
    And User fill Password with "12345678"
    And User check the terms
    Then User click Sign Up Button
    Then User will see an error message "Last name can't be blank"

Scenario: User sign up with empty email
Given User open the website
    Then User click Sign In
    Then User click Create a new Account
    When User fill firstname with "kelvin"
    And User fill lastname with "kelvin"
    And User fill the email with ""
    And User fill Password with "12345678"
    And User check the terms
    Then User click Sign Up Button
    Then User will see an error message "Email can't be blank"

Scenario: User sign up with registered email
    Given User open the website
    Then User click Sign In
    Then User click Create a new Account
    When User fill firstname with "kelvin"
    And User fill lastname with "kelvin"
    And User fill the email with "kelvintest@mail.com"
    And User fill Password with "12345678"
    And User check the terms
    Then User click Sign Up Button
    Then User will see an error message "Email has already been taken"

Scenario: User sign up with invalid email
    Given User open the website
    Then User click Sign In
    Then User click Create a new Account
    When User fill firstname with ""
    And User fill lastname with "kelvin"
    And User fill the email with "kelvintest"
    And User fill Password with "12345678"
    And User check the terms
    Then User click Sign Up Button
    Then User will see an error message "Email is invalid"

Scenario: User sign up with empty password
    Given User open the website
    Then User click Sign In
    Then User click Create a new Account
    When User fill firstname with "kelvin"
    And User fill lastname with "kelvin"
    And User fill the email with "kelvintest@mail.com"
    And User fill Password with ""
    And User check the terms
    Then User click Sign Up Button
    Then User will see an error message "Password can't be blank"

Scenario: User sign up with password less than 8 characters
    Given User open the website
    Then User click Sign In
    Then User click Create a new Account
    When User fill firstname with "kelvin"
    And User fill lastname with "kelvin"
    And User fill the email with "kelvintest@mail.com"
    And User fill Password with "1234567"
    And User check the terms
    Then User click Sign Up Button
    Then User will see an error message "Password must be at least 8 characters."

Scenario: User sign up with does not check the terms
    Given User open the website
    Then User click Sign In
    Then User click Create a new Account
    When User fill firstname with ""
    And User fill lastname with "kelvin"
    And User fill the email with "kelvintest@mail.com"
    And User fill Password with "12345678"
    Then User click Sign Up Button
    Then User will see an error message "Terms must be accepted"