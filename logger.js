
module.exports = {
    logRequest: function (request, response)
    {
        console.log(`==== Request ${request.method} ${request.url} ${JSON.stringify(request.body)}`);
    },
    logResponse: function (request, response)
    {
        console.log(`**** Response ${request.method} ${request.url} ${response.statusCode}`);
    }
}
