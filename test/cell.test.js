import { Cell } from '../models/Cell.js';

/**
 * Simple test runner for Cell class
 */
function runTests() {
  console.log('Running Cell tests...\n');
  
  let passed = 0;
  let total = 0;
  
  function test(name, fn) {
    total++;
    try {
      fn();
      console.log(`✓ ${name}`);
      passed++;
    } catch (error) {
      console.log(`✗ ${name}: ${error.message}`);
    }
  }
  
  function assertEqual(actual, expected, message) {
    if (actual !== expected) {
      throw new Error(`${message}: expected ${expected}, got ${actual}`);
    }
  }
  
  function assertArrayEqual(actual, expected, message) {
    if (actual.length !== expected.length) {
      throw new Error(`${message}: array length mismatch`);
    }
    for (let i = 0; i < actual.length; i++) {
      if (actual[i].x !== expected[i].x || actual[i].y !== expected[i].y) {
        throw new Error(`${message}: array element ${i} mismatch`);
      }
    }
  }
  
  // Test constructor
  test('Cell constructor creates cell with correct coordinates', () => {
    const cell = new Cell(5, 10);
    assertEqual(cell.x, 5, 'x coordinate');
    assertEqual(cell.y, 10, 'y coordinate');
  });
  
  // Test getLeftCells
  test('getLeftCells returns correct cells', () => {
    const cell = new Cell(5, 10);
    const left = cell.getLeftCells(2);
    const expected = [new Cell(4, 10), new Cell(3, 10)];
    assertArrayEqual(left, expected, 'left cells');
  });
  
  // Test getRightCells
  test('getRightCells returns correct cells', () => {
    const cell = new Cell(5, 10);
    const right = cell.getRightCells(2);
    const expected = [new Cell(6, 10), new Cell(7, 10)];
    assertArrayEqual(right, expected, 'right cells');
  });
  
  // Test getTopCells
  test('getTopCells returns correct cells', () => {
    const cell = new Cell(5, 10);
    const top = cell.getTopCells(2);
    const expected = [new Cell(5, 9), new Cell(5, 8)];
    assertArrayEqual(top, expected, 'top cells');
  });
  
  // Test getBottomCells
  test('getBottomCells returns correct cells', () => {
    const cell = new Cell(5, 10);
    const bottom = cell.getBottomCells(2);
    const expected = [new Cell(5, 11), new Cell(5, 12)];
    assertArrayEqual(bottom, expected, 'bottom cells');
  });
  
  // Test getRowWithSides
  test('getRowWithSides returns correct row with count=1', () => {
    const cell = new Cell(5, 10);
    const row = cell.getRowWithSides(1);
    const expected = [new Cell(4, 10), new Cell(5, 10), new Cell(6, 10)];
    assertArrayEqual(row, expected, 'row with sides count=1');
  });
  
  test('getRowWithSides returns correct row with count=2', () => {
    const cell = new Cell(5, 10);
    const row = cell.getRowWithSides(2);
    const expected = [
      new Cell(3, 10), new Cell(4, 10), new Cell(5, 10), 
      new Cell(6, 10), new Cell(7, 10)
    ];
    assertArrayEqual(row, expected, 'row with sides count=2');
  });
  
  // Test toString
  test('toString returns correct format', () => {
    const cell = new Cell(5, 10);
    assertEqual(cell.toString(), '5,10', 'toString format');
  });
  
  // Test toJSON
  test('toJSON returns correct object', () => {
    const cell = new Cell(5, 10);
    const json = cell.toJSON();
    assertEqual(json.x, 5, 'JSON x');
    assertEqual(json.y, 10, 'JSON y');
  });
  
  console.log(`\nTests completed: ${passed}/${total} passed`);
  
  if (passed === total) {
    console.log('All tests passed!');
  } else {
    console.log(`${total - passed} tests failed`);
  }
}

// Run tests if this file is executed directly
runTests();
