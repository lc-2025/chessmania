import Bishop from './Pieces/Bishop';
import King from './Pieces/King';
import Knight from './Pieces/Knight';
import Queen from './Pieces/Queen';
import Pawn from './Pieces/Pawn';
import Piece from './Pieces/Piece';
import Rook from './Pieces/Rook';
import { Color, FENCharacter } from '../types/Piece';
import { TCheckState, TChessboard, TLastMove, TSafePosition } from '../types/Chessboard';

/**
 * @description Chessboard class
 * @author Luca Cattide
 * @date 19/09/2025
 * @class Chessboard
 */
class Chessboard {
  private _checkState: TCheckState = { isInCheck: false };
  private _chessboard: TChessboard;
  private _lastMove: TLastMove | undefined;
  private readonly chessboardSize = 8;
  private _playerColor = Color.White;
  private _safePositions: TSafePosition;

  /**
   * Creates an instance of Chessboard.
   * @author Luca Cattide
   * @date 19/09/2025
   * @memberof Chessboard
   */
  constructor() {
    const pieces = {
      empties: new Array(4).map(() => new Array(8).map(() => null)),
      majors: {
        blacks: [
          new Rook(Color.Black),
          new Knight(Color.Black),
          new Bishop(Color.Black),
        ],
        whites: [
          new Rook(Color.White),
          new Knight(Color.White),
          new Bishop(Color.White),
        ],
      },
      pawns: (color: Color) => new Array(8).map(() => new Pawn(color)),
      side: (color: Color) => {
        const { majors } = pieces;
        const majorsColor =
          color === Color.Black ? majors.blacks : majors.whites;

        return [
          ...majorsColor,
          new Queen(color),
          new King(color),
          ...majorsColor.reverse(),
        ];
      },
    };

    this._chessboard = [
      pieces.side(Color.White),
      pieces.pawns(Color.White),
      ...pieces.empties,
      pieces.pawns(Color.Black),
      pieces.side(Color.Black),
    ];
    this._safePositions = this.findSafePosition();
  }

  /**
   * @description Chessboard getter
   * @author Luca Cattide
   * @date 19/09/2025
   * @readonly
   * @type {((FENCharacter | null)[][])}
   * @memberof Chessboard
   */
  public get chessboard(): (FENCharacter | null)[][] {
    return this._chessboard.map((row) =>
      row.map((piece) => (piece instanceof Piece ? piece?.FENCharacter : null)),
    );
  }

  /**
   * @description Check status getter
   * @author Luca Cattide
   * @date 23/09/2025
   * @readonly
   * @type {TCheckState}
   * @memberof Chessboard
   */
  public get checkState(): TCheckState {
    return this._checkState;
  }

  /**
   * @description Last move getter
   * @author Luca Cattide
   * @date 23/09/2025
   * @readonly
   * @type {TLastMove}
   * @memberof Chessboard
   */
  public get lastMove(): TLastMove {
    return this._lastMove;
  }

  /**
   * @description Player color getter
   * @author Luca Cattide
   * @date 19/09/2025
   * @readonly
   * @type {Color}
   * @memberof Chessboard
   */
  public get playerColor(): Color {
    return this._playerColor;
  }

  /**
   * @description Safe positions getter
   * @author Luca Cattide
   * @date 23/09/2025
   * @readonly
   * @type {TSafePosition}
   * @memberof Chessboard
   */
  public get safePositions(): TSafePosition {
    return this._safePositions;
  }

  /**
   * @description Piece position helper
   * Validates the piece coordinates on the board
   * @author Luca Cattide
   * @date 23/09/2025
   * @private
   * @param {number} x
   * @param {number} y
   * @returns {*}  {boolean}
   * @memberof Chessboard
   */
  private areCoordsValid(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x < this.chessboardSize && y < this.chessboardSize;
  }

