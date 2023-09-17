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

function generateWinningHashes(boardSize: number) {
  let downLeftHash = '';
  let downRightHash = '';
  const rowHashes = new Array<string>(boardSize);
  const colHashes = new Array<string>(boardSize);

  //There has to be a better way to remove these undefined values.
  for (let i = 0; i < boardSize; i++) {
    colHashes[i] = '';
  }

  for (let i = 0; i < boardSize; i++) {
    rowHashes[i] = '';
    for (let j = 0; j < boardSize; j++) {
      downLeftHash += i === j ? '1' : '0';
      downRightHash += i === boardSize - 1 - j ? '1' : 0;

      rowHashes[i] += i === j ? '1'.repeat(boardSize) : '0'.repeat(boardSize);

      const startingInsertStringArray = '0'.repeat(boardSize).split('');
      startingInsertStringArray.splice(i, 1, '1');

      colHashes[i] += startingInsertStringArray.join('');
    }
  }

  return rowHashes.concat(colHashes).concat([downLeftHash, downRightHash]);
}

function hashGameBoard(rows: BoardRow[]): string {
  const r = rows
    .map((row) => {
      return row.squares.map((square) =>
        square.state === SquareState.Owned ? '1' : '0'
      );
    })
    .flat()
    .join('');
  return r;
}

export const Board: FunctionComponent<Props> = ({ levels }) => {
  const boardSize = 5;

  const [boardState, setBoardState] = useState<BoardState>();
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winningHashes, setWinningHashes] = useState<string[]>([]);

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

  const checkForBingo = () => {
    if (!boardState) {
      return;
    }

    const gameHash = hashGameBoard(boardState.rows);
    if (winningHashes.includes(gameHash)) {
      setGameOver(true);
      return;
    }
  };

  const updateBoardGameOnSquareClick = (id: string): void => {
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
    setBoardState(boardState);
    checkForBingo();
  };

  const prepareBoard = useCallback<() => BoardState>(() => {
    const board: BoardState = { rows: [] };
    for (let i = 0; i < boardSize; i++) {
      const row: BoardRow = { squares: [] };
      for (let j = 0; j < boardSize; j++) {
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
    setWinningHashes(generateWinningHashes(boardSize));
  }, [setBoardState, prepareBoard, setWinningHashes, boardSize]);

  if (!boardState) {
    return <div>Initializing, please wait.</div>;
  }

  return (
    <>
      {gameOver ? <h1>Game Over</h1> : <></>}
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
    </>
  );
};
