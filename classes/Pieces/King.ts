import Piece from './Piece';
import { PIECE } from '../../utilities/tokens';
import { Color, FENCharacter, TDirections } from '../../types/Piece';

/**
 * @description King class
 * @author Luca Cattide
 * @date 19/09/2025
 * @class King
 * @extends {Piece}
 */
class King extends Piece {
  // Useful to detect castling
  private _moved = false;
  protected override _FENCharacter: FENCharacter;
  protected override _directions: TDirections = PIECE.KING.DIRECTIONS;

  /**
   * Creates an instance of King.
   * @author Luca Cattide
   * @date 19/09/2025
   * @param {Color} color
   * @memberof King
   */
  constructor(color: Color) {
    super(color);

    this._FENCharacter =
      color === Color.Black ? FENCharacter.BlackKing : FENCharacter.WhiteKing;
  }

  /**
   * @description Moved condition getter
   * @author Luca Cattide
   * @date 19/09/2025
   * @type {boolean}
   * @memberof King
   */
  public get moved(): boolean {
    return this._moved;
  }

  /**
   * @description Moved condition setter
   * @author Luca Cattide
   * @date 19/09/2025
   * @memberof King
   */
  public set moved(moved: boolean) {
    this._moved = moved;
  }
}

export default King;
