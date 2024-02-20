import { useNavigate } from 'react-router-dom';
import { useAppData } from '../hooks/AppProvider';
import { ErrorModal } from './ErrorModal';
import { useEffect } from 'react';

export const LoginPage  = () => {
  const { login, errors, isAuthenticated } = useAppData();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(
      e.target.elements.email.value,
      e.target.elements.password.value
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/products');
    }
  }, [isAuthenticated]);

  return (
    <>
      <ErrorModal />
      <form className="form" onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" name="email" required />
          {errors && errors.email && <span className="validation-errors">{errors.email}</span>}
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
          {errors && errors.password && <span className="validation-errors">{errors.password}</span>}
        </p>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};
