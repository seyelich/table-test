import { TProduct } from '../../types';
import { Line } from '../Line/Line';
import styles from  './Table.module.sass';

export const Table = ({products}: {products: TProduct[]}) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.head}>
          <th>Название</th>
          <th>Описание</th>
          <th>Цена</th>
          <th>Рейтинг</th>
          <th>В наличии</th>
          <th>Бренд</th>
          <th>Категория</th>
          <th>Картинка</th>
        </tr>
      </thead>
      <tbody>
        {
          products.map((el) => <Line el={el} key={el.id} />)
        }
      </tbody>
    </table>
  )
}
