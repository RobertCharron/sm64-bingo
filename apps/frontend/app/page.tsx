import styles from './page.module.scss';
import { Level } from './interface/types';
type propsType = {
  levels: Level[];
};
export default async function Index(props: propsType) {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          The stuff: {JSON.stringify(props.levels)}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch('/api/levels');
  console.log('Doing the thing?', res);
  const levels = (await res.json()) as Level[];
  return {
    props: {
      levels,
    },
  };
};
