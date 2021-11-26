const fs = require("fs")
const path = require("path")
const _ = require("lodash")
const { uuid: v4 } = require("uuid")

function binarySearch(sortedArray, key, returnClosest=false) {
    let start = 0
    let end = sortedArray.length - 1
    
    let middle = 0
    while (start <= end) {
        middle = Math.floor((start + end) / 2)
    
        if (sortedArray[middle] === key) {
            // found the key
            return middle
        } else if (sortedArray[middle] < key) {
            // continue searching to the right
            start = middle + 1
        } else {
            // search searching to the left
            end = middle - 1
        }
    }
    // key wasn't found (return one below the closest match)
    if (returnClosest) {
        return middle
    } else {
        return null
    }
}

function flooredBinarySeach(sortedArray, key) {
    const closest = binarySearch(sortedArray, key, true)
    if (sortedArray[closest] > key) {
        return closest-1
    } else {
        return closest
    }
}

function ceilingBinarySeach(sortedArray, key) {
    const closest = binarySearch(sortedArray, key, true)
    if (sortedArray[closest] < key) {
        return closest+1
    } else {
        return closest
    }
}

function hash(object) {
    return JSON.stringify(object).split("").reduce(
        (hashCode, currentVal) => (hashCode = currentVal.charCodeAt(0) + (hashCode << 6) + (hashCode << 16) - hashCode),
        0
    )
}

module.exports = {
    _,
    fs,
    path,
    uuid,
    binarySearch,
    flooredBinarySeach,
    ceilingBinarySeach,
    hash,
}