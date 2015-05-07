
###TODOS
- Create another implementation of the stream sampling algorithm using a random key (keep top k values)random key


####UI
- Create a way to visually reference the representative samples and the analytics (color-code values that show up in both?)


####COMPONENTS
- refactor generator into testable JS component
	- and write tests!
- refactor hitMap component into testable JS component
- investigate benefit of moving calculations to JS worker threads (better, or too much overhead for setup?)


####TESTING
- for now, log all test executions to console
	- ideally render a list of methods that run on test page (not just success!)
- add test case for Utils.fetchFromURL
- add tests for React view components
	- form validation
	- form input data passing
	- generator / stream functionality
	- start/stop simulation


####NIT-PICKY THINGS
- disable form buttons when applicable (Can't start simulation when already running, etc)
- should I not allow whitespace / newline characters?