var express = require('express');
var app = express();
var simpleUsage = require('./simpleUsage');
var serverTests = require('./serverTests');
const logger = require("./logger");

app.use(express.json());

// ****************** Server start ******************
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
    console.log("Use http://localhost:%s", port)
 })


 // ****************** API ******************
app.get('/simpleUsage/users', function (req, res) { ExecuteRequest(req, res, simpleUsage.GetUsers)})
app.get('/simpleUsage/users/:id', function (req, res) { ExecuteRequest(req, res, simpleUsage.GetUsersWithId)})
app.post('/simpleUsage/simplePost', function (req, res) { ExecuteRequest(req, res, simpleUsage.ProcessSimplePost)})

app.get('/serverTests/heavyLoad/:id', function (req, res) { ExecuteRequest(req, res, serverTests.HeavyLoad)})
app.post('/serverTests/heavyLoad', function (req, res) { ExecuteRequest(req, res, serverTests.MakeHeavyLoadTest)})


function ExecuteRequest(req, res, func)
{
    logger.logRequest(req, res)
    func(req, res)
    logger.logResponse(req, res)
}