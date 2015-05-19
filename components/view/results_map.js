var ResultsMap = React.createClass({
    displayName: 'ResultsMap',

    propTypes: {
        results: React.PropTypes.array,
        numResults: React.PropTypes.number
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
            React.createElement("h4", {}, "Top " + this.props.numResults + " samples"),
            React.createElement("div", { className: 'results-map' }, members)
        );
    }
});