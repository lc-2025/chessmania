import Piece from '../classes/Pieces/Piece';
import {FENCharacter, TCoordinates} from './Piece';

type TCheckState = TKingChecked | TKingUnchecked;

type TChessboard = (Piece | null)[][];

type TKingChecked = {
  isInCheck: boolean;
  x: number;
  y: number;
}

type TKingUnchecked = Pick<TKingChecked, 'isInCheck'>;

type TLastMove = {
  piece: Piece,
  newX: number;
  newY: number;
  x: number;
  y: number;
}

type TSafePosition = Map<string, TCoordinates[]>;

type TSquareEmpty = Pick<TSquareFilled, 'piece'>;

type TSquareFilled = {
  piece: FENCharacter;
  x: number;
  y: number;
}

type TSquareSelected = TSquareEmpty | TSquareFilled;

export { TCheckState, TChessboard, TLastMove, TSafePosition, TSquareSelected };
