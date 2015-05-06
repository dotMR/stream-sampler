/**
 * TODO:
 *    Refactor generator into external component (and write exhaustive tests)
 *    How to handle newlines / whitespace characters?
 */
var StreamGenerator = React.createClass({
    displayName: 'StreamGenerator',

    propTypes: {
        onData: React.PropTypes.func.isRequired,
        onClose: React.PropTypes.func,
        source: React.PropTypes.string,
        openStream: React.PropTypes.bool
    },

    getInitialState: function() {
        return {
            status: 'ready'
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
            status: 'streaming...'
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
            status: 'closed'
        });
    },

    handleStreamData_: function() {
        var data = this.nextChunk_();

        if (data) {
            console.log('Streaming ' + data);
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