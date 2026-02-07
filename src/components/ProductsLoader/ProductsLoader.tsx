import type React from "react";
import "./ProductsLoader.scss";

interface ProductGridSkeletonProps {
  count?: number;
}

const ProductsLoader: React.FC<ProductGridSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="products-grid-skeleton">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-line skeleton-line--xs"></div>
            <div className="skeleton-line skeleton-line--sm"></div>
            <div className="skeleton-line skeleton-line--md"></div>
            <div className="skeleton-stars">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="skeleton-star"></div>
              ))}
            </div>
            <div className="skeleton-price-container">
              <div className="skeleton-line skeleton-line--lg"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsLoader;
