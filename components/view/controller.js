var SimulatorController = React.createClass({
    displayName: 'SimulatorController',

    mixins: [
        Reflux.listenTo(analyticsStore, "onAnalyticsChange_"),
        Reflux.listenTo(sampleStore, "onSamplesChange_"),
        Reflux.listenTo(streamStore, "onStreamChange_")
    ],

    getInitialState: function() {
        return {
            analyticStatus: 'Ready',
            freqMap: null,
            numSamples: 0,
            samples: null,
            sampleSize: 0,
            sampleStatus: 'Ready',
            streamStatus: 'Ready'
        };
    },

    onAnalyticsChange_: function(data) {
        this.setState( {
            analyticStatus: data.status,
            freqMap: data.freqMap,
            numSamples: data.numSamples,
            sampleSize: data.sampleSize
        });
    },

    onSamplesChange_: function(data) {
        this.setState( {
            samples: data.samples,
            sampleStatus: data.status
        });
    },

    onStreamChange_: function(data) {
        this.setState( {
            streamStatus: data.status
        });
    },

    render: function() {
        return React.createElement("div",
            {
                id: 'simulator'
            },
            React.createElement("h2", {}, "Visual Stream Sampling Simulator"),
            React.createElement("p", {}, "Generates a random and representative sample from the incoming input stream of unknown length."),
            React.createElement(InputForm, {}),
            React.createElement(StreamStatus, {
                status: this.state.streamStatus
            }),
            React.createElement(StreamSampler, {
                samples: this.state.samples,
                status: this.state.sampleStatus
            }),
            React.createElement(StreamAnalyzer, {
                freqMap: this.state.freqMap,
                numSamples: this.state.numSamples,
                sampleSize: this.state.sampleSize,
                status: this.state.analyticStatus
            })
        );
    }
});