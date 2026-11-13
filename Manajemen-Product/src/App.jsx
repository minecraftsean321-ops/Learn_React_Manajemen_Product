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
  return (
    <main className="container py-5">
      <h1 className="text-primary">Namaku Sean</h1>
    </main>
  );
}

export default App;