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
                'name': 'Istorija pregleda',
                'icon': 'history',
                'link': 'patient/dermatologist/dermatologist-appointment-history',
                'open': false,
            },
            {
                'name': 'Zakazani pregledi',
                'icon': 'today',
                'link': 'patient/dermatologist/dermatologist-scheduled-appointments',
                'open': false,
            },
            {
                'name': 'Zakazivanje pregleda',
                'icon': 'schedule',
                'link': 'patient/dermatologist/pharmacy-choosing',
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
        'name': 'Ocenjivanje',
        'icon': 'grading',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Novo ocenjivanje',
                'icon': 'add_circle_outline',
                'link': 'patient/grading/new-grading',
                'open': false,
            },
            {
                'name': 'Izmena postojećih ocena',
                'icon': 'create',
                'link': 'patient/grading/change-grade',
                'open': false,
            }
        ]
    },
    {
        'name': 'ERecepti',
        'link': false,
        'open': false,
        'icon': 'receipt',
        'sub': [
            {
                'name': 'Novi e-recept',
                'icon': 'add_circle',
                'link': 'patient/new-e-prescription',
                'open': false,
            },
            {
                'name': 'Moji e-recepti',
                'icon': 'receipt',
                'link': 'patient/my-e-prescriptions',
                'open': false,
            }
        ]
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
