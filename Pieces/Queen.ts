import Piece from './Piece';
import { PIECE } from '../utilities/tokens';
import { Color, FENCharacter, TDirections } from '../types/Piece';

/**
 * @description Queen class
 * @author Luca Cattide
 * @date 19/09/2025
 * @class Queen
 * @extends {Piece}
 */
class Queen extends Piece {
protected override _FENCharacter: FENCharacter;
  protected override _directions: TDirections = PIECE.QUEEN.DIRECTIONS;

  /**
   * Creates an instance of Queen.
   * @author Luca Cattide
   * @date 19/09/2025
   * @param {Color} color
   * @memberof Queen
   */
  constructor(color: Color) {
    super(color);

    this._FENCharacter =
      color === Color.Black
        ? FENCharacter.BlackQueen
        : FENCharacter.WhiteQueen;
  }
}

export default Queen;
