import { useAuthentication } from '../hooks/AuthenticationProvider';
import { useNavigate } from 'react-router-dom';
import  { useEffect, useState } from 'react';

export const ProductsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState({});
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { logout, isAuthenticated } = useAuthentication();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
    
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const getProducts = async (page = 0) => {
    const products = await fetch(`https://dummy-api.d0.acom.cloud/api/products?page=${page}`,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    return products.json();
  };

  useEffect(() => {
    setIsLoading(true);
    getProducts(currentPage).then(items => {
      setProducts(items);
      setPageCount(items.last_page)
    }).catch(e => {
      if (e.status === 401) {
        console.log('e.status === 401', e);
        localStorage.clear();
        navigate('/');
      }
    }).finally(() => {
      setIsLoading(false);
    });
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  console.log('isLoading', isLoading);
  console.log('products', products);
  console.log('currentPage', currentPage);
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <section className="products-section">
        {isLoading && 'Loading products...'}
        {!isLoading && (
          products?.data?.length > 0 ? (
            products.data.map(product => (
              <section key={product.id}>
                <section>
                  <img src={product.thumbnail} alt={product.title}/>
                </section>
                <section>{product.title}</section>
                <section>{product.price}</section>
              </section>
            ))
          ) : 'No products found'
        )}
      </section>
      <section className="nav-buttons-section">
        <button onClick={prevPage} disabled={currentPage === 1} className="nav-button">
          Previous
        </button>
        <button onClick={nextPage} disabled={currentPage === pageCount} className="nav-button">
          Next
        </button>
      </section>
    </>
  );
};
