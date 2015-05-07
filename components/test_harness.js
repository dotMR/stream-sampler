var TestController = React.createClass({
    displayName: 'TestController',

    getInitialState: function() {
        return {
            statusMessage: ''
        };
    },

    handleStartTests_: function(event) {
        event.preventDefault();

        this.setState({
            statusMessage: 'Starting Tests'
        });

        runTestSuite()
        .then( function(result) {
            this.setState({
                statusMessage: 'Success!'
            });
        }.bind(this))
        .catch(function(error) {
            this.setState({
                statusMessage: error.message
            });
        }.bind(this));
    },

    render: function() {
        return React.createElement("div",
            {
                id: 'test-harness'
            },
            React.createElement("h2", {}, "Test Harness"),
            React.createElement("p", {}, "This will execute all of the tests in the test/test-suite.js file. Overall success or the first error will be shown below."),
            React.createElement("form",
                {
                    id: 'test-input-form'
                },
                React.createElement("div",
                    {
                        id: 'status'
                    },
                    this.state.statusMessage
                ),
                React.createElement("input",
                    {
                        onClick: this.handleStartTests_,
                        type: 'submit',
                        value: 'Start Tests',
                    }
                )
            )
        );
    }
});