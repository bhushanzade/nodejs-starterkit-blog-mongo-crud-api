require('dotenv').config();
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

require('./config/mongo_config');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PATCH, PUT, POST, GET, DELETE, OPTIONS, HEAD');
    next();
});

bodyParser = require('body-parser');
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}));

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({
    uploadDir: './temporary'
});

app.use(multipartMiddleware);

var userRouter = require('./api/routes/user');
var blogRouter = require('./api/routes/blog');

app.use('/user', userRouter);
app.use('/blogs', blogRouter);

app.listen(port);
console.log('RESTful API server started on: ' + port);