import { useState, createContext, useContext, useEffect } from 'react';

const AuthContext = createContext();
export const useAuthentication = () => useContext(AuthContext);

export const AuthenticationProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('token');
    const isLogged  = Boolean(token);
  
    useEffect(() => {
      setIsAuthenticated(isLogged);
      setIsLoading(false);
    }, [isLogged]);
    
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
    console.log('AuthenticationProvider', isAuthenticated);
    const data = { login, logout, errors, isAuthenticated, isLoading, clearErrors };
    
    return <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>;
};
