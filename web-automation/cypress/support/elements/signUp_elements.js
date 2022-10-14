class signUp {
    constructor() {
      // selector input and button
      this.signInLink = 'li[class="header__nav-item header__nav-sign-in"]'
      this.signUpLink = 'a[href*="/users/sign_up"]'
      this.firstNameField = 'input[id="user[first_name]"]'
      this.lastNameField = 'input[id="user[last_name]"]'
      this.emailField = 'input[id="user[email]"]'
      this.passwordField = 'input[id="user[password]"]'
      this.termCheckbox = 'input[id="user[terms]"]'
      this.signUpButton = 'input[value="Sign up"]'
      this.success = 'li[class="header__nav-item"]'
      this.message = 'ul[class="form-error__list"]'
    }
  }
  module.exports = signUp