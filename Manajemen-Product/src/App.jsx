import { useState } from "react";
import './App.css';

const INITIAL_PRODUCTS = [
  {id: 1, nama: 'Pulpen', harga: 5000},
  { id: 2, nama: 'Buku Tulis', harga: 12000 },
  { id: 3, nama: 'Spidol', harga: 8000 },
  { id: 4, nama: 'Penggaris', harga: 6000 },
  { id: 5, nama: 'Penghapus', harga: 3000 },
];

function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');

  // State untuk kontrol Modal ('add' | 'edit' | 'delete' | null)
  const [activeModal, setActiveModal] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // State untuk Form Input
  const [namaInput, setNamaInput] = useState('');
  const [hargaInput, setHargaInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Format angka ke Rupiah (contoh: 5000 -> Rp5.000)
  const formatRupiah = (angka) => {
    return 'Rp' + Number(angka).toLocaleString('id-ID');
  };

  // Filter produk berdasarkan pencarian
  const filteredProducts = products.filter((item) =>
    item.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Buka Modal Tambah
  const handleOpenAdd = () => {
    setNamaInput('');
    setHargaInput('');
    setErrorMsg('');
    setActiveModal('add');
  };

  // Buka Modal Edit
  const handleOpenEdit = (product) => {
    setSelectedProduct(product);
    setNamaInput(product.nama);
    setHargaInput(product.harga.toString());
    setErrorMsg('');
    setActiveModal('edit');
  };

  // Buka Modal Hapus
  const handleOpenDelete = (product) => {
    setSelectedProduct(product);
    setActiveModal('delete');
  };

  // Tutup Semua Modal
  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedProduct(null);
    setErrorMsg('');
  };

  // Simpan Produk Baru
  const handleSaveAdd = (e) => {
    e.preventDefault();
    const parsedHarga = Number(hargaInput);

    if (!namaInput.trim()) {
      setErrorMsg('Nama produk wajib diisi.');
      return;
    }
    if (isNaN(parsedHarga) || parsedHarga <= 0) {
      setErrorMsg('Harga harus lebih dari 0.');
      return;
    }

    const nextId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

    const newProduct = {
      id: nextId,
      nama: namaInput.trim(),
      harga: parsedHarga,
    };

    setProducts([...products, newProduct]);
    handleCloseModal();
  };

  // Simpan Perubahan Edit Produk
  const handleSaveEdit = (e) => {
    e.preventDefault();
    const parsedHarga = Number(hargaInput);

    if (!namaInput.trim()) {
      setErrorMsg('Nama produk wajib diisi.');
      return;
    }
    if (isNaN(parsedHarga) || parsedHarga <= 0) {
      setErrorMsg('Harga harus lebih dari 0.');
      return;
    }

    const updatedProducts = products.map((item) =>
      item.id === selectedProduct.id
        ? { ...item, nama: namaInput.trim(), harga: parsedHarga }
        : item
    );

    setProducts(updatedProducts);
    handleCloseModal();
  };

  // Konfirmasi Hapus Produk
  const handleConfirmDelete = () => {
    setProducts(products.filter((item) => item.id !== selectedProduct.id));
    handleCloseModal();
  };

  return (
    <div className="container py-5" style={{ maxWidth: '1000px' }}>
      {/* Header Halaman */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold mb-1 text-dark">Manajemen Produk</h2>
          <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
            Kelola daftar produk dan harga dalam satu tempat.
          </p>
        </div>
        <button
          className="btn btn-primary fw-medium px-3 py-2"
          style={{ borderRadius: '8px' }}
          onClick={handleOpenAdd}
        >
          + Tambah Produk
        </button>
      </div>

      {/* Search Bar & Counter */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-stretch align-items-sm-center mb-4 gap-2">
        <div className="position-relative" style={{ maxWidth: '320px', width: '100%' }}>
          <span
            className="position-absolute top-50 translate-middle-y text-muted"
            style={{ left: '12px' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </span>
          <input
            type="text"
            className="form-control ps-5"
            placeholder="Cari nama produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ borderRadius: '8px', fontSize: '0.9rem' }}
          />
        </div>
        <span className="text-muted small text-end">
          {products.length} produk
        </span>
      </div>

      {/* Grid Daftar Kartu Produk */}
      {filteredProducts.length > 0 ? (
        <div className="row g-3 mb-4">
          {filteredProducts.map((product) => (
            <div className="col-12 col-md-6 col-lg-4" key={product.id}>
              <div className="product-card p-3 h-100 d-flex flex-column justify-content-between">
                <div>
                  <small className="text-muted d-block mb-1" style={{ fontSize: '0.75rem' }}>
                    ID: {product.id}
                  </small>
                  <h5 className="fw-bold text-dark mb-1">{product.nama}</h5>
                  <p className="fw-bold text-primary fs-5 mb-3">
                    {formatRupiah(product.harga)}
                  </p>
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-edit w-50 py-1"
                    onClick={() => handleOpenEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-delete w-50 py-1"
                    onClick={() => handleOpenDelete(product)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 bg-white rounded-3 border mb-4">
          <p className="text-muted mb-0">Produk tidak ditemukan.</p>
        </div>
      )}

      {/* Footer Info */}
      <div className="text-muted small">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </div>

    {/* ================= POP-UP MODAL: TAMBAH PRODUK ================= */}
      {activeModal === 'add' && (
        <div className="custom-modal-backdrop" onClick={handleCloseModal}>
          <div
            className="custom-modal-content p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-start mb-1">
              <h5 className="fw-bold mb-0">Tambah Produk</h5>
              <button
                type="button"
                className="btn-close"
                style={{ fontSize: '0.8rem' }}
                onClick={handleCloseModal}
              ></button>
            </div>
            <p className="text-muted small mb-3">
              Masukkan informasi produk baru.
            </p>

            {errorMsg && (
              <div className="alert alert-danger py-2 px-3 small">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSaveAdd}>
              <div className="mb-3">
                <label className="form-label fw-semibold small">Nama Produk</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contoh: Pulpen"
                  value={namaInput}
                  onChange={(e) => setNamaInput(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold small">Harga (Rp)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Contoh: 5000"
                  value={hargaInput}
                  onChange={(e) => setHargaInput(e.target.value)}
                />
                <div className="form-text" style={{ fontSize: '0.78rem' }}>
                  Harga harus lebih dari 0.
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary px-3"
                  onClick={handleCloseModal}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-primary px-3">
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;