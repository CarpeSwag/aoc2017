function test(problem) {
	let tests = problem.tests;
	
	let success = true;
	for (let i = 0; i < tests.length; ++i) {
		let test = problem.solveFor(tests[i].problem);
		console.log("Test " + i + ": " + tests[i].problem + " -> " + test + ".",
			((test === tests[i].solution)? "Success!": "Failed. Answer was " + tests[i].solution));
		success = success && (test === tests[i].solution);
	}
	
	if (success) {
		console.log("All tests succeeded.");
		console.log("Solution: ", solve(problem));
	}
}

function solve(problem) {
	return problem.solveFor(problem.problem);
}
