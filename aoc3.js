let day3 = 265149;

let p5 = {
	problem: day3,
	
	tests: [
		{problem: 1, solution: 0},
		{problem: 12, solution: 3},
		{problem: 23, solution: 2},
		{problem: 10, solution: 3},
		{problem: 9, solution: 2},
		{problem: 25, solution: 4},
		{problem: 28, solution: 3},
		{problem: 27, solution: 4},
		{problem: 29, solution: 4},
		{problem: 26, solution: 5},
		{problem: 30, solution: 5},
		{problem: 49, solution: 6},
		{problem: 31, solution: 6},
		{problem: 1024, solution: 31}
	],

	solveFor: function(index) {
		if (index == 1) return 0;
		let sideLen = this.findSideLen(index);
		let radius = Math.floor(sideLen/2);
		let sidePos = (index - 1) % (sideLen - 1);
		sidePos = (sidePos > radius)? (sideLen - 1) - sidePos: sidePos;
		return radius + (radius - sidePos);
	},
	
	findSideLen: function(index) {
		let len = Math.ceil(Math.sqrt(index));
		if (len % 2 == 0) ++len;
		return len;
	}
};

// Well, I regret not building out the terrible spiral for part 1....

// actually nah, i just made a excel sheet with it that took a couple minutes to make...
// :smirk:
