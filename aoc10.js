let day10 = {size: 256, input: "46,41,212,83,1,255,157,65,139,52,39,254,2,86,0,204"};

let p19 = {
	problem: day10,
	
	tests: [
		{problem: {size: 5, input: "3,4,1,5"}, solution: 12}
	],

	solveFor: function(problem) {
		let list = Array.apply(null, {length: problem.size})
			.map(Number.call, Number);
		
		let currPos = 0;
		let inputList = problem.input.split(",");
		for (let i = 0; i < inputList.length; ++i) {
			let input = +(inputList[i]);
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

let p20 = {
	problem: day10,
	
	// size is from problem 19 testing... not necessary here
	tests: [
		{problem: {size: 42, input: ""}, solution: "a2582a3a0e66e6e86e3812dcb672a272"},
		{problem: {size: 42, input: "AoC 2017"}, solution: "33efeb34ea91902bb2f59c9920caa6cd"},
		{problem: {size: 42, input: "1,2,3"}, solution: "3efbe78a8d82f29979031a4aa0b16a9d"},
		{problem: {size: 42, input: "1,2,4"}, solution: "63960835bcdc130f0b66d7ff4f6a5a8e"},
	],

	solveFor: function(problem) {
		let list = Array.apply(null, {length: 256})
			.map(Number.call, Number);
		
		let inputList = this.generateInput(problem.input);
		let ROUNDS = 64;
		let currPos = 0;
		for (let i = 0; i < ROUNDS; ++i) {
			for (let j = 0; j < inputList.length; ++j) {
				let input = inputList[j];
				this.twistList(list, input, currPos);
				currPos = (currPos + input +
					(inputList.length * i + j)) % list.length;
			}
		}
		
		return this.reduceHash(list);
	},
	
	generateInput: function(str) {
		let list = [];
		for (let i = 0; i < str.length; ++i) {
			list.push(str.charCodeAt(i));
		}
		
		return list.concat([17,31,73,47,23]);
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
	},
	
	reduceHash: function(list) {
		let hash = "";
		for (let i = 0; i < 16; ++i) {
			let block = list[i*16];
			for (let j = 1; j < 16; ++j)
				block = block ^ list[i*16 + j];
			hash += (block < 16)? "0" + block.toString(16):
				block.toString(16);
		}
		return hash;
	},
};
