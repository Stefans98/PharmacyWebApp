package isa.spring.boot.pharmacy.service.medicines;

import isa.spring.boot.pharmacy.dto.medicines.MedicineDto;
import isa.spring.boot.pharmacy.dto.users.PharmacistDto;
import isa.spring.boot.pharmacy.model.medicines.*;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.repository.medicines.IngredientRepository;
import isa.spring.boot.pharmacy.model.users.Allergy;
import isa.spring.boot.pharmacy.model.users.Patient;
import isa.spring.boot.pharmacy.repository.medicines.MedicineRepository;
import isa.spring.boot.pharmacy.service.pharmacy.PharmacyService;
import isa.spring.boot.pharmacy.service.users.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PharmacyService pharmacyService;

    @Autowired
    private EPrescriptionService ePrescriptionService;

    @Autowired
    private MedicineReservationService medicineReservationService;

    @Autowired
    private PharmacyMedicineService pharmacyMedicineService;

    public Medicine save(Medicine medicine, List<String> substitutions) {
        List<Medicine> medicines = new ArrayList<>();
        for (String s : substitutions) {
            medicines.add(findByCode(s));
        }
        medicine.getMedicineSpecification().setMedicineSubstitutions(medicines);
        saveIngredients(medicine.getMedicineSpecification().getIngredients());
        return medicineRepository.save(medicine);
    }

    public List<Medicine> findAll() {
        return medicineRepository.findAll();
    }

    public Medicine findById(long id) {
        return medicineRepository.findById(id);
    }

    public Medicine findByCode(String code) { return medicineRepository.findByCode(code); }

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

    public List<Medicine> getMedicinesFromEPrescriptionByPatientId(long patientId) {
        List<Medicine> medicines = new ArrayList<>();
        for(EPrescription ePrescription : ePrescriptionService.getEPrescriptionsForPatient(patientId)) {
            for(EPrescriptionItem ePrescriptionItem: ePrescription.getePrescriptionItems()) {
                medicines.add(ePrescriptionItem.getMedicine());
            }
        }
        return medicines;
    }

    public List<Medicine> getMedicinesForPatientCompletedReservations(Long patientId) {
        List<MedicineReservation> medicineReservations = medicineReservationService.getAllCompletedMedicineReservationByPatientId(patientId);
        return getMedicinesByCompletedMedicineReservation(medicineReservations);
    }

    public List<Medicine> getMedicinesByCompletedMedicineReservation(List<MedicineReservation> medicineReservations) {
        List<Medicine> medicines = new ArrayList<>();
        for (MedicineReservation medicineReservation : medicineReservations) {
            medicines.add(findById(medicineReservation.getMedicine().getId()));
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

    public List<Medicine> findAllMedicinesNotForPharmacy(Long pharmacyId) {
        List<Medicine> medicinesNotForPharmacy = findAll();
        for(Medicine medicine : findAllMedicinesForPharmacy(pharmacyId)){
            medicinesNotForPharmacy.remove(medicine);
        }
        return medicinesNotForPharmacy;
    }

    public void save(Medicine medicine) {
        medicineRepository.save(medicine);
    }

    public void saveIngredients(List<Ingredient> ingredients) {
        for (Ingredient i : ingredients) {
            this.ingredientRepository.save(i);
        }
    }

    public List<MedicineDto> removeMedicineDuplicates(List<MedicineDto> medicineDtos){
        Map<Long, MedicineDto> map = new HashMap<>();
        List<MedicineDto> medicineDtoWithoutDuplicates = new ArrayList<>();
        for(MedicineDto m: medicineDtos){
            map.put(m.getId(), m);
        }
        for (Long id: map.keySet()) {
            medicineDtoWithoutDuplicates.add(map.get(id));
        }
        return medicineDtoWithoutDuplicates;
    }

}
