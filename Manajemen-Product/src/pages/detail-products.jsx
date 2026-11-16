import { Link, useParams } from 'react-router-dom';
import '../App.css';

export default function Detail({ products }) {
    const { id } = useParams();

    const product = products.find((item) => item.id === Number(id));

    if(!product) {
        return <p className='container py-5'> Product tidak ditemukan </p>
    }

    return (
        <div
        className='container detail-product' 
        style={{ width: 'fit-content', minWidth: '340px' }}
        >
            <h3 className="fw-bold text-dark mb-3"> Detail Product </h3>
            <small className="text-muted d-block mb-2"> ID Product: {id} </small>
            <h5 className="fw-bold text-dark mb-2"> Name Product: {product.nama}</h5>
            <h5 className="fw-bold text-primary mb-2">Harga Product: Rp{product.harga.toLocaleString('id-ID')}</h5>

            <Link to="/" className="btn btn-outline-primary mt-3">
                Kembali
            </Link>
        </div>
    );
}