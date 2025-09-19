const PIECE = {
  BISHOP: {
    DIRECTIONS: [
      { x: 1, y: 1 },
      { x: 1, y: -1 },
      { x: -1, y: 1 },
      { x: -1, y: -1 },
    ],
    PATH: {
      BLACK: '../img/black-bishop.svg',
      WHITE: '../img/white-bishop.svg',
    },
  },
  KING: {
    DIRECTIONS: [
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: -1 },
      { x: 1, y: 1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: -1, y: -1 },
    ],
    PATH: {
      BLACK: '../img/black-king.svg',
      WHITE: '../img/white-king.svg',
    },
  },
  KNIGHT: {
    DIRECTIONS: [
      { x: 1, y: 2 },
      { x: 1, y: -2 },
      { x: -1, y: 2 },
      { x: -1, y: -2 },
      { x: 2, y: 1 },
      { x: 2, y: -1 },
      { x: -2, y: 1 },
      { x: -2, y: -1 },
    ],
    PATH: {
      BLACK: '../img/black-knight.svg',
      WHITE: '../img/white-knight.svg',
    },
  },
  PAWN: {
    DIRECTIONS: [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: -1 },
    ],
    DIRECTIONS_RESTRICTED: [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: -1 },
    ],
    PATH: {
      BLACK: '../img/black-pawn.svg',
      WHITE: '../img/white-pawn.svg',
    },
  },
  QUEEN: {
    DIRECTIONS: [
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: -1 },
      { x: 1, y: 1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: -1, y: -1 },
    ],
    PATH: {
      BLACK: '../img/black-queen.svg',
      WHITE: '../img/white-queen.svg',
    },
  },
  ROOK: {
    DIRECTIONS: [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ],
    PATH: {
      BLACK: '../img/black-rook.svg',
      WHITE: '../img/white-rook.svg',
    },
  },
};

export { PIECE };
