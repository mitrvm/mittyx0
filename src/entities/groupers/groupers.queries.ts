import { useState } from 'react';
import {
  TagsAndCategories,
  CategoryResponseSchema,
  TagResponseSchema,
} from './groupers.contracts';

interface CategoryTagData {
  name: string;
  color: string;
}

const baseUrl = 'http://45.155.204.61';

export function useCategories() {
  const [categories, setCategories] = useState<TagsAndCategories[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/api/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const rawData = await response.json();
      const data = CategoryResponseSchema.parse(rawData);
      setCategories(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const createCategory = async (data: CategoryTagData) => {
    try {
      const response = await fetch(`${baseUrl}//api/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }
      await fetchCategories();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to create category',
      );
      throw err;
    }
  };

  const editCategory = async (id: number, data: CategoryTagData) => {
    try {
      const response = await fetch(`${baseUrl}//api/categories/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to edit category');
      }
      await fetchCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to edit category');
      throw err;
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      const response = await fetch(`${baseUrl}//api/categories/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      await fetchCategories();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to delete category',
      );
      throw err;
    }
  };

  return {
    categories,
    isLoading,
    error,
    fetchCategories,
    createCategory,
    editCategory,
    deleteCategory,
  };
}

export function useTags() {
  const [tags, setTags] = useState<TagsAndCategories[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTags = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}//api/tags`);
      if (!response.ok) {
        throw new Error('Failed to fetch tags');
      }
      const rawData = await response.json();
      const data = TagResponseSchema.parse(rawData);
      setTags(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setTags([]);
    } finally {
      setIsLoading(false);
    }
  };

  const createTag = async (data: CategoryTagData) => {
    try {
      const response = await fetch(`${baseUrl}//api/tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create tag');
      }
      await fetchTags();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create tag');
      throw err;
    }
  };

  const editTag = async (id: number, data: CategoryTagData) => {
    try {
      const response = await fetch(`${baseUrl}//api/tags/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to edit tag');
      }
      await fetchTags();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to edit tag');
      throw err;
    }
  };

  const deleteTag = async (id: number) => {
    try {
      const response = await fetch(`${baseUrl}//api/tags/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete tag');
      }
      await fetchTags();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete tag');
      throw err;
    }
  };

  return {
    tags,
    isLoading,
    error,
    fetchTags,
    createTag,
    editTag,
    deleteTag,
  };
}
