import { FunctionComponent, useState } from 'react';

export enum SquareState {
  Available = 'Available',
  Owned = 'Owned',
  Opponent = 'OpponentOwned',
}

export type SquareProps = {
  id: string;
  levelTitle: string;
  bgImg: string;
  star: string;
  state: 'Owned' | 'OpponentOwned' | 'Available';
  clickFunction: (id: string) => void;
};

export const Square: FunctionComponent<SquareProps> = ({
  levelTitle,
  star,
  state,
  clickFunction,
  bgImg,
  id,
}) => {
  const [squareState, setSquareState] = useState(state);

  const handleClick = () => {
    if (squareState === SquareState.Available) {
      setSquareState(SquareState.Owned);
    } else if (squareState === SquareState.Owned) {
      setSquareState(SquareState.Available);
    }
    clickFunction(id);
  };
  return (
    <div
      className={'boardSquare square' + squareState}
      onClick={handleClick}
      style={{ backgroundImage: `url("${bgImg}")` }}
    >
      <h3>{levelTitle}</h3>
      <h5>{star}</h5>
    </div>
  );
};
