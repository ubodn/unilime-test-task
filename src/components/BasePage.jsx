import { useAppData } from '../hooks/AppProvider';
import { useNavigate } from 'react-router-dom';
import  { useEffect } from 'react';

export const BasePage = () => {
  const { isAuthenticated, isLoading } = useAppData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      navigate(isAuthenticated ? '/products' : '/login');
    }
  }, [navigate, isAuthenticated, isLoading]);
 
  return 'Loading...'
};