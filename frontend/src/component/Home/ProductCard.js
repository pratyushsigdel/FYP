import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      {product.images.length > 0 && (
        <img src={product.images[0].url} alt={product.name} />
      )}

      <p> {product.name}</p>

      <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({product.numofReviews} Reviews)
        </span>
      </div>

      <span>{`RS. ${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
