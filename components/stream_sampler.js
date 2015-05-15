var StreamSampler = React.createClass({
    displayName: 'StreamSampler',

    mixins: [
        Reflux.listenTo(generatorStore, "onStreamData"),
        Reflux.listenTo(formActionsStore, "onFormAction"),
        Reflux.listenTo(analyticsStore, "onReceiveAnalytics")
    ],

    componentWillMount: function() {
        this.reset_();
    },

    getInitialState: function() {
        return {
            frequencyMap: null
        };
    },

    // TODO: How to avoid having switch statements here?
    //   ? make actions/store more singular?
    onFormAction: function(data) {
        switch (data.action) {
            case "RESET": {
                this.reset_();
                break;
            }
            case "START": {
                this.setState({
                    frequencyMap: null,
                    sampleSize: data.config.sampleSize
                });
                break;
            }
        }
    },

    // TODO: How to avoid having switch statements here?
    //   ? make actions/store more singular?
    onStreamData: function(op) {
        switch (op.action) {
            case "STREAM_DATA": {
                this.process_(op.data);
                this.setState({
                    status: ''
                });
                break;
            }
        }
    },

    onReceiveAnalytics: function(freqMap) {
        this.setState({
            frequencyMap: freqMap
        });
    },

    reset_: function() {
        this.resevoir_ = null;
        this.setState({
            frequencyMap: null,
            status: 'Ready'
        });
    },

    process_: function(sample) {
        if (!this.resevoir_) {
            this.resevoir_ = new SampleReservoir(this.state.sampleSize);
        }
        this.resevoir_.add(sample);
    },

    getResultsSection_: function() {
        if (!this.resevoir_) {
            return null;
        }

        return React.createElement(HorizontalSampleDisplay, {
            frequencyMap: this.state.frequencyMap,
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
        frequencyMap: React.PropTypes.array,
        results: React.PropTypes.array,
        title: React.PropTypes.string
    },

    foundInFreqMap_: function(result) {
        if (!this.props.frequencyMap) {
            return false;
        }

        return this.props.frequencyMap.some( function(item) {
            return result.data == item.data
        });
    },

    getResultClassName_: function(result) {
        var className = 'result-sample';
        if (this.foundInFreqMap_(result)) {
            className = className + " highlighted";
        }
        return className;
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
                    React.createElement("div", { key: result.data, className: this.getResultClassName_(result) }, result.data)
                )
            );
        }.bind(this));

        return React.createElement("div", {},
            React.createElement("h4", {}, this.props.title),
            React.createElement("div", { className: 'results-map' }, members)
        );
    }
});