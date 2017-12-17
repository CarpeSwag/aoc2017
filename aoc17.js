let day17 = 343;

let p33 = {
	problem: day17,
	
	tests: [
		{problem: 3, solution: 638}
	],

	solveFor: function(jump) {
		let arr = [0];
		let curr = 0;
		
		for (let i = 0; i < 2017; ++i) {
			curr = (curr + jump) % arr.length;
			arr.splice(curr + 1, 0, arr.length);
			curr = (curr + 1) % arr.length;
		}
		
		return arr[(curr + 1) % arr.length];
	}
};

let p34 = {
	problem: day17,
	
	tests: [],

	solveFor: function(jump) {
		let curr = 0;
		let result = 0;
		
		for (let i = 0; i < 50000000; ++i) {
			curr = (curr + jump) % (i+1) + 1;
			if (curr == 1) result = i + 1;
		}
		
		return result;
	}
};
