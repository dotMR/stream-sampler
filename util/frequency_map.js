// var FrequencyMap = FrequencyMap || {};

// FrequencyMap = function(sampleSize) {
//     this.freqMap_ = [];
//     this.sampleSize_ = sampleSize;
//     this.samplesSeen_ = 0;
// }

// FrequencyMap.prototype.reset = function() {
//     this.samples_ = [];
//     this.samplesSeen_ = 0;
// }

// FrequencyMap.prototype.add = function(sample) {
//     if (this.samples_.length < this.sampleSize_) {
//         this.samples_.push(sample);
//         this.samplesSeen_++;
//         console.log('added ' + sample + ' to resevoir');
//     }
//     else {
//         // once buffer is full, randomly replace
//         var index = Utils.generateRandomInRange(0, this.samplesSeen_-1);
//         if (index < this.samples_.length) {
//             this.samples_[index] = sample;
//             console.log('added ' + sample + ' to resevoir[' + index + ']');
//         }
//     }
// }

// FrequencyMap.prototype.freqMap = function() {
//     return this.freqMap_;
// }



//     sortAndSliceSampleFrequency_: function(freqMap, numSlice) {

//         var sorted = Utils.sortByHits(freqMap);
//         var sample = sorted;

//         if (numSlice < sorted.length) {
//             sample = sorted.slice(0, numSlice);
//         }

//         return sample;
//     },


//     // Generate an array 'hit map' from the provided arrayOfValues
//     // Array returned will merge repeated entries into single object
//     // [{ data: <value>, hits: <numHits> },...]
//     // TODO: investigate moving to worker thread and running only once at for LARGE data sets
//     trackFrequency_: function(sample) {
//         var freqMap = this.state.freqMap;

//         var start = performance.now();
//         var index = this.findIndex_(sample);
//         if (index >= 0) {
//             var hits = freqMap[index].hits;
//             freqMap[index].hits = hits+1;
//         } else {
//             var newData = {data: sample, hits: 1}
//             freqMap.push(newData)
//         }

//         var sorted = this.sortAndSliceSampleFrequency_(freqMap, 5);
//         var end = performance.now();

//         var time = (end - start).toFixed(3);
//         var report = 'frequency updated in ' + time + " (ms)";
//         console.log(report);
//     },