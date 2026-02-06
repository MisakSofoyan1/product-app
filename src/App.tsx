import { getFilters, getProducts, type IProductsQuery } from './api/productsApi';
import './App.css'

function App() {

  const handleGetProducts = async () => {
    const params: IProductsQuery = { page: 1, limit: 25, minPrice: 150 };
    const res = await getProducts(params);
    console.log("Products:", res);
  };

  const handleGetFilters = async () => {
    const filters = await getFilters();
    console.log("Filters:", filters);
  };

  return (
    <>
      <button onClick={handleGetProducts}>
        Get Products
      </button>
      <button onClick={handleGetFilters}>
        Get Filters
      </button>
    </>
  )
}

export default App
