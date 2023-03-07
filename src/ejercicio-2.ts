interface Board {
    rows: number;
    columns: number;
    grid: string[][];
  }
  
  export class Connect4 {
    private readonly board: Board = { rows: 6, columns: 7, grid: [] };
    private readonly players: string[] = ['R', 'Y'];
    private currentPlayerIndex: number = 0;
    private readonly winningLength: number = 4;
    private winner: string | null = null;
  
    constructor() {
      // Initialize the board
      for (let row = 0; row < this.board.rows; row++) {
        this.board.grid[row] = [];
        for (let col = 0; col < this.board.columns; col++) {
          this.board.grid[row][col] = ' ';
        }
      }
    }
  
    public play(column: number): boolean {
      if (this.winner !== null) {
        console.log('The game is already over');
        return false;
      }
  
      if (!this.isValidColumn(column)) {
        console.log('Invalid column');
        return false;
      }
  
      const row = this.getNextOpenRow(column);
      if (row === -1) {
        console.log('Column is full');
        return false;
      }
  
      this.board.grid[row][column] = this.getCurrentPlayer();
      console.log(`Player ${this.getCurrentPlayer()} played at column ${column}`);
  
      if (this.isWinningMove(row, column)) {
        this.winner = this.getCurrentPlayer();
        console.log(`Player ${this.winner} wins!`);
        return true;
      }
  
      if (this.isBoardFull()) {
        console.log('The game is a draw!');
        return true;
      }
  
      this.switchPlayer();
      this.printBoard();
  
      return false;
    }
  
    private isValidColumn(column: number): boolean {
      return column >= 0 && column < this.board.columns;
    }
  
    private getNextOpenRow(column: number): number {
      for (let row = this.board.rows - 1; row >= 0; row--) {
        if (this.board.grid[row][column] === ' ') {
          return row;
        }
      }
      return -1;
    }
  
    private isWinningMove(row: number, col: number): boolean {
      return (
        this.checkHorizontal(row, col) ||
        this.checkVertical(row, col) ||
        this.checkDiagonalUp(row, col) ||
        this.checkDiagonalDown(row, col)
      );
    }
  
    private checkHorizontal(row: number, col: number): boolean {
      let count = 1;
      const player = this.board.grid[row][col];
      // Check left
      for (let i = col - 1; i >= 0 && this.board.grid[row][i] === player; i--) {
        count++;
      }
      // Check right
      for (let i = col + 1; i < this.board.columns && this.board.grid[row][i] === player; i++) {
        count++;
      }
      return count >= this.winningLength;
    }
  
    private checkVertical(row: number, col: number): boolean {
      let count = 1;
      const player = this.board.grid[row][col];
      // Check up
      for (let i = row - 1; i >= 0 && this.board.grid[i][col] === player; i--) {
        count++;
      }
      // Check down
      for (let i = row + 1; i < this.board.rows && this.board.grid[i][col] === player; i++) {
        count++;
      }
  // Check if count is greater than or equal to the winning length
    return count >= this.winningLength;
    }
    private checkDiagonalUp(row: number, col: number): boolean {
        let count = 1;
        const player = this.board.grid[row][col];
        // Check up-right
        for (let i = row - 1, j = col + 1; i >= 0 && j < this.board.columns && this.board.grid[i][j] === player; i--, j++) {
          count++;
        }
        // Check down-left
        for (let i = row + 1, j = col - 1; i < this.board.rows && j >= 0 && this.board.grid[i][j] === player; i++, j--) {
          count++;
        }
        // Check if count is greater than or equal to the winning length
        return count >= this.winningLength;
      }
      
      private checkDiagonalDown(row: number, col: number): boolean {
        let count = 1;
        const player = this.board.grid[row][col];
        // Check up-left
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0 && this.board.grid[i][j] === player; i--, j--) {
          count++;
        }
        // Check down-right
        for (let i = row + 1, j = col + 1; i < this.board.rows && j < this.board.columns && this.board.grid[i][j] === player; i++, j++) {
          count++;
        }
        // Check if count is greater than or equal to the winning length
        return count >= this.winningLength;
      }
      
      private isBoardFull(): boolean {
        for (let col = 0; col < this.board.columns; col++) {
          if (this.board.grid[0][col] === ' ') {
            return false;
          }
        }
        return true;
      }
      
      private getCurrentPlayer(): string {
        return this.players[this.currentPlayerIndex];
      }
      
      private switchPlayer(): void {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        console.log(`It is now Player ${this.getCurrentPlayer()}'s turn`);
      }
      
      private printBoard(): void {
        console.log('\n');
        for (let row = 0; row < this.board.rows; row++) {
          let rowString = '| ';
          for (let col = 0; col < this.board.columns; col++) {
            rowString += `${this.board.grid[row][col]} | `;
          }
          console.log(rowString);
        }
        console.log('-----------------------------');
      }
    }