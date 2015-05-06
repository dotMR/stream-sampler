var StreamSampleController = React.createClass({
    displayName: 'StreamSampleController',

    getInitialState: function() {
        return {
            openStream: false,
            sampleSize: 0,
            streamData: '',
            streamInput: ''
        };
    },

    handleStartSimulation_: function(inputStream, sampleSize) {
        this.setState({
            openStream: true,
            streamInput: inputStream,
            sampleSize: parseInt(sampleSize)
        });
    },

    handleStopSimulation_: function() {
        this.setState({
            openStream: false,
            streamData: null
        });
    },

    handleStreamDataAvailable_: function(data) {
        this.setState({
            streamData: data
        });
    },

    render: function() {
        return React.createElement("div",
            {
                id: 'simulator'
            },
            React.createElement("h2", {}, "Visual Stream Sampling Simulator"),
            React.createElement(SampleSetupForm,
                {
                    sampleSize: this.state.sampleSize,
                    streamInput: this.state.streamInput,
                    onStartSimulation: this.handleStartSimulation_,
                    onStopSimulation: this.handleStopSimulation_
                }
            ),
            React.createElement(StreamGenerator,
                {
                    onData: this.handleStreamDataAvailable_,
                    onClose: this.handleStopSimulation_,
                    source: this.state.streamInput,
                    openStream: this.state.openStream,
                }
            ),
            React.createElement(StreamSampler,
                {
                    data: this.state.streamData,
                    sampleSize: this.state.sampleSize
                }
            ),
            React.createElement(StreamAnalyzer,
                {
                    data: this.state.streamData,
                    sampleSize: this.state.sampleSize
                }
            )
        );
    }
});