export const pathKeys = {
    root: '/',
    home: {
        root() {
            return pathKeys.root.concat('home/');
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