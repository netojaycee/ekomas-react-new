import rice_bag from '../assets/images/product/rice_bag.png';
import product_1 from '../assets/images/product/product_1.png';
import product_2 from '../assets/images/product/product_2.png';
import product_3 from '../assets/images/product/product_3.png';
import product_4 from '../assets/images/product/product_4.png';
import product_5 from '../assets/images/product/product_5.png';

const products = Array.from({ length: 60 }, (_, index) => {
  let isFeatured = false;
  let discount = 0;

  // Determine if the product is featured
  if (Math.random() < 0.2) {
    isFeatured = true;
    discount = 0; // Featured products have a discount of 0
  } else if (Math.random() < 0.3) {
    discount = Math.floor(Math.random() * 20); // 30% chance of having a discount
  }

  return {
    id: index + 1,
    name: `Product ${index + 1}`,
    price: Math.floor(Math.random() * 500) + 100,
    image: index % 5 === 0 ? rice_bag : product_1,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    discount: discount,
    featured: isFeatured,
    topSelling: index < 7 ? true : false,
    category: index % 2 === 0 ? 'CategoryA' : 'CategoryB',
  };
});

export default products;
