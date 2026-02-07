import type React from "react";
import "./ProductsPage.scss";
import PageIcon from "../../assets/icons/PageIcon";
import { useEffect, useState } from "react";
import {
  getFilters,
  getProducts,
  type IFilters,
  type IPagination,
} from "../../api/productsApi";
import type { IActiveFilters } from "../FiltersPanel/FiltersPanel";
import FiltersPanel from "../FiltersPanel/FiltersPanel";
import MobileFilter from "../MobileFilter/Mobilefilter";

const ProductsPage: React.FC = () => {
  const [pagination, setPagination] = useState<IPagination>();
  const [filters, setFilters] = useState<IFilters>({});
  const [isFiltersLoading, setIsFiltersLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
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
        console.log(data);
        setPagination(data.pagination);
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
    </div>
  );
};

export default ProductsPage;
