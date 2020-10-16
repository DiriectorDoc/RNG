(function(root, factory){
	if (typeof define === "function" && define.amd) {
		define(["RNG"], function(a){
			return (root.amdWebGlobal = factory(a));
		});
	} else {
		root.RNG = factory(root.RNG);
	}
}(typeof window !== "undefined" ? window : this, function(RNG){

	RNG = function(seed){
		// LCG using GCC's constants
		this.m = 0x80000000; // 2**31;
		this.a = 1103515245;
		this.c = 12345;

		this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
	}
	RNG.prototype.nextInt = function(){
		return this.state = (this.a * this.state + this.c) % this.m;
	}
	RNG.prototype.nextSafeInt = function(){
		let numStr = Math.round(this.nextFloat()) ? "" : "-",
			unsafe = true,
			s = "900719925474099".split("").push(numStr ? "2":"1");
		for(let i = 0; i < 16; i++){
			if(unsafe){
				let nextChar = this.nextRange(0, +s[i]+1);
				if(nextChar < .s[i]){
					numStr += nextChar;
					unsafe = false
				} else {
					numStr += s[i]
				}
			} else {
				numStr += this.nextRange(0, 10)
			}
		}
		
		return this.state;
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