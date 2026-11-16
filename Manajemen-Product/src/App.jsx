import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Product from './pages/product';
import Detail from './pages/detail-products';
import Error from './pages/error-page';

const INITIAL_PRODUCTS = [
  { id: 1, nama: 'Pulpen', harga: 5000 },
  { id: 2, nama: 'Buku Tulis', harga: 12000 },
  { id: 3, nama: 'Spidol', harga: 8000 },
  { id: 4, nama: 'Penggaris', harga: 6000 },
  { id: 5, nama: 'Penghapus', harga: 3000 },
];

function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Product products={products} setProducts={setProducts} />}
        />
        <Route path="/products/:id" element={<Detail products={products} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;