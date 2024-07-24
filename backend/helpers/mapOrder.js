module.exports = function (order) {
	return {
		id: order.id,
		name: order.name,
		phone: order.phone,
		problem: order.problem,
		sendAt: order.createdAt,
	};
};
