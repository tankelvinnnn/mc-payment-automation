class signUp {
    constructor() {
      // selector input and button
      this.signInLink = 'a[href*=/users/sign_in]'
      this.signUpLink = 'a[href*=/users/sign_up]'
      this.firstNameField = 'input[id="user[first_name]"]'
      this.lastNameField = 'input[id="user[last_name]"]'
      this.emailField = 'input[id="user[email]"]'
      this.passwordField = 'input[id="user[password]"]'
      this.termCheckbox = 'input[id="user[terms]"]'
      this.signUpButton = 'button[value="Sign up"]'
      this.success = 'li[class="header__nav-item"]'
      this.message = 'li[role="alert"]'
    }
  }
  module.exports = signUp