class signIn {
    constructor() {
      // selector input and button
      this.emailField = 'input[id="user[email]"]'
      this.passwordField = 'input[id="user[password]"]'
      this.message = 'li[role="alert"]'
      this.signInButton = 'button[value="Sign in"]'
      this.signInLink = 'a[href*=/users/sign_in]'
      this.success = 'li[class="header__nav-item"]'
    }
  }
  module.exports = signIn