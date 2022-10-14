const chai = require('chai')
const assert = require('chai').expect
chai.use(require('chai-json-schema'))

const pagePayment = require('../page/payment_page.js')
const data = require('../data/payment_data.json')
const schema = require('../data/payment_schema.json')
const generateSignature = require('../test/generate_signature.js')

const testCase={
	describe: 'MC Payment Automation',
	generateSignature: 'Generate secret signature',
	positive: {
		successPayment : 'As a User, I want to be able do a success payment'
	},
	negative: {
		unauthorized : 'Cannot do payment with invalid token',
		noAmount : 'If the amount does not filled',
		lessAmount : 'If the amount below 10000',
		noMerchantId : 'If the merchant Id does not filled',
		invalidMerchantId : 'If the merchant id is invalid',
		noCustomerInfo : 'If the customer info does not filled',
		invalidCustomerInfo : 'If the customer info using special character other than @-_. (space)',
		noPaymentInfo : 'If the payment info does not filled',
		noOrderId : 'If the order id does not filled',
		invalidOrderId : 'If the order id using character other than alphabet, numeric, and -',
		invalidExpiredTime : 'If the expired time format is not ISO 8601',
		passedExpiredTime : 'If the expired tome is already passed',
		noSignatureKey : 'If the signature key does not filled',
		invalidSignatureKey : 'As a User, I does not want to do a payment without using valid signature',
		
	}
}

let newSignature
let accessToken = 'RvtfeVTF4HVRuHNhWA95', invalidToken = 'xxxxx'

