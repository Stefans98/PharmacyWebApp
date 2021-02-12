package isa.spring.boot.pharmacy.service.medicines;

import isa.spring.boot.pharmacy.exceptions.InvalidMedicineAmountException;
import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.model.medicines.MedicineReservation;
import isa.spring.boot.pharmacy.model.medicines.PharmacyMedicine;
import isa.spring.boot.pharmacy.model.pharmacy.MedicinePrice;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.repository.medicines.PharmacyMedicineRepository;
import isa.spring.boot.pharmacy.service.pharmacy.PharmacyService;
import isa.spring.boot.pharmacy.service.users.LoyaltyProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
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

    @Autowired
    private LoyaltyProgramService loyaltyProgramService;

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

    public void incrementMedicineQuantity(long medicineId, long pharmacyId) {
        for(PharmacyMedicine pharmacyMedicine : pharmacyMedicineRepository.findAll()) {
            if(pharmacyMedicine.getPharmacy().getId() == pharmacyId && pharmacyMedicine.getMedicine().getId() == medicineId) {
                pharmacyMedicine.setQuantity(pharmacyMedicine.getQuantity() + 1);
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

    public PharmacyMedicine deletePharmacyMedicine(PharmacyMedicine pharmacyMedicine, Long pharmacyId) {
        PharmacyMedicine oldPharmacyMedicine = findById(pharmacyMedicine.getId());
        for (MedicineReservation medicineReservation : medicineReservationService.getALlMedicineReservationsForPharmacy(pharmacyId)) {
            if (medicineReservation.getMedicine().getId() == pharmacyMedicine.getMedicine().getId()) {
                return null;
            }
        }
        oldPharmacyMedicine.setDeleted(true);
        return pharmacyMedicineRepository.save(oldPharmacyMedicine);
    }

    public List<Pharmacy> getAllPharmaciesWithMedicine(String medicineCode) {
        List<Pharmacy> pharmacies = new ArrayList<>();
        for (PharmacyMedicine pm : this.findAll()) {
            if (pm.getMedicine().getCode().equals(medicineCode)) {
                pharmacies.add(pm.getPharmacy());
            }
        }
        return pharmacies;
    }

    public HashMap<Long, Double> getAllPharmaciesWithMedicineQuantity(String medicineCode, int quantity) {
        HashMap<Long, Double> pharmacies = new HashMap<>();
        for (PharmacyMedicine pm : this.findAll()) {
            if (pm.getMedicine().getCode().equals(medicineCode) && pm.getQuantity() >= quantity) {
                pharmacies.put(pm.getPharmacy().getId(),
                        (double) quantity * getMedicinePriceInPharmacy(medicineCode, pm.getPharmacy()));
            }
        }
        return pharmacies;
    }

    public HashMap<Long, Double> getPharmaciesAndPricesForMedicines(HashMap<String, Integer> items) {
        HashMap<Long, Double> result = new HashMap<>();
        int i = 0;
        for (String code : items.keySet()) {
            HashMap<Long, Double> pharmacies = getAllPharmaciesWithMedicineQuantity(code, items.get(code));
            if (i == 0) {
                result = pharmacies;
                i++;
                continue;
            }
            result.keySet().retainAll(pharmacies.keySet());
            for (Long pharmacyId : pharmacies.keySet()) {
                if (result.containsKey(pharmacyId)) {
                    result.put(pharmacyId, result.get(pharmacyId) + pharmacies.get(pharmacyId));
                }
            }
        }
        return result;
    }

    public double getMedicinePriceInPharmacy(String medicineCode, Pharmacy pharmacy) {
        for (MedicinePrice mp : pharmacy.getPricelist().getMedicinePrices()) {
            if (mp.getMedicine().getCode().equals(medicineCode) && mp.getStartTime().before(new Date())
                    && mp.getEndTime().after(new Date())) {
                return mp.getPrice();
            }
        }
        return 0.0;
    }

    @Transactional
    public boolean reduceMedicineQuantityInPharmacy(String code, int quantity, Long pharmacyId) throws InvalidMedicineAmountException {
        List<PharmacyMedicine> pharmacyMedicines = pharmacyMedicineRepository.findAll();
        for (PharmacyMedicine pm : pharmacyMedicines) {
            if (pm.getPharmacy().getId() == pharmacyId && pm.getMedicine().getCode().equals(code)) {
                if (pm.getQuantity() >= quantity) {
                    pm.setQuantity(pm.getQuantity() - quantity);
                    pharmacyMedicineRepository.save(pm);
                    return true;
                }
                throw new InvalidMedicineAmountException("Not enough medicine amount in storage!");
            }
        }
        return false;
    }

}
