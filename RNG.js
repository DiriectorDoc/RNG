module.exports = (function(){
	class RNG {

		#state;

		static #stateGenerator = function*(state) {
			let abs = x => (x ^ (x >> 31)) - (x >> 31);
			while (true) {
				yield state = abs(1103515245 * state + 12345) % 0x80000000
			}
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
						this.#state = RNG.#stateGenerator(+(BigInt.asIntN(54, state)+""));
						break
					}
				default:
					this.#state = RNG.#stateGenerator((Date.now() * 0x7fffffff)|0)
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
			return +(BigInt.asIntN(54, numStr)+"")
		}

		get nextFloat(){
			// returns in range [0,1)
			return this.nextInt / 0x7fffffff
		}

		nextRange(start, end){
			// returns in range [start, end): including start, excluding end
			return start + (this.nextInt * (end - start) / 0x80000000)|0
		}

		choice(array){
			let arr = array instanceof Array && arguments.length == 1 ? array : arguments;
			return arr[this.nextRange(0, arr.length)]
		}
	}

	return RNG
})()