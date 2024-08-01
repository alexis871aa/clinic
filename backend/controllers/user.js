const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generate } = require('../helpers/token');
const ROLES = require('../constants/roles');

// signUp register
async function register(email, password) {
	if (!password) {
		throw new Error('Password is empty');
	}

	const passwordHash = await bcrypt.hash(password, 10);

	const user = await User.create({ email, password: passwordHash });

	const token = generate({ id: user.id });

	return {
		token,
		user,
	};
}

// signIn login
async function login(email, password) {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('User not found!');
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password);

	if (!isPasswordMatch) {
		throw new Error('Wrong password!');
	}

	const token = generate({ id: user.id });

	return {
		token,
		user,
	};
}

// getUsers get all users
async function getUsers() {
	return await User.find();
}

module.exports = {
	register,
	login,
	getUsers,
};
