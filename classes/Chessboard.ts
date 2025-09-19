import Bishop from '../Pieces/Bishop';
import King from '../Pieces/King';
import Knight from '../Pieces/Knight';
import Queen from '../Pieces/Queen';
import Pawn from '../Pieces/Pawn';
import Piece from '../Pieces/Piece';
import Rook from '../Pieces/Rook';
import { Color, FENCharacter } from '../types/Piece';
import { TChessboard } from '../types/Chessboard';

/**
 * @description Chessboard class
 * @author Luca Cattide
 * @date 19/09/2025
 * @class Chessboard
 */
class Chessboard {
  private _chessboard: TChessboard;
  private _playerColor = Color.White;

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
}

export default Chessboard;
