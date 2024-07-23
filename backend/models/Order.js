const mongoose = require('mongoose');
const validator = require('validator');

const PostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
			validate: {
				validator: (value) =>
					validator.isURL(value, { protocols: ['http', 'https', 'ftp'] }),
				message: 'Image should be a valid URL!',
			},
		},
		content: {
			type: String,
			required: true,
		},
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
	},
	{ timestamps: true },
);

const Order = mongoose.model('Order', PostSchema);

module.exports = Order;
