@userLogin

Feature: User SignIn

@positiveTest
Scenario: User sign in using valid account
    Given User open the website
    Then User click Sign In
    When User fill email with "kelvin@mail.com"
    And User fill Password with "12345678"
    And User click Sign In Button
    Then User success to login

@negativeTest
Scenario: User sign in using invalid account
    Given User open the website
    Then User click Sign In
    When User fill email with "kelvin@mail.com"
    And User fill Password with "23455678"
    And User click Sign In Button
    Then User fail to login