import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, fetchProductById, fetchCategories, fetchPromotions } from './client';

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: any) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const,
};

export const promotionKeys = {
  all: ['promotions'] as const,
  lists: () => [...promotionKeys.all, 'list'] as const,
};

// Product Queries
export const useProducts = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => fetchProducts(filters),
    ...options,
  });
};

export const useInfiniteProducts = (filters = {}, options = {}) => {
  return useInfiniteQuery({
    queryKey: ['infiniteProducts', filters],
    queryFn: ({ pageParam = 1 }) => 
      fetchProducts({ ...filters, page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage, allPages) => {
      // Assuming the API returns a hasMore flag or similar
      const nextPage = allPages.length + 1;
      // Return next page number or undefined if no more pages
      return lastPage.length === 10 ? nextPage : undefined;
    },
    ...options,
  });
};

export const useProduct = (id: string, options = {}) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProductById(id),
    ...options,
  });
};

// Category Queries
export const useCategories = (options = {}) => {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: fetchCategories,
    ...options,
  });
};

// Promotion Queries
export const usePromotions = (options = {}) => {
  return useQuery({
    queryKey: promotionKeys.lists(),
    queryFn: fetchPromotions,
    ...options,
  });
};

// Cart Mutations
export const useAddToCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (product: { id: string; quantity: number }) => {
      // In a real app, this would be an API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, product });
        }, 500);
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

// User Favorites
export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (productId: string) => {
      // In a real app, this would be an API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, productId });
        }, 300);
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};

// Order Mutations
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (orderData: any) => {
      // In a real app, this would be an API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            order: { 
              ...orderData, 
              id: `order_${Date.now()}`,
              status: 'processing',
              createdAt: new Date().toISOString(),
            } 
          });
        }, 1000);
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
