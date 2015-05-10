var SampleReservoir = SampleReservoir || {};

SampleReservoir = function(sampleSize) {
    this.samples_ = [];
    this.sampleSize_ = sampleSize;
    this.samplesSeen_ = 0;
}

SampleReservoir.prototype.reset = function() {
    this.samples_ = [];
    this.samplesSeen_ = 0;
}

SampleReservoir.prototype.add = function(sample) {
    this.samplesSeen_++;
    if (this.samples_.length < this.sampleSize_) {
        this.samples_.push({data: sample});
        console.log('added ' + sample + ' to resevoir');
    }
    else {
        // once buffer is full, randomly replace
        var index = Utils.generateRandomInRange(0, this.samplesSeen_-1);
        if (index < this.samples_.length) {
            this.samples_[index] = {data: sample};
            console.log('added ' + sample + ' to resevoir[i=' + index + ']');
        }
    }
}

SampleReservoir.prototype.samples = function() {
    return this.samples_;
}

SampleReservoir.prototype.samplesSeen = function() {
    return this.samplesSeen_;
}