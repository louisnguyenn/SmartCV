const express = require('express');
const app = express();

app.use(express.static('../client/build'));
app.set('view engine', 'ejs');

// method to download files
// res.download('server.js');

const userRouter = require('./routes/users');

app.use('/users', userRouter);

app.listen(3000);
