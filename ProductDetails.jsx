import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { useCart } from '../context/CartContext';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addItem } = useCart();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');
    api.get(`/products/${id}`)
      .then((data) => {
        if (mounted) setProduct(data);
      })
      .catch((e) => {
        if (mounted) setError(e.message || 'Failed to load product');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <p className='p-4'>Loading...</p>;
  if (error) return <p className='p-4 text-red-600' role='alert'>{error}</p>;
  if (!product) return <p className='p-4'>Product not found.</p>;

  return (
    <div className='p-4'>
      <img src={product.image} alt={product.name} className='h-64' />
      <h2 className='text-2xl font-bold'>{product.name}</h2>
      <p>{product.description}</p>
      <p className='font-semibold'>Price: ₹{product.price}</p>
      <button
        onClick={() => addItem(product, 1)}
        className='mt-3 bg-blue-600 text-white px-4 py-2 rounded'
      >
        Add to cart
      </button>
    </div>
  );
}

export default ProductDetails;
