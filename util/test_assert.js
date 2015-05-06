function assertEquals(context, expected, actual) {
    return new Promise(function(resolve, reject) {
        if (expected != actual) {
            var message = 'FAIL: ' + context + " {expected: " + expected + ", actual: " + actual + "}";
            reject(Error(message));
        }
        resolve('Success: ' + context);
    });
}

function assertFails(context, expected, actual) {
    return new Promise(function(resolve, reject) {
        if (expected == actual) {
            var message = 'FAIL: ' + context + " {expected: " + expected + ", actual: " + actual + "}";
            reject(Error(message));
        }
        resolve('Success: ' + context);
    });
}

function assertRange(context, expectedMin, expectedMax, actual) {
    return new Promise(function(resolve, reject) {
        if (expectedMin <= actual <= expectedMax) {
            resolve('Success: ' + context);
        }
        var message = 'FAIL: ' + context + " {expectedMin: " + expectedMin + ", expectedMax: " + expectedMax + ", actual: " + actual + "}";
        reject(Error(message))
    });
}