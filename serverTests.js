const date = require('date-and-time');

const minIntensity = 1;
const maxIntensity = 10;
const minDurationInSec = 1
const maxDurationInSec = 3600

module.exports = {
    MakeHeavyLoadTest: async function (req, res)
    {
        const intensity = req.body.TestParameters.Intensity;
        if(!ValidateIntensity(intensity))
        {
            return res.status(400).end(`Enter a Intensity between ${minIntensity} to ${maxIntensity}`)
        }

        const durationInSeconds = req.body.TestParameters.MinimalDurationInSeconds;
        if(!ValidateDuration(durationInSeconds))
        {
            return res.status(400).end(`Enter a Duration between ${minDurationInSec} to ${maxDurationInSec} seconds`)
        }

        const startTime = new Date();
        while(!IsTimesUp(startTime, durationInSeconds))
        {
            await MakeSmallLoopOfHeavyLoad(intensity)  
        }

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
    let sleepTimeInMs = maxIntensity * 2 - intensity * 2;
    if(sleepTimeInMs === 0)
    {
        sleepTimeInMs = 1
    }

    const numberOfIteration = 35000000 / sleepTimeInMs;
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= numberOfIteration; j++) {
            var dummy = dummy * i + i + dummy * i;
        }
        await Sleep(sleepTimeInMs)
    }
}

function IsTimesUp(startTime, durationInSeconds)
{
    let elapsedSeconds = date.subtract(new Date(), startTime).toSeconds()
    return elapsedSeconds > durationInSeconds;
    
}
