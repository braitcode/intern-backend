module.exports = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
  };

  const math = require('./math');

console.log(math.add(5, 3)); // Outputs: 8
console.log(math.subtract(10, 4)); // Outputs: 6

const os = require('os');
console.log(os.platform());
console.log(os.totalmem());
console.log(os.freemem());

function greet(name){
    return `Hello, ${name}`
}
console.log(greet("Bright"));