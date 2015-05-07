function runTestSuite() {
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
    .then(test_reservoir5)
}

function test_randomRange() {
    var tests = [];

    for (var i=0; i<500;i++) {
        tests.push(assertRange('random: generate within range_'+i, 0, 15, Utils.generateRandomInRange(0,15)));
    }

    return Promise.all(tests);
}

function test_random2() {
    return assertFails('random: number outside of range', 3, Utils.generateRandomInRange(0,1));
}

function test_validUrl1() {
    return assertFails('validateURL: invalid supplied', true, Utils.isValidURL('tacos'));
}

function test_validUrl2() {
    return assertFails('validateURL: invalid supplied', true, Utils.isValidURL('httptacos'));
}

function test_validUrl3() {
    return assertEquals('validateURL: valid http supplied', true, Utils.isValidURL('http://www.google.com'));
}

function test_validUrl4() {
    return assertEquals('validateURL: valid https supplied', true, Utils.isValidURL('https://www.google.com'));
}

function test_sortByHits() {
    var sample1 = {data: 'Because seven', hits: 7};
    var sample2 = {data: 'ate', hits: 8};
    var sample3 = {data: 'nine', hits: 9};

    var toSort = [sample1, sample2, sample3];
    var sorted = Utils.sortByHits(toSort);
    return assertEquals('sortHits: sorted element order', 'nine', sorted[0].data);
}

var RESERVOIR_SAMPLES_5 = 5;

function test_reservoir1() {
    var res = new SampleReservoir(RESERVOIR_SAMPLES_5);
    res.add('1');
    res.add('2');
    res.add('3');
    var samples = res.samples();

    return assertEquals('reservoir: validate sample length when < desired sample size', 3, samples.length); 
}

function test_reservoir2() {
    var res = new SampleReservoir(RESERVOIR_SAMPLES_5);
    res.add('1');
    res.add('2');
    res.add('3');
    res.add('4');
    res.add('5');
    res.add('6');
    var samples = res.samples();

    return assertEquals('reservoir: validate sample count not > desired sample size', 5, samples.length); 
}

function test_reservoir3() {
    var res = new SampleReservoir(RESERVOIR_SAMPLES_5);
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

    var length = assertEquals('reservoir: validate sample count after reset', 0, res.samples().length);
    var samplesSeen = assertEquals('reservoir: validate samplesSeen after reset', 0, res.samplesSeen());

    return Promise.all([length, samplesSeen]);
}

function test_reservoir4() {
    var res = new SampleReservoir(RESERVOIR_SAMPLES_5);
    res.add('1');
    res.add('2');

    return assertEquals('reservoir: validate samplesSeen when num samples < desired sample size', 2, res.samplesSeen()); 
}

function test_reservoir5() {
    var res = new SampleReservoir(RESERVOIR_SAMPLES_5);
    res.add('1');
    res.add('2');
    res.add('3');
    res.add('4');
    res.add('5');
    res.add('6');
    res.add('7');
    res.add('8');
    res.add('9');

    return assertEquals('reservoir: validate samplesSeen when < desired sample size', 9, res.samplesSeen());
}