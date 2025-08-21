/**
 * Represents a 2D grid cell with x and y coordinates.
 */
export class Cell {
  /**
   * Creates a new Cell instance.
   * @param {number} x - The x-coordinate of the cell.
   * @param {number} y - The y-coordinate of the cell.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Returns an array of cells to the left of this cell.
   * @param {number} [limit=1] - The number of cells to return.
   * @returns {Cell[]} An array of Cell instances to the left.
   */
  getLeftCells(limit = 1) {
    const cells = [];
    for (let i = 1; i <= limit; i++) {
      cells.push(new Cell(this.x - i, this.y));
    }
    return cells;
  }

  /**
   * Returns an array of cells to the right of this cell.
   * @param {number} [limit=1] - The number of cells to return.
   * @returns {Cell[]} An array of Cell instances to the right.
   */
  getRightCells(limit = 1) {
    const cells = [];
    for (let i = 1; i <= limit; i++) {
      cells.push(new Cell(this.x + i, this.y));
    }
    return cells;
  }
  /**
   * Returns an array of cells above this cell.
   * @param {number} [limit=1] - The number of cells to return.
   * @returns {Cell[]} An array of Cell instances above.
   */
  getTopCells(limit = 1) {
    const cells = [];
    for (let i = 1; i <= limit; i++) {
      cells.push(new Cell(this.x, this.y + i)); // Y increases upward
    }
    return cells;
  }
  /**
   * Returns an array of cells below this cell.
   * @param {number} [limit=1] - The number of cells to return
   * @return {Cell[]} An array of Cell instances below.
   */
  getBottomCells(limit = 1) {
    const cells = [];
    for (let i = 1; i <= limit; i++) {
      cells.push(new Cell(this.x, this.y - i)); // Y decreases downward
    }
    return cells;
  }

  /**
   * Returns a horizontal row of cells: `count` cells to the left, center cell, and `count` cells to the right.
   * @param {number} [count=1] - The number of cells to the left and right of the center cell.
   * @returns {Cell[]} An array of Cell instances representing the row.
   */
  getRowWithSides(count = 1) {
    return [...this.getLeftCells(count).reverse(), new Cell(this.x, this.y), ...this.getRightCells(count)];
  }

  /**
   * Parses a string representation of a cell and returns a new Cell instance.
   * @param {string} str - The string in the format "x,y".
   * @returns {Cell} A new Cell instance with the parsed coordinates.
   */
  static fromString(str) {
    const [x, y] = str.split(",").map(Number);
    return new Cell(x, y);
  }

  /**
   * Returns a string representation of the cell in the format "x,y".
   * @returns {string} The string representation of the cell.
   */
  toString() {
    return `${this.x},${this.y}`;
  }

  /**
   * Returns a JSON representation of the cell.
   * @returns {Object} An object with x and y properties.
   */
  toJSON() {
    return { x: this.x, y: this.y };
  }
}
