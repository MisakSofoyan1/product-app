import type React from "react";
import type { IProduct } from "../../api/productsApi";
import { StarIcon } from "../../assets/icons/StarIcon";

import "./ProductCard.scss";

const ProductCard: React.FC<IProduct> = ({
  brand,
  category,
  imageUrl = "https://picsum.photos/300/200",
  name,
  price,
  rating,
}) => {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => {
      const fill = Math.max(0, Math.min(rating - i, 1));
      return (
        <StarIcon
          key={i}
          fill={fill}
          width={16}
          height={16}
        />
      );
    });
  };

  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <img
          src={imageUrl}
          alt={name}
          className="product-card__image"
          loading="lazy"
        />
        <span className="product-card__category-badge">{category}</span>
      </div>

      <div className="product-card__info">
        <p className="product-card__brand">{brand}</p>

        <h3 className="product-card__name">{name}</h3>

        <div className="product-card__rating">
          <div className="product-card__stars">{renderStars(rating)}</div>
          <span className="product-card__rating-value">
            ({rating.toFixed(2)})
          </span>
        </div>

        <div className="product-card__price-container">
          <p className="product-card__price">${price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
