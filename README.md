# RNG
Random Number Generator with Seed compatability

## Install
### NPM Package
To install using NPM:

    npm install docs-rng

### UMD
Coming soon...

## Usage
```javascript
const RNG = require("docs-rng");

let generator = new RNG("seed");
// If no seed is provided, it will neverate one based on Date.now()

console.log(generator.nextInt) // 1498576002
console.log(generator.nextInt) // 1176987392

console.log(generator.nextFloat) // 0.9206224684233882
console.log(generator.nextFloat) // 0.3216706515856416

console.log(generator.nextSafeInt) // -3944918460362496
console.log(generator.choice(1, "two", "3", true, {hello: "world"})) // "3"
console.log(generator.nextRange(1, 10)) // 7
```