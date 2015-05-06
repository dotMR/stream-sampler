###TODOS

####DOCS
- review README and add appropriate links
- add note about min browser requirements, test on FF
	- Chrome 24, FF 15: performance.now()
	- Chrome ?, FF ?: native Promises
- Add more prominent link to test harness on README


####UI
- add description to main component to talk about goal of simulator
- update Analytics component to show same number of top samples as sampler
- add view element to analytics to suggest which samples you are seeing
	- 'Top k samples in stream'
- make it easier to stream remote data
	- possibly add button next to input to load local random file data?


- flow analytics hit map horizontally across page rather than vertical
- disable buttons when applicable (Can't start when running, etc


####COMPONENTS
- add ability to force reset all view components between runs after stream completion)
	- maybe move results to a last-run component on bottom of page?


- refactor hitMap component into testable JS component
- refactor generator into testable JS component
	- and write tests!
- handle newline / whitespace characters in the stream
- investigate benefit of moving calculations to JS worker threads (better, or too much overhead for setup?)
- add ability to vary/control speed of stream (or make some random)>


####TESTING
- move test cases to test folder
- implement test harness as page with button to execute
	- show status in page rather than alert
	- way to show which methods run easily?


- add test case for Utils.fetchFromURL
- add tests for React view components
	- form validation
	- form input data passing
	- generator / stream functionality
	- start/stop simulation