const { _, fs, path, uuid, binarySearch, flooredBinarySeach, ceilingBinarySeach, hash } = require("../utils")

function getActionsFrom(startTime, endTime) {
    const actionTimes = Object.keys(actions)
    const indexOfStart = ceilingBinarySeach(actionTimes, startTime)
    const indexOfEnd = flooredBinarySeach(actionTimes, endTime)
    // cover very rare case of startTime == endTime, and no exact match of time value
    const actionKeys = actionTimes.slice(indexOfStart, indexOfEnd+1)
    return actionKeys.map(eachKey=>actions[eachKey])
}
