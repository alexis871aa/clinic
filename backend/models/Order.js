const mongoose = require('mongoose');
const validator = require('validator');

const OrderSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
			validate: {
				validator: (value) => validator.isMobilePhone(value, ['ru-RU']),
				message: 'Phone number should be a format phone number!',
			},
		},
		problem: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
