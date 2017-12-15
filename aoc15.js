let day15 = [277, 349];

let p29 = {
	problem: day15,
	
	tests: [
		{problem: [65, 8921], solution: 588}
	],

	solveFor: function(pair) {
		let count = 0;
		let curr = [pair[0], pair[1]];
		let FACTOR = [16807, 48271];
		let MAGIC_NUMBER = 2147483647;
		
		for (let i = 0; i < 40000000; ++i) {
			for (let j = 0; j < 2; ++j) {
				curr[j] = (curr[j] * FACTOR[j]) % MAGIC_NUMBER;
			}
			count += (this.compareValues(curr))? 1: 0;
		}
		
		return count;
	},
	
	compareValues: function(pair) {
		return (pair[0] & 65535) === (pair[1] & 65535);
	}
};

let p30 = {
	problem: day15,
	
	tests: [
		{problem: [65, 8921], solution: 309}
	],

	solveFor: function(pair) {
		let count = 0;
		let curr = [pair[0], pair[1]];
		let FACTOR = [16807, 48271];
		let MULTIPLE = [4, 8];
		let MAGIC_NUMBER = 2147483647;
		
		for (let i = 0; i < 5000000; ++i) {
			for (let j = 0; j < 2; ++j) {
				do {
					curr[j] = (curr[j] * FACTOR[j]) % MAGIC_NUMBER;
				} while (curr[j] % MULTIPLE[j] != 0)
			}
			count += (this.compareValues(curr))? 1: 0;
		}
		
		return count;
	},
	
	compareValues: function(pair) {
		return (pair[0] & 65535) === (pair[1] & 65535);
	}
};
