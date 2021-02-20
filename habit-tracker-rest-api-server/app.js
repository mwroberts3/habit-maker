const express = require('express'),
app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const habitRoutes = require('./routes/habits-routes');

const authRoutes = require('./routes/auth-routes');

app.use(bodyParser.json()); //application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/habits', habitRoutes);

app.use(authRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose.connect('mongodb+srv://mwroberts:mwr92089@cluster0.ko3ht.mongodb.net/habits?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(5050);
    })
    .catch(err => console.log(err));