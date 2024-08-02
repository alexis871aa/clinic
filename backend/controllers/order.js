const Order = require('../models/Order');

// add
async function addOrder(order) {
	const newOrder = await Order.create(order);

	return newOrder;
}

// get list with search and pagination
async function getOrders(
	search = '',
	limit = 10,
	page = 1,
	sortBy = 'createdAt',
	order = 'asc',
) {
	const searchQuery = search
		? {
				$or: [
					{ name: { $regex: search, $options: 'i' } },
					{ problem: { $regex: search, $options: 'i' } },
				],
			}
		: {};

	let sortCriteria;
	switch (sortBy) {
		case 'name':
			sortCriteria = { name: order === 'asc' ? 1 : -1 };
			break;
		case 'problem':
			sortCriteria = { problem: order === 'asc' ? 1 : -1 };
			break;
		case 'date':
		default:
			sortCriteria = { createdAt: order === 'asc' ? 1 : -1 };
			break;
	}

	const [orders, count] = await Promise.all([
		Order.find(searchQuery)
			.limit(limit)
			.skip((page - 1) * limit)
			.sort(sortCriteria),
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
