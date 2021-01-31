export const systemAdministratorMenus = [
    {
        'name': 'Registracija',
        'icon': 'create',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Apoteka',
                'icon': 'local_hospital',
                'link': 'system-administrator/pharmacy-registration',
                'open': false,
            },
            {
                'name': 'Administratora apoteka',
                'icon': 'person_add',
                'link': 'system-administrator/pharmacy-administrator-registration',
                'open': false,
            },
            {
                'name': 'Administratora sistema',
                'icon': 'person_add',
                'link': 'system-administrator/system-administrator-registration',
                'open': false,
            },
            {
                'name': 'Dermatologa',
                'icon': 'person_add',
                'link': 'system-administrator/dermatologist-registration',
                'open': false,
            } ,
            {
                'name': 'Dobavljača',
                'icon': 'person_add',
                'link': 'system-administrator/supplier-registration',
                'open': false,
            }   
        ]
    },
    {
        'name': 'Žalbe',
        'icon': 'report-problem',
        'link': 'system-administrator/complaints',
        'open': false,
    },
    {
        'name': 'Loyalty program',
        'icon': 'assignment',
        'link': 'system-administrator/loyalty-program',
        'open': false,
    }
];