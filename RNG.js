(function(root, factory){
	if (typeof define === "function" && define.amd) {
		define(["RNG"], function(a){
			return (root.amdWebGlobal = factory(a));
		});
	} else {
		root.RNG = factory(root.RNG);
	}
}(typeof window !== "undefined" ? window : this, function(RNG){
	
	let abs = x => (x ^ (x >> 31)) - (x >> 31);

	RNG = function(seed){
		this.m = 0x80000000;
		this.a = 1103515245;
		this.c = 12345;
		
		switch(typeof seed){
			case "number":
				this.state = seed;
				break;
			case "string":
				if(/^[a-zA-Z0-9\s]*$/g.test(seed)){
					this.state = 0n;
					for(let i = 0; i < seed.substr(0, 32).length; i++){
						let char = seed.charCodeAt(i) - 48;
						if(char > 42)
							char -= 32;
						if(char > 9)
							char -= 7;
						if(char == -16)
							char = 37;
						this.state += BigInt(char)*37n**BigInt(i)
					}
					this.state = +(BigInt.asIntN(54, this.state)+"");
					break;
				}
			default:
				this.state = Math.floor(Date.now() * (this.m - 1))
		}
	}
	RNG.prototype.nextInt = function(){
		return this.state = abs((this.a * this.state + this.c) % this.m);
	}
	RNG.prototype.nextSafeInt = function(allowNegatives){
		let numStr = "";
		for(let i = 0; i < 54; i++){
			numStr += this.nextInt();
		}
		
		return this.state = +(BigInt.asIntN(54, numStr)+"");
	}
	RNG.prototype.nextFloat = function(){
		// returns in range [0,1]
		return this.nextInt() / (this.m - 1);
	}
	RNG.prototype.nextRange = function(start, end){
		// returns in range [start, end): including start, excluding end
		return start + Math.floor(this.nextInt() * (end - start) / this.m);
	}
	RNG.prototype.choice = function(array){
		return array[this.nextRange(0, array.length)];
	}

	return RNG;
}));