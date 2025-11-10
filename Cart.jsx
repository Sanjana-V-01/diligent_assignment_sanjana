import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { items, subtotal, setQuantity, removeItem, clear } = useCart();
  const isEmpty = items.length === 0;
  return (
    <div className='p-4 max-w-3xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Your Cart</h1>
      {isEmpty ? (
        <div>
          <p className='mb-3'>Your cart is currently empty.</p>
          <Link to='/' className='text-blue-600 underline'>Continue shopping</Link>
        </div>
      ) : (
        <div>
          <ul className='divide-y'>
            {items.map(({ product, quantity }) => (
              <li key={product.id} className='py-3 flex items-center gap-3'>
                <img src={product.image} alt={product.name} className='w-20 h-20 object-cover rounded' />
                <div className='flex-1'>
                  <p className='font-semibold'>{product.name}</p>
                  <p>₹{product.price}</p>
                  <div className='mt-2 flex items-center gap-2'>
                    <label htmlFor={`qty-${product.id}`} className='text-sm'>Qty</label>
                    <input
                      id={`qty-${product.id}`}
                      type='number'
                      min='1'
                      className='border px-2 py-1 w-20'
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setQuantity(product.id, Number.isNaN(val) ? 1 : val);
                      }}
                    />
                    <button
                      className='text-red-600 ml-2'
                      onClick={() => removeItem(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className='mt-4 flex justify-between items-center'>
            <button className='text-red-700' onClick={clear}>Clear cart</button>
            <div className='text-right'>
              <p className='text-lg font-semibold'>Subtotal: ₹{subtotal.toFixed(2)}</p>
              <button className='mt-2 bg-green-600 text-white px-4 py-2 rounded' disabled>
                Checkout (coming soon)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Cart;
