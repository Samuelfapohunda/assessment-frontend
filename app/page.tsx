
import AuthPage from "./auth/page";
import ProductsListPage from "./products/page";


export default function Home() {
  const setUser = false;
  return (
    <>
    {setUser ? (
      <ProductsListPage />
      
    ) : (<AuthPage />)}
    </>
    
  );
}
