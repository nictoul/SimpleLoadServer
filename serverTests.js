var fs = require("fs");

module.exports = {
    HeavyLoad: function (req, res)
{
    var minLoadValue = 1
    var maxLoadValue = 10000

    if(req.params.id >= minLoadValue && req.params.id <= maxLoadValue)
    {
        var numberOfIteration = 2000000
        console.log("HeavyLoad - Starting test with %s x %s loop of calculation", req.params.id, numberOfIteration)
        for (let j = 0; j < req.params.id; j++) {
            for (let i = 1; i <= numberOfIteration; i++) {
                var dummy = dummy * i + i + dummy * i;
            }    
        }
        
        console.log("HeavyLoad - Done");
        return res.send("HeavyLoad - Done");
    }else{
        var answer = `Enter a value between ${minLoadValue} to ${maxLoadValue}`
        res.end(answer)
    }    
    console.log("HeavyLoad - Wrong value passed");
},

    MakeHeavyLoadTest: function (req, res)
    {
        var intensity = req.body.TestParameters.Intensity
        var sleepTimeInMs
        if(intensity >= 0 && intensity <= 1000)
        {
            sleepTimeInMs = 1000 - intensity
        }        

            var numberOfIteration = 20000
            for (let j = 0; j < req.params.id; j++) {
                for (let i = 1; i <= numberOfIteration; i++) {
                    var dummy = dummy * i + i + dummy * i;
                }
                Sleep(sleepTimeInMs)
            }

            console.log("HeavyLoad - Done");
            return res.send("HeavyLoad - Done");
    },
    
    Sleep: function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
}

