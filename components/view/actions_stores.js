var GlobalActions = Reflux.createActions(["reset", "start", "stop"]);
var StreamActions = Reflux.createActions(["data", "stop"]);

var analyticsStore = Reflux.createStore({
    init: function() {
        this.listenTo(GlobalActions.start, this.onStart_);
        this.listenTo(GlobalActions.reset, this.onReset_);
        this.listenTo(StreamActions.data, this.onStreamData_);

        this.loadInitialState_();
    },

    loadInitialState_: function() {
        this.setSampleSize(0);
        this.setState('Ready', 0, []);
        this.dispatchState();
    },

    setState: function(message, numSamples, freqMap) {
        this.statusMessage_ = message;
        this.numSamples_ = numSamples;
        this.freqMap_ = freqMap;
    },

    setSampleSize: function(size) {
        this.sampleSize_ = size;
    },

    dispatchState: function() {
        var state = {
            freqMap: this.freqMap_,
            numSamples: this.numSamples_,
            sampleSize: this.sampleSize_,
            status: this.statusMessage_
        };

        this.trigger(state);
    },

    onReset_: function() {
        this.resevoir_ = null;

        this.setState('Ready', 0, []);
        this.dispatchState();
    },

    onStart_: function(config) {
        var numSamples = config.sampleSize;
        this.setSampleSize(numSamples);
        this.metrics_ = new DataAnalyzer(numSamples);
    },

    onStreamData_: function(data) {
        if (data) {
            this.metrics_.add(data);
            this.setState('', this.metrics_.numSamples(), this.metrics_.freqMap());
            this.dispatchState();
        }
    }
});

var sampleStore = Reflux.createStore({
    init: function() {
        this.listenTo(GlobalActions.reset, this.onReset_);
        this.listenTo(GlobalActions.start, this.onStart_);
        this.listenTo(StreamActions.data, this.onStreamData_);

        this.loadInitialState_();
    },

    loadInitialState_: function() {
        this.setAndDispatch('Ready', null);
    },

    setAndDispatch: function(message, samples) {
        this.statusMessage_ = message;
        this.samples_ = samples;

        var state = {
            status: this.statusMessage_,
            samples: this.samples_
        };

        this.trigger(state);
    },

    onReset_: function(reset) {
        this.resevoir_ = null;

        this.setAndDispatch('Ready', null);
    },

    onStart_: function(config) {
        this.resevoir_ = new SampleReservoir(config.sampleSize);
    },

    onStreamData_: function(data) {
        if (data) {
            this.resevoir_.add(data);

            this.setAndDispatch('', this.resevoir_.samples());
        }
    }
});

var streamStore = Reflux.createStore({
    init: function() {
        this.listenTo(GlobalActions.start, this.onStart_);
        this.listenTo(GlobalActions.stop, this.onStop_);
        this.listenTo(GlobalActions.reset, this.onReset_);

        this.loadInitialState_();
    },

    loadInitialState_: function() {
        this.setAndDispatch('Ready', null);
    },

    onReset_: function() {
        this.generator_ = null;
        this.resetStreamer_();

        this.setAndDispatch('Ready', null);
    },

    onStart_: function(config) {
        this.generator_ = new StreamGenerator(config.source);
        this.resetStreamer_();
        this.streamer_ = window.setInterval(this.streamOnInterval_, 200);
    },

    onStop_: function() {
        this.resetStreamer_();

        this.setAndDispatch('Stopped', null);
    },

    resetStreamer_: function() {
        if (this.streamer_) {
            window.clearInterval(this.streamer_);
            this.streamer_ = 0;
        }
    },

    setAndDispatch: function(message, data) {
        this.statusMessage_ = message;
        this.streamData_ = data;

        var state = {
            status: this.statusMessage_,
            data: this.streamData_
        };

        this.trigger(state);
    },

    streamOnInterval_: function() {
        var data = this.generator_.nextChunk();
        if (data) {
            var message = 'Streaming ' + data;
            this.setAndDispatch(message, null);
            StreamActions.data(data);
        } else {
            this.onStop_();
        }
    }
});