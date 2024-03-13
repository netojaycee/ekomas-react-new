import React, { useContext } from "react";
import {
  HeartIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
// import { ProductContext } from "../components/Context/ProductContext";
import { RelatedProducts } from "../PageComponents/AllProducts/RelatedProducts";
// import { CartContext } from "../components/Context/CartContext";
import data from "../ProductData";




const ProductDetails = () => {
  const { id } = useParams();
//   const { data } = useContext(ProductContext);
//   const { addToCart, cart } = useContext(CartContext);



  const handleQuantityIncrease = (id) => {
    increaseAmount(id);
  };
  const handleQuantityDecrease = (id) => {
    decreaseAmount(id);
  };
  // console.log(cart);
  const [quantity, setQuantity] = React.useState(1);
  // Find the product with the matching id
  const product = data.find((p) => p.id === parseInt(id));

  // Return early if the product is not found
  if (!product) {
    return <div>Product not found</div>;
  }

  const { name, price, image, description, category } = product;

  const handleQuantityChange = (change) => {
    // Assuming change is either 1 or -1 for increase or decrease
    const newQuantity = quantity + change;

    // Ensure quantity doesn't go below 1
    if (newQuantity < 1) {
      return;
    }

    setQuantity(newQuantity);
  };

  return (
    <>
        <div className="flex flex-col mb-10 gap-6">
          <div className="flex flex-col lg:flex-row  gap-6 w-[65%] mx-auto mt-9 h-[300px]">
            <div className="bg-white flex flex-row p-2 pr-0 relative shadow-md flex-1 justify-center items-center">
              <div className="flex flex-row gap-5">
                <div className="">
                  <HeartIcon className="w-5 text-secondary" />
                </div>
                <div className="my-2">
                  <img src={image} alt={name} className="w-full object-cover" />
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col">
              <h1>{name}</h1>
              <div className="text-[#b32b2b] text-xl font-semibold">
                {price}
              </div>
              <hr className="mb-4 border-2 border-[#b32b2b] w-full" />
              <div className="text-black text-sm font-semibold">Details</div>
              <p className="text-gray-600 mt-3 h-[50%]">{description}</p>

              <div className="flex flex-row items-center justify-center gap-3 mt-3">
                <div className="flex flex-row gap-2"><button
                  className="py-2 px-3 border border-[#b32b2b] rounded flex items-center justify-center"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <ChevronLeftIcon className="w-4" />
                </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-16 text-center rounded border border-gray-300 rounded-md"
                  />
                  <button
                    className="py-2 px-3 border border-[#b32b2b]  rounded flex items-center justify-center"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <ChevronRightIcon className="w-4" />
                  </button></div>

                <button onClick={() => addToCart(product, id, quantity)} className="bg-[#b32b2b] hover:bg-secondary text-white rounded font-bold py-2 w-[60%]">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div className="mt-40 flex flex-col gap-5 text-xl text-[#b32b2b]">
            <div className="w-[80%] mx-auto">
              <h1>Related Products</h1>
              <hr className="mb-4 border-2 border-[#b32b2b] w-full" />
            </div>
            <div>
              <RelatedProducts category={product.category} itemsPerPage={5} />
            </div>
          </div>
        </div>
    </>
  );
};
export default ProductDetails;