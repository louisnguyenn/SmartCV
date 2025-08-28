import express from 'express';
const router = express.Router();

// always put static routes above dynamic routes
router.get('/', (req, res) => {
	res.send('User List');
});

router.get('/new', (req, res) => {
	res.send('User new form');
});

router.post('/', (req, res) => {
	res.send('Create User');
});

// dynamic parameters
router
	.route('/:id')
	.get((req, res) => {
		console.log(req.user);
		res.send(`User Get With ID ${req.params.id}`);
	})
	.put((req, res) => {
		req.params.id;
		res.send(`User Get With ID ${req.params.id}`);
	})
	.delete((req, res) => {
		req.params.id;
		res.send(`User Get With ID ${req.params.id}`);
	});

// middleware, code that runs between the start and end of the request
const users = [{ name: 'Kyle' }, { name: 'Sally' }];
router.param('id', (req, res, next, id) => {
	req.user = users[id];
	next();
});

module.exports = router;
