import { useAuthentication } from '../hooks/AuthenticationProvider';
import { useNavigate } from 'react-router-dom';
import  { useEffect } from 'react';

export const ProductsPage = () => {
  const { logout, isAuthenticated } = useAuthentication();
  const navigate = useNavigate();
    
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
    }, [isAuthenticated, navigate]);

    const handleLogout = async (e) => {
      e.preventDefault();
      await logout();
    };

  return (
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
};
