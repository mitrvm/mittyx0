import { type RouteObject, redirect } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import {
  itemsAtHomePageRoute,
  mainPageRoute,
  statsPageRoute,
  tagsAndCategoriesPageRoute,
} from './pages';

export const dashboardPageRoute: RouteObject = {
  path: pathKeys.dashboard.root(),
  children: [
    {
      index: true,
      loader: async () => redirect(pathKeys.dashboard.home.root()),
    },
    {
      children: [
        mainPageRoute,
        itemsAtHomePageRoute,
        statsPageRoute,
        tagsAndCategoriesPageRoute,
      ],
    },
  ],
};
