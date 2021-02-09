export const pharmacistMenus = [
    {
        'name': 'Radni kalendar',
        'icon': 'event_note',
        'link': 'pharmacist/work-calendar',
        'open': false
    },
    {
        'name': 'Moji pacijenti',
        'icon': 'people',
        'link': 'pharmacist/patients',
        'open': false
    },
    {
        'name': 'Izdavanje leka',
        'icon': 'healing',
        'link': 'pharmacist/medicine-issue',
        'open': false
    },
    {
        'name': 'Savetovanja',
        'icon': 'medical_services',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Započnite savetovanje',
                'icon': 'slideshow',
                'link': 'pharmacist/start-appointment',
                'open': false,
            },
            {
                'name': 'Zakažite novo savetovanje',
                'icon': 'local_hospital',
                'link': 'pharmacist/new-appointment',
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
                'link': 'pharmacist/vacation-request',
                'open': false,
            },
            {
                'name': 'Odsustvo',
                'icon': 'directions_walk',
                'link': 'pharmacist/absence-request',
                'open': false,
            }
        ]
    }
];