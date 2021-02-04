package isa.spring.boot.pharmacy.service.medicines;

import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.model.medicines.PharmacyMedicine;
import isa.spring.boot.pharmacy.repository.medicines.MedicineRepository;
import isa.spring.boot.pharmacy.service.pharmacy.PharmacyService;
import isa.spring.boot.pharmacy.service.users.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PharmacyService pharmacyService;

    @Autowired
    private PharmacyMedicineService pharmacyMedicineService;

    public List<Medicine> findAll() {
        return medicineRepository.findAll();
    }

    public Medicine findById(long id) {
        return medicineRepository.findById(id);
    }

    public List<Medicine> findMedicinesBy(String name) {
        List<Medicine> medicines = new ArrayList<>();
        for(Medicine medicine : findAll()) {
            if (medicine.getName().toLowerCase().startsWith(name)) {
                medicines.add(medicine);
            }
        }
        return medicines;
    }

    public List<Medicine> getMedicineSubstitutions(Long medicineId) {
        Medicine medicine = findById(medicineId);
        return medicine.getMedicineSpecification().getMedicineSubstitutions();
    }

    public List<Medicine> findAllMedicinesForPharmacy(Long pharmacyId) {
        List<Medicine> medicinesForPharmacy = new ArrayList<Medicine>();
        for(PharmacyMedicine pharmacyMedicine : pharmacyMedicineService.findAll()) {
            if(pharmacyMedicine.getPharmacy().getId() == pharmacyId) {
                medicinesForPharmacy.add(findById(pharmacyMedicine.getMedicine().getId()));
            }
        }
        return medicinesForPharmacy;
    }

}
