// init action storage here

module.exports = class ActionInterface {
    static async generatorForActionsBetween(startTime, endTime) {
        const action = [ 'whichAction', "...args for that action" ]
        yield action
    }
    static onChange(callback) {

    }
    static async merge(actionGenerator, conflictResolver) {
        
    }
    static commitAllToDisk() {
        
    }
}