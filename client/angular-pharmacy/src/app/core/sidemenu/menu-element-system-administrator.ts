export const systemAdministratorMenus = [
    {
        'name': 'Registracija',
        'icon': 'medical_services',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Apoteka',
                'icon': 'slideshow',
                'link': 'system-administrator/pharmacy-registration',
                'open': false,
            },
            {
                'name': 'Administratora apoteka',
                'icon': 'local_hospital',
                'link': 'system-administrator/pharmacy-administrator-registration',
                'open': false,
            },
            {
                'name': 'Dermatologa',
                'icon': 'local_hospital',
                'link': 'system-administrator/dermatologist-registration',
                'open': false,
            } ,
            {
                'name': 'Dobavljača',
                'icon': 'local_hospital',
                'link': 'system-administrator/supplier-registration',
                'open': false,
            }   
        ]
    }
];