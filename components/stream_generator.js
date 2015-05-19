var StreamGenerator = StreamGenerator || {};

StreamGenerator = function(source) {
    this.iterator_ = 0;
    this.source_ = source;
}

StreamGenerator.prototype.nextChunk = function() {
    if (this.hasMore()) {
        var data = this.source_[this.iterator_];
        this.iterator_++;
        return data;
    } else {
        return null;
    }
}

StreamGenerator.prototype.hasMore = function() {
    return (this.iterator_ < this.source_.length);
}