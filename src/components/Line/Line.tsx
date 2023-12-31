import { TProduct } from "../../types";
import styles from './Line.module.sass';

export const Line = ({ el }: {el: TProduct}) => {
  return (
    <tr>
      <th>{el.title}</th>
      <th>{el.description}</th>
      <th>{el.price}</th>
      <th>{el.rating}</th>
      <th>{el.stock}</th>
      <th>{el.brand}</th>
      <th>{el.category}</th>
      <th>
        <img src={el.images[0]} alt="картинка" className={styles.img} />
      </th>
    </tr>
  )
}
