enum Color {
  Black,
  White,
}

enum FENCharacter {
  BlackBishop = 'b',
  BlackKing = 'k',
  BlackKnight = 'n',
  BlackPawn = 'p',
  BlackQueen = 'q',
  BlackRook = 'r',
  WhiteBishop = 'B',
  WhiteKing = 'K',
  WhiteKnight = 'N',
  WhitePawn = 'P',
  WhiteQueen = 'Q',
  WhiteRook = 'R',
}

type TCoordinates = {
  x: number;
  y: number;
};

type TDirections = Array<TCoordinates>;

export { Color, FENCharacter, TCoordinates, TDirections };
