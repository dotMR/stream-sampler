###Stream Sampling Simulator
This is a browser-only JavaScript streaming simulator utilizing the concept of [Reservoir Sampling](http://en.wikipedia.org/wiki/Reservoir_sampling).

[Try it!](http://dotmr.github.io/stream-sampler/)

####Usage
- Provide either an input stream or the URL to a data source (you can use the [random](http://dotMR.github.io/stream-sampler/data/random) file included in the library, or maybe output from [random.org](https://www.random.org/strings/?num=100&len=20&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new))
- Choose your sample size, and start the simulation.
- As the stream is received, a random and representative sample set of the given size is generated. The most common samples are also displayed in the 'Stream Analysis' component.
- You can stop the simulation at any point.

####Tests
- There is a built-in test harness for some of the critical functionality. Visit [test](http://dotmr.github.io/stream-sampler/test.html) to see the results.

####KNOWN ISSUES
- This is a [WIP](https://github.com/dotMR/stream-sampler/blob/master/TODO.md), so expect it to be a little buggy (and not pretty)
- Please use a current browser. I didn't spend any time on compatability, so you'll need native JS Promises and other cool magic. I don't think IE will work. I'm testing in Chrome 42. My guess is you'll need at least Chrome 36, FF 31.
