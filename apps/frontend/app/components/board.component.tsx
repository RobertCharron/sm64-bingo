'use client';

import { Level } from '@sm64-bingo/libs/shared/interface';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Square, SquareProps, SquareState } from './square.component';

type Props = {
  levels: Level[];
};
type BoardRow = {
  squares: Omit<SquareProps, 'clickFunction'>[];
};
type BoardState = {
  rows: BoardRow[];
};

export const Board: FunctionComponent<Props> = ({ levels }) => {
  const [boardState, setBoardState] = useState<BoardState>();

  const getRandomLevel = useCallback<() => Level>(() => {
    return levels[Math.floor(Math.random() * levels.length)];
  }, [levels]);

  const getRandomStar = useCallback<(level: Level) => string>(
    (level: Level) => {
      const position = Math.floor(Math.random() * level.stars.length);
      const star = level.stars[position];
      return star;
    },
    []
  );

  const updateBoardGameOnSquareClick = (id: string): void => {
    console.log('Click registered');
    if (!boardState) {
      return;
    }
    boardState.rows.forEach((row, i) => {
      const foundSquare = row.squares.findIndex((square) => square.id === id);
      if (foundSquare >= 0) {
        if (
          boardState.rows[i].squares[foundSquare].state ===
          SquareState.Available
        ) {
          boardState.rows[i].squares[foundSquare].state = SquareState.Owned;
        } else if (
          boardState.rows[i].squares[foundSquare].state === SquareState.Owned
        ) {
          boardState.rows[i].squares[foundSquare].state = SquareState.Available;
        }
      }
    });
    console.log(boardState);
    setBoardState(boardState);
  };

  const prepareBoard = useCallback<() => BoardState>(() => {
    const board: BoardState = { rows: [] };
    for (let i = 0; i < 5; i++) {
      const row: BoardRow = { squares: [] };
      for (let j = 0; j < 5; j++) {
        const level = getRandomLevel();
        const star = getRandomStar(level);
        row.squares.push({
          levelTitle: level.level,
          star,
          state: SquareState.Available,
          id: `${i}${j}`,
        });
      }
      board.rows.push(row);
    }
    return board;
  }, [getRandomLevel, getRandomStar]);

  useEffect(() => {
    setBoardState(prepareBoard());
  }, [setBoardState, prepareBoard]);

  if (!boardState) {
    return <div>Initializing, please wait.</div>;
  }
  return (
    <div className="board">
      {boardState.rows.map((row, i) => {
        return (
          <div className="boardRow" key={'row' + i}>
            {row.squares.map((square, i) => {
              return (
                <Square
                  levelTitle={square.levelTitle}
                  star={square.star}
                  state={square.state}
                  id={square.id}
                  key={square.id}
                  clickFunction={updateBoardGameOnSquareClick}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
