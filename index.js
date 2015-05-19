function onDOMContentLoaded() {
    var content = React.createElement(SimulatorController,{});
    React.render(content, document.getElementById('root'));
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);