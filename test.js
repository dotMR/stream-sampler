/**
 * TODO:
 *    Test case for fetch Utils.fetchFromURL
 *    Investigate testing React components:
 *        - form validation
 *        - form input data passing
 *        - generator / stream functionality
 *        - start/stop simulation 
 */
function onDOMContentLoaded() {
    runTests()
    .then(function(message) {
       alert('success!');
    })
    .catch(function(error) {
        alert(error.message);
    });

    var content = React.createElement(TestHarness,{});
    React.render(content, document.getElementById('root'));
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

function runTests() {
    return test_randomRange()
    .then(test_random2)
    .then(test_validUrl1)
    .then(test_validUrl2)
    .then(test_validUrl3)
    .then(test_validUrl4)
    .then(test_sortByHits)
    .then(test_reservoir1)
    .then(test_reservoir2)
    .then(test_reservoir3)
    .then(test_reservoir4)
}

function test_randomRange() {
    var tests = [];

    for (var i=0; i<100;i++) {
        tests.push(assertRange('test_random: should work '+i, 0, 1, Utils.generateRandomInRange(0,1)));
    }

    return Promise.all(tests);
}

function test_random2() {
    return assertFails('test_random: should fail', 3, Utils.generateRandomInRange(0,1));
}

function test_validUrl1() {
    return assertFails('test_validUrl1', true, Utils.isValidURL('tacos'));
}

function test_validUrl2() {
    return assertFails('test_validUrl2', true, Utils.isValidURL('httptacos'));
}

function test_validUrl3() {
    return assertEquals('test_validUrl3', true, Utils.isValidURL('http://www.google.com'));
}

function test_validUrl4() {
    return assertEquals('test_validUrl3', true, Utils.isValidURL('https://www.google.com'));
}

function test_sortByHits() {
    var sample1 = {data: 'Because seven', hits: 7};
    var sample2 = {data: 'ate', hits: 8};
    var sample3 = {data: 'nine', hits: 9};

    var toSort = [sample1, sample2, sample3];
    var sorted = Utils.sortByHits(toSort);
    return assertEquals('test_sortByHits', 'nine', sorted[0].data);
}

function test_reservoir1() {
    var res = new SampleReservoir(5);
    res.add('1');
    res.add('2');
    res.add('3');
    var samples = res.samples();

    return assertEquals('test_reservoir1', 3, samples.length); 
}

function test_reservoir2() {
    var res = new SampleReservoir(5);
    res.add('1');
    res.add('2');
    res.add('3');
    res.add('4');
    var samples = res.samples();

    return assertEquals('test_reservoir2', 4, samples[3]); 
}

function test_reservoir3() {
    var res = new SampleReservoir(5);
    res.add('1');
    res.add('2');
    res.add('3');
    res.add('4');
    res.add('5');
    res.add('6');
    var samples = res.samples();

    return assertEquals('test_reservoir3', 5, samples.length); 
}

function test_reservoir4() {
    var res = new SampleReservoir(5);
    res.add('1');
    res.add('2');
    res.add('3');
    res.add('4');
    res.add('5');
    res.add('6');
    res.add('7');
    res.add('8');
    res.add('9');
    res.reset();
    var samples = res.samples();

    return assertEquals('test_reservoir4', 0, samples.length); 
}