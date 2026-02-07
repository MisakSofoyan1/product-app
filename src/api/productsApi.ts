import apiClient from "./apiClient";

export interface IProductsParams {
  page?: number;
  limit?: number;
  category: string | null;
  brand: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number | null;
  maxRating: number | null;
}

export interface IProduct {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  rating: number;
  imageUrl: string;
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IProductsResponse {
  data: IProduct[];
  pagination: IPagination;
}

export interface IPriceRange {
  min: number;
  max: number;
}

export interface IRatingRange {
  min: number;
  max: number;
}

export interface IFilters {
  categories?: string[];
  brands?: string[];
  priceRange?: IPriceRange;
  ratingRange?: IRatingRange;
}

export const getProducts = async (
  params: IProductsParams,
): Promise<IProductsResponse | null> => {
  try {
    const response = await apiClient.get("/products", { params });
    return response.data;
  } catch (e) {
    console.error("Error fetching products: ", e);
    return null;
  }
};

export const getFilters = async (): Promise<IFilters | null> => {
  try {
    const response = await apiClient.get("/filters");
    return response.data;
  } catch (e) {
    console.error("Error fetching filters:", e);
    return null;
  }
};
