
var SampleSetupForm = React.createClass({
    displayName: 'SampleSetupForm',

    SOURCE_INPUT: 0,
    SOURCE_URL: 1,

    propTypes: {
        sampleSize: React.PropTypes.number,
        streamInput: React.PropTypes.string,
        onResetSimulation: React.PropTypes.func,
        onStartSimulation: React.PropTypes.func,
        onStopSimulation: React.PropTypes.func
    },

    getInitialState: function() {
        return {
            sampleSize: 10,
            statusMessage: '',
            streamSource: this.SOURCE_INPUT,
            streamInput: 'THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG',
            streamInputInvalid: false,
            urlInput: 'http://dotmr.github.io/stream-sampler/data/random',
            urlInputInvalid: false
        };
    },

    handleStreamSourceChange_: function(event) {
        this.setState({
            streamSource: event.target.value
        });
    },

    handleSampleSizeChange_: function(event) {
        this.setState({
            sampleSize: event.target.value
        });
    },

    handleStreamInputChange_: function(event) {
        this.setState({
            statusMessage: '',
            streamInput: event.target.value,
            streamInputInvalid: false,
            urlInputInvalid: false
        });
    },

    handleURLInputChange_: function(event) {
        this.setState({
            statusMessage: '',
            streamInputInvalid: false,
            urlInput: event.target.value,
            urlInputInvalid: false
        });
    },

    handleStartSimulation_: function(event) {
        event.preventDefault();

        this.validateForm_()
        .then(this.fetchSource_)
        .then(this.startSimulation_)
        .catch(function(error) {
            this.setState({
                statusMessage: error.message
            });
        }.bind(this));
    },

    handleStopSimulation_: function(event) {
        event.preventDefault();
        this.props.onStopSimulation()
    },

    handleResetSimulation_: function(event) {
        event.preventDefault();
        if (this.props.onResetSimulation) {
            this.props.onResetSimulation();
        }
    },

    fetchSource_: function(inputSource) {
        if (Utils.isValidURL(inputSource)) {
            return Utils.fetchFromURL(inputSource);
        }

        return inputSource;
    },

    startSimulation_: function(source) {
        this.props.onStartSimulation(source, this.state.sampleSize);
    },

    validateForm_: function() {
        return new Promise(function(resolve, reject) {
            var streamInput = this.state.streamInput.trim();
            var urlInput = this.state.urlInput.trim();

            if (this.state.streamSource == this.SOURCE_INPUT) {
                if (streamInput == '') {
                    this.setState({
                        streamInputInvalid: true
                    });
                    reject(Error('Please provide an input value for the incoming stream'));
                }
                resolve(streamInput);
            } else if (this.state.streamSource == this.SOURCE_URL) {
                if (urlInput == '' || !Utils.isValidURL(urlInput)) {
                    this.setState({
                        urlInputInvalid: true
                    });
                    reject(Error('Please provide a valid URL'));
                }
                resolve(urlInput);
            }
            reject(Error('? How did you get here?'));
        }.bind(this));
    },

    getInputHere_: function() {
        if (this.state.streamSource != this.SOURCE_INPUT) {
            return null;
        }

        return React.createElement("input",
            {
                id: 'streamInput',
                className: this.state.streamInputInvalid ? 'invalid' : '',
                onChange: this.handleStreamInputChange_,
                type: 'text',
                value: this.state.streamInput
            }
        );
    },

    getInputURL_: function() {
        if (this.state.streamSource != this.SOURCE_URL) {
            return null;
        }

        return React.createElement("input",
            {
                id: 'urlInput',
                className: this.state.urlInputInvalid ? 'invalid' : '',
                onChange: this.handleURLInputChange_,
                type: 'text',
                value: this.state.urlInput
            }
        );
    },

    render: function() {
        return React.createElement("form",
            {
                id: 'stream-input-form'
            },
            React.createElement("label", {htmlFor: 'streamSource'}, 'Stream Source'),
            React.createElement("select",
                {
                    id: 'streamSource',
                    onChange: this.handleStreamSourceChange_,
                    value: this.state.streamSource,
                },
                React.createElement("option", { value: this.SOURCE_INPUT }, "Input here"),
                React.createElement("option", { value: this.SOURCE_URL }, "Fetch from URL")
            ),
            this.getInputHere_(),
            this.getInputURL_(),
            React.createElement("label", {htmlFor: 'sampleSize'}, 'Sample Size'),
            React.createElement("select",
                {
                    id: 'sampleSize',
                    onChange: this.handleSampleSizeChange_,
                    value: this.state.sampleSize,
                },
                React.createElement("option", { value: 1 }, "1"),
                React.createElement("option", { value: 2 }, "2"),
                React.createElement("option", { value: 3 }, "3"),
                React.createElement("option", { value: 4 }, "4"),
                React.createElement("option", { value: 5 }, "5"),
                React.createElement("option", { value: 6 }, "6"),
                React.createElement("option", { value: 7 }, "7"),
                React.createElement("option", { value: 8 }, "8"),
                React.createElement("option", { value: 9 }, "9"),
                React.createElement("option", { value: 10 }, "10"),
                React.createElement("option", { value: 11 }, "11"),
                React.createElement("option", { value: 12 }, "12"),
                React.createElement("option", { value: 13 }, "13"),
                React.createElement("option", { value: 14 }, "14"),
                React.createElement("option", { value: 15 }, "15")
            ),
            React.createElement("div",
                {
                    id: 'status'
                },
                this.state.statusMessage
            ),
            React.createElement("input",
                {
                    onClick: this.handleStartSimulation_,
                    type: 'submit',
                    value: 'Start Simulation',
                }
            ),
            React.createElement("input",
                {
                    onClick: this.handleStopSimulation_,
                    type: 'submit',
                    value: 'Stop Simulation',
                }
            ),
            React.createElement("input",
                {
                    onClick: this.handleResetSimulation_,
                    type: 'submit',
                    value: 'Reset All',
                }
            )
        );
    }
});