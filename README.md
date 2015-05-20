###Visual Stream Sampler
This is a browser-based stream sampling simulator utilizing the concept of [Reservoir Sampling](http://en.wikipedia.org/wiki/Reservoir_sampling).

The simulator utilizes:
- [React](https://github.com/facebook/react)
- [Reflux](https://github.com/spoike/refluxjs)

[Try it Out!](http://dotmr.github.io/stream-sampler/)

####Usage
- Provide either an input string or specify the URL of a random data set (by default a link to a [file](http://dotMR.github.io/stream-sampler/data/random) generated from [random.org]().
- Select the desired length of the sample, and click 'Start Simulation'.
- As stream data is received a random and representative sample set of the given size is picked.
- The most common samples are also displayed in the 'Analytics' section.
- You can stop the simulation at any point.

####Tests
- There is a built-in test harness for some of the critical functionality. Visit [test](http://dotmr.github.io/stream-sampler/test.html) to see the results.

####KNOWN ISSUES
- Please use a current browser. I didn't spend any time on compatability, so you'll need native JS Promises and other cool magic. I don't think IE will work. I'm testing in Chrome 42. My guess is you'll need at least Chrome 36, FF 31.

- This is a [WIP](https://github.com/dotMR/stream-sampler/blob/master/TODO.md), so expect it to be a little buggy (and not pretty)

