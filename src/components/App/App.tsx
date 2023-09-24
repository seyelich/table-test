import { useEffect, useState } from 'react';
import { TProduct } from '../../types';
import { Search } from '../Search/Search';
import { Table } from '../Table/Table';
import { getProducts } from '../../utils/api';
import { paginationLimit } from '../../utils/constants';
import { makeSubArray } from '../../utils/utils';
import styles from './App.module.sass';

function App() {
  const [allProducts, setAllProducts] = useState<TProduct[]>([]);
  const [currProd, setCurrProd] = useState<TProduct[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    getProducts()
      .then((res) => {
        setAllProducts(res.products)
        setCurrProd(res.products);
      })
      .catch(err => console.log(err));
  }, []);

  const products = makeSubArray(currProd, paginationLimit);

  return (
    <main>
      <Search
        setProducts={setCurrProd}
        allProducts={allProducts}
      />
      <Table products={products[count] === undefined ? [] : products[count]} />
      {
        currProd.length > paginationLimit &&
        <div className={styles.pagination}>
          <button
            className={styles.pagination__btn}
            onClick={()=>setCount(count-1)}
            disabled={count === 0}
          >
            Назад
          </button>
          <p className={styles.count}>{count+1}</p>
            <button
              onClick={()=>setCount(count+1)}
              className={styles.pagination__btn}
              disabled={(count+1)*10 >= currProd.length}
            >
              Далее
            </button>
        </div>
      }
    </main>
  )
}

export default App
