import { useEffect, useState } from 'react';
import { TProduct } from '../../types';
import { Search } from '../Search/Search';
import { Table } from '../Table/Table';
import { getProducts } from '../../utils/api';
import { paginationLimit } from '../../utils/constants';
import { makeSubArray } from '../../utils/utils';

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
        <div>
          {count !== 0 && <button onClick={()=>setCount(count-1)}>Назад</button>}
          <p>{count+1}</p>
          {(count+1)*10 < currProd.length && <button onClick={()=>setCount(count+1)}>Далее</button>}
        </div>
      }
    </main>
  )
}

export default App
