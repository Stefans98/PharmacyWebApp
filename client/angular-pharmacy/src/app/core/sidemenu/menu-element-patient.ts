export const patientMenus = [
    {
        'name': 'Apoteke',
        'icon': 'local_hospital',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Sve apoteke',
                'icon': 'local_pharmacy',
                'link': 'patient/pharmacy/all-pharmacies',
                'open': false,
            },
            {
                'name': 'Moje apoteke',
                'icon': 'medical_services',
                'link': 'patient/pharmacy/my-pharmacies',
                'open': false,
            }
        ]
    },
    {
        'name': 'Dermatolozi',
        'icon': 'person',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Istorija poseta',
                'icon': 'history',
                'link': 'patient/dermatologist/dermatologist-appointment-history',
                'open': false,
            },
            {
                'name': 'Zakazane posete',
                'icon': 'today',
                'link': 'patient/dermatologist/dermatologist-scheduled-appointments',
                'open': false,
            },
            {
                'name': 'Zakazivanje poseta',
                'icon': 'schedule',
                'link': 'patient/dermatologist/dermatologist-scheduling',
                'open': false,
            }
        ]
    },
    {
        'name': 'Farmaceuti',
        'icon': 'health_and_safety',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Istorija savetovanja',
                'icon': 'history',
                'link': 'patient/pharmacist/pharmacist-counseling-history',
                'open': false,
            },
            {
                'name': 'Zakazana savetovanja',
                'icon': 'today',
                'link': 'patient/pharmacist/pharmacist-scheduled-counseling',
                'open': false,
            },
            {
                'name': 'Zakazivanje savetovanja',
                'icon': 'schedule',
                'link': 'patient/pharmacist/pharmacist-scheduling',
                'open': false,
            }
        ]
    },
    {
        'name': 'Lekovi',
        'icon': 'healing',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Rezervisani lekovi',
                'icon': 'check_circle',
                'link': 'patient/drugs/reserved-drugs',
                'open': false,
            },
            {
                'name': 'Izdati lekovi',
                'icon': 'fact_check',
                'link': 'patient/drugs/dispensed-drugs',
                'open': false,
            },
            {
                'name': 'Preuzimanje lekova',
                'icon': 'get_app',
                'link': 'patient/drugs/taking-drugs',
                'open': false,
            }
        ]
    },
    {
        'name': 'ERecepti',
        'open': false,
        'link': 'patient/e-prescription',
        'icon': 'receipt',
    },
    {
        'name': 'Penali',
        'open': false,
        'link': 'patient/penalty',
        'icon': 'grade',
    },
    {
        'name': 'Žalbe',
        'open': false,
        'link': 'patient/complaints',
        'icon': 'report_problem',
    }
];
