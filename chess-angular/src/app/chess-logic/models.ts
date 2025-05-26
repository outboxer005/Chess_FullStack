import { Piece } from "./pieces/piece";

export enum Color {
    White,
    Black
}

export type Coords = {
    x: number;
    y: number;
}

export enum FENChar {
    WhitePawn = "P",
    WhiteKnight = "N",
    WhiteBishop = "B",
    WhiteRook = "R",
    WhiteQueen = "Q",
    WhiteKing = "K",
    BlackPawn = "p",
    BlackKnight = "n",
    BlackBishop = "b",
    BlackRook = "r",
    BlackQueen = "q",
    BlackKing = "k"
}

export const pieceImagePaths: Readonly<Record<FENChar, string>> = {
    [FENChar.WhitePawn]: "assets/pieces/PawnW.png",
    [FENChar.WhiteKnight]: "assets/pieces/KnightW.png",
    [FENChar.WhiteBishop]: "assets/pieces/BishopW.png",
    [FENChar.WhiteRook]: "assets/pieces/RookW.png",
    [FENChar.WhiteQueen]: "assets/pieces/QueenW.png",
    [FENChar.WhiteKing]: "assets/pieces/KingW.png",
    [FENChar.BlackPawn]: "assets/pieces/PawnB.png",
    [FENChar.BlackKnight]: "assets/pieces/KnightB.png",
    [FENChar.BlackBishop]: "assets/pieces/BishopB.png",
    [FENChar.BlackRook]: "assets/pieces/RookB.png",
    [FENChar.BlackQueen]: "assets/pieces/QueenB.png",
    [FENChar.BlackKing]: "assets/pieces/KingB.png"
}

export type SafeSquares = Map<string, Coords[]>;

export enum MoveType {
    Capture,
    Castling,
    Promotion,
    Check,
    CheckMate,
    BasicMove
}

export type LastMove = {
    piece: Piece;
    prevX: number;
    prevY: number;
    currX: number;
    currY: number;
    moveType: Set<MoveType>;
}

type KingChecked = {
    isInCheck: true;
    x: number;
    y: number;
}

type KingNotChecked = {
    isInCheck: false;
}

export type CheckState = KingChecked | KingNotChecked;

export type MoveList = ([string, string?])[];

export type GameHistory = {
    lastMove: LastMove | undefined;
    checkState: CheckState;
    board: (FENChar | null)[][];
}[];