import React, { useEffect } from "react";
import type { IFilters } from "../../api/productsApi";
import type { IActiveFilters } from "../FiltersPanel/FiltersPanel";
import FiltersPanel from "../FiltersPanel/FiltersPanel";
import SlidersIcon from "../../assets/icons/SlidersIcon";

import "./MobileFilter.scss";

interface MobileFilterProps {
  filters: IFilters;
  activeFilters: IActiveFilters;
  onActiveFiltersChange: (newFilter: IActiveFilters) => void;
  isLoading: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileFilter: React.FC<MobileFilterProps> = ({
  filters,
  activeFilters,
  onActiveFiltersChange,
  isLoading,
  open,
  onOpenChange,
}) => {
  const activeCount = [
    activeFilters.category,
    activeFilters.brand,
    activeFilters.minPrice,
    activeFilters.maxPrice,
    activeFilters.minRating,
    activeFilters.maxRating,
  ].filter(Boolean).length;

  const handleOverlayClick = () => {
    onOpenChange(false);
  };

  const handleDrawerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="filter-drawer__trigger-wrapper">
        <button
          className="filter-drawer__trigger"
          onClick={() => onOpenChange(true)}
        >
          <SlidersIcon width={16} height={16} />
          Filters
          {activeCount > 0 && (
            <span className="filter-drawer__count">{activeCount}</span>
          )}
        </button>
      </div>

      {open && (
        <div className="filter-drawer__overlay" onClick={handleOverlayClick}>
          <div className="filter-drawer__panel" onClick={handleDrawerClick}>
            <div className="filter-drawer__header">
              <h2 className="filter-drawer__title">Filters</h2>
              <button
                className="filter-drawer__close"
                onClick={() => onOpenChange(false)}
              >
                &times;
              </button>
            </div>
            <FiltersPanel
              filters={filters}
              activeFilters={activeFilters}
              onActiveFiltersChange={onActiveFiltersChange}
              isLoading={isLoading}
              className="filter-drawer__content"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileFilter;
