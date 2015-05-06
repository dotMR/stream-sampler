function onDOMContentLoaded() {

    var content = React.createElement(TestController,{});
    React.render(content, document.getElementById('root'));
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

