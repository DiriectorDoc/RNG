module.exports = class RNG {

	#state;

	static #stateGenerator = function*(state){
		state |= 0;
		yield state = Math.abs(1103515245 * state + 12345) % 0x80000000;
		while(true) yield state = (1103515245 * state + 12345) % 0x80000000;
	}

	constructor(seed){
		switch(typeof seed){
			case "number":
				this.#state = RNG.#stateGenerator(seed);
				break;
			case "string":
				if(/^[a-zA-Z0-9\s]*$/g.test(seed)){
					let state = 0n;
					for(let i = 0; i < seed.substr(0, 32).length; i++){
						let char = seed.charCodeAt(i) - 48;
						if(char > 42)
							char -= 32;
						if(char > 9)
							char -= 7;
						if(char == -16)
							char = 37;
						state += BigInt(char)*37n**BigInt(i)
					}
					this.#state = RNG.#stateGenerator(Number(BigInt.asIntN(54, state)));
					break
				}
			default:
				this.#state = RNG.#stateGenerator(Date.now() * 0x7fffffff)
		}
	}

	get nextInt(){
		return this.#state.next().value
	}

	get nextSafeInt(){
		let numStr = "";
		for(let i = 0; i < 54; i++){
			numStr += this.nextInt
		}
		return Number(BigInt.asIntN(54, numStr))
	}

	get nextFloat(){
		// returns in range [0,1)
		return this.nextInt / 0x7fffffff
	}

	nextRange(start, end){
		// returns in range [start, end): including start, excluding end
		return start + Math.trunc(this.nextInt * (end - start) / 0x80000000)
	}

	choice(array){
		if(arguments.length == 1){
			if(array instanceof Array){
				return array[this.nextRange(0, array.length)]
			} else {
				(this.nextInt)
				return array
			}
		}
		return arguments[this.nextRange(0, arguments.length)]
	}
}