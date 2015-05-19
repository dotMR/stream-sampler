
###TODOS
- Create another implementation of the stream sampling algorithm using a random key (keep top k values)random key

- Add 'smart start' to stream generator. When you press 'Start' in a previously stopped stream, it will continue


####UI
- Create a way to visually reference the representative samples and the analytics (color-code values that show up in both?)


####TESTING
- writes tests for DataAnalyzer component
- ideally log all tests run to UI (browser, not just console.log)
- add test case for Utils.fetchFromURL
- add tests for React view components
	- form validation
	- form input data passing
	- generator / stream functionality
	- start/stop simulation


####NIT-PICKY THINGS
- disable form buttons when applicable (Can't start simulation when already running, etc)
- should I not allow whitespace / newline characters?