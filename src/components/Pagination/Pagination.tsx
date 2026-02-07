import type { IPagination } from "../../api/productsApi";
import ChevronDownIcon from "../../assets/icons/ChevronDownIcon";
import ChevronLeftIcon from "../../assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "../../assets/icons/ChevronRightIcon";
import ChevronsLeftIcon from "../../assets/icons/ChevronsLeftIcon";
import ChevronsRightIcon from "../../assets/icons/ChevronsRightIcon";

import "./Pagination.scss";

interface PaginationProps {
  pagination: IPagination;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

const PAGE_SIZE_OPTIONS = [6, 10, 20, 50];

const Pagination = ({
  pagination,
  onPageChange,
  onLimitChange,
}: PaginationProps) => {
  const { page, limit, total, totalPages } = pagination;

  const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  if (total === 0) return null;

  return (
    <div className="pagination">
      <div className="pagination__info">
        <p className="pagination__text">
          Showing{" "}
          <span className="pagination__text-highlight">
            {startItem}-{endItem}
          </span>{" "}
          of <span className="pagination__text-highlight">{total}</span>{" "}
          products
        </p>
        <div className="pagination__limit">
          <span className="pagination__limit-label">Show:</span>
          <div className="pagination__select-wrapper">
            <select
              className="pagination__select"
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <div className="pagination__select-icon">
              <ChevronDownIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="pagination__nav">
        <button
          onClick={() => onPageChange(1)}
          disabled={page === 1}
          className="pagination__btn"
          aria-label="First page"
        >
          <ChevronsLeftIcon />
        </button>

        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="pagination__btn"
          aria-label="Previous page"
        >
          <ChevronLeftIcon />
        </button>

        <div className="pagination__pages">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`pagination__btn ${page === pageNum ? "pagination__btn--active" : ""}`}
              >
                {pageNum}
              </button>
            ),
          )}
        </div>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="pagination__btn"
          aria-label="Next page"
        >
          <ChevronRightIcon />
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
          className="pagination__btn"
          aria-label="Last page"
        >
          <ChevronsRightIcon />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
