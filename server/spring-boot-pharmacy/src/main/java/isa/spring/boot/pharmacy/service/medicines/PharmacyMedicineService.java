package isa.spring.boot.pharmacy.service.medicines;

import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.model.medicines.MedicineReservation;
import isa.spring.boot.pharmacy.model.medicines.PharmacyMedicine;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.repository.medicines.PharmacyMedicineRepository;
import isa.spring.boot.pharmacy.service.pharmacy.PharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PharmacyMedicineService {

    @Autowired
    private PharmacyMedicineRepository pharmacyMedicineRepository;

    @Autowired
    private MedicineService medicineService;

    @Autowired
    private MedicineReservationService medicineReservationService;

    @Autowired
    private PharmacyService pharmacyService;

    public List<PharmacyMedicine> findAll() {
        List<PharmacyMedicine> pharmacyMedicines = new ArrayList<>();
        for(PharmacyMedicine pharmacyMedicine : pharmacyMedicineRepository.findAll()){
            if(!pharmacyMedicine.getDeleted()){
                pharmacyMedicines.add(pharmacyMedicine);
            }
        }
        return pharmacyMedicines;
    }

    public Medicine isMedicineAvailable(Long medicineId, Long pharmacyId) {
        for(PharmacyMedicine pharmacyMedicine : pharmacyMedicineRepository.findAll()) {
            if(pharmacyMedicine.getPharmacy().getId() == pharmacyId && pharmacyMedicine.getMedicine().getId() == medicineId) {
                if(pharmacyMedicine.getQuantity() <= 0) {
                    return null;
                }
            }
        }
        return medicineService.findById(medicineId);
    }

    public void decrementMedicineQuantity(Long medicineId, Long pharmacyId) {
        for(PharmacyMedicine pharmacyMedicine : pharmacyMedicineRepository.findAll()) {
            if(pharmacyMedicine.getPharmacy().getId() == pharmacyId && pharmacyMedicine.getMedicine().getId() == medicineId) {
                pharmacyMedicine.setQuantity(pharmacyMedicine.getQuantity() - 1);
                pharmacyMedicineRepository.save(pharmacyMedicine);
                return;
            }
        }
    }

    public List<PharmacyMedicine> getMedicinesForPharmacy(Long pharmacyId){
        List<PharmacyMedicine> pharmacyMedicines = new ArrayList<>();
        for(PharmacyMedicine pharmacyMedicine : findAll()){
            if(pharmacyMedicine.getPharmacy().getId() == pharmacyId){
                pharmacyMedicines.add(pharmacyMedicine);
            }
        }
        return pharmacyMedicines;
    }

    public double getQuantityOfMedicineForPharmacy(Long medicineId, Long pharmacyId){
        for(PharmacyMedicine pharmacyMedicine : findAll()){
            if(pharmacyMedicine.getPharmacy().getId() == pharmacyId && pharmacyMedicine.getMedicine().getId() == medicineId){
                return pharmacyMedicine.getQuantity();
            }
        }
        return 0;
    }

    public PharmacyMedicine findById(Long id){
        for(PharmacyMedicine pharmacyMedicine : findAll()){
            if(pharmacyMedicine.getId() == id){
                return pharmacyMedicine;
            }
        }
        return null;
    }

    public PharmacyMedicine addPharmacyMedicine(PharmacyMedicine pharmacyMedicine){
        pharmacyMedicine.setDeleted(false);
        Medicine medicine = medicineService.findById(pharmacyMedicine.getMedicine().getId());
        Pharmacy pharmacy = pharmacyService.findById(pharmacyMedicine.getPharmacy().getId());
        medicineService.save(medicine);
        pharmacyService.savePharmacy(pharmacy);

        return pharmacyMedicineRepository.save(pharmacyMedicine);
    }

    public PharmacyMedicine deletePharmacyMedicine(PharmacyMedicine pharmacyMedicine, Long pharmacyId){
        PharmacyMedicine oldPharmacyMedicine = findById(pharmacyMedicine.getId());
        for(MedicineReservation medicineReservation : medicineReservationService.getALlMedicineReservationsForPharmacy(pharmacyId)){
            if(medicineReservation.getMedicine().getId() == pharmacyMedicine.getMedicine().getId()){
                return null;
            }
        }
        oldPharmacyMedicine.setDeleted(true);
        return pharmacyMedicineRepository.save(oldPharmacyMedicine);
    }

}
