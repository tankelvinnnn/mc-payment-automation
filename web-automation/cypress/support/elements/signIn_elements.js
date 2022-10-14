class signIn {
    constructor() {
      // selector input and button
      this.emailField = 'input[id="user[email]"]'
      this.passwordField = 'input[id="user[password]"]'
      this.message = 'ul[class="form-error__list"]'
      this.signInButton = 'input[value="Sign in"]'
      this.signInLink = 'li[class="header__nav-item header__nav-sign-in"]'
      this.success = 'li[class="header__nav-item"]'
    }
  }
  module.exports = signIn