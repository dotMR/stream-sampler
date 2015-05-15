var StreamAnalyzer = React.createClass({
    displayName: 'StreamAnalyzer',

    mixins: [
        Reflux.listenTo(generatorStore, "onStreamData"),
        Reflux.listenTo(formActionsStore, "onFormAction")
    ],

    componentDidMount: function() {
        this.reset_();
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
                    sampleSize: data.config.sampleSize
                });
                break;
            }
            case "STOP": {
                AnalyticsActions.complete(this.state.freqMap);
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
                break;
            }
        }
    },

    getInitialState: function() {
        return {
            freqMap: [],
            numSamples: 0,
            status: 'Ready'
        };
    },

    reset_: function() {
        this.setState({
            numSamples: 0,
            freqMap: [],
            status: 'Ready'
        });

        this.allSamples_ = [];
    },

    findIndex_: function(sample) {
        return this.state.freqMap.map(
            function(element) {
                return element.data
            }
        ).indexOf(sample);
    },

    logSample_: function(sample) {
        if (!this.allSamples_) {
            this.allSamples_ = new Array();
        }

        this.allSamples_.push(sample);

        var samples = this.state.numSamples;
        this.setState({
            status: '',
            numSamples: samples+1
        });
    },

    trackFrequency_: function(sample) {
        var freqMap = this.state.freqMap;

        // var start = performance.now();
        var index = this.findIndex_(sample);
        if (index >= 0) {
            var hits = freqMap[index].hits;
            freqMap[index].hits = hits+1;
        } else {
            var newData = {data: sample, hits: 1}
            freqMap.push(newData)
        }

        var sorted = this.sortAndSliceSampleFrequency_(freqMap, this.state.sampleSize);
        // var end = performance.now();

        // var time = (end - start).toFixed(3);
        // var report = 'frequency updated in ' + time + " (ms)";
        // console.log(report);

        this.setState({
            freqMap: sorted
        });
    },

    process_: function(sample) {
        this.logSample_(sample);
        this.trackFrequency_(sample);
    },

    sortAndSliceSampleFrequency_: function(freqMap, numSlice) {

        var sorted = Utils.sortByHits(freqMap);
        var sample = sorted;

        if (numSlice < sorted.length) {
            sample = sorted.slice(0, numSlice);
        }

        return sample;
    },

    getSamplesCountComponent_: function() {
        if (this.state.numSamples <= 0) {
            return null;
        }

        return React.createElement("span", {}, "Samples Seen: " + this.state.numSamples);
    },

    render: function() {
        return React.createElement("section",
            {
                id: 'stream-sampler'
            },
            React.createElement("h3", {}, "Analytics"),
            React.createElement("div", {}, this.state.status),
            this.getSamplesCountComponent_(),
            React.createElement(ResultsMap,
                {
                    results: this.state.freqMap,
                    sampleSize: this.state.sampleSize
                },
                this.state.allSamples_
            )
        );
    }
});

var ResultsMap = React.createClass({
    displayName: 'ResultsMap',

    propTypes: {
        results: React.PropTypes.array.isRequired,
        sampleSize: React.PropTypes.number
    },

    render: function() {
        if (!this.props.results || this.props.results.length == 0) {
            return null;
        }

        var members = [];
        this.props.results.forEach( function(result) {
            members.push(
                React.createElement("div",
                    {
                        className: 'result',
                        key: 'result-' + result.data
                    },
                    React.createElement("div", { key: result.data, className: 'result-sample' }, result.data),
                    React.createElement("div", { key: result.data + '_hits', className: 'result-hits' }, result.hits)
                )
            );
        });

        return React.createElement("div", {},
            React.createElement("h4", {}, "Top " + this.props.sampleSize + " samples"),
            React.createElement("div", { className: 'results-map' }, members)
        );
    }
});