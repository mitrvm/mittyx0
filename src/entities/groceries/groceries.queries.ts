import { useState } from 'react';
import { GroceryItem, ApiResponseSchema } from './groceries.contracts';

export function useGroceries() {
  const [groceries, setGroceries] = useState<GroceryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGroceries = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/products');
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

  const updateGroceryStatus = (id: number) => {
    setGroceries((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'need_buying' ? 'bought' : 'need_buying',
            }
          : item,
      ),
    );
  };

  const removeCheckedGroceries = () => {
    setGroceries((prev) =>
      prev.filter((item) => item.status === 'need_buying'),
    );
  };

  const createGrocery = async (data: {
    name: string;
    category_id: number;
    tags_id: number[];
  }) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          priority: 1,
        }),
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

  const deleteGrocery = async (itemId: number) => {
    try {
      const response = await fetch(`/api/products/${itemId}`, {
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

  return {
    groceries,
    isLoading,
    error,
    fetchGroceries,
    updateGroceryStatus,
    removeCheckedGroceries,
    createGrocery,
    deleteGrocery,
  };
}
