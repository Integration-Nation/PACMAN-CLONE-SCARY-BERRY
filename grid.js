class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = Array.from({ length: rows }, () => new Array(cols).fill(0));
  }

  set({ row, col, value }) {
    this.grid[row][col] = value;
  }

  get({ row, col }) {
    return this.grid[row][col];
  }

  indexFor({ row, col }) {
    return row * this.cols + col;
  }
  rowColFor(index) {
    const row = Math.floor(index / this.cols);
    const col = index % this.cols;
    return { row, col };
  }

  neighbours({ row, col }) {
    return [
      { row: row - 1, col: col }, // up
      { row: row, col: col + 1 }, // right
      { row: row, col: col - 1 }, // left
      { row: row + 1, col: col }, //down
    ];
  }
  neighbourValues({ row, col }) {
    return [
      this.north({ row, col }),
      this.east({ row, col }),
      this.west({ row, col }),
      this.south({ row, col }),
    ];
  }

  nextInRow({ row, col }) {
    return this.grid[row][col + 1];
  }
  nextInCol({ row, col }) {
    return this.grid[row + 1][col];
  }
  north({ row, col }) {
    return this.grid[row - 1][col];
  }
  south({ row, col }) {
    return this.grid[row + 1][col];
  }
  west({ row, col }) {
    return this.grid[row][col - 1];
  }
  east({ row, col }) {
    return this.grid[row][col + 1];
  }

  getRows() {
    return this.rows;
  }

  getCols() {
    return this.cols;
  }

  size() {
    return this.rows * this.cols;
  }
  fill(value) {
    this.grid = Array.from({ length: this.rows }, () =>
      new Array(this.cols).fill(value)
    );
  }
}
export default Grid;
