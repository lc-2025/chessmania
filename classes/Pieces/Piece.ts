import { Color, FENCharacter, TDirections } from '../../types/Piece';

/**
 * @description Piece class
 * @author Luca Cattide
 * @date 19/09/2025
 * @abstract
 * @class Piece
 */
abstract class Piece {
  protected abstract _directions: TDirections;
  protected abstract _FENCharacter: FENCharacter;

  /**
   * Creates an instance of Piece.
   * @author Luca Cattide
   * @date 19/09/2025
   * @param {Color} _color
   * @memberof Piece
   */
  constructor(private _color: Color) {}

  /**
   * @description Piece color getter
   * @author Luca Cattide
   * @date 19/09/2025
   * @readonly
   * @type {Color}
   * @memberof Piece
   */
  public get color(): Color {
    return this._color;
  }

  /**
   * @description Piece directions getter
   * @author Luca Cattide
   * @date 19/09/2025
   * @readonly
   * @type {TDirections}
   * @memberof Piece
   */
  public get directions(): TDirections {
    return this._directions;
  }

  /**
   * @description Piece FEN character getter
   * @author Luca Cattide
   * @date 19/09/2025
   * @readonly
   * @type {FENCharacter}
   * @memberof Piece
   */
  public get FENCharacter(): FENCharacter {
    return this._FENCharacter;
  }
}

export default Piece;
