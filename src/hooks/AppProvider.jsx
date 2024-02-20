import { useState, createContext, useContext, useEffect } from 'react';

const AppContext = createContext();
export const useAppData = () => useContext(AppContext);

export const AppProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [localStorageChanged, setLocalStorageChanged] = useState(false);
    const token = localStorage.getItem('token');
    const isLogged  = Boolean(token);
  
    useEffect(() => {
      setIsAuthenticated(isLogged);
      setIsLoading(false);
    }, [isLogged]);

    useEffect(() => {
      window.addEventListener("storage", () => {
        setLocalStorageChanged(!localStorageChanged);
      });
    });
    
    const clearErrors = (newErrorsState)  => {
      setErrors(newErrorsState);
    };

    const login = async (email, password) => {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
  
        const data = await fetch('https://dummy-api.d0.acom.cloud/api/auth/login', {
          method: 'POST',
          body: formData,
        });
  
        const result = await data.json();
  
        if (data.status === 422) {
          setErrors(result);

          return;
        }
        if (data.status !== 200) {
          setErrors('Internal server error. Please try again later');

          return;
        }
        localStorage.setItem('token', result.access_token);
        setIsAuthenticated(true);
    
        return result;
      } catch (error) {
        setErrors('Internal server error. Please try again later');
      } finally {
        setIsLoading(false);
      }
    };

    const logout = async () => {
      setIsLoading(true);
        try {
          await fetch('https://dummy-api.d0.acom.cloud/api/auth/logout', {
            method: 'POST',
          });

          localStorage.clear();
          setIsAuthenticated(false);
        } catch (error) {
            setErrors('Internal server error. Please try again later');
        } finally {
          setIsLoading(false);
        }
    };

    const getProducts = async (page = 1) => {
      try {
        const params = new URLSearchParams();
        const filters = ['title', 'price_from', 'price_to', 'from', 'to'];

        filters.forEach(filter => {
          const data = localStorage.getItem(filter);
          if (data?.length) {
            params.append(filter, data);
          }
        });

        params.append('page', page);

        const products = await fetch(`https://dummy-api.d0.acom.cloud/api/products?${params.toString()}`,{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
  
        if (products.status >= 400 && products.status < 500) {
          const response = await products.json();
  
          throw new Error(response.error);
        }
  
        return products.json();
      } catch (e) {
        if (e.message === 'Unauthorized') {
          localStorage.clear();
        }
      }
    };

    const data = { login, logout, errors, isAuthenticated, isLoading, clearErrors, getProducts, localStorageChanged };
    
    return <AppContext.Provider value={data}>{props.children}</AppContext.Provider>;
};
