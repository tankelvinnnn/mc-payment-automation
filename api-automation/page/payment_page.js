const supertest = require('supertest')
require('dotenv').config()

const api = supertest('https://api-staging.mcpayment.id')

const postPayment = (token, method, payload)=>
  api
    .post(`/va/transactions`)
	.set('x-api-key', token)
	.query({payment: method})
	.send(payload)

module.exports = {
	postPayment
};