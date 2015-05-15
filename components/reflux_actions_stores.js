var GeneratorActions = Reflux.createActions(["closeStream", "openStream", "streamData"]);
var generatorStore = Reflux.createStore({
    listenables: GeneratorActions,

    onCloseStream: function() {
        this.executeAction_('STREAM_CLOSED');
    },

    onOpenStream: function() {
        this.executeAction_('STREAM_OPENED');
    },

    onStreamData: function(data) {
        this.executeAction_('STREAM_DATA', data);
    },

    executeAction_: function(operation, data) {
        var op = { action: operation};
        if (data) {
            op["data"] = data;
        } else {
            console.log(operation);
        }
        this.trigger(op);
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
});

var AnalyticsActions = Reflux.createActions(["complete"]);
var analyticsStore = Reflux.createStore({
    listenables: AnalyticsActions,

    onComplete: function(results) {
        this.trigger(results);
    }
});