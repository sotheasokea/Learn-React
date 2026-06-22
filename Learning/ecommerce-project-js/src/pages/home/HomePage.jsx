import axios from 'axios';
import React from "react";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css'

function HomePage({ cart, loadCart }){
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  useEffect(()=>{
    const getHomeData = async () => {
      const url = search? `/api/products?search=${search}`
                        : `/api/products`;
      const response = await axios.get(url);
      if(response.data.length === 0) {
      const allProducts = await axios.get('/api/products');
      setProducts(allProducts.data);
    } else {
      setProducts(response.data);
    }
    }
    getHomeData();
  }, [search]);

  



  return (
    <>
    <title>Ecommerce Project</title>
    <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
    <Header cart={cart} setProducts={setProducts}/>
      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart}/>
      </div>
    </>
  );
}

export default HomePage;