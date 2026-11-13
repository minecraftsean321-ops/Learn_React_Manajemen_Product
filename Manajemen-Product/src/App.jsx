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
    <main className="container py-5">
      <h1 className="text-primary">Namaku Sean</h1>
    </main>
  );
}

export default App;