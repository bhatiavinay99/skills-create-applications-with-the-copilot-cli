/**
 * Node.js CLI Calculator
 *
 * Supported operations:
 *   add      (+)  - Adds two numbers
 *   subtract (-)  - Subtracts the second number from the first
 *   multiply (x)  - Multiplies two numbers
 *   divide   (÷)  - Divides the first number by the second
 *
 * Usage:
 *   node calculator.js <operation> <num1> <num2>
 *
 * Examples:
 *   node calculator.js add 5 3        -> 8
 *   node calculator.js subtract 10 4  -> 6
 *   node calculator.js multiply 3 7   -> 21
 *   node calculator.js divide 15 3    -> 5
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

// Supported operations map
const operations = { add, subtract, multiply, divide };

// CLI entry point
if (require.main === module) {
  const [, , op, num1, num2] = process.argv;

  if (!op || num1 === undefined || num2 === undefined) {
    console.error("Usage: node calculator.js <add|subtract|multiply|divide> <num1> <num2>");
    process.exit(1);
  }

  if (!operations[op]) {
    console.error(`Unknown operation: "${op}". Supported: add, subtract, multiply, divide`);
    process.exit(1);
  }

  const a = parseFloat(num1);
  const b = parseFloat(num2);

  if (isNaN(a) || isNaN(b)) {
    console.error("Both num1 and num2 must be valid numbers.");
    process.exit(1);
  }

  try {
    const result = operations[op](a, b);
    console.log(result);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

module.exports = { add, subtract, multiply, divide };
