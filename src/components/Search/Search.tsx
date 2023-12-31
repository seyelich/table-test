import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { TProduct } from "../../types";
import styles from "./Search.module.sass";

export const Search = ({ setProducts, allProducts }: {
  allProducts: TProduct[];
  setProducts: Dispatch<SetStateAction<TProduct[]>>;
}) => {
  const [ values, setValues ] = useState({
    type: '',
    option: '',
    title:'',
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    const uniqueCategories = Array.from(new Set(allProducts.map(el => el.category)));
    setCategories(uniqueCategories);

    const uniqueBrands = Array.from(new Set(allProducts.map(el => el.brand)));
    setBrands(uniqueBrands);
  }, [allProducts, values.option]);

  const handleClick = () => {
    setValues({
      type: '',
      option: '',
      title:'',
    });
    setProducts(allProducts);
  }

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setValues({
      ...values,
      option: e.target.value,
    });
    e.target.value !== '' ?
      setProducts(allProducts.filter(el => el[values.type as keyof typeof el] === e.target.value))
      : setProducts(allProducts)
  }

  const handleChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      option: '',
      type: e.target.value,
    });
    setProducts(allProducts);
  }

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      title: e.target.value
    });

    const newProducts =
      e.target.value.toLocaleLowerCase().length !== 0 ?
      allProducts.filter(
        el => el.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
      ) :
      allProducts;
    setProducts(newProducts);
  }

  const optionValues = values.type.length !== 0 ? values.type === 'category' ? categories : brands : []

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <input
          className={`${styles.input} ${styles.input_type_name}`}
          name="title"
          value={values.title}
          onChange={handleChangeTitle}
          placeholder="Введите название"
          disabled={values.option !== ''}
        />
        <fieldset className={styles.fieldset}>
          <input
            type="radio"
            name="type"
            id="brand"
            value="brand"
            onChange={handleChangeRadio}
            disabled={values.title.length > 0}
            className={`${styles.input} ${styles.input_type_radio}`}
            checked={values.type === 'brand'}
          />
          <label className={`${styles.btn} ${styles.btn_type_radio}`} htmlFor="brand">Бренд</label>
          <input
            type="radio"
            name="type"
            id="category"
            value="category"
            onChange={handleChangeRadio}
            disabled={values.title.length > 0}
            className={`${styles.input} ${styles.input_type_radio}`}
            checked={values.type === 'category'}
          />
          <label className={`${styles.btn} ${styles.btn_type_radio}`} htmlFor="category">Категория</label>
          <select
            name="option"
            value={values.option}
            onChange={handleChangeSelect}
            disabled={optionValues.length === 0}
            className={styles.select}
          >
            <option value="">Выберите значение</option>
            {
              optionValues.map((el, i) =>
                <option key={i} value={el}>
                  {el}
                </option>
              )
            }
          </select>
      </fieldset>
      <button type="button" onClick={handleClick} className={styles.btn}>Очистить</button>
    </form>
  )
}
