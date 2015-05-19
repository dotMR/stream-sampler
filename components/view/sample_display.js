var HorizontalSampleDisplay = React.createClass({
    displayName: 'HorizontalSampleDisplay',

    propTypes: {
        results: React.PropTypes.array,
        title: React.PropTypes.string
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
                    React.createElement("div", { key: result.data, className: 'result-sample' }, result.data)
                )
            );
        }.bind(this));

        return React.createElement("div", {},
            React.createElement("h4", {}, this.props.title),
            React.createElement("div", { className: 'results-map' }, members)
        );
    }
});