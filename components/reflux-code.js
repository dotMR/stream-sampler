var GeneratorActions = Reflux.createActions(["closeStream", "openStream", "streamData"]);

var generatorStore = Reflux.createStore({
    listenables: GeneratorActions,

    onCloseStream: function(data) {
        console.log('stream closed');
    },

    onOpenStream: function(data) {
        console.log('stream opened');
    },

    onStreamData: function(data) {
        console.log('new data: ' + data);
        this.trigger(data);
    }
});

var FormActions = Reflux.createActions(["reset", "start", "stop"]);

var formActionsStore = Reflux.createStore({
    listenables: FormActions,

    onReset: function() {
        this.executeAction_('RESET');
    },

    onStart: function(config) {
        this.executeAction_('START', config);
    },

    onStop: function() {
        this.executeAction_('STOP');
    },

    executeAction_: function(operation, config) {
        var op = { action: operation};
        if (config) {
            op["config"] = config;
        }
        this.trigger(op);
    }
})

// TODO: implement start, reset of generator and have components respond as they wish
// GOAL: less controller interference and code

// var ConfigActions = Reflux.createActions(["sampleSizeUpdated"]);

// var configStore = Reflux.createStore({
//     listenables: ConfigActions,

//     onSampleSizeUpdated: function(num) {
//         console.log('new sample size: ' + num);
//         this.trigger(num);
//     }
// });