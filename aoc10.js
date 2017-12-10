let day10 = {size: 256, input: [46,41,212,83,1,255,157,65,139,52,39,254,2,86,0,204]};

let p19 = {
	problem: day10,
	
	tests: [
		{problem: {size: 5, input: [3,4,1,5]}, solution: 12},
	],

	solveFor: function(problem) {
		let list = Array.apply(null, {length: problem.size})
			.map(Number.call, Number);
		
		let currPos = 0;
		for (let i = 0; i < problem.input.length; ++i) {
			let input = problem.input[i];
			this.twistList(list, input, currPos);
			currPos = (currPos + input + i) % problem.size;
		}
		
		return list[0] * list[1];
	},

	twistList: function(list, input, start) {
		let sublist = [];
		let pos = start;
		for (let i = 0; i < input; ++i) {
			sublist.push(list[pos]);
			pos = ++pos % list.length;
		}
		sublist = sublist.reverse();
		
		pos = start;
		for (let i = 0; i < input; ++i) {
			list[pos] = sublist[i];
			pos = ++pos % list.length;
		}
	}
};

