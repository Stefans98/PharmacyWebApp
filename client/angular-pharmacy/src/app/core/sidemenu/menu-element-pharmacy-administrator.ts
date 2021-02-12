export const pharmacyAdministratorMenus = [
    {
        'name': 'Moja apoteka',
        'icon': 'stars',
        'link': 'pharmacy-administrator/my-pharmacy',
        'open': false
    },
    {
        'name': 'Slobodni termini',
        'icon': 'stars',
        'link': 'pharmacy-administrator/free-appointments',
        'open': false
    },
    {
        'name': 'Izveštaji o poslovanju',
        'icon': 'stars',
        'link': 'pharmacy-administrator/business-report',
        'open': false
    },
    {
        'name': 'Definiši promociju',
        'icon': 'stars',
        'link': 'pharmacy-administrator/define-promotion',
        'open': false
    },
    {
        'name': 'Cenovnik',
        'icon': 'stars',
        'link': 'pharmacy-administrator/pharmacy-pricelist',
        'open': false
    },
    {
        'name': 'Godišnji odmor',
        'icon': 'stars',
        'link': 'pharmacy-administrator/request-vacation-dermatologists',
        'open': false,
    },
    {
        'name': 'Lekovi',
        'icon': 'stars',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Svi lekovi',
                'icon': 'stars',
                'link': 'pharmacy-administrator/all-available-medicines',
                'open': false,
            },
            {
                'name': 'Dodaj lek',
                'icon': 'stars',
                'link': 'pharmacy-administrator/add-medicine',
                'open': false,
            },
            {
                'name': 'Upiti za lekove',
                'icon': 'stars',
                'link': 'pharmacy-administrator/request-for-medicines',
                'open': false,
            }    
        ]
    },
    {
        'name': 'Farmaceuti',
        'icon': 'stars',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Svi farmaceuti',
                'icon': 'stars',
                'link': 'pharmacy-administrator/all-pharmacists',
                'open': false,
            },
            {
                'name': 'Dodaj farmaceuta',
                'icon': 'stars',
                'link': 'pharmacy-administrator/add-pharmacist',
                'open': false,
            }
        ]
    },
    {
        'name': 'Dermatolozi',
        'icon': 'stars',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Svi dermatolozi',
                'icon': 'stars',
                'link': 'pharmacy-administrator/all-dermatologists',
                'open': false,
            },
            {
                'name': 'Dodaj dermatologa',
                'icon': 'stars',
                'link': 'pharmacy-administrator/add-dermatologist',
                'open': false,
            }
        ]
    },
    {
        'name': 'Narudžbenice',
        'icon': 'stars',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Sve narudžbenice',
                'icon': 'stars',
                'link': 'pharmacy-administrator/all-order-lists',
                'open': false,
            },
            {
                'name': 'Kreiraj narudžbenicu',
                'icon': 'stars',
                'link': 'pharmacy-administrator/create-order-list',
                'open': false,
            }
        ]
    }
];