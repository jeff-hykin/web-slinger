module.exports = class SnapshotInterface {
    static tempDuplicateOfSnapshotBefore(unixTimestamp) {
        // data needs to be copied so that mutations don't affect originals
        return new SnapshotInterface(unixTimestamp)
    }
    static forceWrite(duplicate, unixTimestamp, previousValidityTimestamp) {
        // remove all snapshots between previousValidityTimestamp, and unixTimestamp
    }

    constructor(unixTimestamp) {
        this.node = {
            exists(nodeId) {
                
            },
            get(nodeId) {

            },
            set(nodeId, jsonAbleValue) {

            }
            delete(nodeId) {
                
            }
        }
        // a lock method for atomic operations
        this.exclusiveAccessTo = async (timeWindow, nodeIdList, callback) => {
            // timeWindow is miliseconds, and is encase the process accidentally goes unresponsive
            // this function needs to put some kind of locking mechanisim on all the node ids (for edge and node operations)
            // then once the function ends or the time runs out (whichever is first) the locks are unlocked and this function returns
            // also provide the callback with a means of extending the time window
            const extendTimeWindow = (extensionAmount)=>{
                timeWindow += extensionAmount
            }
            const lock = Math.random()
            try {
                // give them a refresh wait function for extending the timeout
                await callback(extendTimeWindow)
                // server.unlock(lock)
            } catch (error) {
                console.error(error)
            }
        }
        this.edge = {
            // 
            // min interface
            // 
            exists(fromNodeId, name, toId) {
                // name is allowed to be null or string
            },
            allTo(nodeId) {
                
            },
            allFrom(nodeId) {
                
            },
            add(fromNodeId, name, toNodeId) {

            },
            remove(fromNodeId, name, toNodeId) {
                
            },
            // 
            // polyfill-able interface
            // 
            countAllTo(nodeId) { // ref count

            },
            removeAllFrom(nodeId) {
                
            },
            existsTo(nodeId) {
                // name is allowed to be null or string
            },
        }
        this.commitToDisk = async () => {

        }
    }
}

