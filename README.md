###Stream Sampling Simulator
This is a browser-only JavaScript streaming simulator utilizing the concept of Reservoir Sampling.

####Usage
- Provide either an input stream or the URL to a data source (you can use the [random]() file included in the library, or maybe output from [random.org]())
- Choose your sample size, and start the simulation.
- As the stream is received, a random and representative sample set is generated for in the 'Representative Samples' componet. Additionally, the most common samples are displayed in the 'Stream Analysis' component.
- You can stop the simulation at any point and see the current state.

####Tests
- There is a built-in test harness for some of the critical functionality. Visit [test]() to see the results.

####Notes
- Please use a current browser. I didn't spend any time on compatability, so you'll need native JS Promises and other cool magic.
- This is a WIP, so expect it to be a little buggy (and not pretty)
- Currently there is no reset in between runs, so the buffers are resused. If you're concerned about this, reload the page :)