describe(`@payment ${testCase.describe}`, () => {
	describe('@payment Positive Case', () => {
		it(`@payment ${testCase.positive.successPayment}`, async () => {
			let newData = JSON.parse(JSON.stringify(data.validData));

			newSignature = generateSignature.hash(data.secretKey+newData.mrc_id+newData.amount
				+newData.customer_info+newData.payment_info+newData.order_id);
			newData.signature = newSignature;

			const response = await pagePayment.postPayment(accessToken,data.paymentMethod, newData)
			assert(response.status).to.equal(201);
			assert(response.body.status_message).to.equal('Success transaction');
			assert(response.body).to.jsonSchema(schema)
		})
	})
	describe('@payment Negative Case', () => {
		it(`@payment ${testCase.negative.unauthorized}`, async () => {
			let newData = JSON.parse(JSON.stringify(data.validData));

			newSignature = generateSignature.hash(data.secretKey+newData.mrc_id+newData.amount
				+newData.customer_info+newData.payment_info+newData.order_id);
			newData.signature = newSignature;

			const response = await pagePayment.postPayment(invalidToken,data.paymentMethod, newData)
			assert(response.status).to.equal(401);
			assert(response.body.error).to.equal('Unauthorized');
		})

		it(`@payment ${testCase.negative.noAmount}`, async () => {
			let newData = JSON.parse(JSON.stringify(data.validData));

			newData.amount = null;
			newSignature = generateSignature.hash(data.secretKey+newData.mrc_id+newData.amount
				+newData.customer_info+newData.payment_info+newData.order_id);
			newData.signature = newSignature;

			const response = await pagePayment.postPayment(accessToken,data.paymentMethod, newData)
			assert(response.status).to.equal(400);
			assert(response.body.status_message).to.equal('Amount is required');
		})
		it(`@payment ${testCase.negative.lessAmount}`, async () => {
			let newData = JSON.parse(JSON.stringify(data.validData));
			
			newData.amount = data.lessAmount;
			newSignature = generateSignature.hash(data.secretKey+newData.mrc_id+newData.amount
				+newData.customer_info+newData.payment_info+newData.order_id);
			newData.signature = newSignature;

			const response = await pagePayment.postPayment(accessToken,data.paymentMethod, newData)
			assert(response.status).to.equal(400);
			assert(response.body.status_message).to.equal('Amount cannot be below than 10000');
		})
		it(`@payment ${testCase.negative.noMerchantId}`, async () => {
			let newData = JSON.parse(JSON.stringify(data.validData));

			newData.mrc_id = null;
			newSignature = generateSignature.hash(data.secretKey+newData.mrc_id+newData.amount
				+newData.customer_info+newData.payment_info+newData.order_id);
			newData.signature = newSignature;

			const response = await pagePayment.postPayment(accessToken,data.paymentMethod, newData)
			assert(response.status).to.equal(400);
			assert(response.body.status_message).to.equal('Merchant ID is required');
		})
		it(`@payment ${testCase.negative.invalidMerchantId}`, async () => {
			let newData = JSON.parse(JSON.stringify(data.validData));
			
			newData.mrc_id = data.invalidMerchantId;
			newSignature = generateSignature.hash(data.secretKey+newData.mrc_id+newData.amount
				+newData.customer_info+newData.payment_info+newData.order_id);
			newData.signature = newSignature;

			const response = await pagePayment.postPayment(accessToken,data.paymentMethod, newData)
			assert(response.status).to.equal(400);
			assert(response.body.status_message).to.equal('Merchant ID not found');
		})

		it(`@payment ${testCase.negative.noCustomerInfo}`, async () => {
			let newData = JSON.parse(JSON.stringify(data.validData));

			newData.customer_info = null;
			newSignature = generateSignature.hash(data.secretKey+newData.mrc_id+newData.amount
				+newData.customer_info+newData.payment_info+newData.order_id);
			newData.signature = newSignature;

			const response = await pagePayment.postPayment(accessToken,data.paymentMethod, newData)
			assert(response.status).to.equal(400);
			assert(response.body.status_message).to.equal('Customer Info is required');
		})
		it(`@payment ${testCase.negative.invalidCustomerInfo}`, async () => {
			let newData = JSON.parse(JSON.stringify(data.validData));
			
			newData.customer_info = data.invalidCustomerInfo;
			newSignature = generateSignature.hash(data.secretKey+newData.mrc_id+newData.amount
				+newData.customer_info+newData.payment_info+newData.order_id);
			newData.signature = newSignature;

			const response = await pagePayment.postPayment(accessToken,data.paymentMethod, newData)
			assert(response.status).to.equal(400);
			assert(response.body.status_message).to.equal('Customer Info only accepting alphabet, numeric, and special characters : @-._ (space)');
		})
		it(`@payment ${testCase.negative.noPaymentInfo}`, async () => {
			let newData = JSON.parse(JSON.stringify(data.validData));
			
			newData.payment_info = null;
			newSignature = generateSignature.hash(data.secretKey+newData.mrc_id+newData.amount
				+newData.customer_info+newData.payment_info+newData.order_id);
			newData.signature = newSignature;

			const response = await pagePayment.postPayment(accessToken,data.paymentMethod, newData)
			assert(response.status).to.equal(400);
			assert(response.body.status_message).to.equal('Payment Info is required');
		})

		it(`@payment ${testCase.negative.noOrderId}`, async () => {
			let newData = JSON.parse(JSON.stringify(data.validData));
			
			newData.order_id = null;
			newSignature = generateSignature.hash(data.secretKey+newData.mrc_id+newData.amount
				+newData.customer_info+newData.payment_info+newData.order_id);
			newData.signature = newSignature;

			const response = await pagePayment.postPayment(accessToken,data.paymentMethod, newData)
			assert(response.status).to.equal(400);
			assert(response.body.status_message).to.equal('Order ID is required');
		})

		it(`@payment ${testCase.negative.invalidOrderId}`, async () => {
			let newData = JSON.parse(JSON.stringify(data.validData));
			
			newData.order_id = data.invalidOrderId;
			newSignature = generateSignature.hash(data.secretKey+newData.mrc_id+newData.amount
				+newData.customer_info+newData.payment_info+newData.order_id);
			newData.signature = newSignature;

			const response = await pagePayment.postPayment(accessToken,data.paymentMethod, newData)
			assert(response.status).to.equal(400);
			assert(response.body.status_message).to.equal('Order ID could not contain special character');
		})
		it(`@payment ${testCase.negative.invalidExpiredTime}`, async () => {
			let newData = JSON.parse(JSON.stringify(data.validData));
			
			newData.expired_time = data.invalidExpiredTime;
			newSignature = generateSignature.hash(data.secretKey+newData.mrc_id+newData.amount
				+newData.customer_info+newData.payment_info+newData.order_id);
			newData.signature = newSignature;

			const response = await pagePayment.postPayment(accessToken,data.paymentMethod, newData)
			assert(response.status).to.equal(400);
			assert(response.body.status_message).to.equal('Expired Date must follow ISO 8601 format');
		})
		it(`@payment ${testCase.negative.passedExpiredTime}`, async () => {
			let newData = JSON.parse(JSON.stringify(data.validData));
			
			newData.expired_time = data.passedExpiredTime;
			newSignature = generateSignature.hash(data.secretKey+newData.mrc_id+newData.amount
				+newData.customer_info+newData.payment_info+newData.order_id);
			newData.signature = newSignature;

			const response = await pagePayment.postPayment(accessToken,data.paymentMethod, newData)
			assert(response.status).to.equal(400);
			assert(response.body.status_message).to.equal('Expired time must be in future');
		})
		it(`@payment ${testCase.negative.noSignatureKey}`, async () => {
			const response = await pagePayment.postPayment(accessToken,data.paymentMethod, data.validData)
			assert(response.status).to.equal(400);
			assert(response.body.status_message).to.equal('Signature Key is required');
		})
		it(`@payment ${testCase.negative.invalidSignatureKey}`, async () => {
			let newData = JSON.parse(JSON.stringify(data.validData));
			newData.signature = generateSignature.hash("randomText");

			const response = await pagePayment.postPayment(accessToken,data.paymentMethod, newData)
			assert(response.status).to.equal(400);
			assert(response.body.status_message).to.equal('invalid Signature key');
		})
	})
})