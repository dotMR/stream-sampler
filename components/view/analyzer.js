var StreamAnalyzer = React.createClass({
    displayName: 'StreamAnalyzer',

    propTypes: {
        freqMap: React.PropTypes.array,
        numSamples: React.PropTypes.number,
        sampleSize: React.PropTypes.number,
        status: React.PropTypes.string
    },

    getSamplesCountComponent_: function() {
        if (this.props.numSamples <= 0) {
            return null;
        }

        return React.createElement("span", {}, "Samples Seen: " + this.props.numSamples);
    },

    render: function() {
        return React.createElement("section",
            {
                id: 'stream-sampler'
            },
            React.createElement("h3", {}, "Analytics"),
            React.createElement("div", {}, this.props.status),
            this.getSamplesCountComponent_(),
            React.createElement(ResultsMap,
                {
                    results: this.props.freqMap,
                    numResults: this.props.sampleSize
                }
            )
        );
    }
});