import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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
    <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.form__input_type_name}
          name="title"
          value={values.title}
          onChange={handleChangeTitle}
          placeholder="Введите название"
          disabled={values.option !== ''}
        />
        <fieldset className={styles.fieldset}>
          <label htmlFor="brand">Бренд</label>
          <input
            type="radio"
            name="type"
            value="brand"
            onChange={handleChangeRadio}
            disabled={values.title.length > 0}
          />
          <label htmlFor="category">Категория</label>
          <input
            type="radio"
            name="type"
            value="category"
            onChange={handleChangeRadio}
            disabled={values.title.length > 0}
          />
          <select
            name="option"
            value={values.option}
            onChange={handleChangeSelect}
            disabled={optionValues.length === 0}
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
      <button>Очистить</button>
    </form>
  )
}
