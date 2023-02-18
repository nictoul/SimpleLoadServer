var fs = require("fs");

const minIntensity = 1;
const maxIntensity = 100;
const minDurationInSec = 1
const maxDurationInSec = 3600

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

    MakeHeavyLoadTest: async function (req, res)
    {
        var intensity = req.body.TestParameters.Intensity
        if(!ValidateIntensity(intensity))
        {
            return res.status(400).end(`Enter a Intensity between ${minIntensity} to ${maxIntensity}`)
        }

        var durationInSeconds = req.body.TestParameters.DurationInSeconds
        if(!ValidateDuration(durationInSeconds))
        {
            return res.status(400).end(`Enter a Duration between ${minDurationInSec} to ${maxDurationInSec} seconds`)
        }

        await MakeSmallLoopOfHeavyLoad(intensity)

        return res.send("HeavyLoad - Done");
    }
}

function ValidateIntensity(intensity)
{
    return intensity >= minIntensity && intensity <= maxIntensity;
}

function ValidateDuration(duration)
{
    return duration >= minDurationInSec && duration <= maxDurationInSec;
}

function Sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


//Method have been roughly balanced (can be affected by hardware) to take the same time with different intensity
//For low intensity the CPU sleep often
async function MakeSmallLoopOfHeavyLoad(intensity)
{
    var sleepTimeInMs = maxIntensity - intensity
    if(sleepTimeInMs === 0)
    {
        sleepTimeInMs = 1
    }


    var numberOfIteration = 35000000 / sleepTimeInMs
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= numberOfIteration; j++) {
            var dummy = dummy * i + i + dummy * i;
        }
        await Sleep(sleepTimeInMs)
    }
}