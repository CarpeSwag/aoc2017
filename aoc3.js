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

let p6 = {
	problem: day3,
	
	tests: [
		{problem: 1, solution: 2},
		{problem: 10, solution: 11},
		{problem: 9, solution: 10},
		{problem: 12, solution: 23},
		{problem: 23, solution: 25},
		{problem: 25, solution: 26},
		{problem: 500, solution: 747}
	],

	solveFor: function(input) {
		let graph = {'0,0': 1};
		let value = 1;
		let sideLen = 1;
		let counter = 1;
		let x = 0;
		let y = 0;
		let d = [1,0];
		while (value <= input) {
			++counter;
			if (counter >= sideLen * sideLen)
				sideLen += 2;
			x += d[0];
			y += d[1];
			if (d[0] == 1 && x == Math.floor(sideLen/2)) d = [0,1];
			else if (d[1] == 1 && y == Math.floor(sideLen/2)) d = [-1,0];
			else if (d[0] == -1 && x == -Math.floor(sideLen/2)) d = [0,-1];
			else if (d[1] == -1 && y == -Math.floor(sideLen/2)) d = [1,0];
			value = this.adjacentSum(graph, x, y);
			graph[x + ',' + y] = value;
		}
		
		return value;
	},
	
	adjacentSum: function(graph, x, y) {
		let sum = 0;
		for (let i = -1; i <= 1; ++i)
			for (let j = -1; j <= 1; ++j) {
				let block = graph[(x+i) + ',' + (y+j)];
				if (block != null)
					sum += block;
			}
		return sum;
	}
};
