const { _, fs, path, uuid, binarySearch, flooredBinarySeach, ceilingBinarySeach, hash } = require("./utils")

// functionality goals
//    - value can be either pure (just JS) or linked (includes Node-class objects)
//    - addresses can be node ids, key lists, or Node objects (which contain an id)
//    - set(address, value)
//    - link(address, address)
//    - get.node(address)
//    - get.value(address, depth)
//    - get.id(address)
//    - exists(address)
//    - delete(address)
//    - keys(address)
//    - increment(address)
//    - onShallowChange(address)

function setupOperationsOn({ node, edge, exclusiveAccessTo }) {
    const exists = {}
    const put    = {}
    const snatch = {} // snatch is the dangerous form of "get"
    const get    = {}
    const keys   = {}
    
    exists.usingId = async function (id) {
        return node.exists(id)
    }
    snatch.usingId = async function (id) { 
        return node.get(id)
    }
    put.primitive = async function (parentId, name, value) {
        const id = hash(value)
        let primitiveNode
        // if exists
        if (exists.usingId(id)) {
            primitiveNode = await snatch.usingId(id)
        } else {
            primitiveNode = { id, value, }
            await node.set(id, primitiveNode)
        }
        await edge.add(parentId, name, primitiveNode.id)
        return primitiveNode.id
    }
    put.freshValue = async function (parentId, name, value) {
        const item = {
            id: uuid(),
            lastUpdated: (new Date()).getTime(),
        }
        // connection to parent first 
        await edge.add(parentId, name, item.id)
        // FIXME: still need to handle the case of recursive data structures inside a pure value
        
        // base case
        if (!(value instanceof Object)) {
            return put.primitive(item.id, value)
        // recursive case
        } else {
            for (const [key, subValue] of Object.entries(value)) {
                await put.freshValue(item.id, key, subValue)
            }
        }
        return item.id
    }
    keys.usingId = async function (id) {
        if (!(await exists.usingId(id))) {
            return undefined
        // does exist
        } else {
            const node = await snatch.usingId(id)
            // if primitive
            if ('value' in node) {
                // primitive has no keys
                return null
            // if object
            } else {
                return (await edge.allFrom(id)).map(([id, name, to])=>name)
            }
        }
    }

    // FIXME: there needs to be a way to handle mid-level errors and undo changes
    
}


function makeLatestSnapshotUpToDate(lastValidTime) {
    const lastValidSnapshotTime = dataStorge.snapshots.getTimeOfLastValidSnapshot({ lastValidTime })
    const unprocessedActions = getActionsFrom(lastValidTime, Infinity)
    // TODO: may want to enumerate this in the future for storage/read/write efficiency
    for (const [ action, ...args ] of unprocessedActions) {
        if (action == 'set') {
        } else if (action == 'link') {
        } else if (action == 'delete') {
        } else if (action == 'increment') {
        }
    }
}

// TODO: handle live changes