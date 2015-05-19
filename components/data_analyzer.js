var DataAnalyzer = DataAnalyzer || {};

DataAnalyzer = function(numTopResults) {
    this.numTopResults_ = numTopResults;
    this.allSamples_ = [];
    this.freqMap_ = [];
    this.numSamples_ = 0;
}

DataAnalyzer.prototype.reset = function() {
    this.allSamples_ = [];
    this.freqMap_ = [];
    this.numSamples_ = 0;
}

DataAnalyzer.prototype.add = function(sample) {
    this.numSamples_++;
    this.allSamples_.push(sample);

    var fm = this.freqMap_;
    var index = fm.map( function(element) {
            return element.data
        }).indexOf(sample);

    if (index >= 0) {
        var hits = fm[index].hits;
        fm[index].hits = hits+1;
    } else {
        var newData = {data: sample, hits: 1}
        fm.push(newData)
    }

    var sorted = Utils.sortByHits(fm);
    var sample = sorted;

    if (this.numTopResults_ < sorted.length) {
        sample = sorted.slice(0, this.numTopResults_);
    }

    this.freqMap_ = sample;
}

DataAnalyzer.prototype.freqMap = function() {
    return this.freqMap_;
}

DataAnalyzer.prototype.numSamples = function() {
    return this.numSamples_;
}

DataAnalyzer.prototype.sampleSize = function() {
    return this.numTopResults_;
}