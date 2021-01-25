export const menus = [
    {
        'name': 'Početna',
        'icon': 'dashboard',
        'link': false,
        'open': false,
        //'chip': { 'value': 1, 'color': 'accent' },
        'sub': [
            {
                'name': 'Dashboard',
                'link': '/auth/dashboard',
                'icon': 'dashboard',
                'chip': false,
                'open': true,
            }
        ]
    },
    {
        'name': 'Lista',
        'icon': 'list',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Fixed',
                'icon': 'filter_list',
                'link': 'tables/fixed',
                'open': false,
            },
            {
                'name': 'Feature',
                'icon': 'done_all',
                'link': 'tables/featured',
                'open': false,
            },
            {
                'name': 'Responsive Tables',
                'icon': 'filter_center_focus',
                'link': 'tables/responsive',
                'open': false,
            }
        ]

    },
    {
        'name': 'Podaci',
        'open': false,
        'link': '/auth/scrumboard',
        'icon': 'grade',
    }
];
