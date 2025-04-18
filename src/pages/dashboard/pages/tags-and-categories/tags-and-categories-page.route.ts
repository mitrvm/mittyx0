import { createElement } from 'react';
import { type RouteObject } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import { TagsAndCategoriesPage } from './ui';

export const tagsAndCategoriesPageRoute: RouteObject = {
  path: pathKeys.dashboard.tagsAndCategories.root(),
  element: createElement(TagsAndCategoriesPage),
  loader: async (args) => args,
};
