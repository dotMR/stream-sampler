var StreamSampler = React.createClass({
    displayName: 'StreamSampler',

    propTypes: {
        samples: React.PropTypes.array,
        status: React.PropTypes.string
    },

    getResultsSection_: function() {
        if (!this.props.samples) {
            return null;
        }

        return React.createElement(HorizontalSampleDisplay, {
                results: this.props.samples,
                title: "Reservoir Samples"
            }
        );
    },

    render: function() {
        return React.createElement("section",
            {
                id: 'stream-sampler'
            },
            React.createElement("h3", {}, "Samples"),
            React.createElement("div", {}, this.props.status),
            this.getResultsSection_()
        );
    }
});