let day18 = ["set i 31", "set a 1", "mul p 17", "jgz p p", "mul a 2", "add i -1", "jgz i -2", "add a -1", "set i 127", "set p 735", "mul p 8505", "mod p a", "mul p 129749", "add p 12345", "mod p a", "set b p", "mod b 10000", "snd b", "add i -1", "jgz i -9", "jgz a 3", "rcv b", "jgz b -1", "set f 0", "set i 126", "rcv a", "rcv b", "set p a", "mul p -1", "add p b", "jgz p 4", "snd a", "set a b", "jgz 1 3", "snd b", "set f 1", "add i -1", "jgz i -11", "snd a", "jgz f -16", "jgz a -19"];

let p35 = {
	problem: day18,
	
	tests: [
		{problem: ["set a 1", "add a 2", "mul a a", "mod a 5", "snd a", "set a 0", "rcv a", "jgz a -1", "set a 1", "jgz a -2"], solution: 4}
	],

	solveFor: function(instructions) {
		let registers = {};
		
		for (let i = 0; i < instructions.length; ++i) {
			let instr = instructions[i].split(' ');
			i = this[instr[0]](registers, i, instr[1], (instr.length > 2)? instr[2]: null);
			if (registers.recovered != undefined) {
				break;
			}
		}
		
		return registers.recovered;
	},
	
	parse(reg, val) {
		return (Number.isInteger(+(val)))? +(val): reg[val];
	},
	
	snd(reg, line, x, y) {
		reg.lastSound = this.parse(reg, x);
		return line;
	},
	
	set(reg, line, x, y) {
		reg[x] = this.parse(reg, y);
		return line;
	},
	
	add(reg, line, x, y) {
		reg[x] += this.parse(reg, y);
		return line;
	},
	
	mul(reg, line, x, y) {
		reg[x] *= this.parse(reg, y);
		return line;
	},
	
	mod(reg, line, x, y) {
		reg[x] = reg[x] % this.parse(reg, y);
		return line;
	},
	
	rcv(reg, line, x, y) {
		if (this.parse(reg, x) != 0)
			reg.recovered = reg.lastSound;
		return line;
	},
	
	jgz(reg, line, x, y) {
		if (this.parse(reg, x) > 0)
			return line + this.parse(reg, y) - 1;
		return line;
	}
};

let p36 = {
	problem: day18,
	
	tests: [
		{problem: ["snd 1", "snd 2", "snd p", "rcv a", "rcv b", "rcv c", "rcv d"], solution: 3}
	],

	solveFor: function(instructions) {
		let prog = [];
		for (let i = 0; i < 2; ++i) {
			prog.push({
				reg: {
					p: i
				},
				queue: [],
				programID: i,
				line: 0,
				receiveCounter: 0,
				sendCounter: 0
			});
		}
		prog[0].partner = prog[1];
		prog[1].partner = prog[0];
		
		while (true) {
			let finished = 0;
			for (let i = 0; i < 2; ++i) {
				if (prog[i].line >= instructions.length) {
					++finished;
					continue;
				}
				let instr = instructions[prog[i].line].split(' ');
				if (this[instr[0]](prog[i], instr[1], (instr.length > 2)? instr[2]: null))
					++finished;
				++prog[i].line;
			}
			if (finished == prog.length)
				break;
		}
		
		return prog[1].sendCounter;
	},
	
	parse(prog, val) {
		if (Number.isInteger(+(val))) {
			return +(val);
		} else {
			if (prog.reg[val] === undefined) {
				prog.reg[val] = 0;
			}
			return prog.reg[val];
		}
	},
	
	snd(prog, x, y) {
		prog.partner.queue.push(this.parse(prog, x));
		++prog.sendCounter;
		return false;
	},
	
	set(prog, x, y) {
		prog.reg[x] = this.parse(prog, y);
		return false;
	},
	
	add(prog, x, y) {
		if (prog.reg[x] === undefined) {
			prog.reg[x] = this.parse(prog, y);
		} else {
			prog.reg[x] += this.parse(prog, y);
		}
		return false;
	},
	
	mul(prog, x, y) {
		if (prog.reg[x] === undefined) {
			prog.reg[x] = 0;
		} else {
			prog.reg[x] *= this.parse(prog, y);
		}
		return false;
	},
	
	mod(prog, x, y) {
		if (prog.reg[x] === undefined) {
			prog.reg[x] = 0;
		} else {
			prog.reg[x] = prog.reg[x] % this.parse(prog, y);
		}
		return false;
	},
	
	rcv(prog, x, y) {
		if (prog.queue.length > 0) {
			prog.reg[x] = prog.queue.shift();
			++prog.receiveCounter;
			return false;
		}
		--prog.line;
		return true;
	},
	
	jgz(prog, x, y) {
		if (this.parse(prog, x) > 0)
			prog.line += this.parse(prog, y) - 1;
		return false;
	}
};
