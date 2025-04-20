import { z } from 'zod';

export const TagsAndCategoriesSchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
});

export const ProductStatusSchema = z.enum(['need_buying', 'bought']);

export const GroceryItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  priority: z.number(),
  status: ProductStatusSchema,
  category_id: z.number(),
  tags: z.array(TagsAndCategoriesSchema),
  category: TagsAndCategoriesSchema,
});

export const ApiResponseSchema = z.object({
  result: z.array(GroceryItemSchema),
  total: z.number(),
});

export const CategoryResponseSchema = z.object({
  result: z.array(TagsAndCategoriesSchema),
  total: z.number(),
});

export const TagResponseSchema = z.object({
  result: z.array(TagsAndCategoriesSchema),
  total: z.number(),
});

export type TagsAndCategories = z.infer<typeof TagsAndCategoriesSchema>;
export type ProductStatus = z.infer<typeof ProductStatusSchema>;
export type GroceryItem = z.infer<typeof GroceryItemSchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
export type CategoryResponse = z.infer<typeof CategoryResponseSchema>;
export type TagResponse = z.infer<typeof TagResponseSchema>;
