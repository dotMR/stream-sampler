###TODOS
- Create another implementation of the stream sampling algorithm for comparison (potentially using a random key to skip values?)
- Add 'smart start' to stream generator. When you press 'Start' in a previously stopped stream, it will continue until the end

####UI
- Create a way to visually tie common elements between Random Sample and Analytics components (color-code values that show up in both?)

####TESTING
- Writes tests for DataAnalyzer component
- Log all tests run to UI (currently just console.log)
- Add test case for Utils.fetchFromURL
- Add tests for React view components and Flux actions/stores
	- form validation
	- form input data passing
	- generator / stream functionality
	- start/stop simulation

####NIT-PICKY THINGS
- Disable form buttons when applicable (Can't start simulation when already running, etc)
- Should I not allow whitespace / newline characters?