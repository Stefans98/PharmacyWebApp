export const dermatologistMenus = [
    {
        'name': 'Radni kalendar',
        'icon': 'event_note',
        'link': 'dermatologist/work-calendar',
        'open': false
    },
    {
        'name': 'Moji pacijenti',
        'icon': 'people',
        'link': 'dermatologist/patients',
        'open': false
    },
    {
        'name': 'Pregledi',
        'icon': 'medical_services',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Započnite pregled',
                'icon': 'slideshow',
                'link': 'dermatologist/start-appointment',
                'open': false,
            },
            {
                'name': 'Zakažite novi pregled',
                'icon': 'local_hospital',
                'link': 'dermatologist/new-appointment',
                'open': false,
            }
        ]
    },
    {
        'name': 'Zahtevi za odmor',
        'icon': 'assignment',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Godišnji odmor',
                'icon': 'local_airport',
                'link': 'dermatologist/vacation-request',
                'open': false,
            },
            {
                'name': 'Odsustvo',
                'icon': 'directions_walk',
                'link': 'dermatologist/absence-request',
                'open': false,
            }
        ]
    }
];