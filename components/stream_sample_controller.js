var StreamSampleController = React.createClass({
    displayName: 'StreamSampleController',

    getInitialState: function() {
        return {
            openStream: false,
            resetComponents: false,
            sampleSize: 0,
            streamData: '',
            streamInput: ''
        };
    },

    handleStartSimulation_: function(inputStream, sampleSize) {
        this.setState({
            openStream: true,
            resetComponents: false,
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

    handleResetSimulation_: function() {
        this.setState({
            resetComponents: true
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
            React.createElement("p", {}, "This simulator generates a random and (hopefully) representative sample from the incoming input stream of unknown length."),
            React.createElement(SampleSetupForm,
                {
                    sampleSize: this.state.sampleSize,
                    streamInput: this.state.streamInput,
                    onResetSimulation: this.handleResetSimulation_,
                    onStartSimulation: this.handleStartSimulation_,
                    onStopSimulation: this.handleStopSimulation_
                }
            ),
            React.createElement(StreamGenerator,
                {
                    onData: this.handleStreamDataAvailable_,
                    onClose: this.handleStopSimulation_,
                    resetComponent: this.state.resetComponents,
                    source: this.state.streamInput,
                    openStream: this.state.openStream,
                }
            ),
            React.createElement(StreamSampler,
                {
                    data: this.state.streamData,
                    resetComponent: this.state.resetComponents,
                    sampleSize: this.state.sampleSize
                }
            ),
            React.createElement(StreamAnalyzer,
                {
                    data: this.state.streamData,
                    resetComponent: this.state.resetComponents,
                    sampleSize: this.state.sampleSize
                }
            )
        );
    }
});