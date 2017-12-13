let day13 = ["0: 4", "1: 2", "2: 3", "4: 4", "6: 8", "8: 5", "10: 6", "12: 6", "14: 10", "16: 8", "18: 6", "20: 9", "22: 8", "24: 6", "26: 8", "28: 8", "30: 12", "32: 12", "34: 12", "36: 12", "38: 10", "40: 12", "42: 12", "44: 14", "46: 8", "48: 14", "50: 12", "52: 14", "54: 14", "58: 14", "60: 12", "62: 14", "64: 14", "66: 12", "68: 12", "72: 14", "74: 18", "76: 17", "86: 14", "88: 20", "92: 14", "94: 14", "96: 18", "98: 18"];

let p25 = {
	problem: day13,
	
	tests: [
		{problem: ["0: 3", "1: 2", "4: 4", "6: 4"], solution: 24}
	],

	solveFor: function(layerList) {
		let sum = 0;
		for (let i = 0; i < layerList.length; ++i) 
			sum += this.calculateSeverity(layerList[i].split(": "));
		return sum;
	},
	
	calculateSeverity(layerInfo) {
		return ((+(layerInfo[0]) % ((+(layerInfo[1]) - 2) * 2 + 2) == 0)? 1: 0)
		* (+(layerInfo[0]) * +(layerInfo[1]));
	}
};

let p26 = {
	problem: day13,
	
	tests: [
		{problem: ["0: 3", "1: 2", "4: 4", "6: 4"], solution: 10}
	],

	solveFor: function(layerList) {
		let delay = 0;
		while (this.isCaught(layerList, delay++) != 0);
		return --delay;
	},
	
	isCaught(layerList, delay) {
		let sum = 0;
		for (let i = 0; i < layerList.length; ++i) {
			if ((+(layerList[i].split(': ')[0]) + delay) % ((+(layerList[i].split(': ')[1]) - 2) * 2 + 2) == 0)
				return true;
		}
		return false;
	}
};
