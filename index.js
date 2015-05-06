function onDOMContentLoaded() {
    var content = React.createElement(StreamSampleController,{});
    React.render(content, document.getElementById('root'));
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);