var StreamSampleController = React.createClass({
    displayName: 'StreamSampleController',

    render: function() {
        return React.createElement("div",
            {
                id: 'simulator'
            },
            React.createElement("h2", {}, "Visual Stream Sampling Simulator"),
            React.createElement("p", {}, "This simulator generates a random and representative sample from the incoming input stream of unknown length."),
            React.createElement(SampleSetupForm, {}),
            React.createElement(StreamGenerator, {}),
            React.createElement(StreamSampler, {}),
            React.createElement(StreamAnalyzer, {})
        );
    }
});