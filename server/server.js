const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index');
	console.log('Here');
	// res.download('server.js');
});

app.get('/users', (req, res) => {
	res.send('User List');
});

app.get('/users/new', (req, res) => {
	res.send('User new form');
});

app.listen(3000);
