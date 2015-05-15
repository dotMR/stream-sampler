var StreamGenerator = React.createClass({
    displayName: 'StreamGenerator',

    mixins: [Reflux.listenTo(formActionsStore, "onFormAction")],

    componentWillMount: function() {
        this.reset_();
    },

    onFormAction: function(data) {
        console.log('Generator: ' + data.action);
        switch (data.action) {
            case "RESET": {
                this.reset_();
                break;
            }
            case "START": {
                this.startGenerator_(data.config.source);
                break;
            }
            case "STOP": {
                this.stopGenerator_();
                break;
            }
        }
    },

    reset_: function() {
        this.iterator_ = 0;
        this.resetGenerator_();
        this.setState({
            status: 'Ready'
        });
    },

    resetGenerator_: function() {
        if (this.generator_) {
            window.clearInterval(this.generator_);
            this.generator_ = 0;
        }
    },

    startGenerator_: function(source) {
        GeneratorActions.openStream();

        this.setState({
            source: source,
            status: 'Streaming...'
        });

        this.resetGenerator_();
        this.generator_ = window.setInterval(this.streamData_, 200);
    },

    stopGenerator_: function() {
        GeneratorActions.closeStream();

        this.resetGenerator_();
        this.setState({
            status: 'Closed'
        });
    },

    streamData_: function() {
        var data = this.nextChunk_();

        if (data) {
            var message = 'Streaming: ' + data;
            GeneratorActions.streamData(data);
            this.setState({
                status: message
            });
        } else {
            this.stopGenerator_();
        }
    },

    nextChunk_: function() {
        if (this.iterator_ < this.state.source.length) {
            var data = this.state.source[this.iterator_];
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