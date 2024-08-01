const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
			match: [
				/^\+(74\d{9}|79\d{9})$/,
				'Phone number should be a format phone number!',
			],
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
