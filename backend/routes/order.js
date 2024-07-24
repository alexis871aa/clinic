const express = require('express');
const { addOrder, getOrders } = require('../controllers/order');
const mapOrder = require('../helpers/mapOrder');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
	const { orders, lastPage } = await getOrders(
		req.query.search,
		req.query.limit,
		req.query.page,
	);

	res.send({ data: { orders: orders.map(mapOrder), lastPage } });
});

router.post('/', async (req, res) => {
	const newOrder = await addOrder({
		name: req.body.name,
		phone: req.body.phone,
		problem: req.body.problem,
	});

	res.send({ data: mapOrder(newOrder) });
});

module.exports = router;
