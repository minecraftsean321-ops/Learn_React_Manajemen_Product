import {Routes, Route, Link} from 'react-router-dom';
import Product from './pages/product';
import Detail from './pages/detail-products';
import Error from './pages/error-page';

function App() {
  return (
    <div>
      {/* Navigasi */}
      <nav className="container pt-3 d-flex gap-3">
        <Link to="/" className="btn btn-sm btn-outline-primary">Manajemen Produk</Link>
        <Link to="/products/:id" className="btn btn-sm btn-outline-secondary">Halaman Baru</Link>
      </nav>

      {/* Daftar Rute */}
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/products/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;