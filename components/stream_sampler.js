var StreamSampler = React.createClass({
    displayName: 'StreamSampler',

    propTypes: {
        data: React.PropTypes.string,
        sampleSize: React.PropTypes.number.isRequired
    },

    getInitialState: function() {
        return {
            status: 'ready'
        };
    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.data) {
            var sample = nextProps.data;
            this.process_(sample);
            this.setState({
                status: 'received: ' + sample
            });
        } else {
            this.setState({
                status: ''
            });
        }
    },

    process_: function(sample) {
        if (!this.resevoir_) {
            this.resevoir_ = new SampleReservoir(this.props.sampleSize);
        }
        this.resevoir_.add(sample);

        this.setState({
            status: 'received: ' + sample
        });
    },

    render: function() {
        return React.createElement("section",
            {
                id: 'stream-sampler'
            },
            React.createElement("h3", {}, "Representative Samples"),
            React.createElement("div", {}, this.state.status),
            React.createElement("div", {}, (this.resevoir_) ? this.resevoir_.samples() : '')
        );
    }
});