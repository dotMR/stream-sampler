var StreamGenerator = React.createClass({
    displayName: 'StreamGenerator',

    propTypes: {
        onData: React.PropTypes.func.isRequired,
        onClose: React.PropTypes.func,
        resetComponent: React.PropTypes.bool,
        source: React.PropTypes.string,
        openStream: React.PropTypes.bool
    },

    getInitialState: function() {
        return {
            status: 'Ready'
        };
    },

    componentWillMount: function() {
        this.resetGenerator_();
    },

    componentWillReceiveProps: function(nextProps) {
        // trigger on rising edge
        if (nextProps.openStream && !this.props.openStream) {
            this.handleStartGenerator_();
        }
        // trigger on falling edge
        else if (!nextProps.openStream && this.props.openStream) {
            this.handleStopGenerator_()
        }
        else if (nextProps.resetComponent) {
            this.reset_();
        }
    },

    reset_: function() {
        this.resetGenerator_();

        this.setState({
            status: 'Ready'
        });
    },

    resetGenerator_: function() {
        this.iterator_ = 0;
        if (this.generator_) {
            window.clearInterval(this.generator_);
            this.generator_ = 0;
        }
    },

    handleStartGenerator_: function() {
        this.setState({
            status: 'Streaming...'
        });

        this.resetGenerator_();
        this.generator_ = window.setInterval(this.handleStreamData_, 200);
    },

    handleStopGenerator_: function() {
        this.resetGenerator_();
        if (this.props.onClose) {
            this.props.onClose();
        }
        this.setState({
            status: 'Closed'
        });
    },

    handleStreamData_: function() {
        var data = this.nextChunk_();

        if (data) {
            var message = 'Streaming: ' + data;
            this.setState({
                status: message
            });
            console.log(message);
            this.props.onData(data);
        } else {
            this.handleStopGenerator_();
        }
    },

    nextChunk_: function() {
        if (this.iterator_ < this.props.source.length) {
            var data = this.props.source[this.iterator_];
            this.iterator_++;
            return data;
        } else {
            return null;
        }
    },

    render: function() {
        return React.createElement("section",
            {
                id: 'stream-generator'
            },
            React.createElement("h3", {}, "Stream Generator Status"),
            React.createElement("div", {}, this.state.status)
        );
    }
});