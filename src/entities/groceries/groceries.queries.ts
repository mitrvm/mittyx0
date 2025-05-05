import { useState } from 'react';
import { GroceryItem, ApiResponseSchema } from './groceries.contracts';

export function useGroceries() {
  const [groceries, setGroceries] = useState<GroceryItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = 'http://45.155.204.61'; // TODO: вынести

  const fetchGroceries = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/api/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch groceries');
      }
      const rawData = await response.json();
      const data = ApiResponseSchema.parse(rawData);
      setGroceries(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setGroceries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleItemSelection = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const removeSelectedGroceries = () => {
    setGroceries((prev) =>
      prev.filter((item) => !selectedItems.includes(item.id)),
    );
    setSelectedItems([]);
  };

  const createGrocery = async (data: {
    name: string;
    category_id: number;
    tags_id: number[];
    priority: number | undefined;
  }) => {
    try {
      const response = await fetch(`${baseUrl}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create grocery item');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to create grocery item',
      );
      throw err;
    }
  };

  const editGrocery = async (data: {
    id: number;
    name: string;
    category_id: number;
    tags_id: number[];
    priority: number | undefined;
  }) => {
    try {
      const response = await fetch(`${baseUrl}/api/products/${data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to edit grocery item');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to edit grocery item',
      );
      throw err;
    }
  };

  const deleteGrocery = async (itemId: number) => {
    try {
      const response = await fetch(`${baseUrl}/api/products/${itemId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete grocery item');
      }
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to delete grocery item',
      );
      throw err;
    }
  };

  const updateItemsStatus = async (
    productIds: number[],
    status: 'bought' | 'need_buying',
  ) => {
    try {
      const response = await fetch(`${baseUrl}/api/products/statuses`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products_ids: productIds,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update items status');
      }

      await fetchGroceries();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to update items status',
      );
      throw err;
    }
  };

  return {
    groceries,
    selectedItems,
    isLoading,
    error,
    fetchGroceries,
    toggleItemSelection,
    removeSelectedGroceries,
    createGrocery,
    deleteGrocery,
    editGrocery,
    updateItemsStatus,
  };
}
