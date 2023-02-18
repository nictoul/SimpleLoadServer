var fs = require("fs");

module.exports = {
    GetUsers: function (req, res)
    {
        fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
            res.end( data );
         });
    },
    
    GetUsersWithId: function (req, res)
    {
        // First read existing users.
       fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        var users = JSON.parse( data );
        var user = users["user" + req.params.id] 
        res.end( JSON.stringify(user));
     });
    },
    
    ProcessSimplePost: function (req, res)
    {
        //client json post:
        /*
        {
            "user": {
                "name": "John"
            }
        }
        */
    
        console.log(req.body.user.name);
        res.end(req.body.user.name)
    }
}

