const Order = require('../models/Order');

// add
async function addOrder(order) {
	const newOrder = await Order.create(order);

	return newOrder;
}

// get list with search and pagination
async function getOrders(search = '', limit = 10, page = 1) {
	const [orders, count] = await Promise.all([
		Order.find({
			problem: { $regex: search, $options: 'i' },
		})
			.limit(limit)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 }),
		Order.countDocuments({
			problem: { $regex: search, $options: 'i' },
		}),
	]);

	return {
		orders,
		lastPage: Math.ceil(count / limit),
	};
}

module.exports = {
	addOrder,
	getOrders,
};
