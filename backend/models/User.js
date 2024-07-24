const mongoose = require('mongoose');
const roles = require('../constants/roles');
const validator = require('validator');

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: (value) => validator.isEmail(value),
				message: 'Email should be a valid email',
			},
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: Number,
			default: roles.ADMIN,
		},
	},
	{ timestamps: true },
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
