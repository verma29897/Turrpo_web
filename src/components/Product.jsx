import React from 'react';
import '../style/Product.css'; // Import the CSS file

const Product = () => {
  return (
    <div className="product-container">
      <header className="product-header">
        <h1>Our Products</h1>
        <h2>High-Quality Cyber Security Solutions</h2>
      </header>

      <div className="product-list">
        <div className="product-item">
          <h3>Product 1</h3>
          <p>
            Description of Product 1. This product offers advanced features and
            functionalities to protect your digital assets.
          </p>
        </div>
        <div className="product-item">
          <h3>Product 2</h3>
          <p>
            Description of Product 2. This product offers advanced features and
            functionalities to protect your digital assets.
          </p>
        </div>
        <div className="product-item">
          <h3>Product 3</h3>
          <p>
            Description of Product 3. This product offers advanced features and
            functionalities to protect your digital assets.
          </p>
        </div>
        <div className="product-item">
          <h3>Product 4</h3>
          <p>
            Description of Product 4. This product offers advanced features and
            functionalities to protect your digital assets.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
