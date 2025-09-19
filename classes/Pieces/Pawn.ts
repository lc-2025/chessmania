import Piece from './Piece';
import { PIECE } from '../../utilities/tokens';
import { Color, FENCharacter, TDirections } from '../../types/Piece';

const { PAWN } = PIECE;

/**
 * @description Pawn class
 * @author Luca Cattide
 * @date 19/09/2025
 * @class Pawn
 * @extends {Piece}
 */
class Pawn extends Piece {
  // Manages the piece advancement restriction
  private _moved: boolean = false;
  protected override _FENCharacter: FENCharacter;
  protected override _directions: TDirections = PAWN.DIRECTIONS;

  /**
   * Creates an instance of Pawn.
   * @author Luca Cattide
   * @date 19/09/2025
   * @param {Color} color
   * @memberof Pawn
   */
  constructor(color: Color) {
    super(color);
    const isBlack = this.isBlack(color);

    if (isBlack) {
      this.setDirectionsBlack();
    }

    this._FENCharacter = isBlack
      ? FENCharacter.BlackPawn
      : FENCharacter.WhitePawn;
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
    this._directions = PAWN.DIRECTIONS_RESTRICTED;

    if (this.isBlack(this.color)) {
      this.setDirectionsBlack();
    }
  }

  /**
   * @description Piece color helper
   * @author Luca Cattide
   * @date 19/09/2025
   * @memberof Pawn
   */
  private isBlack(color: Color): boolean {
    return color === Color.Black;
  }

  /**
   * @description Black piece directions setter
   * Swaps the directions for black pieces
   * @author Luca Cattide
   * @date 19/09/2025
   * @private
   * @memberof Pawn
   */
  private setDirectionsBlack(): void {
    this._directions = this._directions.map(({ x, y }) => ({ x: -1 * x, y }));
  }
}

export default Pawn;
