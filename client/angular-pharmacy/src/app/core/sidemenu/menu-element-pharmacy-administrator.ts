export const pharmacyAdministratorMenus = [
    {
        'name': 'Moja apoteka',
        'icon': 'event_note',
        'link': 'pharmacy-administrator/pharmacy-profile',
        'open': false
    },
    {
        'name': 'Slobodni termini',
        'icon': 'people',
        'link': 'pharmacy-administrator/free-appointments',
        'open': false
    },
    {
        'name': 'Izveštaji o poslovanju',
        'icon': 'people',
        'link': 'pharmacy-administrator/business-report',
        'open': false
    },
    {
        'name': 'Definiši promociju',
        'icon': 'people',
        'link': 'pharmacy-administrator/define-promotion',
        'open': false
    },
    {
        'name': 'Lekovi',
        'icon': 'medical_services',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Svi lekovi',
                'icon': 'slideshow',
                'link': 'pharmacy-administrator/all-available-medicines',
                'open': false,
            },
            {
                'name': 'Dodaj lek',
                'icon': 'local_hospital',
                'link': 'pharmacy-administrator/add-medicine',
                'open': false,
            },
            {
                'name': 'Upiti za lekove',
                'icon': 'local_hospital',
                'link': 'pharmacy-administrator/request-for-medicines',
                'open': false,
            }    
        ]
    },
    {
        'name': 'Farmaceuti',
        'icon': 'medical_services',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Svi farmaceuti',
                'icon': 'slideshow',
                'link': 'pharmacy-administrator/all-pharmacists',
                'open': false,
            },
            {
                'name': 'Dodaj farmaceuta',
                'icon': 'local_hospital',
                'link': 'pharmacy-administrator/add-pharmacist',
                'open': false,
            }
        ]
    },
    {
        'name': 'Dermatolozi',
        'icon': 'medical_services',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Svi dermatolozi',
                'icon': 'slideshow',
                'link': 'pharmacy-administrator/all-dermatologists',
                'open': false,
            },
            {
                'name': 'Dodaj dermatologa',
                'icon': 'local_hospital',
                'link': 'pharmacy-administrator/add-dermatologist',
                'open': false,
            }
        ]
    },
    {
        'name': 'Narudžbenice',
        'icon': 'medical_services',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Sve narudžbenice',
                'icon': 'slideshow',
                'link': 'pharmacy-administrator/all-order-lists',
                'open': false,
            },
            {
                'name': 'Kreiraj narudžbenicu',
                'icon': 'local_hospital',
                'link': 'pharmacy-administrator/create-order-list',
                'open': false,
            }
        ]
    }
];