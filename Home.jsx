import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { useCart } from '../context/CartContext';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addItem } = useCart();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');
    api.get('/products')
      .then((data) => {
        if (mounted) setProducts(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        if (mounted) setError(e.message || 'Failed to load products');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  return (
    <div className='p-4'>
      {loading && <p>Loading products...</p>}
      {error && !loading && <p className='text-red-600 mb-3' role='alert'>{error}</p>}
      {!loading && !error && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {products.map(p => (
            <div key={p.id} className='border p-2 rounded shadow'>
              <img src={p.image} alt={p.name} className='h-40 w-full object-cover' />
              <h2 className='text-lg font-bold mt-2'>{p.name}</h2>
              <p className='mb-2'>₹{p.price}</p>
              <div className='flex justify-between items-center'>
                <Link to={`/product/${p.id}`} className='text-blue-600 underline'>View Details</Link>
                <button
                  onClick={() => addItem(p, 1)}
                  className='bg-blue-600 text-white px-3 py-1 rounded'
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
