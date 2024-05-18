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
    <div className="md:mt-10 mt-5 w-[90%] mx-auto flex-col flex gap-4">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-secondary md:text-2xl font-semibold">Featured Products</h1>
        </div>
        <div>        
          <Link to="/products?featured=true">

          <button className="text-primary border px-1 border-primary flex items-center">
            view more<ArrowRightIcon className="ml-1 w-6"/>
          </button></Link>
        </div>
      </div>

      <div className="gap-4 grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full rounded-sm">
        {displayedProducts.map((product) => (
          <div key={product._id} className="flex flex-col">
                      <ProductItem cartButton={true}  key={product._id} {...product}  />

          </div>
        ))}
      </div>
    </div>
  );
}
