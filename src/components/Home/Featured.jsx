import React from 'react';
import { ArrowRightIcon, HeartIcon } from "@heroicons/react/24/outline";
import rice_bag from '../../assets/images/product/rice_bag.png';
import ProductItem from '../ProductItem';
import { ProductContext } from '../Context/ProductContext'; // Adjust the path accordingly
import { useContext } from 'react';
import { Link } from 'react-router-dom';



export default function Featured() {
  const { featured } = useContext(ProductContext);
  // const featured =  data ? data.filter(product => product.featured === true) : [];

  const displayedProducts = featured ? featured.slice(0, 6) : [];

  return (
    <div className="md:my-[100px] my-20 w-[80%] mx-auto flex-col flex gap-4">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-secondary md:text-2xl">Featured Products</h1>
        </div>
        <div>        <Link to="/products?featured=true">

          <button className="text-primary border px-1 border-primary flex items-center">
            view more<ArrowRightIcon className="ml-1 w-6"/>
          </button></Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {displayedProducts.map((product) => (
          <div key={product.id} className="flex flex-col">
                      <ProductItem key={product.id} {...product}  />

          </div>
        ))}
      </div>
    </div>
  );
}
