import { createElement } from 'react';
import { type RouteObject } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import { StatsPage } from './ui';

export const statsPageRoute: RouteObject = {
  path: pathKeys.dashboard.stats.root(),
  element: createElement(StatsPage),
  loader: async (args) => args,
};
