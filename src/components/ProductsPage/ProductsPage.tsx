import type React from "react";
import PageIcon from "../../assets/icons/PageIcon";
import { useEffect, useState } from "react";
import {
  getFilters,
  getProducts,
  type IFilters,
  type IPagination,
  type IProduct,
} from "../../api/productsApi";
import type { IActiveFilters } from "../FiltersPanel/FiltersPanel";
import FiltersPanel from "../FiltersPanel/FiltersPanel";
import MobileFilter from "../MobileFilter/Mobilefilter";
import ProductsLoader from "../ProductsLoader/ProductsLoader";
import EmptyState from "../EmptyState/EmptyState";
import ProductCard from "../ProductCard/ProductCard";

import "./ProductsPage.scss";

const ProductsPage: React.FC = () => {
  const [pagination, setPagination] = useState<IPagination>();
  const [filters, setFilters] = useState<IFilters>({});
  const [isFiltersLoading, setIsFiltersLoading] = useState(true);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [activeFilters, setActiveFilters] = useState<IActiveFilters>({
    categories: [],
    brands: [],
    minPrice: null,
    maxPrice: null,
    minRating: null,
    maxRating: null,
  });

  useEffect(() => {
    const fetchFilters = async () => {
      const res = await getFilters();
      if (res) setFilters(res);
      setIsFiltersLoading(false);
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts({});
      if (data) {
        setPagination(data.pagination);
        setProducts(data.data);
        setIsProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-page">
      <header className="products-page__header">
        <div className="products-page__header-content">
          <div className="products-page__header-inner">
            <div className="products-page__title-wrapper">
              <div className="products-page__logo">
                <PageIcon width={20} height={20} />
              </div>
              <div>
                <h1 className="products-page__title">Products</h1>
                <p className="products-page__subtitle">
                  {pagination?.total || 0} items available
                </p>
              </div>
            </div>

            <MobileFilter
              filters={filters}
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
              isLoading={isFiltersLoading}
              open={isMobileFilterOpen}
              onOpenChange={setIsMobileFilterOpen}
            />
          </div>
        </div>
      </header>

      <main className="products-page__main">
        <div className="products-page__layout">
          <aside className="products-page__sidebar">
            <div className="products-page__sidebar-content">
              <FiltersPanel
                filters={filters}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
                isLoading={isFiltersLoading}
                className="filter-drawer__content"
              />
            </div>
          </aside>

          <div className="products-page__content">
            {isProductsLoading && <ProductsLoader count={pagination?.limit} />}

            {!isProductsLoading && products.length === 0 && (
              <EmptyState
                onClearFilters={() => {
                  setActiveFilters({
                    categories: [],
                    brands: [],
                    minPrice: null,
                    maxPrice: null,
                    minRating: null,
                    maxRating: null,
                  });
                }}
              />
            )}

            {!isProductsLoading && products.length > 0 && (
              <div className="products-page__grid-container">
                <div className="products-page__grid">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="products-page__product-wrapper"
                    >
                      <ProductCard
                        id={product.id}
                        brand={product.brand}
                        category={product.category}
                        imageUrl={product.imageUrl}
                        name={product.name}
                        price={product.price}
                        rating={product.rating}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
