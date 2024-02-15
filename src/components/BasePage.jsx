import { useAuthentication } from '../hooks/AuthenticationProvider';
import { useNavigate } from 'react-router-dom';
import  { useEffect } from 'react';

export const BasePage = () => {
  const { isAuthenticated, isLoading } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      navigate(isAuthenticated ? '/products' : '/login');
    }
  }, [navigate, isAuthenticated, isLoading]);
 
  return 'Loading...'
};