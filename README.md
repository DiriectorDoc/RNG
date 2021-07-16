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

## Possible seeds
A seed can be in the form of a `number` or a `string`.

```javascript
let generator1 = new RNG(1234),
    generator2 = new RNG("1234");
```

In the example above, both seeds are identical. However...

```javascript
let generator1 = new RNG(0x1234),
    generator2 = new RNG("0x1234");
```

In this example, the seeds are different.

By default, if the parameter is neither a `number` nor a `string`, the constructor will provide a seed based on `Date.now()`.

When inputting a rational number, the decimal part will be ignored. So...

```javascript
let generator1 = new RNG(123),
    generator2 = new RNG(123.456);
```

...are identical.