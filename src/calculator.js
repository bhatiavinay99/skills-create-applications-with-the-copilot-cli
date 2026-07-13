/**
 * Node.js CLI Calculator
 *
 * Supported operations:
 *   add            (+)  - Adds two numbers
 *   subtract       (-)  - Subtracts the second number from the first
 *   multiply       (x)  - Multiplies two numbers
 *   divide         (÷)  - Divides the first number by the second
 *   modulo         (%)  - Returns the remainder of dividing two numbers
 *   exponentiation (**)  - Raises the first number to the power of the second
 *   sqrt           (√)  - Returns the square root of a number (single argument)
 *
 * Usage:
 *   node calculator.js <operation> <num1> [num2]
 *
 * Examples:
 *   node calculator.js add 5 3              -> 8
 *   node calculator.js subtract 10 4        -> 6
 *   node calculator.js multiply 3 7         -> 21
 *   node calculator.js divide 15 3          -> 5
 *   node calculator.js modulo 10 3          -> 1
 *   node calculator.js exponentiation 2 8   -> 256
 *   node calculator.js sqrt 144             -> 12
 */

/**
 * Adds two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number} Sum of a and b
 */
function add(a, b) {
  return a + b;
}

/**
 * Subtracts b from a.
 * @param {number} a
 * @param {number} b
 * @returns {number} Difference of a and b
 */
function subtract(a, b) {
  return a - b;
}

/**
 * Multiplies two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number} Product of a and b
 */
function multiply(a, b) {
  return a * b;
}

/**
 * Divides a by b. Throws an error if b is zero.
 * @param {number} a
 * @param {number} b
 * @returns {number} Quotient of a divided by b
 */
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  return a / b;
}

/**
 * Returns the remainder of a divided by b.
 * @param {number} a
 * @param {number} b
 * @returns {number} Remainder of a divided by b
 */
function modulo(a, b) {
  if (b === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }
  return a % b;
}

/**
 * Raises a to the power of b.
 * @param {number} a - The base
 * @param {number} b - The exponent
 * @returns {number} a raised to the power of b
 */
function exponentiation(a, b) {
  return Math.pow(a, b);
}

/**
 * Returns the square root of a. Throws an error if a is negative.
 * @param {number} a
 * @returns {number} Square root of a
 */
function sqrt(a) {
  if (a < 0) {
    throw new Error("Cannot compute square root of a negative number.");
  }
  return Math.sqrt(a);
}

// Supported operations map (short and long form aliases)
const operations = {
  add, addition: add,
  subtract, subtraction: subtract,
  multiply, multiplication: multiply,
  divide,
  modulo,
  exponentiation,
  sqrt,
};

// Operations that take only one argument
const unaryOps = new Set(['sqrt']);

// CLI entry point
if (require.main === module) {
  const [, , op, num1, num2] = process.argv;

  if (!op || num1 === undefined) {
    console.error("Usage: node calculator.js <add|addition|subtract|subtraction|multiply|multiplication|divide|modulo|exponentiation|sqrt> <num1> [num2]");
    process.exit(1);
  }

  if (!operations[op]) {
    console.error(`Unknown operation: "${op}". Supported: add/addition, subtract/subtraction, multiply/multiplication, divide, modulo, exponentiation, sqrt`);
    process.exit(1);
  }

  const a = parseFloat(num1);
  if (isNaN(a)) {
    console.error("num1 must be a valid number.");
    process.exit(1);
  }

  try {
    let result;
    if (unaryOps.has(op)) {
      result = operations[op](a);
    } else {
      if (num2 === undefined) {
        console.error(`Operation "${op}" requires two arguments.`);
        process.exit(1);
      }
      const b = parseFloat(num2);
      if (isNaN(b)) {
        console.error("num2 must be a valid number.");
        process.exit(1);
      }
      result = operations[op](a, b);
    }
    console.log(result);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

module.exports = { add, subtract, multiply, divide, modulo, exponentiation, sqrt };
