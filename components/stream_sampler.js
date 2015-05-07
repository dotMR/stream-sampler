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