var Utils = {
    // Generate a random number within the range (inclusive)
    generateRandomInRange: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Sort provided array by 'hits' property (ASC -> DESC)
    sortByHits: function(array) {
        function sortByHits(a, b) {
            if (a.hits < b.hits) {
                return 1;
            }
            if (a.hits > b.hits) {
                return -1;
            }

            return 0;
        }

        return array.sort(sortByHits);
    },

    // Validate URL
    // this isn't very robust, but useful for demonstration
    isValidURL: function(url) {
        return url.startsWith('http://') || url.startsWith('https://')
    },

    // GET request to provided URL
    // returns a Promise that resolves to responseText on success (or rejects)
    fetchFromURL: function(url) {
        function get(url, resolve, reject) {
            var request = new XMLHttpRequest();
            request.open('GET', url);

            request.onreadystatechange = function() {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        resolve(request.responseText);
                  }
                }
            }.bind(this);

            request.onerror = function() {
                reject(Error('Network error'));
            };

            request.send();
        }

        return new Promise(get.bind(this, url));
    }
};