import Piece from './Piece';
import { PIECE } from '../../utilities/tokens';
import { Color, FENCharacter, TDirections } from '../../types/Piece';

/**
 * @description Rook class
 * @author Luca Cattide
 * @date 19/09/2025
 * @class Rook
 * @extends {Piece}
 */
class Rook extends Piece {
  // Useful to detect castling
  private _moved: boolean = false;
  protected override _FENCharacter: FENCharacter;
  protected override _directions: TDirections = PIECE.ROOK.DIRECTIONS;

  /**
   * Creates an instance of Rook.
   * @author Luca Cattide
   * @date 19/09/2025
   * @param {Color} color
   * @memberof Rook
   */
  constructor(color: Color) {
    super(color);

    this._FENCharacter =
      color === Color.Black ? FENCharacter.BlackRook : FENCharacter.WhiteRook;
  }

  /**
   * @description Moved condition getter
   * @author Luca Cattide
   * @date 19/09/2025
   * @type {boolean}
   * @memberof Rook
   */
  public get moved(): boolean {
    return this._moved;
  }

  /**
   * @description Moved condition setter
   * @author Luca Cattide
   * @date 19/09/2025
   * @memberof Rook
   */
  public set moved(moved: boolean) {
    this._moved = moved;
  }
}

export default Rook;
