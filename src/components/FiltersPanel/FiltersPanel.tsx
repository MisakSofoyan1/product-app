import React, { useEffect, useState } from "react";
import { type IFilters } from "../../api/productsApi";
import "./FiltersPanel.scss";
import SlidersIcon from "../../assets/icons/SlidersIcon";
import RotateIcon from "../../assets/icons/RotateIcon";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import CustomSlider from "../CustomSlider/CustomSlider";

export interface IActiveFilters {
  category: string | null;
  brand: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number | null;
  maxRating: number | null;
}

interface FiltersPanelProps {
  filters: IFilters;
  activeFilters: IActiveFilters;
  onActiveFiltersChange: (newFilters: IActiveFilters) => void;
  isLoading: boolean;
  className?: string;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  filters,
  activeFilters,
  onActiveFiltersChange,
  isLoading,
  className,
}) => {
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([
    0, 1000,
  ]);
  const [localRatingRange, setLocalRatingRange] = useState<[number, number]>([
    0, 5,
  ]);

  const hasActiveFilters =
    activeFilters.category !== null ||
    activeFilters.brand !== null ||
    activeFilters.minPrice !== null ||
    activeFilters.maxPrice !== null ||
    activeFilters.minRating !== null ||
    activeFilters.maxRating !== null;

  useEffect(() => {
    const changeRanges = async () => {
      if (filters) {
        setLocalPriceRange([
          activeFilters.minPrice ?? filters?.priceRange?.min ?? 0,
          activeFilters.maxPrice ?? filters?.priceRange?.max ?? 1000,
        ]);
        setLocalRatingRange([
          activeFilters.minRating ?? filters?.ratingRange?.min ?? 0,
          activeFilters.maxRating ?? filters?.ratingRange?.max ?? 5,
        ]);
      }
    };
    changeRanges();
  }, [
    filters,
    activeFilters.minPrice,
    activeFilters.maxPrice,
    activeFilters.minRating,
    activeFilters.maxRating,
  ]);

  const handleToggle = (key: "category" | "brand", value: string) => {
    const newFilters = { ...activeFilters };

    if (value === "") {
      if (key === "category") newFilters.category = null;
      else newFilters.brand = null;
    } else {
      const currentValue =
        key === "category" ? activeFilters.category : activeFilters.brand;

      if (currentValue === value) {
        if (key === "category") newFilters.category = null;
        else newFilters.brand = null;
      } else {
        if (key === "category") newFilters.category = value;
        else newFilters.brand = value;
      }
    }

    onActiveFiltersChange(newFilters);
  };

  const handlePriceChange = (value: [number, number]) => {
    setLocalPriceRange(value);
  };

  const handlePriceCommit = () => {
    if (!filters) return;

    const minChanged = localPriceRange[0] !== filters?.priceRange?.min;
    const maxChanged = localPriceRange[1] !== filters?.priceRange?.max;

    onActiveFiltersChange({
      ...activeFilters,
      minPrice: minChanged ? localPriceRange[0] : null,
      maxPrice: maxChanged ? localPriceRange[1] : null,
    });
  };

  const handleRatingChange = (value: [number, number]) => {
    setLocalRatingRange(value);
  };

  const handleRatingCommit = () => {
    if (!filters) return;

    const minChanged = localRatingRange[0] !== filters?.ratingRange?.min;
    const maxChanged = localRatingRange[1] !== filters?.ratingRange?.max;

    onActiveFiltersChange({
      ...activeFilters,
      minRating: minChanged ? localRatingRange[0] : null,
      maxRating: maxChanged ? localRatingRange[1] : null,
    });
  };

  const clearFilter = () => {
    onActiveFiltersChange({
      category: null,
      brand: null,
      minPrice: null,
      maxPrice: null,
      minRating: null,
      maxRating: null,
    });
  };

  return isLoading ? (
    <div className="filters-panel filters-panel--loading">
      <div className="filters-panel__skeleton"></div>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="filters-panel__section">
          <div className="filters-panel__skeleton filters-panel__skeleton--label"></div>
          <div className="filters-panel__skeleton filters-panel__skeleton--input"></div>
        </div>
      ))}
    </div>
  ) : (
    <div className={`filters-panel ${className || ""}`}>
      <div className="filters-panel__header">
        <div className="filters-panel__title-wrapper">
          <SlidersIcon width={20} height={20} color="#1b988d" />
          <h2 className="filters-panel__title">Filters</h2>
        </div>
        {hasActiveFilters && (
          <button onClick={clearFilter} className="filters-panel__clear-btn">
            <RotateIcon width={14} height={14} />
            Clear
          </button>
        )}
      </div>

      {filters?.categories && filters?.categories.length > 0 && (
        <div className="filters-panel__section">
          <span className="filters-panel__label">Category</span>
          <div className="filters-panel__checkbox-group">
            <CustomCheckbox
              id="category-all"
              checked={!activeFilters.category}
              onChange={() => handleToggle("category", "")}
              label="All Categories"
            />
            {filters.categories.map((category) => (
              <CustomCheckbox
                key={category}
                id={`category-${category}`}
                checked={activeFilters.category === category}
                onChange={() => handleToggle("category", category)}
                label={category}
              />
            ))}
          </div>
        </div>
      )}

      {filters?.brands && filters.brands.length > 0 && (
        <div className="filters-panel__section">
          <span className="filters-panel__label">Brand</span>
          <div className="filters-panel__checkbox-group">
            <CustomCheckbox
              id="brand-all"
              checked={!activeFilters.brand}
              onChange={() => handleToggle("brand", "")}
              label="All Brands"
            />
            {filters.brands.map((brand) => (
              <CustomCheckbox
                key={brand}
                id={`brand-${brand}`}
                checked={activeFilters.brand === brand}
                onChange={() => handleToggle("brand", brand)}
                label={brand}
              />
            ))}
          </div>
        </div>
      )}

      {filters?.priceRange && (
        <div className="filters-panel__section">
          <span className="filters-panel__label">Price Range</span>
          <div className="filters-panel__slider-wrapper">
            <CustomSlider
              min={filters.priceRange.min || 0}
              max={filters.priceRange.max || 1000}
              value={localPriceRange}
              onCommit={handlePriceCommit}
              onChange={handlePriceChange}
            />
          </div>
        </div>
      )}

      {filters?.ratingRange && (
        <div className="filters-panel__section">
          <span className="filters-panel__label">Rating Range</span>
          <CustomSlider
            min={filters.ratingRange.min || 0}
            max={filters.ratingRange.max || 5}
            step={0.1}
            value={localRatingRange}
            onChange={handleRatingChange}
            onCommit={handleRatingCommit}
            icon={"★"}
          />
        </div>
      )}
      {hasActiveFilters && (
        <div className="filters-panel__active">
          <span className="filters-panel__active-label">Active Filters</span>
          <div className="filters-panel__active-tags">
            {activeFilters.category && (
              <span key={activeFilters.category} className="filters-panel__tag">
                {activeFilters.category}
                <button
                  onClick={() => handleToggle("category", "")}
                  className="filters-panel__tag-remove"
                >
                  <span className="filters-panel__tag-remove-icon">
                    &times;
                  </span>
                </button>
              </span>
            )}
            {activeFilters.brand && (
              <span key={activeFilters.brand} className="filters-panel__tag">
                {activeFilters.brand}
                <button
                  onClick={() => handleToggle("brand", "")}
                  className="filters-panel__tag-remove"
                >
                  <span className="filters-panel__tag-remove-icon">
                    &times;
                  </span>
                </button>
              </span>
            )}
            {(activeFilters.minPrice !== null ||
              activeFilters.maxPrice !== null) && (
              <span className="filters-panel__tag">
                {activeFilters.minPrice?.toFixed(2) ||
                  filters?.priceRange?.min.toFixed(2)}{" "}
                -{" "}
                {activeFilters.maxPrice?.toFixed(2) ||
                  filters?.priceRange?.max.toFixed(2)}{" "}
                $
                <button
                  onClick={() =>
                    onActiveFiltersChange({
                      ...activeFilters,
                      minPrice: null,
                      maxPrice: null,
                    })
                  }
                  className="filters-panel__tag-remove"
                >
                  <span className="filters-panel__tag-remove-icon">
                    &times;
                  </span>
                </button>
              </span>
            )}
            {(activeFilters.minRating !== null ||
              activeFilters.maxRating !== null) && (
              <span className="filters-panel__tag">
                {activeFilters.minRating?.toFixed(1) ||
                  filters?.ratingRange?.min.toFixed(1)}{" "}
                -{" "}
                {activeFilters.maxRating?.toFixed(1) ||
                  filters?.ratingRange?.max.toFixed(1)}{" "}
                ★
                <button
                  onClick={() =>
                    onActiveFiltersChange({
                      ...activeFilters,
                      minRating: null,
                      maxRating: null,
                    })
                  }
                  className="filters-panel__tag-remove"
                >
                  <span className="filters-panel__tag-remove-icon">
                    &times;
                  </span>
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersPanel;
