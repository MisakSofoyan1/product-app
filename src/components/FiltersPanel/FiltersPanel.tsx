import React, { useEffect, useState } from "react";
import { getFilters, type IFilters } from "../../api/productsApi";
import "./FiltersPanel.scss";
import SlidersIcon from "../../assets/icons/SlidersIcon";
import RotateIcon from "../../assets/icons/RotateIcon";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import CustomSlider from "../CustomSlider/CustomSlider";

interface IActiveFilters {
  categories: string[];
  brands: string[];
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number | null;
  maxRating: number | null;
}

const FiltersPanel: React.FC = () => {
  const [filters, setFilters] = useState<IFilters>({});
  const [isLoading, setIsLoading] = useState(true);

  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([
    0, 1000,
  ]);
  const [localRatingRange, setLocalRatingRange] = useState<[number, number]>([
    0, 5,
  ]);

  const [activeFilters, setActiveFilters] = useState<IActiveFilters>({
    categories: [],
    brands: [],
    minPrice: null,
    maxPrice: null,
    minRating: null,
    maxRating: null,
  });

  const hasActiveFilters =
    activeFilters.categories.length > 0 ||
    activeFilters.brands.length > 0 ||
    activeFilters.minPrice !== null ||
    activeFilters.maxPrice !== null ||
    activeFilters.minRating !== null ||
    activeFilters.maxRating !== null;

  useEffect(() => {
    const fetchFilters = async () => {
      const res = await getFilters();
      if (res) setFilters(res);
      setIsLoading(false);
    };
    fetchFilters();
  }, []);

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

  const handleToggle = (key: "categories" | "brands", value: string) => {
    setActiveFilters((prev) => {
      if (!value) {
        return {
          ...prev,
          [key]: [],
        };
      }

      const currentList = prev[key];
      const newList = currentList.includes(value)
        ? currentList.filter((item) => item !== value)
        : [...currentList, value];

      return {
        ...prev,
        [key]: newList,
      };
    });
  };

  const handlePriceChange = (value: [number, number]) => {
    setLocalPriceRange(value);
  };

  const handlePriceCommit = () => {
    if (!filters) return;

    const minChanged = localPriceRange[0] !== filters?.priceRange?.min;
    const maxChanged = localPriceRange[1] !== filters?.priceRange?.max;

    setActiveFilters({
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

    setActiveFilters({
      ...activeFilters,
      minRating: minChanged ? localRatingRange[0] : null,
      maxRating: maxChanged ? localRatingRange[1] : null,
    });
  };

  const clearFilter = () => {
    setActiveFilters({
      categories: [],
      brands: [],
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
    <div className="filters-panel">
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
              checked={activeFilters.categories.length === 0}
              onChange={() => handleToggle("categories", "")}
              label="All Categories"
            />
            {filters.categories.map((category) => (
              <CustomCheckbox
                key={category}
                id={`category-${category}`}
                checked={activeFilters.categories.includes(category)}
                onChange={() => handleToggle("categories", category)}
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
              checked={activeFilters.brands.length === 0}
              onChange={() => handleToggle("brands", "")}
              label="All Brands"
            />
            {filters.brands.map((brand) => (
              <CustomCheckbox
                key={brand}
                id={`brand-${brand}`}
                checked={activeFilters.brands.includes(brand)}
                onChange={() => handleToggle("brands", brand)}
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
            {activeFilters.categories.map((category) => (
              <span key={category} className="filters-panel__tag">
                {category}
                <button
                  onClick={() => handleToggle("categories", category)}
                  className="filters-panel__tag-remove"
                >
                  <span className="filters-panel__tag-remove-icon">
                    &times;
                  </span>
                </button>
              </span>
            ))}
            {activeFilters.brands.map((brand) => (
              <span key={brand} className="filters-panel__tag">
                {brand}
                <button
                  onClick={() => handleToggle("brands", brand)}
                  className="filters-panel__tag-remove"
                >
                  <span className="filters-panel__tag-remove-icon">
                    &times;
                  </span>
                </button>
              </span>
            ))}
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
                    setActiveFilters({
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
                    setActiveFilters({
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
