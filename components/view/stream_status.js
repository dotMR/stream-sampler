var StreamStatus = React.createClass({
    displayName: 'StreamStatus',

    propTypes: {
        status: React.PropTypes.string
    },

    render: function() {
        return React.createElement("section",
            {
                id: 'stream-generator'
            },
            React.createElement("h3", {}, "Stream Status"),
            React.createElement("div", {}, this.props.status)
        );
    }
});