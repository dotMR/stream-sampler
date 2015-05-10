var StreamSampler = React.createClass({
    displayName: 'StreamSampler',

    propTypes: {
        data: React.PropTypes.string,
        resetComponent: React.PropTypes.bool,
        sampleSize: React.PropTypes.number.isRequired
    },

    getInitialState: function() {
        return {
            status: 'Ready'
        };
    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.data) {
            var sample = nextProps.data;
            this.process_(sample);
            this.setState({
                status: ''
            });
        } else if (nextProps.resetComponent) {
            this.reset_();
        }
    },

    reset_: function() {
        this.resevoir_ = null;
        this.setState({
            status: 'Ready'
        });
    },

    process_: function(sample) {
        console.log('Received: ' + sample);
        if (!this.resevoir_) {
            this.resevoir_ = new SampleReservoir(this.props.sampleSize);
        }
        this.resevoir_.add(sample);
    },

    getResultsSection_: function() {
        if (!this.resevoir_) {
            return null;
        }

        return React.createElement(HorizontalSampleDisplay, {
            results: this.resevoir_.samples(),
            title: "Reservoir Samples"
        },
        null
        );
    },

    render: function() {
        return React.createElement("section",
            {
                id: 'stream-sampler'
            },
            React.createElement("h3", {}, "Samples"),
            React.createElement("div", {}, this.state.status),
            this.getResultsSection_()
        );
    }
});

var HorizontalSampleDisplay = React.createClass({
    displayName: 'HorizontalSampleDisplay',

    propTypes: {
        results: React.PropTypes.array,
        title: React.PropTypes.string
    },

    render: function() {
        if (!this.props.results || this.props.results.length == 0) {
            return null;
        }

        var members = [];
        this.props.results.forEach( function(result, index) {
            members.push(
                React.createElement("div",
                    {
                        className: 'result',
                        key: 'result_' + index
                    },
                    React.createElement("div", { key: result.data, className: 'result-sample' }, result.data)
                )
            );
        });

        return React.createElement("div", {},
            React.createElement("h4", {}, this.props.title),
            React.createElement("div", { className: 'results-map' }, members)
        );
    }
});