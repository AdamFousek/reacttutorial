import ProductItem from './ProductItem';
import classes from './Products.module.css';

const PRODUCTS = [
  { id: 'p1', price: 6, title: 'My book', description: 'My best book' },
  { id: 'p2', price: 5, title: 'Second book', description: 'My new best book' },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}

      </ul>
    </section>
  );
};

export default Products;
