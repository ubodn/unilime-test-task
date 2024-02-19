import { useAuthentication } from '../hooks/AuthenticationProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Filters } from './Filters';

export const ProductsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState({});
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { logout, isAuthenticated, getProducts, localStorageChanged } = useAuthentication();
  const navigate = useNavigate();
    
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setIsLoading(true);
    getProducts(currentPage).then(items => {
      setProducts(items);
      setPageCount(items.last_page);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [currentPage,localStorageChanged]);

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

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };


  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (!products?.data?.length) {
    return (
      <div>
        <button onClick={handleLogout}>Logout</button>
        <Filters />
        <div>No products found</div>
      </div>
    )
  }
  console.log('PAGES', currentPage, pageCount);
  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <Filters />
      <section className="products-section">
        {
          products.data.map(product => (
            <section key={product.id}>
              <section>
                <img src={product.thumbnail} alt={product.title}/>
              </section>
              <section>{product.title}</section>
              <section>{product.price}</section>
            </section>
          ))
        }
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
