
var SampleSetupForm = React.createClass({
    displayName: 'SampleSetupForm',

    propTypes: {
        sampleSize: React.PropTypes.number,
        streamInput: React.PropTypes.string,
        onStartSimulation: React.PropTypes.func,
        onStopSimulation: React.PropTypes.func
    },

    getInitialState: function() {
        return {
            sampleSize: 10,
            statusMessage: '',
            streamInput: 'THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG',
            streamInputInvalid: false,
            urlInput: '',
            urlInputInvalid: false
        };
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

            if (streamInput == '' && urlInput == '') {
                this.setState({
                    streamInputInvalid: true,
                    urlInputInvalid: true
                });
                reject(Error('Please provide an input value for the incoming stream'));
            } else if (streamInput != '' && urlInput != '') {
                this.setState({
                    streamInputInvalid: true,
                    urlInputInvalid: true
                });
                reject(Error('Please provide only one value for the incoming stream'));
            } else if (streamInput != '' && urlInput == '') {
                resolve(streamInput);
            } else if (urlInput != '' && streamInput == '') {
                if (!Utils.isValidURL(urlInput)) {
                    this.setState({
                        urlInputInvalid: true
                    });
                    reject(Error('Please provide a valid URL'));
                }
                resolve(urlInput);
            }
            reject(Error('Invalid Input'));
        }.bind(this));
    },

    render: function() {
        return React.createElement("form",
            {
                id: 'stream-input-form'
            },
            React.createElement("label", {htmlFor: 'streamInput'}, 'Input Stream'),
            React.createElement("input",
                {
                    id: 'streamInput',
                    className: this.state.streamInputInvalid ? 'invalid' : '',
                    onChange: this.handleStreamInputChange_,
                    type: 'text',
                    value: this.state.streamInput,
                }
            ),
            React.createElement("label", {htmlFor: 'urlInput'}, 'Input URL'),
            React.createElement("input",
                {
                    id: 'urlInput',
                    className: this.state.urlInputInvalid ? 'invalid' : '',
                    onChange: this.handleURLInputChange_,
                    type: 'text',
                    value: this.state.urlInput,
                }
            ),
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
            )
        );
    }
});