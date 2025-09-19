import Piece from './Piece';
import { PIECE } from '../../utilities/tokens';
import { Color, FENCharacter, TDirections } from '../../types/Piece';

/**
 * @description Knight class
 * @author Luca Cattide
 * @date 19/09/2025
 * @class Knight
 * @extends {Piece}
 */
class Knight extends Piece {
  protected override _FENCharacter: FENCharacter;
  protected override _directions: TDirections = PIECE.KNIGHT.DIRECTIONS;

  /**
   * Creates an instance of Knight.
   * @author Luca Cattide
   * @date 19/09/2025
   * @param {Color} color
   * @memberof Knight
   */
  constructor(color: Color) {
    super(color);

    this._FENCharacter =
      color === Color.Black
        ? FENCharacter.BlackKnight
        : FENCharacter.WhiteKnight;
  }
}

export default Knight;