  /**
   * @description Castling helper
   * Checks castling on both sides availability
   * @author Luca Cattide
   * @date 23/09/2025
   * @private
   * @param {King} king
   * @param {boolean} castle
   * @returns {*}  {boolean}
   * @memberof Chessboard
   */
  private canCastle(king: King, kingSide: boolean): boolean {
    let available = false;

    if (!king.moved) {
      const kingX = king.color === Color.White ? 0 : 7;
      const position = {
        kingX,
        kingY: 4,
        rookX: kingX,
        rookY: kingSide ? 7 : 0,
      };
      const {kingY, rookX, rookY} = position;
      const rook = this._chessboard[rookX][rookY];

      // Rook status check
      if ((rook instanceof Rook) && !rook.moved && !this._checkState.isInCheck) {
        const positionNew = {
          kingYFirst: kingY + (kingSide ? 1 : -1),
          kingYSecond: kingY + (kingSide ? 2 : -2)
        };
        const {kingYFirst, kingYSecond} = positionNew;

        if (
          // King-side castling check
          (!this._chessboard[kingX][kingYFirst] && !this._chessboard[kingX][kingYSecond]) ||
          // Queen-side castling check
          (kingSide && !this._chessboard[kingX][1])
        ) {
          available = this.isPositionSafe(king, kingX, kingY, kingX, kingYFirst) && this.isPositionSafe(king, kingX, kingY, kingX, kingYSecond);
        }
      }
    }

    return available;
  }

  /**
   * @description Safe position finder
   * Checks the possible move for a piece on the board
   * @author Luca Cattide
   * @date 23/09/2025
   * @private
   * @returns {*}  {TSafePosition}
   * @memberof Chessboard
   */
  private findSafePosition(): TSafePosition {
    const safePosition = new Map();

    for (let x = 0; x < this.chessboardSize; x++) {
      for (let y = 0; y < this.chessboardSize; y++) {
        const piece = this._chessboard[x][y];

        if (!(!piece || piece.color !== this._playerColor)) {
          const pieceSafePositions = [];

          for (const {x: dx, y: dy} of piece?.directions) {
            let newX = x + dx;
            let newY = y + dy;
            let newPiece = this._chessboard[newX][newY];

            if (
              (this.areCoordsValid(newX, newY)) &&
              (piece instanceof Pawn && this.isPawnValid(newPiece, piece, dx, dy, newX, newY) ||
              piece instanceof Knight ||
              piece instanceof King) &&
              // A Piece cannot be pleaced on a busy square of the same color
              (!this.isOwnPiece(newPiece, piece)) &&
              (this.isPositionSafe(piece, x, y, newX, newY))
            ) {
              pieceSafePositions.push({
                x: newX,
                y: newY
              });
            } else {
              // Other pieces
              while (this.areCoordsValid(newX, newY)) {
                newPiece = this._chessboard[newX][newY];

                if (
                  (!this.isOwnPiece(newPiece, piece)) &&
                  (this.isPositionSafe(piece, x, y, newX, newY))
                ) {
                  pieceSafePositions.push({
                    x: newX,
                    y: newY
                  });
                }

                if (newPiece === null) {
                  newX += dx;
                  newY += dy;
                }
              }
            }
          }

          // TODO: Continue from 1:12:00

          // Castling check
          if (piece instanceof King) {
            // King side
            if (this.canCastle(piece, true)) {
              pieceSafePositions.push({
                x,
                y: 6
              });
            }

            // Queen side
            if (this.canCastle(piece, false)) {
              pieceSafePositions.push({
                x,
                y: 2
              });
            }
          }

          if (pieceSafePositions.length > 0) {
            safePosition.set(`${x},${y}`, pieceSafePositions);
          }
        }
      }
    }

    return safePosition;
  }

  /**
   * @description Check state helper
   * Verifies if the King is in check
   * @author Luca Cattide
   * @date 23/09/2025
   * @param {Color} color
   * @param {boolean} position
   * @returns {*}  {boolean}
   * @memberof Chessboard
   */
  public isInCheck(color: Color, position: boolean): boolean {
    let check = false;

    for (let x = 0; x < this.chessboardSize; x++) {
      for (let y = 0; y < this.chessboardSize; y++) {
        const piece = this._chessboard[x][y];

        if (!(!piece || piece.color === color)) {
          for (const {x: dx, y: dy} of piece?.directions) {
            let newX = x + dx;
            let newY = y + dy;
            const pieceAttacked = this._chessboard[newX][newY];

            if (
              (this.areCoordsValid(newX, newY)) &&
              (piece instanceof Pawn || piece instanceof Knight || piece instanceof King) &&
              // Pawns attacks diagonally only
              (!(piece instanceof Pawn && dy === 0))) {
                check = this.setCheck(check, newX, newY, pieceAttacked, position);
            } else {
              // Other pieces
              while (this.areCoordsValid(newX, newY)) {
                check = this.setCheck(check, newX, newY, pieceAttacked, position);

                if (pieceAttacked === null) {
                  newX += dx;
                  newY += dy;
                }
              }
            }
          }
        }
      }
    }

    if (position) {
      this._checkState = {
        isInCheck: false
      }

      check = false;
    }

    return check;
  }

