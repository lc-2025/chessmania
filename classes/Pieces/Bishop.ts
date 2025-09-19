import Piece from './Piece';
import { PIECE } from '../../utilities/tokens';
import { Color, FENCharacter, TDirections } from '../../types/Piece';

/**
 * @description Bishop class
 * @author Luca Cattide
 * @date 19/09/2025
 * @class Bishop
 * @extends {Piece}
 */
class Bishop extends Piece {
  protected override _FENCharacter: FENCharacter;
  protected override _directions: TDirections = PIECE.BISHOP.DIRECTIONS;

  /**
   * Creates an instance of Bishop.
   * @author Luca Cattide
   * @date 19/09/2025
   * @param {Color} color
   * @memberof Bishop
   */
  constructor(color: Color) {
    super(color);

    this._FENCharacter =
      color === Color.Black
        ? FENCharacter.BlackBishop
        : FENCharacter.WhiteBishop;
  }
}

export default Bishop;
