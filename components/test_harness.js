var TestHarness = React.createClass({
    displayName: 'TestHarness',

    getInitialState: function() {
        return {
        };
    },

    render: function() {
        return React.createElement("div",
            {
                id: 'test-harness'
            },
            React.createElement("h2", {}, "Test Harness")
        );
    }
});