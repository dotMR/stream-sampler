var StreamAnalyzer = React.createClass({
    displayName: 'StreamAnalyzer',

    propTypes: {
        data: React.PropTypes.string
    },

    getInitialState: function() {
        return {
            freqMap: [],
            numSamples: 0,
            status: 'ready'
        };
    },

    componentDidMount: function() {
        this.reset_();
    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.data) {
            var sample = nextProps.data;
            this.process_(sample);
        } else {
            this.setState({
                status: ''
            });
        }
    },

    reset_: function() {
        this.setState({
            numSamples: 0,
            freqMap: []
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
            numSamples: samples+1,
            freqMap: []
        });
    },

    trackFrequency_: function(sample) {
        var freqMap = this.state.freqMap;

        var start = performance.now();
        var index = this.findIndex_(sample);
        if (index >= 0) {
            var hits = freqMap[index].hits;
            freqMap[index].hits = hits+1;
        } else {
            var newData = {data: sample, hits: 1}
            freqMap.push(newData)
        }

        var sorted = this.sortAndSliceSampleFrequency_(freqMap, 5);
        var end = performance.now();

        var time = (end - start).toFixed(3);
        var report = 'frequency updated in ' + time + " (ms)";
        console.log(report);

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

    render: function() {
        return React.createElement("section",
            {
                id: 'stream-sampler'
            },
            React.createElement("h3", {}, "Stream Analysis"),
            React.createElement("div", {}, this.state.status),
            React.createElement("div", {}, "Samples: " + this.state.numSamples),
            React.createElement(ResultsMap,
                {
                    results: this.state.freqMap
                },
                this.state.allSamples_
            )
        );
    }
});

var ResultsMap = React.createClass({
    displayName: 'ResultsMap',

    propTypes: {
        results: React.PropTypes.array.isRequired
    },

    render: function() {
        var members = [];
        this.props.results.forEach( function(result) {
            members.push(React.createElement("dt", { key: result.data }, result.data));
            members.push(React.createElement("dd", { key: result.data + result.hits}, result.hits));
        });

        return React.createElement("dl",
            {
                id: 'status'
            },
            members
        );
    }
});