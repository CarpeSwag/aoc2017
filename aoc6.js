let day6 = "11 11 13 7 0 15 5 5 4 4 1 1 7 1 15 11";

let p11 = {
	problem: day6,
	
	tests: [
		{problem: "0 2 7 0", solution: 5},
		{problem: "1 0 0 0", solution: 4},
		{problem: "7 0 0 0", solution: 6}
	],

	solveFor: function(blocks) {
		let steps = 0;
		
		let lastState = blocks;
		let states = {};
		while (states[lastState] == null) {
			++steps;
			states[lastState] = true;
			lastState = this.redistribute(lastState.split(" "));
		}
		
		return steps;
	},
	
	redistribute: function(blocks) {
		let largest = 0;
		for (let i = 0; i < blocks.length; ++i)
			if (+(blocks[i]) > +(blocks[largest]))
				largest = i;
		
		let counter = blocks[largest]
		blocks[largest] = 0;
		let curr = (++largest) % blocks.length;
		for (let i = counter; i > 0; --i) {
			++blocks[curr];
			curr = (++curr) % blocks.length;
		}
		
		let output = blocks[0];
		for (let i = 1; i < blocks.length; ++i) {
			output += " " + blocks[i];
		}
		
		return output;
	}
};

let p12 = {
	problem: day6,
	
	tests: [
		{problem: "0 2 7 0", solution: 4},
		{problem: "1 0 0 0", solution: 4},
		{problem: "7 0 0 0", solution: 4}
	],

	solveFor: function(blocks) {
		let steps = 0;
		
		let lastState = blocks;
		let states = {};
		while (states[lastState] == null) {
			states[lastState] = steps;
			++steps;
			lastState = this.redistribute(lastState.split(" "));
		}
		
		return steps - states[lastState];
	},
	
	redistribute: function(blocks) {
		let largest = 0;
		for (let i = 0; i < blocks.length; ++i)
			if (+(blocks[i]) > +(blocks[largest]))
				largest = i;
		
		let counter = blocks[largest]
		blocks[largest] = 0;
		let curr = (++largest) % blocks.length;
		for (let i = counter; i > 0; --i) {
			++blocks[curr];
			curr = (++curr) % blocks.length;
		}
		
		let output = blocks[0];
		for (let i = 1; i < blocks.length; ++i) {
			output += " " + blocks[i];
		}
		
		return output;
	}
};
