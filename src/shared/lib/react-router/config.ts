export const pathKeys = {
  root: '/',
  dashboard: {
    root() {
      return pathKeys.root.concat('dashboard/');
    },
    home: {
      root() {
        return pathKeys.dashboard.root().concat('home/');
      },
    },
    itemsAtHome: {
      root() {
        return pathKeys.dashboard.root().concat('items-at-home/');
      },
    },
    tagsAndCategories: {
      root() {
        return pathKeys.dashboard.root().concat('tags-and-categories/');
      },
    },
    stats: {
      root() {
        return pathKeys.dashboard.root().concat('stats/');
      },
    },
  },
  page404() {
    return pathKeys.root.concat('404/');
  },
  guide: {
    root() {
      return 'https://abc';
    },
  },
};
