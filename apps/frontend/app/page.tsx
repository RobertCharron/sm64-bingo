import styles from './assets/page.module.scss';
import { Level } from '@sm64-bingo/libs/shared/interface';
import { Board } from './components/board.component';

export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  const levels = await getLevels();
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <Board levels={levels} />
        </div>
      </div>
    </div>
  );
}

async function getLevels(): Promise<Level[]> {
  const res = await fetch(`http://localhost:3000/api/levels`);
  const levels = (await res.json()) as Level[];
  console.log(levels);
  return levels;
}
