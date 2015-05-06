
###TODOS

####UI
- display analytics hit map horizontally across page rather than vertical
- add percentages for each sample in Analytics view


####COMPONENTS
- add another implementation of the stream sampling algorithm sorting by a random key
- refactor generator into testable JS component
	- and write tests!
- refactor hitMap component into testable JS component
- investigate benefit of moving calculations to JS worker threads (better, or too much overhead for setup?)


####TESTING
- clear out statusMessage on repeated test run
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