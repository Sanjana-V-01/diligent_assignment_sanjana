import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='p-6 text-center'>
      <h1 className='text-3xl font-bold mb-2'>Page not found</h1>
      <p className='mb-4'>The page you are looking for does not exist.</p>
      <Link to='/' className='text-blue-600 underline'>Go back home</Link>
    </div>
  );
}

export default NotFound;


