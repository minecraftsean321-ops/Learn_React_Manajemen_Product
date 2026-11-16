import { Link } from 'react-router-dom';
import '../App.css';

export default function error() {
    return (
        <main>
            <div className="error-page">
                <h1 className="display-4 fw-bold text-danger mb-2">Error 404</h1>
                <h4 className="fw-bold text-dark mb-2">Halaman Tidak Ditemukan</h4>
                <p className="text-muted small mb-4">Maaf, alamat URL yang kamu tuju tidak tersedia atau sudah dipindahkan.</p>

                <Link to="/" className="btn btn-outline-danger px-4">
                    Kembali ke Beranda
                </Link>
            </div>

        </main>
    )
}