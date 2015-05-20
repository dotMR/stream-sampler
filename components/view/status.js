var Status = React.createClass({
    displayName: 'Status',

    propTypes: {
        status: React.PropTypes.string,
        title: React.PropTypes.string
    },

    render: function() {
        return React.createElement("section",
            {
                id: 'status'
            },
            React.createElement("h3", {}, this.props.title),
            React.createElement("div", {}, this.props.status)
        );
    }
});