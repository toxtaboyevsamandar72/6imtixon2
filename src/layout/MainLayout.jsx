import { Children } from 'react';
import './index.css'
import { useNavigate } from 'react-router-dom';

function MainLayout({ children }) {

const navigate = useNavigate();

function handleLogout(event) {
    event.preventDefault();


    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
}

  return (
    <div>
      <header className='header w-full bg-blue-50 py-3 px-20'>
        <div className='mx-auto flex justify-between items-center'>
        <div className='logo'>
          <a href="#">LOGO</a>
        </div>
        <nav>
          <button onClick={handleLogout} className='brn bg-blue-700 py-3 px-6 rounded-md text-white' >Logout</button>
        </nav>
        </div>
      </header>
      {children}
    </div>
  );
}

export default MainLayout;
