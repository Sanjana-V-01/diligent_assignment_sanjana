import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const { totalItems } = useCart();
  return (
    <header className='flex justify-between items-center p-4 bg-blue-600 text-white'>
      <Link to='/' className='text-xl font-bold' aria-label='E-Shop Home'>E-Shop</Link>
      <nav aria-label='Main navigation' className='flex items-center'>
        <NavLink to='/' className='mx-2' end>Home</NavLink>
        <NavLink to='/cart' className='mx-2'>
          Cart{totalItems > 0 ? ` (${totalItems})` : ''}
        </NavLink>
        <NavLink to='/login' className='mx-2'>Login</NavLink>
      </nav>
    </header>
  );
}

export default Header;