  /**
   * @description Owned piece helper
   * Checks if the destination square
   * contains a piece of the same color
   * @author Luca Cattide
   * @date 23/09/2025
   * @private
   * @param {Piece} newPiece
   * @param {Piece} piece
   * @returns {*}  {boolean}
   * @memberof Chessboard
   */
  private isOwnPiece(newPiece: Piece, piece: Piece) {
    /**
     * Position check
     * A piece cannot be placed on a
     * busy square of the same color
     */
    return newPiece && newPiece.color === piece.color;
  }

  /**
   * @description Pawn validation helper
   * Checks the conditions for a valid Pawn
   * @author Luca Cattide
   * @date 23/09/2025
   * @private
   * @param {(Piece | null)} newPiece
   * @param {Pawn} piece
   * @param {number} newX
   * @param {number} newY
   * @param {number} x
   * @param {number} y
   * @returns {*}  {boolean}
   * @memberof Chessboard
   */
  private isPawnValid(newPiece: Piece | null, piece: Pawn, newX: number, newY: number, x: number, y: number) {
    const condition = {
      moveDouble: x === 2 || x === -2,
      noMoveDiagonal: !((y === 1 || y === -1) && (!newPiece || piece.color === newPiece.color)),
      noMoveDouble: !this.chessboard[newX + (x === 2 ? -1 : 1)][newY],
      noMoveSingle: !((x === 1 || x === -1) && y === 0 && newPiece),
      notNew: !newPiece,
    };
    const {moveDouble, noMoveDiagonal, noMoveDouble, noMoveSingle, notNew} = condition

    return moveDouble && (notNew || noMoveDouble) && noMoveSingle && noMoveDiagonal;
  }

  private isPositionSafe(piece: Piece, x: number, y: number, newX: number, newY: number): boolean {
    const newPiece = this._chessboard[newX][newY];
    let safe = false;

    if (!this.isOwnPiece(newPiece, piece)) {
      // Position simulation
      this._chessboard[x][y] = null;
      this._chessboard[newX][newY] = piece;

      safe = this.isInCheck(piece.color, false);

      // Position restoration
      this._chessboard[x][y] = piece;
      this._chessboard[newX][newY] = newPiece;
    }

    return safe;
  }

  /**
   * @description Piece move helper
   * Performs a piece move and updates the board
   * @author Luca Cattide
   * @date 23/09/2025
   * @param {number} x
   * @param {number} y
   * @param {number} newX
   * @param {number} newY
   * @memberof Chessboard
   */
  public move(x: number, y: number, newX: number, newY: number): void {
    if (this.areCoordsValid(x, y) && this.areCoordsValid(newX, newY)) {
      const piece = this._chessboard[x][y];

      if (!(!piece || piece.color !== this._playerColor)) {
        const safePositions = this._safePositions.get(`${x},${y}`);

        if (!safePositions || !safePositions.find((coords) => coords.x === newX && coords.y === newY)) {
          throw new Error('Unsafe position');
        }

        if ((piece instanceof Pawn || piece instanceof King || piece instanceof Rook) && !piece.moved) {
          piece.moved = true;
        }

        this._chessboard[x][y] = null;
        this._chessboard[newX][newY] = piece;
        this._lastMove = {
          piece,
          newX,
          newY,
          x,
          y
        };
        this._playerColor = this._playerColor === Color.White ? Color.Black : Color.White;
        this.isInCheck(this._playerColor, true);
        this._safePositions = this.findSafePosition();
      }
    }
  }

  /**
   * @description Check state setter
   * @author Luca Cattide
   * @date 23/09/2025
   * @private
   * @param {boolean} check
   * @param {number} x
   * @param {number} y
   * @param {(Piece | null)} piece
   * @param {boolean} position
   * @returns {*}  {boolean}
   * @memberof Chessboard
   */
  private setCheck(check: boolean,  x: number, y: number, piece: Piece | null, position: boolean): boolean {
    if (piece instanceof King && this.isOwnPiece(piece, piece)) {
      check = false;

      if (position) {
        this._checkState = {
          isInCheck: true,
          x,
          y
        };

        check = true;
      }
    }

    return check;
  }
}

export default Chessboard;
