import type React from "react";
import "./EmptyState.scss";

interface EmptyStateProps {
  onClearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onClearFilters }) => {
  return (
    <div className="empty-state">
      <h3 className="empty-state__title">No products found</h3>
      <p className="empty-state__description">
        We couldn't find any products matching your filters. Try adjusting your
        search criteria.
      </p>
      <button onClick={onClearFilters} className="empty-state__btn">
        Clear All Filters
      </button>
    </div>
  );
};

export default EmptyState;
