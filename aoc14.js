let day14 = 'ffayrhll';

let p27 = {
	problem: day14,
	
	tests: [
		{problem: 'flqrgnkx', solution: 8108}
	],

	solveFor: function(keyStr) {
		let squares = 0;
		for (let i = 0; i < 128; ++i) {
			squares += this.countSquares(keyStr + '-' + i);
		}
		
		return squares;
	},
	
	countSquares: function(keyStr) {
		let kh = p20.solveFor(keyStr);
		let bin = "";
		for (let i = 0; i < kh.length; ++i) {
			let temp = parseInt(kh.charAt(i), 16).toString(2);
			while (temp.length < 4) temp = "0" + temp;
			bin += temp;
		}
		return bin.replace(/0/g,'').length;
	}
};

let p28 = {
	problem: day14,
	
	tests: [
		{problem: 'flqrgnkx', solution: 1242}
	],

	solveFor: function(keyStr) {
		let grid = [];
		for (let i = 0; i < 128; ++i) {
			grid.push(this.generateRow(keyStr + '-' + i));
		}
		
		let regions = 0;
		for (let y = 0; y < 128; ++y) {
			for (let x = 0; x < 128; ++x) {
				regions += this.checkRegion(grid, x, y);
			}
		}
		
		return regions;
	},
	
	generateRow: function(keyStr) {
		let kh = p20.solveFor(keyStr);
		let bin = "";
		for (let i = 0; i < kh.length; ++i) {
			let temp = parseInt(kh.charAt(i), 16).toString(2);
			while (temp.length < 4) temp = "0" + temp;
			bin += temp;
		}
		return bin;
	},
	
	// Checks if the current block is used, then explores/marks region
	checkRegion: function(grid, x, y) {
		if (this.isUsed(grid,x,y)) {
			this.markRegion(grid, x, y);
			return 1;
		}
		return 0;
	},
	
	markRegion(grid, x, y) {
		grid[y] = grid[y].substring(0,x) + '0' + grid[y].substr(x+1);
		if (x > 0   && this.isUsed(grid,x-1,y))
			this.markRegion(grid,x-1,y);
		if (x < 127 && this.isUsed(grid,x+1,y))
			this.markRegion(grid,x+1,y);
		if (y > 0   && this.isUsed(grid,x,y-1))
			this.markRegion(grid,x,y-1);
		if (y < 127 && this.isUsed(grid,x,y+1))
			this.markRegion(grid,x,y+1);
	},

	isUsed(grid, x, y) {
		return grid[y].charAt(x) == '1';
	}
};
