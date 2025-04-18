import { createElement } from 'react';
import { type RouteObject } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import { ItemsAtHomePage } from './ui';

export const itemsAtHomePageRoute: RouteObject = {
  path: pathKeys.dashboard.itemsAtHome.root(),
  element: createElement(ItemsAtHomePage),
  loader: async (args) => args,
};
