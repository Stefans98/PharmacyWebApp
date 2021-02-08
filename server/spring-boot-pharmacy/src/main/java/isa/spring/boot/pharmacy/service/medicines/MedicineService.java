package isa.spring.boot.pharmacy.service.medicines;

import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.model.medicines.PharmacyMedicine;
import isa.spring.boot.pharmacy.model.users.Allergy;
import isa.spring.boot.pharmacy.model.users.Patient;
import isa.spring.boot.pharmacy.repository.medicines.MedicineRepository;
import isa.spring.boot.pharmacy.service.pharmacy.PharmacyService;
import isa.spring.boot.pharmacy.service.users.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    public List<Medicine> getMedicinesToWhichPatientIsNotAllergic(Long patientId) {
        List<Medicine> patientNotAllergicMedicine = new ArrayList<>();
        Patient patient = (Patient)userService.findById(patientId);
        for(Allergy patientAllergy : patient.getAllergies()) {
            patientNotAllergicMedicine.add(patientAllergy.getMedicine());
        }
        List<Medicine> medicines = findAll();
        medicines.removeAll(patientNotAllergicMedicine);
        return medicines;
    }

    public List<Medicine> getMedicinesToWhichPatientIsAllergic(Long patientId) {
        List<Medicine> patientAllergicMedicine = new ArrayList<>();
        Patient patient = (Patient)userService.findById(patientId);
        for(Allergy patientAllergy : patient.getAllergies()) {
          patientAllergicMedicine.add(patientAllergy.getMedicine());
        }

        return patientAllergicMedicine;
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

    public List<Medicine> findAllMedicinesNotForPharmacy(Long pharmacyId) {
        List<Medicine> medicinesNotForPharmacy = findAll();
        for(Medicine medicine : findAllMedicinesForPharmacy(pharmacyId)){
            medicinesNotForPharmacy.remove(medicine);
        }
        return medicinesNotForPharmacy;
    }

    public void save(Medicine medicine){
        medicineRepository.save(medicine);
    }

}
